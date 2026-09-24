import React from 'react';
import { ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CATERING_CATEGORIES, CateringCategory } from '../../data/cateringData';

interface CateringCategoriesProps {
  selectedCategorySlug?: string;
  onSelectCategory: (category: CateringCategory) => void;
}

export const CateringCategories: React.FC<CateringCategoriesProps> = ({
  selectedCategorySlug,
  onSelectCategory,
}) => {
  return (
    <section
      id="catering-event-categories"
      className="saathi-catering-categories"
      style={{
        padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Celebration Formats"
          title="Catering Tailored for Every Occasion"
          subtitle="Whether you are hosting a 1,000-guest royal wedding feast or an intimate 15-guest chef tasting table, discover bespoke menus engineered for your event type."
        />

        {/* Categories Multi-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {CATERING_CATEGORIES.map((cat) => {
            const isSelected = selectedCategorySlug === cat.slug;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className="hover-lift"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: isSelected
                    ? '2px solid var(--saathi-maroon)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--transition-normal)',
                  position: 'relative',
                }}
              >
                {/* Image Banner */}
                <div
                  style={{
                    position: 'relative',
                    height: '190px',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-surface-soft)',
                  }}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
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
                      background:
                        'linear-gradient(to top, rgba(24, 14, 23, 0.75) 0%, transparent 60%)',
                    }}
                  />

                  {/* Guest Count Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(38, 26, 36, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FAF6F3',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    <Users size={12} />
                    <span>{cat.guestRange}</span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '16px',
                      right: '16px',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        color: '#FAF6F3',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--saathi-maroon)',
                        marginBottom: 'var(--space-2)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {cat.tagline}
                    </p>

                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {cat.description}
                    </p>

                    {/* Features List */}
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--text-muted)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Highlights:
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        {cat.features.slice(0, 3).map((feat, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            <CheckCircle2
                              size={13}
                              style={{ color: 'var(--saathi-maroon)', flexShrink: 0 }}
                            />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div
                    style={{
                      paddingTop: 'var(--space-3)',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--saathi-maroon)',
                      }}
                    >
                      Configure Menu
                    </span>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isSelected
                          ? 'var(--saathi-maroon)'
                          : 'var(--saathi-nude-tint)',
                        color: isSelected ? '#FFFFFF' : 'var(--saathi-maroon)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
