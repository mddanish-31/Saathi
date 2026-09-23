import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  onNavigate?: (path: string) => void;
  className?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  showBackButton = true,
  onNavigate,
  className = '',
}) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    handleNavigate('/');
  };

  return (
    <div
      className={`saathi-placeholder-page ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-primary)',
      }}
    >
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      <main
        style={{
          flex: '1 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(var(--space-12), 8vw, var(--space-24)) var(--space-4)',
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
            }}
          >
            <SectionHeading
              title={title}
              subtitle={description}
              align="center"
            />

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
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
