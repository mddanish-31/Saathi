"use client";

import React, { useState } from 'react';
import {
  Sparkles,
  Flower2,
  Lamp,
  Armchair,
  Shirt,
  Gem,
  Mail,
  ArrowRight,
  ChevronRight,
  Palette,
  CheckCircle2,
  Compass,
  Eye,
  SlidersHorizontal,
  Calendar,
  Layers,
  HeartHandshake,
  Check,
  Shield,
  Clock,
  MapPin,
} from 'lucide-react';
import {
  A7_SERVICES,
  A7_DECOR_STYLES,
  A7_FEATURED_SERVICES,
  A7_INSPIRATION_GALLERY,
  DecorStyleItem,
  FeaturedServiceItem,
  InspirationGalleryItem,
} from '../data/decorStylingData';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { ServiceItem } from '../types';

interface DecorStylingLandingPageProps {
  onNavigate: (path: string) => void;
}

// Icon mapper for canonical services
const getServiceIcon = (slug: string) => {
  switch (slug) {
    case 'decoration-styling':
      return <Palette size={22} style={{ color: 'var(--saathi-maroon)' }} />;
    case 'florists':
      return <Flower2 size={22} style={{ color: 'var(--saathi-maroon)' }} />;
    case 'lighting':
      return <Lamp size={22} style={{ color: 'var(--saathi-maroon)' }} />;
    case 'furniture-rental':
      return <Armchair size={22} style={{ color: 'var(--saathi-maroon)' }} />;
    case 'wedding-fashion':
      return <Shirt size={22} style={{ color: 'var(--saathi-maroon)' }} />;
    case 'jewellery':
      return <Gem size={22} style={{ color: 'var(--saathi-maroon)' }} />;
    case 'invitations-gifting':
      return <Mail size={22} style={{ color: 'var(--saathi-maroon)' }} />;
    default:
      return <Sparkles size={22} style={{ color: 'var(--saathi-maroon)' }} />;
  }
};

export const DecorStylingLandingPage: React.FC<DecorStylingLandingPageProps> = ({ onNavigate }) => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [activeStyleSlug, setActiveStyleSlug] = useState<string | null>(null);

  const scrollToElement = (id: string) => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleServiceClick = (slug: string) => {
    onNavigate(`/categories/weddings-events/decor-styling-essentials/${slug}`);
  };

  const handleStyleExplore = (style: DecorStyleItem) => {
    // Navigate to decoration-styling service discovery page with style query param
    onNavigate(`/categories/weddings-events/decor-styling-essentials/${style.targetServiceSlug}?style=${encodeURIComponent(style.name)}`);
  };

  const galleryCategories = ['All', 'Mandap Decor', 'Wedding Stage Design', 'Floral Installations', 'Reception Table Styling', 'Entrance Decor', 'Mehendi & Haldi Decor'];

  const filteredGallery = selectedGalleryCategory === 'All'
    ? A7_INSPIRATION_GALLERY
    : A7_INSPIRATION_GALLERY.filter((item) => item.category === selectedGalleryCategory);

  return (
    <div className="saathi-decor-styling-landing-page" style={{ backgroundColor: 'var(--bg-app)' }}>
      {/* =====================================================================
          SECTION 1 — HERO SECTION
          ===================================================================== */}
      <section
        id="hero-section"
        style={{
          paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
          paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-app) 100%)',
        }}
      >
        <Container>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <button
              type="button"
              onClick={() => onNavigate('/')}
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              Home
            </button>
            <ChevronRight size={13} style={{ opacity: 0.5 }} />
            <button
              type="button"
              onClick={() => onNavigate('/categories/weddings-events')}
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              Weddings & Events
            </button>
            <ChevronRight size={13} style={{ opacity: 0.5 }} />
            <span style={{ color: 'var(--saathi-maroon)', fontWeight: 600 }}>
              Decor, Styling & Wedding Essentials
            </span>
          </nav>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'clamp(var(--space-8), 4vw, var(--space-16))',
              alignItems: 'center',
            }}
            className="saathi-hero-two-col"
          >
            {/* Left Copy Column */}
            <div>
              {/* Category Eyebrow Badge */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.3rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Sparkles size={13} />
                  <span>A7 | WEDDING DECOR & STYLING</span>
                </span>
              </div>

              {/* Main Heading */}
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  lineHeight: 1.14,
                  letterSpacing: 'var(--tracking-tight)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                Create a Wedding That Feels{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--saathi-maroon)' }}>
                  Uniquely Yours
                </span>
              </h1>

              {/* Supporting Description */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-8)',
                  maxWidth: '620px',
                }}
              >
                Discover talented decorators, floral designers, lighting specialists, furniture stylists,
                and wedding essentials curated for your celebration.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                  alignItems: 'center',
                  marginBottom: 'var(--space-8)',
                }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => scrollToElement('services-section')}
                >
                  Explore Decor Services
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Compass size={18} />}
                  onClick={() => scrollToElement('styles-section')}
                >
                  Find Your Wedding Style
                </Button>
              </div>

              {/* Highlights Pill Row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                {[
                  '7 Curated Decor Verticals',
                  '8 Signature Aesthetics',
                  'Direct Specialist Enquiries',
                  'Zero Middlemen Markups',
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={13} style={{ color: 'var(--saathi-maroon)' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Composition Card */}
            <div>
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-2xl)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: 'clamp(var(--space-5), 3vw, var(--space-7))',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative Subtle Accent Halo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '180px',
                    height: '180px',
                    borderRadius: 'var(--radius-full)',
                    background: 'radial-gradient(circle, var(--saathi-nude) 0%, transparent 70%)',
                    opacity: 0.25,
                    pointerEvents: 'none',
                  }}
                />

                {/* Hero Showcase Visual */}
                <div
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    height: '240px',
                    marginBottom: 'var(--space-5)',
                    position: 'relative',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface-soft)',
                  }}
                >
                  <ImagePlaceholder
                    variant="hero"
                    label="Editorial Wedding Decor & Scenography"
                    sublabel="Curated Architectural Pavilion & Floral Showcase"
                    icon={Sparkles}
                    height="100%"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(38, 26, 36, 0.85)',
                      color: 'var(--text-inverse)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    Curated Showcase
                  </div>
                </div>

                {/* Stat Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'var(--space-3)',
                    textAlign: 'center',
                    padding: 'var(--space-4) 0',
                    borderTop: '1px solid var(--border-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-headings)', display: 'block' }}>
                      7
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Specialist Verticals</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--saathi-maroon)', display: 'block' }}>
                      8
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Signature Styles</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-headings)', display: 'block' }}>
                      100%
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Curated Portfolios</span>
                  </div>
                </div>

                {/* Quick Link Pills */}
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  Popular Inquiries:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[
                    { label: 'Mandap Decor', slug: 'decoration-styling' },
                    { label: 'Fresh Florists', slug: 'florists' },
                    { label: 'Stage Lighting', slug: 'lighting' },
                    { label: 'Lounge Rentals', slug: 'furniture-rental' },
                    { label: 'Bespoke Invites', slug: 'invitations-gifting' },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handleServiceClick(p.slug)}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
                        e.currentTarget.style.color = 'var(--saathi-maroon)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {p.label} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 2 — SERVICE CATEGORY GRID
          ===================================================================== */}
      <section
        id="services-section"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Canonical A7 Services"
            title="Explore Decor & Wedding Essentials"
            subtitle="Everything you need to bring your wedding vision to life. From turnkey mandap architecture to heirloom jewelry and welcome gifting."
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {A7_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="saathi-service-card hover-lift"
                onClick={() => handleServiceClick(service.slug)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleServiceClick(service.slug);
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'clamp(var(--space-5), 3vw, var(--space-6))',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all var(--transition-normal)',
                  outline: 'none',
                }}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
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
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {getServiceIcon(service.slug)}
                    </div>

                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        color: 'var(--saathi-maroon)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      A7.{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-2)',
                      lineHeight: 1.25,
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-normal)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {service.shortDescription}
                  </p>

                  {/* Pricing guide if available */}
                  <div
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: 'var(--space-5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Guide Price</span>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--saathi-maroon)' }}>
                      From {service.startingPrice}
                    </strong>
                  </div>
                </div>

                {/* Explore Action Button */}
                <div>
                  <Button
                    variant="outline"
                    fullWidth
                    size="sm"
                    rightIcon={<ArrowRight size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service.slug);
                    }}
                  >
                    Explore {service.title}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 3 — WEDDING DECOR STYLES
          ===================================================================== */}
      <section
        id="styles-section"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Aesthetic Curation"
            title="Signature Wedding Decor Styles"
            subtitle="From imperial Rajasthani courtyards to sunlit bohemian lawns, choose the sensory atmosphere that resonates with your celebration story."
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {A7_DECOR_STYLES.map((style) => (
              <div
                key={style.id}
                className="hover-lift"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  transition: 'all var(--transition-normal)',
                }}
              >
                <div>
                  {/* Style Tag & Palette Swatch */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        color: 'var(--saathi-maroon)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {style.accentTag}
                    </span>

                    {/* Color Swatch Dots */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {style.colorPalette.map((col) => (
                        <span
                          key={col.name}
                          title={col.name}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: col.hex,
                            border: '1px solid rgba(0,0,0,0.15)',
                            display: 'inline-block',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Style Visual Placeholder */}
                  <div
                    style={{
                      height: '140px',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      marginBottom: 'var(--space-4)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <ImagePlaceholder
                      variant="card"
                      label={style.name}
                      sublabel={style.tagline}
                      icon={Palette}
                      height="100%"
                    />
                  </div>

                  {/* Style Name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {style.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {style.description}
                  </p>

                  {/* Suitable Events Pills */}
                  <div style={{ marginBottom: 'var(--space-5)' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Ideal For:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {style.suitableEvents.map((evt) => (
                        <span
                          key={evt}
                          style={{
                            fontSize: '0.65rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--bg-surface-soft)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {evt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore Style Button */}
                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  rightIcon={<ArrowRight size={14} />}
                  onClick={() => handleStyleExplore(style)}
                >
                  Explore {style.name}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 4 — FEATURED DECOR SERVICES
          ===================================================================== */}
      <section
        id="featured-services-section"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Specialist Highlights"
            title="Featured Decor Services"
            subtitle="Curated disciplines engineered for flawless execution on your milestone dates."
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {A7_FEATURED_SERVICES.map((feat) => (
              <div
                key={feat.id}
                className="hover-lift"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  transition: 'all var(--transition-normal)',
                }}
              >
                <div>
                  {/* Badge & Starting Price */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        color: 'var(--saathi-maroon)',
                      }}
                    >
                      {feat.badge}
                    </span>

                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-headings)' }}>
                      From {feat.startingPrice}
                    </span>
                  </div>

                  {/* Visual placeholder */}
                  <div
                    style={{
                      height: '130px',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      marginBottom: 'var(--space-4)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <ImagePlaceholder
                      variant="card"
                      label={feat.title}
                      icon={Sparkles}
                      height="100%"
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {feat.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-normal)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {feat.shortDescription}
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 var(--space-5) 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {feat.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <CheckCircle2 size={12} style={{ color: 'var(--saathi-maroon)' }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="sm"
                  rightIcon={<ArrowRight size={14} />}
                  onClick={() => handleServiceClick(feat.targetServiceSlug)}
                >
                  Explore Specialists
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 5 — INSPIRATION GALLERY
          ===================================================================== */}
      <section
        id="gallery-section"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Editorial Moodboard"
            title="Wedding Inspiration Gallery"
            subtitle="Explore spatial design concepts across sacred mandaps, imperial sangeet stages, and candlelit reception banquets."
            align="center"
          />

          {/* Gallery Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
              justifyContent: 'center',
              marginBottom: 'var(--space-8)',
            }}
          >
            {galleryCategories.map((cat) => {
              const isSelected = selectedGalleryCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedGalleryCategory(cat)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    backgroundColor: isSelected ? 'var(--btn-primary-bg)' : 'var(--bg-surface-soft)',
                    color: isSelected ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                    borderColor: isSelected ? 'transparent' : 'var(--border-default)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Inspiration Gallery Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="hover-lift"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--transition-normal)',
                }}
              >
                {/* Visual Placeholder / Mockup */}
                <div
                  style={{
                    height: '190px',
                    position: 'relative',
                    backgroundColor: 'var(--bg-surface-soft)',
                    overflow: 'hidden',
                  }}
                >
                  <ImagePlaceholder
                    variant="gallery"
                    label={item.title}
                    sublabel={item.decorStyle}
                    icon={Sparkles}
                    height="100%"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(38, 26, 36, 0.8)',
                      color: 'var(--text-inverse)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.tag}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--saathi-maroon)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      {item.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--text-headings)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {item.caption}
                    </p>
                  </div>

                  <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      Aesthetic: <strong>{item.decorStyle}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Illustrative Notice */}
          <p
            style={{
              textAlign: 'center',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
            }}
          >
            *Illustrative gallery concepts designed for moodboard planning and spatial inspiration.
          </p>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 6 — HOW IT WORKS
          ===================================================================== */}
      <section
        id="how-it-works-section"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Seamless Process"
            title="How Decor Discovery Works on SAATHI"
            subtitle="Four straightforward steps to bring your wedding moodboard to reality without logistical guesswork."
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)',
              position: 'relative',
            }}
          >
            {[
              {
                step: '01',
                title: 'Discover Your Style',
                description: 'Explore signature styles from Royal Palace to Bohemian Sundowners, and identify the aesthetic that defines your celebration.',
                icon: <Palette size={20} style={{ color: 'var(--saathi-maroon)' }} />,
              },
              {
                step: '02',
                title: 'Explore Decor Professionals',
                description: 'Browse transparent specialist portfolios, verified reviews, starting budgets, and regional service coverage across India.',
                icon: <Eye size={20} style={{ color: 'var(--saathi-maroon)' }} />,
              },
              {
                step: '03',
                title: 'Share Your Wedding Requirements',
                description: 'Specify your event dates, destination venue type, guest capacity, and budget preferences in a single structured enquiry.',
                icon: <Mail size={20} style={{ color: 'var(--saathi-maroon)' }} />,
              },
              {
                step: '04',
                title: 'Connect With the Right Professional',
                description: 'Receive personalized moodboards, transparent proposals, and communicate directly with your chosen decor team.',
                icon: <HeartHandshake size={20} style={{ color: 'var(--saathi-maroon)' }} />,
              },
            ].map((step) => (
              <div
                key={step.step}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                }}
              >
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
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {step.icon}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--saathi-maroon)',
                      opacity: 0.8,
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 7 — WHY CHOOSE SAATHI
          ===================================================================== */}
      <section
        id="why-choose-section"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Platform Distinction"
            title="Why Plan Decor on SAATHI"
            subtitle="Engineered for discerning couples seeking aesthetic excellence, transparent offerings, and direct creative collaboration."
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {[
              {
                title: 'Discover Multiple Decor Services in One Place',
                description: 'Access 7 dedicated verticals—from full spatial decorators and living floral mandaps to vintage rental lounges and bespoke boxed invitations.',
                icon: <Layers size={22} style={{ color: 'var(--saathi-maroon)' }} />,
              },
              {
                title: 'Explore Styles & Creative Possibilities',
                description: 'Browse curated visual moodboards across 8 signature celebration aesthetics to find the exact ambiance that suits your celebration story.',
                icon: <Palette size={22} style={{ color: 'var(--saathi-maroon)' }} />,
              },
              {
                title: 'Compare Professional Service Offerings',
                description: 'Evaluate transparent starting budgets, detailed feature deliverables, realistic experience records, and authentic client reviews.',
                icon: <SlidersHorizontal size={22} style={{ color: 'var(--saathi-maroon)' }} />,
              },
              {
                title: 'Share Event Requirements Through Enquiries',
                description: 'Send structured event parameters directly to specialist studios with zero middleman interference and swift 24-hour response timelines.',
                icon: <Mail size={22} style={{ color: 'var(--saathi-maroon)' }} />,
              },
              {
                title: 'Plan Decor Across Multiple Functions',
                description: 'Coordinate cohesive design themes seamlessly across all your ceremonies—from daytime haldi colors to high-energy sangeet and royal pheras.',
                icon: <Calendar size={22} style={{ color: 'var(--saathi-maroon)' }} />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 8 — FINAL CTA
          ===================================================================== */}
      <section
        id="final-cta-section"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container narrow>
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              padding: 'clamp(var(--space-8), 5vw, var(--space-12))',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Halo background accent */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '350px',
                height: '350px',
                borderRadius: 'var(--radius-full)',
                background: 'radial-gradient(circle, var(--saathi-nude-tint) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  <Sparkles size={13} />
                  <span>Begin Your Celebration Story</span>
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  lineHeight: 1.2,
                  marginBottom: 'var(--space-3)',
                }}
              >
                Let’s Bring Your Wedding Vision to Life
              </h2>

              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                Explore decor professionals and find the right creative partners for your celebration.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => handleServiceClick('decoration-styling')}
                >
                  Explore Decor Services
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Shirt size={18} />}
                  onClick={() => handleServiceClick('wedding-fashion')}
                >
                  Browse Wedding Essentials
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
