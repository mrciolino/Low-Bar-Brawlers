import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
  private io = new Server(this.server, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? ["https://www.lowbarbrawlers.com", "https://lowbarbrawlers.com"]
        : [
          "http://localhost:5173",
          "http://localhost:4173",
          "http://localhost:3000",
          /^http:\/\/192\.168\.1\.\d+:5173$/
        ],
      methods: ["GET", "POST"]
    }
  });

  private strokes: Stroke[] = [];
  private readonly DRAWING_FILE = path.join(process.cwd(), 'server', 'drawing.json');
  private readonly MAX_STROKES = 1000;
  private readonly MAX_POINTS_PER_STROKE = 1000;
  private readonly MAX_STROKE_THICKNESS = 50;
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
  private readonly RATE_LIMIT_MAX_REQUESTS = 30; // 30 strokes per minute

  constructor() {
    this.setupRoutes();
    this.setupSocketHandlers();
    this.startRateLimitCleanup();
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

  private checkRateLimit(clientId: string): boolean {
    const now = Date.now();
    const clientLimit = this.rateLimitMap.get(clientId);

    if (!clientLimit || now > clientLimit.resetTime) {
      // Reset or create new rate limit window
      this.rateLimitMap.set(clientId, {
        count: 1,
        resetTime: now + this.RATE_LIMIT_WINDOW
      });
      return true;
    }

    if (clientLimit.count >= this.RATE_LIMIT_MAX_REQUESTS) {
      return false; // Rate limit exceeded
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
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        strokes: this.strokes.length,
        maxStrokes: this.MAX_STROKES,
        connections: this.io.engine.clientsCount,
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        rateLimit: {
          window: this.RATE_LIMIT_WINDOW,
          maxRequests: this.RATE_LIMIT_MAX_REQUESTS
        }
      });
    });

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(path.join(process.cwd(), 'dist')));
      this.app.get('*', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
      });
    }
  }

  private setupSocketHandlers(): void {
    this.io.on('connection', (socket) => {
      console.log(`🔌 User connected: ${socket.id}`);

      // Send current drawing state to newly connected client
      socket.emit('init', this.strokes);

      // Handle new stroke
      socket.on('stroke', async (strokeData: Omit<Stroke, 'id'>) => {
        // Check rate limit
        if (!this.checkRateLimit(socket.id)) {
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
          // Remove oldest stroke to make room for new one
          this.strokes.shift();
        }

        const stroke: Stroke = {
          id: uuidv4(),
          ...strokeData
        };

        this.strokes.push(stroke);
        await this.saveStrokes();

        // Broadcast to all clients
        this.io.emit('stroke', stroke);
        console.log(`✏️  New stroke by ${stroke.userId}: ${stroke.id} (${this.strokes.length}/${this.MAX_STROKES})`);
      });

      // Handle undo (remove specific stroke)
      socket.on('undo', async (strokeId: string) => {
        const strokeIndex = this.strokes.findIndex(s => s.id === strokeId);
        if (strokeIndex !== -1) {
          this.strokes.splice(strokeIndex, 1);
          await this.saveStrokes();

          // Broadcast removal to all clients
          this.io.emit('removeStroke', strokeId);
          console.log(`↩️  Stroke removed: ${strokeId}`);
        }
      });

      // Handle reset (clear all strokes)
      socket.on('reset', async () => {
        this.strokes = [];
        await this.saveStrokes();

        // Broadcast reset to all clients
        this.io.emit('reset');
        console.log('🗑️  Drawing reset by user');
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log(`🔌 User disconnected: ${socket.id}`);
      });
    });
  }

  public async start(): Promise<void> {
    const PORT = process.env.PORT || 3001;

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
