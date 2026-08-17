'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { VisualClue } from '@/types/evidence';
import { ZoomIn, ZoomOut, RotateCcw, Focus, AlertTriangle } from 'lucide-react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reiniciar encuadre al cambiar de imagen
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsLoaded(false);
    setHasError(false);
  }, [imageUrl]);

  const resetZoom = useCallback(() => {
    soundFx.playClick();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoom = (delta: number) => {
    soundFx.playClick();
    setScale((prev) => {
      const nextScale = Math.max(1, Math.min(4, Number((prev + delta).toFixed(2))));
      if (nextScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return nextScale;
    });
  };

  // Centrar y hacer zoom en una pista específica
  const focusOnClue = (clue: VisualClue) => {
    soundFx.playClick();
    const container = containerRef.current;
    if (!container) return;

    const targetScale = 2.2;
    setScale(targetScale);

    const rect = clue.normalized_rect;
    const clueCenterX = rect.x + rect.width / 2;
    const clueCenterY = rect.y + rect.height / 2;

    const imgWidth = container.clientWidth;
    const imgHeight = container.clientHeight;

    const targetX = (0.5 - clueCenterX) * (imgWidth * 0.8 * targetScale);
    const targetY = (0.5 - clueCenterY) * (imgHeight * 0.8 * targetScale);

    setPosition({ x: targetX, y: targetY });
    onInspectClue(clue.id);
  };

  // Mouse Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive || scale <= 1) return;
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

  // Touch Dragging para Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive || scale <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !interactive || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.3 : -0.3;
    setScale((prev) => {
      const nextScale = Math.max(1, Math.min(4, Number((prev + zoomDelta).toFixed(2))));
      if (nextScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return nextScale;
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[160px] bg-[#07090c] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl flex items-center justify-center select-none touch-none"
    >
      {/* Controles de Lupa Flotantes (Compactos, Accesibles y Tapables) */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-xl border border-zinc-700/80 shadow-2xl text-zinc-300">
        <button
          onClick={() => handleZoom(0.4)}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:text-amber-300 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer active:scale-95"
          title="Acercar (Zoom In)"
        >
          <ZoomIn className="w-4 h-4 text-zinc-200" />
        </button>
        <button
          onClick={() => handleZoom(-0.4)}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:text-amber-300 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer active:scale-95"
          title="Alejar (Zoom Out)"
        >
          <ZoomOut className="w-4 h-4 text-zinc-200" />
        </button>
        <div className="w-[1px] h-4 bg-zinc-700 mx-0.5" />
        <button
          onClick={resetZoom}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:text-amber-300 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer active:scale-95"
          title="Restablecer Encuadre"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-200" />
        </button>
        <span className="font-mono text-[10px] sm:text-xs font-bold text-amber-400 pl-1 pr-0.5">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Barra Inferior de Pistas Disponibles (Discreta y no intrusiva) */}
      {clues.length > 0 && (
        <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between gap-1 bg-zinc-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-zinc-800 shadow-xl">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
            <Focus className="w-3 h-3 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">PISTAS:</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {clues.map((clue, idx) => {
              const isRevealed = revealedClueIds.includes(clue.id);
              return (
                <button
                  key={clue.id}
                  onClick={() => focusOnClue(clue)}
                  onMouseEnter={() => setHoveredClueId(clue.id)}
                  onMouseLeave={() => setHoveredClueId(null)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    isRevealed
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-600/70'
                      : 'bg-zinc-900 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-200 border border-zinc-700'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-semibold truncate max-w-[110px] sm:max-w-[160px]">{clue.title}</span>
                  {!isRevealed && (
                    <span className="text-[9px] text-amber-400 font-bold">
                      (-{clue.time_penalty_seconds}s)
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Spinner de Carga */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400 z-10 p-4 text-center">
          <AlertTriangle className="w-8 h-8 text-amber-500" />
          <span className="font-mono text-xs">Error cargando archivo fotográfico</span>
        </div>
      )}

      {/* Contenedor Interactivo con Zoom y Paneo */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className={`relative w-full h-full flex items-center justify-center overflow-hidden p-1 sm:p-2 ${
          scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
          }}
          className="relative max-w-full max-h-full flex items-center justify-center"
        >
          {/* Imagen de Evidencia Histórica Real: Encuadrada 100% sin zoom forzado de inicio */}
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Evidencia Histórica Real"
            referrerPolicy="no-referrer"
            draggable={false}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className="max-h-[34vh] sm:max-h-[46vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl select-none block"
          />

          {/* Hotspots de Pistas Visuales Directas */}
          {isLoaded &&
            clues.map((clue, idx) => {
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
                      ? 'border-2 border-amber-300 bg-amber-500/35 ring-2 ring-amber-500/30'
                      : 'border-2 border-amber-400/90 bg-amber-500/15 hover:border-amber-300 hover:bg-amber-500/30 animate-pulse'
                  }`}
                >
                  <div
                    className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold shadow-lg transition-transform group-hover:scale-105 flex items-center gap-0.5 ${
                      isRevealed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-zinc-950'
                    }`}
                  >
                    <span>#{idx + 1}</span>
                    <span>{isRevealed ? '✓' : clue.title}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
