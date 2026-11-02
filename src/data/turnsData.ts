/**
 * Données complètes des dilemmes pour les 8 tours de jeu
 * 3 missions x 8 tours = 24 scénarios techniques rédigés en français aérospatial authentique.
 */
import { MissionId, TurnDecision } from '@/types/game';

export const TURNS_DATA: Record<MissionId, TurnDecision[]> = {
  earth: [
    {
      turnNumber: 1,
      title: 'Initialisation Orbitale & Déploiement des Panneaux',
      narrative:
        "Le satellite PACE s'est séparé du second étage du lanceur Falcon 9. Les actionneurs gyroscopiques doivent stabiliser le satellite avant le premier passage au-dessus de la station de Svalbard.",
      scientificContext: 'Validation de l’orientation 3-axes et vérification du bus d’alimentation EPS.',
      options: [
        {
          id: 'e1-opt1',
          title: 'Déploiement nominal temporisé avec contrôle gyroscopique',
          description: 'Stabiliser lentement le satellite pour préserver le mécanisme de rotation des panneaux solaires.',
          technicalDetails: 'Consommation électrique réduite, calibrage sécurisé des magnétomètres.',
          deltas: { energy: +5, fuel: -5, comms: +5, science: +5 },
        },
        {
          id: 'e1-opt2',
          title: 'Allumage rapide des propulseurs à hydrazine',
          description: 'Forcer l’orientation vers le Soleil en 180 secondes pour recharger immédiatement les accumulateurs.',
          technicalDetails: 'Consommation accrue de carburant mais saturation lumineuse immédiate des cellules photovoltaïques.',
          deltas: { energy: +15, fuel: -15, science: +2 },
        },
        {
          id: 'e1-opt3',
          title: 'Priorité au calibrage de l’antenne bande X',
          description: 'Établir immédiatement une liaison descendante haut débit avec la station au sol.',
          technicalDetails: 'Augmente la qualité initiale de la télémesure au détriment de la réserve énergétique.',
          deltas: { energy: -10, comms: +15, science: +8 },
        },
      ],
    },
    {
      turnNumber: 2,
      title: 'Survol Polaire & Saturation de la Mémoire de Masse',
      narrative:
        'Le capteur OCI a scanné un bloom de phytoplancton spectaculaire en mer de Ross. Les 512 Go de mémoire tampon à semi-conducteurs approchent du seuil critique de débordement.',
      scientificContext: 'Transmission LEO à 7.66 km/s avec une fenêtre de visibilité sol de 9 minutes.',
      options: [
        {
          id: 'e2-opt1',
          title: 'Compression avec perte des bandes spectrales infrarouges',
          description: 'Réduire le volume de données brutes pour garantir l’envoi de 100% des paquets en une seule passe.',
          technicalDetails: 'Gain de bande passante sans impact carburant, légère dégradation de la précision spectrale.',
          deltas: { comms: +5, science: +12, budget: 0 },
        },
        {
          id: 'e2-opt2',
          title: 'Transmission continue en bande Ka à puissance maximale',
          description: 'Pousser l’amplificateur à tube à ondes progressives (TWTA) à 45 Watts pendant toute la traversée polaire.',
          technicalDetails: 'Télémétrie complète transmise, contrainte thermique et décharge intense de la batterie.',
          deltas: { energy: -15, comms: +10, science: +20 },
        },
        {
          id: 'e2-opt3',
          title: 'Stockage différé et réquisition du réseau commercial KSAT',
          description: 'Acheter un créneau de contact supplémentaire via la station antarctique de Troll.',
          technicalDetails: 'Préserve l’intégrité scientifique et la batterie contre une dépense budgétaire imprévue.',
          deltas: { budget: -8, science: +16, energy: -2 },
        },
      ],
    },
    {
      turnNumber: 3,
      title: 'Traversée de l’Anomalie Magnétique de l’Atlantique Sud (SAA)',
      narrative:
        'Le satellite plonge dans la zone de piégeage de la ceinture de Van Allen. Le flux de protons induit des erreurs sur le calculateur de bord principal (Single Event Latchup).',
      scientificContext: 'Rayonnement ionisant traversant le blindage en aluminium de 2 mm.',
      options: [
        {
          id: 'e3-opt1',
          title: 'Passage en mode sans échec préventif (Safe Mode)',
          description: 'Couper la charge utile scientifique pendant 25 minutes et isoler la mémoire protégée EDAC.',
          technicalDetails: 'Sécurité maximale du bus avionique mais perte d’un quart d’orbite d’observation océanique.',
          deltas: { energy: +5, science: -5, comms: 0 },
        },
        {
          id: 'e3-opt2',
          title: 'Maintien de la collecte avec filtrage logiciel temps réel',
          description: 'Activer le code de correction Reed-Solomon et surcadencer le processeur durci.',
          technicalDetails: 'Consommation électrique augmentée et dissipation thermique des radiateurs.',
          deltas: { energy: -10, science: +15, budget: -3 },
        },
        {
          id: 'e3-opt3',
          title: 'Bascule automatique sur le calculateur redondant B',
          description: 'Changer de chaîne avionique active pour éviter l’échauffement de l’unité A.',
          technicalDetails: 'Mobilise les relais de puissance, réinitialise la synchronisation des horloges atomiques.',
          deltas: { energy: -5, comms: -10, science: +8 },
        },
      ],
    },
    {
      turnNumber: 4,
      title: 'Opportunité de Tempête Saharienne & Calibrage Radiométrique',
      narrative:
        'Un panache gigantesque d’aérosols minéraux quitte la Mauritanie vers l’Atlantique. Les climatologues réclament un basculement de l’axe satellite pour un balayage multi-angles.',
      scientificContext: 'Réflectance bidirectionnelle et validation croisée avec le capteur MODIS d’Aqua.',
      options: [
        {
          id: 'e4-opt1',
          title: 'Manœuvre de roulis orbital à 20 degrés vers le limbe terrestre',
          description: 'Allumer les micro-tuyères pour pointer le spectromètre au ras de l’horizon océanique.',
          technicalDetails: 'Dépense de propergol d’appoint, résultats climatologiques de renommée mondiale.',
          deltas: { fuel: -15, science: +25, energy: -5 },
        },
        {
          id: 'e4-opt2',
          title: 'Visée nadir standard sans déviation gyroscopique',
          description: 'Conserver l’attitude nominale et laisser défiler le nuage sous la trajectoire naturelle.',
          technicalDetails: 'Économie absolue des fluides propulsifs, données scientifiques partielles.',
          deltas: { fuel: 0, science: +8, energy: +2 },
        },
        {
          id: 'e4-opt3',
          title: 'Scan à haute fréquence avec compensation gyroscopique électrique',
          description: 'Utiliser exclusivement les roues de réaction pour stabiliser l’axe sans consommer de carburant.',
          technicalDetails: 'Fort appel de courant continu sur les moteurs de roue à réaction.',
          deltas: { energy: -18, science: +18, comms: 0 },
        },
      ],
    },
    {
      turnNumber: 5,
      title: 'Dérive Thermique & Éclipse Solaire d’Équinoxe',
      narrative:
        'La Terre s’interpose entre le satellite et le Soleil pendant 35 minutes consécutives. La température des optiques cryogéniques descend sous le seuil critique de -60°C.',
      scientificContext: 'Gestion du bilan de puissance et des réchauffeurs thermiques thermostatiques.',
      options: [
        {
          id: 'e5-opt1',
          title: 'Activation intégrale des résistances chauffantes',
          description: 'Maintenir les miroirs du télescope à température constante pour éviter la condensation de glace.',
          technicalDetails: 'Tirage massif sur la batterie lithium-ion lors du passage dans l’ombre.',
          deltas: { energy: -20, science: +10, comms: 0 },
        },
        {
          id: 'e5-opt2',
          title: 'Tolérer un refroidissement passif contrôlé',
          description: 'Désactiver les réchauffeurs secondaires et suspendre les mesures optiques pendant l’éclipse.',
          technicalDetails: 'Préserve les réserves de puissance, nécessite un temps de réchauffement après la sortie d’ombre.',
          deltas: { energy: +5, science: -8, budget: 0 },
        },
        {
          id: 'e5-opt3',
          title: 'Mise en rotation lente pour équilibrage thermique passif (Barbecue Roll)',
          description: 'Faire pivoter lentement le corps du satellite pour distribuer la chaleur résiduelle.',
          technicalDetails: 'Légère dépense de gaz froid mais économie d’énergie sur les radiateurs.',
          deltas: { fuel: -10, energy: -5, science: +6 },
        },
      ],
    },
    {
      turnNumber: 6,
      title: 'Alerte Débris Spatial & Manœuvre d’Évitement (COLA)',
      narrative:
        'Le 18th Space Defense Squadron signale un fragment de satellite inactif Cosmos 1408 en trajectoire de collision (distance de croisement : 120 mètres, probabilité 1/450).',
      scientificContext: 'Conjunction Assessment Risk Analysis (CARA) par le NASA Goddard Flight Dynamics.',
      options: [
        {
          id: 'e6-opt1',
          title: 'Allumage de correction d’orbite rétrograde (Delta-V 1.8 m/s)',
          description: 'Abaisser temporairement le périgée de 2 km pour laisser passer le fragment au-dessus.',
          technicalDetails: 'Élimine tout risque d’impact, ampute la réserve d’ergol de fin de vie.',
          deltas: { fuel: -22, science: 0, comms: +5 },
        },
        {
          id: 'e6-opt2',
          title: 'Modification d’attitude par traînée différentielle (Drag Control)',
          description: 'Braquer les panneaux solaires perpendiculairement au flux d’air résiduel pour freiner sans moteur.',
          technicalDetails: 'Zéro ergol consommé, perte de synchronisme solaire pendant 48 heures.',
          deltas: { energy: -12, fuel: 0, science: -5, comms: -5 },
        },
        {
          id: 'e6-opt3',
          title: 'Achat de modélisation radar haute précision auprès de LeoLabs',
          description: 'Affiner l’incertitude de la covariance orbitale pour décider d’annuler la manœuvre.',
          technicalDetails: 'Dépense financière immédiate sur le fond de réserve d’urgence de la mission.',
          deltas: { budget: -12, fuel: -4, science: +5 },
        },
      ],
    },
    {
      turnNumber: 7,
      title: 'Corrosion Atomique de l’Oxygène en Orbite Basse',
      narrative:
        'La thermosphère supérieure hautement réactive dégrade les revêtements Kapton et la métallisation externe de l’antenne omnidirectionnelle en bande S.',
      scientificContext: 'Érosion par flux d’oxygène atomique (AO) à 700 km d’altitude.',
      options: [
        {
          id: 'e7-opt1',
          title: 'Augmenter la puissance d’émission du transpondeur sol',
          description: 'Compenser la baisse de sensibilité de l’antenne par une amplification radiofréquence au sol.',
          technicalDetails: 'Coût horaire refacturé par les stations terrestres de White Sands et McMurdo.',
          deltas: { budget: -10, comms: +12, energy: 0 },
        },
        {
          id: 'e7-opt2',
          title: 'Bascule exclusive sur la liaison optique laser point à point',
          description: 'Délaisser la bande S érodée pour transférer les flux par terminal laser infrarouge.',
          technicalDetails: 'Bande passante phénoménale mais dépendante de l’absence de nuages au-dessus de la station sol.',
          deltas: { comms: +20, energy: -10, science: +18 },
        },
        {
          id: 'e7-opt3',
          title: 'Stabilisation passive avec dégradation tolérée du lien',
          description: 'Accepter un débit de télémétrie restreint pour ne pas engager de frais supplémentaires.',
          technicalDetails: 'Préservation budgétaire, risque de perte de paquets scientifiques complexes.',
          deltas: { budget: +5, comms: -15, science: -5 },
        },
      ],
    },
    {
      turnNumber: 8,
      title: 'Bouclage de Mission & Manœuvre de Fin de Vie Légale',
      narrative:
        'La campagne d’observation principale touche à son terme. Les traités internationaux sur les débris spatiaux exigent d’engager la réserve de passivation pour garantir une rentrée sous 25 ans.',
      scientificContext: 'Exigence NASA Standard 8719.14 (Process for Limiting Orbital Debris).',
      options: [
        {
          id: 'e8-opt1',
          title: 'Désorbitation contrôlée vers le point Nemo (Cimetière du Pacifique)',
          description: 'Consommer le reste de l’hydrazine pour précipiter la sonde dans la haute atmosphère de manière sûre.',
          technicalDetails: 'Validation exemplaire de l’éthique environnementale spatiale de la NASA.',
          deltas: { fuel: -30, budget: +5, science: +10 },
        },
        {
          id: 'e8-opt2',
          title: 'Prolongation de mission étendue de 6 mois (Extended Mission Phase)',
          description: 'Solliciter le quartier général de la NASA pour continuer la surveillance climatique jusqu’à épuisement.',
          technicalDetails: 'Collecte scientifique maximale, risque de laisser un débris orphelin en cas de panne imprévue.',
          deltas: { science: +30, budget: -15, fuel: -10, energy: -10 },
        },
        {
          id: 'e8-opt3',
          title: 'Passivation des réservoirs et transfert en orbite cimetière surélevée',
          description: 'Purger les canalisations de propergol et vidanger la haute tension des batteries.',
          technicalDetails: 'Évite toute explosion en vol, équilibre optimal entre science et responsabilité.',
          deltas: { fuel: -15, energy: -5, science: +15, budget: 0 },
        },
      ],
    },
  ],

  moon: [
    {
      turnNumber: 1,
      title: 'Injection en Orbite NRHO & Capture Gravitationnelle L2',
      narrative:
        'La station Artemis Gateway aborde la résonance 9:2 avec la Lune. Les moteurs ioniques solaires-électriques (SEP) de 12 kW doivent aligner le plan d’insertion au pôle Nord.',
      scientificContext: 'Near Rectilinear Halo Orbit : point d’équilibre entre gravité terrestre et lunaire.',
      options: [
        {
          id: 'm1-opt1',
          title: 'Allumage continu longue durée des propulseurs à effet Hall',
          description: 'Accélération continue au xénon pour une capture douce et économique.',
          technicalDetails: 'Consommation électrique maximale des panneaux solaires ultraflex.',
          deltas: { energy: -20, fuel: -5, science: +8, comms: +5 },
        },
        {
          id: 'm1-opt2',
          title: 'Assistance gravitationnelle lunaire serrée (Gravity Assist)',
          description: 'Frôler le limbe lunaire à 120 km pour épargner le fluide propulsif.',
          technicalDetails: 'Risque de masquage radio pendant 45 minutes derrière la face cachée.',
          deltas: { fuel: +5, comms: -15, energy: +5, science: +12 },
        },
        {
          id: 'm1-opt3',
          title: 'Injection chimique hybride à haute poussée',
          description: 'Brûler de l’ergol bi-liquide pour figer la position orbitale en quelques minutes.',
          technicalDetails: 'Réduction brutale du réservoir de propergol mais télémétrie sécurisée.',
          deltas: { fuel: -25, budget: -5, comms: +15, science: +5 },
        },
      ],
    },
    {
      turnNumber: 2,
      title: 'Couverture Relais du Cratère Shackleton (Pôle Sud)',
      narrative:
        'L’équipage d’Artemis III prépare sa descente dans les régions d’ombre permanente. La station doit relier les scaphandriers xEMU avec le centre de contrôle de Houston.',
      scientificContext: 'Liaison directe UHF 400 MHz et relais bande Ka vers le réseau DSN terrestre.',
      options: [
        {
          id: 'm2-opt1',
          title: 'Orientation dédiée de l’antenne à réseau phasé vers le pôle',
          description: 'Verrouiller les faisceaux radioélectriques sur le plancher cryogénique du cratère.',
          technicalDetails: 'Assure une transmission vidéo HD 4K continue pour les géologues lunaires.',
          deltas: { energy: -15, comms: +20, science: +20 },
        },
        {
          id: 'm2-opt2',
          title: 'Relais intermittent par créneaux orbitaux de 30 minutes',
          description: 'Limiter la durée des contacts à l’approche du périsélène pour préserver les batteries.',
          technicalDetails: 'Économise la charge électrique mais retarde l’analyse des échantillons d’eau gelée.',
          deltas: { energy: +5, comms: -10, science: +8 },
        },
        {
          id: 'm2-opt3',
          title: 'Déploiement du mini-satellite relais CubeSat d’escorte',
          description: 'Éjecter un CubeSat 12U pour assurer le relais basse altitude de manière autonome.',
          technicalDetails: 'Coût prélevé sur le budget d’équipement, libère totalement la station Gateway.',
          deltas: { budget: -15, comms: +25, science: +15, energy: 0 },
        },
      ],
    },
    {
      turnNumber: 3,
      title: 'Éclipse Cislunaire Prolongée de la Terre',
      narrative:
        'La Terre bloque totalement le rayonnement solaire pendant 85 minutes. Les panneaux de 60 kW ne produisent aucun watt et la température chute à 40 Kelvin.',
      scientificContext: 'Contrainte cryogénique extrême sur les batteries lithium-ion de l’élément PPE.',
      options: [
        {
          id: 'm3-opt1',
          title: 'Délestage strict de tous les sous-systèmes non vitaux',
          description: 'Éteindre les expériences scientifiques HERMES et le transpondeur haute puissance.',
          technicalDetails: 'Garantit la survie de la chaîne de puissance jusqu’à l’émergence du Soleil.',
          deltas: { energy: -12, science: -8, comms: -15 },
        },
        {
          id: 'm3-opt2',
          title: 'Activation de la pile à combustible régénérative de secours',
          description: 'Recombiner l’hydrogène et l’oxygène stockés pour générer 4 kW électriques et de la chaleur.',
          technicalDetails: 'Maintient la science active mais consomme les consommables fluides critiques.',
          deltas: { fuel: -15, energy: +10, science: +12, budget: -5 },
        },
        {
          id: 'm3-opt3',
          title: 'Manœuvre de sortie de cône d’ombre par allumage RCS',
          description: 'Modifier légèrement la période orbitale pour écourter la durée de traversée de l’ombre.',
          technicalDetails: 'Sauvegarde l’énergie électrique mais dégrade la stabilité de l’orbite NRHO.',
          deltas: { fuel: -18, energy: +15, comms: +5, science: 0 },
        },
      ],
    },
    {
      turnNumber: 4,
      title: 'Lévitation Électrostatique de la Poussière de Régolithe',
      narrative:
        'Lors du passage du terminateur lunaire, le bombardement UV induit une charge électrique soulevant des nuages de poussière abrasive jusqu’à plusieurs kilomètres d’altitude.',
      scientificContext: 'Poussière submicronique abrasive adhérant aux joints rotatifs et aux radiateurs thermiques.',
      options: [
        {
          id: 'm4-opt1',
          title: 'Rétraction des radiateurs déployables et polarisation électrostatique',
          description: 'Appliquer un potentiel répulsif sur la coque externe pour dévier les grains de poussière.',
          technicalDetails: 'Consommation continue de puissance électrique sur le bus haute tension.',
          deltas: { energy: -15, budget: 0, science: +10, comms: 0 },
        },
        {
          id: 'm4-opt2',
          title: 'Orientation des panneaux solaires parallèlement au terminateur',
          description: 'Minimiser la surface exposée au flux de poussière en biseautant les ailes.',
          technicalDetails: 'Réduit l’accumulation de poussière mais diminue l’ensoleillement de 40%.',
          deltas: { energy: -10, fuel: -2, science: +5 },
        },
        {
          id: 'm4-opt3',
          title: 'Achat de créneaux de télémesure télescopique avec le DSN',
          description: 'Surveiller optiquement la dégradation des cellules photovoltaïques depuis la Terre.',
          technicalDetails: 'Facturation par l’infrastructure terrestre sans usure matérielle.',
          deltas: { budget: -10, comms: +10, science: +12 },
        },
      ],
    },
    {
      turnNumber: 5,
      title: 'Amarrage du Vaisseau Logistique Dragon XL',
      narrative:
        'Le cargo automatisé Dragon XL arrive avec 3 tonnes de vivres et d’équipements. Le capteur LIDAR d’approche finale montre un écart d’alignement de 12 cm.',
      scientificContext: 'Rendez-vous spatial autonome en orbite cislunaire et sécurité du sas IDSS.',
      options: [
        {
          id: 'm5-opt1',
          title: 'Reprise manuelle à distance depuis le centre de vol de Houston',
          description: 'Suspendre l’amarrage automatique et corriger la trajectoire impulsion par impulsion.',
          technicalDetails: 'Consomme 2.5 secondes de latence aller-retour mais sécurise l’intégrité structurelle.',
          deltas: { fuel: -10, comms: -5, budget: +10, science: +5 },
        },
        {
          id: 'm5-opt2',
          title: 'Autoriser l’algorithme de bord à effectuer une recapture autonome',
          description: 'Laisser le système de vision artificielle réajuster les propulseurs à gaz froid.',
          technicalDetails: 'Processus immédiat, légère dépense de fluide propulsif de la station.',
          deltas: { fuel: -15, science: +15, energy: -5 },
        },
        {
          id: 'm5-opt3',
          title: 'Avortement de la passe et attente d’une révolution orbitale complète',
          description: 'Éloigner le cargo à 500 mètres et attendre 6.5 jours pour une nouvelle tentative nominale.',
          technicalDetails: 'Sécurité absolue mais pénalité financière de maintien d’alerte au sol.',
          deltas: { budget: -20, energy: +5, comms: +5, science: -5 },
        },
      ],
    },
    {
      turnNumber: 6,
      title: 'Panne du Transpondeur Principal en Bande Ka',
      narrative:
        'Une surchauffe sur l’amplificateur hyperfréquence coupe la liaison principale avec Goldstone. La transmission des relevés de sismologie lunaire est interrompue.',
      scientificContext: 'Défaillance de l’étage de sortie RF soumis aux rayons cosmiques galactiques.',
      options: [
        {
          id: 'm6-opt1',
          title: 'Bascule sur le terminal optique de communication laser (DSOC)',
          description: 'Activer le pointeur laser infrarouge de 1550 nm vers l’observatoire du Mont Palomar.',
          technicalDetails: 'Bande passante multipliée par 10 mais consommation électrique doublée.',
          deltas: { energy: -18, comms: +25, science: +22 },
        },
        {
          id: 'm6-opt2',
          title: 'Redémarrage à froid de l’amplificateur avec refroidissement forcé',
          description: 'Purger les circuits caloducs et redémarrer la baie radioélectrique après 40 minutes.',
          technicalDetails: 'Restaure le signal standard, légère contrainte thermique sur l’avionique.',
          deltas: { comms: +10, energy: -5, science: +8 },
        },
        {
          id: 'm6-opt3',
          title: 'Relais d’urgence via la sonde sud-coréenne Danuri',
          description: 'Négocier un transfert inter-agences via le protocole d’interopérabilité spatiale.',
          technicalDetails: 'Coût diplomatique et financier de coopération internationale.',
          deltas: { budget: -12, comms: +15, science: +10 },
        },
      ],
    },
    {
      turnNumber: 7,
      title: 'Maintien de l’Orbite NRHO contre les Perturbations Terrestres',
      narrative:
        'L’attraction combinée du Soleil et de la Terre provoque une dérive d’inclinaison de l’apocène. Sans correction immédiate, la station quittera la fenêtre de résonance stable.',
      scientificContext: 'Station-keeping delta-V requis : environ 1.2 m/s par cycle orbital.',
      options: [
        {
          id: 'm7-opt1',
          title: 'Manœuvre de station-keeping optimale au passage de l’apocène',
          description: 'Allumer les propulseurs à propergol liquide au point de vitesse orbitale minimale.',
          technicalDetails: 'Efficacité cinématique maximale, stabilise la station pour 12 mois.',
          deltas: { fuel: -20, energy: -5, science: +10, comms: +5 },
        },
        {
          id: 'm7-opt2',
          title: 'Correction continue par poussée ionique au xénon',
          description: 'Délivrer une micro-poussée tout au long de la semaine orbitale.',
          technicalDetails: 'Épargne le carburant de manœuvre d’urgence au prix d’un tirage électrique constant.',
          deltas: { fuel: -6, energy: -22, science: +5 },
        },
        {
          id: 'm7-opt3',
          title: 'Tolérer une orbite légèrement étirée pour économiser les fluides',
          description: 'Reporter la correction majeure au prochain cycle de rotation de la Terre.',
          technicalDetails: 'Conserve les réserves, augmente l’atténuation radioélectrique avec le pôle Sud.',
          deltas: { fuel: 0, comms: -15, science: -5, budget: +5 },
        },
      ],
    },
    {
      turnNumber: 8,
      title: 'Validation Finale du Relais d’Ascent d’Artemis III',
      narrative:
        'Le module de remontée du Starship HLS s’élance de la surface lunaire. Gateway doit coordonner le guidage optique et la synchronisation de télémétrie vers la Terre.',
      scientificContext: 'Validation du premier atterrissage humain sur la Lune du 21e siècle.',
      options: [
        {
          id: 'm8-opt1',
          title: 'Mobilisation à 100% de la matrice de communication et des senseurs',
          description: 'Pousser tous les générateurs et émetteurs pour garantir 0 milliseconde de coupure.',
          technicalDetails: 'Succès éclatant de la mission, usure finale assumée des composants.',
          deltas: { energy: -25, comms: +30, science: +35, budget: 0 },
        },
        {
          id: 'm8-opt2',
          title: 'Guidage partagé avec le réseau des stations sol terrestres',
          description: 'Déléguer une partie du calcul de trajectoire aux supercalculateurs du Goddard.',
          technicalDetails: 'Équilibre parfait des ressources énergétiques et budgétaires.',
          deltas: { energy: -10, budget: -10, science: +25, comms: +15 },
        },
        {
          id: 'm8-opt3',
          title: 'Consignation minimale et enregistrement boîte noire',
          description: 'Assurer le relais audio tout en préservant le maximum de propergol pour les missions suivantes.',
          technicalDetails: 'Préserve les réserves de la station Gateway pour les équipages d’Artemis IV.',
          deltas: { fuel: +5, energy: +5, science: +15, comms: -5 },
        },
      ],
    },
  ],

  mars: [
    {
      turnNumber: 1,
      title: 'Insertion Orbitale Martienne (MOI) & Décalage Radio de 14 min',
      narrative:
        'Le satellite aborde Mars à 21 000 km/h. En raison de la distance de 250 millions de kilomètres, chaque instruction transmise depuis la Terre arrive 14.2 minutes en retard.',
      scientificContext: 'Manœuvre de freinage autonome guidée par la centrale inertielle stellaire.',
      options: [
        {
          id: 'ms1-opt1',
          title: 'Allumage autonome programmé du moteur principal bi-ergol',
          description: 'Faire confiance à l’ordinateur de bord pour un freinage de 18 minutes sans confirmation sol.',
          technicalDetails: 'Capture orbitale parfaite, consommation majeure d’ergol de freinage.',
          deltas: { fuel: -30, energy: -5, comms: +10, science: +10 },
        },
        {
          id: 'ms1-opt2',
          title: 'Aérofreinage progressif dans la haute atmosphère de CO2 (Aerobraking)',
          description: 'Faire plonger le satellite dans les couches supérieures pour ralentir par frottement.',
          technicalDetails: 'Économie massive de propergol mais contraintes thermiques extrêmes sur les panneaux.',
          deltas: { fuel: -10, energy: -20, science: +15, comms: -10 },
        },
        {
          id: 'ms1-opt3',
          title: 'Insertion conservatrice sur une orbite elliptique haute',
          description: 'Limiter la décélération pour minimiser les risques matériels immédiats.',
          technicalDetails: 'Conserve le carburant mais dégrade la fréquence de survol du rover Perseverance.',
          deltas: { fuel: -15, science: +5, comms: -15, budget: +5 },
        },
      ],
    },
    {
      turnNumber: 2,
      title: 'Tempête de Poussière Régionale sur Jezero & Perte Optique',
      narrative:
        'L’opacité optique atmosphérique (tau) passe de 0.6 à 2.8. Le ciel martien s’obscurcit totalement au-dessus de Perseverance et les communications optiques sont impossibles.',
      scientificContext: 'Poussières riches en oxydes de fer absorbant le rayonnement solaire et le laser.',
      options: [
        {
          id: 'ms2-opt1',
          title: 'Bascule immédiate sur le transpondeur UHF Electra bande basse',
          description: 'Traverser les nuages de poussière grâce aux ondes radio métriques décimétriques.',
          technicalDetails: 'Débit réduit mais communication garantie avec la station météo MEDA.',
          deltas: { comms: +15, energy: -10, science: +15 },
        },
        {
          id: 'ms2-opt2',
          title: 'Radar à synthèse d’ouverture (SAR) pour percer la tempête',
          description: 'Activer le radar d’imagerie orbitale pour cartographier la progression des grains.',
          technicalDetails: 'Moisson scientifique exceptionnelle sur la dynamique éolienne martienne.',
          deltas: { energy: -22, science: +25, budget: -5 },
        },
        {
          id: 'ms2-opt3',
          title: 'Mise en veille tactique de la charge utile en attendant l’accalmie',
          description: 'Conserver la puissance électrique et limiter l’usure des transpondeurs.',
          technicalDetails: 'Sécurité maximale des réserves, arrêt temporaire de la récolte de données.',
          deltas: { energy: +10, science: -5, comms: -5 },
        },
      ],
    },
    {
      turnNumber: 3,
      title: 'Localisation des Tubes d’Échantillons Déposés (Sample Caches)',
      narrative:
        'Le rover a scellé 10 tubes en titane dans le delta asséché de Jezero. Le satellite doit balayer la surface pour confirmer les balises magnétiques de chaque réceptacle.',
      scientificContext: 'Validation géospatiale pour le futur atterrisseur de récupération (Sample Retrieval Lander).',
      options: [
        {
          id: 'ms3-opt1',
          title: 'Survol rasant à 250 km d’altitude par manœuvre de périgée',
          description: 'Descendre temporairement l’orbite pour photographier les tubes avec la caméra HiRISE.',
          technicalDetails: 'Résolution centimétrique, coût élevé en ergol pour remonter l’orbite ensuite.',
          deltas: { fuel: -20, science: +30, budget: 0 },
        },
        {
          id: 'ms3-opt2',
          title: 'Interrogation radioélectrique autonome depuis l’orbite standard',
          description: 'Capter les puces RFID passives intégrées aux tubes lors de trois passages consécutifs.',
          technicalDetails: 'Opération propre sans impact sur la trajectoire, débit de télémétrie étalé.',
          deltas: { energy: -10, comms: +10, science: +18 },
        },
        {
          id: 'ms3-opt3',
          title: 'Sous-traitance de la confirmation optique à la sonde européenne TGO',
          description: 'Acheter les données de survol de l’orbiteur ExoMars de l’ESA.',
          technicalDetails: 'Dépense financière directe prélevée sur le budget opérationnel NASA/ESA.',
          deltas: { budget: -18, science: +20, fuel: 0 },
        },
      ],
    },
    {
      turnNumber: 4,
      title: 'Conjonction Solaire Martienne (Blackout Radio Complet)',
      narrative:
        'Le Soleil se place directement entre la Terre et Mars pendant 10 jours consécutifs. La couronne solaire ionise et diffuse tout signal radio entre les deux planètes.',
      scientificContext: 'Scintillation plasma coronal rendant les liaisons DSN totalement inopérantes.',
      options: [
        {
          id: 'ms4-opt1',
          title: 'Chargement préalable d’une routine d’intelligence artificielle autonome',
          description: 'Confier la surveillance de Perseverance à un agent d’orchestration embarqué.',
          technicalDetails: 'Exécution parfaite des relevés scientifiques sans aucune aide humaine.',
          deltas: { energy: -15, science: +22, comms: -15 },
        },
        {
          id: 'ms4-opt2',
          title: 'Mode hibernation sécurisé et extinction des émetteurs radio',
          description: 'Stopper toute émission pour ne pas risquer de corruption logicielle par échos parasites.',
          technicalDetails: 'Zéro dépense d’énergie, pas de science collectée durant le silence radio.',
          deltas: { energy: +12, science: 0, comms: -20 },
        },
        {
          id: 'ms4-opt3',
          title: 'Tentative d’émission à puissance de crête avec codage de parité lourd',
          description: 'Tenter de forcer le passage à travers le plasma avec 100 Watts RF.',
          technicalDetails: 'Surchauffe sévère des amplificateurs, rentabilité du signal très faible.',
          deltas: { energy: -25, budget: -10, comms: +5, science: +5 },
        },
      ],
    },
    {
      turnNumber: 5,
      title: 'Dégradation des Cellules Photovoltaïques par Tempêtes Éoliennes',
      narrative:
        'Les micro-particules de poussière en suspension ont déposé une fine pellicule d’oxyde sur les photopiles. Le rendement des générateurs solaires chute de 28%.',
      scientificContext: 'Chute du courant de court-circuit (Isc) par obscurcissement des couches anti-reflet.',
      options: [
        {
          id: 'ms5-opt1',
          title: 'Manœuvre de vibration mécanique par impulsion des roues de réaction',
          description: 'Créer une résonance vibratoire contrôlée pour déloger la poussière accumulée.',
          technicalDetails: 'Améliore la transparence optique des cellules au prix d’un stress mécanique structurel.',
          deltas: { energy: +15, fuel: -8, budget: -5 },
        },
        {
          id: 'ms5-opt2',
          title: 'Reconfiguration du profil de consommation de la charge utile',
          description: 'Espacer les passes de communication et ne chauffer que les réservoirs d’hydrazine.',
          technicalDetails: 'Adapte le satellite à sa nouvelle puissance disponible sans risque matériel.',
          deltas: { energy: +5, science: -8, comms: -5 },
        },
        {
          id: 'ms5-opt3',
          title: 'Optimisation de la trajectoire d’ensoleillement maximal',
          description: 'Consommer du gaz d’attitude pour incliner constamment le satellite vers le zénith solaire.',
          technicalDetails: 'Rendement électrique stabilisé au détriment de la réserve propulsive.',
          deltas: { fuel: -16, energy: +18, science: +5 },
        },
      ],
    },
    {
      turnNumber: 6,
      title: 'Synchronisation du Véhicule d’Ascent Martien (MAV)',
      narrative:
        'La fusée MAV prépare son lancement depuis Jezero pour placer le conteneur d’échantillons (OS) en orbite. La fenêtre de rendez-vous optique ne dure que 4 minutes.',
      scientificContext: 'Premier décollage d’une fusée depuis la surface d’une autre planète.',
      options: [
        {
          id: 'ms6-opt1',
          title: 'Guidage radio Doppler en boucle fermée ultra-précis',
          description: 'Verrouiller le transpondeur sur la balise du MAV dès l’allumage du premier étage.',
          technicalDetails: 'Garantit l’interception orbitale, monopolise 100% de la puissance de calcul.',
          deltas: { energy: -20, comms: +25, science: +25 },
        },
        {
          id: 'ms6-opt2',
          title: 'Poursuite optique passive grand angle',
          description: 'Utiliser les caméras de navigation stellaire pour repérer l’échappement lumineux.',
          technicalDetails: 'Consommation électrique minimale, précision de rendez-vous moyenne.',
          deltas: { energy: -5, science: +12, fuel: -5 },
        },
        {
          id: 'ms6-opt3',
          title: 'Mobilisation d’urgence des stations DSN terrestres en duplex continu',
          description: 'Louer les 3 antennes de 70 mètres mondiales pour un maillage sans faille.',
          technicalDetails: 'Facture financière très élevée sur le programme d’exploration martienne.',
          deltas: { budget: -25, comms: +30, science: +20 },
        },
      ],
    },
    {
      turnNumber: 7,
      title: 'Capture et Confinement du Conteneur d’Échantillons (OS)',
      narrative:
        'Le conteneur en titane de la taille d’un ballon de basket flotte sur l’orbite martienne. Le système de capture mécanique (Capture, Containment & Return System) doit le saisir.',
      scientificContext: 'Protection planétaire stricte de catégorie V (Restricted Earth Return).',
      options: [
        {
          id: 'ms7-opt1',
          title: 'Capture cinématique au panier mécanique et soudure au laser',
          description: 'Fermer les mâchoires en fibre de carbone et sceller hermétiquement la double paroi.',
          technicalDetails: 'Confinement biologique certifié NASA/ESA, appel de courant intense sur le banc laser.',
          deltas: { energy: -22, science: +35, budget: 0 },
        },
        {
          id: 'ms7-opt2',
          title: 'Approche micrométrique avec correction aux gaz froids',
          description: 'Effectuer 12 passes d’alignement successives avant d’engager la pince de capture.',
          technicalDetails: 'Consommation drastique d’ergol mais sécurité absolue contre tout choc orbital.',
          deltas: { fuel: -25, energy: -8, science: +20, comms: +10 },
        },
        {
          id: 'ms7-opt3',
          title: 'Capture magnétique assistée par électroaimants',
          description: 'Activer le champ magnétique de guidage pour attirer le cerclage ferreux du conteneur.',
          technicalDetails: 'Opération fluide, risque mineur de décalage des senseurs magnétiques de bord.',
          deltas: { energy: -15, comms: -5, science: +25 },
        },
      ],
    },
    {
      turnNumber: 8,
      title: 'Injection de Trajectoire de Retour vers la Terre (TEI)',
      narrative:
        'Le satellite doit allumer son propulseur principal pour quitter la gravité martienne et amorcer le voyage retour vers la Terre. La réserve d’ergol restante décidera de la trajectoire.',
      scientificContext: 'Trans-Earth Injection : fenêtre orbitale de transfert de Hohmann héliocentrique.',
      options: [
        {
          id: 'ms8-opt1',
          title: 'Allumage complet pour injection directe à vitesse maximale (6 mois de vol)',
          description: 'Brûler tout le carburant disponible pour sécuriser un retour express vers l’atmosphère terrestre.',
          technicalDetails: 'Triomphe scientifique historique, épuisement intégral des réservoirs propulsifs.',
          deltas: { fuel: -35, science: +40, budget: +10 },
        },
        {
          id: 'ms8-opt2',
          title: 'Trajectoire économique d’assistance gravitationnelle par Vénus',
          description: 'Conserver 20% d’ergol pour des corrections de mi-course futures.',
          technicalDetails: 'Augmente la durée du vol de 11 mois mais préserve la manœuvrabilité du satellite.',
          deltas: { fuel: -18, energy: -10, science: +25, comms: +5 },
        },
        {
          id: 'ms8-opt3',
          title: 'Attente d’une fenêtre de tir assistée par les propulseurs ioniques auxiliaires',
          description: 'Accélérer progressivement par poussée électrique continue sur 90 jours.',
          technicalDetails: 'Budget et ergol préservés, exploitation continue des accumulateurs solaires.',
          deltas: { energy: -25, fuel: -10, budget: -10, science: +28 },
        },
      ],
    },
  ],
};
