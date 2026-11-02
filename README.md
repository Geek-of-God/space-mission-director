# 🚀 Space Mission Director — NASA Space Apps Challenge 2026

> **Simulateur tactique d'ingénierie spatiale au tour par tour (8 tours) développé pour le NASA Space Apps Challenge 2026.**  
> Incarnez un Directeur de Vol du *NASA Goddard Space Flight Center*, supervisez les ressources critiques de votre satellite et arbitrez face à des dilemmes techniques et alertes scientifiques réelles de la NASA.

---

## 🛰️ 1. Présentation & Règle du Jeu

Dans **Space Mission Director**, vous êtes aux commandes de missions scientifiques emblématiques :
1. **Mission Terre (NASA PACE & Landsat 9)** — *Difficulté Débutant* | Budget : $120M | Orbite LEO Héliosynchrone 705 km.
2. **Mission Lune (Artemis Gateway & PPE)** — *Difficulté Intermédiaire* | Budget : $280M | Orbite NRHO Polaire (cratère Shackleton).
3. **Mission Mars (Mars Sample Return - MSR)** — *Difficulté Expert* | Budget : $500M | Orbite Aréocentrique (délai radio 14 min).

### Le HUD Supérieur et les 5 Ressources Critiques (sur 100)
- 💰 **Budget** : Crédits alloués ($120M, $280M, $500M).
- ⚡ **Énergie** : Puissance électrique en % et Watts (EPS / Panneaux solaires).
- ⛽ **Ergol** : Carburant propulsif en kg pour les manœuvres orbitales.
- 📡 **Comms DSN** : Intégrité du lien radiofréquence avec le *Deep Space Network*.
- 🔬 **Science** : Objectifs scientifiques collectés (de 0 à 100 points).

### Conditions de Fin de Partie
- ❌ **Game Over Immédiat** : Déclenché si l'**Énergie $\le 0$** ou l'**Ergol $\le 0$** (perte totale du satellite).
- 🏁 **Succès de Mission** : Atteint au terme des **8 tours**.
- 🏆 **Formule Officielle du Score Goddard** :
  $$\text{Score} = (\text{Science} \times 0.5) + (\text{Budget} \times 0.3) + (\text{Ergol} \times 0.2)$$

---

## 🎨 2. Charte Graphique & Design Tokens Avioniques

L'interface adopte un style cockpit spatial haute fidélité :
- **Fond d'écran** : Bleu très foncé `#0B1020` (`bg-[#0B1020]`).
- **Surface des cartes** : Bleu nuit `#121A30` avec bordure technique `#1E293B`.
- **Couleur principale d'action** : Cyan électrique `#22D3EE` (boutons CTA, jauges actives, anneau de score).
- **Code couleur sémantique (Avionique)** :
  - 🟢 **Vert (`#10B981`)** : Nominal / Succès / Valeur $> 50\%$
  - 🟠 **Orange (`#F59E0B`)** : Attention / Compromis / Valeur entre $20\%$ et $50\%$
  - 🔴 **Rouge (`#EF4444`)** : Alerte critique / Danger / Valeur $< 20\%$

---

## 📂 3. Données Ouvertes de la NASA (NASA Open Data)

Un dossier dédié regroupe les données réelles exploitées par le simulateur (`src/data/nasa/`) :
- `donki_space_weather.json` : Éjections coronales solaires (CME) et éruptions classe X1.2 issues de **NASA DONKI**.
- `pace_earth_observation.json` : Données du capteur hyperspectral OCI de **NASA PACE** (aérosols et chlorophylle).
- `artemis_gateway_nrho.json` : Paramètres d'orbite résonante NRHO et illumination du cratère Shackleton.
- `mars_perseverance_pds.json` : Télémétrie PDS sol martien (dépôts de tubes, opacité poussière Tau).
- `nasa_satcat_telemetry.json` : Vitesses orbitales ($7.66\text{ km/s}$ Terre, $1.42\text{ km/s}$ Lune) et altitudes réelles.

Les adaptateurs situés dans `src/services/nasa/` font le pont direct entre ces datasets et les mécaniques de vol.

---

## 🖥️ 4. Les 4 Écrans Développés

1. **Écran 1 : Sélection de Mission (`/missions`)** : 3 cartes interactives avec badges de difficulté et sélection cyan lumineuse.
2. **Écran 2 : Mission Control & 8 Tours (`/flight`)** :
   - Split 60% / 40%.
   - Gauche : Planète animée en Canvas (Terre, Lune, Mars) + Boîte de télémétrie en temps réel.
   - Droite : Panneau de décision avec 3 manœuvres et **effet de pulsation en temps réel sur les jauges du HUD au survol**.
3. **Écran 3 : Alerte Spatiale Critique (Modale d'Urgence)** : Modale avec bordure rouge pulsante, badge NASA DONKI classe X1.2 et 3 directives d'arbitrage.
4. **Écran 4 : Rapport de Mission Officiel (`/debrief`)** : Rang honorifique, anneau néon de score circulaire, décomposition en 3 lignes, encart pédagogique NASA et bouton d'export PDF officiel.

---

## 🛠️ 5. Installation et Démarrage Local

```bash
# 1. Se positionner dans le dossier du projet
cd space-mission-director

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement local
npm run dev

# 4. Ouvrir l'application dans votre navigateur
# Rendez-vous sur : http://localhost:3000
```

---

## 🚢 6. Déploiement

Le jeu est **100% Client-Side** et ne nécessite aucun serveur applicatif backend :
- **Vercel** : Connectez votre dépôt GitHub et déployez en 1 clic (Framework Preset: Next.js).
- **Netlify** : Déploiement automatique avec `npm run build`.
- **Export statique / Standalone** : Compatible avec tout hébergeur de fichiers statiques (GitHub Pages, Cloudflare Pages, S3).
