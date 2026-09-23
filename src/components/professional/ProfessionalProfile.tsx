import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Award,
  MessageSquare,
  Sparkles,
  Share2,
  ShieldCheck,
  Check,
  Clock,
} from 'lucide-react';
import { Professional } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { PortfolioGallery } from './PortfolioGallery';
import { ReviewSection } from './ReviewSection';
import { A1_SERVICES } from '../../data/weddingPlanningData';

interface ProfessionalProfileProps {
  professional: Professional;
  onEnquire: (pro: Professional) => void;
  onNavigate?: (path: string) => void;
  className?: string;
}

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({
  professional,
  onEnquire,
  onNavigate,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'portfolio' | 'reviews'>('about');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const matchedServices = A1_SERVICES.filter((srv) =>
    professional.servicesOffered.includes(srv.slug)
  );

  return (
    <div className={`saathi-professional-profile ${className}`}>
      {/* Cover Image Banner */}
      <div
        style={{
          height: 'clamp(200px, 25vw, 320px)',
          width: '100%',
          position: 'relative',
          backgroundColor: 'var(--bg-surface-soft)',
          overflow: 'hidden',
        }}
      >
        {professional.coverImageUrl ? (
          <img
            src={professional.coverImageUrl}
            alt={professional.brandName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, var(--saathi-maroon) 0%, var(--saathi-deep-plum) 100%)',
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(24, 14, 23, 0.75) 0%, transparent 60%)',
          }}
        />
      </div>

      <Container>
        {onNavigate && (
          <div style={{ paddingTop: 'var(--space-3)', marginBottom: '-30px', position: 'relative', zIndex: 20 }}>
            <button
              type="button"
              onClick={() => onNavigate('/categories/weddings-events/planning')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                backgroundColor: 'var(--bg-surface)',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              <span>← Back to Directory</span>
            </button>
          </div>
        )}
        {/* Profile Header Card */}
        <div
          style={{
            marginTop: '-60px',
            position: 'relative',
            zIndex: 10,
            marginBottom: 'var(--space-8)',
          }}
        >
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            {/* Top row: Avatar + Core info + Action buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 'var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div
                  style={{
                    border: '3px solid var(--bg-surface)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-md)',
                    marginTop: '-30px',
                  }}
                >
                  <Avatar
                    src={professional.avatarUrl}
                    name={professional.name}
                    size="lg"
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h1
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 600,
                        color: 'var(--text-headings)',
                        lineHeight: 1.2,
                      }}
                    >
                      {professional.brandName}
                    </h1>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        color: 'var(--saathi-maroon)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      <span>Demo Specialist Profile</span>
                    </span>
                  </div>

                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Led by <strong>{professional.name}</strong> • {professional.businessType}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      marginTop: 'var(--space-3)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} style={{ color: 'var(--saathi-maroon)' }} />
                      <span>{professional.location}</span>
                    </div>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Award size={14} style={{ color: 'var(--saathi-maroon)' }} />
                      <span>{professional.experienceYears} Years Experience</span>
                    </div>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={14} style={{ color: 'var(--saathi-maroon)' }} />
                      <span>{professional.eventsCompleted}+ Celebrations Managed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <button
                  type="button"
                  onClick={handleShare}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {copied ? <Check size={14} style={{ color: '#2E7D32' }} /> : <Share2 size={14} />}
                  <span>{copied ? 'Link Copied' : 'Share Profile'}</span>
                </button>

                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<MessageSquare size={16} />}
                  onClick={() => onEnquire(professional)}
                >
                  Send Enquiry
                </Button>
              </div>
            </div>

            {/* Quick Pricing & Availability Highlight Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-4)',
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface-soft)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Starting Budget</span>
                <strong style={{ fontSize: 'var(--text-base)', color: 'var(--text-headings)' }}>
                  {professional.startingPrice}
                </strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
                  ({professional.priceModel})
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Typical Range</span>
                <strong style={{ fontSize: 'var(--text-base)', color: 'var(--saathi-maroon)' }}>
                  {professional.priceRange}
                </strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
                  Based on guest count & scope
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Client Satisfaction</span>
                <div style={{ marginTop: '2px' }}>
                  <Rating value={professional.rating} size="sm" showValue reviewCount={professional.reviewCount} />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Calendar Status</span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                  <Clock size={12} style={{ color: 'var(--saathi-maroon)' }} />
                  {professional.availability}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                borderBottom: '1px solid var(--border-subtle)',
                paddingTop: 'var(--space-2)',
                overflowX: 'auto',
              }}
            >
              {[
                { id: 'about', label: 'About & Philosophy' },
                { id: 'services', label: `Services (${matchedServices.length})` },
                { id: 'portfolio', label: `Portfolio (${professional.portfolio.length})` },
                { id: 'reviews', label: `Client Reviews (${professional.reviewCount})` },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    style={{
                      padding: '0.65rem 0.25rem',
                      fontSize: 'var(--text-sm)',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--saathi-maroon)' : 'var(--text-secondary)',
                      borderBottom: isActive ? '2px solid var(--saathi-maroon)' : '2px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content Layout (Main + Sticky Enquiry Card Sidebar) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) clamp(300px, 30vw, 360px)',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-16)',
          }}
          className="saathi-profile-grid-layout"
        >
          {/* Main Content Column */}
          <div>
            {/* 1. ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                {/* About Bio */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-xl)',
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    Our Story & Curatorial Approach
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-5)',
                    }}
                  >
                    {professional.about}
                  </p>

                  <h4
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--text-muted)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    Core Specialties:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {professional.specialties.map((spec) => (
                      <span
                        key={spec}
                        style={{
                          fontSize: 'var(--text-xs)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--saathi-nude-tint)',
                          color: 'var(--saathi-maroon)',
                          fontWeight: 600,
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cities Served */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-lg)',
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    Operational Cities & Destination Expertise
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {professional.citiesServed.map((city) => (
                      <span
                        key={city}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: 'var(--text-xs)',
                          padding: '0.3rem 0.65rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-soft)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <MapPin size={12} style={{ color: 'var(--saathi-maroon)' }} />
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Portfolio Teaser */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'var(--text-xl)',
                        color: 'var(--text-headings)',
                      }}
                    >
                      Featured Celebrations
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('portfolio')}
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--saathi-maroon)',
                        cursor: 'pointer',
                      }}
                    >
                      View All ({professional.portfolio.length}) →
                    </button>
                  </div>
                  <PortfolioGallery portfolio={professional.portfolio.slice(0, 2)} />
                </div>
              </div>
            )}

            {/* 2. SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {matchedServices.map((srv) => (
                  <div
                    key={srv.id}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-subtle)',
                      padding: 'var(--space-6)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 'var(--space-3)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'var(--text-xl)',
                            color: 'var(--text-headings)',
                          }}
                        >
                          {srv.title}
                        </h4>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Timeline: {srv.typicalTimeline}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Pricing Guide</span>
                        <strong style={{ fontSize: 'var(--text-base)', color: 'var(--saathi-maroon)' }}>
                          {srv.startingPrice}
                        </strong>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {srv.fullDescription}
                    </p>

                    <div style={{ marginBottom: 'var(--space-5)' }}>
                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Service Deliverables:
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        {srv.features.map((feat, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <CheckCircle2 size={14} style={{ color: 'var(--saathi-maroon)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEnquire(professional)}
                    >
                      Enquire for {srv.title}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* 3. PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="animate-fade-in">
                <PortfolioGallery portfolio={professional.portfolio} />
              </div>
            )}

            {/* 4. REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <ReviewSection
                  reviews={professional.reviews}
                  averageRating={professional.rating}
                  totalReviews={professional.reviewCount}
                />
              </div>
            )}
          </div>

          {/* Sticky Sidebar Enquiry Card */}
          <div>
            <div
              style={{
                position: 'sticky',
                top: '90px',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                padding: 'var(--space-6)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Connect with {professional.name.split(' ')[0]}
              </h3>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)', lineHeight: 1.5 }}>
                Share your event dates, city, and requirements to receive a customized proposal and availability check.
              </p>

              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Typical Response Time:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>Within 24 Hours</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Direct Chat:</span>
                  <strong style={{ color: 'var(--saathi-maroon)' }}>Available post-enquiry</strong>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                leftIcon={<MessageSquare size={18} />}
                onClick={() => onEnquire(professional)}
              >
                Request Custom Quote
              </Button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: 'var(--space-4)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}
              >
                <ShieldCheck size={14} style={{ color: 'var(--saathi-maroon)' }} />
                <span>Zero spam • Direct specialist contact</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
