'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { TopHUD } from '@/components/hud/TopHUD';
import { MissionGrid } from '@/components/missions/MissionGrid';
import { FlightView } from '@/components/flight/FlightView';
import { DebriefView } from '@/components/debrief/DebriefView';

/**
 * Routeur SPA principal 100% Client-Side
 * Alterne de manière réactive et sans rechargement entre les 4 écrans :
 * - Écran 1 : Sélection de Mission
 * - Écran 2 : Contrôle de Vol (avec HUD persistant et 8 tours)
 * - Écran 4 : Rapport de Mission Officiel Goddard
 */
export default function HomePage() {
  const { currentScreen, activeMission } = useGameStore();

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Le HUD supérieur s'affiche dès qu'une mission est engagée */}
      {currentScreen !== 'missions' && activeMission && <TopHUD />}

      <div className="flex-1 flex flex-col justify-center">
        {currentScreen === 'missions' && <MissionGrid />}
        {currentScreen === 'flight' && <FlightView />}
        {currentScreen === 'debrief' && <DebriefView />}
      </div>
    </main>
  );
}
