'use client';

import React from 'react';
import { Atom, DollarSign, ShieldCheck } from 'lucide-react';
import { ScoreBreakdownResult } from '@/lib/scoring';

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownResult;
}

/**
 * Décomposition Mathématique du Score en 3 Lignes
 * Respecte strictement les 3 axes d'évaluation NASA :
 * 1. Objectifs Scientifiques Collectés : +X / 50 pts
 * 2. Gestion Budgétaire & Efficience : +Y / 30 pts
 * 3. Intégrité & Survie du Satellite : +Z / 20 pts
 */
export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ breakdown }) => {
  return (
    <div className="w-full space-y-3 p-5 rounded-xl bg-slate-900/80 border border-[#1E293B]">
      <h3 className="font-space text-xs font-bold tracking-widest text-[#22D3EE] uppercase mb-3">
        DÉCOMPOSITION MATHÉMATIQUE DU SCORE (FORMULE OFFICIELLE GODDARD)
      </h3>

      {/* Ligne 1 : Objectifs Scientifiques Collectés (+X / 50 pts) */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#121A30] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-[#22D3EE]">
            <Atom className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">
              Objectifs Scientifiques Collectés
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Formule : Science × 0.50
            </span>
          </div>
        </div>
        <span className="font-mono text-base font-bold text-cyan-300">
          +{breakdown.sciencePart} / 50 pts
        </span>
      </div>

      {/* Ligne 2 : Gestion Budgétaire & Efficience (+Y / 30 pts) */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#121A30] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">
              Gestion Budgétaire & Efficience
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Formule : Budget Résiduel × 0.30
            </span>
          </div>
        </div>
        <span className="font-mono text-base font-bold text-emerald-400">
          +{breakdown.budgetPart} / 30 pts
        </span>
      </div>

      {/* Ligne 3 : Intégrité & Survie du Satellite (+Z / 20 pts) */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#121A30] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">
              Intégrité & Survie du Satellite
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Formule : Réserve Ergol × 0.20
            </span>
          </div>
        </div>
        <span className="font-mono text-base font-bold text-amber-400">
          +{breakdown.fuelPart} / 20 pts
        </span>
      </div>
    </div>
  );
};
