import React, { useState } from 'react';
import { X, Eye } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CATERING_GALLERY, CateringGalleryItem } from '../../data/cateringData';

export const CateringGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<CateringGalleryItem | null>(null);

  const filterOptions = [
    { id: 'all', label: 'All Showcase' },
    { id: 'wedding', label: 'Wedding Banquets' },
    { id: 'live-stations', label: 'Live Stations' },
    { id: 'buffet', label: 'Buffet Setups' },
    { id: 'desserts', label: 'Dessert Galleria' },
    { id: 'presentation', label: 'Chef Plating' },
  ];

  const filteredItems = activeFilter === 'all'
    ? CATERING_GALLERY
    : CATERING_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <section
      id="catering-gallery-showcase"
      className="saathi-catering-gallery"
      style={{
        padding: 'clamp(var(--space-12), 5vw, var(--space-16)) 0',
        backgroundColor: 'var(--bg-surface-soft)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Visual Portfolio"
          title="Catering & Gastronomy Gallery"
          subtitle="Explore live event captures of our partner caterers — from shimmering royal palace banquet tables to theatrical flame-kissed tandoor counters and artisanal dessert displays."
        />

        {/* Gallery Filter Tabs */}
        <div
          className="saathi-tab-strip"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {filterOptions.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: isSelected ? 'var(--saathi-maroon)' : 'var(--bg-surface)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  borderColor: isSelected ? 'var(--saathi-maroon)' : 'var(--border-default)',
                  transition: 'all var(--transition-fast)',
                  flexShrink: 0,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveLightboxItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveLightboxItem(item);
                }
              }}
              className="hover-lift saathi-gallery-card"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  width: '100%',
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
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(24, 14, 23, 0.7) 0%, transparent 60%)',
                  }}
                />

                {/* Category Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(38, 26, 36, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FAF6F3',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {item.categoryLabel}
                </div>

                {/* Hover Preview Eye Icon */}
                <div
                  className="saathi-gallery-eye"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(38, 26, 36, 0.8)',
                    color: '#FAF6F3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Eye size={14} />
                </div>
              </div>

              {/* Card Footer Content */}
              <div style={{ padding: 'var(--space-4)' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
                  {item.description}
                </p>
                {item.catererName && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--saathi-maroon)', fontWeight: 600 }}>
                    Crafted by {item.catererName}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div
            className="saathi-modal-backdrop saathi-catering-modal animate-fade-in"
            onClick={() => setActiveLightboxItem(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(24, 14, 23, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 'var(--z-modal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-4)',
            }}
          >
            <div
              className="saathi-modal-card animate-slide-up"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '750px',
                width: '100%',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveLightboxItem(null)}
                aria-label="Close Lightbox"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(38, 26, 36, 0.85)',
                  color: '#FAF6F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>

              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
              />

              <div style={{ padding: 'var(--space-5)' }}>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--saathi-maroon)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {activeLightboxItem.categoryLabel}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    color: 'var(--text-headings)',
                    margin: 'var(--space-1) 0 var(--space-2) 0',
                  }}
                >
                  {activeLightboxItem.title}
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {activeLightboxItem.description}
                </p>
                {activeLightboxItem.catererName && (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Presented by <strong style={{ color: 'var(--text-headings)' }}>{activeLightboxItem.catererName}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
