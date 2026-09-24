import React, { useState, useMemo } from 'react';
import { A3_SERVICES, A3_MOCK_PROFESSIONALS } from '../data/musicEntertainmentData';
import { CategoryHero, BreadcrumbItem } from '../components/category/CategoryHero';
import { ServiceCard } from '../components/category/ServiceCard';
import { FilterBar, FilterState, ExtraFilterOption } from '../components/category/FilterBar';
import { ProfessionalGrid } from '../components/professional/ProfessionalGrid';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Professional, ServiceItem } from '../types';

interface MusicEntertainmentPageProps {
  activeServiceSlug?: string;
  onNavigate: (path: string) => void;
}

export const MusicEntertainmentPage: React.FC<MusicEntertainmentPageProps> = ({
  activeServiceSlug,
  onNavigate,
}) => {
  const currentService = activeServiceSlug
    ? A3_SERVICES.find((s) => s.slug === activeServiceSlug)
    : undefined;

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    city: 'All Cities',
    budget: 'All',
    minExperience: 0,
    sortBy: 'rating',
  });

  // A3-specific filters (Event Type, Performance Type). Frontend-only/mock, passed to the
  // shared FilterBar through its generic `extraFilters` slot \u2014 A1 is unaffected.
  const EVENT_TYPE_OPTIONS = ['All Event Types', 'Wedding', 'Reception', 'Sangeet', 'Engagement', 'Mehendi', 'Haldi', 'Corporate Event', 'Private Party'];
  const PERFORMANCE_TYPE_OPTIONS = ['All Performance Types', 'DJ', 'Live Band', 'Singer', 'Performer', 'Anchor/Host', 'Sound System', 'Light & Sound'];

  const [eventType, setEventType] = useState(EVENT_TYPE_OPTIONS[0]);
  const [performanceType, setPerformanceType] = useState(PERFORMANCE_TYPE_OPTIONS[0]);

  const extraFilters: ExtraFilterOption[] = [
    { label: 'Filter by event type', value: eventType, options: EVENT_TYPE_OPTIONS, onChange: setEventType },
    { label: 'Filter by performance type', value: performanceType, options: PERFORMANCE_TYPE_OPTIONS, onChange: setPerformanceType },
  ];

  const handleResetFilters = () => {
    setFilters({
      search: '',
      city: 'All Cities',
      budget: 'All',
      minExperience: 0,
      sortBy: 'rating',
    });
    setEventType(EVENT_TYPE_OPTIONS[0]);
    setPerformanceType(PERFORMANCE_TYPE_OPTIONS[0]);
  };

  const handleSelectService = (slug: string) => {
    if (slug === 'all') {
      onNavigate('/categories/weddings-events/entertainment');
    } else {
      onNavigate(`/categories/weddings-events/entertainment/${slug}`);
    }
  };

  const handleServiceCardClick = (service: ServiceItem) => {
    onNavigate(`/categories/weddings-events/entertainment/${service.slug}`);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleViewProfile = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}`);
  };

  const handleEnquire = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}/enquire`);
  };

  // Breadcrumbs computation
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Weddings & Events', href: '/categories/weddings-events' },
    {
      label: 'Music & Entertainment',
      href: currentService ? '/categories/weddings-events/entertainment' : undefined,
    },
  ];

  if (currentService) {
    breadcrumbs.push({ label: currentService.title });
  }

  // Filter & Sort Logic (mirrors WeddingPlanningPage; frontend-only/mock, no backend filtering)
  const filteredProfessionals = useMemo(() => {
    return A3_MOCK_PROFESSIONALS.filter((pro) => {
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

      // 3. Search Query (name, brand, specialties/genres, location)
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesName = pro.name.toLowerCase().includes(q);
        const matchesBrand = pro.brandName.toLowerCase().includes(q);
        const matchesSpecialty = pro.specialties.some((s) => s.toLowerCase().includes(q));
        const matchesGenre = (pro.genres ?? []).some((g) => g.toLowerCase().includes(q));
        const matchesLocation = pro.location.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesSpecialty && !matchesGenre && !matchesLocation) {
          return false;
        }
      }

      // 4. Budget Filter
      if (filters.budget !== 'All') {
        if (filters.budget === 'under-2l' && !pro.startingPrice.includes('25,000') && !pro.startingPrice.includes('30,000') && !pro.startingPrice.includes('35,000') && !pro.startingPrice.includes('40,000')) {
          return false;
        }
        if (filters.budget === 'above-15l' && !pro.priceRange.includes('4L') && !pro.priceRange.includes('3.2L')) {
          return false;
        }
      }

      // 5. Experience Filter
      if (filters.minExperience > 0 && pro.experienceYears < filters.minExperience) {
        return false;
      }

      // 6. Event Type Filter (mock/frontend-only)
      if (eventType !== EVENT_TYPE_OPTIONS[0] && !(pro.eventTypes ?? []).includes(eventType)) {
        return false;
      }

      // 7. Performance Type Filter (mock/frontend-only)
      if (performanceType !== PERFORMANCE_TYPE_OPTIONS[0] && pro.performanceType !== performanceType) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (filters.sortBy === 'name') return a.brandName.localeCompare(b.brandName);
      return 0;
    });
  }, [activeServiceSlug, filters, eventType, performanceType]);

  const pageTitle = currentService ? currentService.title : 'Music & Entertainment';

  const pageDescription = currentService
    ? currentService.fullDescription
    : 'Book DJs, live bands, singers, performers, bilingual anchors, and full sound & light production teams to power every stage of your celebration \u2014 from an intimate mandap ceremony to a showstopper sangeet night.';

  return (
    <div className="saathi-music-entertainment-page">
      {/* Category Hero */}
      <CategoryHero
        breadcrumbs={breadcrumbs}
        codeTag="Subcategory A3"
        title={pageTitle}
        description={pageDescription}
        onNavigate={onNavigate}
        activeServiceSlug={activeServiceSlug}
        serviceTabs={[
          { label: 'DJs', slug: 'djs' },
          { label: 'Live Bands & Musicians', slug: 'live-bands' },
          { label: 'Singers', slug: 'singers' },
          { label: 'Performers', slug: 'performers' },
          { label: 'Anchors & Hosts', slug: 'anchors-hosts' },
          { label: 'Event Production', slug: 'event-production' },
        ]}
        onSelectService={handleSelectService}
      />

      {/* Main Section */}
      <section style={{ padding: 'clamp(var(--space-10), 5vw, var(--space-16)) 0', backgroundColor: 'var(--bg-app)' }}>
        <Container>
          {/* Services Overview Cards (Show if on main entertainment page) */}
          {!activeServiceSlug && (
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <SectionHeading
                eyebrow="Specialized Entertainment Services"
                title="Choose Your Entertainment Engagement"
                subtitle="Whether you need a full-night DJ set, a live fusion band, a bilingual anchor to run the show, or complete sound & light production, our specialist directory has you covered."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {A3_SERVICES.map((service) => (
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
              {currentService ? `${currentService.title} Specialists` : 'All Music & Entertainment Specialists'}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              Browse performance portfolios, transparent price guides, and direct client reviews.
            </p>
          </div>

          {/* Filter Bar (Location, Budget, Experience, Sort \u2014 frontend-only/mock) */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredProfessionals.length}
            extraFilters={extraFilters}
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