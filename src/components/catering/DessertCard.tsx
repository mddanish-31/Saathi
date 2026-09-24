import React from 'react';
import { Plus, Check, Sparkles } from 'lucide-react';
import { DessertItem } from '../../data/cateringData';

interface DessertCardProps {
  item: DessertItem;
  isSelected: boolean;
  onToggleSelect: (item: DessertItem) => void;
}

export const DessertCard: React.FC<DessertCardProps> = ({
  item,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <div
      className="saathi-dessert-card hover-lift"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-xl)',
        border: isSelected
          ? '2px solid var(--saathi-maroon)'
          : '1px solid var(--border-subtle)',
        boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transition: 'all var(--transition-normal)',
        position: 'relative',
      }}
    >
      {/* Top Image Banner */}
      <div
        style={{
          position: 'relative',
          height: '160px',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-surface-soft)',
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(24, 14, 23, 0.6) 0%, transparent 60%)',
          }}
        />

        {/* Dessert Type Tag at top */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(38, 26, 36, 0.82)',
            backdropFilter: 'blur(4px)',
            color: '#FAF6F3',
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {item.type}
        </div>

        {item.isChefSpecial && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'var(--saathi-maroon)',
              color: '#FFFFFF',
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Sparkles size={11} />
            <span>Masterpiece</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: 'var(--space-4)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--text-headings)',
              marginBottom: 'var(--space-1)',
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </h4>

          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              marginBottom: 'var(--space-3)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '32px',
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Price & Add to Menu Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Guide Rate
            </span>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--saathi-maroon)' }}>
              {item.priceIndicator || 'Included in Package'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleSelect(item)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              backgroundColor: isSelected ? 'var(--saathi-maroon)' : 'var(--bg-surface-soft)',
              color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
              borderColor: isSelected ? 'var(--saathi-maroon)' : 'var(--border-default)',
              transition: 'all var(--transition-fast)',
            }}
          >
            {isSelected ? (
              <>
                <Check size={12} />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus size={12} />
                <span>Add Dessert</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
