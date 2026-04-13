import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Types
interface Point {
  x: number;
  y: number;
}

interface Stroke {
  id: string;
  userId: string;
  color: string;
  thickness: number;
  points: Point[];
}

class DrawingServer {
  private app = express();
  private server = createServer(this.app);

  private readonly ALLOWED_ORIGINS: (string | RegExp)[] = (() => {
    const raw = process.env.DRAWING_SERVER_ALLOWED_ORIGINS;
    if (raw && raw.length > 0) {
      return raw.split(',').map(s => s.trim()).filter(Boolean).map(s => {
        if (s.startsWith('regex:')) {
          try {
            return new RegExp(s.replace(/^regex:/, ''));
          } catch (e) {
            console.warn('Invalid regexp in DRAWING_SERVER_ALLOWED_ORIGINS:', s);
            return s;
          }
        }
        return s;
      });
    }

    const origins: (string | RegExp)[] = [
      'https://www.lowbarbrawlers.com',
      'https://lowbarbrawlers.com',
    ];

    // Only include localhost origins in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      origins.push(
        'http://localhost:5173',
        'http://localhost:4173',
        'http://localhost:3000',
      );
    }

    return origins;
  })();

  private io = new Server(this.server, {
    cors: {
      origin: this.ALLOWED_ORIGINS,
      methods: ['GET', 'POST']
    }
  });

  private strokes: Stroke[] = [];
  private readonly DRAWING_FILE = path.join(process.cwd(), 'server', 'drawing.json');
  private readonly MAX_STROKES = 1000;
  private readonly MAX_POINTS_PER_STROKE = 1000;
  private readonly MAX_STROKE_THICKNESS = 50;

  // Rate limiting by IP address (not socket.id)
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
  private readonly RATE_LIMIT_MAX_REQUESTS = 30; // 30 strokes per minute

  // Track connections per IP to prevent connection flooding
  private connectionsPerIp = new Map<string, number>();
  private readonly MAX_CONNECTIONS_PER_IP = 5;

  // Track stroke ownership: strokeId -> socketId
  private strokeOwnership = new Map<string, string>();

  // Track reset cooldown per IP
  private resetCooldowns = new Map<string, number>();
  private readonly RESET_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupSocketHandlers();
    this.startRateLimitCleanup();
  }

  private setupMiddleware(): void {
    // Security headers via helmet
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'", "ws:", "wss:"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false, // Allow loading images/assets
    }));

    // CORS middleware for Express HTTP routes
    this.app.use(cors({
      origin: this.ALLOWED_ORIGINS,
      methods: ['GET'],
    }));

    // Global HTTP rate limiting
    this.app.use(rateLimit({
      windowMs: 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: 'Too many requests, please try again later.' },
    }));
  }

  private getSocketIp(socket: { handshake: { address: string; headers: Record<string, string | string[] | undefined> } }): string {
    const forwarded = socket.handshake.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return socket.handshake.address;
  }

  private startRateLimitCleanup(): void {
    // Clean up expired rate limit entries every 5 minutes
    setInterval(() => {
      const now = Date.now();
      for (const [clientId, limit] of this.rateLimitMap.entries()) {
        if (now > limit.resetTime) {
          this.rateLimitMap.delete(clientId);
        }
      }
      // Clean up expired reset cooldowns
      for (const [ip, expiry] of this.resetCooldowns.entries()) {
        if (now > expiry) {
          this.resetCooldowns.delete(ip);
        }
      }
      console.log(`🧹 Cleaned up rate limit map. Active entries: ${this.rateLimitMap.size}`);
    }, 5 * 60 * 1000);
  }

  private async loadStrokes(): Promise<void> {
    try {
      const data = await fs.readFile(this.DRAWING_FILE, 'utf-8');
      this.strokes = JSON.parse(data);
      console.log(`📁 Loaded ${this.strokes.length} strokes from file`);
    } catch {
      console.log('📁 No existing drawing file found, starting with empty canvas');
      this.strokes = [];
    }
  }

  private async saveStrokes(): Promise<void> {
    try {
      // Ensure server directory exists
      await fs.mkdir(path.dirname(this.DRAWING_FILE), { recursive: true });
      await fs.writeFile(this.DRAWING_FILE, JSON.stringify(this.strokes, null, 2));
      console.log(`💾 Saved ${this.strokes.length} strokes to file`);
    } catch (error) {
      console.error('❌ Error saving strokes:', error);
    }
  }

  private checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const clientLimit = this.rateLimitMap.get(ip);

    if (!clientLimit || now > clientLimit.resetTime) {
      this.rateLimitMap.set(ip, {
        count: 1,
        resetTime: now + this.RATE_LIMIT_WINDOW
      });
      return true;
    }

    if (clientLimit.count >= this.RATE_LIMIT_MAX_REQUESTS) {
      return false;
    }

    clientLimit.count++;
    return true;
  }

  private validateStroke(strokeData: Omit<Stroke, 'id'>): boolean {
    // Check if stroke has reasonable number of points
    if (!strokeData.points || strokeData.points.length === 0 || strokeData.points.length > this.MAX_POINTS_PER_STROKE) {
      return false;
    }

    // Check thickness is reasonable
    if (!strokeData.thickness || strokeData.thickness <= 0 || strokeData.thickness > this.MAX_STROKE_THICKNESS) {
      return false;
    }

    // Validate points have proper structure
    for (const point of strokeData.points) {
      if (typeof point.x !== 'number' || typeof point.y !== 'number' ||
        isNaN(point.x) || isNaN(point.y) ||
        Math.abs(point.x) > 10000 || Math.abs(point.y) > 10000) {
        return false;
      }
    }

    // Check color is a valid hex color
    if (!strokeData.color || !/^#[0-9A-F]{6}$/i.test(strokeData.color)) {
      return false;
    }

    return true;
  }

  private setupRoutes(): void {
    // Health check — minimal info only, no internal details exposed
    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    const distPath = path.join(process.cwd(), 'dist');
    this.app.use(express.static(distPath));

    // Catch-all *only* for unknown routes -> send frontend index.html
    this.app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }



  private setupSocketHandlers(): void {
    this.io.on('connection', (socket) => {
      const ip = this.getSocketIp(socket);

      // Enforce max connections per IP
      const currentCount = this.connectionsPerIp.get(ip) || 0;
      if (currentCount >= this.MAX_CONNECTIONS_PER_IP) {
        console.log(`🚫 Connection rejected from ${ip} — max connections reached (${this.MAX_CONNECTIONS_PER_IP})`);
        socket.emit('error', 'Too many connections from your address.');
        socket.disconnect(true);
        return;
      }
      this.connectionsPerIp.set(ip, currentCount + 1);

      console.log(`🔌 User connected: ${socket.id} (IP: ${ip})`);

      // Send current drawing state to newly connected client
      socket.emit('init', this.strokes);

      // Handle new stroke
      socket.on('stroke', async (strokeData: Omit<Stroke, 'id'>) => {
        // Rate limit by IP address
        if (!this.checkRateLimit(ip)) {
          socket.emit('error', 'Rate limit exceeded. Please slow down.');
          return;
        }

        // Validate stroke data
        if (!this.validateStroke(strokeData)) {
          socket.emit('error', 'Invalid stroke data.');
          return;
        }

        // Check if we've reached the maximum number of strokes
        if (this.strokes.length >= this.MAX_STROKES) {
          const removed = this.strokes.shift();
          if (removed) this.strokeOwnership.delete(removed.id);
        }

        const stroke: Stroke = {
          id: uuidv4(),
          ...strokeData,
        };

        this.strokes.push(stroke);
        // Use socket.id for strokeOwnership because it is the trusted server-side
        // connection identifier used to authorize actions like undo. Preserve the
        // client-facing stroke.userId from strokeData in the emitted payload so we
        // do not change client semantics or confuse it with server-side ownership.
        this.strokeOwnership.set(stroke.id, socket.id);
        await this.saveStrokes();

        // Broadcast to all clients
        this.io.emit('stroke', stroke);
        console.log(`✏️  New stroke by ${socket.id}: ${stroke.id} (${this.strokes.length}/${this.MAX_STROKES})`);
      });

      // Handle undo — only allow removing own strokes
      socket.on('undo', async (strokeId: string) => {
        if (typeof strokeId !== 'string') return;

        const owner = this.strokeOwnership.get(strokeId);
        if (owner !== socket.id) {
          socket.emit('error', 'You can only undo your own strokes.');
          return;
        }

        const strokeIndex = this.strokes.findIndex(s => s.id === strokeId);
        if (strokeIndex !== -1) {
          this.strokes.splice(strokeIndex, 1);
          this.strokeOwnership.delete(strokeId);
          await this.saveStrokes();

          // Broadcast removal to all clients
          this.io.emit('removeStroke', strokeId);
          console.log(`↩️  Stroke removed: ${strokeId} by ${socket.id}`);
        }
      });

      // Handle reset — rate limited per IP with cooldown
      socket.on('reset', async () => {
        const now = Date.now();
        const cooldownExpiry = this.resetCooldowns.get(ip);
        if (cooldownExpiry && now < cooldownExpiry) {
          const remainingSec = Math.ceil((cooldownExpiry - now) / 1000);
          socket.emit('error', `Reset is on cooldown. Try again in ${remainingSec}s.`);
          return;
        }

        this.resetCooldowns.set(ip, now + this.RESET_COOLDOWN_MS);
        this.strokes = [];
        this.strokeOwnership.clear();
        await this.saveStrokes();

        // Broadcast reset to all clients
        this.io.emit('reset');
        console.log(`🗑️  Drawing reset by ${socket.id} (IP: ${ip})`);
      });

      // Handle disconnect — decrement IP connection count
      socket.on('disconnect', () => {
        const count = this.connectionsPerIp.get(ip) || 1;
        if (count <= 1) {
          this.connectionsPerIp.delete(ip);
        } else {
          this.connectionsPerIp.set(ip, count - 1);
        }
        console.log(`🔌 User disconnected: ${socket.id}`);
      });
    });
  }

  public async start(): Promise<void> {
    const PORT = process.env.DB_PORT || 3001;

    await this.loadStrokes();

    this.server.listen(PORT as number, '0.0.0.0', () => {
      console.log(`🎨 Drawing server running on http://0.0.0.0:${PORT}`);
      console.log(`🔄 Socket.IO server ready for connections`);
    });
  }
}

// Start the server
const server = new DrawingServer();
server.start().catch(console.error);

export default DrawingServer;
