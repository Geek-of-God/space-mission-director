/**
 * Adaptateur NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)
 * Transforme les données d'éjection coronale réelles en alerte critique jouable.
 */
import donkiData from '@/data/nasa/donki_space_weather.json';
import { CriticalAlert } from '@/types/game';

export function getDonkiEmergencyAlert(): CriticalAlert {
  const primaryEvent = donkiData.events[0];
  const flareClass = primaryEvent.associatedFlare.flareClass;
  const speed = primaryEvent.cmeSpeedKmS;

  return {
    id: primaryEvent.activityID,
    sourceBadge: `📡 SOURCE RÉELLE : NASA DONKI — SPACE WEATHER ALERT (CLASSE ${flareClass})`,
    title: "⚠️ ALERTE SPATIALE CRITIQUE !",
    description: `Une éjection coronale solaire majeure frappe votre orbite à ${speed} km/s. Un flux massif de protons menace d'endommager l'avionique et de détruire les liaisons de données.`,
    realEventData: `Vitesse d'éjection : ${speed} km/s | Flux de protons : ${primaryEvent.protonFluxLevel} | Source : ${primaryEvent.sourceLocation}`,
    directives: [
      {
        id: 'A',
        title: "Directive A : Rediriger l'énergie vers les boucliers magnétiques",
        description: "Alimenter les bobines de déviation pour protéger les circuits intégrés de l'avionique.",
        deltas: {
          energy: -15,
          science: +10,
        },
      },
      {
        id: 'B',
        title: "Directive B : Basculer sur l'antenne omnidirectionnelle de secours",
        description: "Rétracter la parabole principale à haut gain et sécuriser les paquets télémétriques.",
        deltas: {
          budget: -5,
          fuel: -5,
          comms: +5,
        },
      },
      {
        id: 'C',
        title: "Directive C : Ignorer l'alerte et maintenir la collecte",
        description: "Tenter de conserver l'orbite sans dépense. Risque calculé de coupure définitive.",
        deltas: {
          energy: -5,
          comms: -25,
        },
        riskProbabilityPercent: 70,
        riskOutcomeDescription: "Surtension induite par les protons solaires : perte sévère du signal radio et dégradation du transpondeur.",
      },
    ],
  };
}
