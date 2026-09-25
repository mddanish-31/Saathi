import React from 'react';
import {
  Utensils,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Award,
  Users,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface CateringHeroProps {
  onNavigate: (path: string) => void;
  onExploreClick: () => void;
  onGetQuoteClick: () => void;
}

export const CateringHero: React.FC<CateringHeroProps> = ({
  onNavigate,
  onExploreClick,
  onGetQuoteClick,
}) => {
  return (
    <section
      className="saathi-catering-hero"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
        paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-16))',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--card-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      <Container>
        {/* Breadcrumb Bar */}
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
            Catering, Food & Desserts
          </span>
        </nav>

        {/* Main Grid: Hero Copy on Left, Editorial Montage on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(var(--space-8), 5vw, var(--space-16))',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Headline, Copy, Action CTAs & Trust Badges */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <Badge variant="brand" icon={<Utensils size={13} />}>
                Curated Catering Marketplace • Bespoke Banquets & Feasts
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.35rem, 4.8vw, 3.75rem)',
                fontWeight: 600,
                color: 'var(--text-headings)',
                lineHeight: 1.15,
                letterSpacing: 'var(--tracking-tight)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Exceptional Food for Exceptional Gatherings
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-8)',
                maxWidth: '560px',
              }}
            >
              From royal multi-day wedding banquets to bespoke private chef tables. Discover verified master caterers, explore signature multi-cuisine menus, and design custom event dining tailored to your celebration.
            </p>

            {/* CTA Action Group */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <Button
                id="hero-explore-catering-btn"
                variant="primary"
                size="lg"
                onClick={onExploreClick}
                rightIcon={<ArrowRight size={18} />}
              >
                Explore Catering
              </Button>
              <Button
                id="hero-get-quote-btn"
                variant="outline"
                size="lg"
                onClick={onGetQuoteClick}
                leftIcon={<Sparkles size={16} />}
              >
                Get a Quote
              </Button>
            </div>

            {/* Trust Highlights Strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-6)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div
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
                  color: 'var(--text-primary)',
                }}
              >
                <ShieldCheck size={14} style={{ color: 'var(--saathi-maroon)' }} />
                <span>Hygiene Audited Caterers</span>
              </div>
              <div
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
                  color: 'var(--text-primary)',
                }}
              >
                <CheckCircle2 size={14} style={{ color: 'var(--saathi-maroon)' }} />
                <span>100% Custom Menus</span>
              </div>
              <div
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
                  color: 'var(--text-primary)',
                }}
              >
                <Award size={14} style={{ color: 'var(--saathi-maroon)' }} />
                <span>Transparent Per-Plate Pricing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Catering & Gourmet Banquet Setup"
                style={{
                  width: '100%',
                  height: 'clamp(320px, 40vw, 440px)',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Floating Highlight Card: Live Counters */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(38, 26, 36, 0.82)',
                  backdropFilter: 'blur(8px)',
                  color: '#FAF6F3',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saathi-maroon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FAF6F3',
                  }}
                >
                  <Sparkles size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Theatrical Live Stations</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>Tandoor • Dim Sum • Chaats</div>
                </div>
              </div>

              {/* Floating Bottom Card: Verified Caterer Stat */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  left: '16px',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '0.85rem 1.15rem',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--saathi-maroon)',
                    }}
                  >
                    <Users size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-headings)' }}>
                      50+ Verified Master Caterers
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Regional Awadhi, Pure Veg, Global & Coastal
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Starting at
                  </span>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--saathi-maroon)' }}>
                    ₹850 / plate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
