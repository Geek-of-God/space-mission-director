'use client';

import React from 'react';
import { BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { NASA_FACTS, NasaFact } from '@/data/nasaFacts';
import { MissionId } from '@/types/game';

interface NasaFactCardProps {
  missionId: MissionId;
}

/**
 * Encart Pédagogique (NASA Fact)
 * Vulgarise une anecdote scientifique réelle liée à la mission jouée.
 */
export const NasaFactCard: React.FC<NasaFactCardProps> = ({ missionId }) => {
  const fact: NasaFact = NASA_FACTS[missionId] || NASA_FACTS.earth;

  return (
    <div className="w-full p-5 rounded-xl bg-gradient-to-br from-[#121A30] to-slate-900 border border-[#22D3EE]/30 shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#22D3EE]" />
          <span className="font-space text-xs font-bold tracking-wider text-[#22D3EE] uppercase">
            LE POINT SCIENCE DE LA NASA (NASA FACT)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span>Vulgarisation Officielle</span>
        </div>
      </div>

      <h4 className="font-space text-base font-bold text-white mb-1">
        {fact.title}
      </h4>
      <p className="text-xs font-mono text-[#22D3EE]/80 mb-3">{fact.project}</p>

      <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
        {fact.fact}
      </p>

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Source : {fact.source}</span>
        <span className="flex items-center gap-1 text-[#22D3EE] hover:underline cursor-pointer">
          NASA Open Data Portal <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
