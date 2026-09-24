import React, { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CatererCard } from './CatererCard';
import { Professional } from '../../types';
import { CATERERS_DATA } from '../../data/cateringData';

interface CatererListingProps {
  onViewCaterer: (caterer: Professional) => void;
  onEnquire: (caterer: Professional) => void;
}

const CITY_OPTIONS = ['All Cities', 'Delhi NCR', 'Mumbai', 'Ahmedabad', 'Bengaluru', 'Jaipur', 'Goa'];
const CUISINE_FILTER_OPTIONS = ['All Cuisines', 'Awadhi', 'Mughlai', 'Progressive Indian', 'Pure Veg', 'Jain', 'South Indian', 'Pan-Asian', 'French Patisserie'];
const BUDGET_OPTIONS = [
  { label: 'All Budgets', value: 'all' },
  { label: 'Under ₹1,000 / plate', value: 'under-1000' },
  { label: '₹1,000 - ₹2,000 / plate', value: '1000-2000' },
  { label: '₹2,000+ / plate', value: 'above-2000' },
];

export const CatererListing: React.FC<CatererListingProps> = ({
  onViewCaterer,
  onEnquire,
}) => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [cuisine, setCuisine] = useState('All Cuisines');
  const [budget, setBudget] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');

  const handleResetFilters = () => {
    setSearch('');
    setCity('All Cities');
    setCuisine('All Cuisines');
    setBudget('all');
    setSortBy('rating');
  };

  const filteredCaterers = useMemo(() => {
    return CATERERS_DATA.filter((pro) => {
      // 1. City Filter
      if (city !== 'All Cities') {
        const matchesLocation = pro.location.toLowerCase().includes(city.toLowerCase());
        const matchesServed = pro.citiesServed?.some((c) => c.toLowerCase() === city.toLowerCase());
        if (!matchesLocation && !matchesServed) return false;
      }

      // 2. Cuisine Filter
      if (cuisine !== 'All Cuisines') {
        const matchesCuisine = pro.cuisines?.some((c) =>
          c.toLowerCase().includes(cuisine.toLowerCase())
        );
        const matchesSpecialty = pro.specialties.some((s) =>
          s.toLowerCase().includes(cuisine.toLowerCase())
        );
        if (!matchesCuisine && !matchesSpecialty) return false;
      }

      // 3. Budget Filter
      if (budget !== 'all') {
        const priceNum = parseInt(pro.pricePerPlate?.replace(/\D/g, '') || '0', 10);
        if (budget === 'under-1000' && priceNum >= 1000) return false;
        if (budget === '1000-2000' && (priceNum < 1000 || priceNum > 2000)) return false;
        if (budget === 'above-2000' && priceNum < 2000) return false;
      }

      // 4. Search Filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesBrand = pro.brandName.toLowerCase().includes(q);
        const matchesName = pro.name.toLowerCase().includes(q);
        const matchesAbout = pro.about.toLowerCase().includes(q);
        const matchesLoc = pro.location.toLowerCase().includes(q);
        if (!matchesBrand && !matchesName && !matchesAbout && !matchesLoc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'name') return a.brandName.localeCompare(b.brandName);
      return 0;
    });
  }, [search, city, cuisine, budget, sortBy]);

  return (
    <section
      id="caterer-directory-listing"
      className="saathi-caterer-listing"
      style={{
        padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Marketplace Directory"
          title="Browse Verified Catering Masters"
          subtitle="Explore India's leading artisanal wedding caterers, royal Awadhi khansamas, certified Jain banquet specialists, and boutique dessert ateliers."
        />

        {/* Filter Toolbar */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {/* Top Search & Filter Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-3)',
              alignItems: 'center',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search caterer, chef, region..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                }}
              />
            </div>

            {/* City Select */}
            <div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                {CITY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine Select */}
            <div>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                {CUISINE_FILTER_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Select */}
            <div>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience' | 'name')}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                <option value="rating">Sort by: Top Rated</option>
                <option value="experience">Sort by: Experience (Years)</option>
                <option value="name">Sort by: Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results Counter & Reset Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
              paddingTop: 'var(--space-2)',
            }}
          >
            <div>
              Showing <strong style={{ color: 'var(--saathi-maroon)' }}>{filteredCaterers.length}</strong> verified catering specialists
            </div>

            {(search || city !== 'All Cities' || cuisine !== 'All Cuisines' || budget !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--saathi-maroon)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 'var(--text-xs)',
                }}
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Caterers Grid */}
        {filteredCaterers.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {filteredCaterers.map((caterer) => (
              <CatererCard
                key={caterer.id}
                caterer={caterer}
                onViewCaterer={onViewCaterer}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--space-16) var(--space-4)',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              No caterers found matching your criteria
            </h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
              Try broadening your city or cuisine filter selections.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--saathi-nude-tint)',
                color: 'var(--saathi-maroon)',
                fontWeight: 600,
                fontSize: 'var(--text-xs)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};
