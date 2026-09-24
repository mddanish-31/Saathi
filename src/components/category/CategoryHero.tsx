import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CategoryHeroProps {
  breadcrumbs?: BreadcrumbItem[];
  codeTag?: string;
  title: string;
  description: string;
  onNavigate?: (path: string) => void;
  highlights?: string[];
  activeServiceSlug?: string;
  serviceTabs?: { label: string; slug: string }[];
  onSelectService?: (slug: string) => void;
  className?: string;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({
  title,
  description,
  highlights = ['Curated Specialists', 'Portfolio Showcases', 'Direct Inquiries'],
  activeServiceSlug,
  serviceTabs,
  onSelectService,
  className = '',
}) => {
  return (
    <div
      className={`saathi-category-hero ${className}`}
      style={{
        paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
        paddingBottom: 'clamp(var(--space-8), 4vw, var(--space-12))',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        {/* Hero Header Content */}
        <div style={{ maxWidth: '840px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              color: 'var(--text-headings)',
              lineHeight: 1.2,
              letterSpacing: 'var(--tracking-tight)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-6)',
              maxWidth: '740px',
            }}
          >
            {description}
          </p>

          {/* Value Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              alignItems: 'center',
            }}
          >
            {highlights.map((item) => (
              <div
                key={item}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                }}
              >
                <CheckCircle2 size={13} style={{ color: 'var(--saathi-maroon)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Optional Service Tabs */}
          {serviceTabs && serviceTabs.length > 0 && onSelectService && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-8)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <button
                type="button"
                onClick={() => onSelectService('all')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: !activeServiceSlug || activeServiceSlug === 'all' ? 'var(--btn-primary-bg)' : 'var(--bg-surface)',
                  color: !activeServiceSlug || activeServiceSlug === 'all' ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                  borderColor: !activeServiceSlug || activeServiceSlug === 'all' ? 'transparent' : 'var(--border-default)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                All Specialists
              </button>

              {serviceTabs.map((tab) => {
                const isSelected = activeServiceSlug === tab.slug;
                return (
                  <button
                    key={tab.slug}
                    type="button"
                    onClick={() => onSelectService(tab.slug)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      backgroundColor: isSelected ? 'var(--btn-primary-bg)' : 'var(--bg-surface)',
                      color: isSelected ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                      borderColor: isSelected ? 'transparent' : 'var(--border-default)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};