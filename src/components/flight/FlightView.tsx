'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { TURNS_DATA } from '@/data/turnsData';
import { PlanetVisualizer } from './PlanetVisualizer';
import { TelemetryPanel } from './TelemetryPanel';
import { DecisionPanel } from './DecisionPanel';
import { EmergencyModal } from '@/components/alerts/EmergencyModal';

/**
 * Écran 2 : Mission Control & Tour par Tour (/flight)
 * Layout Split 60% / 40%
 * - Gauche (60%) : Vue Satellite & Télémétrie
 * - Droite (40%) : Panneau de Décision du Tour
 * - Déclenche la Modale d'Urgence DONKI si une alerte critique survient
 */
export const FlightView: React.FC = () => {
  const { activeMission, currentTurn, maxTurns } = useGameStore();

  const currentMission = activeMission || 'earth';
  const missionTurns = TURNS_DATA[currentMission] || TURNS_DATA.earth;
  const currentDecision =
    missionTurns.find((t) => t.turnNumber === currentTurn) || missionTurns[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full animate-fadeIn">
      {/* Modale d'Urgence Alerte Spatiale DONKI (Écran 3) */}
      <EmergencyModal />

      {/* Layout Split 60% / 40% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Partie Gauche (60% -> col-span-7 sur 12) : Vue Satellite & Télémétrie */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Sphère Planétaire animée */}
          <PlanetVisualizer
            missionId={currentMission}
            turnNumber={currentTurn}
          />

          {/* Boîte de télémétrie avionique en direct */}
          <TelemetryPanel
            missionId={currentMission}
            currentTurn={currentTurn}
            maxTurns={maxTurns}
          />
        </div>

        {/* Partie Droite (40% -> col-span-5 sur 12) : Panneau de Décision */}
        <div className="lg:col-span-5">
          <DecisionPanel decision={currentDecision} />
        </div>
      </div>
    </div>
  );
};
