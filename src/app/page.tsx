'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useGameStore } from '@/store/game-store';
import { Navbar } from '@/components/layout/Navbar';
import { DeepZoomViewer } from '@/components/canvas/DeepZoomViewer';
import { Sandglass } from '@/components/canvas/Sandglass';
import { RivalStatus } from '@/components/game/RivalStatus';
import { HypothesisForm } from '@/components/game/HypothesisForm';
import { ClueModal } from '@/components/game/ClueModal';
import { PostRoundArchive } from '@/components/game/PostRoundArchive';
import { MatchSummaryModal } from '@/components/game/MatchSummaryModal';
import { LeaderboardModal } from '@/components/game/LeaderboardModal';
import { BackofficeStudio } from '@/components/studio/Backoffice';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords,
  ShieldCheck,
  Radio,
  Target,
  Flame,
  Zap,
  Eye,
  Clock,
  Trophy,
} from 'lucide-react';
import { soundFx } from '@/lib/sound';

export default function RastroApp() {
  const [currentView, setCurrentView] = useState<'GAME' | 'STUDIO'>('GAME');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [winStreak, setWinStreak] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const lastRivalLockedRef = useRef(false);

  const {
    phase,
    roundNumber,
    maxRounds,
    currentEvidence,
    timeRemainingSeconds,
    totalTimeSeconds,
    revealedClueIds,
    playerHypothesis,
    selectedClueModalId,
    rival,
    roundResult,
    playerStats,
    startMatchmaking,
    startRound,
    nextRoundOrFinishMatch,
    startRematch,
    tickTimer,
    inspectClue,
    setSelectedClueModal,
    setPlayerHypothesis,
    submitPlayerVerdict,
    resetToLobby,
  } = useGameStore();

  // Sonido de urgencia cuando queda poco tiempo
  useEffect(() => {
    if (phase === 'INVESTIGATING' && timeRemainingSeconds <= 15 && timeRemainingSeconds > 0) {
      soundFx.playUrgentTick();
    }
  }, [phase, timeRemainingSeconds]);

  // Sonido cuando el rival sella su hipótesis
  useEffect(() => {
    if (rival?.has_locked && !lastRivalLockedRef.current) {
      soundFx.playRivalLocked();
      lastRivalLockedRef.current = true;
    }
    if (!rival?.has_locked) {
      lastRivalLockedRef.current = false;
    }
  }, [rival?.has_locked]);

  // Victoria / Derrota + racha
  useEffect(() => {
    if (phase === 'POST_ROUND_ARCHIVE' && roundResult) {
      if (roundResult.winner === 'PLAYER') {
        soundFx.playVictory();
        setWinStreak((s) => s + 1);
      } else {
        soundFx.playDefeat();
        setWinStreak(0);
      }
    }
  }, [phase, roundResult]);

  // Countdown cinematográfico 3-2-1-¡YA!
  useEffect(() => {
    if (phase !== 'ROUND_START') {
      setCountdown(null);
      return;
    }

    setCountdown(3);
    soundFx.playCountdown();

    const t2 = setTimeout(() => {
      setCountdown(2);
      soundFx.playCountdown();
    }, 800);
    const t1 = setTimeout(() => {
      setCountdown(1);
      soundFx.playCountdown();
    }, 1600);
    const tGo = setTimeout(() => {
      setCountdown(0); // "¡YA!"
      soundFx.playCountdownGo();
    }, 2400);

    return () => {
      clearTimeout(t2);
      clearTimeout(t1);
      clearTimeout(tGo);
    };
  }, [phase]);

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

  const urgencyClass =
    timeRemainingSeconds <= 15
      ? 'border-red-500/40'
      : timeRemainingSeconds <= 30
      ? 'border-amber-500/30'
      : 'border-zinc-800';

  return (
    <div className="min-h-screen flex flex-col bg-[#090b0e] text-zinc-100">
      <Navbar
        currentView={currentView}
        onSwitchView={setCurrentView}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
      />

      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto p-3 sm:p-6">
        {currentView === 'STUDIO' ? (
          <BackofficeStudio onBackToGame={() => setCurrentView('GAME')} />
        ) : (
          <>
            {/* 1. LOBBY PRINCIPAL */}
            <AnimatePresence mode="wait">
              {phase === 'IDLE' && (
                <motion.div
                  key="lobby"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto gap-8 py-12"
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold tracking-widest uppercase">
                      Duelo de Investigación Histórica 1v1 · 5 Rondas
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-zinc-100 leading-tight">
                      La historia no es una trivia.
                      <br />
                      <span className="text-amber-400">
                        Es la evidencia.
                      </span>
                    </h1>
                    <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-lg">
                      Competí en un match de 5 rondas a tiempo decreciente.
                      Observá fotografías de archivo, identificá vestigios y superá a tu rival antes de que se agote la arena.
                    </p>
                  </div>

                  {/* Estadísticas del jugador y accesos */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
                    <button
                      onClick={() => setShowLeaderboard(true)}
                      className="flex items-center gap-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer shadow-md"
                    >
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Cuadro de Honor / Récords</span>
                    </button>

                    {playerStats.matches_played > 0 && (
                      <>
                        <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                          <span className="text-zinc-400">Victorias:</span>
                          <span className="text-zinc-200 font-bold">{playerStats.matches_won}</span>
                        </div>
                        {winStreak >= 2 && (
                          <div className="flex items-center gap-1.5 bg-amber-500/15 px-3 py-1.5 rounded-lg border border-amber-500/40">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-amber-300 font-bold">Racha: {winStreak}🔥</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Botón Principal de Matchmaking */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      soundFx.playClick();
                      startMatchmaking();
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-xl font-mono text-sm font-black tracking-wider shadow-2xl shadow-amber-500/30 transition-colors cursor-pointer"
                  >
                    <Swords className="w-5 h-5" />
                    INICIAR DUELO (5 RONDAS)
                  </motion.button>

                  {/* Pilares del Juego */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-zinc-800/80 text-left font-mono text-xs text-zinc-400">
                    <div className="p-3.5 bg-zinc-900/60 rounded-lg border border-zinc-800 flex flex-col gap-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        1. Observación Pura
                      </span>
                      Inspeccioná arquitectura, vehículos, modas y vestigios a alta resolución.
                    </div>
                    <div className="p-3.5 bg-zinc-900/60 rounded-lg border border-zinc-800 flex flex-col gap-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        2. Dificultad Creciente
                      </span>
                      El tiempo disminuye por ronda (75s → 60s → 50s → 40s → 30s).
                    </div>
                    <div className="p-3.5 bg-zinc-900/60 rounded-lg border border-zinc-800 flex flex-col gap-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Swords className="w-3.5 h-3.5" />
                        3. Match a 5 Rondas
                      </span>
                      Sumá puntos, vencé a tu rival y disputá la revancha directa.
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Fotografías de archivo verificadas (AGN, NASA, NARA, Europeana)</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. MATCHMAKING SCREEN */}
            <AnimatePresence mode="wait">
              {phase === 'MATCHMAKING' && (
                <motion.div
                  key="matchmaking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20"
                >
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
                      Preparando baraja de 5 evidencias y sincronizando cronómetros
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. MATCH FOUND + COUNTDOWN 3-2-1-¡YA! */}
            <AnimatePresence mode="wait">
              {(phase === 'MATCH_FOUND' || phase === 'ROUND_START') && rival && (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20"
                >
                  {phase === 'MATCH_FOUND' && (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className="p-4 bg-emerald-950/80 border border-emerald-600/60 rounded-full text-emerald-400 shadow-xl"
                      >
                        <Swords className="w-10 h-10" />
                      </motion.div>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
                          ¡DUELO EMPAREJADO (MATCH A 5 RONDAS)!
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-zinc-100">
                          Tú vs {rival.name}
                        </h2>
                        <span className="text-xs font-mono text-zinc-400">
                          Estilo táctico: <strong>{rival.archetype}</strong>
                        </span>
                      </div>
                    </>
                  )}

                  {phase === 'ROUND_START' && countdown !== null && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest font-bold bg-zinc-950 px-3 py-1 rounded-full border border-amber-500/40">
                        <span>RONDA {roundNumber} DE {maxRounds}</span>
                        <span>•</span>
                        <span>{totalTimeSeconds} SEGUNDOS</span>
                      </div>
                      <motion.div
                        key={countdown}
                        initial={{ scale: 2.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className={`text-8xl font-mono font-black ${
                          countdown === 0 ? 'text-amber-400' : 'text-zinc-200'
                        }`}
                      >
                        {countdown === 0 ? '¡YA!' : countdown}
                      </motion.div>
                      <span className="text-xs font-mono text-zinc-500">
                        vs {rival.name} · {currentEvidence?.thematic_category}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. RONDA ACTIVA (INVESTIGACIÓN Y DEEP ZOOM) */}
            <AnimatePresence mode="wait">
              {phase === 'INVESTIGATING' && currentEvidence && (
                <motion.div
                  key="investigating"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex-1 flex flex-col gap-3"
                >
                  {/* Banner de Misión + Ronda Activa */}
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900 border rounded-lg px-4 py-2 text-xs font-mono transition-colors ${urgencyClass}`}
                  >
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <Target className="w-4 h-4 text-amber-400" />
                      <span>RONDA {roundNumber}/5 · IDENTIFICÁ EL ACONTECIMIENTO Y EL AÑO</span>
                      {winStreak >= 2 && (
                        <span className="ml-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded text-amber-300 text-[10px] font-bold">
                          🔥 Racha: {winStreak}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                      <span>1. Mirá la foto</span>
                      <span>•</span>
                      <span>2. Elegí Acontecimiento</span>
                      <span>•</span>
                      <span className="text-amber-400 font-bold">3. Sellar Veredicto</span>
                    </div>
                  </div>

                  {/* Barra Superior de Estado y Tensión */}
                  <div
                    className={`grid grid-cols-12 gap-3 items-center bg-[#0e1117] border rounded-xl p-3 shadow-lg transition-colors ${urgencyClass}`}
                  >
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
                  <div className="w-full h-[48vh] min-h-[380px]">
                    <DeepZoomViewer
                      imageUrl={currentEvidence.image_url}
                      clues={currentEvidence.visual_clues}
                      revealedClueIds={revealedClueIds}
                      onInspectClue={inspectClue}
                    />
                  </div>

                  {/* Formulario de Hipótesis (Año / Evento / Ubicación / Ayudas) */}
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* 5. RESOLVIENDO RONDA */}
            <AnimatePresence mode="wait">
              {phase === 'ROUND_RESOLVING' && (
                <motion.div
                  key="resolving"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500"
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-mono font-bold text-zinc-100">
                      Comprobando Fuentes & Sellando Veredictos...
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      Calculando distancias cronológicas y cotejando con el Archivo General
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 6. POST-RONDA INTERMEDIA */}
            <AnimatePresence mode="wait">
              {phase === 'POST_ROUND_ARCHIVE' && roundResult && (
                <motion.div
                  key="postround"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <PostRoundArchive
                    result={roundResult}
                    winStreak={winStreak}
                    onNext={() => {
                      soundFx.playClick();
                      nextRoundOrFinishMatch();
                    }}
                    onBackToMenu={() => {
                      soundFx.playClick();
                      resetToLobby();
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 7. RESUMEN FINAL DEL DUELO (MATCH OVER) */}
            <AnimatePresence mode="wait">
              {phase === 'MATCH_OVER' && (
                <motion.div
                  key="matchover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <MatchSummaryModal
                    onRematch={() => {
                      soundFx.playClick();
                      startRematch();
                    }}
                    onViewLeaderboard={() => setShowLeaderboard(true)}
                    onBackToLobby={() => {
                      soundFx.playClick();
                      resetToLobby();
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal de Tabla General / Leaderboard */}
            {showLeaderboard && (
              <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
