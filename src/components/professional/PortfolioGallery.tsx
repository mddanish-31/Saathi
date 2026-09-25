import React, { useState } from 'react';
import { X, MapPin, ZoomIn, Play, Music2, Camera } from 'lucide-react';
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
              borderRadius: 'var(--radius-xl)',
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
              className="image-zoom-container"
              style={{
                position: 'relative',
                height: '230px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface-soft)',
              }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <ImagePlaceholder
                  variant="gallery"
                  label={item.title}
                  sublabel={item.category}
                  icon={item.type === 'video' ? Play : item.type === 'audio' ? Music2 : Camera}
                  style={{ border: 'none', borderRadius: 0 }}
                />
              )}
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
                  {item.type === 'video' && <Play size={14} />}
                  {item.type === 'audio' && <Music2 size={14} />}
                  {(!item.type || item.type === 'image') && <ZoomIn size={14} />}
                  <span>
                    {item.type === 'video' ? 'Play Video' : item.type === 'audio' ? 'Play Audio Sample' : 'View Project'}
                  </span>
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

              {/* Media Type Badge (video/audio only \u2014 mock UI, no real playback) */}
              {(item.type === 'video' || item.type === 'audio') && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--saathi-maroon)',
                    color: '#FAF6F3',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {item.type === 'video' ? <Play size={11} /> : <Music2 size={11} />}
                  <span>{item.type === 'video' ? 'Video' : 'Audio'}</span>
                </div>
              )}
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

            {/* High-res Image Preview (or Video/Audio placeholder \u2014 mock UI, no real playback) */}
            <div style={{ width: '100%', height: '360px', backgroundColor: 'var(--bg-surface-soft)', overflow: 'hidden', position: 'relative' }}>
              {selectedItem.imageUrl ? (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: selectedItem.type === 'video' || selectedItem.type === 'audio' ? 'brightness(0.55)' : undefined,
                  }}
                />
              ) : (
                <ImagePlaceholder
                  variant="hero"
                  label={selectedItem.title}
                  sublabel={`${selectedItem.category} • ${selectedItem.location}`}
                  icon={selectedItem.type === 'video' ? Play : selectedItem.type === 'audio' ? Music2 : Camera}
                  style={{ border: 'none', borderRadius: 0 }}
                />
              )}
              {(selectedItem.type === 'video' || selectedItem.type === 'audio') && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(250, 246, 243, 0.92)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {selectedItem.type === 'video' ? (
                      <Play size={28} style={{ color: 'var(--saathi-maroon)', marginLeft: '3px' }} />
                    ) : (
                      <Music2 size={26} style={{ color: 'var(--saathi-maroon)' }} />
                    )}
                  </div>
                </div>
              )}
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