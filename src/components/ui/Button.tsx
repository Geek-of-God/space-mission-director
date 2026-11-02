'use client';

import React from 'react';
import { sounds } from '@/lib/sounds';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    sounds.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-space font-bold rounded-lg transition-all duration-200 uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed select-none focus:outline-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  const variantStyles = {
    primary:
      'bg-[#22D3EE] text-[#0B1020] hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] active:scale-[0.98]',
    secondary:
      'bg-[#121A30] text-slate-200 border border-[#1E293B] hover:border-[#22D3EE]/50 hover:bg-slate-800 active:scale-[0.98]',
    danger:
      'bg-[#EF4444] text-white hover:bg-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-[0.98]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
