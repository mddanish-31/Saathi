import React from 'react';
import { Search } from 'lucide-react';
import { FOOD_CATEGORIES, DESSERT_CATEGORIES } from '../../data/cateringData';

export type MainMenuMode = 'food' | 'desserts';
export type DietFilter = 'all' | 'veg' | 'non-veg';

interface FoodCategoryTabsProps {
  activeMode: MainMenuMode;
  onModeChange: (mode: MainMenuMode) => void;
  activeFoodCategory: string;
  onFoodCategoryChange: (category: string) => void;
  activeDessertCategory: string;
  onDessertCategoryChange: (category: string) => void;
  activeDiet: DietFilter;
  onDietChange: (diet: DietFilter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedItemsCount: number;
  onViewCustomMenu?: () => void;
}

export const FoodCategoryTabs: React.FC<FoodCategoryTabsProps> = ({
  activeMode,
  onModeChange,
  activeFoodCategory,
  onFoodCategoryChange,
  activeDessertCategory,
  onDessertCategoryChange,
  activeDiet,
  onDietChange,
  searchQuery,
  onSearchChange,
  selectedItemsCount,
  onViewCustomMenu,
}) => {
  return (
    <div
      style={{
        marginBottom: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      {/* 1. Top Level Switching: FOOD vs DESSERTS + Selected Cart Indicator */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Master Food / Dessert Segmented Switch */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-surface-soft)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            onClick={() => onModeChange('food')}
            style={{
              padding: '0.55rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeMode === 'food' ? 'var(--btn-primary-bg)' : 'transparent',
              color: activeMode === 'food' ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
              boxShadow: activeMode === 'food' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            Curated Food Menu
          </button>

          <button
            type="button"
            onClick={() => onModeChange('desserts')}
            style={{
              padding: '0.55rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeMode === 'desserts' ? 'var(--btn-primary-bg)' : 'transparent',
              color: activeMode === 'desserts' ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
              boxShadow: activeMode === 'desserts' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            Cakes & Desserts
          </button>
        </div>

        {/* Selected Items Indicator & Quick Link */}
        {selectedItemsCount > 0 && onViewCustomMenu && (
          <button
            type="button"
            onClick={onViewCustomMenu}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--saathi-nude-tint)',
              border: '1px solid var(--saathi-nude)',
              color: 'var(--saathi-maroon)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <span>{selectedItemsCount} Items Selected</span>
            <span style={{ opacity: 0.7 }}>•</span>
            <span style={{ textDecoration: 'underline' }}>Configure Menu</span>
          </button>
        )}
      </div>

      {/* 2. Sub-Category Tabs & Dietary Filter & Search Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
        }}
      >
        {/* Horizontal Category Strip */}
        <div
          className="saathi-tab-strip"
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            paddingBottom: '2px',
            maxWidth: '100%',
          }}
        >
          {activeMode === 'food'
            ? FOOD_CATEGORIES.map((cat) => {
                const isSelected = activeFoodCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onFoodCategoryChange(cat.id)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      backgroundColor: isSelected ? 'var(--saathi-maroon)' : 'var(--bg-surface)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      borderColor: isSelected ? 'var(--saathi-maroon)' : 'var(--border-default)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })
            : DESSERT_CATEGORIES.map((cat) => {
                const isSelected = activeDessertCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onDessertCategoryChange(cat.id)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      backgroundColor: isSelected ? 'var(--saathi-maroon)' : 'var(--bg-surface)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      borderColor: isSelected ? 'var(--saathi-maroon)' : 'var(--border-default)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
        </div>

        {/* Right Side Controls: Diet Filter & Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
          }}
        >
          {/* Dietary Filter (All, Veg, Non-Veg) */}
          {activeMode === 'food' && (
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-default)',
                padding: '2px',
              }}
            >
              <button
                type="button"
                onClick={() => onDietChange('all')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeDiet === 'all' ? 'var(--saathi-maroon)' : 'transparent',
                  color: activeDiet === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => onDietChange('veg')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeDiet === 'veg' ? '#2E7D32' : 'transparent',
                  color: activeDiet === 'veg' ? '#FFFFFF' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: activeDiet === 'veg' ? '#FFFFFF' : '#2E7D32',
                  }}
                />
                Veg
              </button>
              <button
                type="button"
                onClick={() => onDietChange('non-veg')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeDiet === 'non-veg' ? '#C62828' : 'transparent',
                  color: activeDiet === 'non-veg' ? '#FFFFFF' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: activeDiet === 'non-veg' ? '#FFFFFF' : '#C62828',
                  }}
                />
                Non-Veg
              </button>
            </div>
          )}

          {/* Quick Dish Search Bar */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '10px',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder={activeMode === 'food' ? 'Search dishes, kebabs...' : 'Search cakes, mithai...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                padding: '0.38rem 0.85rem 0.38rem 2rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-xs)',
                width: '180px',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
