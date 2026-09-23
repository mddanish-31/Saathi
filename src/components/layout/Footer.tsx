import React from 'react';
import {
  Instagram,
  Linkedin,
  Mail,
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { Logo } from '../brand/Logo';
import { Container } from '../ui/Container';

interface FooterProps {
  onNavigate?: (path: string) => void;
  variant?: 'full' | 'compact';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, variant = 'full' }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (href.startsWith('/') && onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  // Compact footer for authenticated dashboards and application workspaces
  if (variant === 'compact') {
    return (
      <footer
        style={{
          backgroundColor: 'var(--bg-surface-soft)',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--space-6)',
          paddingBottom: 'var(--space-6)',
          marginTop: 'auto',
          transition: 'background-color var(--transition-normal)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              <Logo variant="full" size="sm" onClick={() => onNavigate && onNavigate('/')} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                <span style={{ cursor: 'default' }}>Help & Support</span>
                <span>|</span>
                <span style={{ cursor: 'default' }}>Privacy</span>
                <span>|</span>
                <span style={{ cursor: 'default' }}>Terms</span>
                <span>|</span>
                <span style={{ cursor: 'default' }}>Safety</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                © 2026 SAATHI
              </span>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--saathi-maroon)';
                  e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <span>Top</span>
                <ArrowUp size={12} />
              </button>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface-soft)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
        marginTop: 'var(--space-20)',
        transition: 'background-color var(--transition-normal)',
      }}
    >
      <Container>
        {/* Main 4-Column Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Left Column: Brand Info */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <Logo variant="full" size="md" onClick={scrollToTop} />
            </div>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Find trusted professionals for your special moments and everyday needs.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--saathi-maroon)';
                  e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Instagram size={17} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--saathi-maroon)';
                  e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Linkedin size={17} />
              </a>

              <a
                href="mailto:support@saathi.in"
                aria-label="Email Saathi"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--saathi-maroon)';
                  e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Column 1: EXPLORE */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li>
                <a href="#hero" onClick={(e) => handleLinkClick('#hero', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#categories" onClick={(e) => handleLinkClick('#categories', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Browse Categories
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleLinkClick('#how-it-works', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#for-professionals" onClick={(e) => handleLinkClick('#for-professionals', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  For Professionals
                </a>
              </li>
              <li>
                <a href="#why-saathi" onClick={(e) => handleLinkClick('#why-saathi', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleLinkClick('#faq', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li>
                <a href="#why-saathi" onClick={(e) => handleLinkClick('#why-saathi', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  About Saathi
                </a>
              </li>
              <li>
                <a href="#why-saathi" onClick={(e) => handleLinkClick('#why-saathi', e)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Our Team
                </a>
              </li>
              <li>
                <a href="mailto:contact@saathi.in" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: LEGAL & TRUST */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Legal & Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', cursor: 'default' }}>
                  Privacy Policy
                </span>
              </li>
              <li>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', cursor: 'default' }}>
                  Terms of Service
                </span>
              </li>
              <li>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', cursor: 'default' }}>
                  Cookie Policy
                </span>
              </li>
              <li>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', cursor: 'default' }}>
                  Community Guidelines
                </span>
              </li>
              <li>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', cursor: 'default' }}>
                  Trust & Safety
                </span>
              </li>
              <li>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', cursor: 'default' }}>
                  Feedback & Bug Reports
                </span>
              </li>

              {/* Subtle Divider */}
              <li style={{ paddingTop: 'var(--space-2)' }}>
                <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', width: '100%', opacity: 0.6 }} />
              </li>

              {/* Controlled Isolated Entry: Admin Portal ↗ */}
              <li style={{ paddingTop: 'var(--space-1)' }}>
                <a
                  href="/admin/login"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Admin Portal is an isolated operational environment configured for deployment in subsequent phases.');
                  }}
                  className="saathi-admin-portal-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.03em',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  aria-label="Admin Portal (Restricted Access)"
                >
                  <span>Admin Portal</span>
                  <ArrowUpRight size={12} style={{ opacity: 0.7 }} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <Mail size={15} color="var(--saathi-maroon)" />
                <a href="mailto:support@saathi.in">support@saathi.in</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <MapPin size={15} color="var(--saathi-maroon)" />
                <span>India / Serving Across India</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  marginTop: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <ShieldCheck size={18} color="var(--saathi-maroon)" style={{ flexShrink: 0 }} />
                <span>Dedicated Grievance & Safety Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              © 2026 Saathi. All rights reserved.
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Designed & Built in India
            </p>
          </div>

          {/* Scroll to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--saathi-maroon)';
              e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </Container>
    </footer>
  );
};
