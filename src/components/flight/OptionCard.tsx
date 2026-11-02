'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { DecisionOption } from '@/types/game';
import { useGameStore } from '@/store/useGameStore';

interface OptionCardProps {
  option: DecisionOption;
  optionIndex: number; // 0, 1, 2 (Option A, B, C)
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

/**
 * Carte d'Option Interactive
 * - Radio checkmark visible
 * - Intitulé clair de la manœuvre
 * - Badges d'impacts explicites : [-10 Énergie], [-15 kg Ergol], [+15 Science]
 * - Effet survol : synchronisation avec le HUD pour faire pulser les jauges correspondantes
 */
export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  optionIndex,
  isSelected,
  onSelect,
}) => {
  const { setHoveredOptionDeltas } = useGameStore();

  const optionLetters = ['Option A', 'Option B', 'Option C'];
  const optionLetter = optionLetters[optionIndex] || `Option ${optionIndex + 1}`;

  const renderBadge = (key: string, value: number | undefined, label: string) => {
    if (value === undefined || value === 0) return null;
    const isPositive = value > 0;

    return (
      <span
        key={key}
        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-tight border ${
          isPositive
            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
        }`}
      >
        {isPositive ? `+${value}` : value} {label}
      </span>
    );
  };

  return (
    <div
      onClick={() => onSelect(option.id)}
      onMouseEnter={() => setHoveredOptionDeltas(option.deltas)}
      onMouseLeave={() => setHoveredOptionDeltas(null)}
      className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 bg-[#121A30] border ${
        isSelected
          ? 'border-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.45)] ring-1 ring-[#22D3EE] translate-y-[-2px]'
          : 'border-[#1E293B] hover:border-[#22D3EE]/50 hover:bg-[#121A30]/90'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Radio Checkmark visible */}
        <div className="mt-0.5 shrink-0">
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 text-[#22D3EE]" />
          ) : (
            <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
          )}
        </div>

        {/* Contenu textuel & Badges */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase text-[#22D3EE]">
              {optionLetter}
            </span>
          </div>

          <h4 className="text-sm font-space font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-1">
            {option.title}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
            {option.description}
          </p>

          {/* Badges d'impacts explicites */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {renderBadge('budget', option.deltas.budget, 'M$ Budget')}
            {renderBadge('energy', option.deltas.energy, '% Énergie')}
            {renderBadge('fuel', option.deltas.fuel, 'kg Ergol')}
            {renderBadge('comms', option.deltas.comms, '% Comms')}
            {renderBadge('science', option.deltas.science, 'Science')}
          </div>
        </div>
      </div>
    </div>
  );
};
