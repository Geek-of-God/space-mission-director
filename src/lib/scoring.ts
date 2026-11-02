/**
 * Calculateur officiel du score de mission - NASA Goddard Space Flight Center
 * Formule imposée : (science * 0.5) + (budget * 0.3) + (fuel * 0.2)
 */

export interface ScoreBreakdownResult {
  finalScore: number;
  sciencePart: number; // sur 50 pts
  budgetPart: number;  // sur 30 pts
  fuelPart: number;    // sur 20 pts
  rankTitle: string;
  rankBadge: string;
  rankColor: 'green' | 'orange' | 'red';
  isSuccess: boolean;
}

export function calculateMissionScore(
  science: number,
  budget: number,
  fuel: number,
  isGameOver: boolean = false
): ScoreBreakdownResult {
  // Clamping pour assurer la cohérence mathématique (0 à 100)
  const normScience = Math.max(0, Math.min(100, science));
  const normBudget = Math.max(0, Math.min(100, budget));
  const normFuel = Math.max(0, Math.min(100, fuel));

  // Décomposition mathématique en 3 lignes
  const sciencePart = Math.round(normScience * 0.5 * 10) / 10; // Max 50
  const budgetPart = Math.round(normBudget * 0.3 * 10) / 10;   // Max 30
  const fuelPart = Math.round(normFuel * 0.2 * 10) / 10;       // Max 20

  let finalScore = Math.round(sciencePart + budgetPart + fuelPart);

  // En cas de Game Over (crash/perte satellite), le score est pénalisé
  if (isGameOver) {
    finalScore = Math.min(finalScore, 35);
  }

  // Attribution des rangs honorifiques officiels
  if (finalScore >= 80 && !isGameOver) {
    return {
      finalScore,
      sciencePart,
      budgetPart,
      fuelPart,
      rankTitle: 'DIRECTEUR DE VOL ÉMÉRITE — SUCCÈS MAJEUR',
      rankBadge: '🏆',
      rankColor: 'green',
      isSuccess: true,
    };
  } else if (finalScore >= 50 && !isGameOver) {
    return {
      finalScore,
      sciencePart,
      budgetPart,
      fuelPart,
      rankTitle: 'MISSION VALIDÉE — OBJECTIFS PARTIELS',
      rankBadge: '🛰️',
      rankColor: 'orange',
      isSuccess: true,
    };
  } else {
    return {
      finalScore,
      sciencePart,
      budgetPart,
      fuelPart,
      rankTitle: 'ÉCHEC CRITIQUE — ANALYSE D’ANOMALIE REQUISE',
      rankBadge: '⚠️',
      rankColor: 'red',
      isSuccess: false,
    };
  }
}
