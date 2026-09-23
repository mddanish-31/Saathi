import React from 'react';
import { CheckCircle2, Sparkles, ListFilter, Compass } from 'lucide-react';
import { EnquiryData } from '../../types';
import { Button } from '../ui/Button';

interface SuccessStateProps {
  enquiry: EnquiryData;
  onViewMyEnquiries: () => void;
  onContinueExploring: () => void;
  className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  enquiry,
  onViewMyEnquiries,
  onContinueExploring,
  className = '',
}) => {
  return (
    <div
      className={`saathi-enquiry-success animate-scale-up ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'clamp(var(--space-8), 5vw, var(--space-12))',
        maxWidth: '620px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {/* Success Badge Icon */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--saathi-nude-tint)',
          color: 'var(--saathi-maroon)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-5) auto',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <CheckCircle2 size={38} />
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--saathi-nude-tint)',
          color: 'var(--saathi-maroon)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          marginBottom: 'var(--space-3)',
        }}
      >
        <Sparkles size={13} />
        <span>Enquiry Submitted Successfully</span>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          fontWeight: 600,
          color: 'var(--text-headings)',
          marginBottom: 'var(--space-3)',
        }}
      >
        Your celebration enquiry is on its way!
      </h2>

      <p
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
          marginBottom: 'var(--space-6)',
          maxWidth: '520px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        We have notified <strong>{enquiry.professionalBrand}</strong>. They will review your event details and respond directly via email/phone within 24 hours.
      </p>

      {/* Summary Card */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface-soft)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          textAlign: 'left',
          marginBottom: 'var(--space-8)',
          fontSize: 'var(--text-xs)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Reference ID</span>
            <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{enquiry.id}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Specialist</span>
            <strong style={{ color: 'var(--text-primary)' }}>{enquiry.professionalBrand}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Service Requested</span>
            <strong style={{ color: 'var(--text-primary)' }}>{enquiry.serviceName}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Event Date & City</span>
            <strong style={{ color: 'var(--text-primary)' }}>{enquiry.eventDate} ({enquiry.eventLocation})</strong>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          leftIcon={<ListFilter size={18} />}
          onClick={onViewMyEnquiries}
        >
          View My Enquiries
        </Button>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          leftIcon={<Compass size={18} />}
          onClick={onContinueExploring}
        >
          Continue Exploring Weddings & Events
        </Button>
      </div>
    </div>
  );
};
