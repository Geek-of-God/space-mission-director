/**
 * Fichier de configuration des 3 missions spatiales jouables
 * Conforme aux spécifications du NASA Space Apps Challenge 2026
 */
import { Mission } from '@/types/game';

export const MISSIONS: Mission[] = [
  {
    id: 'earth',
    name: 'MISSION TERRE',
    subtitle: 'NASA PACE & Landsat 9',
    difficulty: 'Débutant',
    difficultyColor: 'green',
    initialBudgetM: 120,
    orbitName: 'LEO Héliosynchrone 705 km',
    altitudeKm: 705.4,
    velocityKmS: 7.66,
    targetPlanet: 'Earth',
    badgeCode: 'NASA-PACE-LEO',
    primaryInstrument: 'Ocean Color Instrument (OCI) & TIRS-2',
    description:
      "Supervisez la surveillance climatique et des aérosols océaniques. Gérez l'orbite polaire et évitez la saturation mémoire lors du survol des pôles.",
  },
  {
    id: 'moon',
    name: 'MISSION LUNE',
    subtitle: 'Artemis Gateway & PPE Relay',
    difficulty: 'Intermédiaire',
    difficultyColor: 'orange',
    initialBudgetM: 280,
    orbitName: 'NRHO Polaire (Halo 9:2)',
    altitudeKm: 3120.0,
    velocityKmS: 1.42,
    targetPlanet: 'Moon',
    badgeCode: 'ARTEMIS-GATEWAY-L2',
    primaryInstrument: 'Deep Space Optical Comms & HERMES',
    description:
      "Déployez la station relais pour le pôle Sud lunaire (cratère Shackleton). Maintenez la chaîne de puissance lors des longues éclipses et préservez l'avionique contre le régolithe.",
  },
  {
    id: 'mars',
    name: 'MISSION MARS',
    subtitle: 'Mars Sample Return (MSR)',
    difficulty: 'Expert',
    difficultyColor: 'red',
    initialBudgetM: 500,
    orbitName: 'Aréocentrique Polaire 418 km',
    altitudeKm: 418.5,
    velocityKmS: 4.12,
    targetPlanet: 'Mars',
    badgeCode: 'MSR-CAPTURE-ORBITER',
    primaryInstrument: 'Electra UHF Transponder & Autonomous Beacon',
    description:
      "Coordonnez le satellite de télécommunication pour la récupération des tubes d'échantillons de Perseverance. Faites face au délai radio de 14 minutes et aux tempêtes de poussière.",
  },
];
