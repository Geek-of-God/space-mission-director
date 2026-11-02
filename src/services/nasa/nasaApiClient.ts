/**
 * Client API NASA avec bascule automatique locale/distante
 * Fournit un fonctionnement 100% hors-ligne avec jeux de données intégrés,
 * tout en autorisant l'interrogation en direct de api.nasa.gov si une clé est fournie.
 */
import donkiLocal from '@/data/nasa/donki_space_weather.json';

export class NasaApiClient {
  private static apiKey: string = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';

  /**
   * Récupère les dernières éjections de masse coronale (CME)
   * Si le réseau échoue ou est indisponible, retourne immédiatement le jeu local certifié.
   */
  public static async fetchLatestCMEEvents() {
    try {
      const response = await fetch(
        `https://api.nasa.gov/DONKI/CME?startDate=2024-05-01&api_key=${this.apiKey}`,
        { cache: 'no-store' }
      );
      if (!response.ok) throw new Error('API NASA inaccessible');
      const data = await response.json();
      return data;
    } catch {
      // Fallback automatique vers les données NASA locales pré-packagées
      return donkiLocal.events;
    }
  }
}
