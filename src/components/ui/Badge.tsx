import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'nude' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  className = '',
  icon,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'brand':
        return {
          backgroundColor: 'var(--saathi-nude-tint)',
          color: 'var(--saathi-maroon)',
          border: '1px solid var(--border-subtle)',
        };
      case 'nude':
        return {
          backgroundColor: 'rgba(210, 179, 167, 0.2)',
          color: 'var(--text-headings)',
          border: '1px solid var(--saathi-nude)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-default)',
        };
      case 'neutral':
      default:
        return {
          backgroundColor: 'var(--bg-surface-soft)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-subtle)',
        };
    }
  };

  return (
    <span
      className={`saathi-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: size === 'sm' ? '0.22rem 0.65rem' : '0.32rem 0.9rem',
        fontSize: size === 'sm' ? 'var(--text-xs)' : '0.78125rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-full)',
        lineHeight: 1,
        transition: 'all var(--transition-fast)',
        ...getVariantStyles(),
      }}
    >
      {icon && <span style={{ display: 'inline-flex', fontSize: '0.85em' }}>{icon}</span>}
      {children}
    </span>
  );
};
