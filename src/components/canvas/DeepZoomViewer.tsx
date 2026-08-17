'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { VisualClue } from '@/types/evidence';
import { ZoomIn, ZoomOut, RotateCcw, Crosshair } from 'lucide-react';

interface DeepZoomViewerProps {
  imageUrl: string;
  clues: VisualClue[];
  revealedClueIds: string[];
  onInspectClue: (clueId: string) => void;
  interactive?: boolean;
}

export const DeepZoomViewer: React.FC<DeepZoomViewerProps> = ({
  imageUrl,
  clues,
  revealedClueIds,
  onInspectClue,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.max(1, Math.min(5, Number((prev + delta).toFixed(2)))));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !interactive) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.25 : -0.25;
    handleZoom(zoomDelta);
  };

  return (
    <div className="relative w-full h-full min-h-[440px] bg-[#0c0e12] rounded-lg overflow-hidden border border-zinc-800/80 shadow-2xl flex items-center justify-center select-none">
      {/* Controles de Lupa Flotantes */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-zinc-700/60 shadow-lg text-zinc-300">
        <button
          onClick={() => handleZoom(0.3)}
          className="p-1.5 hover:text-amber-300 hover:bg-zinc-800 rounded transition-colors"
          title="Acercar (Zoom In)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.3)}
          className="p-1.5 hover:text-amber-300 hover:bg-zinc-800 rounded transition-colors"
          title="Alejar (Zoom Out)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-zinc-700 mx-1" />
        <button
          onClick={resetZoom}
          className="p-1.5 hover:text-amber-300 hover:bg-zinc-800 rounded transition-colors"
          title="Restablecer Encuadre"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <span className="font-mono text-xs font-semibold text-amber-400 pl-1">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Marca de Agua de Archivo Histórico */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono tracking-widest text-zinc-400 border border-zinc-800">
          <Crosshair className="w-3.5 h-3.5 text-amber-500/80" />
          REGISTRO FOTOGRÁFICO DE ARCHIVO
        </span>
      </div>

      {/* Contenedor Interactivo con Zoom y Paneo */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
          className="relative max-w-full max-h-full"
        >
          {/* Imagen de Evidencia Histórica */}
          <img
            src={imageUrl}
            alt="Evidencia Histórica"
            onLoad={() => setIsImageLoaded(true)}
            draggable={false}
            className={`max-h-[70vh] object-contain rounded shadow-lg transition-opacity duration-500 pointer-events-none ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hotspots de Pistas Visuales */}
          {isImageLoaded &&
            clues.map((clue) => {
              const isRevealed = revealedClueIds.includes(clue.id);
              const rect = clue.normalized_rect;

              return (
                <button
                  key={clue.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspectClue(clue.id);
                  }}
                  style={{
                    left: `${rect.x * 100}%`,
                    top: `${rect.y * 100}%`,
                    width: `${rect.width * 100}%`,
                    height: `${rect.height * 100}%`,
                  }}
                  className={`absolute rounded transition-all duration-300 group flex items-center justify-center ${
                    isRevealed
                      ? 'border-2 border-emerald-500/80 bg-emerald-900/20'
                      : 'border-2 border-amber-500/50 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/25 animate-pulse hover:animate-none'
                  }`}
                >
                  <div
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-md transition-transform group-hover:scale-110 ${
                      isRevealed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-zinc-950'
                    }`}
                  >
                    {isRevealed ? '✓ REVELADA' : `INSPECCIONAR (-${clue.time_penalty_seconds}s)`}
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
