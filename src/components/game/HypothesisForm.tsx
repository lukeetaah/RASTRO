'use client';

import React, { useState } from 'react';
import { PlayerHypothesis } from '@/types/game';
import { CanonicalEvidence } from '@/types/evidence';
import { CANONICAL_EVIDENCES } from '@/data/canonical-evidences';
import { Calendar, MapPin, Search, SendHorizontal, Check, ArrowRight } from 'lucide-react';
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

export const HypothesisForm: React.FC<HypothesisFormProps> = ({
  evidence,
  hypothesis,
  onUpdateHypothesis,
  onSubmitVerdict,
  timeRemaining,
}) => {
  const [activeTab, setActiveTab] = useState<'EVENT' | 'YEAR' | 'LOCATION'>('EVENT');
  const currentYear = hypothesis.year || evidence.canonical_date.year;

  // Lista de eventos canónicos disponibles
  const availableEvidences = CANONICAL_EVIDENCES;

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

  // Al elegir acontecimiento, auto-configuramos inteligentemente año y ubicación sugerida
  const handleSelectCanonicalEvent = (ev: CanonicalEvidence) => {
    soundFx.playClick();
    onUpdateHypothesis({
      event_query: ev.canonical_event,
      year: ev.canonical_date.year,
      location: {
        latitude: ev.canonical_location.latitude,
        longitude: ev.canonical_location.longitude,
        city: ev.canonical_location.city,
      },
    });
  };

  const handleSend = () => {
    soundFx.playStamp();
    onSubmitVerdict();
  };

  return (
    <div className="w-full bg-[#0f1218] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-2xl">
      {/* 1. Selector de Pestañas */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('EVENT');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'EVENT'
                ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/60'
            }`}
          >
            <Search className="w-4 h-4" />
            1. ELEGIR ACONTECIMIENTO
            {hypothesis.event_query && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('YEAR');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'YEAR'
                ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            2. AÑO ({currentYear})
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('LOCATION');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'LOCATION'
                ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/60'
            }`}
          >
            <MapPin className="w-4 h-4" />
            3. UBICACIÓN
            {hypothesis.location?.city && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Contenido de la Pestaña */}
      <div className="min-h-[110px] flex flex-col justify-center">
        {/* Pestaña ACONTECIMIENTO (Prioritaria) */}
        {activeTab === 'EVENT' && (
          <div className="flex flex-col gap-2.5 animate-in fade-in duration-150">
            <span className="text-xs font-mono text-zinc-400">
              SELECCIONÁ EL ACONTECIMIENTO QUE IDENTIFICA A LA FOTOGRAFÍA:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {availableEvidences.map((ev) => {
                const isSelected = hypothesis.event_query === ev.canonical_event;
                return (
                  <button
                    key={ev.id}
                    onClick={() => handleSelectCanonicalEvent(ev)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-lg ring-2 ring-amber-500/30'
                        : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:bg-zinc-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {ev.canonical_date.year} • {ev.thematic_category}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400 font-bold" />}
                    </div>
                    <span className="font-mono text-xs font-bold leading-snug">
                      {ev.canonical_event}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pestaña AÑO */}
        {activeTab === 'YEAR' && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                AJUSTÁ EL AÑO HISTÓRICO:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">AÑO ELEGIDO:</span>
                <span className="font-mono text-2xl font-black text-amber-400 bg-zinc-950 px-4 py-1 rounded-lg border border-amber-500/50 shadow-inner">
                  {currentYear}
                </span>
              </div>
            </div>

            <input
              type="range"
              min={1800}
              max={2025}
              step={1}
              value={currentYear}
              onChange={(e) => handleSelectYear(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-zinc-400 self-center mr-1">
                Atajos:
              </span>
              {[1810, 1910, 1914, 1927, 1936, 1945, 1969, 1973, 1989].map((year) => (
                <button
                  key={year}
                  onClick={() => handleSelectYear(year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                    currentYear === year
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md scale-105'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pestaña UBICACIÓN */}
        {activeTab === 'LOCATION' && (
          <div className="flex flex-col gap-2.5 animate-in fade-in duration-150">
            <span className="text-xs font-mono text-zinc-400">
              CIUDAD O REGIÓN HISTÓRICA:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HISTORICAL_CITIES.map((c) => {
                const isSelected = hypothesis.location?.city === c.city;
                return (
                  <button
                    key={c.city}
                    onClick={() => handleSelectCity(c)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/30'
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

      {/* 3. BARRA DE ACCIÓN Y ENVÍO */}
      <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-zinc-400">Tu Veredicto:</span>
          {hypothesis.event_query ? (
            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold rounded-lg truncate max-w-[280px]">
              🏛️ {hypothesis.event_query}
            </span>
          ) : (
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-zinc-400 rounded-lg">
              (Sin acontecimiento)
            </span>
          )}
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold rounded-lg">
            📅 {currentYear}
          </span>
          {hypothesis.location?.city && (
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg">
              📍 {hypothesis.location.city}
            </span>
          )}
        </div>

        <button
          onClick={handleSend}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-zinc-950 px-8 py-3.5 rounded-xl font-mono text-sm font-black tracking-wider shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
        >
          <SendHorizontal className="w-4 h-4" />
          <span>ENVIAR RESPUESTA FINAL</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
