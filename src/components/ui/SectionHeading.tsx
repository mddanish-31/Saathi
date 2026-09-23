import React from 'react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  return (
    <div
      className={`saathi-section-heading ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align === 'center' ? 'center' : 'left',
        maxWidth: align === 'center' ? '760px' : '640px',
        margin: align === 'center' ? '0 auto var(--space-10) auto' : '0 0 var(--space-8) 0',
      }}
    >
      {eyebrow && (
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <Badge variant="brand">{eyebrow}</Badge>
        </div>
      )}
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          fontWeight: 600,
          color: 'var(--text-headings)',
          letterSpacing: 'var(--tracking-tight)',
          marginBottom: subtitle ? 'var(--space-3)' : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
            color: 'var(--text-secondary)',
            lineHeight: var_leading_relaxed(),
            maxWidth: '620px',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

function var_leading_relaxed() {
  return 'var(--leading-relaxed)';
}
