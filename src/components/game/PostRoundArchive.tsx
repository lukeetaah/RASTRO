'use client';

import React, { useState, useEffect } from 'react';
import { RoundResult } from '@/types/game';
import { DeepZoomViewer } from '@/components/canvas/DeepZoomViewer';
import { ClueModal } from '@/components/game/ClueModal';
import { EvidenceDetailModal } from '@/components/game/EvidenceDetailModal';
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
  CheckCircle2,
  XCircle,
  Eye,
} from 'lucide-react';
import { VisualClue, CanonicalEvidence } from '@/types/evidence';
import { soundFx } from '@/lib/sound';
import { getOptimizedImageUrl } from '@/lib/image-url';

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
  const {
    evidence,
    player_score,
    rival_score,
    winner,
    player_clues_used,
    rival_lock_seconds_ahead,
    rival_advantage_reason,
    round_options,
    selected_evidence,
  } = result;

  const { roundNumber, maxRounds, roundHistory, rival, unansweredCount } = useGameStore();
  const [selectedClue, setSelectedClue] = useState<VisualClue | null>(null);
  const [inspectingEvidence, setInspectingEvidence] = useState<CanonicalEvidence | null>(null);

  // Temporizador de auto-avance (12 segundos para dar tiempo a explorar, pausado si hay modal abierto)
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(12);

  useEffect(() => {
    if (selectedClue !== null || inspectingEvidence !== null) return;

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
  }, [onNext, selectedClue, inspectingEvidence]);

  const isPlayerWinner = winner === 'PLAYER';
  const isTie = winner === 'TIE';

  const playerRoundsWon = roundHistory.filter((r) => r.winner === 'PLAYER').length;
  const rivalRoundsWon = roundHistory.filter((r) => r.winner === 'RIVAL').length;
  const isLastRound = roundNumber >= maxRounds;

  const isCorrectEvent =
    result.player_hypothesis.event_query &&
    (result.player_hypothesis.event_query.toLowerCase().trim() ===
      evidence.canonical_event.toLowerCase().trim() ||
      evidence.accepted_event_aliases.some(
        (a) => a.toLowerCase().trim() === result.player_hypothesis.event_query!.toLowerCase().trim()
      ));

  const optionsToDisplay = round_options && round_options.length > 0 ? round_options : [evidence];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-3 sm:gap-4 py-2 sm:py-3 animate-in fade-in duration-300">
      {/* 1. Header de Estado del Match + Barra de Auto-Avance */}
      <div className="flex flex-col gap-1.5 bg-zinc-900/90 border border-zinc-800 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl font-mono text-xs shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-amber-400" />
            <span className="text-zinc-400 hidden sm:inline">DUELO HISTÓRICO 1v1:</span>
            <span className="font-bold text-amber-400 bg-zinc-950 px-2 py-0.5 rounded border border-amber-500/30">
              RONDA {roundNumber} DE {maxRounds}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
              <span className="text-amber-400">Tú: {playerRoundsWon}</span>
              <span className="text-zinc-600">-</span>
              <span className="text-zinc-300">{rival?.name || 'Rival'}: {rivalRoundsWon}</span>
            </div>

            {/* Contador de Auto-Avance */}
            <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold animate-pulse">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {inspectingEvidence || selectedClue
                  ? 'Pausado (Inspección)'
                  : `Siguiente en ${autoAdvanceSeconds}s`}
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Progreso Visual del Auto-Avance */}
        <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(autoAdvanceSeconds / 12) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. Banner de Resultado de la Ronda */}
      <div
        className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl ${
          isPlayerWinner
            ? 'bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-zinc-900 border-emerald-500/50'
            : isTie
            ? 'bg-gradient-to-r from-amber-950/80 via-zinc-900 to-zinc-900 border-amber-500/50'
            : 'bg-gradient-to-r from-red-950/80 via-zinc-900 to-zinc-900 border-red-500/50'
        }`}
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div
            className={`p-2.5 sm:p-3 rounded-full shrink-0 ${
              isPlayerWinner
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : isTie
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}
          >
            {isPlayerWinner ? (
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Award className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400">
                {isPlayerWinner
                  ? 'VICTORIA DE RONDA'
                  : isTie
                  ? 'EMPATE EN LA RONDA'
                  : 'RONDA PARA EL RIVAL'}
              </span>
              {isPlayerWinner && winStreak >= 2 && (
                <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded text-amber-300 text-[9px] sm:text-[10px] font-mono font-bold">
                  🔥 RACHA: {winStreak}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-xl font-serif font-bold text-zinc-100 truncate">
              {evidence.canonical_event} ({evidence.canonical_date.year})
            </h2>
          </div>
        </div>

        {/* Marcador Comparativo 1v1 */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 bg-zinc-950/70 px-4 sm:px-5 py-1.5 rounded-xl border border-zinc-800 font-mono w-full md:w-auto shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-zinc-400">TUS PUNTOS</span>
            <span className="text-lg sm:text-xl font-black text-amber-400">
              +{player_score.total_score.toLocaleString()}
            </span>
          </div>
          <div className="text-zinc-600 font-bold text-sm">VS</div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-zinc-400">RIVAL</span>
            <span className="text-lg sm:text-xl font-black text-zinc-300">
              +{rival_score.total_score.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Alerta de Cotejo si el Jugador Eligió un Distractor */}
      {!isCorrectEvent && selected_evidence && selected_evidence.id !== evidence.id && (
        <div className="bg-red-950/30 border border-red-500/50 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2.5 min-w-0">
            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="flex flex-col min-w-0 text-xs">
              <span className="font-mono text-[10px] text-red-300 font-bold uppercase tracking-wider">
                COTEJO DE HIPÓTESIS:
              </span>
              <p className="text-zinc-200 truncate">
                Elegiste: <strong className="text-red-300">{selected_evidence.canonical_event} ({selected_evidence.canonical_date.year})</strong> en vez de {evidence.canonical_event}.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              setInspectingEvidence(selected_evidence);
            }}
            className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shrink-0 self-end sm:self-center"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Tarjeta que Elegiste</span>
          </button>
        </div>
      )}

      {/* 4. Telemetría de Ventaja del Rival (¿Por qué ganó?) */}
      {!isPlayerWinner && (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-md">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-red-500/20 text-red-400 rounded shrink-0 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-red-300 font-bold uppercase tracking-wider">
                ¿POR QUÉ GANÓ EL RIVAL ESTA RONDA?
              </span>
              <p className="text-xs font-sans text-zinc-300">
                {rival_advantage_reason || `El rival sumó ${rival_score.total_score} pts vs tus ${player_score.total_score} pts.`}
              </p>
              {rival_lock_seconds_ahead !== undefined && rival_lock_seconds_ahead > 0 && (
                <span className="text-[10px] font-mono text-amber-400 font-semibold">
                  ⏱️ Selló su veredicto {rival_lock_seconds_ahead} segundos antes que vos.
                </span>
              )}
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="flex items-center gap-1 bg-zinc-950 px-2 py-0.5 rounded border border-red-500/50 text-red-400 text-[10px] font-mono shrink-0 self-end sm:self-center">
              <AlertTriangle className="w-3 h-3" />
              <span>Inactividad: {unansweredCount}/3</span>
            </div>
          )}
        </div>
      )}

      {/* 5. Grid Central: Visor Interactivo + Ficha Histórica */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* Columna Izquierda: Visor con pistas */}
        <div className="lg:col-span-7 flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              EXPLORAR EVIDENCIA & PISTAS HISTÓRICAS
            </span>
            <span className="text-[10px] font-mono text-amber-400">
              {player_clues_used.length} / {evidence.visual_clues.length} pistas usadas
            </span>
          </div>

          <div className="h-[250px] sm:h-[340px] w-full rounded-xl overflow-hidden border border-zinc-800">
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
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {/* Ficha Canónica de Archivo */}
          <div className="bg-[#12151b] border border-zinc-800 rounded-xl p-3 sm:p-3.5 flex flex-col gap-2 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
              <span className="font-mono text-[10px] sm:text-[11px] text-amber-400 tracking-widest uppercase font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                FICHA DE ARCHIVO HISTÓRICO
              </span>
              <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
                {evidence.code}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-3 h-3 text-amber-500" />
                <span className="text-zinc-400">Fecha:</span>
                <span className="font-bold text-zinc-100">{evidence.canonical_date.display_date}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span className="text-zinc-400">Ubicación:</span>
                <span className="font-bold text-zinc-100 truncate">{evidence.canonical_location.display_location}</span>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-zinc-300 font-sans leading-relaxed pt-1 border-t border-zinc-800/80">
              {evidence.historical_context_brief}
            </p>

            <div className="bg-amber-950/20 border border-amber-700/30 rounded-lg p-2 text-[10px] sm:text-[11px] text-amber-200/90 font-sans">
              <span className="font-mono font-bold text-[9px] uppercase text-amber-400 block mb-0.5">
                ¿Cómo se deducía la evidencia?
              </span>
              {evidence.deduction_pathway}
            </div>

            <div className="flex flex-col gap-0.5 text-[9px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-1">
              <span>Custodia: <strong className="text-zinc-300">{evidence.image_source.institution}</strong></span>
              <span>Licencia: <strong className="text-zinc-300">{evidence.image_source.rights_license}</strong></span>
            </div>
          </div>

          {/* Desglose de Puntuación */}
          <div className="bg-[#12151b] border border-zinc-800 rounded-xl p-2.5 sm:p-3 flex flex-col gap-1 font-mono text-[11px]">
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">
              DESGLOSE DE PUNTUACIÓN DE LA RONDA
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-zinc-900 p-1 rounded border border-zinc-800">
                <span className="text-[9px] text-zinc-400 block">Año ({player_score.year_diff ?? 0} dif)</span>
                <span className="font-bold text-amber-300">+{player_score.year_score}</span>
              </div>
              <div className="bg-zinc-900 p-1 rounded border border-zinc-800">
                <span className="text-[9px] text-zinc-400 block">Ubicación</span>
                <span className="font-bold text-amber-300">+{player_score.location_score}</span>
              </div>
              <div className="bg-zinc-900 p-1 rounded border border-zinc-800">
                <span className="text-[9px] text-zinc-400 block">Acontecimiento</span>
                <span className="font-bold text-amber-300">+{player_score.event_score}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[9px] text-zinc-400 pt-1 border-t border-zinc-800">
              <span>Bonus Velocidad: <strong className="text-zinc-200">{player_score.time_bonus_multiplier}x</strong></span>
              <span>Penalización: <strong className="text-red-400">-{player_score.clue_penalty}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. EXPEDIENTES COTEJADOS EN ESTA RONDA (LAS 4 OPCIONES JUGABLES CON IMAGEN Y FICHA) */}
      <div className="flex flex-col gap-2 bg-[#0c0e14] border border-zinc-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs sm:text-sm font-bold text-zinc-100">
              EXPEDIENTES COTEJADOS EN ESTA RONDA ({optionsToDisplay.length} OPCIONES)
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
            Tocá cualquier tarjeta para abrir su fotografía y expediente completo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {optionsToDisplay.map((opt) => {
            const isCorrect = opt.id === evidence.id;
            const isSelected =
              result.player_hypothesis.event_query &&
              (result.player_hypothesis.event_query.toLowerCase().trim() ===
                opt.canonical_event.toLowerCase().trim() ||
                opt.accepted_event_aliases.some(
                  (a) =>
                    a.toLowerCase().trim() ===
                    result.player_hypothesis.event_query!.toLowerCase().trim()
                ));

            const optThumbnail = getOptimizedImageUrl(opt.image_url, 400);

            return (
              <div
                key={opt.id}
                onClick={() => {
                  soundFx.playClick();
                  setInspectingEvidence(opt);
                }}
                className={`group relative flex flex-col bg-[#121622] border rounded-xl overflow-hidden transition-all cursor-pointer hover:scale-[1.02] hover:shadow-xl ${
                  isCorrect
                    ? 'border-emerald-500/80 ring-1 ring-emerald-500/40'
                    : isSelected
                    ? 'border-red-500/80 ring-1 ring-red-500/40'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Thumbnail */}
                <div className="h-24 sm:h-28 w-full bg-zinc-950 relative overflow-hidden">
                  <img
                    src={optThumbnail}
                    alt={opt.canonical_event}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between gap-1">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 px-2 py-0.5 rounded text-[9px] font-mono font-bold shadow-md">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        CORRECTA
                      </span>
                    ) : isSelected ? (
                      <span className="flex items-center gap-1 bg-red-950/90 border border-red-500/80 text-red-300 px-2 py-0.5 rounded text-[9px] font-mono font-bold shadow-md">
                        <XCircle className="w-2.5 h-2.5" />
                        TU ELECCIÓN
                      </span>
                    ) : (
                      <span className="bg-zinc-900/90 border border-zinc-700 text-zinc-400 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold">
                        OPCIÓN {opt.thematic_category}
                      </span>
                    )}

                    <span className="bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-amber-300 font-bold shrink-0">
                      {opt.canonical_date.year}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 flex flex-col justify-between flex-1 gap-1">
                  <span className="font-serif font-bold text-[11px] sm:text-xs text-zinc-100 line-clamp-2 leading-snug">
                    {opt.canonical_event}
                  </span>

                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-1">
                    <span className="truncate">{opt.canonical_location.city}</span>
                    <span className="text-amber-400 group-hover:underline flex items-center gap-0.5 shrink-0">
                      <Eye className="w-3 h-3" />
                      Ver Ficha
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Botones de Acción */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={onBackToMenu}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer"
        >
          ABANDONAR
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-xl font-mono text-xs sm:text-sm font-black tracking-wider shadow-xl shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
        >
          <span>
            {isLastRound
              ? 'VER RESULTADO FINAL'
              : `SIGUIENTE RONDA (${roundNumber + 1}/${maxRounds}) [${autoAdvanceSeconds}s]`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal para inspección de pistas sobre la imagen */}
      <ClueModal clue={selectedClue} onClose={() => setSelectedClue(null)} />

      {/* Modal para inspección de cualquier evidencia de las 4 opciones */}
      <EvidenceDetailModal
        evidence={inspectingEvidence}
        targetEvidence={evidence}
        isPlayerChoice={
          inspectingEvidence
            ? result.player_hypothesis.event_query?.toLowerCase().trim() ===
                inspectingEvidence.canonical_event.toLowerCase().trim() ||
              inspectingEvidence.accepted_event_aliases.some(
                (a) =>
                  a.toLowerCase().trim() ===
                  result.player_hypothesis.event_query?.toLowerCase().trim()
              )
            : false
        }
        onClose={() => setInspectingEvidence(null)}
      />
    </div>
  );
};
