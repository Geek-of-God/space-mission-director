'use client';

import React from 'react';
import { Globe2, Moon, Rocket, Gauge, DollarSign, Orbit, CheckCircle2 } from 'lucide-react';
import { Mission } from '@/types/game';
import { Badge } from '@/components/ui/Badge';

interface MissionCardProps {
  mission: Mission;
  isSelected: boolean;
  onSelect: (id: Mission['id']) => void;
}

/**
 * Carte de mission spatiale immersive
 * - Badge de difficulté conforme à la charte
 * - Détails orbitaux et budgétaires réels
 * - Sélection avec bordure cyan lumineuse #22D3EE
 */
export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  isSelected,
  onSelect,
}) => {
  const getMissionIcon = () => {
    switch (mission.id) {
      case 'earth':
        return <Globe2 className="w-8 h-8 text-emerald-400" />;
      case 'moon':
        return <Moon className="w-8 h-8 text-amber-400" />;
      case 'mars':
        return <Rocket className="w-8 h-8 text-rose-500" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(mission.id)}
      className={`group relative flex flex-col justify-between p-6 rounded-xl cursor-pointer transition-all duration-300 bg-[#121A30] border ${
        isSelected
          ? 'border-[#22D3EE] shadow-[0_0_25px_rgba(34,211,238,0.5)] ring-1 ring-[#22D3EE] translate-y-[-4px]'
          : 'border-[#1E293B] hover:border-slate-600 hover:translate-y-[-2px]'
      }`}
    >
      {/* Halo lumineux d'arrière-plan si sélectionné */}
      {isSelected && (
        <div className="absolute inset-0 bg-cyan-500/5 rounded-xl pointer-events-none" />
      )}

      {/* En-tête : Badge de difficulté et Icône planète */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant={
              mission.difficultyColor === 'green'
                ? 'green'
                : mission.difficultyColor === 'orange'
                ? 'orange'
                : 'red'
            }
          >
            <Gauge className="w-3 h-3" />
            {mission.difficulty}
          </Badge>

          <div className="flex items-center gap-2">
            {isSelected && (
              <span className="flex items-center gap-1 text-xs font-mono text-[#22D3EE]">
                <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
                Sélectionnée
              </span>
            )}
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              {getMissionIcon()}
            </div>
          </div>
        </div>

        {/* Titres */}
        <h3 className="font-space text-xl font-bold text-white tracking-wide mb-1 group-hover:text-[#22D3EE] transition-colors">
          {mission.name}
        </h3>
        <p className="text-xs font-mono text-[#22D3EE] mb-4">{mission.subtitle}</p>

        {/* Spécifications Avioniques : Budget & Orbite */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 mb-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Budget : ${mission.initialBudgetM}M</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Orbit className="w-4 h-4 text-[#22D3EE]" />
            <span className="truncate">{mission.orbitName}</span>
          </div>
        </div>

        {/* Description narrative officielle */}
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          "{mission.description}"
        </p>
      </div>

      {/* Pied de carte avec instrument principal */}
      <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="text-slate-500">INSTRUMENT CLÉ :</span>
        <span className="text-slate-300 font-semibold truncate max-w-[200px]">
          {mission.primaryInstrument}
        </span>
      </div>
    </div>
  );
};
