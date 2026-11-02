'use client';

import React from 'react';
import { Shield, Radio, AlertTriangle } from 'lucide-react';
import { AlertDirective } from '@/types/game';
import { sounds } from '@/lib/sounds';

interface DirectiveButtonProps {
  directive: AlertDirective;
  onSelect: (id: AlertDirective['id']) => void;
}

export const DirectiveButton: React.FC<DirectiveButtonProps> = ({
  directive,
  onSelect,
}) => {
  const getIcon = () => {
    switch (directive.id) {
      case 'A':
        return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'B':
        return <Radio className="w-5 h-5 text-amber-400" />;
      case 'C':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
    }
  };

  const getBorderColor = () => {
    switch (directive.id) {
      case 'A':
        return 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]';
      case 'B':
        return 'hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'C':
        return 'hover:border-rose-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]';
    }
  };

  return (
    <button
      onClick={() => {
        sounds.playClick();
        onSelect(directive.id);
      }}
      className={`w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-900/80 transition-all duration-200 ${getBorderColor()} group`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-slate-800/80 shrink-0 mt-0.5">
          {getIcon()}
        </div>

        <div className="flex-1">
          <h4 className="font-space text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
            {directive.title}
          </h4>
          <p className="text-xs text-slate-300 mb-2 leading-relaxed">
            {directive.description}
          </p>

          {/* Badges des impacts de la directive */}
          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
            {directive.deltas.energy && (
              <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                {directive.deltas.energy} Énergie
              </span>
            )}
            {directive.deltas.science && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                +{directive.deltas.science} Science
              </span>
            )}
            {directive.deltas.budget && (
              <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                ${directive.deltas.budget}M Budget
              </span>
            )}
            {directive.deltas.fuel && (
              <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                {directive.deltas.fuel} kg Ergol
              </span>
            )}
            {directive.riskProbabilityPercent && (
              <span className="px-2 py-0.5 rounded bg-red-950/80 text-rose-400 border border-rose-600 font-bold animate-pulse">
                Risque avarie : {directive.riskProbabilityPercent}%
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
