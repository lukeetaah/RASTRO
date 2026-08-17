'use client';

import React, { useState } from 'react';
import { RoundResult } from '@/types/game';
import { DeepZoomViewer } from '@/components/canvas/DeepZoomViewer';
import { ClueModal } from '@/components/game/ClueModal';
import {
  Trophy,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { VisualClue } from '@/types/evidence';

interface PostRoundArchiveProps {
  result: RoundResult;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const PostRoundArchive: React.FC<PostRoundArchiveProps> = ({
  result,
  onPlayAgain,
  onBackToMenu,
}) => {
  const { evidence, player_score, rival_score, winner, player_clues_used } = result;
  const [selectedClue, setSelectedClue] = useState<VisualClue | null>(null);

  const isPlayerWinner = winner === 'PLAYER';
  const isTie = winner === 'TIE';

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 py-4 animate-in fade-in duration-300">
      {/* Banner de Resultado de Ronda */}
      <div
        className={`w-full p-6 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl ${
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
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              {isPlayerWinner
                ? 'VICTORIA POR DEDUCCIÓN'
                : isTie
                ? 'EMPATE TÁCTICO'
                : 'VICTORIA DEL RIVAL'}
            </span>
            <h2 className="text-2xl font-serif font-bold text-zinc-100">
              {evidence.canonical_event} ({evidence.canonical_date.year})
            </h2>
          </div>
        </div>

        {/* Marcador Comparativo 1v1 */}
        <div className="flex items-center gap-6 bg-zinc-950/70 px-6 py-3 rounded-lg border border-zinc-800 font-mono">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-400">TU PUNTAJE</span>
            <span className="text-2xl font-bold text-amber-400">
              {player_score.total_score.toLocaleString()}
            </span>
          </div>
          <div className="text-zinc-600 font-bold text-xl">VS</div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-400">RIVAL</span>
            <span className="text-2xl font-bold text-zinc-300">
              {rival_score.total_score.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Central: Visor Interactivo de Archivo + Ficha Histórica */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Visor con pistas reveladas */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              EXPLORAR EVIDENCIA & PISTAS HISTÓRICAS
            </span>
            <span className="text-[11px] font-mono text-amber-400">
              {player_clues_used.length} / {evidence.visual_clues.length} pistas usadas en partida
            </span>
          </div>

          <div className="h-[420px] w-full">
            <DeepZoomViewer
              imageUrl={evidence.image_hd_url || evidence.image_url}
              clues={evidence.visual_clues}
              revealedClueIds={evidence.visual_clues.map((c) => c.id)} // Mostrar todas en post-ronda
              onInspectClue={(clueId) => {
                const found = evidence.visual_clues.find((c) => c.id === clueId);
                if (found) setSelectedClue(found);
              }}
            />
          </div>
        </div>

        {/* Columna Derecha: Ficha Histórica & Metadatos del AGN/LoC */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Ficha Canónica de Archivo */}
          <div className="bg-[#12151b] border border-zinc-800 rounded-xl p-5 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                FICHA DE ARCHIVO HISTÓRICO
              </span>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
                {evidence.code}
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-zinc-400">Fecha canónica:</span>
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

            {/* Contexto Breve Curado */}
            <p className="text-sm text-zinc-300 font-sans leading-relaxed pt-1 border-t border-zinc-800/80">
              {evidence.historical_context_brief}
            </p>

            {/* Vía de Deducción */}
            <div className="bg-amber-950/20 border border-amber-700/30 rounded-lg p-3 text-xs text-amber-200/90 font-sans">
              <span className="font-mono font-bold text-[10px] uppercase text-amber-400 block mb-1">
                ¿Cómo se deducía la evidencia?
              </span>
              {evidence.deduction_pathway}
            </div>

            {/* Fuente y Derechos */}
            <div className="flex flex-col gap-1 text-[11px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-2">
              <span className="text-zinc-400">
                Custodia:{' '}
                <strong className="text-zinc-300">
                  {evidence.image_source.institution}
                </strong>{' '}
                ({evidence.image_source.collection_id})
              </span>
              <span className="text-zinc-400">
                Licencia: <strong className="text-zinc-300">{evidence.image_source.rights_license}</strong>
              </span>
            </div>
          </div>

          {/* Desglose de Puntuación */}
          <div className="bg-[#12151b] border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 font-mono text-xs">
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              DESGLOSE DE TU PUNTAJE
            </span>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Año ({player_score.year_diff ?? 0} dif)</span>
                <span className="font-bold text-amber-300">+{player_score.year_score}</span>
              </div>
              <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Ubicación</span>
                <span className="font-bold text-amber-300">+{player_score.location_score}</span>
              </div>
              <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Acontecimiento</span>
                <span className="font-bold text-amber-300">+{player_score.event_score}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
              <span>Multiplicador de Velocidad: <strong className="text-zinc-200">{player_score.time_bonus_multiplier}x</strong></span>
              <span>Penalización de Pistas: <strong className="text-red-400">-{player_score.clue_penalty}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onBackToMenu}
          className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-mono text-xs font-semibold transition-colors"
        >
          VOLVER AL LOBBY
        </button>
        <button
          onClick={onPlayAgain}
          className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-lg font-mono text-xs font-bold tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all"
        >
          SIGUIENTE RONDA 1v1
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal para inspección libre post-ronda */}
      <ClueModal clue={selectedClue} onClose={() => setSelectedClue(null)} />
    </div>
  );
};
