'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/game-store';
import {
  Trophy,
  RotateCcw,
  Crown,
  Medal,
  CheckCircle2,
  GraduationCap,
  AlertTriangle,
  PenTool,
  Sparkles,
} from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface MatchSummaryModalProps {
  onRematch: () => void;
  onViewLeaderboard: () => void;
  onBackToLobby: () => void;
}

export const MatchSummaryModal: React.FC<MatchSummaryModalProps> = ({
  onRematch,
  onViewLeaderboard,
  onBackToLobby,
}) => {
  const { matchSummary, playerName, difficultyMode, setDifficultyMode, saveLeaderboardRecord, resetToLobby } = useGameStore();
  const [hasSigned, setHasSigned] = useState(false);

  if (!matchSummary) return null;

  const isPlayerWinner = matchSummary.winner === 'PLAYER';
  const isTie = matchSummary.winner === 'TIE';
  const isBlitz = difficultyMode === 'BLITZ';
  const lostBadly = !isPlayerWinner && !isTie && matchSummary.player_rounds_won <= 1;
  const wasForfeited = !!matchSummary.forfeited_due_to_inactivity;

  const formattedDateTime = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date()) + ' hs';

  const handleSignAct = async () => {
    if (hasSigned) return;
    soundFx.playStamp();
    await saveLeaderboardRecord();
    setHasSigned(true);
  };

  const handleSwitchToPractice = () => {
    soundFx.playClick();
    setDifficultyMode('PRACTICE');
    resetToLobby();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 py-4 animate-in zoom-in-95 duration-300">
      {/* 1. Banner Principal de Fin de Duelo */}
      <div
        className={`w-full p-6 sm:p-8 rounded-2xl border flex flex-col items-center text-center gap-3 sm:gap-4 shadow-2xl relative overflow-hidden ${
          isPlayerWinner
            ? 'bg-gradient-to-b from-amber-950/80 via-zinc-900 to-zinc-950 border-amber-500/60 ring-2 ring-amber-500/20'
            : isTie
            ? 'bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 border-zinc-700'
            : 'bg-gradient-to-b from-red-950/80 via-zinc-900 to-zinc-950 border-red-500/50'
        }`}
      >
        <div
          className={`p-3 sm:p-4 rounded-full shadow-xl ${
            isPlayerWinner
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
              : isTie
              ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
              : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}
        >
          {isPlayerWinner ? (
            <Crown className="w-10 h-10 sm:w-12 sm:h-12" />
          ) : (
            <Medal className="w-10 h-10 sm:w-12 sm:h-12" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-bold">
            FIN DEL DUELO HISTÓRICO (5 RONDAS)
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-zinc-100">
            {wasForfeited
              ? 'PARTIDA PERDIDA POR INACTIVIDAD'
              : isPlayerWinner
              ? '¡VICTORIA TOTAL EN EL ARCHIVO!'
              : isTie
              ? 'EMPATE TÁCTICO ABSOLUTO'
              : 'VICTORIA DEL RIVAL'}
          </h1>
          <p className="text-xs sm:text-sm font-sans text-zinc-400 max-w-md mx-auto">
            {wasForfeited
              ? `No respondiste en 3 rondas consecutivas. La victoria fue otorgada automáticamente a ${matchSummary.rival.name}.`
              : `Duelo completado frente a ${matchSummary.rival.name} (${matchSummary.rival.archetype}).`}
          </p>

          {wasForfeited && (
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-300 px-3.5 py-1 rounded-full font-mono text-[11px] sm:text-xs mt-1 self-center">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>3 STRIKES POR INACTIVIDAD — VEREDICTO DESTITUIDO</span>
            </div>
          )}
        </div>

        {/* Marcador Acumulado Final */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg mt-1 font-mono">
          <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 sm:p-4 rounded-xl flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase truncate">Tus Puntos</span>
            <span className="text-lg sm:text-2xl font-black text-amber-400">
              {matchSummary.player_total_score.toLocaleString()}
            </span>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 sm:p-4 rounded-xl flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase truncate">Rondas Ganadas</span>
            <span className="text-lg sm:text-2xl font-black text-emerald-400">
              {matchSummary.player_rounds_won}-{matchSummary.rival_rounds_won}
            </span>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 sm:p-4 rounded-xl flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase truncate">Puntos Rival</span>
            <span className="text-lg sm:text-2xl font-black text-zinc-300">
              {matchSummary.rival_total_score.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Firma Directa del Cuadro de Honor Universal (1-Click con Nickname) */}
      <div className="bg-gradient-to-r from-[#121622] via-[#0f1218] to-[#121622] border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3 text-left w-full sm:w-auto">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40 shrink-0">
            <PenTool className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] sm:text-xs text-amber-400 uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ACTA OFICIAL DEL DUELO
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 font-sans truncate">
              Investigador: <strong className="text-amber-300">{playerName}</strong> · {matchSummary.player_total_score.toLocaleString()} pts
            </p>
            <span className="text-[10px] font-mono text-zinc-500">
              {formattedDateTime} · vs {matchSummary.rival.name}
            </span>
          </div>
        </div>

        <button
          onClick={handleSignAct}
          disabled={hasSigned}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-black tracking-wider transition-all cursor-pointer shrink-0 ${
            hasSigned
              ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-md cursor-default'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-xl shadow-amber-500/25 active:scale-95'
          }`}
        >
          {hasSigned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>✓ ACTA FIRMADA EN EL CUADRO DE HONOR</span>
            </>
          ) : (
            <>
              <PenTool className="w-4 h-4" />
              <span>FIRMAR ACTA EN EL CUADRO DE HONOR</span>
            </>
          )}
        </button>
      </div>

      {/* 3. CTA de Modo Práctica si perdió */}
      {lostBadly && isBlitz && (
        <div className="bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl animate-in slide-in-from-bottom duration-300">
          <div className="flex flex-col gap-1 text-left">
            <span className="font-mono text-xs text-emerald-400 uppercase font-bold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              ¿EL BLITZ FUE MUY RÁPIDO?
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-md">
              Probá el <strong className="text-emerald-300">Modo Práctica</strong> con <strong>35 segundos</strong> por ronda y un rival más tranquilo.
            </p>
          </div>
          <button
            onClick={handleSwitchToPractice}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-mono text-xs font-black tracking-wider shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <GraduationCap className="w-4 h-4" />
            <span>ACTIVAR MODO PRÁCTICA</span>
          </button>
        </div>
      )}

      {/* 4. Historial de las Rondas */}
      <div className="bg-[#0f1218] border border-zinc-800 rounded-2xl p-3.5 sm:p-4 flex flex-col gap-2 shadow-xl">
        <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-bold">
          DESGLOSE DE LAS RONDAS JUGADAS:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {matchSummary.round_history.map((r, idx) => {
            const won = r.winner === 'PLAYER';
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex flex-col gap-1 text-left font-mono text-xs transition-all ${
                  won
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400">Ronda {idx + 1}</span>
                  <span className="text-[10px] font-bold">
                    {won ? '✓ GANADA' : '✗ PERDIDA'}
                  </span>
                </div>
                <span className="font-bold text-zinc-100 truncate text-[11px]">
                  {r.evidence.canonical_event}
                </span>
                <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-1 border-t border-zinc-800/80">
                  <span>Tú: +{r.player_score.total_score}</span>
                  <span>Rival: +{r.rival_score.total_score}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Botones de Acción */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <button
          onClick={onBackToLobby}
          className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer"
        >
          VOLVER AL LOBBY
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onViewLeaderboard}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>TABLA GENERAL</span>
          </button>

          <button
            onClick={onRematch}
            className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-xl font-mono text-xs sm:text-sm font-black tracking-wider shadow-xl shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REVANCHA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
