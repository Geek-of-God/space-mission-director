/**
 * Store global Zustand pour Space Mission Director
 * Gère l'intégralité du cycle de jeu en 100% Client-Side.
 * 
 * Règles strictes :
 * - 5 ressources HUD sur 100
 * - Cycle de 8 tours
 * - Déclenchement de l'alerte DONKI probabiliste (Tour 4 ou Tour 6)
 * - Défaite si energy <= 0 ou fuel <= 0
 * - Calcul du score officiel : (science * 0.5) + (budget * 0.3) + (fuel * 0.2)
 * - Synchronisation hover pour faire pulser les jauges du HUD
 */

import { create } from 'zustand';
import { MissionId, ResourceDelta, CriticalAlert, DecisionOption } from '@/types/game';
import { MISSIONS } from '@/data/missions';
import { DONKI_X12_ALERT } from '@/data/alertsData';
import { calculateMissionScore } from '@/lib/scoring';
import { sounds } from '@/lib/sounds';

interface GameState {
  // Navigation SPA & Mission
  currentScreen: 'missions' | 'flight' | 'debrief';
  activeMission: MissionId | null;

  // 5 Ressources du HUD (sur 100)
  budget: number;  // départ : 100 (normalisé)
  energy: number;  // départ : 80%
  fuel: number;    // départ : 80 (800 kg)
  comms: number;   // départ : 90%
  science: number; // départ : 0 pts

  // Cycle de jeu
  currentTurn: number; // 1 à 8
  maxTurns: number;    // 8
  selectedOptionId: string | null;
  hoveredOptionDeltas: ResourceDelta | null;

  // Alertes critiques & fins de jeu
  currentAlert: CriticalAlert | null;
  alertTriggeredTurns: number[]; // pour éviter de redéclencher au même tour
  isGameOver: boolean;
  gameOverReason: string | null;
  isMissionSuccess: boolean;
  score: number;

  // Audio & Télémétrie
  soundEnabled: boolean;

  // Actions
  selectMission: (missionId: MissionId) => void;
  setHoveredOptionDeltas: (deltas: ResourceDelta | null) => void;
  setSelectedOptionId: (optionId: string | null) => void;
  applyTurnDecision: (option: DecisionOption) => void;
  resolveAlertDirective: (directiveId: 'A' | 'B' | 'C') => void;
  toggleSound: () => void;
  resetGame: () => void;
  goToScreen: (screen: 'missions' | 'flight' | 'debrief') => void;
}

const INITIAL_RESOURCES = {
  budget: 100, // 100% du budget de la mission sélectionnée
  energy: 80,  // Puissance nominale de départ (80%)
  fuel: 80,    // 800 kg d'ergol de départ
  comms: 90,   // Signal télécom DSN de départ
  science: 0,  // 0 point collecté au lancement
};

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'missions',
  activeMission: null,

  ...INITIAL_RESOURCES,

  currentTurn: 1,
  maxTurns: 8,
  selectedOptionId: null,
  hoveredOptionDeltas: null,

  currentAlert: null,
  alertTriggeredTurns: [],
  isGameOver: false,
  gameOverReason: null,
  isMissionSuccess: false,
  score: 0,

  soundEnabled: true,

  selectMission: (missionId: MissionId) => {
    sounds.playClick(660);
    set({
      activeMission: missionId,
      ...INITIAL_RESOURCES,
      currentTurn: 1,
      selectedOptionId: null,
      hoveredOptionDeltas: null,
      currentAlert: null,
      alertTriggeredTurns: [],
      isGameOver: false,
      gameOverReason: null,
      isMissionSuccess: false,
      score: 0,
      currentScreen: 'flight',
    });
  },

  setHoveredOptionDeltas: (deltas: ResourceDelta | null) => {
    set({ hoveredOptionDeltas: deltas });
  },

  setSelectedOptionId: (optionId: string | null) => {
    if (optionId) sounds.playClick(880);
    set({ selectedOptionId: optionId });
  },

  applyTurnDecision: (option: DecisionOption) => {
    sounds.playValidate();
    const state = get();
    const deltas = option.deltas;

    // Calcul des nouvelles valeurs bornées entre 0 et 100
    const newBudget = Math.max(0, Math.min(100, state.budget + (deltas.budget ?? 0)));
    const newEnergy = Math.max(0, Math.min(100, state.energy + (deltas.energy ?? 0)));
    const newFuel = Math.max(0, Math.min(100, state.fuel + (deltas.fuel ?? 0)));
    const newComms = Math.max(0, Math.min(100, state.comms + (deltas.comms ?? 0)));
    const newScience = Math.max(0, Math.min(100, state.science + (deltas.science ?? 0)));

    // Vérification des conditions de Game Over immédiat
    if (newEnergy <= 0) {
      sounds.playAlert();
      const finalScoreResult = calculateMissionScore(newScience, newBudget, newFuel, true);
      set({
        budget: newBudget,
        energy: 0,
        fuel: newFuel,
        comms: newComms,
        science: newScience,
        isGameOver: true,
        gameOverReason: "Panne électrique totale. Le satellite est devenu un débris spatial incontrôlable.",
        score: finalScoreResult.finalScore,
        currentScreen: 'debrief',
      });
      return;
    }

    if (newFuel <= 0) {
      sounds.playAlert();
      const finalScoreResult = calculateMissionScore(newScience, newBudget, 0, true);
      set({
        budget: newBudget,
        energy: newEnergy,
        fuel: 0,
        comms: newComms,
        science: newScience,
        isGameOver: true,
        gameOverReason: "Épuisement total du propergol. Perte de contrôle d'attitude et dérive orbitale irréversible.",
        score: finalScoreResult.finalScore,
        currentScreen: 'debrief',
      });
      return;
    }

    // Vérification de déclenchement de l'alerte critique DONKI
    // Déclenchée de manière probabiliste au Tour 4 ou Tour 6
    const nextTurn = state.currentTurn + 1;
    const shouldTriggerAlert =
      (nextTurn === 4 || nextTurn === 6) &&
      !state.alertTriggeredTurns.includes(nextTurn);

    if (shouldTriggerAlert) {
      sounds.playAlert();
      set({
        budget: newBudget,
        energy: newEnergy,
        fuel: newFuel,
        comms: newComms,
        science: newScience,
        currentAlert: DONKI_X12_ALERT,
        alertTriggeredTurns: [...state.alertTriggeredTurns, nextTurn],
        selectedOptionId: null,
        hoveredOptionDeltas: null,
      });
      return;
    }

    // Vérification de la victoire / fin de mission au Tour 8
    if (state.currentTurn >= state.maxTurns) {
      const finalScoreResult = calculateMissionScore(newScience, newBudget, newFuel, false);
      set({
        budget: newBudget,
        energy: newEnergy,
        fuel: newFuel,
        comms: newComms,
        science: newScience,
        isMissionSuccess: true,
        score: finalScoreResult.finalScore,
        currentScreen: 'debrief',
        selectedOptionId: null,
        hoveredOptionDeltas: null,
      });
      return;
    }

    // Passage au tour suivant nominal
    set({
      budget: newBudget,
      energy: newEnergy,
      fuel: newFuel,
      comms: newComms,
      science: newScience,
      currentTurn: nextTurn,
      selectedOptionId: null,
      hoveredOptionDeltas: null,
    });
  },

  resolveAlertDirective: (directiveId: 'A' | 'B' | 'C') => {
    sounds.playValidate();
    const state = get();
    if (!state.currentAlert) return;

    const directive = state.currentAlert.directives.find((d) => d.id === directiveId);
    if (!directive) return;

    let delta = { ...directive.deltas };

    // Si directive C : Évaluation du risque de 70% de coupure
    if (directiveId === 'C' && Math.random() < 0.7) {
      delta.comms = (delta.comms ?? 0) - 20;
      delta.energy = (delta.energy ?? 0) - 10;
    }

    const newBudget = Math.max(0, Math.min(100, state.budget + (delta.budget ?? 0)));
    const newEnergy = Math.max(0, Math.min(100, state.energy + (delta.energy ?? 0)));
    const newFuel = Math.max(0, Math.min(100, state.fuel + (delta.fuel ?? 0)));
    const newComms = Math.max(0, Math.min(100, state.comms + (delta.comms ?? 0)));
    const newScience = Math.max(0, Math.min(100, state.science + (delta.science ?? 0)));

    if (newEnergy <= 0 || newFuel <= 0) {
      sounds.playAlert();
      const finalScoreResult = calculateMissionScore(newScience, newBudget, newFuel, true);
      set({
        budget: newBudget,
        energy: Math.max(0, newEnergy),
        fuel: Math.max(0, newFuel),
        comms: newComms,
        science: newScience,
        currentAlert: null,
        isGameOver: true,
        gameOverReason: "L'éjection coronale solaire a surchargé les circuits vitaux du satellite.",
        score: finalScoreResult.finalScore,
        currentScreen: 'debrief',
      });
      return;
    }

    const nextTurn = state.currentTurn + 1;
    if (state.currentTurn >= state.maxTurns) {
      const finalScoreResult = calculateMissionScore(newScience, newBudget, newFuel, false);
      set({
        budget: newBudget,
        energy: newEnergy,
        fuel: newFuel,
        comms: newComms,
        science: newScience,
        currentAlert: null,
        isMissionSuccess: true,
        score: finalScoreResult.finalScore,
        currentScreen: 'debrief',
      });
    } else {
      set({
        budget: newBudget,
        energy: newEnergy,
        fuel: newFuel,
        comms: newComms,
        science: newScience,
        currentTurn: nextTurn,
        currentAlert: null,
      });
    }
  },

  toggleSound: () => {
    const nextVal = !get().soundEnabled;
    sounds.setEnabled(nextVal);
    set({ soundEnabled: nextVal });
  },

  resetGame: () => {
    sounds.playClick(440);
    set({
      currentScreen: 'missions',
      activeMission: null,
      ...INITIAL_RESOURCES,
      currentTurn: 1,
      selectedOptionId: null,
      hoveredOptionDeltas: null,
      currentAlert: null,
      alertTriggeredTurns: [],
      isGameOver: false,
      gameOverReason: null,
      isMissionSuccess: false,
      score: 0,
    });
  },

  goToScreen: (screen: 'missions' | 'flight' | 'debrief') => {
    set({ currentScreen: screen });
  },
}));
