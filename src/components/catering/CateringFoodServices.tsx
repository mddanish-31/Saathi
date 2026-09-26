import React from 'react';
import {
  UtensilsCrossed,
  Layers,
  Flame,
  Wine,
  Cake,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { CATERING_FOOD_SERVICES, CateringFoodService } from '../../data/cateringData';

interface CateringFoodServicesProps {
  onSelectService: (service: CateringFoodService) => void;
}

export const CateringFoodServices: React.FC<CateringFoodServicesProps> = ({
  onSelectService,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed size={22} />;
      case 'Layers':
        return <Layers size={22} />;
      case 'Flame':
        return <Flame size={22} />;
      case 'Wine':
        return <Wine size={22} />;
      case 'Cake':
        return <Cake size={22} />;
      default:
        return <UtensilsCrossed size={22} />;
    }
  };

  return (
    <section
      id="catering-food-services"
      className="saathi-food-services"
      style={{
        padding: 'clamp(var(--space-12), 5vw, var(--space-16)) 0',
        backgroundColor: 'var(--bg-surface-soft)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Specialist Services"
          title="Catering & Food Services"
          subtitle="Explore our comprehensive food solutions — from royal full-service banquets and interactive live cooking stations to bespoke wedding cakes and handcrafted cocktail bars."
        />

        {/* 5-Service Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {CATERING_FOOD_SERVICES.map((srv) => {
            return (
              <div
                key={srv.id}
                className="hover-lift saathi-food-service-card"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  transition: 'all var(--transition-normal)',
                }}
              >
                {/* Header Image with Floating Icon */}
                <div
                  style={{
                    position: 'relative',
                    height: '160px',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-surface-soft)',
                  }}
                >
                  <img
                    src={srv.imageUrl}
                    alt={srv.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(24, 14, 23, 0.7) 0%, transparent 60%)',
                    }}
                  />

                  {/* Icon badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--saathi-maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {getIcon(srv.iconName)}
                  </div>

                  {/* Price Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(38, 26, 36, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--text-inverse)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    From {srv.startingPrice}
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--text-headings)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {srv.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {srv.shortDescription}
                    </p>

                    {/* Highlights */}
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <div
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: 'var(--text-muted)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Service Includes:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {srv.highlights.map((h, idx) => (
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
                            <CheckCircle2 size={12} style={{ color: 'var(--saathi-maroon)', flexShrink: 0 }} />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Button */}
                  <div
                    style={{
                      paddingTop: 'var(--space-4)',
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      rightIcon={<ArrowRight size={14} />}
                      onClick={() => onSelectService(srv)}
                    >
                      Browse {srv.title}
                    </Button>
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
