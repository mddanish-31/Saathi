import React from 'react';
import { Check, Sparkles, ArrowRight, CheckCircle2, Users } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { CATERING_PACKAGES, CateringPackage } from '../../data/cateringData';

interface CateringPackagesProps {
  selectedPackageId?: string;
  onSelectPackage: (pkg: CateringPackage) => void;
  onCustomizePackage: (pkg: CateringPackage) => void;
}

export const CateringPackages: React.FC<CateringPackagesProps> = ({
  selectedPackageId,
  onSelectPackage,
  onCustomizePackage,
}) => {
  return (
    <section
      id="catering-packages-section"
      className="saathi-catering-packages"
      style={{
        padding: 'clamp(var(--space-12), 5vw, var(--space-16)) 0',
        backgroundColor: 'var(--bg-surface-soft)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Curated Tiers"
          title="All-Inclusive Catering Packages"
          subtitle="Choose from our meticulously calibrated banquet tiers designed to give your guests a seamless multi-course experience with transparent per-plate pricing."
        />

        {/* 3 Package Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'stretch',
          }}
        >
          {CATERING_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            const isPopular = pkg.tier === 'standard';

            return (
              <div
                key={pkg.id}
                className="hover-lift saathi-package-card"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-2xl)',
                  border: isSelected
                    ? '2.5px solid var(--saathi-maroon)'
                    : isPopular
                    ? '2px solid var(--saathi-nude)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isSelected
                    ? 'var(--shadow-xl)'
                    : isPopular
                    ? 'var(--shadow-lg)'
                    : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                  position: 'relative',
                  transition: 'all var(--transition-normal)',
                }}
              >
                {/* Popular / Tier Ribbon */}
                {pkg.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-13px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: isSelected
                        ? 'var(--saathi-maroon)'
                        : isPopular
                        ? 'var(--saathi-deep-plum)'
                        : 'var(--bg-surface-soft)',
                      color: 'var(--text-inverse)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: 'var(--shadow-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    {isPopular && <Sparkles size={11} />}
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {/* Top Section */}
                <div>
                  <div style={{ marginBottom: 'var(--space-4)', marginTop: pkg.badge ? 'var(--space-2)' : 0 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--text-headings)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div
                    style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: 'var(--space-6)',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Starting From
                      </span>
                      <div
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          color: 'var(--saathi-maroon)',
                          lineHeight: 1,
                          marginTop: '2px',
                        }}
                      >
                        {pkg.pricePerPlate}
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>
                          / plate
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Guest Capacity
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '2px',
                        }}
                      >
                        <Users size={12} style={{ color: 'var(--saathi-maroon)' }} />
                        <span>{pkg.guestRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Composition Breakdown */}
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      Included Menu Courses:
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        <strong style={{ color: 'var(--text-headings)' }}>Starters:</strong> {pkg.foodCategories.starters}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        <strong style={{ color: 'var(--text-headings)' }}>Main Course:</strong> {pkg.foodCategories.mainCourse}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        <strong style={{ color: 'var(--text-headings)' }}>Rice & Breads:</strong> {pkg.foodCategories.riceBreads}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        <strong style={{ color: 'var(--text-headings)' }}>Dessert:</strong> {pkg.dessertDetail}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        <strong style={{ color: 'var(--text-headings)' }}>Beverages:</strong> {pkg.beverageDetail}
                      </div>
                    </div>
                  </div>

                  {/* Included Service Features */}
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      Service Amenities Included:
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {pkg.features.map((feat, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '7px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-primary)',
                            lineHeight: 1.4,
                          }}
                        >
                          <CheckCircle2 size={13} style={{ color: 'var(--saathi-maroon)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Button
                    variant={isSelected ? 'primary' : 'primary'}
                    fullWidth
                    size="md"
                    onClick={() => onSelectPackage(pkg)}
                    leftIcon={isSelected ? <Check size={16} /> : undefined}
                  >
                    {isSelected ? 'Package Selected' : `Select ${pkg.name}`}
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    size="sm"
                    onClick={() => onCustomizePackage(pkg)}
                    rightIcon={<ArrowRight size={14} />}
                  >
                    Customize This Package
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
