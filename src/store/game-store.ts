import { create } from 'zustand';
import { CanonicalEvidence } from '@/types/evidence';
import {
  GamePhase,
  PlayerHypothesis,
  PlayerStats,
  RivalState,
  RoundResult,
  MatchSummary,
  LeaderboardEntry,
} from '@/types/game';
import { CANONICAL_EVIDENCES, getEvidenceById } from '@/data/canonical-evidences';
import {
  calculateRivalLockTime,
  generateRivalHypothesis,
  generateSimulatedRival,
} from '@/lib/fake-rival';
import { calculateScore } from '@/lib/scoring';
import { soundFx } from '@/lib/sound';

// Duración de tiempo decreciente por ronda (de 1 a 5)
const ROUND_DURATIONS = [75, 60, 50, 40, 30];

interface GameStoreState {
  phase: GamePhase;
  gameMode: 'BOT_TRAINING' | 'MULTIPLAYER_ONLINE';
  currentEvidence: CanonicalEvidence | null;
  unplayedDeck: string[]; // Baraja de IDs sin repetir

  // Ronda y Partida (Match de 5 rondas)
  roundNumber: number; // 1 a 5
  maxRounds: number; // 5
  roundHistory: RoundResult[];
  matchSummary: MatchSummary | null;

  // Ayudas de Archivo (2 por sesión de match)
  lifelinesRemaining: number;
  eliminatedEventOptions: string[];
  decadeFilter: { min: number; max: number } | null;

  // Temporizador dinámico
  timeRemainingSeconds: number;
  totalTimeSeconds: number;

  // Pistas
  revealedClueIds: string[];
  playerHypothesis: PlayerHypothesis;
  isInspectingImage: boolean;
  selectedClueModalId: string | null;

  // Rival 1v1
  rival: RivalState | null;
  rivalLockTargetTime: number | null;
  rivalHypothesisData: { hypothesis: PlayerHypothesis; cluesUsed: string[] } | null;

  // Resultados y Estadísticas
  roundResult: RoundResult | null;
  playerStats: PlayerStats;
  leaderboard: LeaderboardEntry[];

  // Acciones
  setGameMode: (mode: 'BOT_TRAINING' | 'MULTIPLAYER_ONLINE') => void;
  startMatchmaking: () => void;
  startRound: (customEvidence?: CanonicalEvidence) => void;
  nextRoundOrFinishMatch: () => void;
  startRematch: () => void;
  tickTimer: (seconds: number) => void;
  inspectClue: (clueId: string) => void;
  setSelectedClueModal: (clueId: string | null) => void;
  setPlayerHypothesis: (partial: Partial<PlayerHypothesis>) => void;
  submitPlayerVerdict: () => void;
  resolveRound: () => void;
  resetToLobby: () => void;

  // Ayudas
  useLifeline5050: () => void;
  useLifelineDecade: () => void;

  // Leaderboard
  saveLeaderboardRecord: (playerName: string) => void;
}

// Función para barajar un array aleatoriamente (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const LOCAL_STORAGE_LEADERBOARD_KEY = 'rastro_leaderboard_v1';

function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LEADERBOARD_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLeaderboardToStorage(entries: LeaderboardEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {}
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  phase: 'IDLE',
  gameMode: 'BOT_TRAINING',
  currentEvidence: null,
  unplayedDeck: [],

  roundNumber: 1,
  maxRounds: 5,
  roundHistory: [],
  matchSummary: null,

  lifelinesRemaining: 2,
  eliminatedEventOptions: [],
  decadeFilter: null,

  timeRemainingSeconds: 75,
  totalTimeSeconds: 75,
  revealedClueIds: [],
  playerHypothesis: {},
  isInspectingImage: false,
  selectedClueModalId: null,

  rival: null,
  rivalLockTargetTime: null,
  rivalHypothesisData: null,

  roundResult: null,
  playerStats: {
    matches_played: 0,
    matches_won: 0,
    total_score: 0,
    avg_response_time: 0,
    clues_per_round_avg: 0,
    accuracy_rate: 0,
  },
  leaderboard: loadLeaderboard(),

  setGameMode: (mode) => set({ gameMode: mode }),

  startMatchmaking: () => {
    set({
      phase: 'MATCHMAKING',
      roundNumber: 1,
      roundHistory: [],
      matchSummary: null,
      lifelinesRemaining: 2,
    });

    setTimeout(() => {
      const simulatedRival = generateSimulatedRival();
      set({
        phase: 'MATCH_FOUND',
        rival: simulatedRival,
      });

      setTimeout(() => {
        get().startRound();
      }, 1600);
    }, 1800);
  },

  startRound: (customEvidence?: CanonicalEvidence) => {
    let evidence: CanonicalEvidence;
    const { roundNumber } = get();

    if (customEvidence) {
      evidence = customEvidence;
    } else {
      let currentDeck = get().unplayedDeck;
      // Si la baraja está vacía o tiene menos preguntas que las necesarias, barajamos todo el corpus
      if (!currentDeck || currentDeck.length === 0) {
        currentDeck = shuffleArray(CANONICAL_EVIDENCES.map((e) => e.id));
      }

      const nextId = currentDeck[0];
      const remainingDeck = currentDeck.slice(1);
      evidence = getEvidenceById(nextId) || CANONICAL_EVIDENCES[0];
      set({ unplayedDeck: remainingDeck });
    }

    // Duración escalada por ronda: R1=75s, R2=60s, R3=50s, R4=40s, R5=30s
    const roundIndex = Math.min(roundNumber - 1, ROUND_DURATIONS.length - 1);
    const roundDuration = ROUND_DURATIONS[roundIndex];

    const currentRival = get().rival || generateSimulatedRival();
    const lockTarget = calculateRivalLockTime(currentRival.archetype);
    const rivalData = generateRivalHypothesis(evidence, currentRival.archetype);

    set({
      phase: 'ROUND_START',
      currentEvidence: evidence,
      timeRemainingSeconds: roundDuration,
      totalTimeSeconds: roundDuration,
      revealedClueIds: [],
      eliminatedEventOptions: [],
      decadeFilter: null,
      playerHypothesis: {
        // Default neutral year (1950) instead of giving away the answer
        year: 1950,
        location: undefined,
        event_query: '',
      },
      selectedClueModalId: null,
      rival: {
        ...currentRival,
        has_locked: false,
        time_remaining_seconds: roundDuration,
      },
      rivalLockTargetTime: Math.min(roundDuration - 10, lockTarget),
      rivalHypothesisData: rivalData,
      roundResult: null,
    });

    setTimeout(() => {
      if (get().phase === 'ROUND_START') {
        set({ phase: 'INVESTIGATING' });
      }
    }, 1200);
  },

  nextRoundOrFinishMatch: () => {
    const { roundNumber, maxRounds, roundHistory, rival } = get();

    if (roundNumber >= maxRounds) {
      // Fin del match de 5 rondas -> Calcular resumen
      const playerTotal = roundHistory.reduce((acc, r) => acc + r.player_score.total_score, 0);
      const rivalTotal = roundHistory.reduce((acc, r) => acc + r.rival_score.total_score, 0);
      const playerRoundsWon = roundHistory.filter((r) => r.winner === 'PLAYER').length;
      const rivalRoundsWon = roundHistory.filter((r) => r.winner === 'RIVAL').length;

      let matchWinner: 'PLAYER' | 'RIVAL' | 'TIE' = 'TIE';
      if (playerTotal > rivalTotal) matchWinner = 'PLAYER';
      else if (playerTotal < rivalTotal) matchWinner = 'RIVAL';

      const summary: MatchSummary = {
        player_total_score: playerTotal,
        rival_total_score: rivalTotal,
        player_rounds_won: playerRoundsWon,
        rival_rounds_won: rivalRoundsWon,
        winner: matchWinner,
        rival: rival || generateSimulatedRival(),
        round_history: roundHistory,
        completed_at: new Date().toISOString(),
      };

      set({
        phase: 'MATCH_OVER',
        matchSummary: summary,
      });
    } else {
      // Avanzar a la siguiente ronda del duelo
      set({ roundNumber: roundNumber + 1 });
      get().startRound();
    }
  },

  startRematch: () => {
    const { rival } = get();
    set({
      roundNumber: 1,
      roundHistory: [],
      matchSummary: null,
      lifelinesRemaining: 2,
    });
    get().startRound();
  },

  useLifeline5050: () => {
    const { lifelinesRemaining, currentEvidence, eliminatedEventOptions } = get();
    if (lifelinesRemaining <= 0 || !currentEvidence || eliminatedEventOptions.length > 0) return;

    soundFx.playLifeline();

    const options = currentEvidence.distractor_events || [
      'Acontecimiento A',
      'Acontecimiento B',
      'Acontecimiento C',
      currentEvidence.canonical_event,
    ];

    const incorrectOptions = options.filter(
      (opt) => opt.toLowerCase() !== currentEvidence.canonical_event.toLowerCase()
    );

    const shuffledIncorrect = shuffleArray(incorrectOptions);
    const toEliminate = shuffledIncorrect.slice(0, 2);

    set({
      lifelinesRemaining: lifelinesRemaining - 1,
      eliminatedEventOptions: toEliminate,
    });
  },

  useLifelineDecade: () => {
    const { lifelinesRemaining, currentEvidence, decadeFilter } = get();
    if (lifelinesRemaining <= 0 || !currentEvidence || decadeFilter !== null) return;

    soundFx.playLifeline();

    const correctYear = currentEvidence.canonical_date.year;
    const decadeStart = Math.floor(correctYear / 10) * 10;
    const decadeEnd = decadeStart + 9;

    set({
      lifelinesRemaining: lifelinesRemaining - 1,
      decadeFilter: { min: decadeStart, max: decadeEnd },
      playerHypothesis: {
        ...get().playerHypothesis,
        year: decadeStart + 5, // Sits in the middle of the decade
      },
    });
  },

  tickTimer: (seconds: number) => {
    const { phase, timeRemainingSeconds, totalTimeSeconds, rival, rivalLockTargetTime, submitPlayerVerdict } = get();
    if (phase !== 'INVESTIGATING' && phase !== 'SUBMITTING') return;

    const newTime = Math.max(0, timeRemainingSeconds - seconds);

    // Audio de latidos del corazón que se acelera con el tiempo
    const ratio = newTime / totalTimeSeconds;
    if (newTime > 0) {
      if (ratio <= 0.2) {
        soundFx.playHeartbeat('critical');
      } else if (ratio <= 0.4) {
        soundFx.playHeartbeat('high');
      } else if (ratio <= 0.65) {
        soundFx.playHeartbeat('medium');
      }
    }

    let updatedRival = rival;
    if (rival && rivalLockTargetTime !== null && !rival.has_locked) {
      if (newTime <= rivalLockTargetTime) {
        updatedRival = {
          ...rival,
          has_locked: true,
          lock_timestamp_seconds: newTime,
          time_remaining_seconds: newTime,
        };
      } else {
        updatedRival = {
          ...rival,
          time_remaining_seconds: newTime,
        };
      }
    }

    set({
      timeRemainingSeconds: newTime,
      rival: updatedRival,
    });

    if (newTime <= 0) {
      submitPlayerVerdict();
    }
  },

  inspectClue: (clueId: string) => {
    const { currentEvidence, revealedClueIds, timeRemainingSeconds } = get();
    if (!currentEvidence || revealedClueIds.includes(clueId)) return;

    const clue = currentEvidence.visual_clues.find((c) => c.id === clueId);
    const penalty = clue ? clue.time_penalty_seconds : 7;
    const penalizedTime = Math.max(1, timeRemainingSeconds - penalty);

    set({
      revealedClueIds: [...revealedClueIds, clueId],
      timeRemainingSeconds: penalizedTime,
      selectedClueModalId: clueId,
    });
  },

  setSelectedClueModal: (clueId: string | null) => {
    set({ selectedClueModalId: clueId });
  },

  setPlayerHypothesis: (partial: Partial<PlayerHypothesis>) => {
    set((state) => ({
      playerHypothesis: {
        ...state.playerHypothesis,
        ...partial,
      },
    }));
  },

  submitPlayerVerdict: () => {
    set({ phase: 'ROUND_RESOLVING' });
    setTimeout(() => {
      get().resolveRound();
    }, 1400);
  },

  resolveRound: () => {
    const {
      roundNumber,
      roundHistory,
      currentEvidence,
      playerHypothesis,
      revealedClueIds,
      timeRemainingSeconds,
      totalTimeSeconds,
      rivalHypothesisData,
      rival,
      playerStats,
    } = get();

    if (!currentEvidence || !rivalHypothesisData || !rival) return;

    const playerScore = calculateScore(
      currentEvidence,
      playerHypothesis,
      revealedClueIds.length,
      timeRemainingSeconds,
      totalTimeSeconds
    );

    const rivalTimeRemaining = rival.lock_timestamp_seconds || 20;
    const rivalScore = calculateScore(
      currentEvidence,
      rivalHypothesisData.hypothesis,
      rivalHypothesisData.cluesUsed.length,
      rivalTimeRemaining,
      totalTimeSeconds
    );

    let winner: 'PLAYER' | 'RIVAL' | 'TIE' = 'TIE';
    if (playerScore.total_score > rivalScore.total_score) {
      winner = 'PLAYER';
    } else if (playerScore.total_score < rivalScore.total_score) {
      winner = 'RIVAL';
    }

    const result: RoundResult = {
      round_number: roundNumber,
      player_score: playerScore,
      rival_score: rivalScore,
      winner,
      evidence: currentEvidence,
      player_hypothesis: playerHypothesis,
      rival_hypothesis: rivalHypothesisData.hypothesis,
      player_clues_used: revealedClueIds,
      rival_clues_used: rivalHypothesisData.cluesUsed,
    };

    const updatedHistory = [...roundHistory, result];

    const newMatchesPlayed = playerStats.matches_played + 1;
    const newMatchesWon = playerStats.matches_won + (winner === 'PLAYER' ? 1 : 0);

    set({
      phase: 'POST_ROUND_ARCHIVE',
      roundResult: result,
      roundHistory: updatedHistory,
      playerStats: {
        matches_played: newMatchesPlayed,
        matches_won: newMatchesWon,
        total_score: playerStats.total_score + playerScore.total_score,
        avg_response_time: Number(
          (
            (playerStats.avg_response_time * (newMatchesPlayed - 1) +
              (totalTimeSeconds - timeRemainingSeconds)) /
            newMatchesPlayed
          ).toFixed(1)
        ),
        clues_per_round_avg: Number(
          (
            (playerStats.clues_per_round_avg * (newMatchesPlayed - 1) +
              revealedClueIds.length) /
            newMatchesPlayed
          ).toFixed(1)
        ),
        accuracy_rate: Number(((newMatchesWon / newMatchesPlayed) * 100).toFixed(1)),
      },
    });
  },

  saveLeaderboardRecord: (playerName: string) => {
    const { matchSummary, leaderboard } = get();
    if (!matchSummary) return;

    const newEntry: LeaderboardEntry = {
      id: `lead-${Date.now()}`,
      player_name: playerName.trim() || 'Investigador Anónimo',
      total_score: matchSummary.player_total_score,
      rounds_won: matchSummary.player_rounds_won,
      rival_name: matchSummary.rival.name,
      date: new Date().toLocaleDateString('es-AR'),
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.total_score - a.total_score)
      .slice(0, 20);

    saveLeaderboardToStorage(updatedLeaderboard);
    set({ leaderboard: updatedLeaderboard });
  },

  resetToLobby: () => {
    set({
      phase: 'IDLE',
      currentEvidence: null,
      roundNumber: 1,
      roundHistory: [],
      matchSummary: null,
      lifelinesRemaining: 2,
      eliminatedEventOptions: [],
      decadeFilter: null,
      timeRemainingSeconds: 75,
      revealedClueIds: [],
      playerHypothesis: {},
      selectedClueModalId: null,
      roundResult: null,
    });
  },
}));
