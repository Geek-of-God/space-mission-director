'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { TopHUD } from '@/components/hud/TopHUD';
import { DebriefView } from '@/components/debrief/DebriefView';
import { MissionGrid } from '@/components/missions/MissionGrid';

export default function DebriefPage() {
  const { activeMission, selectMission, goToScreen } = useGameStore();

  useEffect(() => {
    if (!activeMission) {
      selectMission('earth');
    }
    goToScreen('debrief');
  }, [activeMission, selectMission, goToScreen]);

  if (!activeMission) {
    return <MissionGrid />;
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <TopHUD />
      <DebriefView />
    </main>
  );
}
