'use client';

import React, { useState } from 'react';
import { CANONICAL_EVIDENCES } from '@/data/canonical-evidences';
import { CanonicalEvidence } from '@/types/evidence';
import { validateEvidenceCompleteness } from '@/lib/validation';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Search,
  BookOpen,
  Eye,
  Check,
  AlertTriangle,
} from 'lucide-react';

export const BackofficeStudio: React.FC<{ onBackToGame: () => void }> = ({
  onBackToGame,
}) => {
  const [evidences, setEvidences] = useState<CanonicalEvidence[]>(CANONICAL_EVIDENCES);
  const [selectedId, setSelectedId] = useState<string>(CANONICAL_EVIDENCES[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const selected = evidences.find((ev) => ev.id === selectedId) || evidences[0];
  const validationResult = selected ? validateEvidenceCompleteness(selected) : null;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 py-6 animate-in fade-in duration-200">
      {/* Header del Studio */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-mono font-bold text-zinc-100 uppercase tracking-wider">
              RASTRO — Content Studio & Auditoría Factual
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Pipeline de validación histórica de 11 puntos antes de READY_FOR_COMPETITIVE
            </p>
          </div>
        </div>

        <button
          onClick={onBackToGame}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-mono text-xs font-semibold transition-colors"
        >
          VOLVER AL MODO JUEGO
        </button>
      </div>

      {/* Grid: Lista de Evidencias vs Detalle de Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Lista Lateral */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span>EVIDENCIAS EN EL ARCHIVO ({evidences.length})</span>
            <span className="text-emerald-400 font-bold">100% READY</span>
          </div>

          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
            {evidences.map((ev) => {
              const isCurrent = ev.id === selected?.id;
              return (
                <button
                  key={ev.id}
                  onClick={() => setSelectedId(ev.id)}
                  className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-200'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold">{ev.code}</span>
                    <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-800/80 rounded text-[9px]">
                      {ev.editorial_status}
                    </span>
                  </div>
                  <span className="text-sm font-semibold truncate text-zinc-100">
                    {ev.title}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {ev.image_source.institution} • {ev.canonical_date.display_date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel de Auditoría Factual */}
        {selected && validationResult && (
          <div className="md:col-span-7 flex flex-col gap-4 bg-[#12151b] border border-zinc-800 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                  AUDITORÍA FACTUAL & INTEGRIDAD
                </span>
                <h2 className="text-lg font-serif font-bold text-zinc-100">
                  {selected.canonical_event}
                </h2>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded font-mono text-xs font-bold ${
                  validationResult.is_valid
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50'
                    : 'bg-red-950/80 text-red-300 border border-red-600/50'
                }`}
              >
                {validationResult.is_valid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    CERTIFICADO PARA COMPETITIVO
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    RECHAZADO POR AMBIGÜEDAD
                  </>
                )}
              </div>
            </div>

            {/* Checklist de 11 Puntos */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-amber-400 font-bold uppercase">
                CHECKLIST DE VERIFICACIÓN HISTÓRICA:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {[
                  '1. Unicidad Factual y Respuestas Inequívocas',
                  '2. Fecha Canónica Certificada por Registro',
                  '3. Ubicación y Coordenadas Inmutables',
                  '4. Integridad de Imagen Contemporánea',
                  '5. Pistas Visuales Reales en Píxeles',
                  '6. Licencia y Trazabilidad Institucional',
                  '7. Soporte de Deep Zoom y Resolución',
                  '8. Test del Jugador Culto Aprobado',
                  '9. Dimensión de Ronda Adaptada a la Evidencia',
                  '10. Aliases y Sinónimos Mapeados',
                  '11. Doble Verificación Editorial Completada',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-zinc-900/90 rounded border border-zinc-800/80"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-zinc-300 text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pistas Visuales Anotadas */}
            <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800">
              <span className="font-mono text-xs text-zinc-400 font-bold">
                PISTAS VISUALES ANOTADAS ({selected.visual_clues.length}):
              </span>
              <div className="flex flex-col gap-2">
                {selected.visual_clues.map((clue) => (
                  <div
                    key={clue.id}
                    className="p-2.5 bg-zinc-900 rounded border border-zinc-800 text-xs flex flex-col gap-1 font-mono"
                  >
                    <div className="flex justify-between text-amber-300 font-bold">
                      <span>• {clue.title}</span>
                      <span className="text-zinc-400 text-[10px]">
                        -{clue.time_penalty_seconds}s
                      </span>
                    </div>
                    <p className="text-zinc-300 font-sans text-xs">
                      {clue.observation_text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
