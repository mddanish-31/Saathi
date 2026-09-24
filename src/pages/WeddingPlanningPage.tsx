import React, { useState, useMemo } from 'react';
import { A1_SERVICES, MOCK_PROFESSIONALS } from '../data/weddingPlanningData';
import { CategoryHero } from '../components/category/CategoryHero';
import { ServiceCard } from '../components/category/ServiceCard';
import { FilterBar, FilterState } from '../components/category/FilterBar';
import { ProfessionalGrid } from '../components/professional/ProfessionalGrid';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Professional, ServiceItem } from '../types';

interface WeddingPlanningPageProps {
  activeServiceSlug?: string;
  onNavigate: (path: string) => void;
}

export const WeddingPlanningPage: React.FC<WeddingPlanningPageProps> = ({
  activeServiceSlug,
  onNavigate,
}) => {
  const currentService = activeServiceSlug
    ? A1_SERVICES.find((s) => s.slug === activeServiceSlug)
    : undefined;

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    city: 'All Cities',
    budget: 'All',
    minExperience: 0,
    sortBy: 'rating',
  });

  const handleResetFilters = () => {
    setFilters({
      search: '',
      city: 'All Cities',
      budget: 'All',
      minExperience: 0,
      sortBy: 'rating',
    });
  };

  const handleSelectService = (slug: string) => {
    if (slug === 'all') {
      onNavigate('/categories/weddings-events/planning');
    } else {
      onNavigate(`/categories/weddings-events/planning/${slug}`);
    }
  };

  const handleServiceCardClick = (service: ServiceItem) => {
    onNavigate(`/categories/weddings-events/planning/${service.slug}`);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleViewProfile = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}`);
  };

  const handleEnquire = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}/enquire`);
  };

  // Filter & Sort Logic
  const filteredProfessionals = useMemo(() => {
    return MOCK_PROFESSIONALS.filter((pro) => {
      // 1. Service Filter
      if (activeServiceSlug && !pro.servicesOffered.includes(activeServiceSlug)) {
        return false;
      }

      // 2. City Filter
      if (filters.city !== 'All Cities') {
        const inMainCity = pro.location.toLowerCase().includes(filters.city.toLowerCase());
        const inServed = pro.citiesServed.some((c) => c.toLowerCase() === filters.city.toLowerCase());
        if (!inMainCity && !inServed) return false;
      }

      // 3. Search Query
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesName = pro.name.toLowerCase().includes(q);
        const matchesBrand = pro.brandName.toLowerCase().includes(q);
        const matchesSpecialty = pro.specialties.some((s) => s.toLowerCase().includes(q));
        const matchesLocation = pro.location.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesSpecialty && !matchesLocation) {
          return false;
        }
      }

      // 4. Budget Filter
      if (filters.budget !== 'All') {
        if (filters.budget === 'under-2l' && !pro.startingPrice.includes('85,000') && !pro.startingPrice.includes('1,20,000') && !pro.startingPrice.includes('1,75,000')) {
          return false;
        }
        if (filters.budget === 'above-15l' && !pro.priceRange.includes('20L') && !pro.priceRange.includes('25L')) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (filters.sortBy === 'name') return a.brandName.localeCompare(b.brandName);
      return 0;
    });
  }, [activeServiceSlug, filters]);

  const pageTitle = currentService
    ? currentService.title
    : 'Wedding Planning & Coordination';

  const pageDescription = currentService
    ? currentService.fullDescription
    : 'Orchestrate seamless royal celebrations, pre-wedding soirees, and precision day-of coordination with India’s most esteemed planning artists.';

  return (
    <div className="saathi-wedding-planning-page">
      {/* Category Hero */}
      <CategoryHero
        title={pageTitle}
        description={pageDescription}
        onNavigate={onNavigate}
        activeServiceSlug={activeServiceSlug}
        serviceTabs={[
          { label: 'Wedding Planning', slug: 'wedding-planning' },
          { label: 'Event Planning', slug: 'event-planning' },
          { label: 'Wedding Coordination', slug: 'wedding-coordination' },
        ]}
        onSelectService={handleSelectService}
      />

      {/* Main Section */}
      <section style={{ padding: 'clamp(var(--space-10), 5vw, var(--space-16)) 0', backgroundColor: 'var(--bg-app)' }}>
        <Container>
          {/* Services Overview Cards (Show if on main planning page) */}
          {!activeServiceSlug && (
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <SectionHeading
                eyebrow="Specialized Planning Services"
                title="Choose Your Planning Engagement"
                subtitle="Whether you need turnkey production from day one, single-event styling, or precision day-of timeline coordination, our specialist directory has you covered."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {A1_SERVICES.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={handleServiceCardClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Specialists Directory Header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-1)',
              }}
            >
              {currentService ? `${currentService.title} Specialists` : 'All Planning & Coordination Specialists'}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              Browse portfolios, transparent price guides, and direct client reviews.
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredProfessionals.length}
          />

          {/* Professional Grid */}
          <ProfessionalGrid
            professionals={filteredProfessionals}
            onViewProfile={handleViewProfile}
            onEnquire={handleEnquire}
            onResetFilters={handleResetFilters}
          />
        </Container>
      </section>
    </div>
  );
};
