'use client';

import React, { useState } from 'react';
import { PlayerHypothesis } from '@/types/game';
import { CanonicalEvidence } from '@/types/evidence';
import { CANONICAL_EVIDENCES } from '@/data/canonical-evidences';
import { Calendar, MapPin, Search, SendHorizontal, Check, Sparkles } from 'lucide-react';
import { soundFx } from '@/lib/sound';

interface HypothesisFormProps {
  evidence: CanonicalEvidence;
  hypothesis: PlayerHypothesis;
  onUpdateHypothesis: (partial: Partial<PlayerHypothesis>) => void;
  onSubmitVerdict: () => void;
  timeRemaining: number;
}

const HISTORICAL_CITIES = [
  { city: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
  { city: 'Córdoba', country: 'Argentina', lat: -31.4167, lon: -64.1833 },
  { city: 'Santiago', country: 'Chile', lat: -33.4429, lon: -70.6539 },
  { city: 'Montevideo', country: 'Uruguay', lat: -34.9011, lon: -56.1645 },
  { city: 'Bruselas', country: 'Bélgica', lat: 50.8503, lon: 4.3517 },
  { city: 'Berlín', country: 'Alemania', lat: 52.5163, lon: 13.3777 },
  { city: 'París', country: 'Francia', lat: 48.8566, lon: 2.3522 },
  { city: 'Mar de la Tranquilidad', country: 'Luna', lat: 0.674, lon: 23.472 },
  { city: 'Esclusas de Miraflores', country: 'Panamá', lat: 9.08, lon: -79.68 },
];

const HISTORICAL_DECISIVE_EVENTS = Array.from(
  new Set(CANONICAL_EVIDENCES.flatMap((e) => [e.canonical_event, ...e.accepted_event_aliases]))
);

export const HypothesisForm: React.FC<HypothesisFormProps> = ({
  evidence,
  hypothesis,
  onUpdateHypothesis,
  onSubmitVerdict,
  timeRemaining,
}) => {
  const [activeTab, setActiveTab] = useState<'YEAR' | 'EVENT' | 'LOCATION'>('YEAR');
  const currentYear = hypothesis.year || 1940;

  // Filtrado de eventos en tiempo real
  const query = hypothesis.event_query || '';
  const filteredEvents = HISTORICAL_DECISIVE_EVENTS.filter((evt) =>
    query.length > 0 ? evt.toLowerCase().includes(query.toLowerCase()) : true
  ).slice(0, 6);

  const handleSelectYear = (year: number) => {
    soundFx.playClick();
    onUpdateHypothesis({ year });
  };

  const handleSelectCity = (item: (typeof HISTORICAL_CITIES)[0]) => {
    soundFx.playClick();
    onUpdateHypothesis({
      location: {
        latitude: item.lat,
        longitude: item.lon,
        city: item.city,
      },
    });
  };

  const handleSelectEvent = (eventTitle: string) => {
    soundFx.playClick();
    onUpdateHypothesis({ event_query: eventTitle });
  };

  const handleSeal = () => {
    soundFx.playStamp();
    onSubmitVerdict();
  };

  return (
    <div className="w-full bg-[#10131a] border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 shadow-2xl">
      {/* Selector de Pestañas de Hipótesis */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('YEAR');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'YEAR'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            AÑO
            <span className="ml-1 px-1.5 py-0.2 bg-amber-500/30 text-amber-200 rounded text-[10px] font-mono">
              {currentYear}
            </span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('EVENT');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'EVENT'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            ACONTECIMIENTO
            {hypothesis.event_query && (
              <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('LOCATION');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'LOCATION'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            UBICACIÓN
            {hypothesis.location?.city && (
              <span className="ml-1 px-1.5 py-0.2 bg-amber-500/30 text-amber-200 rounded text-[10px]">
                {hypothesis.location.city}
              </span>
            )}
          </button>
        </div>

        {/* Botón de Sello de Veredicto */}
        <button
          onClick={handleSeal}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-zinc-950 px-5 py-2 rounded-lg font-mono text-xs font-black tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          <SendHorizontal className="w-4 h-4" />
          SELLAR VEREDICTO
        </button>
      </div>

      {/* 1. Pestaña: AÑO */}
      {activeTab === 'YEAR' && (
        <div className="flex flex-col gap-3 py-1 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              DESLIZÁ O SELECCIONÁ EL AÑO ESTIMADO:
            </span>
            <span className="font-mono text-2xl font-black text-amber-400 bg-zinc-900 px-3.5 py-1 rounded-md border border-amber-500/40 shadow-inner">
              {currentYear}
            </span>
          </div>

          <input
            type="range"
            min={1800}
            max={2025}
            step={1}
            value={currentYear}
            onChange={(e) => handleSelectYear(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          {/* Botones de Épocas Clave */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-zinc-400 self-center mr-1">
              Épocas:
            </span>
            {[1810, 1889, 1910, 1914, 1927, 1936, 1945, 1969, 1973, 1989].map((year) => (
              <button
                key={year}
                onClick={() => handleSelectYear(year)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-semibold border transition-colors ${
                  currentYear === year
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Pestaña: ACONTECIMIENTO */}
      {activeTab === 'EVENT' && (
        <div className="flex flex-col gap-2.5 py-1 animate-in fade-in duration-150">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar acontecimiento (ej: Obelisco, Solvay, Luna, Muro de Berlín...)"
              value={hypothesis.event_query || ''}
              onChange={(e) => onUpdateHypothesis({ event_query: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-amber-500 shadow-inner"
            />
          </div>

          {/* Sugerencias Rápidas de Acontecimientos */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {filteredEvents.map((item) => {
              const isSelected = hypothesis.event_query === item;
              return (
                <button
                  key={item}
                  onClick={() => handleSelectEvent(item)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-amber-500/50'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Pestaña: UBICACIÓN */}
      {activeTab === 'LOCATION' && (
        <div className="flex flex-col gap-2.5 py-1 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>SELECCIONÁ LA CIUDAD / REGIÓN HISTÓRICA:</span>
            {hypothesis.location?.city && (
              <span className="text-amber-400 font-bold">
                {hypothesis.location.city}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {HISTORICAL_CITIES.map((c) => {
              const isSelected = hypothesis.location?.city === c.city;
              return (
                <button
                  key={c.city}
                  onClick={() => handleSelectCity(c)}
                  className={`p-2.5 rounded-lg border text-left flex flex-col gap-0.5 transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{c.city}</span>
                  <span className="text-[10px] text-zinc-400">{c.country}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
