import React from 'react';
import { MapPin, Award, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Professional } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';

import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface ProfessionalCardProps {
  professional: Professional;
  onViewProfile: (pro: Professional) => void;
  onEnquire: (pro: Professional) => void;
  className?: string;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  onViewProfile,
  onEnquire,
  className = '',
}) => {
  return (
    <div
      className={`saathi-professional-card hover-lift ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-normal)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Cover Header Image or Placeholder */}
      <div
        className="image-zoom-container"
        style={{
          height: '125px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'var(--bg-surface-soft)',
        }}
      >
        {professional.coverImageUrl ? (
          <img
            src={professional.coverImageUrl}
            alt={professional.brandName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <ImagePlaceholder
            variant="card"
            label=""
            style={{ border: 'none', borderRadius: 0 }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '0.22rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(38, 26, 36, 0.78)',
            color: '#FAF6F3',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            zIndex: 2,
          }}
        >
          {professional.businessType}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ padding: 'var(--space-5)', flex: '1 0 auto' }}>
        {/* Avatar + Main Info Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-3)',
            marginTop: professional.coverImageUrl ? '-32px' : 0,
            marginBottom: 'var(--space-3)',
            position: 'relative',
          }}
        >
          <div
            style={{
              border: '2px solid var(--bg-surface)',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-sm)',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            <Avatar
              src={professional.avatarUrl}
              name={professional.name}
              size="lg"
            />
          </div>

          <div style={{ flex: 1, minWidth: 0, paddingTop: professional.coverImageUrl ? '18px' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={professional.brandName}
              >
                {professional.brandName}
              </h3>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Led by {professional.name}
            </p>
          </div>
        </div>

        {/* Location & Rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: 'var(--space-3)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
            }}
          >
            <MapPin size={13} style={{ color: 'var(--saathi-maroon)' }} />
            <span>{professional.location}</span>
          </div>

          <Rating
            value={professional.rating}
            size="sm"
            showValue
            reviewCount={professional.reviewCount}
          />
        </div>

        {/* Tagline / Pitch */}
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            marginBottom: 'var(--space-4)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '34px',
          }}
        >
          {professional.tagline}
        </p>

        {/* Key Highlights (Experience & Pricing) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-soft)',
            border: '1px solid var(--border-subtle)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Award size={13} style={{ color: 'var(--saathi-maroon)' }} />
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
              {professional.experienceYears}y exp
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ({professional.eventsCompleted} events)
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>From </span>
            <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--saathi-maroon)' }}>
              {professional.startingPrice}
            </strong>
          </div>
        </div>

        {/* Specialties Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: 'var(--space-2)',
          }}
        >
          {professional.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              style={{
                fontSize: '0.6875rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          padding: 'var(--space-3) var(--space-5) var(--space-5) var(--space-5)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <Button
          variant="outline"
          size="sm"
          style={{ flex: 1 }}
          onClick={() => onViewProfile(professional)}
        >
          <span>View Profile</span>
          <ArrowUpRight size={13} />
        </Button>
        <Button
          variant="primary"
          size="sm"
          style={{ flex: 1 }}
          leftIcon={<MessageSquare size={13} />}
          onClick={() => onEnquire(professional)}
        >
          Enquire
        </Button>
      </div>
    </div>
  );
};
