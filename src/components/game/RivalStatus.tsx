'use client';

import React from 'react';
import { RivalState } from '@/types/game';
import { ShieldCheck, UserCheck, Radio, AlertCircle } from 'lucide-react';

interface RivalStatusProps {
  rival: RivalState | null;
  timeRemaining: number;
}

export const RivalStatus: React.FC<RivalStatusProps> = ({
  rival,
  timeRemaining,
}) => {
  if (!rival) return null;

  return (
    <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 rounded-lg px-4 py-2 text-xs font-mono shadow-md backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-zinc-400 text-[10px] uppercase tracking-wider">
            Rival 1v1
          </span>
          <span className="font-bold text-zinc-200">{rival.name}</span>
        </div>
        <span className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[9px] rounded font-semibold">
          {rival.archetype}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {rival.has_locked ? (
          <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-600/60 text-red-300 px-3 py-1 rounded font-bold animate-pulse">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>EL RIVAL HA SELLADO SU HIPÓTESIS</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Radio className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            <span>INVESTIGANDO EVIDENCIA...</span>
          </div>
        )}
      </div>
    </div>
  );
};
