'use client';

import React, { useEffect, useRef } from 'react';
import { MissionId } from '@/types/game';

interface PlanetVisualizerProps {
  missionId: MissionId;
  turnNumber: number;
}

/**
 * Visualiseur de planète et d'orbite satellite 100% Canvas
 * Dessine la sphère planétaire animée (Terre, Lune ou Mars) avec halo atmosphérique,
 * trajectoire orbitale elliptique et satellite balise en mouvement.
 */
export const PlanetVisualizer: React.FC<PlanetVisualizerProps> = ({
  missionId,
  turnNumber,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let satAngle = (turnNumber * Math.PI) / 4; // position orbitale influencée par le tour

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const planetRadius = Math.min(width, height) * 0.28;

      angle += 0.003;
      satAngle += 0.012;

      // 1. Halo atmosphérique externe
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        planetRadius * 0.9,
        centerX,
        centerY,
        planetRadius * 1.35
      );

      if (missionId === 'earth') {
        glowGradient.addColorStop(0, 'rgba(34, 211, 238, 0.45)');
        glowGradient.addColorStop(0.7, 'rgba(14, 165, 233, 0.15)');
        glowGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      } else if (missionId === 'moon') {
        glowGradient.addColorStop(0, 'rgba(203, 213, 225, 0.35)');
        glowGradient.addColorStop(0.7, 'rgba(148, 163, 184, 0.1)');
        glowGradient.addColorStop(1, 'rgba(148, 163, 184, 0)');
      } else {
        glowGradient.addColorStop(0, 'rgba(249, 115, 22, 0.45)');
        glowGradient.addColorStop(0.7, 'rgba(239, 68, 68, 0.15)');
        glowGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      }

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Tracé de l'ellipse orbitale
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.35); // inclinaison de l'orbite
      ctx.beginPath();
      ctx.ellipse(0, 0, planetRadius * 1.55, planetRadius * 0.75, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Calcul de la position du satellite sur l'orbite
      const satX = Math.cos(satAngle) * (planetRadius * 1.55);
      const satY = Math.sin(satAngle) * (planetRadius * 0.75);

      // Traînée orbitale
      ctx.beginPath();
      ctx.arc(satX, satY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pulse radioélectrique émis par le satellite
      ctx.beginPath();
      ctx.arc(satX, satY, 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // 4. Disque Planétaire avec éclairage 3D
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
      ctx.clip();

      // Couleurs de surface et ombrage hémisphérique
      const planetGradient = ctx.createRadialGradient(
        centerX - planetRadius * 0.4,
        centerY - planetRadius * 0.4,
        planetRadius * 0.1,
        centerX,
        centerY,
        planetRadius
      );

      if (missionId === 'earth') {
        planetGradient.addColorStop(0, '#38BDF8');
        planetGradient.addColorStop(0.4, '#0284C7');
        planetGradient.addColorStop(0.8, '#0369A1');
        planetGradient.addColorStop(1, '#070D1F');
      } else if (missionId === 'moon') {
        planetGradient.addColorStop(0, '#E2E8F0');
        planetGradient.addColorStop(0.4, '#94A3B8');
        planetGradient.addColorStop(0.8, '#475569');
        planetGradient.addColorStop(1, '#0F172A');
      } else {
        planetGradient.addColorStop(0, '#FB923C');
        planetGradient.addColorStop(0.4, '#EA580C');
        planetGradient.addColorStop(0.8, '#C2410C');
        planetGradient.addColorStop(1, '#1A0604');
      }

      ctx.fillStyle = planetGradient;
      ctx.fill();

      // Nuages / Motifs de surface en rotation
      ctx.fillStyle = missionId === 'earth' ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.12)';
      for (let i = 0; i < 4; i++) {
        const cloudY = centerY - planetRadius * 0.6 + i * (planetRadius * 0.4);
        const shiftX = Math.sin(angle + i) * (planetRadius * 0.5);
        ctx.beginPath();
        ctx.ellipse(
          centerX + shiftX,
          cloudY,
          planetRadius * 0.7,
          planetRadius * 0.12,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Ombre portée nocturne (terminateur)
      const shadowGrad = ctx.createLinearGradient(
        centerX - planetRadius,
        centerY,
        centerX + planetRadius,
        centerY
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.65, 'rgba(11, 16, 32, 0.4)');
      shadowGrad.addColorStop(1, 'rgba(11, 16, 32, 0.95)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(centerX - planetRadius, centerY - planetRadius, planetRadius * 2, planetRadius * 2);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [missionId, turnNumber]);

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] rounded-xl overflow-hidden bg-[#0B1020]/80 border border-[#1E293B] shadow-inner flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
