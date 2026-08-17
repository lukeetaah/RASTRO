import { create } from 'zustand';
import { CanonicalEvidence } from '@/types/evidence';
import {
  GamePhase,
  PlayerHypothesis,
  PlayerStats,
  RivalState,
  RoundResult
} from '@/types/game';
import { CANONICAL_EVIDENCES, getEvidenceById } from '@/data/canonical-evidences';
import {
  calculateRivalLockTime,
  generateRivalHypothesis,
  generateSimulatedRival
} from '@/lib/fake-rival';
import { calculateScore } from '@/lib/scoring';

interface GameStoreState {
  phase: GamePhase;
  gameMode: 'BOT_TRAINING' | 'MULTIPLAYER_ONLINE';
  currentEvidence: CanonicalEvidence | null;
  unplayedDeck: string[]; // Baraja de IDs sin repetir
  timeRemainingSeconds: number;
  totalTimeSeconds: number;
  revealedClueIds: string[];
  playerHypothesis: PlayerHypothesis;
  isInspectingImage: boolean;
  selectedClueModalId: string | null;

  // Rival 1v1
  rival: RivalState | null;
  rivalLockTargetTime: number | null;
  rivalHypothesisData: { hypothesis: PlayerHypothesis; cluesUsed: string[] } | null;

  // Resultados
  roundResult: RoundResult | null;
  playerStats: PlayerStats;

  // Acciones
  setGameMode: (mode: 'BOT_TRAINING' | 'MULTIPLAYER_ONLINE') => void;
  startMatchmaking: () => void;
  startRound: (customEvidence?: CanonicalEvidence) => void;
  tickTimer: (seconds: number) => void;
  inspectClue: (clueId: string) => void;
  setSelectedClueModal: (clueId: string | null) => void;
  setPlayerHypothesis: (partial: Partial<PlayerHypothesis>) => void;
  submitPlayerVerdict: () => void;
  resolveRound: () => void;
  resetToLobby: () => void;
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

export const useGameStore = create<GameStoreState>((set, get) => ({
  phase: 'IDLE',
  gameMode: 'BOT_TRAINING',
  currentEvidence: null,
  unplayedDeck: [],
  timeRemainingSeconds: 90,
  totalTimeSeconds: 90,
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

  setGameMode: (mode) => set({ gameMode: mode }),

  startMatchmaking: () => {
    set({ phase: 'MATCHMAKING' });
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

    if (customEvidence) {
      evidence = customEvidence;
    } else {
      let currentDeck = get().unplayedDeck;
      // Si la baraja está vacía o se agotó, rebarajamos todas las 12 evidencias maestras
      if (!currentDeck || currentDeck.length === 0) {
        currentDeck = shuffleArray(CANONICAL_EVIDENCES.map((e) => e.id));
      }

      const nextId = currentDeck[0];
      const remainingDeck = currentDeck.slice(1);
      evidence = getEvidenceById(nextId) || CANONICAL_EVIDENCES[0];
      set({ unplayedDeck: remainingDeck });
    }

    const currentRival = get().rival || generateSimulatedRival();
    const lockTarget = calculateRivalLockTime(currentRival.archetype);
    const rivalData = generateRivalHypothesis(evidence, currentRival.archetype);

    set({
      phase: 'ROUND_START',
      currentEvidence: evidence,
      timeRemainingSeconds: 90,
      totalTimeSeconds: 90,
      revealedClueIds: [],
      playerHypothesis: {
        year: evidence.canonical_date.year,
        location: {
          latitude: evidence.canonical_location.latitude,
          longitude: evidence.canonical_location.longitude,
          city: evidence.canonical_location.city,
        },
        event_query: '',
      },
      selectedClueModalId: null,
      rival: {
        ...currentRival,
        has_locked: false,
        time_remaining_seconds: 90,
      },
      rivalLockTargetTime: lockTarget,
      rivalHypothesisData: rivalData,
      roundResult: null,
    });

    setTimeout(() => {
      if (get().phase === 'ROUND_START') {
        set({ phase: 'INVESTIGATING' });
      }
    }, 1000);
  },

  tickTimer: (seconds: number) => {
    const { phase, timeRemainingSeconds, rival, rivalLockTargetTime, submitPlayerVerdict } = get();
    if (phase !== 'INVESTIGATING' && phase !== 'SUBMITTING') return;

    const newTime = Math.max(0, timeRemainingSeconds - seconds);

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

    const rivalTimeRemaining = rival.lock_timestamp_seconds || 30;
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
      player_score: playerScore,
      rival_score: rivalScore,
      winner,
      evidence: currentEvidence,
      player_hypothesis: playerHypothesis,
      rival_hypothesis: rivalHypothesisData.hypothesis,
      player_clues_used: revealedClueIds,
      rival_clues_used: rivalHypothesisData.cluesUsed,
    };

    const newMatchesPlayed = playerStats.matches_played + 1;
    const newMatchesWon = playerStats.matches_won + (winner === 'PLAYER' ? 1 : 0);

    set({
      phase: 'POST_ROUND_ARCHIVE',
      roundResult: result,
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

  resetToLobby: () => {
    set({
      phase: 'IDLE',
      currentEvidence: null,
      timeRemainingSeconds: 90,
      revealedClueIds: [],
      playerHypothesis: {},
      selectedClueModalId: null,
      roundResult: null,
    });
  },
}));
