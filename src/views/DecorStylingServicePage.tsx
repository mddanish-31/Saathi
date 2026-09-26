"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  MessageSquare,
  RotateCcw,
  CheckCircle2,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import {
  A7_SERVICES,
  getA7ServiceBySlug,
  A7_PROFESSIONALS,
} from '../data/decorStylingData';
import { CategoryHero, BreadcrumbItem } from '../components/category/CategoryHero';
import { FilterBar, FilterState, ExtraFilterOption } from '../components/category/FilterBar';
import { ProfessionalCard } from '../components/professional/ProfessionalCard';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Professional, ServiceItem } from '../types';

interface DecorStylingServicePageProps {
  serviceSlug: string;
  onNavigate: (path: string) => void;
}

// Service Configuration Model
interface ServiceConfig {
  specialties: string[];
  filter1?: { label: string; options: string[]; key: string };
  filter2?: { label: string; options: string[]; key: string };
  filter3?: { label: string; options: string[]; key: string };
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  'decoration-styling': {
    specialties: [
      'Full Wedding Decor',
      'Mandap Decoration',
      'Stage & Backdrop Design',
      'Reception Decor',
      'Haldi & Mehendi Decor',
      'Sangeet Decor',
      'Entrance & Welcome Decor',
      'Table Styling',
      'Theme-Based Decor',
    ],
    filter1: {
      label: 'Decor Style',
      key: 'decorStyle',
      options: [
        'All Styles',
        'Royal & Palace-Inspired',
        'Floral & Romantic',
        'Minimal & Contemporary',
        'Bohemian & Outdoor',
        'Traditional Indian',
        'Modern Luxury',
        'Pastel & Garden-Inspired',
        'Destination Wedding Styling',
      ],
    },
    filter2: {
      label: 'Event Function',
      key: 'eventFunction',
      options: ['All Functions', 'Pheras', 'Sangeet', 'Reception', 'Haldi', 'Mehendi', 'Cocktail Party'],
    },
    filter3: {
      label: 'Venue Type',
      key: 'venueType',
      options: ['All Venue Types', 'Palace / Heritage', 'Luxury Resort', 'Sprawling Lawn', 'Ballroom / Banquet', 'Beach / Outdoor'],
    },
  },
  'florists': {
    specialties: [
      'Bridal & Wedding Flowers',
      'Floral Mandaps',
      'Floral Installations',
      'Centerpieces',
      'Wedding Bouquets',
      'Floral Backdrops',
      'Entrance Florals',
      'Floral Garlands',
    ],
    filter1: {
      label: 'Floral Style',
      key: 'decorStyle',
      options: [
        'All Floral Styles',
        'Floral & Romantic',
        'Pastel & Garden-Inspired',
        'Traditional Indian',
        'Minimal & Contemporary',
        'Bohemian & Outdoor',
      ],
    },
    filter2: {
      label: 'Flower Preference',
      key: 'flowerPreference',
      options: ['All Flowers', 'Fresh Exotic Blooms', 'Traditional Marigold/Jasmine', 'Sustainable/Foliage-dominant'],
    },
    filter3: {
      label: 'Event Function',
      key: 'eventFunction',
      options: ['All Functions', 'Pheras', 'Reception', 'Ring Ceremony', 'Haldi', 'Mehendi'],
    },
  },
  'lighting': {
    specialties: [
      'Ambient Lighting',
      'Stage Lighting',
      'Fairy Lights',
      'Architectural Lighting',
      'Outdoor Lighting',
      'Chandeliers',
      'LED Walls and Decorative Lighting',
    ],
    filter1: {
      label: 'Lighting Type',
      key: 'lightingType',
      options: [
        'All Lighting Types',
        'Ambient Lighting',
        'Stage Lighting',
        'Fairy Lights',
        'Architectural Lighting',
        'Chandeliers',
      ],
    },
    filter2: {
      label: 'Setting',
      key: 'setting',
      options: ['All Settings', 'Indoor & Ballroom', 'Outdoor Lawn & Poolside'],
    },
    filter3: {
      label: 'Event Function',
      key: 'eventFunction',
      options: ['All Functions', 'Sangeet', 'Reception', 'Cocktail Party', 'Pheras'],
    },
  },
  'furniture-rental': {
    specialties: [
      'Wedding Sofas',
      'Lounge Furniture',
      'Dining Tables & Chairs',
      'Decorative Chairs',
      'Couple Seating',
      'Stage Furniture',
      'Decorative Props',
      'Tableware and Styling Accessories',
    ],
    filter1: {
      label: 'Furniture Type',
      key: 'furnitureType',
      options: [
        'All Furniture Types',
        'Wedding Sofas',
        'Lounge Furniture',
        'Dining Tables & Chairs',
        'Decorative Chairs',
        'Couple Seating',
        'Stage Furniture',
      ],
    },
    filter2: {
      label: 'Style',
      key: 'decorStyle',
      options: [
        'All Styles',
        'Royal & Palace-Inspired',
        'Bohemian & Outdoor',
        'Minimal & Contemporary',
        'Modern Luxury',
      ],
    },
    filter3: {
      label: 'Event Function',
      key: 'eventFunction',
      options: ['All Functions', 'Pheras', 'Sangeet', 'Mehendi', 'Cocktail Party', 'Reception'],
    },
  },
  'wedding-fashion': {
    specialties: [
      'Bridal Wear',
      'Groom Wear',
      'Bridesmaid Outfits',
      'Groomsmen Outfits',
      'Wedding Party Styling',
      'Wedding Accessories',
    ],
    filter1: {
      label: 'Outfit Type',
      key: 'specialty',
      options: [
        'All Outfits',
        'Bridal Wear',
        'Groom Wear',
        'Bridesmaid Outfits',
        'Groomsmen Outfits',
        'Wedding Party Styling',
      ],
    },
    filter2: {
      label: 'Aesthetic Style',
      key: 'decorStyle',
      options: [
        'All Styles',
        'Royal & Palace-Inspired',
        'Traditional Indian',
        'Pastel & Garden-Inspired',
        'Floral & Romantic',
        'Modern Luxury',
      ],
    },
    filter3: {
      label: 'Occasion',
      key: 'eventFunction',
      options: ['All Occasions', 'Pheras', 'Reception', 'Sangeet', 'Mehendi', 'Cocktail Party'],
    },
  },
  'jewellery': {
    specialties: [
      'Bridal Jewellery',
      'Groom Accessories',
      'Wedding Jewellery Sets',
      'Traditional Jewellery',
      'Contemporary Jewellery',
      'Jewellery Rental',
      'Wedding Accessories',
    ],
    filter1: {
      label: 'Jewellery Type',
      key: 'specialty',
      options: [
        'All Jewellery',
        'Bridal Jewellery',
        'Groom Accessories',
        'Wedding Jewellery Sets',
        'Contemporary Jewellery',
        'Jewellery Rental',
      ],
    },
    filter2: {
      label: 'Style',
      key: 'decorStyle',
      options: [
        'All Styles',
        'Royal & Palace-Inspired',
        'Traditional Indian',
        'Modern Luxury',
        'Minimal & Contemporary',
      ],
    },
    filter3: {
      label: 'Preference',
      key: 'rentalOrPurchase',
      options: ['All Preferences', 'Rental Available', 'Bespoke Purchase'],
    },
  },
  'invitations-gifting': {
    specialties: [
      'Wedding Invitations',
      'Digital Invitations',
      'Save-the-Date Cards',
      'Wedding Stationery',
      'Welcome Hampers',
      'Guest Favours',
      'Return Gifts',
      'Personalized Wedding Gifts',
    ],
    filter1: {
      label: 'Product Type',
      key: 'specialty',
      options: [
        'All Products',
        'Wedding Invitations',
        'Digital Invitations',
        'Save-the-Date Cards',
        'Welcome Hampers',
        'Guest Favours',
        'Wedding Stationery',
      ],
    },
    filter2: {
      label: 'Design Style',
      key: 'decorStyle',
      options: [
        'All Styles',
        'Royal & Palace-Inspired',
        'Floral & Romantic',
        'Minimal & Contemporary',
        'Bohemian & Outdoor',
        'Traditional Indian',
      ],
    },
    filter3: {
      label: 'Occasion',
      key: 'eventFunction',
      options: ['All Occasions', 'Welcome Dinner', 'Pheras', 'Reception', 'Haldi', 'Mehendi'],
    },
  },
};

export const DecorStylingServicePage: React.FC<DecorStylingServicePageProps> = ({
  serviceSlug,
  onNavigate,
}) => {
  const searchParams = useSearchParams();
  const currentService = getA7ServiceBySlug(serviceSlug) || A7_SERVICES[0];
  const config = SERVICE_CONFIGS[serviceSlug] || SERVICE_CONFIGS['decoration-styling'];

  // Query parameter prefill (e.g., style passed from landing page)
  const initialStyleParam = searchParams?.get('style') || '';

  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    city: 'All Cities',
    budget: 'All',
    minExperience: 0,
    sortBy: 'rating',
  });

  const [activeSpecialty, setActiveSpecialty] = useState<string>('All');
  const [extraFilter1, setExtraFilter1] = useState<string>(
    initialStyleParam && config.filter1?.options.includes(initialStyleParam)
      ? initialStyleParam
      : config.filter1?.options[0] || 'All'
  );
  const [extraFilter2, setExtraFilter2] = useState<string>(config.filter2?.options[0] || 'All');
  const [extraFilter3, setExtraFilter3] = useState<string>(config.filter3?.options[0] || 'All');

  // Sync if URL search params change
  useEffect(() => {
    if (initialStyleParam && config.filter1?.options.includes(initialStyleParam)) {
      setExtraFilter1(initialStyleParam);
    }
  }, [initialStyleParam, config.filter1]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      city: 'All Cities',
      budget: 'All',
      minExperience: 0,
      sortBy: 'rating',
    });
    setActiveSpecialty('All');
    if (config.filter1) setExtraFilter1(config.filter1.options[0]);
    if (config.filter2) setExtraFilter2(config.filter2.options[0]);
    if (config.filter3) setExtraFilter3(config.filter3.options[0]);
  };

  const handleSelectServiceTab = (slug: string) => {
    if (slug === 'all') {
      onNavigate('/categories/weddings-events/decor-styling-essentials');
    } else {
      onNavigate(`/categories/weddings-events/decor-styling-essentials/${slug}`);
    }
  };

  const handleViewProfile = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}`);
  };

  const handleEnquire = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}/enquire`);
  };

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Weddings & Events', href: '/categories/weddings-events' },
    { label: 'Decor, Styling & Wedding Essentials', href: '/categories/weddings-events/decor-styling-essentials' },
    { label: currentService.title },
  ];

  // Extra filter items for the FilterBar
  const extraFiltersList: ExtraFilterOption[] = [];
  if (config.filter1) {
    extraFiltersList.push({
      label: config.filter1.label,
      value: extraFilter1,
      options: config.filter1.options,
      onChange: setExtraFilter1,
    });
  }
  if (config.filter2) {
    extraFiltersList.push({
      label: config.filter2.label,
      value: extraFilter2,
      options: config.filter2.options,
      onChange: setExtraFilter2,
    });
  }
  if (config.filter3) {
    extraFiltersList.push({
      label: config.filter3.label,
      value: extraFilter3,
      options: config.filter3.options,
      onChange: setExtraFilter3,
    });
  }

  // Filter logic
  const filteredProfessionals = useMemo(() => {
    return A7_PROFESSIONALS.filter((pro) => {
      // 1. Service filter: Professional must offer this service
      if (!pro.servicesOffered.includes(serviceSlug)) {
        return false;
      }

      // 2. Specialty pill filter
      if (activeSpecialty !== 'All') {
        const matchesSpecialty =
          pro.specialties.some((s) => s.toLowerCase().includes(activeSpecialty.toLowerCase())) ||
          (pro.serviceSpecialties && pro.serviceSpecialties.some((s) => s.toLowerCase().includes(activeSpecialty.toLowerCase())));
        if (!matchesSpecialty) return false;
      }

      // 3. City filter
      if (filters.city !== 'All Cities') {
        const inMainCity = pro.location.toLowerCase().includes(filters.city.toLowerCase());
        const inServed = pro.citiesServed.some((c) => c.toLowerCase() === filters.city.toLowerCase());
        if (!inMainCity && !inServed) return false;
      }

      // 4. Budget filter
      if (filters.budget !== 'All') {
        if (filters.budget === 'under-2l') {
          // If starting price is greater than 2L
          if (pro.startingPrice.includes('3,50,000') || pro.startingPrice.includes('3,75,000') || pro.startingPrice.includes('4,50,000')) {
            return false;
          }
        } else if (filters.budget === '2l-5l') {
          // Under 5L
          if (pro.startingPrice.includes('4,50,000') || pro.startingPrice.includes('3,75,000') || pro.startingPrice.includes('3,50,000') || pro.startingPrice.includes('1,80,000') || pro.startingPrice.includes('1,50,000') || pro.startingPrice.includes('1,35,000') || pro.startingPrice.includes('1,20,000') || pro.startingPrice.includes('1,10,000') || pro.startingPrice.includes('95,000') || pro.startingPrice.includes('85,000') || pro.startingPrice.includes('80,000') || pro.startingPrice.includes('75,000') || pro.startingPrice.includes('55,000') || pro.startingPrice.includes('45,000') || pro.startingPrice.includes('35,000')) {
            // matches
          }
        } else if (filters.budget === 'above-15l') {
          if (!pro.priceRange.includes('25L') && !pro.priceRange.includes('20L') && !pro.priceRange.includes('18L') && !pro.priceRange.includes('15L')) {
            return false;
          }
        }
      }

      // 5. Search field
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesName = pro.name.toLowerCase().includes(q);
        const matchesBrand = pro.brandName.toLowerCase().includes(q);
        const matchesLocation = pro.location.toLowerCase().includes(q);
        const matchesSpec = pro.specialties.some((s) => s.toLowerCase().includes(q));
        const matchesDecorStyle = (pro.decorStyles || []).some((st) => st.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesLocation && !matchesSpec && !matchesDecorStyle) {
          return false;
        }
      }

      // 6. Extra filter 1
      if (config.filter1 && extraFilter1 !== config.filter1.options[0]) {
        if (config.filter1.key === 'decorStyle') {
          if (!pro.decorStyles || !pro.decorStyles.includes(extraFilter1)) return false;
        } else if (config.filter1.key === 'specialty') {
          const hasSpec = pro.serviceSpecialties?.includes(extraFilter1) || pro.specialties.some((s) => s.toLowerCase().includes(extraFilter1.toLowerCase()));
          if (!hasSpec) return false;
        } else if (config.filter1.key === 'lightingType') {
          if (!pro.lightingTypes || !pro.lightingTypes.includes(extraFilter1)) return false;
        } else if (config.filter1.key === 'furnitureType') {
          if (!pro.furnitureTypes || !pro.furnitureTypes.includes(extraFilter1)) return false;
        }
      }

      // 7. Extra filter 2
      if (config.filter2 && extraFilter2 !== config.filter2.options[0]) {
        if (config.filter2.key === 'eventFunction') {
          if (!pro.eventFunctions || !pro.eventFunctions.includes(extraFilter2)) return false;
        } else if (config.filter2.key === 'flowerPreference') {
          if (!pro.flowerPreferences || !pro.flowerPreferences.includes(extraFilter2)) return false;
        } else if (config.filter2.key === 'decorStyle') {
          if (!pro.decorStyles || !pro.decorStyles.includes(extraFilter2)) return false;
        }
      }

      // 8. Extra filter 3
      if (config.filter3 && extraFilter3 !== config.filter3.options[0]) {
        if (config.filter3.key === 'venueType') {
          if (!pro.venueTypesSupported || !pro.venueTypesSupported.some((v) => v.toLowerCase().includes(extraFilter3.toLowerCase()))) {
            return false;
          }
        } else if (config.filter3.key === 'eventFunction') {
          if (!pro.eventFunctions || !pro.eventFunctions.includes(extraFilter3)) return false;
        } else if (config.filter3.key === 'rentalOrPurchase') {
          if (extraFilter3 === 'Rental Available' && pro.rentalOrPurchase !== 'Rental' && pro.rentalOrPurchase !== 'Both') {
            return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (filters.sortBy === 'name') return a.brandName.localeCompare(b.brandName);
      return 0;
    });
  }, [serviceSlug, activeSpecialty, filters, extraFilter1, extraFilter2, extraFilter3, config]);

  return (
    <div className="saathi-decor-styling-service-page" style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>
      {/* Category Hero with Tabs for all 7 canonical services */}
      <CategoryHero
        breadcrumbs={breadcrumbs}
        codeTag="Vertical A7"
        title={currentService.title}
        description={currentService.fullDescription}
        onNavigate={onNavigate}
        highlights={[
          `From ${currentService.startingPrice}`,
          `Lead Time: ${currentService.typicalTimeline}`,
          '100% Curated Showcases',
          'Direct Specialist Enquiries',
        ]}
        activeServiceSlug={serviceSlug}
        serviceTabs={A7_SERVICES.map((srv) => ({
          label: srv.title,
          slug: srv.slug,
        }))}
        onSelectService={handleSelectServiceTab}
      />

      {/* Main Content Area */}
      <section style={{ padding: 'clamp(var(--space-8), 4vw, var(--space-12)) 0' }}>
        <Container>
          {/* Service Specialties Chips / Filter Pills */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Specialized Disciplines:
              </span>
              {activeSpecialty !== 'All' && (
                <button
                  type="button"
                  onClick={() => setActiveSpecialty('All')}
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--saathi-maroon)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <RotateCcw size={11} />
                  <span>Show All Disciplines</span>
                </button>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveSpecialty('All')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: activeSpecialty === 'All' ? 'var(--btn-primary-bg)' : 'var(--bg-surface)',
                  color: activeSpecialty === 'All' ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                  borderColor: activeSpecialty === 'All' ? 'transparent' : 'var(--border-default)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                All Disciplines
              </button>

              {config.specialties.map((spec) => {
                const isSelected = activeSpecialty === spec;
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setActiveSpecialty(isSelected ? 'All' : spec)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      backgroundColor: isSelected ? 'var(--btn-primary-bg)' : 'var(--bg-surface)',
                      color: isSelected ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                      borderColor: isSelected ? 'transparent' : 'var(--border-default)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Directory Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredProfessionals.length}
            resultLabel={`curated ${currentService.title.toLowerCase()} specialists`}
            extraFilters={extraFiltersList}
          />

          {/* Active Filter Indicators */}
          {(activeSpecialty !== 'All' || extraFilter1 !== config.filter1?.options[0] || extraFilter2 !== config.filter2?.options[0] || extraFilter3 !== config.filter3?.options[0]) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-6)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Active Specific Filters:</span>
              {activeSpecialty !== 'All' && (
                <span
                  style={{
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  Discipline: {activeSpecialty}
                </span>
              )}
              {config.filter1 && extraFilter1 !== config.filter1.options[0] && (
                <span
                  style={{
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {config.filter1.label}: {extraFilter1}
                </span>
              )}
              {config.filter2 && extraFilter2 !== config.filter2.options[0] && (
                <span
                  style={{
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {config.filter2.label}: {extraFilter2}
                </span>
              )}
              {config.filter3 && extraFilter3 !== config.filter3.options[0] && (
                <span
                  style={{
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {config.filter3.label}: {extraFilter3}
                </span>
              )}
            </div>
          )}

          {/* Professional Listings Grid or Empty State */}
          {filteredProfessionals.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: 'var(--space-6)',
                marginBottom: 'var(--space-16)',
              }}
            >
              {filteredProfessionals.map((pro) => (
                <ProfessionalCard
                  key={pro.id}
                  professional={pro}
                  onViewProfile={handleViewProfile}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-16) var(--space-6)',
                textAlign: 'center',
                marginBottom: 'var(--space-16)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--saathi-nude-tint)',
                  color: 'var(--saathi-maroon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4) auto',
                }}
              >
                <Filter size={28} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                No Specialists Match Your Criteria
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  maxWidth: '460px',
                  margin: '0 auto var(--space-6) auto',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Try widening your city selection, resetting custom filters, or clearing the search query to explore all available specialists.
              </p>
              <Button
                variant="primary"
                size="md"
                leftIcon={<RotateCcw size={15} />}
                onClick={handleResetFilters}
              >
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Bottom Enquiry Assistance CTA */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-10))',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-6)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--saathi-maroon)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Direct Bespoke Inquiries
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Need Guidance for Your {currentService.title}?
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Send an enquiry to connect with any of our verified specialist studios directly. Specify your destination city, event dates, and aesthetic preferences.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('/categories/weddings-events/decor-styling-essentials')}
              >
                ← Back to Decor Overview
              </Button>
              {filteredProfessionals[0] && (
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<MessageSquare size={16} />}
                  onClick={() => handleEnquire(filteredProfessionals[0])}
                >
                  Enquire with {filteredProfessionals[0].brandName}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
