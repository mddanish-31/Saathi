import React, { useEffect } from 'react';
import {
  X,
  MapPin,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { Professional } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';

interface CatererProfilePreviewProps {
  caterer: Professional | null;
  onClose: () => void;
  onEnquire: (caterer: Professional) => void;
}

export const CatererProfilePreview: React.FC<CatererProfilePreviewProps> = ({
  caterer,
  onClose,
  onEnquire,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caterer) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caterer, onClose]);

  if (!caterer) return null;

  return (
    <div
      className="saathi-modal-backdrop saathi-catering-modal animate-fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 14, 23, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <div
        className="saathi-modal-card animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Preview"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(38, 26, 36, 0.8)',
            color: '#FAF6F3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 20,
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--saathi-maroon)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(38, 26, 36, 0.8)')}
        >
          <X size={18} />
        </button>

        {/* Cover Image Banner */}
        <div
          style={{
            position: 'relative',
            height: '220px',
            width: '100%',
            backgroundColor: 'var(--bg-surface-soft)',
            flexShrink: 0,
          }}
        >
          {caterer.coverImageUrl && (
            <img
              src={caterer.coverImageUrl}
              alt={caterer.brandName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(24, 14, 23, 0.8) 0%, transparent 60%)',
            }}
          />

          {/* Type Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '20px',
              backgroundColor: 'rgba(38, 26, 36, 0.85)',
              color: '#FAF6F3',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {caterer.businessType}
          </div>
        </div>

        {/* Profile Details Container */}
        <div style={{ padding: 'clamp(var(--space-6), 4vw, var(--space-8))' }}>
          {/* Header Info: Avatar + Brand + Rating */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              alignItems: 'flex-start',
              marginTop: '-56px',
              marginBottom: 'var(--space-6)',
              position: 'relative',
            }}
          >
            <div
              style={{
                border: '3px solid var(--bg-surface)',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <Avatar
                src={caterer.avatarUrl}
                name={caterer.name}
                size="lg"
              />
            </div>

            <div style={{ flex: 1, minWidth: '240px', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                  }}
                >
                  {caterer.brandName}
                </h2>
                {caterer.verified && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--saathi-nude-tint)',
                      color: 'var(--saathi-maroon)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <ShieldCheck size={13} />
                    Verified Caterer
                  </span>
                )}
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                Led by Head Chef {caterer.name} • {caterer.experienceYears} Years of Culinary Distinction
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  <MapPin size={13} style={{ color: 'var(--saathi-maroon)' }} />
                  <span>{caterer.location} (Serves: {caterer.citiesServed?.join(', ')})</span>
                </div>

                <Rating value={caterer.rating} size="sm" showValue reviewCount={caterer.reviewCount} />
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'var(--space-3)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Starting Price
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--saathi-maroon)' }}>
                {caterer.startingPrice}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Events Hosted
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-headings)' }}>
                {caterer.eventsCompleted}+ Banquets
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Guest Capacity
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-headings)' }}>
                {caterer.minGuests || 50} - {caterer.maxGuests || 2500}+ Guests
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Availability
              </div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--saathi-maroon)' }}>
                {caterer.availability}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              About the Culinary Atelier
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {caterer.about}
            </p>
          </div>

          {/* Cuisines & Live Counters Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {/* Cuisines */}
            <div>
              <h5 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-headings)', marginBottom: 'var(--space-3)' }}>
                Regional & World Cuisines
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {caterer.cuisines?.map((c) => (
                  <span
                    key={c}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Counters */}
            {caterer.liveCounters && caterer.liveCounters.length > 0 && (
              <div>
                <h5 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-headings)', marginBottom: 'var(--space-3)' }}>
                  Signature Live Stations
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {caterer.liveCounters.map((lc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--saathi-maroon)', flexShrink: 0 }} />
                      <span>{lc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Portfolio Showcase Preview */}
          {caterer.portfolio && caterer.portfolio.length > 0 && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Banquet Showcase
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 'var(--space-3)',
                }}
              >
                {caterer.portfolio.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: '1px solid var(--border-subtle)',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '8px', backgroundColor: 'var(--bg-surface)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Preview */}
          {caterer.reviews && caterer.reviews.length > 0 && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Client Testimonials
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {caterer.reviews.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--text-headings)' }}>
                        {r.authorName}
                      </strong>
                      <Rating value={r.rating} size="sm" />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {r.eventType} • {r.location}
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer Button */}
          <div
            style={{
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: 'var(--space-3)',
            }}
          >
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<MessageSquare size={16} />}
              onClick={() => {
                onClose();
                onEnquire(caterer);
              }}
            >
              Send Catering Enquiry to {caterer.brandName}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
