import React, { useState, useMemo } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { FoodCategoryTabs, MainMenuMode, DietFilter } from './FoodCategoryTabs';
import { FoodCard } from './FoodCard';
import { DessertCard } from './DessertCard';
import {
  FOOD_ITEMS,
  DESSERT_ITEMS,
  FoodItem,
  DessertItem,
} from '../../data/cateringData';

interface FoodDessertMenuProps {
  selectedFoodIds: string[];
  selectedDessertIds: string[];
  onToggleFoodItem: (item: FoodItem) => void;
  onToggleDessertItem: (item: DessertItem) => void;
  onViewCustomMenu?: () => void;
}

export const FoodDessertMenu: React.FC<FoodDessertMenuProps> = ({
  selectedFoodIds,
  selectedDessertIds,
  onToggleFoodItem,
  onToggleDessertItem,
  onViewCustomMenu,
}) => {
  const [activeMode, setActiveMode] = useState<MainMenuMode>('food');
  const [activeFoodCategory, setActiveFoodCategory] = useState<string>('all');
  const [activeDessertCategory, setActiveDessertCategory] = useState<string>('all');
  const [activeDiet, setActiveDiet] = useState<DietFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter food items
  const filteredFoodItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // 1. Category Filter
      if (activeFoodCategory !== 'all' && item.category !== activeFoodCategory) {
        return false;
      }

      // 2. Diet Filter
      if (activeDiet === 'veg') {
        if (item.diet === 'non-veg') return false;
      } else if (activeDiet === 'non-veg') {
        if (item.diet !== 'non-veg') return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCuisine = item.cuisine.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCuisine && !matchesDesc) return false;
      }

      return true;
    });
  }, [activeFoodCategory, activeDiet, searchQuery]);

  // Filter dessert items
  const filteredDessertItems = useMemo(() => {
    return DESSERT_ITEMS.filter((item) => {
      // 1. Category Filter
      if (activeDessertCategory !== 'all' && item.category !== activeDessertCategory) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesType = item.type.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesType && !matchesDesc) return false;
      }

      return true;
    });
  }, [activeDessertCategory, searchQuery]);

  const totalSelectedCount = selectedFoodIds.length + selectedDessertIds.length;

  return (
    <section
      id="food-dessert-menu-explorer"
      className="saathi-food-dessert-menu"
      style={{
        padding: 'clamp(var(--space-12), 5vw, var(--space-16)) 0',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Menu Explorer"
          title="Food & Dessert Menu Explorer"
          subtitle="Discover hand-crafted regional specialties, royal charcoal tandoor starters, slow-simmered dum courses, and artisanal French pastries. Select items to customize your celebration menu."
        />

        {/* Filter Navigation Tabs */}
        <FoodCategoryTabs
          activeMode={activeMode}
          onModeChange={setActiveMode}
          activeFoodCategory={activeFoodCategory}
          onFoodCategoryChange={setActiveFoodCategory}
          activeDessertCategory={activeDessertCategory}
          onDessertCategoryChange={setActiveDessertCategory}
          activeDiet={activeDiet}
          onDietChange={setActiveDiet}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedItemsCount={totalSelectedCount}
          onViewCustomMenu={onViewCustomMenu}
        />

        {/* Food Grid View */}
        {activeMode === 'food' && (
          <div>
            {filteredFoodItems.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {filteredFoodItems.map((item) => {
                  const isSelected = selectedFoodIds.includes(item.id);
                  return (
                    <FoodCard
                      key={item.id}
                      item={item}
                      isSelected={isSelected}
                      onToggleSelect={onToggleFoodItem}
                    />
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-12) var(--space-4)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  No dishes found matching your criteria
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Try adjusting your search query, category, or dietary filter.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Desserts Grid View */}
        {activeMode === 'desserts' && (
          <div>
            {filteredDessertItems.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {filteredDessertItems.map((item) => {
                  const isSelected = selectedDessertIds.includes(item.id);
                  return (
                    <DessertCard
                      key={item.id}
                      item={item}
                      isSelected={isSelected}
                      onToggleSelect={onToggleDessertItem}
                    />
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-12) var(--space-4)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  No desserts found matching your search
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Try selecting a different dessert category or clearing the search query.
                </p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};
