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
      className={`saathi-category-card hover-lift ${className}`}
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
        padding: 'clamp(var(--space-5), 3vw, var(--space-6))',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        position: 'relative',
        minHeight: '210px',
        boxShadow: 'var(--shadow-sm)',
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
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--saathi-maroon)',
              border: '1px solid var(--border-subtle)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <IconComponent size={22} />
          </div>

          {category.tag && (
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-surface-soft)',
                border: '1px solid var(--border-subtle)',
                padding: '0.2rem 0.65rem',
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
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-headings)',
            marginBottom: 'var(--space-2)',
            lineHeight: 1.25,
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          {category.name}
        </h3>

        {/* Category Description */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
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
          gap: '6px',
          marginTop: 'var(--space-5)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--saathi-maroon)',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
        }}
      >
        <span>Explore Specialists</span>
        <ArrowUpRight size={14} />
      </div>
    </div>
  );
};
