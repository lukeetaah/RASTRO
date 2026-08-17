import { CanonicalEvidence } from '@/types/evidence';
import { PlayerHypothesis, ScoreBreakdown } from '@/types/game';

// Cálculo de distancia ortodrómica (Haversine) en kilómetros
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Evaluación de similitud de texto de evento canónico y aliases
export function evaluateEventMatch(
  query: string | undefined,
  canonicalEvent: string,
  aliases: string[]
): number {
  if (!query || query.trim().length === 0) return 0;
  const cleanQuery = query.toLowerCase().trim();
  const cleanCanonical = canonicalEvent.toLowerCase().trim();

  if (cleanCanonical.includes(cleanQuery) || cleanQuery.includes(cleanCanonical)) {
    return 1.0;
  }

  for (const alias of aliases) {
    const cleanAlias = alias.toLowerCase().trim();
    if (cleanAlias.includes(cleanQuery) || cleanQuery.includes(cleanAlias)) {
      return 1.0;
    }
  }

  // Coincidencia parcial por palabras clave relevantes (>3 letras)
  const queryWords = cleanQuery.split(/\s+/).filter((w) => w.length > 3);
  let matches = 0;
  for (const word of queryWords) {
    if (cleanCanonical.includes(word)) {
      matches++;
    }
  }

  if (queryWords.length > 0 && matches > 0) {
    return Math.min(1.0, (matches / queryWords.length) * 0.85);
  }

  return 0;
}

// Motor de puntuación determinista de RASTRO
export function calculateScore(
  evidence: CanonicalEvidence,
  hypothesis: PlayerHypothesis,
  cluesUsedCount: number,
  timeRemainingSeconds: number,
  totalTimeSeconds: number = 90
): ScoreBreakdown {
  // 1. Puntuación Temporal (Hasta 2.000 pts)
  let yearScore = 0;
  let yearDiff: number | undefined;

  if (hypothesis.year !== undefined && evidence.canonical_date.year) {
    yearDiff = Math.abs(hypothesis.year - evidence.canonical_date.year);
    if (yearDiff === 0) {
      yearScore = 2000;
    } else if (yearDiff <= 1) {
      yearScore = 1750;
    } else if (yearDiff <= 3) {
      yearScore = 1350;
    } else if (yearDiff <= 5) {
      yearScore = 900;
    } else if (yearDiff <= 10) {
      yearScore = 450;
    } else if (yearDiff <= 20) {
      yearScore = 150;
    } else {
      yearScore = 0;
    }
  }

  // 2. Puntuación Geográfica (Hasta 1.500 pts)
  let locationScore = 0;
  let geoDistanceKm: number | undefined;

  if (hypothesis.location && evidence.canonical_location) {
    geoDistanceKm = calculateHaversineDistanceKm(
      hypothesis.location.latitude,
      hypothesis.location.longitude,
      evidence.canonical_location.latitude,
      evidence.canonical_location.longitude
    );

    if (geoDistanceKm < 25) {
      locationScore = 1500;
    } else if (geoDistanceKm < 100) {
      locationScore = 1200;
    } else if (geoDistanceKm < 500) {
      locationScore = 800;
    } else if (geoDistanceKm < 1500) {
      locationScore = 400;
    } else if (geoDistanceKm < 4000) {
      locationScore = 150;
    } else {
      locationScore = 0;
    }
  } else if (hypothesis.location?.city && evidence.canonical_location.city) {
    if (
      hypothesis.location.city.toLowerCase().includes(evidence.canonical_location.city.toLowerCase()) ||
      evidence.canonical_location.city.toLowerCase().includes(hypothesis.location.city.toLowerCase())
    ) {
      locationScore = 1500;
    }
  }

  // 3. Puntuación de Evento (Hasta 1.500 pts)
  const eventRatio = evaluateEventMatch(
    hypothesis.event_query,
    evidence.canonical_event,
    evidence.accepted_event_aliases
  );
  const eventScore = Math.round(eventRatio * 1500);

  // 4. Multiplicador de Velocidad (0.8x a 1.25x)
  const timeRatio = Math.max(0, Math.min(1, timeRemainingSeconds / totalTimeSeconds));
  const timeBonusMultiplier = Number((0.8 + 0.45 * timeRatio).toFixed(2));

  // 5. Penalización de Pistas (ej: -250 pts por pista inspeccionada)
  const cluePenalty = cluesUsedCount * 250;

  // 6. Puntaje Final
  const rawSubtotal = yearScore + locationScore + eventScore;
  const totalScore = Math.max(0, Math.round(rawSubtotal * timeBonusMultiplier - cluePenalty));

  return {
    year_score: yearScore,
    location_score: locationScore,
    event_score: eventScore,
    time_bonus_multiplier: timeBonusMultiplier,
    clue_penalty: cluePenalty,
    total_score: totalScore,
    year_diff: yearDiff,
    geo_distance_km: geoDistanceKm !== undefined ? Math.round(geoDistanceKm) : undefined,
    time_remaining_seconds: timeRemainingSeconds,
  };
}
