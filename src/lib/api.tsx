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
const SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

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
        const socket = io(SERVER_URL);
        socketRef.current = socket;

        // Connection events
        socket.on('connect', () => {
            console.log('🔌 Connected to drawing server');
            setConnectionStatus('connected');
        });

        socket.on('disconnect', () => {
            console.log('🔌 Disconnected from drawing server');
            setConnectionStatus('disconnected');
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

// Utility functions for drawing operations
export const drawingUtils = {
    /**
     * Render strokes on a canvas context
     */
    renderStrokes: (ctx: CanvasRenderingContext2D, strokes: Stroke[]) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        strokes.forEach(stroke => {
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.thickness;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.beginPath();

            stroke.points.forEach((point, i) => {
                if (i === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });

            ctx.stroke();
        });
    },

    /**
     * Render a single stroke on canvas context
     */
    renderStroke: (ctx: CanvasRenderingContext2D, stroke: Omit<Stroke, 'id' | 'userId'>) => {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.thickness;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();

        stroke.points.forEach((point, i) => {
            if (i === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
        });

        ctx.stroke();
    },

    /**
     * Get canvas coordinates from pointer event
     */
    getCanvasPoint: (e: React.PointerEvent, canvas: HTMLCanvasElement): Point => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
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
