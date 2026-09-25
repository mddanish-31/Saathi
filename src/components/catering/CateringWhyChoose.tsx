import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  Layers,
  Award,
  Clock,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { WHY_CHOOSE_CATERING, WhyChooseBenefit } from '../../data/cateringData';

export const CateringWhyChoose: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck size={22} />;
      case 'Sparkles':
        return <Sparkles size={22} />;
      case 'Layers':
        return <Layers size={22} />;
      case 'Award':
        return <Award size={22} />;
      case 'Clock':
        return <Clock size={22} />;
      default:
        return <ShieldCheck size={22} />;
    }
  };

  return (
    <section
      id="why-choose-saathi-catering"
      className="saathi-catering-why-choose"
      style={{
        padding: 'clamp(var(--space-12), 5vw, var(--space-16)) 0',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="The Saathi Assurance"
          title="Why Choose Saathi Catering"
          subtitle="We combine culinary excellence with rigorous vendor vetting, transparent pricing models, and dedicated banquet orchestration."
        />

        {/* Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {WHY_CHOOSE_CATERING.map((item: WhyChooseBenefit) => (
            <div
              key={item.id}
              className="hover-lift saathi-why-choose-card"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'all var(--transition-normal)',
              }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--saathi-nude-tint)',
                  color: 'var(--saathi-maroon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-4)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {getIcon(item.iconName)}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
