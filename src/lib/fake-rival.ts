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
  'G. Duby'
];

export function generateSimulatedRival(): RivalState {
  const archetypes: RivalArchetype[] = ['SNIPER', 'DETECTIVE', 'GAMBLER'];
  const chosenArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
  const name = RIVAL_NAMES[Math.floor(Math.random() * RIVAL_NAMES.length)];

  return {
    id: `rival-${Math.random().toString(36).substring(2, 9)}`,
    name,
    archetype: chosenArchetype,
    is_online: true,
    has_locked: false,
    time_remaining_seconds: 90,
  };
}

// Determina en qué segundo el rival sella su veredicto según su arquetipo
export function calculateRivalLockTime(archetype: RivalArchetype): number {
  switch (archetype) {
    case 'SNIPER':
      // Responde rápido (a los 25-35s de partida -> 55-65s restantes)
      return 90 - (25 + Math.floor(Math.random() * 10));
    case 'DETECTIVE':
      // Analiza con calma (a los 45-60s de partida -> 30-45s restantes)
      return 90 - (45 + Math.floor(Math.random() * 15));
    case 'GAMBLER':
      // Se arriesga tarde (a los 65-80s de partida -> 10-25s restantes)
      return 90 - (65 + Math.floor(Math.random() * 15));
  }
}

// Genera una hipótesis del rival balanceada y con fallos humanos reales
export function generateRivalHypothesis(
  evidence: CanonicalEvidence,
  archetype: RivalArchetype
): { hypothesis: PlayerHypothesis; cluesUsed: string[] } {
  let yearError = 0;
  let hasCorrectLocation = true;
  let hasCorrectEvent = true;
  const cluesUsed: string[] = [];

  if (archetype === 'SNIPER') {
    // 50% acierto exacto en año, 50% desvío de 2 a 6 años por apresurarse
    if (Math.random() > 0.5) {
      yearError = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.floor(Math.random() * 5));
    }
    // 25% de veces erra el evento por contestar rápido
    if (Math.random() > 0.75) {
      hasCorrectEvent = false;
    }
  } else if (archetype === 'DETECTIVE') {
    // Pide 1 o 2 pistas
    if (evidence.visual_clues.length > 0) {
      cluesUsed.push(evidence.visual_clues[0].id);
      if (evidence.visual_clues.length > 1 && Math.random() > 0.6) {
        cluesUsed.push(evidence.visual_clues[1].id);
      }
    }
    // 60% acierto exacto, 40% desvío de 1 a 3 años
    if (Math.random() > 0.6) {
      yearError = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 3));
    }
  } else if (archetype === 'GAMBLER') {
    // Fuerte variabilidad
    yearError = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.floor(Math.random() * 10));
    if (Math.random() > 0.5) {
      hasCorrectLocation = false;
    }
    if (Math.random() > 0.5) {
      hasCorrectEvent = false;
    }
  }

  const guessedYear = evidence.canonical_date.year + yearError;
  const guessedCity = hasCorrectLocation ? evidence.canonical_location.city : 'Otra Ciudad';
  const guessedLat = hasCorrectLocation ? evidence.canonical_location.latitude : evidence.canonical_location.latitude + 8;
  const guessedLon = hasCorrectLocation ? evidence.canonical_location.longitude : evidence.canonical_location.longitude + 8;
  const guessedEvent = hasCorrectEvent ? evidence.canonical_event : 'Acontecimiento Histórico General';

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
