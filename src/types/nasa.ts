/**
 * Schémas TypeScript des Données Ouvertes de la NASA (NASA Open Data)
 * Modélise les données DONKI, Earthdata PACE/Landsat, Artemis NRHO et PDS Mars.
 */

/**
 * Données NASA DONKI - Coronal Mass Ejection (CME) & Solar Flares
 * Basé sur l'API officielle : https://kauai.ccmc.gsfc.nasa.gov/DONKI/
 */
export interface NasaDonkiEvent {
  activityID: string;
  catalog: string;
  startTime: string;
  sourceLocation: string;
  associatedFlare: {
    flareClass: 'X1.2' | 'M5.4' | 'C8.2';
    derivedFluxWattsPerM2: number;
  };
  cmeSpeedKmS: number;          // Vitesse d'éjection coronale (ex: 1250 km/s)
  halfAngleDegrees: number;
  earthImpactProbability: number; // 0.0 à 1.0
  protonFluxLevel: string;      // ex: "S2 Moderate Radiation Storm"
  analysisNote: string;
}

/**
 * Données NASA PACE (Plankton, Aerosol, Cloud, ocean Ecosystem)
 * Capteur OCI (Ocean Color Instrument) et SPEXone
 */
export interface NasaPaceObservation {
  orbitNumber: number;
  swathCoverage: string;
  aerosolOpticalDepth550nm: number; // Indice AOD de 0.05 à 1.2
  chlorophyllConcentrationMgM3: number;
  memoryBufferUsageMB: number;
  polarSwathDataLossRisk: number;
}

/**
 * Données NASA Artemis Gateway - NRHO (Near Rectilinear Halo Orbit)
 * En partenariat avec LRO (Lunar Reconnaissance Orbiter) Diviner
 */
export interface NasaArtemisGatewayOrbit {
  periseleneKm: number;          // ~3 000 km
  aposeleneKm: number;           // ~70 000 km
  orbitalPeriodDays: number;     // 6.56 jours
  shackletonCraterTempKelvin: number; // ~40 K dans les zones d'ombre permanente
  eclipseDurationHours: number;
  regolithDustAbrasionFactor: number;
}

/**
 * Données NASA PDS (Planetary Data System) - Mars Perseverance & MAV
 */
export interface NasaMarsMissionTelemetry {
  solNumber: number;
  atmosphericOpacityTau: number;  // Opacité optique de la poussière (taux 0.5 à 3.0)
  roundTripRadioDelayMinutes: number; // 14.2 minutes
  sampleTubesDepositionStatus: {
    collected: number;
    sealed: number;
    readyForRelay: number;
  };
  deepSpaceNetworkAntenna: 'Goldstone 70m' | 'Madrid 70m' | 'Canberra 70m';
}

/**
 * Éphémérides et Télémétrie Satcat / Horizons
 */
export interface NasaSatcatTelemetry {
  noradId: number;
  intlDesignator: string;
  inclinationDegrees: number;
  apogeeKm: number;
  perigeeKm: number;
  meanMotionRevsPerDay: number;
  bstarDragTerm: number;
}
