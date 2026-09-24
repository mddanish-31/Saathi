import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Button } from '../ui/Button';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  className = '',
}) => {
  return (
    <div
      className={`saathi-service-card hover-lift ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-6)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-normal)',
        position: 'relative',
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
              backgroundColor: 'var(--saathi-nude-tint)',
              color: 'var(--saathi-maroon)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Sparkles size={12} />
            <span>Curated Service</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>From</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-headings)' }}>
              {service.startingPrice}
            </span>
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
            marginBottom: 'var(--space-5)',
          }}
        >
          {service.shortDescription}
        </p>

        {/* Feature List */}
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
            What is Included:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {service.features.slice(0, 3).map((feat, idx) => (
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
                    color: 'var(--saathi-maroon)',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ paddingTop: 'var(--space-2)' }}>
        <Button
          variant="outline"
          fullWidth
          size="md"
          rightIcon={<ArrowRight size={16} />}
          onClick={() => onSelect(service)}
        >
          Explore Specialists
        </Button>
      </div>
    </div>
  );
};