import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface LogoProps {
  variant?: 'full' | 'mark';
  layout?: 'horizontal' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * SAATHI Brand Text Identifier (Pure Text Typography, No Graphic Logo).
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  onClick,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fontSizes = {
    sm: '1.25rem',
    md: '1.5rem',
    lg: '2.25rem',
    xl: '2.75rem',
  };

  return (
    <span
      className={`saathi-brand-text ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
        fontSize: fontSizes[size] || '1.5rem',
        fontWeight: 700,
        color: isDark ? '#FAF6F3' : '#4E354F',
        letterSpacing: '-0.02em',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        display: 'inline-block',
        lineHeight: 1,
      }}
      aria-label="Saathi"
    >
      Saathi
    </span>
  );
};
