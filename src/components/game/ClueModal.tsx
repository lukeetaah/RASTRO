'use client';

import React from 'react';
import { VisualClue } from '@/types/evidence';
import { Sparkles, X, Compass, FileText } from 'lucide-react';

interface ClueModalProps {
  clue: VisualClue | null;
  onClose: () => void;
}

export const ClueModal: React.FC<ClueModalProps> = ({ clue, onClose }) => {
  if (!clue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141820] border border-amber-500/40 rounded-xl p-6 shadow-2xl flex flex-col gap-4 text-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono text-sm font-bold text-amber-300 uppercase tracking-wider">
              {clue.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Observación Objetiva */}
        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-lg p-3.5 flex flex-col gap-1">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
            <Compass className="w-3.5 h-3.5 text-zinc-400" />
            Observación Objetiva (Lo que se ve en la imagen):
          </span>
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            {clue.observation_text}
          </p>
        </div>

        {/* Deducción Histórica Habilitada */}
        <div className="bg-amber-950/30 border border-amber-600/30 rounded-lg p-3.5 flex flex-col gap-1">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400 uppercase tracking-wider font-semibold">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            Deducción Histórica:
          </span>
          <p className="text-sm text-amber-200/90 leading-relaxed font-sans">
            {clue.deduction_text}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider transition-colors shadow"
          >
            VOLVER A LA EVIDENCIA
          </button>
        </div>
      </div>
    </div>
  );
};
