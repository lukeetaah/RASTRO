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
      // Responde velozmente (entre segundo 18 y 28 de partida -> 62 a 72s restantes)
      return 90 - (18 + Math.floor(Math.random() * 10));
    case 'DETECTIVE':
      // Analiza con calma (entre segundo 40 y 58 de partida -> 32 a 50s restantes)
      return 90 - (40 + Math.floor(Math.random() * 18));
    case 'GAMBLER':
      // Se arriesga al final (entre segundo 68 y 84 de partida -> 6 a 22s restantes)
      return 90 - (68 + Math.floor(Math.random() * 16));
  }
}

// Genera una hipótesis del rival congruente con su arquetipo y margen de error
export function generateRivalHypothesis(
  evidence: CanonicalEvidence,
  archetype: RivalArchetype
): { hypothesis: PlayerHypothesis; cluesUsed: string[] } {
  let yearError = 0;
  let latOffset = 0;
  let lonOffset = 0;
  let eventGuess = evidence.canonical_event;
  const cluesUsed: string[] = [];

  if (archetype === 'SNIPER') {
    // 70% acierto exacto en año, 30% desvío de 1 a 3 años
    if (Math.random() > 0.7) {
      yearError = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 3));
    }
  } else if (archetype === 'DETECTIVE') {
    // Suele pedir 1 o 2 pistas
    if (evidence.visual_clues.length > 0) {
      cluesUsed.push(evidence.visual_clues[0].id);
      if (evidence.visual_clues.length > 1 && Math.random() > 0.5) {
        cluesUsed.push(evidence.visual_clues[1].id);
      }
    }
    // 85% acierto exacto en año
    if (Math.random() > 0.85) {
      yearError = (Math.random() > 0.5 ? 1 : -1) * 1;
    }
  } else if (archetype === 'GAMBLER') {
    // Mayor variabilidad
    yearError = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.floor(Math.random() * 8));
    latOffset = (Math.random() - 0.5) * 1.5;
    lonOffset = (Math.random() - 0.5) * 1.5;
    if (Math.random() > 0.4) {
      eventGuess = evidence.accepted_event_aliases[0] || evidence.canonical_event;
    }
  }

  const guessedYear = evidence.canonical_date.year + yearError;
  const guessedLat = evidence.canonical_location.latitude + latOffset;
  const guessedLon = evidence.canonical_location.longitude + lonOffset;

  return {
    hypothesis: {
      year: guessedYear,
      location: {
        latitude: guessedLat,
        longitude: guessedLon,
        city: evidence.canonical_location.city,
      },
      event_query: eventGuess,
    },
    cluesUsed,
  };
}
