import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  className = '',
}) => {
  const sizeConfig = {
    sm: {
      iconSize: 14,
      fontSize: 'var(--text-xs)',
      gap: '0.35rem',
      starsGap: '2px',
    },
    md: {
      iconSize: 18,
      fontSize: 'var(--text-sm)',
      gap: '0.45rem',
      starsGap: '3px',
    },
    lg: {
      iconSize: 24,
      fontSize: 'var(--text-base)',
      gap: '0.55rem',
      starsGap: '4px',
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <div
      className={`saathi-rating ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: currentSize.gap,
        lineHeight: 1,
      }}
      aria-label={`Rating: ${value} out of ${maxValue}`}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: currentSize.starsGap,
        }}
      >
        {Array.from({ length: maxValue }, (_, i) => {
          const fillPercentage = Math.max(0, Math.min(100, (value - i) * 100));

          return (
            <span
              key={i}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: `${currentSize.iconSize}px`,
                height: `${currentSize.iconSize}px`,
                flexShrink: 0,
              }}
            >
              {/* Empty / Outline Star */}
              <Star
                size={currentSize.iconSize}
                color="var(--border-default)"
                strokeWidth={1.5}
                style={{ display: 'block' }}
              />

              {/* Filled Star with percentage clip */}
              {fillPercentage > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${fillPercentage}%`,
                    height: '100%',
                    overflow: 'hidden',
                    display: 'inline-flex',
                    pointerEvents: 'none',
                  }}
                >
                  <Star
                    size={currentSize.iconSize}
                    color="var(--saathi-maroon)"
                    fill="var(--saathi-maroon)"
                    strokeWidth={1.5}
                    style={{
                      minWidth: `${currentSize.iconSize}px`,
                      display: 'block',
                      flexShrink: 0,
                    }}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>

      {showValue && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: currentSize.fontSize,
            lineHeight: 1,
          }}
        >
          <span
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            {value.toFixed(1)}
          </span>
          {reviewCount !== undefined && (
            <span
              style={{
                color: 'var(--text-muted)',
                fontWeight: 400,
              }}
            >
              ({reviewCount})
            </span>
          )}
        </span>
      )}
    </div>
  );
};
