import React from 'react';
import { ShieldCheck, Quote, Utensils } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Rating } from '../ui/Rating';
import { CATERING_REVIEWS, CateringReview } from '../../data/cateringData';

export const CateringReviews: React.FC = () => {
  return (
    <section
      id="catering-client-reviews"
      className="saathi-catering-reviews"
      style={{
        padding: 'clamp(var(--space-12), 5vw, var(--space-16)) 0',
        backgroundColor: 'var(--bg-surface-soft)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Client Experiences"
          title="Client Reviews & Host Testimonials"
          subtitle="Read real stories from couples, corporate planners, and families who trusted Saathi master caterers for their unforgettable celebrations."
        />

        {/* Reviews Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {CATERING_REVIEWS.map((rev: CateringReview) => (
            <div
              key={rev.id}
              className="hover-lift saathi-review-card"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all var(--transition-normal)',
              }}
            >
              {/* Quote Icon watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  color: 'var(--saathi-nude)',
                  opacity: 0.35,
                }}
              >
                <Quote size={28} />
              </div>

              <div>
                {/* Rating & Event Type */}
                <div style={{ marginBottom: 'var(--space-3)' }}>
                  <Rating value={rev.rating} size="sm" />
                </div>

                <div
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--saathi-maroon)',
                    letterSpacing: '0.04em',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {rev.eventType} • {rev.guestCount}
                </div>

                <div
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {rev.roleOrLocation}
                </div>

                {/* Comment */}
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                    fontStyle: 'italic',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  "{rev.comment}"
                </p>

                {/* Menu Highlights Pills */}
                {rev.menuHighlights && rev.menuHighlights.length > 0 && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Utensils size={10} style={{ color: 'var(--saathi-maroon)' }} />
                      <span>Standout Dishes:</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {rev.menuHighlights.map((dish, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.65rem',
                            padding: '0.15rem 0.45rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--bg-surface-soft)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Author & Caterer info */}
              <div
                style={{
                  paddingTop: 'var(--space-3)',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-headings)' }}>
                    {rev.authorName}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    Catered by {rev.catererName}
                  </div>
                </div>

                {rev.verified && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: 'var(--saathi-maroon)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                    title="Verified Event"
                  >
                    <ShieldCheck size={11} />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
