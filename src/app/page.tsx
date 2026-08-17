'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/game-store';
import { Navbar } from '@/components/layout/Navbar';
import { DeepZoomViewer } from '@/components/canvas/DeepZoomViewer';
import { Sandglass } from '@/components/canvas/Sandglass';
import { RivalStatus } from '@/components/game/RivalStatus';
import { HypothesisForm } from '@/components/game/HypothesisForm';
import { ClueModal } from '@/components/game/ClueModal';
import { PostRoundArchive } from '@/components/game/PostRoundArchive';
import { BackofficeStudio } from '@/components/studio/Backoffice';
import {
  Swords,
  ShieldCheck,
  Compass,
  History,
  Radio,
  BookOpen,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';

export default function RastroApp() {
  const [currentView, setCurrentView] = useState<'GAME' | 'STUDIO'>('GAME');

  const {
    phase,
    currentEvidence,
    timeRemainingSeconds,
    totalTimeSeconds,
    revealedClueIds,
    playerHypothesis,
    selectedClueModalId,
    rival,
    roundResult,
    startMatchmaking,
    startRound,
    tickTimer,
    inspectClue,
    setSelectedClueModal,
    setPlayerHypothesis,
    submitPlayerVerdict,
    resetToLobby,
  } = useGameStore();

  // Timer loop en fases activas
  useEffect(() => {
    if (phase !== 'INVESTIGATING') return;

    const interval = setInterval(() => {
      tickTimer(1);
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, tickTimer]);

  const activeClue = currentEvidence?.visual_clues.find(
    (c) => c.id === selectedClueModalId
  ) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#090b0e] text-zinc-100">
      <Navbar currentView={currentView} onSwitchView={setCurrentView} />

      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto p-4 sm:p-6">
        {currentView === 'STUDIO' ? (
          <BackofficeStudio onBackToGame={() => setCurrentView('GAME')} />
        ) : (
          <>
            {/* 1. LOBBY PRINCIPAL */}
            {phase === 'IDLE' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto gap-8 py-12 animate-in fade-in duration-300">
                <div className="flex flex-col items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold tracking-widest uppercase">
                    Motor de Investigación Histórica 1v1
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-zinc-100">
                    La historia no es una trivia.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      Es la evidencia.
                    </span>
                  </h1>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-lg">
                    Dos investigadores reciben la misma fotografía o documento histórico real. Observá con lupa, deducí el acontecimiento y competí contra un reloj de arena de 90 segundos.
                  </p>
                </div>

                {/* Botón Principal de Matchmaking */}
                <button
                  onClick={startMatchmaking}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-xl font-mono text-sm font-black tracking-wider shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Swords className="w-5 h-5" />
                  INICIAR DUELO HISTÓRICO 1v1
                </button>

                {/* Pilares del Juego */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-zinc-800/80 text-left font-mono text-xs text-zinc-400">
                  <div className="p-3.5 bg-zinc-900/60 rounded-lg border border-zinc-800">
                    <span className="text-amber-400 font-bold block mb-1">
                      1. Observación Pura
                    </span>
                    Inspeccioná arquitectura, vehículos, modas y vestigios a alta resolución.
                  </div>
                  <div className="p-3.5 bg-zinc-900/60 rounded-lg border border-zinc-800">
                    <span className="text-amber-400 font-bold block mb-1">
                      2. Riesgo vs Tiempo
                    </span>
                    Pedir una pista histórica drena arena de tu reloj físico.
                  </div>
                  <div className="p-3.5 bg-zinc-900/60 rounded-lg border border-zinc-800">
                    <span className="text-amber-400 font-bold block mb-1">
                      3. Tensión 1v1
                    </span>
                    Descubrí si tu rival arriesgó rápido o dudó hasta el final.
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Juego Limpio: Sin asistentes externos ni preguntas ambiguas.</span>
                </div>
              </div>
            )}

            {/* 2. MATCHMAKING SCREEN */}
            {phase === 'MATCHMAKING' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20 animate-in fade-in duration-300">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin flex items-center justify-center">
                    <Radio className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-mono font-bold text-zinc-200">
                    Buscando Rival en el Archivo...
                  </h2>
                  <p className="text-xs font-mono text-zinc-500">
                    Sincronizando reloj autoritativo y seleccionando evidencia canónica
                  </p>
                </div>
              </div>
            )}

            {/* 3. MATCH FOUND & PREPARING */}
            {phase === 'MATCH_FOUND' && rival && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20 animate-in zoom-in-95 duration-300">
                <div className="p-4 bg-emerald-950/80 border border-emerald-600/60 rounded-full text-emerald-400 shadow-xl">
                  <Swords className="w-10 h-10" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
                    ¡DUELO EMPAREJADO!
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-zinc-100">
                    Tú vs {rival.name}
                  </h2>
                  <span className="text-xs font-mono text-zinc-400">
                    Estilo táctico: <strong>{rival.archetype}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* 4. RONDA ACTIVA (INVESTIGACIÓN Y DEEP ZOOM) */}
            {(phase === 'INVESTIGATING' || phase === 'ROUND_START' || phase === 'SUBMITTING') &&
              currentEvidence && (
                <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300">
                  {/* Barra Superior de Estado y Tensión */}
                  <div className="grid grid-cols-12 gap-4 items-center bg-[#0e1117] border border-zinc-800 rounded-xl p-3 shadow-lg">
                    {/* Rival 1v1 */}
                    <div className="col-span-8 md:col-span-9">
                      <RivalStatus rival={rival} timeRemaining={timeRemainingSeconds} />
                    </div>

                    {/* Reloj de Arena Físico */}
                    <div className="col-span-4 md:col-span-3 flex justify-end pr-2">
                      <Sandglass
                        timeRemaining={timeRemainingSeconds}
                        totalTime={totalTimeSeconds}
                      />
                    </div>
                  </div>

                  {/* Lienzo Principal de Evidencia (Deep Zoom & Pistas) */}
                  <div className="w-full h-[50vh] min-h-[380px]">
                    <DeepZoomViewer
                      imageUrl={currentEvidence.image_url}
                      clues={currentEvidence.visual_clues}
                      revealedClueIds={revealedClueIds}
                      onInspectClue={inspectClue}
                    />
                  </div>

                  {/* Formulario de Hipótesis (Año / Evento / Ubicación) */}
                  <HypothesisForm
                    evidence={currentEvidence}
                    hypothesis={playerHypothesis}
                    onUpdateHypothesis={setPlayerHypothesis}
                    onSubmitVerdict={submitPlayerVerdict}
                    timeRemaining={timeRemainingSeconds}
                  />

                  {/* Modal de Pista */}
                  <ClueModal
                    clue={activeClue}
                    onClose={() => setSelectedClueModal(null)}
                  />
                </div>
              )}

            {/* 5. RESOLVIENDO RONDA */}
            {phase === 'ROUND_RESOLVING' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-mono font-bold text-zinc-100">
                    Comprobando Fuentes & Sellando Veredictos...
                  </h2>
                  <p className="text-xs font-mono text-zinc-400">
                    Calculando distancias cronológicas y cotejando con el Archivo General
                  </p>
                </div>
              </div>
            )}

            {/* 6. POST-RONDA Y ARCHIVO */}
            {phase === 'POST_ROUND_ARCHIVE' && roundResult && (
              <PostRoundArchive
                result={roundResult}
                onPlayAgain={() => startRound()}
                onBackToMenu={resetToLobby}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
