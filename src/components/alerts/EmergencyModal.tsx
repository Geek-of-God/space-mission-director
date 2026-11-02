'use client';

import React from 'react';
import { AlertOctagon, Radio, ShieldAlert } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { DirectiveButton } from './DirectiveButton';

/**
 * Modale d'Urgence - Alerte Spatiale Critique (Écran 3)
 * Déclenchée lors des tempêtes solaires NASA DONKI (Tour 4 ou Tour 6)
 * - Bordure rouge pulsante #EF4444
 * - Arrière-plan avec flou profond (backdrop-blur-md)
 * - 3 Directives d'ingénierie d'urgence
 */
export const EmergencyModal: React.FC = () => {
  const { currentAlert, resolveAlertDirective } = useGameStore();

  if (!currentAlert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0B1020] border-2 border-[#EF4444] shadow-[0_0_40px_rgba(239,68,68,0.7)] p-6 sm:p-8 animate-red-alert">
        {/* Rayures d'avertissement de cockpit spatial en haut */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#EF4444] to-transparent rounded-t-2xl" />

        {/* Badge Scientifique Officiel DONKI */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>{currentAlert.sourceBadge}</span>
          </div>
          <span className="text-[11px] font-mono text-rose-400 font-bold tracking-widest uppercase">
            PRIORITÉ ALPHA
          </span>
        </div>

        {/* Titre & Alerte */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-500">
            <AlertOctagon className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <h2 className="font-space text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentAlert.title}
            </h2>
            <p className="text-xs font-mono text-rose-400">
              ÉVÉNEMENT GÉOMAGNÉTIQUE NOCTURNE • RISQUE DE PERTE DE SATELLITE
            </p>
          </div>
        </div>

        {/* Description narrative réelle */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-rose-950 mb-6">
          <p className="text-sm text-slate-200 leading-relaxed font-sans mb-3">
            {currentAlert.description}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-500/30">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{currentAlert.realEventData}</span>
          </div>
        </div>

        {/* 3 Directives d'ingénierie */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
            DIRECTIVES D’INGÉNIERIE D’URGENCE (CHOISISSEZ UNE MANŒUVRE) :
          </span>
          {currentAlert.directives.map((dir) => (
            <DirectiveButton
              key={dir.id}
              directive={dir}
              onSelect={(id) => resolveAlertDirective(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
