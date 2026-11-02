/**
 * Définitions TypeScript strictes du jeu Space Mission Director
 * NASA Space Apps Challenge 2026
 */

export type MissionId = 'earth' | 'moon' | 'mars';

export type MissionDifficulty = 'Débutant' | 'Intermédiaire' | 'Expert';

/**
 * Informations statiques et paramètres d'une mission spatiale
 */
export interface Mission {
  id: MissionId;
  name: string;
  subtitle: string;
  difficulty: MissionDifficulty;
  difficultyColor: 'green' | 'orange' | 'red';
  initialBudgetM: number;
  orbitName: string;
  altitudeKm: number;
  velocityKmS: number;
  targetPlanet: 'Earth' | 'Moon' | 'Mars';
  description: string;
  badgeCode: string;
  primaryInstrument: string;
}

/**
 * Impacts appliqués aux ressources lors d'une décision
 */
export interface ResourceDelta {
  budget?: number;   // en M$ (ex: -5 ou +0)
  energy?: number;   // en % (ex: -10)
  fuel?: number;     // en kg d'ergol (ex: -15)
  comms?: number;    // en % de liaison radio (ex: -5 ou +10)
  science?: number;  // en points de données collectées (ex: +20)
}

/**
 * Option de manœuvre disponible lors d'un tour
 */
export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  technicalDetails: string;
  deltas: ResourceDelta;
}

/**
 * Dilemme scientifique et technique propre à un tour (1 à 8)
 */
export interface TurnDecision {
  turnNumber: number;
  title: string;
  narrative: string;
  scientificContext: string;
  options: [DecisionOption, DecisionOption, DecisionOption];
}

/**
 * Directive d'urgence pour résoudre une alerte spatiale critique
 */
export interface AlertDirective {
  id: 'A' | 'B' | 'C';
  title: string;
  description: string;
  deltas: ResourceDelta;
  riskProbabilityPercent?: number; // Ex: 70% de risque d'échec pour la directive C
  riskOutcomeDescription?: string;
}

/**
 * Alerte critique inspirée des données réelles de la NASA
 */
export interface CriticalAlert {
  id: string;
  sourceBadge: string; // Ex: "📡 SOURCE RÉELLE : NASA DONKI — SPACE WEATHER ALERT (CLASSE X1.2)"
  title: string;
  description: string;
  realEventData: string;
  directives: [AlertDirective, AlertDirective, AlertDirective];
}

/**
 * État complet des ressources avioniques du HUD
 */
export interface AvionicsHUD {
  budget: number;   // en M$ (base 100M$)
  energy: number;   // en % (0 à 100)
  fuel: number;     // en kg (0 à 1000 kg normalisé sur 100)
  comms: number;    // en % (0 à 100)
  science: number;  // points collectés (0 à 100)
}

/**
 * Télémétrie de bord affichée en direct
 */
export interface TelemetryData {
  status: 'Nominal' | 'Attention' | 'Critique';
  altitudeKm: number;
  velocityKmS: number;
  solarArrayEfficiency: number; // en %
  transponderTempCelsius: number;
}

/**
 * Rapport d'évaluation final du Goddard Space Flight Center
 */
export interface MissionDebrief {
  finalScore: number;
  rankTitle: string;
  rankBadge: string;
  scienceContribution: number;
  budgetEfficiency: number;
  satelliteSurvival: number;
  historicalFact: {
    title: string;
    mission: string;
    text: string;
    nasaSource: string;
  };
}
