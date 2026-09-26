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
  variant = 'full',
  layout = 'horizontal',
  size = 'md',
  showTagline = true,
  animated = false,
  className = '',
  asLink = true,
  onClick,
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg', tag: 'text-[9px]' },
    md: { icon: 32, text: 'text-xl', tag: 'text-[10px]' },
    lg: { icon: 40, text: 'text-2xl', tag: 'text-[11px]' },
    hero: { icon: 56, text: 'text-4xl md:text-5xl', tag: 'text-xs md:text-sm' },
  };

  const { icon, text, tag } = sizeMap[size];
  const isStacked = layout === 'stacked';
  const showText = variant !== 'mark';

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
      className={`inline-flex ${isStacked ? 'flex-col items-center text-center gap-2' : 'items-center gap-2.5'} select-none ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* S∞ Infinity Loop Mark */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-200"
        aria-hidden="true"
      >
        {/* Subtle decorative background circle */}
        <circle
          cx="24"
          cy="24"
          r="22"
          className="stroke-[var(--border)]"
          strokeWidth="1"
          fill="none"
        />

        {/* Elegant Infinity-S curve */}
        <path
          d="M14 28C11 25 11 20 14 17C17 14 21 15 24 24C27 33 31 34 34 31C37 28 37 23 34 20C31 17 27 18 24 24"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'saathi-infinity-draw' : ''}
          style={{
            strokeDasharray: animated ? 160 : 'none',
            strokeDashoffset: animated ? 160 : 0,
            animation: animated ? 'saathiStrokeDraw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
          }}
        />

        {/* Center intersection dot */}
        <circle
          cx="24"
          cy="24"
          r="1.8"
          fill="var(--accent)"
          className="transition-opacity duration-300"
        />
      </svg>

      {/* Typography: Wordmark + Tagline */}
      {showText && (
        <div className={`flex flex-col justify-center leading-tight ${isStacked ? 'items-center' : ''}`}>
          <div className="flex items-baseline gap-1">
            <span
              className={`font-heading font-semibold tracking-tight text-[var(--text-primary)] ${text}`}
            >
              Saathi
            </span>
            <span className="text-[var(--accent)] font-semibold text-xs leading-none">
              ∞
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-body uppercase tracking-[0.16em] text-[var(--text-muted)] font-medium ${tag}`}
            >
              Simpler 2 Gather
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink && !onClick) {
    return (
      <Link href="/" className="inline-block transition-opacity hover:opacity-90" aria-label="Saathi — Home">
        {content}
      </Link>
    );
  }

  return content;
};
