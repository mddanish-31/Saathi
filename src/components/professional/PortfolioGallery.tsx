"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Play, Music2, Camera, Tag } from 'lucide-react';
import { PortfolioItem } from '../../types';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface PortfolioGalleryProps {
  portfolio: PortfolioItem[];
  className?: string;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  portfolio,
  className = '',
}) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  if (!portfolio || portfolio.length === 0) {
    return (
      <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl text-center text-xs text-[var(--text-muted)]">
        No portfolio items currently published for this specialist.
      </div>
    );
  }

  // Bento grid sizing based on index
  const getBentoClasses = (index: number) => {
    if (index === 0) {
      return 'col-span-12 md:col-span-8 md:row-span-2 min-h-[340px] md:min-h-[440px]';
    } else if (index === 1 || index === 2) {
      return 'col-span-12 sm:col-span-6 md:col-span-4 min-h-[210px]';
    } else if (index === 3) {
      return 'col-span-12 md:col-span-6 min-h-[240px]';
    } else {
      return 'col-span-12 sm:col-span-6 md:col-span-6 min-h-[240px]';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Portfolio Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5">
        {portfolio.map((item, index) => {
          const bentoClass = getBentoClasses(index);

          return (
            <motion.div
              key={item.id}
              layoutId={`portfolio-item-${item.id}`}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              onClick={() => setSelectedItem(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
              className={`card-editorial group relative overflow-hidden cursor-pointer flex flex-col justify-end p-5 select-none ${bentoClass}`}
            >
              {/* Image / Background */}
              <div className="absolute inset-0 z-0">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    unoptimized={item.imageUrl.startsWith('data:')}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--bg-surface)] flex items-center justify-center text-[var(--accent)]">
                    <ImagePlaceholder
                      variant="gallery"
                      label={item.title}
                      sublabel={item.category}
                      icon={item.type === 'video' ? Play : item.type === 'audio' ? Music2 : Camera}
                    />
                  </div>
                )}
                {/* Gradient Scrim for readable text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/60 to-transparent" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-auto pb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[var(--accent-soft)] text-[var(--text-primary)]">
                  {item.category}
                </span>

                {item.type && item.type !== 'image' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface)] text-[var(--accent)] border border-[var(--border)] inline-flex items-center gap-1">
                    {item.type === 'video' ? <Play size={10} /> : <Music2 size={10} />}
                    <span>{item.type}</span>
                  </span>
                )}
              </div>

              {/* Bottom Metadata */}
              <div className="relative z-10 pt-4">
                <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mb-1">
                  <MapPin size={11} strokeWidth={1.75} className="text-[var(--accent)]" />
                  <span>{item.location}</span>
                </div>

                <h4 className="font-heading font-semibold text-base sm:text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--bg-surface)]/90 border border-[var(--border)] text-[var(--text-muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Shared-Element Expand Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dimmed backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            />

            {/* Shared layout dialog */}
            <motion.div
              layoutId={`portfolio-item-${selectedItem.id}`}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={18} strokeWidth={2} />
              </button>

              {selectedItem.imageUrl && (
                <div className="relative w-full h-72 sm:h-96 bg-[var(--bg-base)]">
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-black/30" />
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--text-primary)]">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <MapPin size={12} className="text-[var(--accent)]" />
                    {selectedItem.location}
                  </span>
                </div>

                <h3 className="text-2xl font-heading font-semibold text-[var(--text-primary)]">
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};