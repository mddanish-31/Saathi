"use client";

import React from 'react';

interface BotanicalAccentProps {
  className?: string;
  variant?: 'divider' | 'corner' | 'branch';
}

export const BotanicalAccent: React.FC<BotanicalAccentProps> = ({
  className = '',
  variant = 'divider',
}) => {
  if (variant === 'corner') {
    return (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none text-[var(--text-primary)] opacity-[0.06] ${className}`}
        aria-hidden="true"
      >
        <path
          d="M10 110 C 30 70, 70 30, 110 10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M50 70 C 45 55, 60 50, 65 60 C 60 65, 52 68, 50 70"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M75 45 C 70 30, 85 25, 90 35 C 85 40, 77 43, 75 45"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M30 90 C 25 80, 35 75, 40 82 C 36 86, 32 88, 30 90"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === 'branch') {
    return (
      <svg
        width="80"
        height="160"
        viewBox="0 0 80 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none text-[var(--text-primary)] opacity-[0.06] ${className}`}
        aria-hidden="true"
      >
        <path
          d="M40 10 C 40 60, 42 110, 40 150"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M40 40 C 55 35, 65 42, 60 52 C 50 52, 43 45, 40 40"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M40 75 C 25 70, 15 78, 20 88 C 30 88, 37 80, 40 75"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M40 110 C 55 105, 65 112, 60 122 C 50 122, 43 115, 40 110"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
    );
  }

  // Default: subtle section divider
  return (
    <div className={`flex items-center justify-center my-12 pointer-events-none select-none ${className}`}>
      <svg
        width="160"
        height="24"
        viewBox="0 0 160 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--text-primary)] opacity-[0.08]"
        aria-hidden="true"
      >
        <line x1="10" y1="12" x2="65" y2="12" stroke="currentColor" strokeWidth="0.75" />
        <path
          d="M68 12 C 74 6, 82 6, 88 12 C 82 18, 74 18, 68 12"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="80" cy="12" r="1.5" fill="currentColor" />
        <line x1="95" y1="12" x2="150" y2="12" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    </div>
  );
};
