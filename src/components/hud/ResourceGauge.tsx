'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { getAvionicsColorLevel, getAvionicsStyles, formatResourceDisplay } from '@/lib/avionics';

interface ResourceGaugeProps {
  label: string;
  type: 'budget' | 'energy' | 'fuel' | 'comms' | 'science';
  value: number;
  initialBudgetM?: number;
  delta?: number;
  icon: LucideIcon;
}

/**
 * Jauge avionique individuelle du HUD Supérieur
 * Change dynamiquement de couleur :
 * - Vert (> 50%)
 * - Orange (20% - 50%)
 * - Rouge (< 20%)
 * Pulse en temps réel lorsque l'utilisateur survole une option ayant un impact sur cette ressource.
 */
export const ResourceGauge: React.FC<ResourceGaugeProps> = ({
  label,
  type,
  value,
  initialBudgetM = 100,
  delta,
  icon: Icon,
}) => {
  const level = getAvionicsColorLevel(value);
  const styles = getAvionicsStyles(level);
  const { displayValue, unit, secondary } = formatResourceDisplay(type, value, initialBudgetM);

  const hasDelta = delta !== undefined && delta !== 0;
  const isPositiveDelta = (delta ?? 0) > 0;

  return (
    <div
      className={`relative flex flex-col justify-between p-3 rounded-lg border transition-all duration-300 bg-[#121A30]/90 backdrop-blur-md ${
        hasDelta
          ? 'ring-2 ring-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.5)] scale-[1.02] border-[#22D3EE]'
          : 'border-[#1E293B] hover:border-slate-700'
      }`}
    >
      {/* En-tête de la jauge */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <div className={`p-1 rounded ${styles.badgeBg}`}>
            <Icon className={`w-3.5 h-3.5 ${styles.text}`} />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-300 font-space">
            {label}
          </span>
        </div>

        {/* Badge d'impact prévisualisé au survol */}
        {hasDelta && (
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono animate-bounce ${
              isPositiveDelta
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            {isPositiveDelta ? `+${delta}` : delta}
          </span>
        )}
      </div>

      {/* Valeur chiffrée principale & unité réelle */}
      <div className="flex items-baseline justify-between gap-1 mb-2">
        <div className="flex items-baseline gap-1">
          <span className={`text-lg font-bold font-mono tracking-tight ${styles.text}`}>
            {displayValue}
          </span>
          <span className="text-[11px] font-medium text-slate-400">{unit}</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">{secondary}</span>
      </div>

      {/* Barre de progression avionique segmentée */}
      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${styles.bg}`}
          style={{ width: `${Math.max(4, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
};
