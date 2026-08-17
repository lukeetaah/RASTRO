import { z } from 'zod';
import { CanonicalEvidence } from './evidence';

export const GamePhaseSchema = z.enum([
  'IDLE',
  'MATCHMAKING',
  'MATCH_FOUND',
  'ROUND_START',
  'INVESTIGATING',
  'SUBMITTING',
  'ROUND_RESOLVING',
  'POST_ROUND_ARCHIVE',
  'MATCH_OVER'
]);
export type GamePhase = z.infer<typeof GamePhaseSchema>;

export const RivalArchetypeSchema = z.enum([
  'SNIPER',    // Responde rápido con alta intuición (~15-25s)
  'DETECTIVE', // Usa 1-2 pistas y responde preciso (~45-65s)
  'GAMBLER'    // Se arriesga al final con precisión variable (~70-85s)
]);
export type RivalArchetype = z.infer<typeof RivalArchetypeSchema>;

export interface RivalState {
  id: string;
  name: string;
  avatar_url?: string;
  archetype: RivalArchetype;
  is_online: boolean;
  has_locked: boolean;
  lock_timestamp_seconds?: number;
  time_remaining_seconds: number;
}

export interface PlayerHypothesis {
  year?: number;
  exact_date?: string;
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
  };
  event_query?: string;
}

export interface ClueInspectionRecord {
  clue_id: string;
  timestamp_seconds: number;
  penalty_seconds: number;
}

export interface ScoreBreakdown {
  year_score: number;
  location_score: number;
  event_score: number;
  time_bonus_multiplier: number;
  clue_penalty: number;
  total_score: number;
  year_diff?: number;
  geo_distance_km?: number;
}

export interface RoundResult {
  round_number: number;
  player_score: ScoreBreakdown;
  rival_score: ScoreBreakdown;
  winner: 'PLAYER' | 'RIVAL' | 'TIE';
  evidence: CanonicalEvidence;
  player_hypothesis: PlayerHypothesis;
  rival_hypothesis: PlayerHypothesis;
  player_clues_used: string[];
  rival_clues_used: string[];
}

export interface MatchSummary {
  player_total_score: number;
  rival_total_score: number;
  player_rounds_won: number;
  rival_rounds_won: number;
  winner: 'PLAYER' | 'RIVAL' | 'TIE';
  rival: RivalState;
  round_history: RoundResult[];
  completed_at: string;
}

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  total_score: number;
  rounds_won: number;
  rival_name: string;
  date: string;
}

export interface PlayerStats {
  matches_played: number;
  matches_won: number;
  total_score: number;
  avg_response_time: number;
  clues_per_round_avg: number;
  accuracy_rate: number;
}
