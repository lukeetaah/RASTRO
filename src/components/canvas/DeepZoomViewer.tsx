'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { VisualClue } from '@/types/evidence';
import { ZoomIn, ZoomOut, RotateCcw, Crosshair, Focus } from 'lucide-react';
import { soundFx } from '@/lib/sound';

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
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredClueId, setHoveredClueId] = useState<string | null>(null);

  // Reiniciar encuadre al cambiar de imagen
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [imageUrl]);

  const resetZoom = useCallback(() => {
    soundFx.playClick();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoom = (delta: number) => {
    soundFx.playClick();
    setScale((prev) => Math.max(1, Math.min(5, Number((prev + delta).toFixed(2)))));
  };

  // Centrar y hacer zoom en una pista específica
  const focusOnClue = (clue: VisualClue) => {
    soundFx.playClick();
    const container = containerRef.current;
    if (!container) return;

    const targetScale = 2.4;
    setScale(targetScale);

    const rect = clue.normalized_rect;
    const clueCenterX = rect.x + rect.width / 2;
    const clueCenterY = rect.y + rect.height / 2;

    const imgWidth = container.clientWidth;
    const imgHeight = container.clientHeight;

    const targetX = (0.5 - clueCenterX) * (imgWidth * targetScale);
    const targetY = (0.5 - clueCenterY) * (imgHeight * targetScale);

    setPosition({ x: targetX, y: targetY });
    onInspectClue(clue.id);
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
    const zoomDelta = e.deltaY < 0 ? 0.3 : -0.3;
    setScale((prev) => Math.max(1, Math.min(5, Number((prev + zoomDelta).toFixed(2)))));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[440px] bg-[#07090c] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl flex items-center justify-center select-none"
    >
      {/* Controles de Lupa Flotantes */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-700/60 shadow-xl text-zinc-300">
        <button
          onClick={() => handleZoom(0.4)}
          className="p-1.5 hover:text-amber-300 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          title="Acercar (Zoom In)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.4)}
          className="p-1.5 hover:text-amber-300 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          title="Alejar (Zoom Out)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-zinc-700 mx-1" />
        <button
          onClick={resetZoom}
          className="p-1.5 hover:text-amber-300 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          title="Restablecer Encuadre"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <span className="font-mono text-xs font-bold text-amber-400 pl-1">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Marca de Agua de Archivo Histórico */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-mono tracking-widest text-zinc-300 border border-zinc-700/60 shadow-lg">
          <Crosshair className="w-3.5 h-3.5 text-amber-400" />
          REGISTRO FOTOGRÁFICO DE ARCHIVO
        </span>
      </div>

      {/* Barra Inferior de Pistas Disponibles */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-zinc-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-800 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Focus className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>INSPECCIONAR DETALLES:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {clues.map((clue, idx) => {
            const isRevealed = revealedClueIds.includes(clue.id);
            return (
              <button
                key={clue.id}
                onClick={() => focusOnClue(clue)}
                onMouseEnter={() => setHoveredClueId(clue.id)}
                onMouseLeave={() => setHoveredClueId(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isRevealed
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-600/70 shadow'
                    : 'bg-zinc-900 hover:bg-amber-500/20 text-zinc-200 hover:text-amber-200 border border-zinc-700 hover:border-amber-500/60 shadow-sm'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span className="font-semibold">{clue.title}</span>
                {!isRevealed && (
                  <span className="text-[10px] text-amber-400 font-bold ml-0.5">
                    (-{clue.time_penalty_seconds}s)
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenedor Interactivo con Zoom y Paneo */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden p-4"
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)',
          }}
          className="relative inline-block max-w-full max-h-full"
        >
          {/* Imagen de Evidencia Histórica Real */}
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Evidencia Histórica Real"
            referrerPolicy="no-referrer"
            draggable={false}
            className="max-h-[58vh] max-w-[85vw] object-contain rounded-lg shadow-2xl select-none"
          />

          {/* Hotspots de Pistas Visuales Directas */}
          {clues.map((clue, idx) => {
            const isRevealed = revealedClueIds.includes(clue.id);
            const isHovered = hoveredClueId === clue.id;
            const rect = clue.normalized_rect;

            return (
              <div
                key={clue.id}
                onClick={(e) => {
                  e.stopPropagation();
                  focusOnClue(clue);
                }}
                onMouseEnter={() => setHoveredClueId(clue.id)}
                onMouseLeave={() => setHoveredClueId(null)}
                style={{
                  left: `${rect.x * 100}%`,
                  top: `${rect.y * 100}%`,
                  width: `${rect.width * 100}%`,
                  height: `${rect.height * 100}%`,
                }}
                className={`absolute rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center group ${
                  isRevealed
                    ? 'border-2 border-emerald-400 bg-emerald-950/40'
                    : isHovered
                    ? 'border-2 border-amber-300 bg-amber-500/35 ring-4 ring-amber-500/25'
                    : 'border-2 border-amber-400/90 bg-amber-500/15 hover:border-amber-300 hover:bg-amber-500/30 animate-pulse hover:animate-none'
                }`}
              >
                {/* Etiqueta Flotante sobre la Zona */}
                <div
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-lg transition-transform group-hover:scale-105 flex items-center gap-1 ${
                    isRevealed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-zinc-950'
                  }`}
                >
                  <span>#{idx + 1}</span>
                  <span>{isRevealed ? '✓ REVELADA' : clue.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
