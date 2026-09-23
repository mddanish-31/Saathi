import React from 'react';
import {
  Sparkles,
  Camera,
  Home,
  Heart,
  Music,
  Briefcase,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';
import { CategoryPreviewItem } from '../../types';

interface CategoryCardProps {
  category: CategoryPreviewItem;
  onClick?: (category: CategoryPreviewItem) => void;
  className?: string;
}

// Icon dictionary for clean mapping
const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Camera,
  Home,
  Heart,
  Music,
  Briefcase,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  className = '',
}) => {
  const IconComponent = (category.iconName && iconMap[category.iconName]) || Sparkles;

  return (
    <div
      className={`saathi-category-card hover-lift hover-glow ${className}`}
      onClick={() => onClick?.(category)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(category);
        }
      }}
      aria-label={`Explore ${category.name}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-6)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        position: 'relative',
        minHeight: '200px',
      }}
    >
      <div>
        {/* Card Header: Icon & Optional Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-4)',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--saathi-maroon)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <IconComponent size={22} />
          </div>

          {category.tag && (
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-surface-soft)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              {category.tag}
            </span>
          )}
        </div>

        {/* Category Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--text-headings)',
            marginBottom: 'var(--space-2)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {category.name}
        </h3>

        {/* Category Description */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {category.description}
        </p>
      </div>

      {/* Card Action Link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: 'var(--space-5)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--saathi-maroon)',
          letterSpacing: '0.02em',
        }}
      >
        <span>Explore Specialists</span>
        <ArrowUpRight size={14} />
      </div>
    </div>
  );
};
