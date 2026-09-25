"use client";

import React, { useState, useMemo } from 'react';
import { Sparkles, ShieldCheck, Clock3, BadgeCheck } from 'lucide-react';
import { VENUE_CATEGORIES, VENUE_MOCK_PROFESSIONALS } from '../data/venuesData';
import { CategoryHero, BreadcrumbItem } from '../components/category/CategoryHero';
import { ServiceCard } from '../components/category/ServiceCard';
import { FilterBar, FilterState, ExtraFilterOption } from '../components/category/FilterBar';
import { ProfessionalGrid } from '../components/professional/ProfessionalGrid';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Professional, ServiceItem } from '../types';

interface WeddingVenuesPageProps {
    activeCategorySlug?: string;
    onNavigate: (path: string) => void;
}

const GUEST_CAPACITY_OPTIONS = ['Any Guest Count', '50–100', '100–250', '250–500', '500–1000', '1000+'];
const EVENT_TYPE_OPTIONS = ['All Event Types', 'Wedding', 'Reception', 'Engagement', 'Mehendi', 'Sangeet', 'Haldi'];
const AMENITY_OPTIONS = ['Parking', 'AC', 'Catering', 'Decoration', 'Rooms', 'DJ', 'Power Backup', 'Bridal Room', 'Groom Room', 'Indoor Space', 'Outdoor Space'];

/** Does a venue's [minGuests, maxGuests] range overlap the selected capacity bucket? */
const matchesCapacityBucket = (pro: Professional, bucket: string): boolean => {
    if (bucket === GUEST_CAPACITY_OPTIONS[0]) return true;
    if (pro.minGuests === undefined || pro.maxGuests === undefined) return true;
    const ranges: Record<string, [number, number]> = {
        '50–100': [50, 100],
        '100–250': [100, 250],
        '250–500': [250, 500],
        '500–1000': [500, 1000],
        '1000+': [1000, Infinity],
    };
    const [bucketMin, bucketMax] = ranges[bucket] ?? [0, Infinity];
    return pro.minGuests <= bucketMax && pro.maxGuests >= bucketMin;
};

export const WeddingVenuesPage: React.FC<WeddingVenuesPageProps> = ({
    activeCategorySlug,
    onNavigate,
}) => {
    const currentCategory = activeCategorySlug
        ? VENUE_CATEGORIES.find((c) => c.slug === activeCategorySlug)
        : undefined;

    const [filters, setFilters] = useState<FilterState>({
        search: '',
        city: 'All Cities',
        budget: 'All',
        minExperience: 0,
        sortBy: 'rating',
    });

    const [guestCapacity, setGuestCapacity] = useState(GUEST_CAPACITY_OPTIONS[0]);
    const [eventType, setEventType] = useState(EVENT_TYPE_OPTIONS[0]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const extraFilters: ExtraFilterOption[] = [
        { label: 'Filter by guest capacity', value: guestCapacity, options: GUEST_CAPACITY_OPTIONS, onChange: setGuestCapacity },
        { label: 'Filter by event type', value: eventType, options: EVENT_TYPE_OPTIONS, onChange: setEventType },
    ];

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
        );
    };

    const handleResetFilters = () => {
        setFilters({ search: '', city: 'All Cities', budget: 'All', minExperience: 0, sortBy: 'rating' });
        setGuestCapacity(GUEST_CAPACITY_OPTIONS[0]);
        setEventType(EVENT_TYPE_OPTIONS[0]);
        setSelectedAmenities([]);
    };

    const handleSelectCategory = (slug: string) => {
        if (slug === 'all') {
            onNavigate('/categories/weddings-events/wedding-venues');
        } else {
            onNavigate(`/categories/weddings-events/wedding-venues/${slug}`);
        }
    };

    const handleCategoryCardClick = (category: ServiceItem) => {
        onNavigate(`/categories/weddings-events/wedding-venues/${category.slug}`);
        window.scrollTo({ top: 350, behavior: 'smooth' });
    };

    const handleViewProfile = (pro: Professional) => onNavigate(`/professionals/${pro.id}`);
    const handleEnquire = (pro: Professional) => onNavigate(`/professionals/${pro.id}/enquire`);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Weddings & Events', href: '/categories/weddings-events' },
        {
            label: 'Wedding Venues',
            href: currentCategory ? '/categories/weddings-events/wedding-venues' : undefined,
        },
    ];
    if (currentCategory) {
        breadcrumbs.push({ label: currentCategory.title });
    }

    // Filter & Sort Logic (frontend-only/mock, no backend filtering)
    const filteredVenues = useMemo(() => {
        return VENUE_MOCK_PROFESSIONALS.filter((pro) => {
            if (activeCategorySlug && !pro.servicesOffered.includes(activeCategorySlug)) return false;

            if (filters.city !== 'All Cities') {
                const inMainCity = pro.location.toLowerCase().includes(filters.city.toLowerCase());
                const inServed = pro.citiesServed.some((c) => c.toLowerCase() === filters.city.toLowerCase());
                if (!inMainCity && !inServed) return false;
            }

            if (filters.search.trim()) {
                const q = filters.search.toLowerCase();
                const matchesName = pro.name.toLowerCase().includes(q);
                const matchesBrand = pro.brandName.toLowerCase().includes(q);
                const matchesLocation = pro.location.toLowerCase().includes(q);
                const matchesVenueType = (pro.venueType ?? '').toLowerCase().includes(q);
                if (!matchesName && !matchesBrand && !matchesLocation && !matchesVenueType) return false;
            }

            if (filters.budget !== 'All') {
                if (filters.budget === 'under-2l' && !pro.startingPrice.match(/₹(35|40|65|90|95),000|₹1,10,000|₹1,20,000|₹1,50,000/)) {
                    return false;
                }
                if (filters.budget === 'above-15l' && !(pro.priceRange.includes('15L') || pro.priceRange.includes('18L'))) {
                    return false;
                }
            }

            if (!matchesCapacityBucket(pro, guestCapacity)) return false;

            // Event Type is intentionally not used to exclude venues here: in this dataset any
            // venue can host any function type (a hall is a hall) — the filter stays visible
            // and functional in the UI for when per-venue event-type restrictions are modeled.

            if (selectedAmenities.length > 0) {
                const venueAmenities = pro.amenities ?? [];
                const hasAll = selectedAmenities.every((a) => venueAmenities.includes(a));
                if (!hasAll) return false;
            }

            return true;
        }).sort((a, b) => {
            if (filters.sortBy === 'rating') return b.rating - a.rating;
            if (filters.sortBy === 'experience') return b.experienceYears - a.experienceYears;
            if (filters.sortBy === 'name') return a.brandName.localeCompare(b.brandName);
            return 0;
        });
    }, [activeCategorySlug, filters, guestCapacity, eventType, selectedAmenities]);

    const featuredVenues = useMemo(
        () => [...VENUE_MOCK_PROFESSIONALS].sort((a, b) => b.rating - a.rating).slice(0, 3),
        []
    );

    const pageTitle = currentCategory ? currentCategory.title : 'Wedding Venues';
    const pageDescription = currentCategory
        ? currentCategory.fullDescription
        : 'From traditional marriage halls to beachfront resorts and open-air lawns, find and enquire with the right venue for every function — mehendi to reception — across every city SAATHI serves.';

    return (
        <div className="saathi-wedding-venues-page">
            <CategoryHero
                breadcrumbs={breadcrumbs}
                codeTag="Subcategory A6"
                title={pageTitle}
                description={pageDescription}
                onNavigate={onNavigate}
                activeServiceSlug={activeCategorySlug}
                serviceTabs={VENUE_CATEGORIES.map((c) => ({ label: c.title, slug: c.slug }))}
                onSelectService={handleSelectCategory}
            />

            <section style={{ padding: 'clamp(var(--space-10), 5vw, var(--space-16)) 0', backgroundColor: 'var(--bg-app)' }}>
                <Container>
                    {/* Six Venue Category Cards — landing view only */}
                    {!activeCategorySlug && (
                        <div style={{ marginBottom: 'var(--space-16)' }}>
                            <SectionHeading
                                eyebrow="Every Kind of Wedding Space"
                                title="Choose Your Venue Category"
                                subtitle="Whether you need a traditional marriage hall, a polished banquet space, or a full destination resort, browse curated properties by category."
                            />
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: 'var(--space-6)',
                                }}
                            >
                                {VENUE_CATEGORIES.map((category) => (
                                    <ServiceCard key={category.id} service={category} onSelect={handleCategoryCardClick} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Featured Venues — landing view only */}
                    {!activeCategorySlug && (
                        <div style={{ marginBottom: 'var(--space-16)' }}>
                            <SectionHeading
                                eyebrow="Handpicked For You"
                                title="Featured Venues"
                                subtitle="Our top-rated properties across categories, based on verified reviews and booking history."
                            />
                            <ProfessionalGrid
                                professionals={featuredVenues}
                                onViewProfile={handleViewProfile}
                                onEnquire={handleEnquire}
                                onResetFilters={handleResetFilters}
                            />
                        </div>
                    )}

                    {/* Why Choose SAATHI — landing view only */}
                    {!activeCategorySlug && (
                        <div
                            style={{
                                marginBottom: 'var(--space-16)',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: 'var(--space-6)',
                            }}
                        >
                            {[
                                { icon: <ShieldCheck size={22} />, title: 'Verified Properties', desc: 'Every listed venue is reviewed for accuracy before it goes live.' },
                                { icon: <BadgeCheck size={22} />, title: 'Transparent Pricing', desc: 'See a real starting price and price range upfront — no hidden markup.' },
                                { icon: <Clock3 size={22} />, title: 'Fast Response', desc: 'Most venues respond to enquiries within 24 hours.' },
                                { icon: <Sparkles size={22} />, title: 'Curated for Weddings', desc: 'Every property is chosen specifically for wedding-scale events, not repurposed banquet space.' },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    style={{
                                        backgroundColor: 'var(--bg-surface)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-lg)',
                                        padding: 'var(--space-5)',
                                    }}
                                >
                                    <div style={{ color: 'var(--saathi-maroon)', marginBottom: 'var(--space-3)' }}>{item.icon}</div>
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text-headings)', marginBottom: 'var(--space-1)' }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Listing Header */}
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
                            {currentCategory ? `${currentCategory.title}` : 'All Wedding Venues'}
                        </h2>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                            Browse verified venue galleries, transparent price guides, and direct enquiries.
                        </p>
                    </div>

                    {/* Filter Bar (Location, Budget, Guest Capacity, Event Type, Sort) */}
                    <FilterBar
                        filters={filters}
                        onFilterChange={setFilters}
                        onReset={handleResetFilters}
                        totalResults={filteredVenues.length}
                        extraFilters={extraFilters}
                    />

                    {/* Amenities Chip Filter — self-contained, doesn't touch shared FilterBar */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            margin: 'var(--space-4) 0 var(--space-6)',
                        }}
                    >
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>
                            Amenities:
                        </span>
                        {AMENITY_OPTIONS.map((amenity) => {
                            const active = selectedAmenities.includes(amenity);
                            return (
                                <button
                                    key={amenity}
                                    type="button"
                                    onClick={() => toggleAmenity(amenity)}
                                    aria-pressed={active}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '0.3rem 0.75rem',
                                        borderRadius: 'var(--radius-full)',
                                        border: `1px solid ${active ? 'var(--saathi-maroon)' : 'var(--border-subtle)'}`,
                                        backgroundColor: active ? 'var(--saathi-maroon)' : 'var(--bg-surface)',
                                        color: active ? '#FAF6F3' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontWeight: active ? 600 : 500,
                                    }}
                                >
                                    {amenity}
                                </button>
                            );
                        })}
                    </div>

                    {/* Venue Grid (empty state handled inside ProfessionalGrid) */}
                    <ProfessionalGrid
                        professionals={filteredVenues}
                        onViewProfile={handleViewProfile}
                        onEnquire={handleEnquire}
                        onResetFilters={handleResetFilters}
                    />

                    {/* Final CTA — landing view only */}
                    {!activeCategorySlug && (
                        <div
                            style={{
                                marginTop: 'var(--space-16)',
                                textAlign: 'center',
                                padding: 'var(--space-10)',
                                borderRadius: 'var(--radius-xl)',
                                backgroundColor: 'var(--bg-surface-soft)',
                                border: '1px solid var(--border-subtle)',
                            }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', color: 'var(--text-headings)', marginBottom: 'var(--space-3)' }}>
                                Not sure which venue fits your celebration?
                            </h3>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
                                Tell us your guest count, city, and budget, and we’ll point you to venues that fit — no obligation.
                            </p>
                            <Button variant="primary" size="lg" onClick={() => onNavigate('/categories/weddings-events/wedding-venues/venues')}>
                                Explore Dedicated Wedding Venues
                            </Button>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    );
};
