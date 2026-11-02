'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'green' | 'orange' | 'red' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/15 text-[#22D3EE] border-cyan-500/30',
    green: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    orange: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
    red: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
    slate: 'bg-slate-800/60 text-slate-400 border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
