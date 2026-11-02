'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { MissionGrid } from '@/components/missions/MissionGrid';

export default function MissionsPage() {
  const { goToScreen } = useGameStore();

  useEffect(() => {
    goToScreen('missions');
  }, [goToScreen]);

  return (
    <main className="flex-1 flex flex-col justify-center">
      <MissionGrid />
    </main>
  );
}
