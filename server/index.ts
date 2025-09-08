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
      origin: ["http://localhost:5173", "http://localhost:3000"],
      methods: ["GET", "POST"]
    }
  });

  private strokes: Stroke[] = [];
  private readonly DRAWING_FILE = path.join(process.cwd(), 'server', 'drawing.json');

  constructor() {
    this.setupRoutes();
    this.setupSocketHandlers();
  }

  private async loadStrokes(): Promise<void> {
    try {
      const data = await fs.readFile(this.DRAWING_FILE, 'utf-8');
      this.strokes = JSON.parse(data);
      console.log(`📁 Loaded ${this.strokes.length} strokes from file`);
    } catch (error) {
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

  private setupRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        strokes: this.strokes.length,
        connections: this.io.engine.clientsCount,
        uptime: process.uptime()
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
        const stroke: Stroke = {
          id: uuidv4(),
          ...strokeData
        };

        this.strokes.push(stroke);
        await this.saveStrokes();

        // Broadcast to all clients
        this.io.emit('stroke', stroke);
        console.log(`✏️  New stroke by ${stroke.userId}: ${stroke.id}`);
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

    this.server.listen(PORT, () => {
      console.log(`🎨 Drawing server running on http://localhost:${PORT}`);
      console.log(`🔄 Socket.IO server ready for connections`);
    });
  }
}

// Start the server
const server = new DrawingServer();
server.start().catch(console.error);

export default DrawingServer;
