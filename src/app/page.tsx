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
  Zap,
  Eye,
  Clock,
  Trophy,
  GraduationCap,
  User,
  Users,
  PenLine,
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
    difficultyMode,
    playerName,
    onlineCount,
    currentEvidence,
    timeRemainingSeconds,
    totalTimeSeconds,
    revealedClueIds,
    playerHypothesis,
    selectedClueModalId,
    rival,
    roundResult,
    playerStats,
    setPlayerName,
    setDifficultyMode,
    fetchOnlineCount,
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
    fetchLeaderboard,
  } = useGameStore();

  // Cargar tabla general y conteo de jugadores activos al inicio
  useEffect(() => {
    fetchLeaderboard();
    fetchOnlineCount();
    const interval = setInterval(fetchOnlineCount, 8000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard, fetchOnlineCount]);

  // Sonido de urgencia cuando queda poco tiempo
  useEffect(() => {
    if (phase === 'INVESTIGATING' && timeRemainingSeconds <= 8 && timeRemainingSeconds > 0) {
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

    soundFx.unlockAudio();
    setCountdown(3);
    soundFx.playCountdown();

    const t2 = setTimeout(() => {
      setCountdown(2);
      soundFx.playCountdown();
    }, 750);
    const t1 = setTimeout(() => {
      setCountdown(1);
      soundFx.playCountdown();
    }, 1500);
    const tGo = setTimeout(() => {
      setCountdown(0);
      soundFx.playCountdownGo();
    }, 2200);

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
    timeRemainingSeconds <= 6
      ? 'border-red-500/50 ring-2 ring-red-500/20'
      : timeRemainingSeconds <= 12
      ? 'border-amber-500/40'
      : 'border-zinc-800';

  return (
    <div
      onClick={() => soundFx.unlockAudio()}
      className="min-h-screen flex flex-col bg-[#090b0e] text-zinc-100 selection:bg-amber-500 selection:text-zinc-950"
    >
      <Navbar
        currentView={currentView}
        onSwitchView={setCurrentView}
        onOpenLeaderboard={() => {
          fetchLeaderboard();
          setShowLeaderboard(true);
        }}
      />

      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto p-2 sm:p-5">
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
                  className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto gap-4 sm:gap-6 py-4 sm:py-6"
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                    {/* Indicador de jugadores en vivo */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <Users className="w-3.5 h-3.5" />
                      <span>{onlineCount} investigadores en línea</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-zinc-100 leading-tight">
                      La historia no es una trivia.
                      <br />
                      <span className="text-amber-400">
                        Es la evidencia.
                      </span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-lg">
                      57 evidencias fotográficas reales de dominio público (AGN, NASA, NARA, Europeana, Library of Congress). Deducción visual, opciones dinámicas e investigación forense en tiempo real.
                    </p>
                  </div>

                  {/* Selector de Alias / Nickname del Jugador */}
                  <div className="flex items-center gap-2 bg-[#121622] border border-amber-500/40 px-3.5 py-2 rounded-2xl shadow-lg w-full max-w-sm">
                    <User className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="flex flex-col text-left flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                        Tu Alias en el Archivo:
                      </span>
                      <input
                        type="text"
                        value={playerName}
                        maxLength={22}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Tu Nombre o Apodo"
                        className="bg-transparent font-mono text-xs font-bold text-amber-200 outline-none placeholder:text-zinc-600 truncate"
                      />
                    </div>
                    <PenLine className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  </div>

                  {/* Selector de Modo de Dificultad */}
                  <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 font-mono text-xs shadow-inner">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setDifficultyMode('BLITZ');
                      }}
                      className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                        difficultyMode === 'BLITZ'
                          ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/25'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Duelo Blitz 1v1 (20s)</span>
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setDifficultyMode('PRACTICE');
                      }}
                      className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                        difficultyMode === 'PRACTICE'
                          ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/25'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>🎓 Práctica Guiada (35s)</span>
                    </button>
                  </div>

                  {/* Estadísticas del jugador y accesos */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
                    <button
                      onClick={() => {
                        fetchLeaderboard();
                        setShowLeaderboard(true);
                      }}
                      className="flex items-center gap-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer shadow-md"
                    >
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Cuadro de Honor Universal</span>
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
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      soundFx.unlockAudio();
                      soundFx.playClick();
                      startMatchmaking();
                    }}
                    className="flex items-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-xl font-mono text-xs sm:text-sm font-black tracking-wider shadow-2xl shadow-amber-500/30 transition-colors cursor-pointer"
                  >
                    <Swords className="w-5 h-5" />
                    {difficultyMode === 'BLITZ'
                      ? 'BUSCAR DUELO 1v1 (5 RONDAS)'
                      : 'INICIAR PRÁCTICA GUIADA (5 RONDAS)'}
                  </motion.button>

                  {/* Pilares del Juego */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-3 border-t border-zinc-800/80 text-left font-mono text-xs text-zinc-400">
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 flex flex-col gap-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        1. Observación Pura
                      </span>
                      Inspeccioná vestigios visuales históricos a alta resolución.
                    </div>
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 flex flex-col gap-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        2. Tensión Cardíaca
                      </span>
                      Latidos acelerando con tiempo decreciente (20s → 10s).
                    </div>
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 flex flex-col gap-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Swords className="w-3.5 h-3.5" />
                        3. Match 1v1 en Vivo
                      </span>
                      Jugá contra personas reales o bots y firmá el acta con 1 clic.
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Fotografías de archivo verificadas · 100% Dominio Público</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. MATCHMAKING SCREEN (BUSCANDO RIVAL HUMANO / BOT) */}
            <AnimatePresence mode="wait">
              {phase === 'MATCHMAKING' && (
                <motion.div
                  key="matchmaking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-16"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin flex items-center justify-center">
                      <Radio className="w-8 h-8 text-amber-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-sm">
                    <h2 className="text-xl font-mono font-bold text-zinc-200">
                      Buscando Oponente en Línea...
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      Explorando la sala de espera para emparejarte con otro investigador disponible o asignando un rival de guardia.
                    </p>
                    <span className="text-[11px] font-mono text-amber-400 mt-1">
                      Jugando como: <strong>{playerName}</strong>
                    </span>
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
                  className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-16"
                >
                  {phase === 'MATCH_FOUND' && (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className={`p-4 rounded-full shadow-xl ${
                          rival.is_human
                            ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300 ring-4 ring-emerald-500/20'
                            : 'bg-amber-950/80 border border-amber-500 text-amber-400'
                        }`}
                      >
                        <Swords className="w-10 h-10" />
                      </motion.div>
                      <div className="flex flex-col gap-1">
                        <span className={`font-mono text-xs font-bold uppercase tracking-widest ${
                          rival.is_human ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {rival.is_human
                            ? '¡JUGADOR REAL ENCONTRADO EN LA SALA!'
                            : difficultyMode === 'BLITZ'
                            ? '¡DUELO EMPAREJADO CON ARCHIVISTA!'
                            : '¡ENTRENAMIENTO GUIADO!'}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100">
                          {playerName} vs {rival.name}
                        </h2>
                        <span className="text-xs font-mono text-zinc-400">
                          {rival.is_human ? '🟢 Contrincante Humano Conectado' : `Estilo táctico: ${rival.archetype}`}
                        </span>
                      </div>
                    </>
                  )}

                  {phase === 'ROUND_START' && countdown !== null && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest font-bold bg-zinc-950 px-4 py-1.5 rounded-full border border-amber-500/40">
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

            {/* 4. RONDA ACTIVA */}
            <AnimatePresence mode="wait">
              {phase === 'INVESTIGATING' && currentEvidence && (
                <motion.div
                  key="investigating"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 h-[calc(100dvh-4.2rem)] sm:h-auto flex flex-col justify-between overflow-hidden gap-1.5 sm:gap-3"
                >
                  <div
                    className={`grid grid-cols-12 gap-2 items-center bg-[#0e1117] border rounded-xl p-2 sm:p-2.5 shadow-lg transition-colors shrink-0 ${urgencyClass}`}
                  >
                    <div className="col-span-8 sm:col-span-9 flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[10px] sm:text-xs font-bold truncate">
                        <Target className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>Ronda {roundNumber}/5</span>
                        {winStreak >= 2 && (
                          <span className="px-1.5 py-0.2 bg-amber-500/20 rounded text-[9px] text-amber-300">
                            🔥x{winStreak}
                          </span>
                        )}
                        <span className="text-zinc-500">|</span>
                        <span className="text-zinc-400 truncate">Elegí el Evento</span>
                      </div>
                      <RivalStatus rival={rival} timeRemaining={timeRemainingSeconds} />
                    </div>

                    <div className="col-span-4 sm:col-span-3 flex justify-end pr-1 shrink-0">
                      <Sandglass
                        timeRemaining={timeRemainingSeconds}
                        totalTime={totalTimeSeconds}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-h-[160px] max-h-[38vh] sm:max-h-[48vh] w-full rounded-xl overflow-hidden shadow-xl border border-zinc-800">
                    <DeepZoomViewer
                      imageUrl={currentEvidence.image_url}
                      clues={currentEvidence.visual_clues}
                      revealedClueIds={revealedClueIds}
                      onInspectClue={inspectClue}
                    />
                  </div>

                  <HypothesisForm
                    evidence={currentEvidence}
                    hypothesis={playerHypothesis}
                    onUpdateHypothesis={setPlayerHypothesis}
                    onSubmitVerdict={submitPlayerVerdict}
                    timeRemaining={timeRemainingSeconds}
                  />

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
                  className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-16"
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

            {/* 6. POST-RONDA INTERMEDIA (7 SEGUNDOS AUTO-AVANCE) */}
            <AnimatePresence mode="wait">
              {phase === 'POST_ROUND_ARCHIVE' && roundResult && (
                <motion.div
                  key="postround"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
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
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <MatchSummaryModal
                    onRematch={() => {
                      soundFx.playClick();
                      startRematch();
                    }}
                    onViewLeaderboard={() => {
                      fetchLeaderboard();
                      setShowLeaderboard(true);
                    }}
                    onBackToLobby={() => {
                      soundFx.playClick();
                      resetToLobby();
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal de Tabla General Universal */}
            {showLeaderboard && (
              <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
