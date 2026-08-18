'use client';

import React, { useState } from 'react';
import { CanonicalEvidence } from '@/types/evidence';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  ImageOff,
} from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/image-url';

interface EvidenceDetailModalProps {
  evidence: CanonicalEvidence | null;
  targetEvidence?: CanonicalEvidence | null;
  isPlayerChoice?: boolean;
  onClose: () => void;
}

export const EvidenceDetailModal: React.FC<EvidenceDetailModalProps> = ({
  evidence,
  targetEvidence,
  isPlayerChoice = false,
  onClose,
}) => {
  const [imgError, setImgError] = useState(false);

  if (!evidence) return null;

  const isTarget = targetEvidence && targetEvidence.id === evidence.id;
  const isIncorrectChoice = isPlayerChoice && !isTarget;

  const optimizedUrl = getOptimizedImageUrl(evidence.image_hd_url || evidence.image_url, 1200);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-2.5 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#0f1218] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div
            className={`px-4 sm:px-5 py-3 flex items-center justify-between border-b ${
              isTarget
                ? 'bg-gradient-to-r from-amber-950/80 to-zinc-900 border-amber-500/40'
                : isIncorrectChoice
                ? 'bg-gradient-to-r from-red-950/80 to-zinc-900 border-red-500/40'
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`p-1.5 rounded-lg border shrink-0 ${
                  isTarget
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : isIncorrectChoice
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                }`}
              >
                {isTarget ? (
                  <Award className="w-4 h-4" />
                ) : isIncorrectChoice ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <BookOpen className="w-4 h-4" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold truncate">
                  {isTarget
                    ? '🏛️ EVIDENCIA CANÓNICA DE LA RONDA'
                    : isIncorrectChoice
                    ? '❌ TU ELECCIÓN (EXPEDIENTE INCORRECTO)'
                    : '📜 EXPEDIENTE DEL ARCHIVO GENERAL'}
                </span>
                <h3 className="text-sm sm:text-base font-serif font-bold text-zinc-100 truncate">
                  {evidence.canonical_event} ({evidence.canonical_date.year})
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 flex flex-col gap-3.5 text-xs">
            {/* Foto de Archivo Real */}
            <div className="w-full aspect-[16/9] sm:aspect-[16/8.5] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 relative shadow-inner">
              {!imgError ? (
                <img
                  src={optimizedUrl}
                  alt={evidence.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-500 font-mono text-[11px]">
                  <ImageOff className="w-8 h-8 text-zinc-600" />
                  <span>Fotografía archivada</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5 sm:p-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-300 font-bold truncate pr-2">
                  {evidence.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-700 text-[9px] font-mono text-amber-300 shrink-0">
                  {evidence.thematic_category}
                </span>
              </div>
            </div>

            {/* Ficha de Metadatos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#121622] border border-zinc-800 rounded-xl p-3 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-zinc-300 truncate">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-zinc-500">Fecha:</span>
                <span className="font-bold text-zinc-100 truncate">{evidence.canonical_date.display_date}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300 truncate">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-zinc-500">Ubicación:</span>
                <span className="font-bold text-zinc-100 truncate">{evidence.canonical_location.display_location}</span>
              </div>
            </div>

            {/* Contexto Histórico */}
            <div className="flex flex-col gap-1 bg-[#12151b] border border-zinc-800/80 rounded-xl p-3.5">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" />
                Contexto Histórico Documentado
              </span>
              <p className="text-[11px] sm:text-xs text-zinc-200 font-sans leading-relaxed pt-0.5">
                {evidence.historical_context_brief}
              </p>
            </div>

            {/* Claves de Deducción */}
            <div className="flex flex-col gap-1 bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Claves Visuales de Deducción
              </span>
              <p className="text-[11px] sm:text-xs text-amber-100/90 font-sans leading-relaxed pt-0.5">
                {evidence.deduction_pathway}
              </p>
            </div>

            {/* Fuente y Custodia */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-500 border-t border-zinc-800/80 pt-2 px-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Custodia: <strong className="text-zinc-400">{evidence.image_source.institution}</strong></span>
              </div>
              <span>Licencia: <strong className="text-zinc-400">{evidence.image_source.rights_license}</strong></span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
