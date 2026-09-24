import React from 'react';
import { Plus, Check, Sparkles } from 'lucide-react';
import { FoodItem } from '../../data/cateringData';

interface FoodCardProps {
  item: FoodItem;
  isSelected: boolean;
  onToggleSelect: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  isSelected,
  onToggleSelect,
}) => {
  const isVeg = item.diet === 'veg' || item.diet === 'vegan' || item.diet === 'jain';

  return (
    <div
      className="saathi-food-card hover-lift"
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

        {/* Dietary Veg/Non-Veg Dot Indicator */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'var(--bg-surface)',
            padding: '3px',
            borderRadius: '4px',
            border: isVeg ? '1.5px solid #2E7D32' : '1.5px solid #C62828',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}
          title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: isVeg ? '50%' : '0',
              backgroundColor: isVeg ? '#2E7D32' : '#C62828',
            }}
          />
        </div>

        {/* Chef Special / Live Counter Badge */}
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
            <span>Chef Special</span>
          </div>
        )}

        {item.liveCounterAvailable && !item.isChefSpecial && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(38, 26, 36, 0.85)',
              backdropFilter: 'blur(4px)',
              color: '#FAF6F3',
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            Live Station
          </div>
        )}

        {/* Cuisine Tag at bottom of image */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '12px',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#FAF6F3',
            textShadow: '0 1px 3px rgba(0,0,0,0.6)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          {item.cuisine}
        </div>
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
                <span>Add to Menu</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
