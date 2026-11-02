'use client';

import React from 'react';
import { DollarSign, Zap, Fuel, Radio, Atom, Compass, RotateCcw } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { MISSIONS } from '@/data/missions';
import { ResourceGauge } from './ResourceGauge';
import { AudioControl } from './AudioControl';

/**
 * HUD Supérieur Persistant
 * Présente les 5 jauges critiques avec valeur chiffrée, unité réelle, et changement
 * dynamique de couleur (vert, orange, rouge).
 * Relié au state Zustand pour pulser lors du survol des cartes d'options.
 */
export const TopHUD: React.FC = () => {
  const {
    budget,
    energy,
    fuel,
    comms,
    science,
    hoveredOptionDeltas,
    activeMission,
    currentTurn,
    maxTurns,
    resetGame,
  } = useGameStore();

  const mission = MISSIONS.find((m) => m.id === activeMission);
  const initialBudgetM = mission ? mission.initialBudgetM : 100;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E293B] bg-[#0B1020]/95 backdrop-blur-md px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Ligne supérieure : Titre d'avionique & Informations de mission */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22D3EE]"></span>
              </span>
              <span className="font-space text-sm font-bold tracking-widest text-[#22D3EE] uppercase">
                NASA GSFC • MISSION CONTROL
              </span>
            </div>

            {mission && (
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800 text-xs text-slate-300">
                <span className="text-slate-500">PROGRAMME :</span>
                <span className="font-semibold text-white">{mission.subtitle}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 border border-[#22D3EE]/30 text-[#22D3EE]">
                  {mission.badgeCode}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Pilule du tour */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold">
              <Compass className="w-3.5 h-3.5 text-[#22D3EE] animate-spin-slow" />
              <span>TOUR {currentTurn} / {maxTurns}</span>
            </div>

            <AudioControl />

            <button
              onClick={resetGame}
              title="Réinitialiser la simulation"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#1E293B] bg-[#121A30] hover:bg-slate-800 text-xs text-slate-400 hover:text-white transition-all font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Abandonner</span>
            </button>
          </div>
        </div>

        {/* Grille des 5 Jauges Critiques du HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <ResourceGauge
            label="Budget"
            type="budget"
            value={budget}
            initialBudgetM={initialBudgetM}
            delta={hoveredOptionDeltas?.budget}
            icon={DollarSign}
          />
          <ResourceGauge
            label="Énergie"
            type="energy"
            value={energy}
            delta={hoveredOptionDeltas?.energy}
            icon={Zap}
          />
          <ResourceGauge
            label="Ergol"
            type="fuel"
            value={fuel}
            delta={hoveredOptionDeltas?.fuel}
            icon={Fuel}
          />
          <ResourceGauge
            label="Comms DSN"
            type="comms"
            value={comms}
            delta={hoveredOptionDeltas?.comms}
            icon={Radio}
          />
          <ResourceGauge
            label="Science"
            type="science"
            value={science}
            delta={hoveredOptionDeltas?.science}
            icon={Atom}
          />
        </div>
      </div>
    </header>
  );
};
