"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Award, ArrowUpRight, MessageSquare, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Professional } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface ProfessionalCardProps {
  professional: Professional;
  onViewProfile: (pro: Professional) => void;
  onEnquire: (pro: Professional) => void;
  onExpand?: (pro: Professional) => void;
  className?: string;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  onViewProfile,
  onEnquire,
  onExpand,
  className = '',
}) => {
  // Pull real portfolio image tied to this professional, falling back to coverImageUrl
  const representativePhoto =
    professional.portfolio && professional.portfolio.length > 0 && professional.portfolio[0].imageUrl
      ? professional.portfolio[0].imageUrl
      : professional.coverImageUrl;

  const handleCardClick = () => {
    if (onExpand) {
      onExpand(professional);
    } else {
      onViewProfile(professional);
    }
  };

  return (
    <motion.div
      layoutId={`pro-card-${professional.id}`}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      onClick={handleCardClick}
      className={`saathi-professional-card group cursor-pointer ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
      }}
    >
      {/* Cover Header Image (Representative Portfolio / Work Shot) */}
      <div
        className="image-zoom-container relative"
        style={{
          height: '145px',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-surface-soft)',
        }}
      >
        {representativePhoto ? (
          <Image
            src={representativePhoto}
            alt={professional.brandName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={representativePhoto.startsWith('data:')}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            variant="card"
            label=""
            style={{ border: 'none', borderRadius: 0 }}
          />
        )}

        {/* Gradient scrim for top badges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Business Type Badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '0.22rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(23, 20, 18, 0.82)',
            color: 'var(--text-inverse)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            zIndex: 2,
          }}
        >
          {professional.businessType}
        </div>

        {/* Expand Hint Pill */}
        <div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '0.22rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(23, 20, 18, 0.85)',
            color: 'var(--text-inverse)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 2,
          }}
        >
          <Maximize2 size={11} />
          <span>Quick View</span>
        </div>

        {/* Portfolio items count indicator */}
        {professional.portfolio && professional.portfolio.length > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '10px',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(23, 20, 18, 0.75)',
              color: 'var(--text-inverse)',
              fontSize: '0.625rem',
              fontWeight: 500,
              zIndex: 2,
            }}
          >
            {professional.portfolio.length} portfolio {professional.portfolio.length === 1 ? 'item' : 'works'}
          </div>
        )}
      </div>

      {/* Main Body */}
      <div style={{ padding: 'var(--space-5)', flex: '1 0 auto' }}>
        {/* Avatar + Main Info Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-3)',
            marginTop: representativePhoto ? '-34px' : 0,
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
              flexShrink: 0,
            }}
          >
            <Avatar
              src={professional.avatarUrl}
              name={professional.name}
              size="lg"
            />
          </div>

          <div style={{ flex: 1, minWidth: 0, paddingTop: representativePhoto ? '20px' : 0 }}>
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
              {professional.verified && (
                <CheckCircle2 size={13} className="text-[var(--accent)] flex-shrink-0" />
              )}
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
            <MapPin size={13} style={{ color: 'var(--accent)' }} />
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
            <Award size={13} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
              {professional.experienceYears}y exp
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ({professional.eventsCompleted} events)
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>From </span>
            <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)' }}>
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
        onClick={(e) => e.stopPropagation()}
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
    </motion.div>
  );
};
