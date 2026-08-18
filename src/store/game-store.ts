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
import {
  CANONICAL_EVIDENCES,
  getEvidenceById,
  getEvidenceByEventName,
  generateDynamicRoundOptions,
} from '@/data/canonical-evidences';
import {
  calculateRivalLockTime,
  generateRivalHypothesis,
  generateSimulatedRival,
} from '@/lib/fake-rival';
import { calculateScore } from '@/lib/scoring';
import { soundFx } from '@/lib/sound';

// Duraciones rápidas de tiempo (Blitz competitivo de 20s inicial decreciente)
const BLITZ_ROUND_DURATIONS = [20, 18, 15, 12, 10];
const PRACTICE_ROUND_DURATIONS = [35, 35, 35, 35, 35];

const LOCAL_STORAGE_PLAYER_NAME = 'rastro_nickname_v1';
const LOCAL_STORAGE_PLAYER_ID = 'rastro_player_id_v1';

function getInitialPlayerId(): string {
  if (typeof window === 'undefined') return 'p-server';
  try {
    let id = localStorage.getItem(LOCAL_STORAGE_PLAYER_ID);
    if (!id) {
      id = `usr-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(LOCAL_STORAGE_PLAYER_ID, id);
    }
    return id;
  } catch {
    return `usr-${Math.random().toString(36).substring(2, 9)}`;
  }
}

function getInitialPlayerName(): string {
  if (typeof window === 'undefined') return 'Investigador_1910';
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PLAYER_NAME);
    if (saved && saved.trim()) return saved.trim();
    const defaultName = `Investigador_${Math.floor(Math.random() * 899 + 100)}`;
    localStorage.setItem(LOCAL_STORAGE_PLAYER_NAME, defaultName);
    return defaultName;
  } catch {
    return 'Investigador_1910';
  }
}

interface GameStoreState {
  phase: GamePhase;
  gameMode: 'BOT_TRAINING' | 'MULTIPLAYER_ONLINE';
  difficultyMode: 'BLITZ' | 'PRACTICE';
  playerId: string;
  playerName: string;
  onlineCount: number;
  currentEvidence: CanonicalEvidence | null;
  currentRoundOptions: CanonicalEvidence[];
  selectedOptionEvidence: CanonicalEvidence | null;
  unplayedDeck: string[];

  // Ronda y Partida (Match de 5 rondas)
  roundNumber: number;
  maxRounds: number;
  roundHistory: RoundResult[];
  matchSummary: MatchSummary | null;
  unansweredCount: number;

  // Ayudas de Archivo
  lifelinesRemaining: number;
  eliminatedEventOptions: string[];
  decadeFilter: { min: number; max: number } | null;

  // Temporizador dinámico
  timeRemainingSeconds: number;
  totalTimeSeconds: number;

  // Pistas e inspección
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
  setPlayerName: (name: string) => void;
  setGameMode: (mode: 'BOT_TRAINING' | 'MULTIPLAYER_ONLINE') => void;
  setDifficultyMode: (mode: 'BLITZ' | 'PRACTICE') => void;
  fetchOnlineCount: () => Promise<void>;
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

  // Leaderboard Universal
  fetchLeaderboard: () => Promise<void>;
  saveLeaderboardRecord: () => Promise<void>;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const DEFAULT_SEED_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'l-1', player_name: 'Archivista_Mayor', total_score: 26850, rounds_won: 5, rival_name: 'V. H. Hobsbawm', date: '17/8/2026, 18:40 hs' },
  { id: 'l-2', player_name: 'Cronista_Austral', total_score: 24920, rounds_won: 5, rival_name: 'Archivista_AGN', date: '17/8/2026, 19:15 hs' },
  { id: 'l-3', player_name: 'SanMartin_1817', total_score: 23150, rounds_won: 4, rival_name: 'M. Bloch_1929', date: '16/8/2026, 21:05 hs' },
  { id: 'l-4', player_name: 'Curie_Solvay', total_score: 21400, rounds_won: 4, rival_name: 'S. Zweig', date: '16/8/2026, 22:30 hs' },
  { id: 'l-5', player_name: 'Dra_Prebisch', total_score: 19850, rounds_won: 4, rival_name: 'F. Halder', date: '15/8/2026, 17:10 hs' },
];

export const useGameStore = create<GameStoreState>((set, get) => ({
  phase: 'IDLE',
  gameMode: 'BOT_TRAINING',
  difficultyMode: 'BLITZ',
  playerId: getInitialPlayerId(),
  playerName: getInitialPlayerName(),
  onlineCount: 14,
  currentEvidence: null,
  currentRoundOptions: [],
  selectedOptionEvidence: null,
  unplayedDeck: [],

  roundNumber: 1,
  maxRounds: 5,
  roundHistory: [],
  matchSummary: null,
  unansweredCount: 0,

  lifelinesRemaining: 2,
  eliminatedEventOptions: [],
  decadeFilter: null,

  timeRemainingSeconds: 20,
  totalTimeSeconds: 20,
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
  leaderboard: DEFAULT_SEED_LEADERBOARD,

  setPlayerName: (name: string) => {
    const trimmed = name.trim().slice(0, 24) || 'Investigador';
    try {
      localStorage.setItem(LOCAL_STORAGE_PLAYER_NAME, trimmed);
    } catch {}
    set({ playerName: trimmed });
  },

  setGameMode: (mode) => set({ gameMode: mode }),
  setDifficultyMode: (mode) => set({ difficultyMode: mode }),

  fetchOnlineCount: async () => {
    try {
      const res = await fetch('/api/matchmaking');
      if (res.ok) {
        const data = await res.json();
        if (data.active_online_count) {
          set({ onlineCount: data.active_online_count });
        }
      }
    } catch {}
  },

  startMatchmaking: () => {
    soundFx.unlockAudio();
    const { playerId, playerName, difficultyMode } = get();

    set({
      phase: 'MATCHMAKING',
      roundNumber: 1,
      roundHistory: [],
      matchSummary: null,
      lifelinesRemaining: 2,
      unansweredCount: 0,
    });

    let attempts = 0;
    const maxAttempts = 3;

    const pollMatch = async () => {
      attempts++;
      try {
        const res = await fetch('/api/matchmaking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            player_id: playerId,
            player_name: playerName,
            action: 'JOIN',
          }),
        });

        if (res.ok) {
          const data = await res.json();
          // Si encontramos a otro jugador real en la cola
          if (data.matched && data.rival) {
            set({
              phase: 'MATCH_FOUND',
              rival: data.rival,
            });
            setTimeout(() => {
              get().startRound();
            }, 1500);
            return;
          }
        }
      } catch {}

      if (attempts < maxAttempts && get().phase === 'MATCHMAKING') {
        setTimeout(pollMatch, 900);
      } else if (get().phase === 'MATCHMAKING') {
        // Fallback suave a rival simulado de CPU
        const cpuRival = generateSimulatedRival(difficultyMode === 'PRACTICE');
        set({
          phase: 'MATCH_FOUND',
          rival: cpuRival,
        });
        setTimeout(() => {
          get().startRound();
        }, 1500);
      }
    };

    setTimeout(pollMatch, 700);
  },

  startRound: (customEvidence?: CanonicalEvidence) => {
    soundFx.unlockAudio();
    let evidence: CanonicalEvidence;
    const { roundNumber, difficultyMode } = get();

    if (customEvidence) {
      evidence = customEvidence;
    } else {
      let currentDeck = get().unplayedDeck;
      if (!currentDeck || currentDeck.length === 0) {
        currentDeck = shuffleArray(CANONICAL_EVIDENCES.map((e) => e.id));
      }

      const nextId = currentDeck[0];
      const remainingDeck = currentDeck.slice(1);
      evidence = getEvidenceById(nextId) || CANONICAL_EVIDENCES[0];
      set({ unplayedDeck: remainingDeck });
    }

    const durations = difficultyMode === 'PRACTICE' ? PRACTICE_ROUND_DURATIONS : BLITZ_ROUND_DURATIONS;
    const roundIndex = Math.min(roundNumber - 1, durations.length - 1);
    const roundDuration = durations[roundIndex];

    const currentRival = get().rival || generateSimulatedRival(difficultyMode === 'PRACTICE');
    const isPractice = difficultyMode === 'PRACTICE';
    const lockTarget = calculateRivalLockTime(currentRival.archetype, roundDuration, isPractice);
    const rivalData = generateRivalHypothesis(evidence, currentRival.archetype, isPractice);
    const dynamicOptions = generateDynamicRoundOptions(evidence, CANONICAL_EVIDENCES);

    set({
      phase: 'ROUND_START',
      currentEvidence: evidence,
      currentRoundOptions: dynamicOptions,
      selectedOptionEvidence: null,
      timeRemainingSeconds: roundDuration,
      totalTimeSeconds: roundDuration,
      revealedClueIds: [],
      eliminatedEventOptions: [],
      decadeFilter: null,
      playerHypothesis: {
        year: evidence.canonical_date.year,
        location: undefined,
        event_query: '',
      },
      selectedClueModalId: null,
      rival: {
        ...currentRival,
        has_locked: false,
        time_remaining_seconds: roundDuration,
      },
      rivalLockTargetTime: lockTarget,
      rivalHypothesisData: rivalData,
      roundResult: null,
    });

    setTimeout(() => {
      if (get().phase === 'ROUND_START') {
        set({ phase: 'INVESTIGATING' });
      }
    }, 1100);
  },

  nextRoundOrFinishMatch: () => {
    const { roundNumber, maxRounds, roundHistory, rival } = get();

    if (roundNumber >= maxRounds) {
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
      set({ roundNumber: roundNumber + 1 });
      get().startRound();
    }
  },

  startRematch: () => {
    set({
      roundNumber: 1,
      roundHistory: [],
      matchSummary: null,
      lifelinesRemaining: 2,
      unansweredCount: 0,
    });
    get().startRound();
  },

  useLifeline5050: () => {
    const { lifelinesRemaining, currentEvidence, currentRoundOptions, eliminatedEventOptions } = get();
    if (lifelinesRemaining <= 0 || !currentEvidence || eliminatedEventOptions.length > 0) return;

    soundFx.playLifeline();

    const incorrectOptions = currentRoundOptions.filter(
      (opt) => opt.id !== currentEvidence.id
    );

    const shuffledIncorrect = shuffleArray(incorrectOptions);
    const toEliminate = shuffledIncorrect.slice(0, 2).map((opt) => opt.canonical_event);

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
        year: correctYear,
      },
    });
  },

  tickTimer: (seconds: number) => {
    const { phase, timeRemainingSeconds, totalTimeSeconds, rival, rivalLockTargetTime, submitPlayerVerdict } = get();
    if (phase !== 'INVESTIGATING' && phase !== 'SUBMITTING') return;

    const newTime = Math.max(0, timeRemainingSeconds - seconds);

    const ratio = newTime / totalTimeSeconds;
    if (newTime > 0) {
      if (ratio <= 0.3) {
        soundFx.playHeartbeat('critical');
      } else if (ratio <= 0.6) {
        soundFx.playHeartbeat('high');
      } else {
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
    const penalty = clue ? clue.time_penalty_seconds : 4;
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
    let selectedEvidence = get().selectedOptionEvidence;
    if (partial.event_query) {
      const found =
        get().currentRoundOptions.find(
          (opt) =>
            opt.canonical_event.toLowerCase().trim() === partial.event_query!.toLowerCase().trim()
        ) || getEvidenceByEventName(partial.event_query);
      if (found) selectedEvidence = found;
    }

    set((state) => ({
      playerHypothesis: {
        ...state.playerHypothesis,
        ...partial,
      },
      selectedOptionEvidence: selectedEvidence,
    }));
  },

  submitPlayerVerdict: () => {
    set({ phase: 'ROUND_RESOLVING' });
    setTimeout(() => {
      get().resolveRound();
    }, 1200);
  },

  resolveRound: () => {
    const {
      roundNumber,
      roundHistory,
      currentEvidence,
      currentRoundOptions,
      selectedOptionEvidence,
      playerHypothesis,
      revealedClueIds,
      timeRemainingSeconds,
      totalTimeSeconds,
      rivalHypothesisData,
      rival,
      playerStats,
      unansweredCount,
    } = get();

    if (!currentEvidence || !rivalHypothesisData || !rival) return;

    const isUnanswered =
      timeRemainingSeconds === 0 &&
      (!playerHypothesis.event_query || playerHypothesis.event_query.trim() === '');

    const newUnansweredCount = isUnanswered ? unansweredCount + 1 : 0;

    const playerScore = calculateScore(
      currentEvidence,
      playerHypothesis,
      revealedClueIds.length,
      timeRemainingSeconds,
      totalTimeSeconds
    );

    const rivalTimeRemaining = rival.lock_timestamp_seconds ?? Math.max(2, Math.floor(totalTimeSeconds * 0.35));
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

    const secondsAhead = Number(Math.max(0, rivalTimeRemaining - timeRemainingSeconds).toFixed(1));
    let rivalAdvantageReason: string | undefined;

    if (winner === 'RIVAL') {
      if (isUnanswered) {
        rivalAdvantageReason = `No sellaste ninguna respuesta a tiempo (0s restantes). El rival aprovechó y se quedó con la ronda.`;
      } else if (
        secondsAhead >= 0.8 &&
        playerScore.year_score === rivalScore.year_score &&
        playerScore.event_score === rivalScore.event_score
      ) {
        rivalAdvantageReason = `¡El rival selló su veredicto ${secondsAhead} segundos antes que vos! Su multiplicador de velocidad (${rivalScore.time_bonus_multiplier}x vs ${playerScore.time_bonus_multiplier}x) definió la ronda.`;
      } else if (secondsAhead >= 0.8) {
        rivalAdvantageReason = `El rival selló ${secondsAhead}s antes (${rivalScore.time_bonus_multiplier}x de velocidad) y obtuvo mayor precisión global.`;
      } else if ((rivalScore.year_diff ?? 99) < (playerScore.year_diff ?? 99)) {
        rivalAdvantageReason = `El rival estuvo más cerca del año exacto (${rivalScore.year_score} pts vs tus ${playerScore.year_score} pts).`;
      } else if (rivalScore.event_score > playerScore.event_score) {
        rivalAdvantageReason = `El rival identificó correctamente el acontecimiento histórico (+${rivalScore.event_score} pts).`;
      } else {
        rivalAdvantageReason = `El rival sumó ${rivalScore.total_score.toLocaleString()} pts vs tus ${playerScore.total_score.toLocaleString()} pts.`;
      }
    }

    const selectedEvidenceResolved =
      selectedOptionEvidence ||
      (playerHypothesis.event_query ? getEvidenceByEventName(playerHypothesis.event_query) : undefined);

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
      rival_lock_seconds_ahead: secondsAhead,
      rival_advantage_reason: rivalAdvantageReason,
      round_options: currentRoundOptions,
      selected_evidence: selectedEvidenceResolved,
    };

    const updatedHistory = [...roundHistory, result];
    const newMatchesPlayed = playerStats.matches_played + 1;
    const newMatchesWon = playerStats.matches_won + (winner === 'PLAYER' ? 1 : 0);

    if (newUnansweredCount >= 3) {
      const forfeitSummary: MatchSummary = {
        player_total_score: updatedHistory.reduce((acc, r) => acc + r.player_score.total_score, 0),
        rival_total_score: updatedHistory.reduce((acc, r) => acc + r.rival_score.total_score, 0) + 5000,
        player_rounds_won: updatedHistory.filter((r) => r.winner === 'PLAYER').length,
        rival_rounds_won: updatedHistory.filter((r) => r.winner === 'RIVAL').length,
        winner: 'RIVAL',
        rival: rival,
        round_history: updatedHistory,
        completed_at: new Date().toISOString(),
        forfeited_due_to_inactivity: true,
      };

      set({
        phase: 'MATCH_OVER',
        matchSummary: forfeitSummary,
        roundResult: result,
        roundHistory: updatedHistory,
        unansweredCount: newUnansweredCount,
      });
      return;
    }

    set({
      phase: 'POST_ROUND_ARCHIVE',
      roundResult: result,
      roundHistory: updatedHistory,
      unansweredCount: newUnansweredCount,
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

  fetchLeaderboard: async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data: LeaderboardEntry[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          set({ leaderboard: data });
        }
      }
    } catch {}
  },

  saveLeaderboardRecord: async () => {
    const { matchSummary, playerName, leaderboard } = get();
    if (!matchSummary) return;

    const formattedDate = new Intl.DateTimeFormat('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date()) + ' hs';

    const payload = {
      player_name: playerName || 'Investigador',
      total_score: matchSummary.player_total_score,
      rounds_won: matchSummary.player_rounds_won,
      rival_name: matchSummary.rival.name,
      date: formattedDate,
    };

    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data: LeaderboardEntry[] = await res.json();
        if (Array.isArray(data)) {
          set({ leaderboard: data });
          return;
        }
      }
    } catch {}

    const fallbackEntry: LeaderboardEntry = {
      id: `lead-${Date.now()}`,
      ...payload,
    };
    const updated = [...leaderboard, fallbackEntry]
      .sort((a, b) => b.total_score - a.total_score)
      .slice(0, 50);
    set({ leaderboard: updated });
  },

  resetToLobby: () => {
    set({
      phase: 'IDLE',
      currentEvidence: null,
      currentRoundOptions: [],
      selectedOptionEvidence: null,
      roundNumber: 1,
      roundHistory: [],
      matchSummary: null,
      unansweredCount: 0,
      lifelinesRemaining: 2,
      eliminatedEventOptions: [],
      decadeFilter: null,
      timeRemainingSeconds: 20,
      revealedClueIds: [],
      playerHypothesis: {},
      selectedClueModalId: null,
      roundResult: null,
    });
  },
}));
