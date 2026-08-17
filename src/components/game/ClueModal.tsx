'use client';

import React, { useEffect } from 'react';
import { VisualClue } from '@/types/evidence';
import { Sparkles, X, Compass, FileText, CheckCircle2 } from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface ClueModalProps {
  clue: VisualClue | null;
  onClose: () => void;
}

export const ClueModal: React.FC<ClueModalProps> = ({ clue, onClose }) => {
  useEffect(() => {
    if (clue) {
      soundFx.playClueReveal();
    }
  }, [clue]);

  if (!clue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#12161f] border border-amber-500/50 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-zinc-100 ring-1 ring-amber-500/20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
                ZONA INSPECCIONADA
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-100">
                {clue.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Lo que se observa en la imagen */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col gap-1.5 shadow-inner">
          <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">
            <Compass className="w-4 h-4 text-amber-400" />
            Observación en la Evidencia:
          </span>
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            {clue.observation_text}
          </p>
        </div>

        {/* 2. Deducción Histórica Habilitada */}
        <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-4 flex flex-col gap-1.5 shadow-inner">
          <span className="flex items-center gap-1.5 font-mono text-xs text-amber-400 uppercase tracking-wider font-bold">
            <FileText className="w-4 h-4 text-amber-400" />
            Deducción & Significado Histórico:
          </span>
          <p className="text-sm text-amber-100 leading-relaxed font-sans">
            {clue.deduction_text}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <span className="text-[11px] font-mono text-zinc-400">
            Penalización aplicada: <strong className="text-amber-400">-{clue.time_penalty_seconds}s</strong>
          </span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 px-5 py-2 rounded-lg font-mono text-xs font-bold tracking-wider shadow-lg shadow-amber-500/20 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};
