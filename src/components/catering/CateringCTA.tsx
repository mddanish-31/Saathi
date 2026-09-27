import React from 'react';
import { Sparkles, ArrowRight, Utensils } from 'lucide-react';
import { Container } from '../ui/Container';

interface CateringCTAProps {
  onGetQuoteClick: () => void;
  onExploreCaterersClick: () => void;
}

export const CateringCTA: React.FC<CateringCTAProps> = ({
  onGetQuoteClick,
  onExploreCaterersClick,
}) => {
  return (
    <section
      id="catering-final-cta"
      className="saathi-catering-cta"
      style={{
        padding: 'clamp(var(--space-12), 5vw, var(--space-16)) 0',
        backgroundColor: 'var(--bg-app)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-2xl)',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            padding: 'clamp(var(--space-8), 6vw, var(--space-16)) clamp(var(--space-6), 4vw, var(--space-12))',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(210, 179, 167, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--saathi-nude-tint)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 'var(--space-4)',
                border: '1px solid var(--border)',
              }}
            >
              <Sparkles size={13} />
              <span>Bespoke Food & Event Banquets</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                letterSpacing: 'var(--tracking-tight)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Make Every Gathering Taste Exceptional
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                color: 'var(--text-muted)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-8)',
              }}
            >
              Connect with verified master caterers and create a custom celebration menu tailored to your guests. Request personalized multi-course quotes in minutes.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                justifyContent: 'center',
              }}
            >
              <button
                id="cta-get-catering-quote-btn"
                type="button"
                onClick={onGetQuoteClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.85rem 1.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent)',
                  color: 'var(--btn-primary-text)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                }}
              >
                <span>Get a Catering Quote</span>
                <ArrowRight size={18} />
              </button>

              <button
                id="cta-explore-caterers-btn"
                type="button"
                onClick={onExploreCaterersClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.85rem 1.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1.5px solid var(--border)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <Utensils size={18} />
                <span>Explore Caterers</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
