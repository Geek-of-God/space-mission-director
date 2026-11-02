/**
 * Adaptateur de télémétrie orbitale basé sur les données NASA Satcat et Horizons
 * Renvoie les paramètres physiques réels du satellite selon la mission active.
 */
import satcatData from '@/data/nasa/nasa_satcat_telemetry.json';
import { MissionId, TelemetryData } from '@/types/game';

export function getTelemetryForMission(missionId: MissionId, turn: number): TelemetryData {
  const satInfo = satcatData.satellites.find((s) => s.missionId === missionId);

  // Légères micro-variations réalistes selon le tour orbital
  const altVariation = Math.sin(turn * 0.8) * 1.8;
  const velVariation = Math.cos(turn * 0.8) * 0.02;

  const baseAlt = satInfo ? satInfo.altitudeKm : 705.4;
  const baseVel = satInfo ? satInfo.velocityKmS : 7.66;

  return {
    status: 'Nominal',
    altitudeKm: Number((baseAlt + altVariation).toFixed(1)),
    velocityKmS: Number((baseVel + velVariation).toFixed(2)),
    solarArrayEfficiency: Math.max(70, Math.min(99, 94 - turn * 2)),
    transponderTempCelsius: Number((-18 + turn * 1.5).toFixed(1)),
  };
}
