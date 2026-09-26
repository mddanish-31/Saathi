"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { MASTER_WEDDINGS_CATEGORY, MOCK_PROFESSIONALS } from '../data/weddingPlanningData';
import { CategoryHero } from '../components/category/CategoryHero';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ProfessionalCard } from '../components/professional/ProfessionalCard';
import { Professional } from '../types';

interface WeddingsEventsPageProps {
  onNavigate: (path: string) => void;
}

export const WeddingsEventsPage: React.FC<WeddingsEventsPageProps> = ({ onNavigate }) => {
  const [professionals, setProfessionals] = useState<Professional[]>(() => MOCK_PROFESSIONALS.slice(0, 3));

  useEffect(() => {
    let isMounted = true;
    async function loadPros() {
      try {
        const res = await fetch('/api/professionals?category=weddings-events&limit=6');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.professionals && data.professionals.length > 0) {
            setProfessionals(data.professionals);
          }
        }
      } catch (err) {
        console.error('Failed to load professionals for WeddingsEventsPage:', err);
      }
    }
    loadPros();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleViewProfile = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}`);
  };

  const handleEnquire = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}/enquire`);
  };

  return (
    <div className="saathi-weddings-events-page">
      {/* Category Hero */}
      <CategoryHero
        title={MASTER_WEDDINGS_CATEGORY.name}
        description={MASTER_WEDDINGS_CATEGORY.description}
        onNavigate={onNavigate}
        highlights={[
          'Curated Luxury & Heritage Specialists',
          'Turnkey Planning & Coordination',
          'Zero Middlemen Markup',
        ]}
      />

      {/* Subcategory Exploration Section */}
      <section style={{ padding: 'clamp(var(--space-12), 6vw, var(--space-16)) 0', backgroundColor: 'var(--bg-app)' }}>
        <Container>
          <SectionHeading
            eyebrow="Specialized Verticals"
            title="Curated Wedding & Celebration Domains"
            subtitle="Explore our certified service verticals designed to orchestrate every sacred ritual, glamorous sangeet, and bespoke culinary moment."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-16)',
            }}
          >
            {MASTER_WEDDINGS_CATEGORY.subCategories.map((sub) => {
              const isFeatured = sub.isActive;

              return (
                <div
                  key={sub.id}
                  className="hover-lift"
                  onClick={() => {
                    onNavigate(`/categories/weddings-events/${sub.slug}`);
                  }}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-xl)',
                    border: isFeatured ? '1.5px solid var(--saathi-maroon)' : '1px solid var(--border-subtle)',
                    padding: 'clamp(var(--space-5), 3vw, var(--space-6))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isFeatured ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    cursor: 'pointer',
                    opacity: isFeatured ? 1 : 0.9,
                    position: 'relative',
                    transition: 'all var(--transition-normal)',
                  }}
                >
                  {isFeatured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '16px',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--saathi-maroon)',
                        color: '#FAF6F3',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Active Vertical
                    </div>
                  )}

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          color: isFeatured ? 'var(--saathi-maroon)' : 'var(--text-muted)',
                        }}
                      >
                        {sub.code}
                      </span>

                      {sub.badge && (
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--bg-surface-soft)',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {sub.badge}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        color: 'var(--text-headings)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {sub.name}
                    </h3>

                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {sub.description}
                    </p>
                  </div>

                  {isFeatured ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--saathi-maroon)',
                        paddingTop: 'var(--space-2)',
                        borderTop: '1px solid var(--border-subtle)',
                      }}
                    >
                      <span>Explore {sub.name}</span>
                      <ArrowRight size={14} />
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                        paddingTop: 'var(--space-2)',
                        borderTop: '1px solid var(--border-subtle)',
                      }}
                    >
                      Upcoming vertical release
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Featured Planning Specialists Showcase */}
          <SectionHeading
            eyebrow="Curated Talent"
            title="Featured Wedding Specialists"
            subtitle="Connect with leading planners and coordinators ready to tailor your upcoming occasion."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
            }}
          >
            {professionals.slice(0, 3).map((pro) => (
              <ProfessionalCard
                key={pro.id}
                professional={pro}
                onViewProfile={handleViewProfile}
                onEnquire={handleEnquire}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              onClick={() => onNavigate('/categories/weddings-events/planning')}
            >
              View All Wedding Planning & Coordination Specialists
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};
