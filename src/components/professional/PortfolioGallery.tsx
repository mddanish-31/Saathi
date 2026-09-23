import React, { useState } from 'react';
import { X, MapPin, ZoomIn } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface PortfolioGalleryProps {
  portfolio: PortfolioItem[];
  className?: string;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  portfolio,
  className = '',
}) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  if (!portfolio || portfolio.length === 0) {
    return (
      <div
        style={{
          padding: 'var(--space-8)',
          backgroundColor: 'var(--bg-surface-soft)',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-sm)',
        }}
      >
        No portfolio items currently published for this specialist.
      </div>
    );
  }

  return (
    <div className={`saathi-portfolio-gallery ${className}`}>
      {/* Portfolio Image Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-5)',
        }}
      >
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="hover-lift"
            onClick={() => setSelectedItem(item)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedItem(item);
              }
            }}
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all var(--transition-normal)',
            }}
          >
            {/* Image Container with Hover Zoom Overlay */}
            <div
              style={{
                position: 'relative',
                height: '220px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface-soft)',
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(38, 26, 36, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity var(--transition-fast)',
                }}
                className="portfolio-hover-overlay"
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <div
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--saathi-maroon)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <ZoomIn size={14} />
                  <span>View Project</span>
                </div>
              </div>

              {/* Category Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(38, 26, 36, 0.75)',
                  color: '#FAF6F3',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                }}
              >
                {item.category}
              </div>
            </div>

            {/* Description Body */}
            <div style={{ padding: 'var(--space-4)', flex: '1 0 auto' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                <MapPin size={12} style={{ color: 'var(--saathi-maroon)' }} />
                <span>{item.location}</span>
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h4>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {item.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal for Item Detail */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            backgroundColor: 'var(--bg-overlay)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)',
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: 'var(--shadow-md)',
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* High-res Image Preview */}
            <div style={{ width: '100%', height: '360px', backgroundColor: '#000', overflow: 'hidden' }}>
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Modal Info */}
            <div style={{ padding: 'var(--space-6)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--saathi-maroon)',
                    fontWeight: 600,
                  }}
                >
                  <MapPin size={14} />
                  <span>{selectedItem.location}</span>
                </div>

                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    fontWeight: 600,
                  }}
                >
                  {selectedItem.category}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {selectedItem.title}
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                {selectedItem.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedItem.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 'var(--text-xs)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
