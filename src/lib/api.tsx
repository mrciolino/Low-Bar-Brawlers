import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// Types
export interface Point {
    x: number;
    y: number;
}

export interface Stroke {
    id: string;
    userId: string;
    color: string;
    thickness: number;
    points: Point[];
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

// Constants
const getServerURL = () => {
    // Check if we're running on localhost (development or preview)
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
        // In development or local preview, always use localhost:3001
        const url = `http://localhost:3001`;
        console.log('🌐 Socket.IO server URL (localhost):', url);
        return url;
    } else {
        // In actual production with domain, use same origin
        const url = '';
        console.log('🌐 Socket.IO server URL (production):', 'same origin');
        return url;
    }
};

const SERVER_URL = getServerURL();

// Custom hook for drawing API
export const useDrawingAPI = () => {
    // Refs
    const socketRef = useRef<Socket | null>(null);
    const userIdRef = useRef<string>(uuidv4());

    // State
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
    const [paths, setPaths] = useState<Stroke[]>([]);
    const [userStrokes, setUserStrokes] = useState<string[]>([]);

    // Initialize Socket.IO connection
    useEffect(() => {
        console.log('🚀 Attempting to connect to:', SERVER_URL);
        const socket = io(SERVER_URL, {
            transports: ['polling', 'websocket'],
            timeout: 20000,
            forceNew: true,
            upgrade: true,
            rememberUpgrade: false
        });
        socketRef.current = socket;

        // Connection events
        socket.on('connect', () => {
            console.log('🔌 Connected to drawing server via', socket.io.engine.transport.name);
            setConnectionStatus('connected');
        });

        socket.on('disconnect', (reason) => {
            console.log('🔌 Disconnected from drawing server:', reason);
            setConnectionStatus('disconnected');
        });

        socket.on('connect_error', (error) => {
            console.error('❌ Connection error:', error);
            setConnectionStatus('disconnected');
        });

        // Transport events for debugging
        socket.on('upgrade', () => {
            console.log('⬆️ Upgraded to', socket.io.engine.transport.name);
        });

        socket.on('upgradeError', (error) => {
            console.log('❌ Upgrade error:', error);
        });

        // Drawing events
        socket.on('init', (strokes: Stroke[]) => {
            console.log(`📁 Received ${strokes.length} initial strokes`);
            setPaths(strokes);
        });

        socket.on('stroke', (stroke: Stroke) => {
            console.log(`✏️ Received new stroke: ${stroke.id}`);
            setPaths(prev => [...prev, stroke]);

            // Track user's own strokes for undo functionality
            if (stroke.userId === userIdRef.current) {
                setUserStrokes(prev => [...prev, stroke.id]);
            }
        });

        socket.on('removeStroke', (strokeId: string) => {
            console.log(`🗑️ Removing stroke: ${strokeId}`);
            setPaths(prev => prev.filter(s => s.id !== strokeId));
            setUserStrokes(prev => prev.filter(id => id !== strokeId));
        });

        socket.on('reset', () => {
            console.log('🔄 Canvas reset by another user');
            setPaths([]);
            setUserStrokes([]);
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    // API methods
    const sendStroke = useCallback((strokeData: Omit<Stroke, 'id' | 'userId'>) => {
        if (!socketRef.current || connectionStatus !== 'connected') {
            console.warn('Cannot send stroke: not connected to server');
            return false;
        }

        const completeStroke: Omit<Stroke, 'id'> = {
            ...strokeData,
            userId: userIdRef.current
        };

        socketRef.current.emit('stroke', completeStroke);
        return true;
    }, [connectionStatus]);

    const undoLastStroke = useCallback(() => {
        if (!socketRef.current || userStrokes.length === 0) {
            console.warn('Cannot undo: no strokes available or not connected');
            return false;
        }

        const lastStrokeId = userStrokes[userStrokes.length - 1];
        socketRef.current.emit('undo', lastStrokeId);
        return true;
    }, [userStrokes]);

    const resetDrawing = useCallback(() => {
        if (!socketRef.current || connectionStatus !== 'connected') {
            console.warn('Cannot reset: not connected to server');
            return false;
        }

        socketRef.current.emit('reset');
        return true;
    }, [connectionStatus]);

    // Health check function
    const checkServerHealth = useCallback(async () => {
        try {
            const response = await fetch(`${SERVER_URL}/health`);
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            return null;
        }
    }, []);

    return {
        // State
        connectionStatus,
        paths,
        userStrokes,
        userId: userIdRef.current,

        // Methods
        sendStroke,
        undoLastStroke,
        resetDrawing,
        checkServerHealth,

        // Computed values
        canUndo: userStrokes.length > 0 && connectionStatus === 'connected',
        canDraw: connectionStatus === 'connected',
        totalStrokes: paths.length,
        userStrokeCount: userStrokes.length
    };
};

// Fixed logical coordinate space used to store and render strokes so their
// position and thickness remain consistent across different canvas sizes.
export const LOGICAL_WIDTH = 600;
export const LOGICAL_HEIGHT = 350;

// Utility functions for drawing operations
export const drawingUtils = {
    /**
     * Render strokes on a canvas context.
     * Scales from logical coordinates (600x350) to actual canvas pixel size.
     */
    renderStrokes: (ctx: CanvasRenderingContext2D, strokes: Stroke[]) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const scaleX = ctx.canvas.width / LOGICAL_WIDTH;
        const scaleY = ctx.canvas.height / LOGICAL_HEIGHT;
        const scaleAvg = (scaleX + scaleY) / 2;

        strokes.forEach(stroke => {
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.thickness * scaleAvg;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.beginPath();

            stroke.points.forEach((point, i) => {
                const px = point.x * scaleX;
                const py = point.y * scaleY;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });

            ctx.stroke();
        });
    },

    /**
     * Render a single stroke on canvas context (for in-progress drawing).
     * Scales from logical coordinates to actual canvas pixel size.
     */
    renderStroke: (ctx: CanvasRenderingContext2D, stroke: Omit<Stroke, 'id' | 'userId'>) => {
        const scaleX = ctx.canvas.width / LOGICAL_WIDTH;
        const scaleY = ctx.canvas.height / LOGICAL_HEIGHT;
        const scaleAvg = (scaleX + scaleY) / 2;

        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.thickness * scaleAvg;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();

        stroke.points.forEach((point, i) => {
            const px = point.x * scaleX;
            const py = point.y * scaleY;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });

        ctx.stroke();
    },

    /**
     * Get logical coordinates (600x350 space) from a pointer event.
     * Scales from display CSS size to the logical coordinate system.
     */
    getCanvasPoint: (e: React.PointerEvent, canvas: HTMLCanvasElement): Point => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (LOGICAL_WIDTH / rect.width),
            y: (e.clientY - rect.top) * (LOGICAL_HEIGHT / rect.height)
        };
    },

    /**
     * Create a new stroke object
     */
    createStroke: (color: string, thickness: number, initialPoint: Point): Omit<Stroke, 'id' | 'userId'> => {
        return {
            color,
            thickness,
            points: [initialPoint]
        };
    },

    /**
     * Add point to existing stroke
     */
    addPointToStroke: (stroke: Omit<Stroke, 'id' | 'userId'>, point: Point): Omit<Stroke, 'id' | 'userId'> => {
        return {
            ...stroke,
            points: [...stroke.points, point]
        };
    }
};

export default useDrawingAPI;
