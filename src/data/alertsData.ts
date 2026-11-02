/**
 * Fichier des alertes critiques du jeu
 * Alimenté par les données réelles de météo spatiale NASA DONKI
 */
import { CriticalAlert } from '@/types/game';

export const DONKI_X12_ALERT: CriticalAlert = {
  id: 'DONKI-CME-X12-AR3664',
  sourceBadge: '📡 SOURCE RÉELLE : NASA DONKI — SPACE WEATHER ALERT (CLASSE X1.2)',
  title: '⚠️ ALERTE SPATIALE CRITIQUE !',
  description:
    "Une éjection coronale solaire majeure frappe votre orbite. Un flux massif de protons menace d'endommager l'avionique et de détruire les liaisons de données.",
  realEventData:
    "Éjection coronale détectée par SOHO/LASCO à 1 380 km/s. Indice géomagnétique Kp=8. Tempête de radiations S3 en cours.",
  directives: [
    {
      id: 'A',
      title: "Directive A : Rediriger l'énergie vers les boucliers magnétiques",
      description: "Alimenter les bobines de déviation pour protéger les circuits intégrés et mesurer le front d'onde plasmique.",
      deltas: {
        energy: -15,
        science: +10,
        comms: 0,
      },
    },
    {
      id: 'B',
      title: "Directive B : Basculer sur l'antenne omnidirectionnelle de secours",
      description: "Rétracter la parabole haute fréquence et dépenser du propergol pour orienter la sonde hors du flux direct.",
      deltas: {
        budget: -5,
        fuel: -5,
        comms: +5,
      },
    },
    {
      id: 'C',
      title: "Directive C : Ignorer l'alerte",
      description: "Tenter de maintenir la configuration nominale. 70% de probabilité d'avarie majeure sur le transpondeur radio.",
      deltas: {
        energy: -5,
        comms: -35,
        science: +5,
      },
      riskProbabilityPercent: 70,
      riskOutcomeDescription: "Surtension destructrice sur le module RF : signal radio gravement dégradé !",
    },
  ],
};
