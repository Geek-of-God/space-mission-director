/**
 * Anecdotes et faits réels de la NASA pour le débriefing pédagogique final
 * Vulgarise des concepts d'ingénierie et d'histoire spatiale authentiques.
 */
import { MissionId } from '@/types/game';

export interface NasaFact {
  missionId: MissionId;
  title: string;
  project: string;
  fact: string;
  source: string;
}

export const NASA_FACTS: Record<MissionId, NasaFact> = {
  earth: {
    missionId: 'earth',
    title: 'La révolution hyperspectrale de PACE & Landsat 9',
    project: 'NASA PACE (2024) & Landsat (Programme depuis 1972)',
    fact: "Le satellite PACE de la NASA est équipé de l'instrument OCI capable d'analyser l'océan à travers plus de 100 bandes de couleurs différentes. Cela permet de distinguer les espèces de phytoplancton toxiques des espèces bénéfiques depuis 705 km d'altitude. Landsat 9, quant à lui, fournit une continuité de 50 ans d'observations terrestres, permettant de mesurer le recul des glaciers et la déforestation à l'échelle métrique.",
    source: 'NASA Ocean Biology Processing Group / USGS Earth Resources Observation Science',
  },
  moon: {
    missionId: 'moon',
    title: 'L’orbite quasi-rectiligne de halo (NRHO) & la sonde Parker',
    project: 'Artemis Gateway & Lunar Reconnaissance Orbiter (LRO)',
    fact: "L'orbite NRHO choisie pour la station spatiale Gateway est une merveille de mécanique céleste : elle ne nécessite qu'un micro-allumage de moteur par semaine (environ 1.2 m/s de delta-V) pour rester stable pendant des décennies. Dans les cratères du pôle Sud lunaire comme Shackleton, la température descend jusqu'à -233°C (40 K), préservant des milliards de tonnes de glace d'eau piégées depuis plus de deux milliards d'années.",
    source: 'NASA Johnson Space Center & Goddard Flight Dynamics Facility',
  },
  mars: {
    missionId: 'mars',
    title: 'Le premier décollage d’une autre planète : Mars Sample Return',
    project: 'Mars 2020 Perseverance & Mars Ascent Vehicle (MAV)',
    fact: "Le projet Mars Sample Return représente la première tentative humaine de rapporter des roches d'une autre planète. Perseverance a déjà scellé plusieurs dizaines de carottes dans des tubes en titane ultra-purs. La fusée MAV, haute de seulement 3 mètres, sera la première fusée à propergol solide à s'élancer depuis la surface martienne, exigeant un rendez-vous orbital autonome guidé par intelligence artificielle en raison des 14 minutes de latence radio avec la Terre.",
    source: 'NASA Jet Propulsion Laboratory (JPL) & European Space Agency (ESA)',
  },
};
