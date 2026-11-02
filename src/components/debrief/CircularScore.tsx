'use client';

import React from 'react';

interface CircularScoreProps {
  score: number; // 0 à 100
  isGameOver?: boolean;
}

/**
 * Grand Score Circulaire avec anneau néon cyan
 * Respecte l'exigence : Score / 100 avec anneau néon cyan.
 */
export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  isGameOver = false,
}) => {
  const radius = 72;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const ringColor = isGameOver ? '#EF4444' : '#22D3EE';
  const shadowGlow = isGameOver
    ? 'drop-shadow(0 0 16px rgba(239, 68, 68, 0.7))'
    : 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.6))';

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
        style={{ filter: shadowGlow }}
      >
        {/* Cercle d'arrière-plan neutre */}
        <circle
          stroke="#1E293B"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Anneau Néon Cyan dynamique */}
        <circle
          stroke={ringColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Valeur textuelle au centre de l'anneau */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span
          className="font-space text-4xl sm:text-5xl font-black tracking-tight"
          style={{ color: ringColor }}
        >
          {score}
        </span>
        <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          / 100 PTS
        </span>
      </div>
    </div>
  );
};
