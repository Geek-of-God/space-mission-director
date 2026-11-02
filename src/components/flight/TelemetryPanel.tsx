'use client';

import React from 'react';
import { Activity, Gauge, Navigation, Compass, Radio, Thermometer, SunMedium } from 'lucide-react';
import { MissionId } from '@/types/game';
import { getTelemetryForMission } from '@/services/nasa/telemetryAdapter';
import { MISSIONS } from '@/data/missions';

interface TelemetryPanelProps {
  missionId: MissionId;
  currentTurn: number;
  maxTurns: number;
}

/**
 * Boîte de télémétrie avionique en temps réel (NASA Flight Dynamics Facility)
 * Affiche : Statut : Nominal, Altitude : 418 km / 705 km, Vitesse : 7.66 km/s, Pilule : TOUR X / 8.
 */
export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({
  missionId,
  currentTurn,
  maxTurns,
}) => {
  const telemetry = getTelemetryForMission(missionId, currentTurn);
  const mission = MISSIONS.find((m) => m.id === missionId);

  return (
    <div className="w-full p-4 rounded-xl border border-[#1E293B] bg-[#121A30]/95 backdrop-blur-md shadow-md">
      {/* En-tête de la boîte de télémétrie */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#10B981] animate-pulse" />
          <span className="font-space text-xs font-bold tracking-wider text-slate-200 uppercase">
            TÉLÉMÉTRIE DE BORD (DSN LIVE FEED)
          </span>
        </div>

        {/* Pilule : TOUR X / 8 */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-mono font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>TOUR {currentTurn} / {maxTurns}</span>
        </div>
      </div>

      {/* Grille des 4 indicateurs critiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Statut Avionique */}
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-500 uppercase">STATUT SYSTÈME</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            <span className="text-sm font-bold font-mono text-[#10B981]">
              {telemetry.status}
            </span>
          </div>
        </div>

        {/* Altitude */}
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase">
            <Navigation className="w-3 h-3 text-[#22D3EE]" />
            <span>ALTITUDE</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-bold font-mono text-white">
              {telemetry.altitudeKm}
            </span>
            <span className="text-xs text-slate-400 font-mono ml-1">km</span>
          </div>
        </div>

        {/* Vitesse orbitale */}
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase">
            <Gauge className="w-3 h-3 text-[#22D3EE]" />
            <span>VITESSE</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-bold font-mono text-white">
              {telemetry.velocityKmS}
            </span>
            <span className="text-xs text-slate-400 font-mono ml-1">km/s</span>
          </div>
        </div>

        {/* Efficacité solaire & Température */}
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase">
            <SunMedium className="w-3 h-3 text-amber-400" />
            <span>RENDEMENT EPS</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-sm font-bold font-mono text-amber-400">
              {telemetry.solarArrayEfficiency}%
            </span>
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
              <Thermometer className="w-2.5 h-2.5 text-cyan-400" />
              {telemetry.transponderTempCelsius}°C
            </span>
          </div>
        </div>
      </div>

      {/* Info d'orbite nominale */}
      {mission && (
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <Radio className="w-3 h-3 text-[#22D3EE]" />
            <span className="text-slate-500">ORBITE :</span>
            <span className="text-slate-300 font-medium truncate">{mission.orbitName}</span>
          </div>
          <span className="text-[10px] text-slate-500 hidden sm:inline">NASA GSFC FLIGHT DYNAMICS</span>
        </div>
      )}
    </div>
  );
};
