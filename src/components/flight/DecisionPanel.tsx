'use client';

import React from 'react';
import { HelpCircle, ChevronRight, Check } from 'lucide-react';
import { TurnDecision, DecisionOption } from '@/types/game';
import { useGameStore } from '@/store/useGameStore';
import { OptionCard } from './OptionCard';
import { Button } from '@/components/ui/Button';

interface DecisionPanelProps {
  decision: TurnDecision;
}

/**
 * Panneau de Décision du Tour (Partie Droite 40% du Layout Split)
 * - En-tête : DÉCISION DU TOUR
 * - Bloc narratif de situation réelle
 * - 3 Cartes d'options interactives
 * - Bouton : Valider le choix (Option X) actif uniquement si une option est cochée
 */
export const DecisionPanel: React.FC<DecisionPanelProps> = ({ decision }) => {
  const { selectedOptionId, setSelectedOptionId, applyTurnDecision } = useGameStore();

  const selectedOption = decision.options.find((opt) => opt.id === selectedOptionId);
  const selectedIndex = decision.options.findIndex((opt) => opt.id === selectedOptionId);
  const optionLetter =
    selectedIndex !== -1
      ? ['Option A', 'Option B', 'Option C'][selectedIndex]
      : null;

  const handleValidate = () => {
    if (!selectedOption) return;
    applyTurnDecision(selectedOption);
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 rounded-xl border border-[#1E293B] bg-[#121A30]/90 backdrop-blur-md shadow-lg">
      <div>
        {/* En-tête de décision */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
            <h2 className="font-space text-sm font-bold tracking-widest text-[#22D3EE] uppercase">
              DÉCISION DU TOUR • PHASE {decision.turnNumber}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">ARBITRAGE DE VOL</span>
        </div>

        {/* Titre du dilemme */}
        <h3 className="font-space text-lg font-bold text-white mb-2 leading-tight">
          {decision.title}
        </h3>

        {/* Bloc Narratif de Situation (2-3 lignes) */}
        <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800/90 mb-5">
          <p className="text-sm text-slate-300 leading-relaxed font-sans mb-2">
            {decision.narrative}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#22D3EE]/80">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="italic truncate">{decision.scientificContext}</span>
          </div>
        </div>

        {/* 3 Cartes d'Options Interactives */}
        <div className="space-y-3 mb-6">
          {decision.options.map((opt, index) => (
            <OptionCard
              key={opt.id}
              option={opt}
              optionIndex={index}
              isSelected={selectedOptionId === opt.id}
              onSelect={(id) => setSelectedOptionId(id)}
            />
          ))}
        </div>
      </div>

      {/* Bouton de validation de la directive de vol */}
      <div className="pt-4 border-t border-slate-800">
        <Button
          size="lg"
          fullWidth
          disabled={!selectedOptionId}
          onClick={handleValidate}
          className="shadow-[0_0_20px_rgba(34,211,238,0.35)]"
        >
          {optionLetter ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Valider le choix ({optionLetter})
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Sélectionnez une option pour valider
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
