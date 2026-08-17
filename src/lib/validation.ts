import { CanonicalEvidence, CanonicalEvidenceSchema } from '@/types/evidence';

export interface ValidationChecklistResult {
  is_valid: boolean;
  passed_checks: string[];
  failed_checks: string[];
  errors: string[];
}

export function validateEvidenceCompleteness(
  evidence: unknown
): ValidationChecklistResult {
  const passed: string[] = [];
  const failed: string[] = [];
  const errors: string[] = [];

  // 1. Validación de esquema Zod
  const zodResult = CanonicalEvidenceSchema.safeParse(evidence);
  if (!zodResult.success) {
    failed.push('ESQUEMA_ZOD_INVALIDO');
    zodResult.error.errors.forEach((err) => {
      errors.push(`${err.path.join('.')}: ${err.message}`);
    });
    return {
      is_valid: false,
      passed_checks: passed,
      failed_checks: failed,
      errors,
    };
  }

  const ev = zodResult.data as CanonicalEvidence;
  passed.push('ESQUEMA_ZOD_VALIDO');

  // 2. Unicidad Factual y Título
  if (ev.canonical_event.trim().length > 3 && ev.accepted_event_aliases.length > 0) {
    passed.push('1_UNICIDAD_FACTUAL');
  } else {
    failed.push('1_UNICIDAD_FACTUAL_FALTAN_ALIASES');
  }

  // 3. Fecha Canónica
  if (ev.canonical_date && ev.canonical_date.year > 1000 && ev.canonical_date.year <= 2030) {
    passed.push('2_FECHA_CANONICA_VERIFICADA');
  } else {
    failed.push('2_FECHA_CANONICA_INVALIDA');
  }

  // 4. Ubicación Canónica
  if (
    ev.canonical_location &&
    Math.abs(ev.canonical_location.latitude) <= 90 &&
    Math.abs(ev.canonical_location.longitude) <= 180 &&
    ev.canonical_location.city.length > 0
  ) {
    passed.push('3_UBICACION_CANONICA_VERIFICADA');
  } else {
    failed.push('3_UBICACION_CANONICA_INVALIDA');
  }

  // 5. Integridad de Imagen y URL
  if ((ev.image_url.startsWith('/') || ev.image_url.startsWith('http')) && ev.image_aspect_ratio > 0) {
    passed.push('4_INTEGRIDAD_IMAGEN');
  } else {
    failed.push('4_INTEGRIDAD_IMAGEN_FALLIDA');
  }

  // 6. Pistas Visuales
  if (ev.visual_clues.length >= 1) {
    const allCluesValid = ev.visual_clues.every(
      (c) =>
        c.normalized_rect.width > 0 &&
        c.normalized_rect.height > 0 &&
        c.observation_text.length > 10 &&
        c.deduction_text.length > 10
    );
    if (allCluesValid) {
      passed.push('5_PISTAS_VISUALES_REALES');
    } else {
      failed.push('5_PISTAS_VISUALES_INCOMPLETAS');
    }
  } else {
    failed.push('5_SIN_PISTAS_VISUALES');
  }

  // 7. Licencia y Trazabilidad
  if (ev.primary_sources.length > 0 && ev.image_source.rights_license) {
    passed.push('6_LICENCIA_Y_DERECHOS_TRAZABLES');
  } else {
    failed.push('6_FALTAN_FUENTES_O_LICENCIA');
  }

  // 8. Contexto Histórico & Explicación
  if (ev.historical_context_brief.length >= 30 && ev.deduction_pathway.length >= 20) {
    passed.push('7_CONTEXTO_Y_DEDUCCION_COMPLETOS');
  } else {
    failed.push('7_CONTEXTO_HISTORICO_INSUFICIENTE');
  }

  const isValid = failed.length === 0;

  return {
    is_valid: isValid,
    passed_checks: passed,
    failed_checks: failed,
    errors,
  };
}
