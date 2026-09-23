import React from 'react';
import { Search, MapPin, SlidersHorizontal, RotateCcw } from 'lucide-react';

export interface FilterState {
  search: string;
  city: string;
  budget: string;
  minExperience: number;
  sortBy: 'rating' | 'experience' | 'name';
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
  availableCities?: string[];
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  availableCities = ['All Cities', 'Mumbai', 'Udaipur', 'Jaipur', 'Delhi NCR', 'Bengaluru', 'Pune', 'Goa', 'Chennai'],
  className = '',
}) => {
  const isFiltered =
    Boolean(filters.search.trim()) ||
    filters.city !== 'All Cities' ||
    filters.budget !== 'All' ||
    filters.minExperience > 0 ||
    filters.sortBy !== 'rating';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, city: e.target.value });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, budget: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] });
  };

  const selectStyle: React.CSSProperties = {
    padding: '0.55rem 0.85rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-default)',
    color: 'var(--text-primary)',
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
  };

  return (
    <div
      className={`saathi-filter-bar ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface-soft)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-5)',
        marginBottom: 'var(--space-8)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
        }}
      >
        {/* Search Bar Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '0 0.75rem',
            minWidth: '240px',
            flex: '1 1 240px',
            height: '38px',
          }}
        >
          <Search size={15} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by name, brand, or specialty..."
            value={filters.search}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        {/* Dropdown Filters Group */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          {/* City Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              value={filters.city}
              onChange={handleCityChange}
              style={selectStyle}
              aria-label="Filter by city"
            >
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range Filter */}
          <select
            value={filters.budget}
            onChange={handleBudgetChange}
            style={selectStyle}
            aria-label="Filter by budget"
          >
            <option value="All">All Budgets</option>
            <option value="under-2l">Under ₹2 Lakhs</option>
            <option value="2l-5l">₹2L - ₹5 Lakhs</option>
            <option value="5l-15l">₹5L - ₹15 Lakhs</option>
            <option value="above-15l">₹15 Lakhs & Above</option>
          </select>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SlidersHorizontal size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              style={selectStyle}
              aria-label="Sort specialists"
            >
              <option value="rating">Top Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Reset Action */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'transparent',
                border: '1px dashed var(--border-strong)',
                color: 'var(--saathi-maroon)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Sub-row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--space-3)',
          paddingTop: 'var(--space-2)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
        }}
      >
        <span>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{totalResults}</strong> curated planning & coordination specialists
        </span>
        {filters.city !== 'All Cities' && (
          <span style={{ color: 'var(--saathi-maroon)', fontWeight: 500 }}>
            Filtered by: {filters.city}
          </span>
        )}
      </div>
    </div>
  );
};
