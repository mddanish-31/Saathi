import React, { useState, useMemo } from 'react';
import { A3_SERVICES, MOCK_PROFESSIONALS } from '../data/weddingPlanningData';
import { CategoryHero } from '../components/category/CategoryHero';
import { ServiceCard } from '../components/category/ServiceCard';
import { FilterBar, FilterState } from '../components/category/FilterBar';
import { ProfessionalGrid } from '../components/professional/ProfessionalGrid';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Professional, ServiceItem } from '../types';
import { CheckCircle2, Clock, Sparkles, Music2 } from 'lucide-react';

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



  // All A3 Service Slugs for general entertainment category filtering
  const a3ServiceSlugs = useMemo(() => A3_SERVICES.map((s) => s.slug), []);

  // Filter & Sort Logic
  const filteredProfessionals = useMemo(() => {
    return MOCK_PROFESSIONALS.filter((pro) => {
      // 1. Service Filter (if activeServiceSlug specified, match it; otherwise must offer at least one A3 service)
      if (activeServiceSlug) {
        if (!pro.servicesOffered.includes(activeServiceSlug)) {
          return false;
        }
      } else {
        const offersA3Service = pro.servicesOffered.some((slug) => a3ServiceSlugs.includes(slug));
        if (!offersA3Service) {
          return false;
        }
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
        const matchesAbout = pro.about.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesSpecialty && !matchesLocation && !matchesAbout) {
          return false;
        }
      }

      // 4. Budget Filter
      if (filters.budget !== 'All') {
        if (
          filters.budget === 'under-2l' &&
          !pro.startingPrice.includes('45,000') &&
          !pro.startingPrice.includes('60,000') &&
          !pro.startingPrice.includes('75,000') &&
          !pro.startingPrice.includes('80,000') &&
          !pro.startingPrice.includes('1,10,000') &&
          !pro.startingPrice.includes('1,20,000') &&
          !pro.startingPrice.includes('1,25,000') &&
          !pro.startingPrice.includes('1,50,000')
        ) {
          return false;
        }
        if (
          filters.budget === 'above-15l' &&
          !pro.priceRange.includes('4L') &&
          !pro.priceRange.includes('5L') &&
          !pro.priceRange.includes('6L') &&
          !pro.priceRange.includes('7L') &&
          !pro.priceRange.includes('8L') &&
          !pro.priceRange.includes('10L')
        ) {
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
  }, [activeServiceSlug, a3ServiceSlugs, filters]);

  const pageTitle = currentService ? currentService.title : 'Music & Entertainment';

  const pageDescription = currentService
    ? currentService.fullDescription
    : 'Concert DJs, live Sufi & Bollywood ensembles, folk troupes, bilingual emcees, and concert sound production engineered for unforgettable celebrations.';

  return (
    <div className="saathi-music-entertainment-page">
      {/* Category Hero */}
      <CategoryHero
        title={pageTitle}
        description={pageDescription}
        onNavigate={onNavigate}
        activeServiceSlug={activeServiceSlug}
        serviceTabs={[
          { label: 'DJs', slug: 'djs' },
          { label: 'Live Bands', slug: 'live-bands' },
          { label: 'Singers', slug: 'singers' },
          { label: 'Performers', slug: 'performers' },
          { label: 'Anchors & Hosts', slug: 'anchors-hosts' },
          { label: 'Event Production', slug: 'event-production' },
        ]}
        onSelectService={handleSelectService}
      />

      {/* Main Section */}
      <section
        style={{
          padding: 'clamp(var(--space-10), 5vw, var(--space-16)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          {/* Active Service Deep Dive Card (When a service route is active) */}
          {currentService && (
            <div style={{ marginBottom: 'var(--space-12)' }}>
              <Card
                padding="lg"
                elevation="sm"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'var(--space-8)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--saathi-maroon)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Service Overview</span>
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'var(--text-2xl)',
                        color: 'var(--text-headings)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {currentService.title}
                    </h2>

                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        marginBottom: 'var(--space-5)',
                      }}
                    >
                      {currentService.fullDescription}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: 'var(--text-muted)',
                            marginBottom: '2px',
                          }}
                        >
                          Starting From
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: 700,
                            color: 'var(--saathi-maroon)',
                          }}
                        >
                          {currentService.startingPrice}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {currentService.priceModel}
                        </div>
                      </div>

                      <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 'var(--space-4)' }}>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: 'var(--text-muted)',
                            marginBottom: '2px',
                          }}
                        >
                          Typical Lead Time
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          <Clock size={14} color="var(--saathi-maroon)" />
                          <span>{currentService.typicalTimeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: 'var(--text-headings)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      Standard Inclusions & Deliverables
                    </h3>

                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 var(--space-5) 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {currentService.features.map((feat, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                          }}
                        >
                          <CheckCircle2
                            size={16}
                            style={{ color: 'var(--saathi-maroon)', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {currentService.idealFor && (
                      <div
                        style={{
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--saathi-nude-tint)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--saathi-maroon)' }}>
                          Ideal for:{' '}
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                          {currentService.idealFor}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* All 6 Services Overview Cards (Show when on main A3 vertical page) */}
          {!activeServiceSlug && (
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <SectionHeading
                eyebrow="Specialized Entertainment Categories"
                title="Explore Music & Entertainment Verticals"
                subtitle="From concert-grade dance floors to soul-stirring live mehfils and high-octane stage choreography, select a category to discover curated talent."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-1)' }}>
              <Music2 size={20} color="var(--saathi-maroon)" />
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                }}
              >
                {currentService ? `${currentService.title} Specialists` : 'All Music & Entertainment Artists'}
              </h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              Browse artist profiles, sound & lighting specifications, transparent pricing, and direct client reviews.
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
