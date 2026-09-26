"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUp, ShieldCheck, MapPin } from 'lucide-react';
import { Logo } from '../brand/Logo';

interface FooterProps {
  onNavigate?: (path: string) => void;
  variant?: 'full' | 'compact';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, variant = 'full' }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(path);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  if (variant === 'compact') {
    return (
      <footer className="bg-[var(--bg-surface)] border-t border-[var(--border)] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <Logo size="sm" showTagline={false} asLink={true} />
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <Link href="/faq" className="hover:text-[var(--text-primary)] transition-colors">
                FAQ
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-[var(--text-primary)] transition-colors">
                Cookie Policy
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                Concierge Support
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span>© 2026 Saathi Technologies Pvt. Ltd.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border)] pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border)]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Logo size="md" showTagline={true} asLink={true} />
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm">
              India’s editorial marketplace connecting couples and event hosts with vetted wedding planners, musicians, caterers, and milestone creative studios.
            </p>
            <div className="pt-2 text-xs text-[var(--text-muted)] space-y-1">
              <div className="flex items-center gap-2">
                <MapPin size={13} strokeWidth={1.75} className="text-[var(--accent)] flex-shrink-0" />
                <span>Bandra Kurla Complex (BKC), Mumbai, MH 400051</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} strokeWidth={1.75} className="text-[var(--accent)] flex-shrink-0" />
                <a href="mailto:concierge@saathi.in" className="hover:text-[var(--accent)]">
                  concierge@saathi.in
                </a>
              </div>
            </div>
          </div>

          {/* Service Verticals */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)]">
              Service Verticals
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <Link href="/categories/weddings-events/planning" className="hover:text-[var(--accent)] transition-colors">
                  Wedding Planning & Coordination (A1)
                </Link>
              </li>
              <li>
                <Link href="/categories/weddings-events/photography" className="hover:text-[var(--accent)] transition-colors">
                  Photography & Videography (A2)
                </Link>
              </li>
              <li>
                <Link href="/categories/weddings-events/entertainment" className="hover:text-[var(--accent)] transition-colors">
                  Music & Entertainment (A3)
                </Link>
              </li>
              <li>
                <Link href="/categories/weddings-events/catering-food-desserts" className="hover:text-[var(--accent)] transition-colors">
                  Catering, Food & Desserts (A5)
                </Link>
              </li>
              <li>
                <Link href="/categories/weddings-events" className="hover:text-[var(--accent)] transition-colors">
                  All Milestone Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Help */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)]">
              Discovery
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <Link href="/#categories" className="hover:text-[var(--accent)] transition-colors">
                  Explore Verticals
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[var(--accent)] transition-colors">
                  FAQ & Guidance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
                  Concierge Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[var(--accent)] transition-colors">
                  Partner Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Statutory & Privacy */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)]">
              Statutory Compliance
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">
                  Privacy Policy (DPDP Act 2023)
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[var(--accent)] transition-colors">
                  Cookie Policy & Consent
                </Link>
              </li>
              <li>
                <a href="mailto:grievance@saathi.in" className="hover:text-[var(--accent)] transition-colors">
                  Grievance Officer: Adv. Siddharth K. Nair
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-muted)]">
                <ShieldCheck size={12} strokeWidth={2} className="text-[var(--accent)]" />
                <span>India IT Act 2000 Compliant</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© 2026 Saathi Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Simpler 2 Gather</span>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
