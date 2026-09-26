"use client";

import React, { useState, useEffect, useId } from 'react';
import {
  Car,
  Bus,
  ShieldCheck,
  Clock,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Calendar,
  Plane,
  Award,
  Heart,
  Navigation,
  X,
  FileText,
  Check,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { useAuth } from '../context/AuthContext';
import { useEnquiry } from '../context/EnquiryContext';
import {
  TRANSPORTATION_RIDES,
  TRANSPORTATION_AUDIENCES,
  TRANSPORTATION_STEPS,
  TRANSPORTATION_TRUST_POINTS,
  TRANSPORTATION_PACKAGES,
  TRANSPORTATION_BENEFITS,
  TRANSPORTATION_GALLERY_ITEMS,
  TransportationRide,
  TransportationPackage,
} from '../data/transportationData';

interface TransportationPageProps {
  onNavigate: (path: string) => void;
}

export const TransportationPage: React.FC<TransportationPageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();
  const { createEnquiry } = useEnquiry();

  // Quote / Enquiry Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<TransportationRide | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<TransportationPackage | null>(null);

  // Form Fields
  const [serviceType, setServiceType] = useState<string>('Luxury Cars');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('50–100 Guests');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string>('');

  const modalTitleId = useId();

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setCustomerName(user.name || '');
      setCustomerEmail(user.email || '');
      setCustomerPhone(user.phone || '');
    }
  }, [user]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenQuoteModal = (ride?: TransportationRide, pkg?: TransportationPackage) => {
    if (ride) {
      setSelectedRide(ride);
      setSelectedPkg(null);
      setServiceType(ride.title);
    } else if (pkg) {
      setSelectedPkg(pkg);
      setSelectedRide(null);
      setServiceType(`${pkg.name} Package`);
    } else {
      setSelectedRide(null);
      setSelectedPkg(null);
      setServiceType('Luxury Cars');
    }
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const newEnquiry = createEnquiry({
      professionalId: 'pro-transportation-fleet',
      professionalName: 'Saathi Transportation Fleet & Logistics',
      professionalBrand: 'Saathi Wedding Transportation',
      customerName: customerName.trim() || (user ? user.name : 'Wedding Client'),
      customerEmail: customerEmail.trim() || (user ? user.email : 'guest@example.com'),
      customerPhone: customerPhone.trim() || '+91 98765 43210',
      serviceId: selectedRide ? selectedRide.id : selectedPkg ? selectedPkg.id : 'wedding-transportation',
      serviceName: serviceType,
      eventDate: eventDate || 'To be confirmed',
      eventLocation: eventLocation || 'City Center / Multiple Venues',
      budgetRange: selectedPkg ? `${selectedPkg.name} Tier` : 'Custom Quote',
      message: `Wedding Transportation Enquiry: ${serviceType}. Guest count: ${guestCount}. Locations: ${eventLocation || 'Not specified'}. Notes: ${message || 'No additional notes provided.'}`,
    });

    setSubmittedEnquiryId(newEnquiry.id);
    setIsSubmitted(true);
  };

  // Icon selector helper
  const getRideIcon = (id: string) => {
    switch (id) {
      case 'luxury-cars':
        return <Car size={26} />;
      case 'vintage-cars':
        return <Sparkles size={26} />;
      case 'premium-suvs':
        return <ShieldCheck size={26} />;
      case 'guest-buses':
        return <Bus size={26} />;
      case 'shuttle-vans':
        return <Navigation size={26} />;
      case 'airport-transfers':
        return <Plane size={26} />;
      default:
        return <Car size={26} />;
    }
  };

  return (
    <div className="saathi-transportation-page" style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>
      {/* ==========================================================================
          SECTION 1 — HERO
          ========================================================================== */}
      <section
        className="saathi-transportation-hero"
        style={{
          paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
          paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
          backgroundColor: 'var(--bg-canvas)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container>
          {/* Breadcrumbs Navigation */}
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
            <span style={{ color: 'var(--saathi-maroon)', fontWeight: 600 }}>Wedding Transportation</span>
          </nav>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(var(--space-8), 5vw, var(--space-16))',
              alignItems: 'center',
            }}
          >
            {/* Left Content Column */}
            <div style={{ maxWidth: '640px' }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Car size={13} />
                  <span>A8 • Luxury Wedding Fleet</span>
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.35rem, 4.5vw, 3.5rem)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  lineHeight: 1.15,
                  letterSpacing: 'var(--tracking-tight)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Wedding Transportation
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                  fontStyle: 'italic',
                  color: 'var(--saathi-maroon)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Arrive in style. Travel with ease.
              </p>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                From elegant bridal cars to coordinated guest transportation, Saathi helps you plan every journey
                around your wedding day.
              </p>

              {/* CTAs */}
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
                  onClick={() => scrollToSection('choose-your-ride')}
                >
                  Explore Transportation
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleOpenQuoteModal()}
                >
                  Get a Quote
                </Button>
              </div>

              {/* Highlights */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                }}
              >
                {[
                  'Curated Luxury & Vintage Fleet',
                  'Uniformed Professional Chauffeurs',
                  'Coordinated Guest Transit Logistics',
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <CheckCircle2 size={13} style={{ color: 'var(--saathi-maroon)' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Card */}
            <div>
              <div
                className="hover-lift"
                style={{
                  borderRadius: 'var(--radius-2xl)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-lg)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Hero Showcase Frame */}
                <div style={{ height: '320px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <ImagePlaceholder
                    variant="hero"
                    label="Luxury Bridal Cars & Fleet Logistics"
                    sublabel="Mercedes S-Class, Vintage Classics & Volvo Luxury Coaches"
                    icon={Car}
                    height="100%"
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-4)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border-subtle)',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--saathi-maroon)' }}>
                      100%
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      On-Time Pickups
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--saathi-maroon)' }}>
                      Vetted
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Chauffeurs
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--saathi-maroon)' }}>
                      6 Fleet
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Ride Options
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================================================
          SECTION 2 — CHOOSE YOUR RIDE (MERGED CATEGORIES & FLEET)
          ========================================================================== */}
      <section
        id="choose-your-ride"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Curated Wedding Fleet"
            title="Choose Your Ride"
            subtitle="From bespoke bridal sedans to synchronized guest transit coaches, explore our dedicated wedding fleet."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
            }}
          >
            {TRANSPORTATION_RIDES.map((ride) => (
              <Card
                key={ride.id}
                elevation="sm"
                padding="none"
                interactive
                className="hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--bg-surface)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {/* Visual Thumbnail */}
                <div style={{ height: '170px', width: '100%', position: 'relative' }}>
                  <ImagePlaceholder
                    variant="card"
                    label={ride.title}
                    sublabel={ride.vehicleExamples}
                    icon={Car}
                    height="100%"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(4px)',
                      color: 'var(--saathi-maroon)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    {ride.badge}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--saathi-nude-tint)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--saathi-maroon)',
                          flexShrink: 0,
                        }}
                      >
                        {getRideIcon(ride.id)}
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 600,
                          color: 'var(--text-headings)',
                        }}
                      >
                        {ride.title}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {ride.description}
                    </p>

                    {/* Metadata tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-4)',
                        fontSize: 'var(--text-xs)',
                      }}
                    >
                      <span
                        style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-surface-soft)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)',
                          fontWeight: 500,
                        }}
                      >
                        Capacity: {ride.capacity}
                      </span>
                      <span
                        style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-surface-soft)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)',
                          fontWeight: 500,
                        }}
                      >
                        {ride.idealFor}
                      </span>
                    </div>

                    {/* Features List */}
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
                      {ride.features.slice(0, 3).map((feat, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-primary)',
                            lineHeight: 1.4,
                          }}
                        >
                          <CheckCircle2 size={14} style={{ color: 'var(--saathi-maroon)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action */}
                  <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                    <Button
                      variant="outline"
                      fullWidth
                      size="md"
                      rightIcon={<ArrowRight size={16} />}
                      onClick={() => handleOpenQuoteModal(ride)}
                    >
                      View Options
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ==========================================================================
          SECTION 3 — TRANSPORTATION FOR EVERYONE
          ========================================================================== */}
      <section
        id="transportation-everyone"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-canvas)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Tailored Logistics"
            title="Transportation for Every Guest"
            subtitle="Dedicated mobility solutions mapped to each key group in your wedding celebration."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {TRANSPORTATION_AUDIENCES.map((audience) => (
              <div
                key={audience.id}
                className="hover-lift"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'var(--saathi-maroon)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {audience.badge}
                    </span>

                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-surface-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--saathi-maroon)',
                      }}
                    >
                      {audience.id === 'bride-groom' ? (
                        <Heart size={18} />
                      ) : audience.id === 'family-vip' ? (
                        <Award size={18} />
                      ) : (
                        <Users size={18} />
                      )}
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {audience.title}
                  </h3>

                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                    {audience.subtitle}
                  </div>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-5)',
                    }}
                  >
                    {audience.description}
                  </p>

                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: 'var(--space-4)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: 'var(--text-muted)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      Included Transit Highlights:
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {audience.highlights.map((hl, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-primary)',
                            lineHeight: 1.4,
                          }}
                        >
                          <CheckCircle2 size={14} style={{ color: 'var(--saathi-maroon)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  fullWidth
                  size="md"
                  onClick={() => handleOpenQuoteModal(undefined, undefined)}
                >
                  Plan for {audience.title}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==========================================================================
          SECTION 4 — SIMPLE. SEAMLESS. ON TIME.
          ========================================================================== */}
      <section
        id="how-it-works"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="Simple. Seamless. On Time."
            subtitle="From initial vehicle selection to punctual event-day arrivals, our step-by-step coordination makes wedding travel effortless."
          />

          {/* 4 Steps Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-16)',
            }}
          >
            {TRANSPORTATION_STEPS.map((item) => (
              <div
                key={item.number}
                className="hover-lift"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-6)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 700,
                    color: 'var(--saathi-maroon)',
                    opacity: 0.85,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {item.number}
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

          {/* Trust Points Footer */}
          <div
            style={{
              borderRadius: 'var(--radius-2xl)',
              backgroundColor: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-subtle)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-6)',
              textAlign: 'center',
            }}
          >
            {TRANSPORTATION_TRUST_POINTS.map((tp) => (
              <div key={tp.id}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    margin: '0 auto var(--space-3) auto',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saathi-maroon)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {tp.id === 'trust-chauffeurs' ? (
                    <Award size={20} />
                  ) : tp.id === 'trust-pickups' ? (
                    <Clock size={20} />
                  ) : tp.id === 'trust-routes' ? (
                    <Navigation size={20} />
                  ) : (
                    <ShieldCheck size={20} />
                  )}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                    marginBottom: '4px',
                  }}
                >
                  {tp.title}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {tp.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==========================================================================
          SECTION 5 — PACKAGES (3 STREAMLINED PACKAGES)
          ========================================================================== */}
      <section
        id="transportation-packages"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-canvas)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Transparent Packages"
            title="Transportation Packages"
            subtitle="Curated wedding transit bundles designed for clear coordination across every scale of celebration."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-8)',
              alignItems: 'stretch',
            }}
          >
            {TRANSPORTATION_PACKAGES.map((pkg) => {
              const isPopular = pkg.isPopular;

              return (
                <div
                  key={pkg.id}
                  className="hover-lift"
                  style={{
                    borderRadius: 'var(--radius-2xl)',
                    backgroundColor: 'var(--bg-surface)',
                    border: isPopular ? '2px solid var(--saathi-maroon)' : '1px solid var(--border-subtle)',
                    padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isPopular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                    position: 'relative',
                  }}
                >
                  {isPopular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '0.25rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--saathi-maroon)',
                        color: '#FAF6F3',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      Most Comprehensive
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: 'var(--saathi-maroon)',
                          backgroundColor: 'var(--bg-surface-soft)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--border-subtle)',
                          display: 'inline-block',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {pkg.badge}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'var(--text-3xl)',
                          fontWeight: 600,
                          color: 'var(--text-headings)',
                          marginBottom: '2px',
                        }}
                      >
                        {pkg.name}
                      </h3>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--saathi-maroon)' }}>
                        For: {pkg.forWhom}
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      {pkg.tagline}
                    </p>

                    {/* Includes List */}
                    <div
                      style={{
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: 'var(--space-4)',
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: 'var(--text-muted)',
                          marginBottom: 'var(--space-3)',
                        }}
                      >
                        What Is Included:
                      </div>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--space-3)',
                        }}
                      >
                        {pkg.includes.map((inc, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-primary)',
                              lineHeight: 1.4,
                            }}
                          >
                            <CheckCircle2
                              size={15}
                              style={{
                                color: 'var(--saathi-maroon)',
                                flexShrink: 0,
                                marginTop: '1px',
                              }}
                            />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    variant={isPopular ? 'primary' : 'outline'}
                    fullWidth
                    size="lg"
                    rightIcon={<ArrowRight size={16} />}
                    onClick={() => handleOpenQuoteModal(undefined, pkg)}
                  >
                    Enquire Now
                  </Button>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ==========================================================================
          SECTION 6 — TRAVEL IN STYLE (MERGED GALLERY & WHY SAATHI)
          ========================================================================== */}
      <section
        id="travel-in-style"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="The Saathi Experience"
            title="Travel in Style"
            subtitle="Curated wedding moments and why celebrations across India choose Saathi for seamless transit."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(var(--space-6), 4vw, var(--space-10))',
              alignItems: 'start',
            }}
          >
            {/* Left: Compact Visual Gallery Showcase */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Wedding Fleet Showcase
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--space-3)',
                }}
              >
                {TRANSPORTATION_GALLERY_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="hover-lift"
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ height: '120px' }}>
                      <ImagePlaceholder
                        variant="gallery"
                        label={item.title}
                        sublabel={item.category}
                        icon={Sparkles}
                        height="100%"
                      />
                    </div>
                    <div style={{ padding: 'var(--space-3)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Why Saathi Section */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-subtle)',
                padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <span
                  style={{
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Quality Assurance
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Why Choose Saathi Transportation?
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {TRANSPORTATION_BENEFITS.map((benefit) => (
                  <div key={benefit.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--saathi-maroon)',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Check size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: '2px' }}>
                        {benefit.title}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {benefit.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================================================
          SECTION 7 — FINAL CTA
          ========================================================================== */}
      <section
        id="transportation-final-cta"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-canvas)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <Container>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, var(--saathi-maroon) 0%, var(--saathi-deep-plum) 100%)',
              color: '#FAF6F3',
              padding: 'clamp(var(--space-8), 6vw, var(--space-16)) clamp(var(--space-6), 4vw, var(--space-12))',
              boxShadow: 'var(--shadow-xl)',
              textAlign: 'center',
              overflow: 'hidden',
              border: '1px solid rgba(210, 179, 167, 0.25)',
            }}
          >
            {/* Background Radial Tint */}
            <div
              style={{
                position: 'absolute',
                top: '-30%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(210, 179, 167, 0.22) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(6px)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#FAF6F3',
                  marginBottom: 'var(--space-4)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Sparkles size={13} />
                <span>Seamless Wedding Mobility</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 2.85rem)',
                  fontWeight: 600,
                  color: '#FAF6F3',
                  lineHeight: 1.2,
                  letterSpacing: 'var(--tracking-tight)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Ready to plan your wedding transportation?
              </h2>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                  color: 'rgba(250, 246, 243, 0.88)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                Tell us what you need and we&apos;ll help you plan a smooth journey for your wedding day.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => handleOpenQuoteModal()}
                >
                  Get a Quote
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.5)', color: '#FAF6F3' }}
                  onClick={() => onNavigate('/categories/weddings-events')}
                >
                  Back to All Verticals
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================================================
          QUOTE & ENQUIRY MODAL (INTEGRATED WITH ENQUIRY CONTEXT)
          ========================================================================== */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="saathi-modal-backdrop animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg-overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 'var(--z-modal)',
            padding: 'var(--space-4)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={handleCloseModal}
        >
          <div
            className="saathi-modal-card animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-subtle)',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close quote modal"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-soft)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <X size={18} />
            </button>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-4) auto',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>

                <h3
                  id={modalTitleId}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Transportation Quote Requested!
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  Thank you for submitting your wedding transportation details. Our transit logistics team will review
                  your requirements and coordinate route options with you shortly.
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--bg-surface-soft)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: 'var(--space-6)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>Enquiry ID:</span>
                    <span style={{ color: 'var(--saathi-maroon)', fontWeight: 700 }}>{submittedEnquiryId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>Selected Service:</span>
                    <span>{serviceType}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>Date:</span>
                    <span>{eventDate || 'To be confirmed'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
                  {isAuthenticated && (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        handleCloseModal();
                        onNavigate('/customer/enquiries');
                      }}
                    >
                      View in My Enquiries
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleCloseModal}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--saathi-maroon)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-subtle)',
                      display: 'inline-block',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Request a Quote
                  </span>
                  <h3
                    id={modalTitleId}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    Plan Your Wedding Fleet
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    Share your requirements to receive tailored vehicle and transit options.
                  </p>
                </div>

                <form onSubmit={handleSubmitEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {/* Service / Vehicle Type */}
                  <div>
                    <label
                      htmlFor="serviceTypeSelect"
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Selected Vehicle or Package
                    </label>
                    <select
                      id="serviceTypeSelect"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-default)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'inherit',
                      }}
                    >
                      <optgroup label="Vehicles">
                        {TRANSPORTATION_RIDES.map((r) => (
                          <option key={r.id} value={r.title}>
                            {r.title} ({r.badge})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Packages">
                        {TRANSPORTATION_PACKAGES.map((p) => (
                          <option key={p.id} value={`${p.name} Package`}>
                            {p.name} Package (For {p.forWhom})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Date & Location Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                    <div>
                      <label
                        htmlFor="eventDateInput"
                        style={{
                          display: 'block',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        Wedding / Event Date
                      </label>
                      <input
                        id="eventDateInput"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-default)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="guestCountSelect"
                        style={{
                          display: 'block',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        Estimated Guests
                      </label>
                      <select
                        id="guestCountSelect"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-default)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'inherit',
                        }}
                      >
                        <option value="Couple Only (1-2)">Couple Only (1-2)</option>
                        <option value="Family (5-15)">Family (5-15)</option>
                        <option value="50–100 Guests">50–100 Guests</option>
                        <option value="100–250 Guests">100–250 Guests</option>
                        <option value="250+ Guests">250+ Guests</option>
                      </select>
                    </div>
                  </div>

                  {/* Pickup & Venue Locations */}
                  <div>
                    <label
                      htmlFor="eventLocationInput"
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Pickup City & Venues
                    </label>
                    <input
                      id="eventLocationInput"
                      type="text"
                      placeholder="e.g. Udaipur (Taj Lake Palace & Airport)"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-default)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Contact Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                    <div>
                      <label
                        htmlFor="customerNameInput"
                        style={{
                          display: 'block',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        id="customerNameInput"
                        type="text"
                        required
                        placeholder="Full Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-default)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="customerPhoneInput"
                        style={{
                          display: 'block',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="customerPhoneInput"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-default)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="customerEmailInput"
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="customerEmailInput"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-default)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="messageInput"
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      id="messageInput"
                      rows={3}
                      placeholder="e.g. Need vintage car for 2 hours baraat entry and luxury bus shuttle for 3 days."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-default)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: 'var(--space-2)' }}>
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      size="lg"
                      rightIcon={<ArrowRight size={18} />}
                    >
                      Submit Transportation Enquiry
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
