"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { SectionHeading } from '../components/ui/SectionHeading';

interface CustomerEnquiriesPageProps {
  enquiryId?: string;
  onNavigate: (path: string) => void;
}

export const CustomerEnquiriesPage: React.FC<CustomerEnquiriesPageProps> = ({
  enquiryId,
  onNavigate,
}) => {
  const { enquiries, getEnquiryById } = useEnquiry();

  // If specific enquiryId is requested:
  if (enquiryId) {
    const enquiry = getEnquiryById(enquiryId);

    if (!enquiry) {
      return (
        <div style={{ minHeight: '60vh', padding: 'var(--space-12) 0' }}>
          <Container narrow>
            <div
              style={{
                textAlign: 'center',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-10) var(--space-6)',
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                Enquiry Record Not Found
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
                The reference ID <code>{enquiryId}</code> does not match an active enquiry.
              </p>
              <Button variant="outline" size="sm" onClick={() => onNavigate('/customer/enquiries')}>
                Back to All Enquiries
              </Button>
            </div>
          </Container>
        </div>
      );
    }

    return (
      <div
        className="saathi-enquiry-detail-page"
        style={{
          paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
          paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
          backgroundColor: 'var(--bg-app)',
          minHeight: 'calc(100vh - 180px)',
        }}
      >
        <Container narrow>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <button
              type="button"
              onClick={() => onNavigate('/customer/enquiries')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to All Enquiries</span>
            </button>
          </div>

          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: 'var(--space-6)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <Avatar name={enquiry.professionalBrand} size="lg" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Reference #{enquiry.id}
                  </span>
                  <h1
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      color: 'var(--text-headings)',
                      marginTop: '2px',
                    }}
                  >
                    {enquiry.professionalBrand}
                  </h1>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    Specialist: {enquiry.professionalName}
                  </p>
                </div>
              </div>

              <span
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  backgroundColor:
                    enquiry.status === 'pending'
                      ? 'var(--accent-soft)'
                      : 'rgba(74, 122, 94, 0.15)',
                  color: enquiry.status === 'pending' ? 'var(--accent)' : 'var(--status-success)',
                }}
              >
                Status: {enquiry.status}
              </span>
            </div>

            {/* Event Info Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--bg-surface-soft)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Service Type</span>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{enquiry.serviceName}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Target Event Date</span>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{enquiry.eventDate}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Event Location</span>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{enquiry.eventLocation}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Budget Bracket</span>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--saathi-maroon)' }}>{enquiry.budgetRange}</strong>
              </div>
            </div>

            {/* Requirement Message */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)', marginBottom: 'var(--space-2)' }}>
                Your Celebration Brief & Notes:
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                "{enquiry.message}"
              </p>
            </div>

            {/* Specialist Profile Shortcut */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate(`/professionals/${enquiry.professionalId}`)}
              >
                View Specialist Profile
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={() => alert(`Direct communication channel will connect with ${enquiry.professionalBrand}`)}
              >
                Follow Up Message
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Enquiries List View
  return (
    <div
      className="saathi-customer-enquiries-list"
      style={{
        paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
        paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
        backgroundColor: 'var(--bg-app)',
        minHeight: 'calc(100vh - 180px)',
      }}
    >
      <Container narrow>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <SectionHeading
            eyebrow="Customer Portal"
            title="My Occasion Enquiries"
            subtitle="Review responses, track quotes, and coordinate directly with your booked wedding planners and specialists."
          />
        </div>

        {enquiries.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-12) var(--space-6)',
            }}
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
              No active celebration enquiries. Discover our curated wedding planners to request your first bespoke quote.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/categories/weddings-events/planning')}
            >
              Explore Wedding Planners
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="hover-lift"
                onClick={() => onNavigate(`/customer/enquiries/${enq.id}`)}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-5)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <Avatar name={enq.professionalBrand} size="md" />
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-headings)', fontFamily: 'var(--font-serif)' }}>
                      {enq.professionalBrand}
                    </h3>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {enq.serviceName} • {enq.eventDate} ({enq.eventLocation})
                    </p>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Budget: {enq.budgetRange}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      backgroundColor:
                        enq.status === 'pending'
                          ? 'var(--accent-soft)'
                          : 'rgba(74, 122, 94, 0.15)',
                      color: enq.status === 'pending' ? 'var(--accent)' : 'var(--status-success)',
                    }}
                  >
                    {enq.status}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/customer/enquiries/${enq.id}`);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
