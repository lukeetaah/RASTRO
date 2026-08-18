'use client';

import React, { useState } from 'react';
import { PlayerHypothesis } from '@/types/game';
import { CanonicalEvidence } from '@/types/evidence';
import { useGameStore } from '@/store/game-store';
import {
  Calendar,
  MapPin,
  Search,
  SendHorizontal,
  Check,
  Zap,
  Filter,
} from 'lucide-react';
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
  { city: 'Mendoza', country: 'Argentina', lat: -32.8908, lon: -68.8272 },
  { city: 'Santiago', country: 'Chile', lat: -33.4429, lon: -70.6539 },
  { city: 'Bruselas', country: 'Bélgica', lat: 50.8503, lon: 4.3517 },
  { city: 'Berlín', country: 'Alemania', lat: 52.5163, lon: 13.3777 },
  { city: 'París', country: 'Francia', lat: 48.8566, lon: 2.3522 },
  { city: 'Hiroshima', country: 'Japón', lat: 34.3853, lon: 132.4553 },
  { city: 'Sarajevo', country: 'Bosnia', lat: 43.8563, lon: 18.4131 },
  { city: 'Washington D.C.', country: 'EE.UU.', lat: 38.8893, lon: -77.0502 },
  { city: 'Mar de la Tranquilidad', country: 'Luna', lat: 0.674, lon: 23.472 },
  { city: 'Esclusas de Miraflores', country: 'Panamá', lat: 9.08, lon: -79.68 },
];

export const HypothesisForm: React.FC<HypothesisFormProps> = ({
  evidence,
  hypothesis,
  onUpdateHypothesis,
  onSubmitVerdict,
}) => {
  const [activeTab, setActiveTab] = useState<'EVENT' | 'YEAR' | 'LOCATION'>('EVENT');
  const currentYear = hypothesis.year ?? evidence.canonical_date.year;

  const {
    lifelinesRemaining,
    eliminatedEventOptions,
    decadeFilter,
    currentRoundOptions,
    useLifeline5050,
    useLifelineDecade,
  } = useGameStore();

  const eventOptions =
    currentRoundOptions.length > 0
      ? currentRoundOptions.map((opt) => opt.canonical_event)
      : evidence.distractor_events || [
          evidence.canonical_event,
          'Acontecimiento Histórico A',
          'Acontecimiento Histórico B',
          'Acontecimiento Histórico C',
        ];

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

  const handleSelectEvent = (eventName: string) => {
    soundFx.playClick();
    const matched =
      currentRoundOptions.find(
        (opt) => opt.canonical_event.toLowerCase().trim() === eventName.toLowerCase().trim()
      ) ||
      (eventName.toLowerCase().trim() === evidence.canonical_event.toLowerCase().trim()
        ? evidence
        : undefined);

    if (matched) {
      onUpdateHypothesis({
        event_query: eventName,
        year: matched.canonical_date.year,
        location: {
          latitude: matched.canonical_location.latitude,
          longitude: matched.canonical_location.longitude,
          city: matched.canonical_location.city,
        },
      });
    } else {
      onUpdateHypothesis({
        event_query: eventName,
      });
    }
  };

  const handleSend = () => {
    soundFx.playStamp();
    onSubmitVerdict();
  };

  const minSliderYear = decadeFilter ? decadeFilter.min : 1800;
  const maxSliderYear = decadeFilter ? decadeFilter.max : 2025;

  return (
    <div className="w-full bg-[#0f1218] border border-zinc-800/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col gap-2 sm:gap-3 shadow-2xl shrink-0">
      {/* 1. Selector de Pestañas y Ayudas (Ultra-compacto en mobile) */}
      <div className="flex items-center justify-between gap-1.5 border-b border-zinc-800 pb-1.5 sm:pb-2.5">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('EVENT');
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'EVENT'
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/60'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>1. EVENTO</span>
            {hypothesis.event_query && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('YEAR');
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'YEAR'
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>2. AÑO ({currentYear})</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('LOCATION');
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'LOCATION'
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3. UBICACIÓN</span>
            <span className="sm:hidden">3. CIUDAD</span>
            {hypothesis.location?.city && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>

        {/* Ayudas 50:50 y Década */}
        <div className="flex items-center gap-1">
          <button
            disabled={lifelinesRemaining <= 0 || eliminatedEventOptions.length > 0}
            onClick={useLifeline5050}
            title="50:50 (Descarta 2 falsas)"
            className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold border transition-all cursor-pointer ${
              lifelinesRemaining > 0 && eliminatedEventOptions.length === 0
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
            }`}
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>50:50</span>
          </button>

          <button
            disabled={lifelinesRemaining <= 0 || decadeFilter !== null}
            onClick={useLifelineDecade}
            title="Filtrar Década"
            className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold border transition-all cursor-pointer ${
              lifelinesRemaining > 0 && decadeFilter === null
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
            }`}
          >
            <Filter className="w-3 h-3 text-amber-400" />
            <span>Década</span>
          </button>
        </div>
      </div>

      {/* 2. Contenido Activo (Reducido y ajustado para 1 sola pantalla) */}
      <div className="min-h-[70px] sm:min-h-[85px] flex flex-col justify-center">
        {/* Pestaña ACONTECIMIENTO */}
        {activeTab === 'EVENT' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 animate-in fade-in duration-100">
            {eventOptions.map((opt) => {
              const isSelected = hypothesis.event_query === opt;
              const isEliminated = eliminatedEventOptions.includes(opt);

              if (isEliminated) {
                return (
                  <div
                    key={opt}
                    className="p-1.5 sm:p-2.5 rounded-lg border border-zinc-850 bg-zinc-950/40 text-zinc-600 line-through opacity-40 select-none flex items-center justify-between text-[11px] font-mono"
                  >
                    <span className="truncate">{opt}</span>
                    <span className="text-[9px] text-red-500/60 uppercase">DESCARTADO</span>
                  </div>
                );
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectEvent(opt)}
                  className={`p-1.5 sm:p-2.5 rounded-lg border text-left flex items-center justify-between gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-sm ring-1 ring-amber-500/40'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:bg-zinc-850'
                  }`}
                >
                  <span className="font-mono text-[11px] sm:text-xs font-bold leading-tight line-clamp-2">
                    {opt}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 font-bold shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Pestaña AÑO */}
        {activeTab === 'YEAR' && (
          <div className="flex flex-col gap-1.5 sm:gap-2 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">
                {decadeFilter ? `DÉCADA: ${decadeFilter.min}-${decadeFilter.max}` : 'AJUSTAR AÑO:'}
              </span>
              <span className="font-mono text-lg sm:text-xl font-black text-amber-400 bg-zinc-950 px-3 py-0.5 rounded border border-amber-500/40">
                {currentYear}
              </span>
            </div>

            <input
              type="range"
              min={minSliderYear}
              max={maxSliderYear}
              step={1}
              value={Math.max(minSliderYear, Math.min(maxSliderYear, currentYear))}
              onChange={(e) => handleSelectYear(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex flex-wrap gap-1 pt-0.5">
              {[1810, 1889, 1903, 1912, 1914, 1928, 1936, 1945, 1963, 1969, 1973, 1989].map((y) => (
                <button
                  key={y}
                  onClick={() => handleSelectYear(y)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                    currentYear === y
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pestaña UBICACIÓN */}
        {activeTab === 'LOCATION' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 animate-in fade-in duration-100">
            {HISTORICAL_CITIES.map((c) => {
              const isSelected = hypothesis.location?.city === c.city;
              return (
                <button
                  key={c.city}
                  onClick={() => handleSelectCity(c)}
                  className={`p-1.5 rounded-lg border text-left flex flex-col transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
                  }`}
                >
                  <span className="font-mono text-[11px] font-bold truncate">{c.city}</span>
                  <span className="text-[9px] text-zinc-500 truncate">{c.country}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. BARRA INFERIOR DE ACCIÓN (Unificada en 1 sola fila) */}
      <div className="pt-1.5 sm:pt-2 border-t border-zinc-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono truncate">
          {hypothesis.event_query ? (
            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold rounded truncate max-w-[140px] sm:max-w-[260px]">
              🏛️ {hypothesis.event_query}
            </span>
          ) : (
            <span className="text-zinc-500 italic truncate max-w-[120px] sm:max-w-none">
              (Elegí evento)
            </span>
          )}
          <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold rounded shrink-0">
            📅 {currentYear}
          </span>
        </div>

        <button
          onClick={handleSend}
          className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-zinc-950 px-4 sm:px-7 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <SendHorizontal className="w-3.5 h-3.5" />
          <span>SELLAR</span>
        </button>
      </div>
    </div>
  );
};
