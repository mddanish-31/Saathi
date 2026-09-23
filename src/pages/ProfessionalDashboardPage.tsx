import React from 'react';
import { Eye, Star, MessageSquare, CheckCircle2, ExternalLink, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEnquiry } from '../context/EnquiryContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';

interface ProfessionalDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const ProfessionalDashboardPage: React.FC<ProfessionalDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { enquiries } = useEnquiry();

  return (
    <div
      className="saathi-pro-dashboard"
      style={{
        paddingTop: 'clamp(var(--space-8), 4vw, var(--space-12))',
        paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
        backgroundColor: 'var(--bg-app)',
        minHeight: 'calc(100vh - 180px)',
      }}
    >
      <Container>
        {/* Welcome Header */}
        <div
          className="animate-slide-up"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Avatar name={user?.name || 'Professional'} size="lg" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                  }}
                >
                  {user?.businessName || user?.name || 'Professional Partner'}
                </h1>
                <Badge variant="brand">Professional Studio</Badge>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Manage incoming high-intent client enquiries, quotes, and showcase updates.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button
              variant="outline"
              size="md"
              leftIcon={<ExternalLink size={15} />}
              onClick={() => onNavigate('/professionals/pro-aura-weddings')}
            >
              Preview Live Profile
            </Button>
          </div>
        </div>

        {/* Business Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <div
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)' }}>Incoming Inquiries</span>
              <MessageSquare size={16} />
            </div>
            <strong style={{ fontSize: '1.75rem', color: 'var(--text-headings)', fontFamily: 'var(--font-serif)' }}>
              {enquiries.length}
            </strong>
          </div>

          <div
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)' }}>Client Rating (Sample)</span>
              <Star size={16} style={{ color: 'var(--saathi-maroon)' }} />
            </div>
            <strong style={{ fontSize: '1.75rem', color: 'var(--saathi-maroon)', fontFamily: 'var(--font-serif)' }}>
              4.9 / 5.0
            </strong>
          </div>

          <div
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)' }}>Profile Views (Demo)</span>
              <Eye size={16} />
            </div>
            <strong style={{ fontSize: '1.75rem', color: 'var(--text-headings)', fontFamily: 'var(--font-serif)' }}>
              1,240
            </strong>
          </div>

          <div
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)' }}>Response Rate</span>
              <CheckCircle2 size={16} style={{ color: '#2E7D32' }} />
            </div>
            <strong style={{ fontSize: '1.75rem', color: '#2E7D32', fontFamily: 'var(--font-serif)' }}>
              94%
            </strong>
          </div>
        </div>

        {/* Incoming Client Enquiries List */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-6)',
              paddingBottom: 'var(--space-4)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  color: 'var(--text-headings)',
                }}
              >
                Incoming Client Inquiries & Quote Requests
              </h2>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                High-intent celebration leads awaiting your quotation
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                style={{
                  padding: 'var(--space-5)',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <Avatar name={enq.customerName} size="md" />
                    <div>
                      <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)' }}>
                        {enq.customerName}
                      </h3>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                        {enq.customerEmail} • {enq.customerPhone}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      color: 'var(--saathi-maroon)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                    }}
                  >
                    Requested: {enq.serviceName}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-4)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    padding: 'var(--space-3)',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} style={{ color: 'var(--saathi-maroon)' }} />
                    <span>Date: <strong>{enq.eventDate}</strong></span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} style={{ color: 'var(--saathi-maroon)' }} />
                    <span>Location: <strong>{enq.eventLocation}</strong></span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <DollarSign size={13} style={{ color: 'var(--saathi-maroon)' }} />
                    <span>Budget: <strong>{enq.budgetRange}</strong></span>
                  </div>
                </div>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{enq.message}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-1)' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Direct email composer opened for ${enq.customerEmail}`)}
                  >
                    Reply via Email
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => alert(`Direct WhatsApp / Phone dialer connected to ${enq.customerPhone}`)}
                  >
                    Call Client
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
