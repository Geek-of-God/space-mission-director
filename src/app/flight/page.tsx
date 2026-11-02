'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { TopHUD } from '@/components/hud/TopHUD';
import { FlightView } from '@/components/flight/FlightView';
import { MissionGrid } from '@/components/missions/MissionGrid';

export default function FlightPage() {
  const { activeMission, selectMission, goToScreen } = useGameStore();

  useEffect(() => {
    if (!activeMission) {
      selectMission('earth'); // Mission par défaut si accès direct à /flight
    }
    goToScreen('flight');
  }, [activeMission, selectMission, goToScreen]);

  if (!activeMission) {
    return <MissionGrid />;
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <TopHUD />
      <FlightView />
    </main>
  );
}
