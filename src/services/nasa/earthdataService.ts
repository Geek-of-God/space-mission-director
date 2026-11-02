/**
 * Service de liaison des données scientifiques d'observation terrestre (PACE & Landsat)
 * Permet d'enrichir les métriques de science et de contextualiser les dilemmes du joueur.
 */
import paceData from '@/data/nasa/pace_earth_observation.json';
import artemisData from '@/data/nasa/artemis_gateway_nrho.json';
import marsData from '@/data/nasa/mars_perseverance_pds.json';
import { MissionId } from '@/types/game';

export function getMissionScientificContext(missionId: MissionId) {
  switch (missionId) {
    case 'earth':
      return {
        instrument: paceData.primaryInstrument,
        spectralBands: paceData.spectralBands,
        sampleObservation: paceData.observations[0],
      };
    case 'moon':
      return {
        instrument: 'Artemis Optical Laser Comms & PPE Hall Thrusters',
        orbitType: artemisData.orbitParameters.orbitType,
        targetZone: artemisData.lunarSouthPoleTargeting.crater,
      };
    case 'mars':
      return {
        instrument: 'Electra UHF Proximity Link & MSR Optical Receiver',
        groundTarget: marsData.perseveranceLocation,
        radioDelay: marsData.environmentalTelemetry.roundTripRadioDelayMinutes,
      };
  }
}
