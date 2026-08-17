'use client';

import React from 'react';
import { useGameStore } from '@/store/game-store';
import { Trophy, Flame, Compass, Settings } from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface NavbarProps {
  currentView: 'GAME' | 'STUDIO';
  onSwitchView: (view: 'GAME' | 'STUDIO') => void;
  onOpenLeaderboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onSwitchView, onOpenLeaderboard }) => {
  const { playerStats } = useGameStore();

  return (
    <header className="w-full bg-[#0d1016]/90 border-b border-zinc-800/80 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo de RASTRO */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-serif font-black text-zinc-950 text-lg shadow-md shadow-amber-500/20">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-lg tracking-widest text-zinc-100 leading-none">
              RASTRO
            </span>
            <span className="font-mono text-[9px] tracking-widest text-amber-500/90 uppercase font-semibold">
              Investigación Histórica 1v1
            </span>
          </div>
        </div>

        {/* Stats del Investigador */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Victorias: <strong className="text-zinc-200">{playerStats.matches_won}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Puntos: <strong className="text-zinc-200">{playerStats.total_score.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Selector de Modo (Juego / Tabla / Studio) */}
        <div className="flex items-center gap-2">
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenLeaderboard();
              }}
              title="Ver Tabla General de Récords"
              className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-amber-400 rounded text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span className="hidden md:inline">RÉCORDS</span>
            </button>
          )}
          <button
            onClick={() => onSwitchView('GAME')}
            className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              currentView === 'GAME'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            PARTIDA 1v1
          </button>
          <button
            onClick={() => onSwitchView('STUDIO')}
            className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              currentView === 'STUDIO'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            <Settings className="w-3 h-3" />
            STUDIO
          </button>
        </div>
      </div>
    </header>
  );
};
