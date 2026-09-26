import React, { useState, useMemo } from 'react';
import {
  A4_SERVICES,
  A4_MASTER_CATEGORIES,
  A4_PACKAGES,
  A4_PROFESSIONALS,
  BeautyPackage,
} from '../data/beautyMakeupData';
import { CategoryHero, BreadcrumbItem } from '../components/category/CategoryHero';
import { ServiceCard } from '../components/category/ServiceCard';
import { FilterBar, FilterState } from '../components/category/FilterBar';
import { ProfessionalGrid } from '../components/professional/ProfessionalGrid';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Professional, ServiceItem } from '../types';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Award,
  Heart,
  ArrowRight,
  Crown,
  Scissors,
  Flower2,
  Brush,
  Gem,
  Package,
} from 'lucide-react';

interface BeautyMakeupPageProps {
  activeServiceSlug?: string;
  onNavigate: (path: string) => void;
}

export const BeautyMakeupPage: React.FC<BeautyMakeupPageProps> = ({
  activeServiceSlug,
  onNavigate,
}) => {
  // Determine if activeServiceSlug is a master category slug or a specific service slug
  const activeMasterCategory = useMemo(() => {
    if (!activeServiceSlug) return undefined;
    return A4_MASTER_CATEGORIES.find((c) => c.slug === activeServiceSlug);
  }, [activeServiceSlug]);

  const currentService = useMemo(() => {
    if (!activeServiceSlug || activeMasterCategory) return undefined;
    return A4_SERVICES.find((s) => s.slug === activeServiceSlug);
  }, [activeServiceSlug, activeMasterCategory]);

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

  const handleSelectServiceTab = (slug: string) => {
    if (slug === 'all') {
      onNavigate('/categories/weddings-events/beauty-makeup-mehndi');
    } else {
      onNavigate(`/categories/weddings-events/beauty-makeup-mehndi/${slug}`);
    }
  };

  const handleServiceCardClick = (service: ServiceItem) => {
    onNavigate(`/categories/weddings-events/beauty-makeup-mehndi/${service.slug}`);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleCategoryCardClick = (catSlug: string) => {
    onNavigate(`/categories/weddings-events/beauty-makeup-mehndi/${catSlug}`);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleViewProfile = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}`);
  };

  const handleEnquire = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}/enquire`);
  };

  const handleEnquirePackage = (pkg: BeautyPackage) => {
    // Find a leading professional who offers this package
    const matchingPro = A4_PROFESSIONALS.find((p) => p.servicesOffered.includes(pkg.serviceSlug)) || A4_PROFESSIONALS[0];
    onNavigate(`/professionals/${matchingPro.id}/enquire`);
  };

  const scrollToDirectory = () => {
    const el = document.getElementById('beauty-directory-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPackages = () => {
    const el = document.getElementById('beauty-packages-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Breadcrumbs computation
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Weddings & Events', href: '/categories/weddings-events' },
    {
      label: 'Beauty, Makeup & Mehndi',
      href: (currentService || activeMasterCategory) ? '/categories/weddings-events/beauty-makeup-mehndi' : undefined,
    },
  ];

  if (activeMasterCategory) {
    breadcrumbs.push({ label: activeMasterCategory.name });
  } else if (currentService) {
    // Find parent category of currentService
    const parentCat = A4_MASTER_CATEGORIES.find((c) => c.serviceSlugs.includes(currentService.slug));
    if (parentCat) {
      breadcrumbs.push({
        label: parentCat.name,
        href: `/categories/weddings-events/beauty-makeup-mehndi/${parentCat.slug}`,
      });
    }
    breadcrumbs.push({ label: currentService.title });
  }

  // Filtered Services to display
  const displayedServices = useMemo(() => {
    if (activeMasterCategory) {
      return A4_SERVICES.filter((s) => activeMasterCategory.serviceSlugs.includes(s.slug));
    }
    if (currentService) {
      return [currentService];
    }
    // Main page: show representative top services
    return A4_SERVICES.slice(0, 6);
  }, [activeMasterCategory, currentService]);

  // All A4 Service Slugs for filtering
  const a4ServiceSlugs = useMemo(() => A4_SERVICES.map((s) => s.slug), []);

  // Filter & Sort Professionals
  const filteredProfessionals = useMemo(() => {
    return A4_PROFESSIONALS.filter((pro) => {
      // 1. Service / Category Filter
      if (currentService) {
        if (!pro.servicesOffered.includes(currentService.slug)) {
          return false;
        }
      } else if (activeMasterCategory) {
        const hasMatchingService = pro.servicesOffered.some((slug) =>
          activeMasterCategory.serviceSlugs.includes(slug)
        );
        if (!hasMatchingService) return false;
      } else {
        const offersA4Service = pro.servicesOffered.some((slug) => a4ServiceSlugs.includes(slug));
        if (!offersA4Service) return false;
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
          !pro.startingPrice.includes('18,000') &&
          !pro.startingPrice.includes('20,000') &&
          !pro.startingPrice.includes('28,000') &&
          !pro.startingPrice.includes('30,000') &&
          !pro.startingPrice.includes('45,000') &&
          !pro.startingPrice.includes('55,000')
        ) {
          return false;
        }
        if (
          filters.budget === 'above-15l' &&
          !pro.priceRange.includes('1.8L') &&
          !pro.priceRange.includes('2.5L') &&
          !pro.priceRange.includes('5.0L')
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
  }, [currentService, activeMasterCategory, a4ServiceSlugs, filters]);

  // Page Title & Description
  const pageTitle = currentService
    ? currentService.title
    : activeMasterCategory
    ? activeMasterCategory.name
    : 'Beauty, Makeup & Mehndi';

  const pageDescription = currentService
    ? currentService.fullDescription
    : activeMasterCategory
    ? activeMasterCategory.description
    : 'Find trusted beauty professionals, makeup artists, hairstylists, and organic henna masters for every sacred ritual and glamorous celebration.';

  const categoryIconMap: Record<string, React.ReactNode> = {
    'makeup': <Brush size={20} />,
    'hair-styling': <Scissors size={20} />,
    'mehndi-henna': <Flower2 size={20} />,
    'beauty-grooming': <Heart size={20} />,
    'celebrity-artists': <Crown size={20} />,
    'packages': <Package size={20} />,
  };

  return (
    <div className="saathi-beauty-makeup-page">
      {/* 1. Category Hero */}
      <CategoryHero
        breadcrumbs={breadcrumbs}
        codeTag="Vertical A4"
        title={pageTitle}
        description={pageDescription}
        onNavigate={onNavigate}
        activeServiceSlug={activeServiceSlug}
        highlights={['Sanitized Luxury Kits', '100% Organic Henna', 'Celebrity & Royal Stylists']}
        serviceTabs={[
          { label: 'All Verticals', slug: 'all' },
          { label: 'Makeup', slug: 'makeup' },
          { label: 'Hair & Styling', slug: 'hair-styling' },
          { label: 'Mehndi & Henna', slug: 'mehndi-henna' },
          { label: 'Beauty & Grooming', slug: 'beauty-grooming' },
          { label: 'Celebrity Artists', slug: 'celebrity-artists' },
          { label: 'Complete Packages', slug: 'packages' },
        ]}
        onSelectService={handleSelectServiceTab}
      />

      {/* Main Content Area */}
      <section
        style={{
          padding: 'clamp(var(--space-8), 4vw, var(--space-14)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          {/* Quick CTAs for Hero when on main page */}
          {!activeServiceSlug && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 'var(--space-12)',
              }}
            >
              <Button variant="primary" size="lg" onClick={scrollToDirectory}>
                <Sparkles size={16} />
                <span>Explore Professionals</span>
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToPackages}>
                <Crown size={16} />
                <span>Explore Complete Packages</span>
              </Button>
            </div>
          )}

          {/* 2. Quick Category Navigation Grid (Shown on Main Page) */}
          {!activeServiceSlug && (
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <SectionHeading
                eyebrow="A4 Master Verticals"
                title="Curated Beauty Disciplines"
                subtitle="From royal bridal airbrush vanities to master Rajasthani mehendi storytellers and groom aesthetics, select a discipline to explore."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {A4_MASTER_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="hover-lift"
                    onClick={() => handleCategoryCardClick(cat.slug)}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-subtle)',
                      padding: 'var(--space-6)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all var(--transition-normal)',
                      overflow: 'hidden',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--saathi-nude-tint)',
                            color: 'var(--saathi-maroon)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {categoryIconMap[cat.slug] || <Sparkles size={20} />}
                        </div>

                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--bg-surface-soft)',
                            color: 'var(--saathi-maroon)',
                            border: '1px solid var(--border-subtle)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {cat.code}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 600,
                          color: 'var(--text-headings)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {cat.name}
                      </h3>

                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        {cat.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 'var(--space-3)',
                        borderTop: '1px solid var(--border-subtle)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--saathi-maroon)',
                      }}
                    >
                      <span>{cat.serviceCount} Curated Services</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Deep Dive Card (When a specific service route is active) */}
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
                      <span>Service Deep Dive</span>
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
                          Typical Session Length
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
                      Standard Deliverables & Inclusions
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

          {/* 4. Featured Services Grid (When on main vertical or category page) */}
          {!currentService && (
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <SectionHeading
                eyebrow={activeMasterCategory ? `${activeMasterCategory.name} Services` : 'Signature Services'}
                title={activeMasterCategory ? `Explore ${activeMasterCategory.name}` : 'Featured Beauty Services'}
                subtitle="Select any service to view comprehensive deliverables, lead time recommendations, and certified artist availability."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {displayedServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={handleServiceCardClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 5. Signature Packages Section */}
          {(!activeServiceSlug || activeServiceSlug === 'packages') && (
            <div id="beauty-packages-section" style={{ marginBottom: 'var(--space-16)' }}>
              <SectionHeading
                eyebrow="Turnkey Solutions"
                title="Signature Wedding Packages"
                subtitle="Curated multi-event bundles designed to save you coordination stress while delivering synchronized, immaculate results across every ritual."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {A4_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="hover-lift"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-xl)',
                      border: pkg.isPopular ? '2px solid var(--saathi-maroon)' : '1px solid var(--border-subtle)',
                      padding: 'var(--space-6)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: pkg.isPopular ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                      position: 'relative',
                    }}
                  >
                    {pkg.isPopular && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '20px',
                          backgroundColor: 'var(--accent)',
                          color: 'var(--text-inverse)',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {pkg.badge}
                      </div>
                    )}

                    <div>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--saathi-maroon)',
                          backgroundColor: 'var(--saathi-nude-tint)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-full)',
                          marginBottom: 'var(--space-3)',
                        }}
                      >
                        <Crown size={12} />
                        <span>{pkg.duration}</span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 600,
                          color: 'var(--text-headings)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        {pkg.name}
                      </h3>

                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-muted)',
                          fontStyle: 'italic',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        {pkg.tagline}
                      </p>

                      <div
                        style={{
                          padding: 'var(--space-3) var(--space-4)',
                          backgroundColor: 'var(--bg-surface-soft)',
                          borderRadius: 'var(--radius-md)',
                          marginBottom: 'var(--space-4)',
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Starting From</span>
                        <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--saathi-maroon)' }}>
                          {pkg.startingPrice}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        {pkg.description}
                      </p>

                      <div style={{ marginBottom: 'var(--space-5)' }}>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: 'var(--text-headings)',
                            marginBottom: 'var(--space-2)',
                          }}
                        >
                          Package Inclusions:
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-1)',
                          }}
                        >
                          {pkg.inclusions.map((inc, i) => (
                            <li
                              key={i}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '6px',
                                fontSize: 'var(--text-xs)',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              <CheckCircle2 size={13} style={{ color: 'var(--saathi-maroon)', flexShrink: 0, marginTop: '2px' }} />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button
                      variant={pkg.isPopular ? 'primary' : 'outline'}
                      size="md"
                      style={{ width: '100%' }}
                      onClick={() => handleEnquirePackage(pkg)}
                    >
                      <span>Enquire Package</span>
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Curated Specialists Directory */}
          <div id="beauty-directory-section" style={{ marginBottom: 'var(--space-16)' }}>
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-1)' }}>
                <Sparkles size={20} color="var(--saathi-maroon)" />
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                  }}
                >
                  {currentService
                    ? `${currentService.title} Specialists`
                    : activeMasterCategory
                    ? `${activeMasterCategory.name} Artists`
                    : 'Verified Beauty & Makeup Artists'}
                </h2>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Browse verified artist profiles, sanitized vanity specifications, transparent rates, and real bridal reviews.
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProfessionals.length}
              availableCities={['All Cities', 'Mumbai', 'Delhi NCR', 'Jaipur', 'Udaipur', 'Bengaluru', 'Goa', 'Chandigarh', 'Hyderabad', 'Pune']}
            />

            {/* Professional Grid */}
            <ProfessionalGrid
              professionals={filteredProfessionals}
              onViewProfile={handleViewProfile}
              onEnquire={handleEnquire}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* 7. Trust & Standards Section */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <Card
              padding="lg"
              elevation="sm"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-8) auto' }}>
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
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  <ShieldCheck size={14} />
                  <span>The SAATHI Standard</span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-2xl)',
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Why Book Beauty & Makeup Through SAATHI?
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  We bridge editorial artistry with strict quality governance so your wedding beauty experience is relaxing and flawless.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                <div
                  style={{
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      color: 'var(--saathi-maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <Gem size={20} />
                  </div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: 'var(--space-1)' }}>
                    100% Luxury Sanitized Vanity Kits
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Strict hygiene protocols with certified international brands (Charlotte Tilbury, Tom Ford, MAC, Temptu, Bobbi Brown).
                  </p>
                </div>

                <div
                  style={{
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      color: 'var(--saathi-maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <Flower2 size={20} />
                  </div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: 'var(--space-1)' }}>
                    Certified Organic Sojat Henna
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Zero chemical additives or synthetic dyes. Pure Rajasthani henna harvested for rich, deep mahogany stain development.
                  </p>
                </div>

                <div
                  style={{
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      color: 'var(--saathi-maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: 'var(--space-1)' }}>
                    Punctual Baraat-Ready Timelines
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Calibrated vanity call times ensuring the bride, groom, and family entourage are completely ready 45 minutes prior to ceremonies.
                  </p>
                </div>

                <div
                  style={{
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      color: 'var(--saathi-maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <Award size={20} />
                  </div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: 'var(--space-1)' }}>
                    Backup Artist Guarantee
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Dedicated SAATHI concierge protection with standby emergency master artists on call for destination and local weddings.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* 8. Final Call to Action */}
          <div
            style={{
              textAlign: 'center',
              padding: 'clamp(var(--space-10), 5vw, var(--space-16)) var(--space-6)',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
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
                marginBottom: 'var(--space-4)',
              }}
            >
              <Sparkles size={13} />
              <span>Begin Your Bridal Journey</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 600,
                color: 'var(--text-headings)',
                maxWidth: '650px',
                margin: '0 auto var(--space-4) auto',
              }}
            >
              Find the Right Beauty Professionals for Your Celebration
            </h2>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                maxWidth: '550px',
                margin: '0 auto var(--space-8) auto',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Connect directly with verified master makeup artists, hairstylists, and organic henna designers across top destination cities.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                justifyContent: 'center',
              }}
            >
              <Button variant="primary" size="lg" onClick={scrollToDirectory}>
                <span>Explore A4 Professionals</span>
                <ArrowRight size={16} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/categories/weddings-events')}
              >
                <span>Back to Weddings & Events</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
