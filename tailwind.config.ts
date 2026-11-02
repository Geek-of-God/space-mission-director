import type { Config } from "tailwindcss";

/**
 * Configuration Tailwind CSS - Space Mission Director (NASA Space Apps 2026)
 * Respecte strictement la charte graphique avionique imposée :
 * - Fond : #0B1020
 * - Surface cartes : #121A30 (Bordure : #1E293B)
 * - Accentuation principale : Cyan #22D3EE
 * - Code sémantique avionique : Vert #10B981, Orange #F59E0B, Rouge #EF4444
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: "#0B1020",       // Fond d'écran principal cockpit
          surface: "#121A30",    // Surface des cartes de contrôle
          border: "#1E293B",     // Bordure technique discrète
          cyan: "#22D3EE",       // Couleur principale d'action & néon HUD
          green: "#10B981",      // Nominal / Succès (> 50%)
          orange: "#F59E0B",     // Vigilance / Compromis (20% à 50%)
          red: "#EF4444",        // Alerte critique / Danger (< 20%)
          muted: "#94A3B8",      // Textes secondaires et labels
        },
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "cyan-glow": "0 0 20px -3px rgba(34, 211, 238, 0.45)",
        "red-glow": "0 0 25px 2px rgba(239, 68, 68, 0.6)",
        "green-glow": "0 0 20px -3px rgba(16, 185, 129, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "red-alert": "redAlert 1.5s ease-in-out infinite",
        "orbit-rotate": "spin 40s linear infinite",
      },
      keyframes: {
        redAlert: {
          "0%, 100%": {
            borderColor: "rgba(239, 68, 68, 1)",
            boxShadow: "0 0 25px 4px rgba(239, 68, 68, 0.65)",
          },
          "50%": {
            borderColor: "rgba(239, 68, 68, 0.35)",
            boxShadow: "0 0 10px 1px rgba(239, 68, 68, 0.2)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
