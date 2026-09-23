import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  onNavigate?: (path: string) => void;
  className?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = 'This specialized vertical is currently in preparation and will be released in an upcoming Saathi platform phase.',
  showBackButton = true,
  onNavigate,
  className = '',
}) => {
  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const displayTitle = title.replace(/\s*\(Coming Soon\)\s*/gi, '').trim();

  return (
    <div
      className={`saathi-placeholder-page ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: 'clamp(var(--space-12), 8vw, var(--space-24)) var(--space-4)',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-primary)',
      }}
    >
      <Container narrow>
        <div
          className="animate-slide-up"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '680px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            padding: 'clamp(var(--space-8), 5vw, var(--space-12))',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Badge variant="brand" icon={<Clock size={14} />}>
              Coming Soon
            </Badge>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--text-headings)',
              marginBottom: 'var(--space-3)',
              lineHeight: 1.2,
            }}
          >
            {displayTitle}
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-8)',
              maxWidth: '540px',
            }}
          >
            {description}
          </p>

          {showBackButton && (
            <div>
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft size={16} />}
                onClick={handleBackToHome}
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
