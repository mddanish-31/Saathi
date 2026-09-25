import React from 'react';
import { Image as ImageIcon, LucideIcon } from 'lucide-react';

export interface ImagePlaceholderProps {
  aspectRatio?: string;
  width?: string | number;
  height?: string | number;
  label?: string;
  sublabel?: string;
  icon?: LucideIcon;
  variant?: 'card' | 'gallery' | 'hero' | 'banner' | 'avatar' | 'compact' | 'default';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  aspectRatio,
  width = '100%',
  height = '100%',
  label,
  sublabel,
  icon: CustomIcon,
  variant = 'default',
  className = '',
  style = {},
  ariaLabel,
}) => {
  const IconComponent = CustomIcon || ImageIcon;

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          iconSize: 32,
          iconWrapperSize: 56,
          fontSize: 'var(--text-sm)',
          defaultLabel: label || 'Curated Occasion Imagery',
        };
      case 'banner':
        return {
          iconSize: 28,
          iconWrapperSize: 50,
          fontSize: 'var(--text-xs)',
          defaultLabel: label || 'Specialist Showcase',
        };
      case 'gallery':
        return {
          iconSize: 24,
          iconWrapperSize: 44,
          fontSize: 'var(--text-xs)',
          defaultLabel: label || 'Portfolio Showcase',
        };
      case 'card':
        return {
          iconSize: 20,
          iconWrapperSize: 38,
          fontSize: '0.7rem',
          defaultLabel: label || 'Showcase Visual',
        };
      case 'compact':
        return {
          iconSize: 16,
          iconWrapperSize: 30,
          fontSize: '0.65rem',
          defaultLabel: label || '',
        };
      case 'avatar':
        return {
          iconSize: 18,
          iconWrapperSize: 36,
          fontSize: '0.65rem',
          defaultLabel: '',
        };
      case 'default':
      default:
        return {
          iconSize: 22,
          iconWrapperSize: 40,
          fontSize: 'var(--text-xs)',
          defaultLabel: label || 'Media Showcase',
        };
    }
  };

  const { iconSize, iconWrapperSize, fontSize, defaultLabel } = getVariantStyles();

  return (
    <div
      className={`saathi-image-placeholder ${className}`}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel || defaultLabel || 'Image placeholder'}
      style={{
        width,
        height,
        aspectRatio,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-surface-soft)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'inherit',
        color: 'var(--text-muted)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        padding: 'var(--space-3)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        style={{
          width: `${iconWrapperSize}px`,
          height: `${iconWrapperSize}px`,
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--saathi-maroon)',
          boxShadow: 'var(--shadow-sm)',
          flexShrink: 0,
          marginBottom: defaultLabel ? 'var(--space-2)' : 0,
        }}
      >
        <IconComponent size={iconSize} />
      </div>

      {defaultLabel && (
        <span
          style={{
            fontSize,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          {defaultLabel}
        </span>
      )}

      {sublabel && (
        <span
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            marginTop: '2px',
            textAlign: 'center',
          }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
};
