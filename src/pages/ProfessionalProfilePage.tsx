import React from 'react';
import { ArrowLeft, UserX } from 'lucide-react';
import { getProfessionalById } from '../data/weddingPlanningData';
import { ProfessionalProfile } from '../components/professional/ProfessionalProfile';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Professional } from '../types';

interface ProfessionalProfilePageProps {
  professionalId: string;
  onNavigate: (path: string) => void;
}

export const ProfessionalProfilePage: React.FC<ProfessionalProfilePageProps> = ({
  professionalId,
  onNavigate,
}) => {
  const professional = getProfessionalById(professionalId);

  const handleEnquire = (pro: Professional) => {
    onNavigate(`/professionals/${pro.id}/enquire`);
  };

  if (!professional) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-12) 0',
        }}
      >
        <Container narrow>
          <div
            style={{
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-12) var(--space-6)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--saathi-nude-tint)',
                color: 'var(--saathi-maroon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-4) auto',
              }}
            >
              <UserX size={32} />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-2xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Specialist Profile Not Found
            </h2>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
              The specialist you are looking for may have updated their profile or the link may be outdated.
            </p>

            <Button
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => onNavigate('/categories/weddings-events/planning')}
            >
              Back to Wedding Specialists
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="saathi-profile-view-page">
      <ProfessionalProfile
        professional={professional}
        onEnquire={handleEnquire}
        onNavigate={onNavigate}
      />
    </div>
  );
};
