'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, AlertTriangle, CheckCircle, Award, Compass, ShieldCheck } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { calculateMissionScore } from '@/lib/scoring';
import { MISSIONS } from '@/data/missions';
import { CircularScore } from './CircularScore';
import { ScoreBreakdown } from './ScoreBreakdown';
import { NasaFactCard } from './NasaFactCard';
import { PdfExportButton } from './PdfExportButton';
import { Button } from '@/components/ui/Button';

export const DebriefView: React.FC = () => {
  const {
    activeMission,
    science,
    budget,
    fuel,
    isGameOver,
    gameOverReason,
    resetGame,
  } = useGameStore();

  const mission = MISSIONS.find((m) => m.id === activeMission) || MISSIONS[0];
  const breakdown = calculateMissionScore(science, budget, fuel, isGameOver);

  useEffect(() => {
    if (!isGameOver && breakdown.finalScore >= 50) {
      // Lance un tir de confettis festif pour célébrer la mission
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22D3EE', '#10B981', '#F59E0B', '#38BDF8'],
        });
      } catch {}
    }
  }, [breakdown.finalScore, isGameOver]);

  const getRankBadgeColor = () => {
    if (breakdown.rankColor === 'green') return 'text-[#10B981] border-[#10B981]/40 bg-[#10B981]/15';
    if (breakdown.rankColor === 'orange') return 'text-[#F59E0B] border-[#F59E0B]/40 bg-[#F59E0B]/15';
    return 'text-[#EF4444] border-[#EF4444]/40 bg-[#EF4444]/15';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn printable-report">
      {/* En-tête officiel du Goddard Space Flight Center */}
      <div className="text-center mb-8 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-[#22D3EE]/30 text-[#22D3EE] text-xs font-mono font-bold mb-3 uppercase tracking-widest">
          <Award className="w-4 h-4" />
          NASA Goddard Space Flight Center — Évaluation du Vol
        </div>
        <h1 className="font-space text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          RAPPORT DE MISSION OFFICIEL
        </h1>
        <p className="text-slate-400 font-mono text-xs sm:text-sm">
          CAMPAGNE ORBITALE : {mission.name} ({mission.subtitle}) • ACCRÉDITATION DE VOL N° 2026-GSFC-SMD
        </p>
      </div>

      {/* Motif d'échec si Game Over */}
      {isGameOver && gameOverReason && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-start gap-3 text-rose-300">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-space font-bold text-sm text-white mb-1 uppercase">
              ANOMALIE CRITIQUE DÉTECTÉE EN COURS DE MISSION
            </h4>
            <p className="text-xs leading-relaxed font-sans">{gameOverReason}</p>
          </div>
        </div>
      )}

      {/* Titre de Rang Honorifique */}
      <div className={`p-4 rounded-xl border text-center mb-8 ${getRankBadgeColor()}`}>
        <span className="text-2xl mr-2">{breakdown.rankBadge}</span>
        <span className="font-space text-lg sm:text-xl font-black tracking-wide uppercase">
          {breakdown.rankTitle}
        </span>
      </div>

      {/* Score Circulaire & Décomposition Mathématique */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#121A30] border border-[#1E293B]">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
            SCORE GLOBAL OFFICIEL
          </span>
          <CircularScore score={breakdown.finalScore} isGameOver={isGameOver} />
          <span className="text-[11px] font-mono text-slate-500 mt-2 text-center">
            Barème d'ingénierie NASA (Base 100)
          </span>
        </div>

        <div className="md:col-span-2">
          <ScoreBreakdown breakdown={breakdown} />
        </div>
      </div>

      {/* Encart Pédagogique (NASA Fact) */}
      <div className="mb-8">
        <NasaFactCard missionId={mission.id} />
      </div>

      {/* Boutons d'action : Rejouer + Exporter PDF */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800 no-print">
        <Button size="lg" onClick={resetGame} className="min-w-[220px]">
          <RotateCcw className="w-4 h-4 mr-2" />
          Rejouer une Mission
        </Button>
        <PdfExportButton />
      </div>
    </div>
  );
};
