'use client';

import React, { useState } from 'react';
import { Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { MISSIONS } from '@/data/missions';
import { MissionId } from '@/types/game';
import { useGameStore } from '@/store/useGameStore';
import { MissionCard } from './MissionCard';
import { Button } from '@/components/ui/Button';

export const MissionGrid: React.FC = () => {
  const [selectedId, setSelectedId] = useState<MissionId>('earth');
  const { selectMission } = useGameStore();

  const handleLaunch = () => {
    selectMission(selectedId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center">
      {/* En-tête de l'Écran 1 */}
      <div className="text-center mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-[#22D3EE]/30 text-[#22D3EE] text-xs font-mono font-bold mb-4 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          NASA Space Apps Challenge 2026 • Simulation de Vol
        </div>
        <h1 className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          SÉLECTIONNEZ VOTRE MISSION SPATIALE
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Incarnez le Directeur de Mission au Goddard Space Flight Center. Choisissez votre affectation orbitale,
          arbitrez les ressources critiques de votre satellite et surmontez les aléas spatiaux en 8 tours décisifs.
        </p>
      </div>

      {/* Grille des 3 Cartes immersives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
        {MISSIONS.map((m) => (
          <MissionCard
            key={m.id}
            mission={m}
            isSelected={selectedId === m.id}
            onSelect={(id) => setSelectedId(id)}
          />
        ))}
      </div>

      {/* Bouton CTA d'engagement de vol */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          size="lg"
          onClick={handleLaunch}
          className="min-w-[280px] shadow-[0_0_30px_rgba(34,211,238,0.5)]"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Lancer la Mission ({MISSIONS.find((m) => m.id === selectedId)?.name})
        </Button>
      </div>

      {/* Note de bas de page de télémétrie */}
      <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Données orbitales calibrées selon les catalogues NASA Horizons et DONKI.</span>
      </div>
    </div>
  );
};
