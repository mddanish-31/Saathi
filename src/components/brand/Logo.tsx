"use client";

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'mark';
  layout?: 'horizontal' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
  asLink?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  asLink = true,
  onClick,
}) => {
  const sizeMap = {
    sm: { text: 'text-xl tracking-tight', tag: 'text-[9px]' },
    md: { text: 'text-2xl sm:text-[1.75rem] tracking-tight', tag: 'text-[10px]' },
    lg: { text: 'text-3xl sm:text-4xl tracking-tight', tag: 'text-[11px]' },
    hero: { text: 'text-5xl md:text-6xl tracking-tight', tag: 'text-xs' },
  };

  const { text, tag } = sizeMap[size];

  const content = (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`inline-flex flex-col justify-center select-none ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <span
        className={`font-display font-medium text-[var(--text-primary)] transition-colors duration-200 leading-none ${text}`}
      >
        Saathi
      </span>
      {showTagline && (
        <span
          className={`font-body font-medium uppercase tracking-[0.22em] text-[var(--text-muted)] mt-1 ${tag}`}
        >
          Simpler 2 Gather
        </span>
      )}
    </div>
  );

  if (asLink && !onClick) {
    return (
      <Link
        href="/"
        className="inline-block text-[var(--text-primary)] transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
        aria-label="Saathi — Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
