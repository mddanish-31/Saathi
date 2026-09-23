import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Professional } from '../../types';
import { ProfessionalCard } from './ProfessionalCard';
import { Button } from '../ui/Button';

interface ProfessionalGridProps {
  professionals: Professional[];
  onViewProfile: (pro: Professional) => void;
  onEnquire: (pro: Professional) => void;
  onResetFilters?: () => void;
  className?: string;
}

export const ProfessionalGrid: React.FC<ProfessionalGridProps> = ({
  professionals,
  onViewProfile,
  onEnquire,
  onResetFilters,
  className = '',
}) => {
  if (professionals.length === 0) {
    return (
      <div
        className="animate-fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) var(--space-4)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px dashed var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          margin: 'var(--space-6) 0',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--saathi-nude-tint)',
            color: 'var(--saathi-maroon)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-4)',
          }}
        >
          <SearchX size={26} />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--text-headings)',
            marginBottom: 'var(--space-2)',
          }}
        >
          No Specialists Match Your Criteria
        </h3>

        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
          }}
        >
          Try loosening your city, price, or search criteria to explore more wedding planning and coordination specialists across India.
        </p>

        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw size={14} />}
            onClick={onResetFilters}
          >
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`saathi-professional-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 'var(--space-6)',
      }}
    >
      {professionals.map((pro) => (
        <ProfessionalCard
          key={pro.id}
          professional={pro}
          onViewProfile={onViewProfile}
          onEnquire={onEnquire}
        />
      ))}
    </div>
  );
};
