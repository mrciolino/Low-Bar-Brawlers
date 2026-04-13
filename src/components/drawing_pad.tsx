
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Undo2, Trash2, Brush } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useDrawingAPI, drawingUtils, type Stroke, LOGICAL_WIDTH, LOGICAL_HEIGHT } from "../lib/api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog"

// Constants
const COLORS = ["#b91c1c", "#2563eb", "#059669", "#f59e42", "#fbbf24", "#ffffff", "#000000"];
const THICKNESSES = [2, 4, 8, 12];

const DrawingPad: React.FC = () => {
    // API hook for drawing functionality
    const { connectionStatus, paths, sendStroke, undoLastStroke, resetDrawing, canUndo, canDraw, totalStrokes, userStrokeCount } = useDrawingAPI();

    // Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Drawing state
    const [drawing, setDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<Omit<Stroke, 'id' | 'userId'> | null>(null);

    // UI state
    const [color, setColor] = useState(COLORS[0]);
    const [thickness, setThickness] = useState(THICKNESSES[1]);
    const [showMenu, setShowMenu] = useState(false);

    // Canvas rendering
    const redrawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Use the drawing utils to render all strokes
        drawingUtils.renderStrokes(ctx, paths);

        // Draw current stroke if drawing
        if (currentPath && drawing) {
            drawingUtils.renderStroke(ctx, currentPath);
        }
    }, [paths, currentPath, drawing]);

    // Canvas rendering effect
    useEffect(() => {
        redrawCanvas();
    }, [redrawCanvas]);

    // Resize canvas buffer to match displayed size for crisp rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const newWidth = Math.round(rect.width * dpr);
            const newHeight = Math.round(rect.height * dpr);
            if (canvas.width !== newWidth || canvas.height !== newHeight) {
                canvas.width = newWidth;
                canvas.height = newHeight;
                redrawCanvas();
            }
        };

        const observer = new ResizeObserver(updateCanvasSize);
        observer.observe(canvas);
        updateCanvasSize();

        return () => observer.disconnect();
    }, [redrawCanvas]);

    // Event handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0 || !canDraw) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const point = drawingUtils.getCanvasPoint(e, canvas);
        setDrawing(true);
        setCurrentPath(drawingUtils.createStroke(color, thickness, point));
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!drawing || !currentPath) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const point = drawingUtils.getCanvasPoint(e, canvas);
        setCurrentPath(prev => prev ? drawingUtils.addPointToStroke(prev, point) : prev);
    };

    const handlePointerUp = () => {
        if (drawing && currentPath) {
            sendStroke(currentPath);
            setCurrentPath(null);
            setDrawing(false);
        }
    };

    const handleUndo = () => { undoLastStroke(); };
    const handleReset = () => { resetDrawing(); };
    const toggleMenu = () => setShowMenu(prev => !prev);


    // Drawing menu component
    const DrawingMenu = () => (
        showMenu && (
            <div className="absolute left-[7%] top-[15%] ml-12 z-20 bg-white/95 dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg p-4 flex flex-col gap-2 min-w-[180px] backdrop-blur-sm">
                <div>
                    <div className="font-semibold text-xs mb-2">Color</div>
                    <div className="flex gap-2 flex-wrap">
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${color === c ? 'border-blue-500 scale-110' : 'border-neutral-300 hover:scale-105'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-300`}
                                style={{ background: c }}
                                onClick={() => setColor(c)}
                                aria-label={`Select color ${c}`}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="font-semibold text-xs mb-2">Thickness</div>
                    <div className="flex gap-2 items-center flex-wrap">
                        {THICKNESSES.map((t) => (
                            <button
                                key={t}
                                className={`rounded-full border-2 transition-all ${thickness === t ? 'border-blue-500 scale-110' : 'border-neutral-300 hover:scale-105'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center`}
                                style={{ width: 32, height: 32 }}
                                onClick={() => setThickness(t)}
                                aria-label={`Select thickness ${t}px`}
                            >
                                <div
                                    style={{
                                        background: color,
                                        width: t,
                                        height: t,
                                        borderRadius: '50%'
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-xs text-gray-500 mt-2 border-t pt-2">
                    <div>Your strokes: {userStrokeCount} | Total strokes: {totalStrokes}</div>
                </div>
            </div>
        )
    );

    return (
        <div className="flex flex-col items-center justify-center w-full mx-auto">

            <div className="relative w-full flex items-center justify-center">
                {/* Scroll-sized wrapper — all absolute children position relative to the scroll */}
                <div ref={containerRef} className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
                    {/* Background scroll image */}
                    <img
                        src="/assets/scroll.webp"
                        alt="Parchment Scroll"
                        className="w-full h-auto object-contain drop-shadow-lg select-none pointer-events-none"
                        style={{
                            userSelect: 'none'
                        }}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                    />

                    {/* Canvas overlay */}
                    <canvas
                        ref={canvasRef}
                        width={LOGICAL_WIDTH}
                        height={LOGICAL_HEIGHT}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent cursor-crosshair"
                        style={{ width: '75%', height: '65%' }}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                    />

                    {/* Left column controls */}
                    <div className="absolute left-[7%] top-[20%] z-10 flex flex-col gap-3">

                        {/* Status Indicator */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`ml-2 w-5 h-5 rounded-full border-dashed ${connectionStatus === 'connected' ? 'bg-green-500' :
                                    connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Backend {connectionStatus === 'connected' ? 'Connected' :
                                    connectionStatus === 'connecting' ? 'Connecting...' :
                                        'Disconnected'}</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Drawing menu button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-blue-100 dark:hover:bg-blue-900"
                                    onClick={toggleMenu}
                                >
                                    <Brush className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Drawing Options</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Undo button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                    onClick={handleUndo}
                                    disabled={!canUndo}
                                >
                                    <Undo2 className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Undo your last stroke ({userStrokeCount} available)</p>
                            </TooltipContent>
                        </Tooltip>
                        {/* Reset button with confirmation dialog */}
                        <AlertDialog>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-red-100 dark:hover:bg-red-900"
                                            disabled={!canDraw}
                                        >
                                            <Trash2 className="h-5 w-5 text-red-600" />
                                        </Button>
                                    </AlertDialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Reset entire drawing (affects all users)</p>
                                </TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will clear the entire drawing for all connected users.
                                        This action cannot be undone and will affect everyone currently drawing.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleReset}>Reset Drawing</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <DrawingMenu />
                </div>
            </div>
        </div>
    );
};

export default DrawingPad;
