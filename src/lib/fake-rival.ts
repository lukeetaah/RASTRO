import { CanonicalEvidence } from '@/types/evidence';
import { PlayerHypothesis, RivalArchetype, RivalState } from '@/types/game';

const RIVAL_NAMES = [
  'V. H. Hobsbawm',
  'Archivista_AGN',
  'M. Bloch_1929',
  'Braudel_Med',
  'Cronista_Plata',
  'S. Zweig',
  'F. Halder',
  'G. Duby',
  'D. Huizinga',
  'C. Ginzburg'
];

export function generateSimulatedRival(isPractice: boolean = false): RivalState {
  const archetypes: RivalArchetype[] = isPractice
    ? ['GAMBLER', 'DETECTIVE']
    : ['SNIPER', 'DETECTIVE', 'GAMBLER'];
  const chosenArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
  const name = isPractice
    ? `Practicante_${Math.floor(Math.random() * 90 + 10)}`
    : RIVAL_NAMES[Math.floor(Math.random() * RIVAL_NAMES.length)];

  return {
    id: `rival-${Math.random().toString(36).substring(2, 9)}`,
    name,
    archetype: chosenArchetype,
    is_online: true,
    has_locked: false,
    time_remaining_seconds: 20,
  };
}

// Determina en qué segundo el rival sella su veredicto según su arquetipo y duración total
export function calculateRivalLockTime(
  archetype: RivalArchetype,
  totalDurationSeconds: number = 20,
  isPractice: boolean = false
): number {
  if (isPractice) {
    // En práctica el rival tarda más (deja 20-30% de tiempo)
    return Math.max(1, Math.floor(totalDurationSeconds * 0.25));
  }

  switch (archetype) {
    case 'SNIPER':
      // Responde rápido (consume entre 30% y 45% del tiempo)
      return Math.max(2, Math.floor(totalDurationSeconds * (0.55 + Math.random() * 0.15)));
    case 'DETECTIVE':
      // Analiza (consume entre 50% y 70% del tiempo)
      return Math.max(2, Math.floor(totalDurationSeconds * (0.30 + Math.random() * 0.20)));
    case 'GAMBLER':
      // Se arriesga al final (consume 75% a 90% del tiempo)
      return Math.max(1, Math.floor(totalDurationSeconds * (0.10 + Math.random() * 0.15)));
  }
}

// Genera una hipótesis del rival balanceada y con fallos humanos reales
export function generateRivalHypothesis(
  evidence: CanonicalEvidence,
  archetype: RivalArchetype,
  isPractice: boolean = false
): { hypothesis: PlayerHypothesis; cluesUsed: string[] } {
  let yearError = 0;
  let hasCorrectLocation = true;
  let hasCorrectEvent = true;
  const cluesUsed: string[] = [];

  if (isPractice) {
    // En modo práctica el rival falla mucho más para que el jugador pueda ganar y aprender
    yearError = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.floor(Math.random() * 12));
    if (Math.random() > 0.4) hasCorrectEvent = false;
    if (Math.random() > 0.4) hasCorrectLocation = false;
  } else if (archetype === 'SNIPER') {
    // 40% acierto exacto en año, 60% desvío de 2 a 8 años por apresurarse
    if (Math.random() > 0.4) {
      yearError = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.floor(Math.random() * 6));
    }
    // 30% de veces erra el evento por contestar a toda velocidad
    if (Math.random() > 0.70) {
      hasCorrectEvent = false;
    }
  } else if (archetype === 'DETECTIVE') {
    // Pide 1 pista
    if (evidence.visual_clues.length > 0) {
      cluesUsed.push(evidence.visual_clues[0].id);
    }
    // 50% acierto exacto, 50% desvío de 1 a 4 años
    if (Math.random() > 0.5) {
      yearError = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 4));
    }
    if (Math.random() > 0.8) {
      hasCorrectLocation = false;
    }
  } else if (archetype === 'GAMBLER') {
    // Fuerte variabilidad
    yearError = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.floor(Math.random() * 15));
    if (Math.random() > 0.5) {
      hasCorrectLocation = false;
    }
    if (Math.random() > 0.45) {
      hasCorrectEvent = false;
    }
  }

  const guessedYear = evidence.canonical_date.year + yearError;
  const guessedCity = hasCorrectLocation ? evidence.canonical_location.city : 'Otra Ciudad';
  const guessedLat = hasCorrectLocation
    ? evidence.canonical_location.latitude
    : evidence.canonical_location.latitude + 12;
  const guessedLon = hasCorrectLocation
    ? evidence.canonical_location.longitude
    : evidence.canonical_location.longitude + 12;
  const guessedEvent = hasCorrectEvent
    ? evidence.canonical_event
    : (evidence.distractor_events && evidence.distractor_events[0] !== evidence.canonical_event
        ? evidence.distractor_events[0]
        : 'Acontecimiento Histórico Alternativo');

  return {
    hypothesis: {
      year: guessedYear,
      location: {
        latitude: guessedLat,
        longitude: guessedLon,
        city: guessedCity,
      },
      event_query: guessedEvent,
    },
    cluesUsed,
  };
}
