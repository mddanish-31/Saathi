import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Button } from '../ui/Button';

export interface ServiceCardProps {
  service: Partial<ServiceItem> & { title: string };
  onSelect?: (service: ServiceItem) => void;
  isComingSoon?: boolean;
  ctaLabel?: string;
  badge?: string;
  category?: string;
  location?: string;
  professionalCount?: number;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  isComingSoon: propIsComingSoon,
  ctaLabel,
  badge,
  className = '',
}) => {
  const isComingSoon = propIsComingSoon ?? service.isComingSoon ?? false;
  const description = service.shortDescription || service.fullDescription || 'Specialized service curated for your celebration needs.';
  const features = service.features || [];

  return (
    <div
      className={`saathi-service-card hover-lift ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(var(--space-5), 3vw, var(--space-6))',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-normal)',
        position: 'relative',
        opacity: isComingSoon ? 0.95 : 1,
      }}
    >
      <div>
        {/* Top Header */}
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isComingSoon ? 'var(--bg-surface-soft)' : 'var(--saathi-nude-tint)',
              color: isComingSoon ? 'var(--text-muted)' : 'var(--saathi-maroon)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              border: '1px solid var(--border-subtle)',
            }}
          >
            {isComingSoon ? <Clock size={12} /> : <Sparkles size={12} />}
            <span>{badge || (isComingSoon ? 'Planned Service' : 'Curated Service')}</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            {isComingSoon ? (
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                In Curation
              </span>
            ) : (
              <>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>From</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-headings)' }}>
                  {service.startingPrice || 'On Request'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--text-headings)',
            marginBottom: 'var(--space-2)',
            lineHeight: 1.3,
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
            marginBottom: features.length > 0 ? 'var(--space-5)' : 'var(--space-6)',
          }}
        >
          {description}
        </p>

        {/* Feature List (if present) */}
        {features.length > 0 && (
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: 'var(--space-3)',
              }}
            >
              Key Highlights:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {features.slice(0, 3).map((feat, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                  }}
                >
                  <CheckCircle2
                    size={14}
                    style={{
                      color: isComingSoon ? 'var(--text-muted)' : 'var(--saathi-maroon)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div style={{ paddingTop: 'var(--space-2)' }}>
        {isComingSoon ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-subtle)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            <span>{ctaLabel || 'Coming Soon'}</span>
          </div>
        ) : (
          <Button
            variant="outline"
            fullWidth
            size="md"
            rightIcon={<ArrowRight size={16} />}
            onClick={() => onSelect && onSelect(service as ServiceItem)}
          >
            {ctaLabel || 'Explore Specialists'}
          </Button>
        )}
      </div>
    </div>
  );
};
