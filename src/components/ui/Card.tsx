import React from 'react';

interface CardProps {
  children: React.ReactNode;
  elevation?: 'flat' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 'sm',
  padding = 'md',
  interactive = false,
  className = '',
  onClick,
  style,
}) => {
  const paddingMap = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)',
  };

  const shadowMap = {
    flat: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  };

  return (
    <div
      className={`saathi-card ${interactive ? 'hover-lift hover-glow' : ''} ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: paddingMap[padding],
        boxShadow: shadowMap[elevation],
        cursor: interactive ? 'pointer' : 'default',
        transition: 'all var(--transition-normal)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
