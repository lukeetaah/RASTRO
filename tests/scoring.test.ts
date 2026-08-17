import { describe, it, expect } from 'vitest';
import { calculateScore, calculateHaversineDistanceKm, evaluateEventMatch } from '../src/lib/scoring';
import { CANONICAL_EVIDENCES } from '../src/data/canonical-evidences';

describe('Motor de Puntuación de RASTRO', () => {
  const obeliscoEvidence = CANONICAL_EVIDENCES.find((e) => e.id === 'ev-arg-1936-obelisco')!;

  it('calcula distancia Haversine exacta en Buenos Aires', () => {
    // Distancia entre Obelisco y Plaza de Mayo (~1.2 km)
    const dist = calculateHaversineDistanceKm(-34.6037, -58.3816, -34.6083, -58.3712);
    expect(dist).toBeGreaterThan(0.8);
    expect(dist).toBeLessThan(2.0);
  });

  it('otorga puntaje perfecto en coincidencia exacta de año y ubicación con velocidad alta', () => {
    const score = calculateScore(
      obeliscoEvidence,
      {
        year: 1936,
        location: {
          latitude: -34.6037,
          longitude: -58.3816,
          city: 'Buenos Aires',
        },
        event_query: 'Inauguración del Obelisco de Buenos Aires',
      },
      0, // Sin pistas usadas
      80, // Respondió rápido (80s restantes)
      90
    );

    expect(score.year_score).toBe(2000);
    expect(score.location_score).toBe(1500);
    expect(score.event_score).toBe(1500);
    expect(score.clue_penalty).toBe(0);
    expect(score.total_score).toBeGreaterThan(5000); // 5000 * 1.20 = 6000
  });

  it('penaliza adecuadamente un desvío temporal de 5 años', () => {
    const score = calculateScore(
      obeliscoEvidence,
      {
        year: 1941, // 5 años de diferencia
        location: {
          latitude: -34.6037,
          longitude: -58.3816,
        },
        event_query: 'Obelisco',
      },
      2, // Usó 2 pistas (-500 pts)
      30, // 30s restantes
      90
    );

    expect(score.year_score).toBe(900);
    expect(score.clue_penalty).toBe(500);
    expect(score.year_diff).toBe(5);
  });

  it('reconoce aliases canónicos de acontecimientos', () => {
    const match = evaluateEventMatch(
      'IV Centenario de Buenos Aires',
      obeliscoEvidence.canonical_event,
      obeliscoEvidence.accepted_event_aliases
    );
    expect(match).toBe(1.0);
  });
});
