'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const AudioControl: React.FC = () => {
  const { soundEnabled, toggleSound } = useGameStore();

  return (
    <button
      onClick={toggleSound}
      title={soundEnabled ? 'Désactiver les effets avioniques' : 'Activer les effets avioniques'}
      className="flex items-center justify-center p-2 rounded-lg border border-[#1E293B] bg-[#121A30]/80 hover:bg-[#121A30] hover:border-[#22D3EE]/50 text-slate-300 hover:text-[#22D3EE] transition-all"
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 text-[#22D3EE]" />
      ) : (
        <VolumeX className="w-4 h-4 text-slate-500" />
      )}
    </button>
  );
};
