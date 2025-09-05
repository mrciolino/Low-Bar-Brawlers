
import React, { useRef, useState, useEffect } from "react";
import { Undo2, Redo2, Trash2, Brush } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

const COLORS = ["#b91c1c", "#2563eb", "#059669", "#f59e42", "#fbbf24", "#fff", "#222"];
const THICKNESSES = [2, 4, 8, 12];

const DrawingPad: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);
    const [paths, setPaths] = useState<any[]>([]);
    const [redoStack, setRedoStack] = useState<any[]>([]);
    const [color, setColor] = useState(COLORS[0]);
    const [thickness, setThickness] = useState(THICKNESSES[1]);
    const [showMenu, setShowMenu] = useState(false);
    const [currentPath, setCurrentPath] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("lbb_drawingpad");
        if (saved) setPaths(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("lbb_drawingpad", JSON.stringify(paths));
    }, [paths]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        for (const path of paths) {
            ctx!.strokeStyle = path.color;
            ctx!.lineWidth = path.thickness;
            ctx!.lineJoin = "round";
            ctx!.lineCap = "round";
            ctx!.beginPath();
            path.points.forEach((pt: any, i: number) => {
                if (i === 0) ctx!.moveTo(pt.x, pt.y);
                else ctx!.lineTo(pt.x, pt.y);
            });
            ctx!.stroke();
        }
    }, [paths]);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setDrawing(true);
        setCurrentPath({ color, thickness, points: [{ x, y }] });
    };
    const handlePointerMove = (e: React.PointerEvent) => {
        if (!drawing) return;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCurrentPath((prev: any) => prev ? { ...prev, points: [...prev.points, { x, y }] } : prev);
    };
    const handlePointerUp = () => {
        if (drawing && currentPath) {
            setPaths((prev) => [...prev, currentPath]);
            setCurrentPath(null);
            setDrawing(false);
            setRedoStack([]);
        }
    };

    useEffect(() => {
        if (!drawing || !currentPath) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx!.strokeStyle = currentPath.color;
        ctx!.lineWidth = currentPath.thickness;
        ctx!.lineJoin = "round";
        ctx!.lineCap = "round";
        ctx!.beginPath();
        currentPath.points.forEach((pt: any, i: number) => {
            if (i === 0) ctx!.moveTo(pt.x, pt.y);
            else ctx!.lineTo(pt.x, pt.y);
        });
        ctx!.stroke();
    }, [currentPath, drawing]);

    const handleUndo = () => {
        if (paths.length === 0) return;
        setRedoStack((r) => [paths[paths.length - 1], ...r]);
        setPaths((p) => p.slice(0, -1));
    };
    const handleRedo = () => {
        if (redoStack.length === 0) return;
        setPaths((p) => [...p, redoStack[0]]);
        setRedoStack((r) => r.slice(1));
    };
    const handleReset = () => {
        setPaths([]);
        setRedoStack([]);
    };

    const handleDrawMenu = () => setShowMenu((v) => !v);

    const CANVAS_W = 600;
    const CANVAS_H = 350;

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            <div className="relative w-full flex items-center justify-center">
                {/* Background scroll image */}
                <img
                    src="/assets/scroll.webp"
                    alt="Parchment Scroll"
                    className="w-full max-w-3xl h-auto object-contain drop-shadow-lg select-none pointer-events-none"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        userSelect: 'none'
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                />
                {/* Canvas overlay */}
                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent cursor-crosshair"
                    style={{ width: '75%', height: '65%', maxWidth: '600px', maxHeight: '350px' }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                />

                {/* Left column controls */}
                <div className="absolute left-14 top-44 z-10 flex flex-col gap-3">
                    {/* Drawing menu button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-blue-100 dark:hover:bg-blue-900"
                                onClick={handleDrawMenu}
                            >
                                <Brush className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Drawing options</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Control buttons */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                onClick={handleUndo}
                                disabled={paths.length === 0}
                            >
                                <Undo2 className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Undo</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                onClick={handleRedo}
                                disabled={redoStack.length === 0}
                            >
                                <Redo2 className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Redo</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-red-100 dark:hover:bg-red-900"
                                onClick={handleReset}
                            >
                                <Trash2 className="h-5 w-5 text-red-600" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Reset</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Drawing menu */}
                {showMenu && (
                    <div className="absolute left-16 top-4 z-20 bg-white/95 dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg p-4 flex flex-col gap-4 min-w-[180px] backdrop-blur-sm">
                        <div>
                            <div className="font-semibold text-xs mb-1">Color</div>
                            <div className="flex gap-2">
                                {COLORS.map((c) => (
                                    <button
                                        key={c}
                                        className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500' : 'border-neutral-300'} focus:outline-none`}
                                        style={{ background: c }}
                                        onClick={() => setColor(c)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-xs mb-1">Thickness</div>
                            <div className="flex gap-2 items-center">
                                {THICKNESSES.map((t) => (
                                    <button
                                        key={t}
                                        className={`rounded-full border-2 ${thickness === t ? 'border-blue-500' : 'border-neutral-300'} focus:outline-none flex items-center justify-center`}
                                        style={{ width: 28, height: 28 }}
                                        onClick={() => setThickness(t)}
                                    >
                                        <div style={{ background: color, width: t, height: t, borderRadius: '50%' }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DrawingPad;
