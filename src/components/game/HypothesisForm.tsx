'use client';

import React, { useState } from 'react';
import { PlayerHypothesis } from '@/types/game';
import { CanonicalEvidence } from '@/types/evidence';
import { Calendar, MapPin, Search, SendHorizontal } from 'lucide-react';

interface HypothesisFormProps {
  evidence: CanonicalEvidence;
  hypothesis: PlayerHypothesis;
  onUpdateHypothesis: (partial: Partial<PlayerHypothesis>) => void;
  onSubmitVerdict: () => void;
  timeRemaining: number;
}

export const HypothesisForm: React.FC<HypothesisFormProps> = ({
  evidence,
  hypothesis,
  onUpdateHypothesis,
  onSubmitVerdict,
  timeRemaining,
}) => {
  const [activeTab, setActiveTab] = useState<'YEAR' | 'EVENT' | 'LOCATION'>('YEAR');
  const currentYear = hypothesis.year || 1940;

  return (
    <div className="w-full bg-[#12151b] border border-zinc-800 rounded-lg p-4 flex flex-col gap-4 shadow-xl">
      {/* Selector de Pestañas de Hipótesis */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('YEAR')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
              activeTab === 'YEAR'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            AÑO
            {hypothesis.year && (
              <span className="ml-1 px-1.5 py-0.2 bg-amber-500/30 text-amber-200 rounded text-[10px]">
                {hypothesis.year}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('EVENT')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
              activeTab === 'EVENT'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            ACONTECIMIENTO
          </button>

          <button
            onClick={() => setActiveTab('LOCATION')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
              activeTab === 'LOCATION'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            UBICACIÓN
          </button>
        </div>

        {/* Botón de Sello de Veredicto */}
        <button
          onClick={onSubmitVerdict}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-zinc-950 px-4 py-1.5 rounded font-mono text-xs font-bold tracking-wider shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all"
        >
          <SendHorizontal className="w-3.5 h-3.5" />
          SELLAR HIPÓTESIS
        </button>
      </div>

      {/* Contenido de la Pestaña Activa */}
      {activeTab === 'YEAR' && (
        <div className="flex flex-col gap-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              DESLIZÁ O AJUSTÁ EL AÑO HISTÓRICO ESTIMADO:
            </span>
            <span className="font-mono text-2xl font-black text-amber-400 bg-zinc-900 px-3 py-1 rounded border border-amber-500/30">
              {currentYear}
            </span>
          </div>

          <input
            type="range"
            min={1800}
            max={2025}
            step={1}
            value={currentYear}
            onChange={(e) =>
              onUpdateHypothesis({ year: parseInt(e.target.value, 10) })
            }
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>1800</span>
            <span>1850</span>
            <span>1900</span>
            <span>1950</span>
            <span>2000</span>
            <span>2025</span>
          </div>

          {/* Ajuste Fino (+ / -) */}
          <div className="flex gap-2 justify-end mt-1">
            {[-10, -1, 1, 10].map((delta) => (
              <button
                key={delta}
                onClick={() =>
                  onUpdateHypothesis({
                    year: Math.max(1800, Math.min(2025, currentYear + delta)),
                  })
                }
                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded font-mono text-xs border border-zinc-700 transition-colors"
              >
                {delta > 0 ? `+${delta}` : delta}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'EVENT' && (
        <div className="flex flex-col gap-2 py-2">
          <label className="text-xs font-mono text-zinc-400">
            NOMBRE O PALABRA CLAVE DEL ACONTECIMIENTO:
          </label>
          <input
            type="text"
            placeholder="Ej: Inauguración Obelisco / Cordobazo / Solvay..."
            value={hypothesis.event_query || ''}
            onChange={(e) =>
              onUpdateHypothesis({ event_query: e.target.value })
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-amber-500"
          />
          <p className="text-[11px] text-zinc-400">
            Podés ingresar el nombre exacto o términos clave asociados al hito histórico.
          </p>
        </div>
      )}

      {activeTab === 'LOCATION' && (
        <div className="flex flex-col gap-2 py-2">
          <label className="text-xs font-mono text-zinc-400">
            CIUDAD O PAÍS ESTIMADO:
          </label>
          <input
            type="text"
            placeholder="Ej: Buenos Aires / Santiago / Berlín / París..."
            value={hypothesis.location?.city || ''}
            onChange={(e) =>
              onUpdateHypothesis({
                location: {
                  latitude: hypothesis.location?.latitude || evidence.canonical_location.latitude,
                  longitude: hypothesis.location?.longitude || evidence.canonical_location.longitude,
                  city: e.target.value,
                },
              })
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-amber-500"
          />
        </div>
      )}
    </div>
  );
};
