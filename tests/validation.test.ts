import { describe, it, expect } from 'vitest';
import { CANONICAL_EVIDENCES } from '../src/data/canonical-evidences';
import { validateEvidenceCompleteness } from '../src/lib/validation';

describe('Validación Factual y Pipeline Editorial', () => {
  it('todas las evidencias del corpus inicial cumplen el 100% del checklist factual', () => {
    expect(CANONICAL_EVIDENCES.length).toBeGreaterThanOrEqual(5);

    for (const evidence of CANONICAL_EVIDENCES) {
      const result = validateEvidenceCompleteness(evidence);
      expect(
        result.is_valid,
        `La evidencia ${evidence.code} falló validación: ${result.failed_checks.join(', ')}`
      ).toBe(true);
      expect(result.errors).toEqual([]);
      expect(evidence.editorial_status).toBe('READY_FOR_COMPETITIVE');
    }
  });

  it('detecta y rechaza evidencias incompletas o ambiguas', () => {
    const invalidEvidence = {
      id: 'ev-test-invalid',
      code: 'TEST-INVALID',
      title: 'Evidencia Inválida',
      // Faltan campos obligatorios
    };

    const result = validateEvidenceCompleteness(invalidEvidence);
    expect(result.is_valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
