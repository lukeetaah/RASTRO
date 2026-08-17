'use client';

import React from 'react';
import { useGameStore } from '@/store/game-store';
import { Trophy, X, Globe, RotateCw, Award } from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface LeaderboardModalProps {
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  const { leaderboard, fetchLeaderboard } = useGameStore();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    soundFx.playClick();
    setIsRefreshing(true);
    await fetchLeaderboard();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121620] border border-amber-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 sm:gap-5 text-zinc-100 ring-1 ring-amber-500/20 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                <Globe className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>CUADRO DE HONOR UNIVERSAL (EN VIVO)</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-black text-zinc-100">
                Tabla General de Récords Globales
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleRefresh}
              title="Actualizar tabla"
              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabla de Récords */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 font-mono text-xs flex flex-col items-center gap-2">
              <Award className="w-8 h-8 text-zinc-600" />
              <span>Aún no hay récords registrados. ¡Completá un duelo de 5 rondas para aparecer aquí!</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {leaderboard.map((entry, idx) => {
                const isFirst = idx === 0;
                const isSecond = idx === 1;
                const isThird = idx === 2;

                return (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl border font-mono text-xs transition-all ${
                      isFirst
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-100 shadow-md'
                        : isSecond
                        ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200'
                        : isThird
                        ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                        : 'bg-zinc-900/50 border-zinc-850 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isFirst
                            ? 'bg-amber-500 text-zinc-950 shadow-inner'
                            : isSecond
                            ? 'bg-zinc-400 text-zinc-950'
                            : isThird
                            ? 'bg-amber-700 text-zinc-100'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-zinc-100 text-xs sm:text-sm truncate">
                          {entry.player_name}
                        </span>
                        <span className="text-[10px] text-zinc-500 truncate">
                          vs {entry.rival_name} · {entry.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[9px] sm:text-[10px] text-zinc-500 block uppercase">
                          {entry.rounds_won}/5 RONDAS
                        </span>
                        <span className="font-black text-xs sm:text-sm text-amber-400">
                          {entry.total_score.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs font-mono">
          <span className="text-zinc-500 text-[10px] sm:text-xs">
            Sincronizado universalmente para todos los jugadores
          </span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl shadow-lg transition-colors cursor-pointer text-xs"
          >
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};
