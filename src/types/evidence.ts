import { z } from 'zod';

export const EditorialStatusSchema = z.enum([
  'DRAFT',
  'RESEARCHED',
  'SOURCE_VERIFIED',
  'EDITOR_VERIFIED',
  'READY_FOR_COMPETITIVE',
  'RETIRED'
]);
export type EditorialStatus = z.infer<typeof EditorialStatusSchema>;

export const PrecisionLevelSchema = z.enum([
  'EXACT_DATE',
  'YEAR_ONLY',
  'DECADE',
  'LOCATION_CITY',
  'LOCATION_COORDINATES',
  'EVENT_ONLY',
  'EVENT_AND_YEAR',
  'FULL_IDENTIFICATION'
]);
export type PrecisionLevel = z.infer<typeof PrecisionLevelSchema>;

export const ClueCategorySchema = z.enum([
  'architecture',
  'clothing',
  'vehicle',
  'text_sign',
  'flag_symbol',
  'personage',
  'landscape',
  'technology'
]);
export type ClueCategory = z.infer<typeof ClueCategorySchema>;

export const VisualClueSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: ClueCategorySchema,
  normalized_rect: z.object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
    width: z.number().min(0).max(1),
    height: z.number().min(0).max(1),
  }),
  observation_text: z.string(),
  deduction_text: z.string(),
  time_penalty_seconds: z.number().min(3).max(15),
});
export type VisualClue = z.infer<typeof VisualClueSchema>;

export const HistoricalSourceSchema = z.object({
  institution: z.string(),
  collection_id: z.string().optional(),
  source_type: z.enum(['PRIMARY_DOCUMENT', 'PRIMARY_PHOTO', 'OFFICIAL_ARCHIVE', 'ACADEMIC_RECORD']),
  citation_url: z.string().url().optional(),
  rights_license: z.enum(['PUBLIC_DOMAIN', 'CC_BY', 'INSTITUTIONAL_OPEN_ACCESS', 'EDITORIAL_AUTHORIZED']),
  rights_holder: z.string(),
});
export type HistoricalSource = z.infer<typeof HistoricalSourceSchema>;

export const CanonicalEvidenceSchema = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
  
  // Imagen y Assets
  image_url: z.string(),
  image_hd_url: z.string(),
  image_aspect_ratio: z.number().positive(),
  image_source: HistoricalSourceSchema,
  
  // Canonicidad Factual
  canonical_event: z.string(),
  accepted_event_aliases: z.array(z.string()),
  
  precision_required: PrecisionLevelSchema,
  canonical_date: z.object({
    year: z.number(),
    month: z.number().min(1).max(12).optional(),
    day: z.number().min(1).max(31).optional(),
    display_date: z.string(),
  }),
  
  canonical_location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    city: z.string(),
    country_code: z.string().length(2),
    country_name: z.string(),
    display_location: z.string(),
  }),
  
  // Categorización
  geographic_scope: z.enum(['ARGENTINA', 'LIMITROFES', 'LATAM', 'MUNDO_MODERNO', 'SIGLO_XX', 'GLOBAL']),
  thematic_category: z.enum(['POLITICA', 'GUERRAS', 'CIENCIA_TEC', 'CULTURA_SOCIEDAD', 'PERSONAJES', 'ARQUITECTURA']),
  difficulty_tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  
  // Sistema de Investigación
  visual_clues: z.array(VisualClueSchema),
  
  // Validación Histórica
  editorial_status: EditorialStatusSchema,
  primary_sources: z.array(HistoricalSourceSchema).min(1),
  secondary_sources: z.array(z.string()),
  historical_context_brief: z.string(),
  deduction_pathway: z.string(),
  editor_notes: z.string().optional(),
  verified_at: z.string(),
});
export type CanonicalEvidence = z.infer<typeof CanonicalEvidenceSchema>;
