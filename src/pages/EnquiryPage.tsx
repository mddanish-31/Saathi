import React, { useState, useEffect } from 'react';
import { ArrowLeft, UserX } from 'lucide-react';
import { getProfessionalById } from '../data/professionalDirectory';
import { useAuth } from '../context/AuthContext';
import { useEnquiry } from '../context/EnquiryContext';
import { EnquiryForm } from '../components/enquiry/EnquiryForm';
import { SuccessState } from '../components/enquiry/SuccessState';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { EnquiryData } from '../types';

interface EnquiryPageProps {
  professionalId: string;
  onNavigate: (path: string) => void;
}

export const EnquiryPage: React.FC<EnquiryPageProps> = ({
  professionalId,
  onNavigate,
}) => {
  const { user, isAuthenticated } = useAuth();
  const { createEnquiry } = useEnquiry();

  const [submittedEnquiry, setSubmittedEnquiry] = useState<EnquiryData | null>(null);

  const professional = getProfessionalById(professionalId);

  // Auth Protection: If user is logged out, redirect to login preserving returnTo
  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate(`/login?returnTo=/professionals/${professionalId}/enquire`);
    }
  }, [isAuthenticated, professionalId, onNavigate]);

  if (!isAuthenticated) {
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
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: 'var(--text-sm)' }}>Redirecting to secure login to preserve your enquiry...</p>
          </div>
        </Container>
      </div>
    );
  }

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
              Specialist Not Found
            </h2>
            <Button
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => onNavigate('/categories/weddings-events')}
            >
              Back to Weddings & Events
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const handleEnquirySubmit = (payload: Omit<EnquiryData, 'id' | 'createdAt' | 'status'>) => {
    const created = createEnquiry(payload);
    setSubmittedEnquiry(created);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewMyEnquiries = () => {
    onNavigate('/customer/enquiries');
  };

  const handleContinueExploring = () => {
    onNavigate('/categories/weddings-events');
  };

  return (
    <div
      className="saathi-enquiry-flow-page"
      style={{
        paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
        paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
        backgroundColor: 'var(--bg-app)',
        minHeight: 'calc(100vh - 180px)',
      }}
    >
      <Container narrow>
        {/* Back Button */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <button
            type="button"
            onClick={() => onNavigate(`/professionals/${professional.id}`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <ArrowLeft size={14} />
            <span>Back to {professional.brandName}</span>
          </button>
        </div>

        {submittedEnquiry ? (
          <SuccessState
            enquiry={submittedEnquiry}
            onViewMyEnquiries={handleViewMyEnquiries}
            onContinueExploring={handleContinueExploring}
          />
        ) : (
          <EnquiryForm
            professional={professional}
            currentUser={user}
            onSubmitEnquiry={handleEnquirySubmit}
          />
        )}
      </Container>
    </div>
  );
};
