"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SearchX,
  RotateCcw,
  X,
  MapPin,
  Award,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Camera,
  Calendar,
} from 'lucide-react';
import { Professional } from '../../types';
import { ProfessionalCard } from './ProfessionalCard';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface ProfessionalGridProps {
  professionals: Professional[];
  onViewProfile: (pro: Professional) => void;
  onEnquire: (pro: Professional) => void;
  onResetFilters?: () => void;
  className?: string;
}

export const ProfessionalGrid: React.FC<ProfessionalGridProps> = ({
  professionals,
  onViewProfile,
  onEnquire,
  onResetFilters,
  className = '',
}) => {
  const [expandedPro, setExpandedPro] = useState<Professional | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedPro(null);
      }
    };
    if (expandedPro) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [expandedPro]);

  if (professionals.length === 0) {
    return (
      <div
        className="animate-fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) var(--space-4)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px dashed var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          margin: 'var(--space-6) 0',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--saathi-nude-tint)',
            color: 'var(--saathi-maroon)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-4)',
          }}
        >
          <SearchX size={26} />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--text-headings)',
            marginBottom: 'var(--space-2)',
          }}
        >
          No Specialists Match Your Criteria
        </h3>

        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
          }}
        >
          Try loosening your city, price, or search criteria to explore more wedding planning and coordination specialists across India.
        </p>

        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw size={14} />}
            onClick={onResetFilters}
          >
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  const representativePhoto = expandedPro
    ? (expandedPro.portfolio && expandedPro.portfolio.length > 0 && expandedPro.portfolio[0].imageUrl) ||
      expandedPro.coverImageUrl
    : null;

  return (
    <>
      <div
        className={`saathi-professional-grid ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {professionals.map((pro) => (
          <ProfessionalCard
            key={pro.id}
            professional={pro}
            onViewProfile={onViewProfile}
            onEnquire={onEnquire}
            onExpand={setExpandedPro}
          />
        ))}
      </div>

      {/* Shared-Element Expand Modal */}
      <AnimatePresence>
        {expandedPro && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setExpandedPro(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            />

            {/* Expanded Card (Shared Layout Animation from clicked position) */}
            <motion.div
              layoutId={`pro-card-${expandedPro.id}`}
              role="dialog"
              aria-modal="true"
              aria-label={expandedPro.brandName}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setExpandedPro(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-sm"
                aria-label="Close dialog"
              >
                <X size={18} strokeWidth={2} />
              </button>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto flex-1">
                {/* Large Hero Banner / Work Photo */}
                <div className="relative h-64 sm:h-72 w-full bg-[var(--bg-surface-soft)]">
                  {representativePhoto ? (
                    <Image
                      src={representativePhoto}
                      alt={expandedPro.brandName}
                      fill
                      priority
                      className="object-cover"
                    />
                  ) : (
                    <ImagePlaceholder variant="card" label="" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-black/40" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm border border-white/15">
                      {expandedPro.businessType}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-6 -mt-12 relative z-10">
                  {/* Header Row: Avatar + Brand */}
                  <div className="flex items-start gap-4">
                    <div className="p-1 rounded-full bg-[var(--bg-surface)] shadow-md border border-[var(--border-subtle)] flex-shrink-0">
                      <Avatar src={expandedPro.avatarUrl} name={expandedPro.name} size="lg" />
                    </div>
                    <div className="flex-1 min-w-0 pt-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[var(--text-primary)]">
                          {expandedPro.brandName}
                        </h2>
                        {expandedPro.verified && (
                          <span title="Vetted by Saathi Editorial Concierge">
                            <CheckCircle2 size={16} className="text-[var(--accent)] flex-shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Directed by {expandedPro.name} • {expandedPro.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating + Highlights Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)] block">Rating</span>
                      <Rating value={expandedPro.rating} size="sm" showValue reviewCount={expandedPro.reviewCount} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)] block">Experience</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        {expandedPro.experienceYears} Years
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)] block">Events Done</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        {expandedPro.eventsCompleted}+ Ceremonies
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)] block">Starting Fee</span>
                      <span className="text-xs font-bold text-[var(--accent)]">
                        {expandedPro.startingPrice}
                      </span>
                    </div>
                  </div>

                  {/* Tagline & About */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      About the Studio
                    </h4>
                    <p className="text-sm font-medium text-[var(--text-primary)] italic">
                      "{expandedPro.tagline}"
                    </p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {expandedPro.about}
                    </p>
                  </div>

                  {/* Portfolio Gallery Preview (Real photos uploaded for this specialist) */}
                  {expandedPro.portfolio && expandedPro.portfolio.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                          <Camera size={13} className="text-[var(--accent)]" />
                          <span>Uploaded Portfolio Works ({expandedPro.portfolio.length})</span>
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {expandedPro.portfolio.map((item) => (
                          <div
                            key={item.id}
                            className="group relative h-28 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-base)]"
                          >
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                sizes="200px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-[var(--text-muted)]">
                                {item.title}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 p-2 flex flex-col justify-end">
                              <span className="text-[10px] font-semibold text-white truncate">
                                {item.title}
                              </span>
                              <span className="text-[9px] text-white/70 truncate">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specialties Pills */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Signature Specialties
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {expandedPro.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs px-3 py-1 rounded-full bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-secondary)]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Dialog Footer */}
              <div className="p-4 sm:p-5 bg-[var(--bg-surface-soft)] border-t border-[var(--border)] flex items-center gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    const pro = expandedPro;
                    setExpandedPro(null);
                    onViewProfile(pro);
                  }}
                >
                  <span>View Full Profile Page</span>
                  <ArrowUpRight size={14} />
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  leftIcon={<MessageSquare size={14} />}
                  onClick={() => {
                    const pro = expandedPro;
                    setExpandedPro(null);
                    onEnquire(pro);
                  }}
                >
                  Send Direct Enquiry
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
