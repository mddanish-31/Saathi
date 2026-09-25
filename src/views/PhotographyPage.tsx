"use client";

import React, { useState } from 'react';
import {
  Camera,
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CategoryHero } from '../components/category/CategoryHero';

interface PhotographyPageProps {
  onNavigate: (path: string) => void;
}

interface FeatureCardData {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
  startingPrice: string;
  deliveryTime: string;
}

const PHOTOGRAPHY_FEATURE_CARDS: FeatureCardData[] = [
  {
    id: 'wedding-photography',
    title: 'Wedding Photography',
    badge: 'Sacred Celebrations',
    description:
      'Immersive candid and traditional coverage preserving the emotional rituals, joyous pheras, and majestic sangeet nights with fine-art precision.',
    icon: <Heart size={24} />,
    highlights: [
      'Dual-shooter coverage (Candid + Traditional)',
      'Pre-wedding consultation & bespoke moodboards',
      'Artisanal edited photo albums with velvet keepsake box',
      'High-resolution cloud gallery with lifetime access',
    ],
    startingPrice: '₹85,000 / day',
    deliveryTime: '3-4 weeks',
  },
  {
    id: 'pre-wedding-photography',
    title: 'Pre-Wedding Photography',
    badge: 'Cinematic Storytelling',
    description:
      'Romantic, editorial concept shoots designed to capture your distinctive chemistry at handpicked heritage palaces, beaches, or private estates.',
    icon: <Sparkles size={24} />,
    highlights: [
      'Concept styling, moodboards & location scouting',
      'Multiple haute couture outfit and look transitions',
      'Cinematic 4K teaser reel crafted for invitations & social',
      'Same-week curated portrait preview selection',
    ],
    startingPrice: '₹45,000 / shoot',
    deliveryTime: '7-10 days',
  },
  {
    id: 'event-photography',
    title: 'Event Photography',
    badge: 'Moments & Soirées',
    description:
      'Discrete, vibrant photography for intimate anniversaries, grand birthday galas, corporate award soirees, and multi-generational family milestones.',
    icon: <Calendar size={24} />,
    highlights: [
      'Discreet photojournalistic and portrait captures',
      'Ambient lighting and fast turnaround delivery',
      'Instant digital guest portrait stations available',
      'Complete raw + color-graded digital archive',
    ],
    startingPrice: '₹25,000 / event',
    deliveryTime: '48-72 hours',
  },
];

export const PhotographyPage: React.FC<PhotographyPageProps> = ({ onNavigate }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="saathi-photography-page">
      {/* Category Hero */}
      <CategoryHero
        title="Capture Every Beautiful Moment"
        description="Professional photography services to preserve your most memorable moments."
        onNavigate={onNavigate}
        highlights={[
          'Award-Winning Candid Specialists',
          'Cinematic Drone & 4K Master Video',
          'Curated Color Grading & Archival Keepsakes',
        ]}
      />

      {/* 1. Main Photography Spotlight Section */}
      <section
        id="photography-overview"
        style={{
          padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
          backgroundColor: 'var(--bg-app)',
          position: 'relative',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '820px',
              margin: '0 auto var(--space-16) auto',
            }}
          >
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <Badge variant="brand" icon={<Camera size={13} />}>
                Master Photography Vertical
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
                fontWeight: 600,
                color: 'var(--text-headings)',
                letterSpacing: 'var(--tracking-tight)',
                marginBottom: 'var(--space-4)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              Capture Every Beautiful Moment
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '680px',
                marginBottom: 'var(--space-8)',
              }}
            >
              Professional photography services to preserve your most memorable moments.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection('why-choose-photography')}
                rightIcon={<ArrowRight size={18} />}
              >
                Explore Photography
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/categories/weddings-events')}
              >
                Back to All Verticals
              </Button>
            </div>
          </div>

          {/* 2. New Section Below Photography: Why Choose Our Photography? */}
          <section
            id="why-choose-photography"
            style={{
              paddingTop: 'var(--space-16)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Why Choose Our Photography?"
              subtitle="Creative, professional and personalized photography for every occasion."
            />

            {/* 3 Feature Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-8)',
                marginBottom: 'var(--space-16)',
              }}
            >
              {PHOTOGRAPHY_FEATURE_CARDS.map((card) => {
                const isSelected = selectedPackage === card.id;

                return (
                  <Card
                    key={card.id}
                    elevation={isSelected ? 'md' : 'sm'}
                    padding="lg"
                    interactive
                    className="hover-lift"
                    onClick={() => setSelectedPackage(card.id)}
                    style={{
                      border: isSelected
                        ? '2px solid var(--saathi-maroon)'
                        : '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: 'var(--bg-surface)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div>
                      {/* Top Bar: Icon & Category Tag */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 'var(--space-5)',
                        }}
                      >
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--saathi-nude-tint)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--saathi-maroon)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {card.icon}
                        </div>

                        <span
                          style={{
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'var(--saathi-maroon)',
                            backgroundColor: 'var(--bg-surface-soft)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {card.badge}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 600,
                          color: 'var(--text-headings)',
                          marginBottom: 'var(--space-3)',
                          lineHeight: 'var(--leading-snug)',
                        }}
                      >
                        {card.title}
                      </h3>

                      {/* Card Description */}
                      <p
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                          marginBottom: 'var(--space-6)',
                        }}
                      >
                        {card.description}
                      </p>

                      {/* Highlights List */}
                      <div style={{ marginBottom: 'var(--space-6)' }}>
                        <div
                          style={{
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--text-muted)',
                            marginBottom: 'var(--space-3)',
                          }}
                        >
                          Key Features Included:
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-2)',
                          }}
                        >
                          {card.highlights.map((item, idx) => (
                            <li
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                fontSize: 'var(--text-xs)',
                                color: 'var(--text-primary)',
                                lineHeight: 'var(--leading-normal)',
                              }}
                            >
                              <CheckCircle2
                                size={15}
                                style={{
                                  color: 'var(--saathi-maroon)',
                                  flexShrink: 0,
                                  marginTop: '2px',
                                }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div
                      style={{
                        paddingTop: 'var(--space-4)',
                        borderTop: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Starting From
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: 'var(--text-xl)',
                              fontWeight: 700,
                              color: 'var(--saathi-maroon)',
                            }}
                          >
                            {card.startingPrice}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Turnaround
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                            {card.deliveryTime}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant={isSelected ? 'primary' : 'outline'}
                        fullWidth
                        size="md"
                        rightIcon={<ArrowRight size={16} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(`/categories/weddings-events/planning`);
                        }}
                      >
                        Book {card.title}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Trust Points Footer */}
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-surface-soft)',
                border: '1px solid var(--border-subtle)',
                padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-6)',
                textAlign: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    margin: '0 auto var(--space-2) auto',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saathi-maroon)',
                  }}
                >
                  <Award size={18} />
                </div>
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: '4px' }}>
                  Verified Artists
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Rigorous portfolio review & customer vetting.
                </p>
              </div>

              <div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    margin: '0 auto var(--space-2) auto',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saathi-maroon)',
                  }}
                >
                  <Clock size={18} />
                </div>
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: '4px' }}>
                  Timely Delivery
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Contract-backed timeline commitments for your edits.
                </p>
              </div>

              <div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    margin: '0 auto var(--space-2) auto',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saathi-maroon)',
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: '4px' }}>
                  Transparent Pricing
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Direct artist rates with zero hidden commission markups.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </section>
    </div>
  );
};
