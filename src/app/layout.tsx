import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Space Mission Director | NASA Space Apps Challenge 2026',
  description:
    'Simulateur tactique d’ingénierie spatiale au tour par tour (8 tours). Incarnez un Directeur de Mission de la NASA et gérez les ressources critiques de votre satellite.',
  keywords: [
    'NASA',
    'Space Apps Challenge',
    'Satellite',
    'PACE',
    'Artemis Gateway',
    'Mars Sample Return',
    'Serious Game',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#0B1020] text-slate-100 antialiased selection:bg-[#22D3EE]/30 selection:text-white">
        {/* Fond stellaire interactif Canvas */}
        <StarfieldBackground />

        {/* Contenu principal de l'application */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
