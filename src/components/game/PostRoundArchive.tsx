'use client';

import React, { useState, useEffect } from 'react';
import { RoundResult } from '@/types/game';
import { DeepZoomViewer } from '@/components/canvas/DeepZoomViewer';
import { ClueModal } from '@/components/game/ClueModal';
import { useGameStore } from '@/store/game-store';
import {
  Trophy,
  Award,
  ArrowRight,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  Swords,
  Clock,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { VisualClue } from '@/types/evidence';
import { soundFx } from '@/lib/sound';

interface PostRoundArchiveProps {
  result: RoundResult;
  winStreak?: number;
  onNext: () => void;
  onBackToMenu: () => void;
}

export const PostRoundArchive: React.FC<PostRoundArchiveProps> = ({
  result,
  winStreak = 0,
  onNext,
  onBackToMenu,
}) => {
  const { evidence, player_score, rival_score, winner, player_clues_used, rival_lock_seconds_ahead, rival_advantage_reason } = result;
  const { roundNumber, maxRounds, roundHistory, rival, unansweredCount } = useGameStore();
  const [selectedClue, setSelectedClue] = useState<VisualClue | null>(null);

  // Temporizador de auto-avance (5 segundos) para no frenar la dinámica
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setAutoAdvanceSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNext]);

  const isPlayerWinner = winner === 'PLAYER';
  const isTie = winner === 'TIE';

  const playerRoundsWon = roundHistory.filter((r) => r.winner === 'PLAYER').length;
  const rivalRoundsWon = roundHistory.filter((r) => r.winner === 'RIVAL').length;
  const isLastRound = roundNumber >= maxRounds;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-5 py-3 animate-in fade-in duration-300">
      {/* 1. Header de Estado del Match + Barra de Auto-Avance */}
      <div className="flex flex-col gap-2 bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl font-mono text-xs shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-amber-400" />
            <span className="text-zinc-400">DUELO HISTÓRICO 1v1:</span>
            <span className="font-bold text-amber-400 bg-zinc-950 px-2.5 py-1 rounded border border-amber-500/30">
              RONDA {roundNumber} DE {maxRounds}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-sm">
              <span className="text-amber-400">Tú: {playerRoundsWon}</span>
              <span className="text-zinc-600">-</span>
              <span className="text-zinc-300">{rival?.name || 'Rival'}: {rivalRoundsWon}</span>
            </div>

            {/* Contador de Auto-Avance */}
            <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-lg text-[11px] font-bold animate-pulse">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Siguiente ronda en {autoAdvanceSeconds}s</span>
            </div>
          </div>
        </div>

        {/* Barra de Progreso Visual del Auto-Avance */}
        <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(autoAdvanceSeconds / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. Banner de Resultado de la Ronda */}
      <div
        className={`w-full p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl ${
          isPlayerWinner
            ? 'bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-zinc-900 border-emerald-500/50'
            : isTie
            ? 'bg-gradient-to-r from-amber-950/80 via-zinc-900 to-zinc-900 border-amber-500/50'
            : 'bg-gradient-to-r from-red-950/80 via-zinc-900 to-zinc-900 border-red-500/50'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3.5 rounded-full ${
              isPlayerWinner
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : isTie
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}
          >
            {isPlayerWinner ? (
              <Trophy className="w-8 h-8" />
            ) : (
              <Award className="w-8 h-8" />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {isPlayerWinner
                  ? 'VICTORIA DE RONDA'
                  : isTie
                  ? 'EMPATE EN LA RONDA'
                  : 'RONDA PARA EL RIVAL'}
              </span>
              {isPlayerWinner && winStreak >= 2 && (
                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded text-amber-300 text-[10px] font-mono font-bold">
                  🔥 RACHA: {winStreak}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-100">
              {evidence.canonical_event} ({evidence.canonical_date.year})
            </h2>
          </div>
        </div>

        {/* Marcador Comparativo 1v1 */}
        <div className="flex items-center gap-6 bg-zinc-950/70 px-6 py-3 rounded-xl border border-zinc-800 font-mono shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-400">TU PUNTAJE</span>
            <span className="text-2xl font-black text-amber-400">
              {player_score.total_score.toLocaleString()}
            </span>
          </div>
          <div className="text-zinc-600 font-bold text-xl">VS</div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-400">RIVAL</span>
            <span className="text-2xl font-black text-zinc-300">
              {rival_score.total_score.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 3. CALLOUT DE VENTAJA DEL RIVAL (TELEMETRÍA DE POR QUÉ GANÓ) */}
      {!isPlayerWinner && (
        <div className="bg-red-950/40 border border-red-500/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-500/20 text-red-400 rounded-lg shrink-0 mt-0.5">
              <Flame className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-xs text-red-300 font-bold uppercase tracking-wider">
                ¿POR QUÉ GANÓ EL RIVAL ESTA RONDA?
              </span>
              <p className="text-sm font-sans text-zinc-200">
                {rival_advantage_reason || `El rival sumó ${rival_score.total_score} pts frente a tus ${player_score.total_score} pts.`}
              </p>
              {rival_lock_seconds_ahead !== undefined && rival_lock_seconds_ahead > 0 && (
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  ⏱️ Selló su veredicto {rival_lock_seconds_ahead} segundos antes que vos.
                </span>
              )}
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-red-500/50 text-red-400 text-xs font-mono shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Inactividad: {unansweredCount}/3</span>
            </div>
          )}
        </div>
      )}

      {/* 4. Grid Central: Visor Interactivo + Ficha Histórica */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Columna Izquierda: Visor con pistas */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              EXPLORAR EVIDENCIA & PISTAS HISTÓRICAS
            </span>
            <span className="text-[11px] font-mono text-amber-400">
              {player_clues_used.length} / {evidence.visual_clues.length} pistas usadas
            </span>
          </div>

          <div className="h-[380px] w-full">
            <DeepZoomViewer
              imageUrl={evidence.image_hd_url || evidence.image_url}
              clues={evidence.visual_clues}
              revealedClueIds={evidence.visual_clues.map((c) => c.id)}
              onInspectClue={(clueId) => {
                const found = evidence.visual_clues.find((c) => c.id === clueId);
                if (found) setSelectedClue(found);
              }}
            />
          </div>
        </div>

        {/* Columna Derecha: Ficha Histórica & Desglose */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Ficha Canónica de Archivo */}
          <div className="bg-[#12151b] border border-zinc-800 rounded-xl p-4 flex flex-col gap-2.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                FICHA DE ARCHIVO HISTÓRICO
              </span>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
                {evidence.code}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-zinc-400">Fecha:</span>
                <span className="font-bold text-zinc-100">
                  {evidence.canonical_date.display_date}
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-zinc-400">Ubicación:</span>
                <span className="font-bold text-zinc-100">
                  {evidence.canonical_location.display_location}
                </span>
              </div>
            </div>

            {/* Contexto Breve */}
            <p className="text-xs text-zinc-300 font-sans leading-relaxed pt-1 border-t border-zinc-800/80">
              {evidence.historical_context_brief}
            </p>

            {/* Vía de Deducción */}
            <div className="bg-amber-950/20 border border-amber-700/30 rounded-lg p-2.5 text-xs text-amber-200/90 font-sans">
              <span className="font-mono font-bold text-[10px] uppercase text-amber-400 block mb-0.5">
                ¿Cómo se deducía la evidencia?
              </span>
              {evidence.deduction_pathway}
            </div>

            {/* Custodia y Licencia */}
            <div className="flex flex-col gap-0.5 text-[10px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-1.5">
              <span>Custodia: <strong className="text-zinc-300">{evidence.image_source.institution}</strong></span>
              <span>Licencia: <strong className="text-zinc-300">{evidence.image_source.rights_license}</strong></span>
            </div>
          </div>

          {/* Desglose de Puntuación */}
          <div className="bg-[#12151b] border border-zinc-800 rounded-xl p-3.5 flex flex-col gap-2 font-mono text-xs">
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              DESGLOSE DE PUNTUACIÓN DE LA RONDA
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-zinc-900 p-1.5 rounded border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Año ({player_score.year_diff ?? 0} dif)</span>
                <span className="font-bold text-amber-300">+{player_score.year_score}</span>
              </div>
              <div className="bg-zinc-900 p-1.5 rounded border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Ubicación</span>
                <span className="font-bold text-amber-300">+{player_score.location_score}</span>
              </div>
              <div className="bg-zinc-900 p-1.5 rounded border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Acontecimiento</span>
                <span className="font-bold text-amber-300">+{player_score.event_score}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-1 border-t border-zinc-800">
              <span>Bonus Velocidad: <strong className="text-zinc-200">{player_score.time_bonus_multiplier}x</strong></span>
              <span>Penalización: <strong className="text-red-400">-{player_score.clue_penalty}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Botones de Acción */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onBackToMenu}
          className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer"
        >
          ABANDONAR DUELO
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-xl font-mono text-xs font-black tracking-wider shadow-xl shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
        >
          <span>
            {isLastRound
              ? 'VER RESULTADO FINAL DEL DUELO'
              : `SIGUIENTE RONDA (${roundNumber + 1}/${maxRounds}) [${autoAdvanceSeconds}s]`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal para inspección libre post-ronda */}
      <ClueModal clue={selectedClue} onClose={() => setSelectedClue(null)} />
    </div>
  );
};
