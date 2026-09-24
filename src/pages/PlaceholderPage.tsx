import React from 'react';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CategoryHero } from '../components/category/CategoryHero';
import { ServiceCard, ServiceCardData } from '../components/category/ServiceCard';

export interface PlaceholderPageProps {
  title: string;
  description?: string;
  codeTag?: string;
  breadcrumbs?: any[];
  plannedServices?: string[];
  categorySlug?: string;
  subCategorySlug?: string;
  showBackButton?: boolean;
  onNavigate?: (path: string) => void;
  className?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = 'This specialized vertical is currently in preparation and will be released in an upcoming Saathi platform phase.',
  plannedServices = [],
  showBackButton = true,
  onNavigate,
  className = '',
}) => {
  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const displayTitle = title.replace(/\s*\(Coming Soon\)\s*/gi, '').trim();

  return (
    <div className={`saathi-placeholder-page ${className}`}>
      {/* Category Hero */}
      <CategoryHero
        title={displayTitle}
        description={description}
        onNavigate={handleNavigate}
        highlights={[
          'Quality Verification in Progress',
          'Curated Regional Specialists',
          'Zero Middlemen Markup',
        ]}
      />

      <section style={{ padding: 'clamp(var(--space-12), 6vw, var(--space-16)) 0', backgroundColor: 'var(--bg-app)' }}>
        <Container>
          {/* Status Notice Card */}
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: 'var(--space-12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
                <Badge variant="brand" icon={<Clock size={13} />}>
                  Category Under Active Curation
                </Badge>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Specialist Audits & Onboarding in Progress
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: 0,
                }}
              >
                We maintain rigorous standards for every professional featured on Saathi. Our curation team is currently auditing portfolios, client references, and insurance credentials for artists and vendors in {displayTitle}. Full public discovery and enquiry dispatch will launch soon.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => handleNavigate('/categories/weddings-events/planning')}
              >
                Explore Active Planners
              </Button>
            </div>
          </div>

          {/* Planned Services Section */}
          {plannedServices.length > 0 && (
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <SectionHeading
                eyebrow="Planned Service Areas"
                title={`Upcoming Services in ${displayTitle}`}
                subtitle="The following specialized service disciplines are currently being assembled for independent partner discovery."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {plannedServices.map((serviceName, idx) => (
                  <ServiceCard<ServiceCardData>
                    key={idx}
                    service={{
                      title: serviceName,
                      shortDescription: `Curated ${serviceName.toLowerCase()} solutions tailored for multi-day weddings and premium gatherings.`,
                      isComingSoon: true,
                    }}
                    isComingSoon={true}
                    badge="Planned Service"
                    ctaLabel="Launching Soon"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quality Standards & Trust Pillars */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface-soft)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'clamp(var(--space-8), 5vw, var(--space-12))',
              textAlign: 'center',
              marginBottom: 'var(--space-12)',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-3)' }}>
              <ShieldCheck size={18} color="var(--saathi-maroon)" />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--saathi-maroon)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                The Saathi Marketplace Standard
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                fontWeight: 600,
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Why We Don’t Show Placeholders as Finished Listings
            </h3>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                maxWidth: '680px',
                margin: '0 auto var(--space-8) auto',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              We believe in 100% transparency. Every profile published on Saathi must represent a verified, high-quality partner. We do not fabricate fake reviews, false ratings, or placeholder professionals.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-6)',
                textAlign: 'left',
              }}
            >
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <CheckCircle2 size={18} color="var(--saathi-maroon)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: '4px' }}>
                  Audited Portfolios
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Real event footage and high-resolution galleries vetted directly with past clients.
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <CheckCircle2 size={18} color="var(--saathi-maroon)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: '4px' }}>
                  Zero Intermediary Markup
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Direct communication and inquiries between host families and creative leads.
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <CheckCircle2 size={18} color="var(--saathi-maroon)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: '4px' }}>
                  Verified Client Feedback
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Authentic reviews submitted only following confirmed milestone bookings.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            {showBackButton && (
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft size={16} />}
                onClick={() => handleNavigate('/categories/weddings-events')}
              >
                Back to All Weddings & Events
              </Button>
            )}

            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => handleNavigate('/categories/weddings-events/planning')}
            >
              Explore Wedding Planning & Coordination
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};
