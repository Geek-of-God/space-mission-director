/**
 * Utilitaires avioniques pour la gestion de l'affichage du HUD
 * Détermine les couleurs dynamiques selon les seuils stricts imposés :
 * - Vert (#10B981) : Nominal / Succès (Valeur > 50%)
 * - Orange (#F59E0B) : Attention / Compromis (Valeur entre 20% et 50%)
 * - Rouge (#EF4444) : Alerte critique / Danger (Valeur < 20%)
 */

export type AvionicsColorLevel = 'green' | 'orange' | 'red';

/**
 * Calcule le niveau de couleur avionique en fonction de la valeur (0 à 100)
 */
export function getAvionicsColorLevel(value: number): AvionicsColorLevel {
  if (value > 50) return 'green';
  if (value >= 20) return 'orange';
  return 'red';
}

/**
 * Retourne les classes CSS Tailwind adaptées au niveau avionique
 */
export function getAvionicsStyles(level: AvionicsColorLevel) {
  switch (level) {
    case 'green':
      return {
        text: 'text-[#10B981]',
        bg: 'bg-[#10B981]',
        border: 'border-[#10B981]',
        badgeBg: 'bg-[#10B981]/15',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]',
        hex: '#10B981',
      };
    case 'orange':
      return {
        text: 'text-[#F59E0B]',
        bg: 'bg-[#F59E0B]',
        border: 'border-[#F59E0B]',
        badgeBg: 'bg-[#F59E0B]/15',
        glow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]',
        hex: '#F59E0B',
      };
    case 'red':
      return {
        text: 'text-[#EF4444]',
        bg: 'bg-[#EF4444]',
        border: 'border-[#EF4444]',
        badgeBg: 'bg-[#EF4444]/15',
        glow: 'shadow-[0_0_16px_rgba(239,68,68,0.6)]',
        hex: '#EF4444',
      };
  }
}

/**
 * Formate l'affichage des ressources avec leur unité physique réelle
 */
export function formatResourceDisplay(
  type: 'budget' | 'energy' | 'fuel' | 'comms' | 'science',
  value: number,
  initialBudgetM: number = 100
): { displayValue: string; unit: string; secondary: string } {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  switch (type) {
    case 'budget': {
      // Échelle réelle en millions de dollars basée sur le budget initial
      const realMillions = Math.round((clamped / 100) * initialBudgetM);
      return {
        displayValue: `$${realMillions}M`,
        unit: 'USD',
        secondary: `${clamped}% restant`,
      };
    }
    case 'energy': {
      // Énergie en % et puissance équivalente en Watts (ex: 80% = 3200W)
      const watts = Math.round(clamped * 40);
      return {
        displayValue: `${clamped}%`,
        unit: `${watts} W`,
        secondary: 'Bus EPS 28V',
      };
    }
    case 'fuel': {
      // Ergol/Carburant en kg (ex: 100% = 1000 kg, 80% = 800 kg)
      const kg = Math.round(clamped * 10);
      return {
        displayValue: `${kg} kg`,
        unit: 'Ergol',
        secondary: `${clamped}% de charge`,
      };
    }
    case 'comms': {
      // Télécom en % et débit en Mbps
      const mbps = (clamped * 0.12).toFixed(1);
      return {
        displayValue: `${clamped}%`,
        unit: `${mbps} Mbps`,
        secondary: 'Lien DSN Ka',
      };
    }
    case 'science': {
      // Points d'objectifs scientifiques collectés
      return {
        displayValue: `${clamped}`,
        unit: '/ 100 pts',
        secondary: 'Télémétrie PDS',
      };
    }
  }
}
