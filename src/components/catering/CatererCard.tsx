import React from 'react';
import { MapPin, Award, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Professional } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';

interface CatererCardProps {
  caterer: Professional;
  onViewCaterer: (caterer: Professional) => void;
  onEnquire: (caterer: Professional) => void;
}

export const CatererCard: React.FC<CatererCardProps> = ({
  caterer,
  onViewCaterer,
  onEnquire,
}) => {
  return (
    <div
      className="saathi-caterer-card hover-lift"
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
      {/* Cover Header Banner */}
      <div
        style={{
          height: '130px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'var(--bg-surface-soft)',
        }}
      >
        {caterer.coverImageUrl ? (
          <img
            src={caterer.coverImageUrl}
            alt={caterer.brandName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
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
            background: 'linear-gradient(to top, rgba(24, 14, 23, 0.6) 0%, transparent 70%)',
          }}
        />

        {/* Business Type Badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(38, 26, 36, 0.85)',
            color: '#FAF6F3',
            fontSize: '0.6875rem',
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {caterer.businessType}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Avatar + Main Info Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-3)',
            marginTop: '-36px',
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
              src={caterer.avatarUrl}
              name={caterer.name}
              size="lg"
            />
          </div>

          <div style={{ flex: 1, minWidth: 0, paddingTop: '20px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-headings)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={caterer.brandName}
            >
              {caterer.brandName}
            </h3>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Head Chef: {caterer.name}
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
            <span>{caterer.location}</span>
          </div>

          <Rating
            value={caterer.rating}
            size="sm"
            showValue
            reviewCount={caterer.reviewCount}
          />
        </div>

        {/* Tagline */}
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
          {caterer.tagline}
        </p>

        {/* Highlight strip (Experience & Pricing) */}
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
              {caterer.experienceYears}y exp
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
              ({caterer.eventsCompleted} events)
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>From </span>
            <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--saathi-maroon)' }}>
              {caterer.startingPrice}
            </strong>
          </div>
        </div>

        {/* Cuisines & Specialties Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: 'var(--space-4)',
          }}
        >
          {caterer.cuisines?.slice(0, 3).map((c) => (
            <span
              key={c}
              style={{
                fontSize: '0.6875rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {c}
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
          onClick={() => onViewCaterer(caterer)}
          rightIcon={<ArrowUpRight size={13} />}
        >
          View Caterer
        </Button>
        <Button
          variant="primary"
          size="sm"
          style={{ flex: 1 }}
          leftIcon={<MessageSquare size={13} />}
          onClick={() => onEnquire(caterer)}
        >
          Enquire
        </Button>
      </div>
    </div>
  );
};
