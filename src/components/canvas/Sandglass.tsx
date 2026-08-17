'use client';

import React, { useEffect, useRef } from 'react';

interface SandglassProps {
  timeRemaining: number;
  totalTime: number;
  className?: string;
  isPenaltyActive?: boolean;
}

export const Sandglass: React.FC<SandglassProps> = ({
  timeRemaining,
  totalTime,
  className = '',
  isPenaltyActive = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    const width = canvas.width;
    const height = canvas.height;

    // Proporción de arena restante (0 = vacío, 1 = lleno arriba)
    const ratio = Math.max(0, Math.min(1, timeRemaining / totalTime));

    // Paleta dinámica según urgencia
    let sandColor = 'rgba(217, 178, 107, 0.9)'; // Oro cálido base
    let streamColor = 'rgba(235, 204, 142, 0.95)';
    if (ratio < 0.25) {
      sandColor = 'rgba(220, 68, 68, 0.95)'; // Carmesí crítico (<22s)
      streamColor = 'rgba(248, 113, 113, 1)';
    } else if (ratio < 0.5) {
      sandColor = 'rgba(234, 140, 48, 0.95)'; // Ámbar de advertencia
      streamColor = 'rgba(251, 191, 36, 0.95)';
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dibujar estructura exterior del reloj de cristal
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2.5;

      // Silueta de doble cono
      ctx.beginPath();
      // Bulbo superior
      ctx.moveTo(12, 10);
      ctx.lineTo(width - 12, 10);
      ctx.lineTo(width / 2 + 5, height / 2 - 2);
      // Garganta
      ctx.lineTo(width / 2 + 5, height / 2 + 2);
      // Bulbo inferior
      ctx.lineTo(width - 12, height - 10);
      ctx.lineTo(12, height - 10);
      ctx.lineTo(width / 2 - 5, height / 2 + 2);
      ctx.lineTo(width / 2 - 5, height / 2 - 2);
      ctx.closePath();
      ctx.stroke();

      // Tapas de bronce superior e inferior
      ctx.fillStyle = 'rgba(180, 150, 90, 0.8)';
      ctx.fillRect(8, 6, width - 16, 5);
      ctx.fillRect(8, height - 11, width - 16, 5);

      // 1. Arena en el bulbo superior
      if (ratio > 0) {
        ctx.save();
        ctx.beginPath();
        const topH = (height / 2 - 14) * ratio;
        const startY = height / 2 - 4 - topH;

        ctx.moveTo(width / 2 - 5, height / 2 - 3);
        ctx.lineTo(width / 2 + 5, height / 2 - 3);
        ctx.lineTo(width - 16 - (1 - ratio) * 12, startY);
        ctx.lineTo(16 + (1 - ratio) * 12, startY);
        ctx.closePath();
        ctx.fillStyle = sandColor;
        ctx.fill();
        ctx.restore();
      }

      // 2. Chorro central de arena cayendo
      if (ratio > 0.01) {
        ctx.save();
        ctx.beginPath();
        const streamW = isPenaltyActive ? 3.5 : 2;
        ctx.moveTo(width / 2 - streamW / 2, height / 2 - 2);
        ctx.lineTo(width / 2 + streamW / 2, height / 2 - 2);
        ctx.lineTo(width / 2 + streamW / 2, height - 14 - (1 - ratio) * (height / 2 - 20));
        ctx.lineTo(width / 2 - streamW / 2, height - 14 - (1 - ratio) * (height / 2 - 20));
        ctx.closePath();
        ctx.fillStyle = streamColor;
        ctx.fill();
        ctx.restore();
      }

      // 3. Montículo de arena acumulada en el bulbo inferior
      const bottomRatio = 1 - ratio;
      if (bottomRatio > 0) {
        ctx.save();
        ctx.beginPath();
        const bHeight = (height / 2 - 16) * bottomRatio;
        const peakY = height - 12 - bHeight;

        ctx.moveTo(14, height - 12);
        ctx.lineTo(width - 14, height - 12);
        ctx.lineTo(width / 2 + 10 + bottomRatio * 4, peakY + 4);
        ctx.quadraticCurveTo(width / 2, peakY, width / 2 - 10 - bottomRatio * 4, peakY + 4);
        ctx.closePath();
        ctx.fillStyle = sandColor;
        ctx.fill();
        ctx.restore();
      }

      // Brillo del cristal
      ctx.beginPath();
      ctx.moveTo(18, 16);
      ctx.lineTo(26, height / 2 - 8);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [timeRemaining, totalTime, isPenaltyActive]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={76}
          height={112}
          className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        />
        {isPenaltyActive && (
          <div className="absolute -top-3 -right-2 bg-red-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
            -8s
          </div>
        )}
      </div>
      <div className="mt-1 flex items-baseline gap-1 font-mono">
        <span
          className={`text-xl font-bold tracking-tight ${
            timeRemaining < 25 ? 'text-red-400 animate-pulse' : 'text-amber-200'
          }`}
        >
          {timeRemaining}
        </span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">seg</span>
      </div>
    </div>
  );
};
