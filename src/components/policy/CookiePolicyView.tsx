"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cookie,
  Shield,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface PolicySection {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: PolicySection[] = [
  { id: 'overview', number: '01', title: 'What Are Cookies & Storage' },
  { id: 'categories', number: '02', title: 'Classification of Cookies' },
  { id: 'consent', number: '03', title: 'No Dark Patterns & Consent' },
  { id: 'management', number: '04', title: 'How to Manage Preferences' },
];

export const CookiePolicyView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'cat-necessary': true,
    'cat-functional': false,
    'cat-performance': false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-14 max-w-3xl">
        <span className="brand-pill mb-4">Transparency & Consent</span>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-4">
          Cookie <span className="font-signature font-normal text-[var(--accent)]">Policy</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-[1.68]">
          Last Updated: September 26, 2026 • Effective Date: September 26, 2026
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2 leading-[1.68]">
          Learn how Saathi uses strictly necessary cookies and user-consented analytics in accordance with ethical design and DPDP Act, 2023.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sticky Desktop Navigation */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-[var(--accent)] block mb-4">
            Cookie Guidelines
          </span>
          <nav className="space-y-1.5" aria-label="Cookie sections">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-3 transition-all ${
                    isActive
                      ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] font-semibold border border-[var(--border)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-base)]'
                  }`}
                >
                  <span className={`font-mono text-[11px] ${isActive ? 'text-[var(--accent)]' : 'opacity-60'}`}>
                    {sec.number}
                  </span>
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-5 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Cookie size={14} className="text-[var(--accent)]" />
              <span>Zero Cross-Site Tracking</span>
            </div>
          </div>
        </aside>

        {/* Sections Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section 01 */}
          <motion.section
            id="overview"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">01.</span>
              What Are Cookies & Local Storage?
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-4">
              Cookies are small cryptographic text files placed on your device by websites you visit. They are widely used to make web applications function efficiently, provide secure authentication sessions, and remember your visual preferences between page navigations.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68]">
              Alongside cookies, Saathi also utilizes standard HTML5 Local Storage to preserve your client-side preferences (such as your chosen light or dark mode theme) directly within your browser without sending unnecessary identifiers across network requests.
            </p>
          </motion.section>

          {/* Section 02: Classification with Accordions */}
          <motion.section
            id="categories"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">02.</span>
              Classification of Cookies Used on Saathi
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-6">
              We categorize all browser storage into three transparent, verifiable tiers:
            </p>

            <div className="space-y-3">
              {/* Accordion 1: Necessary */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--bg-base)] overflow-hidden">
                <button
                  onClick={() => toggleAccordion('cat-necessary')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Shield size={15} className="text-[var(--accent)]" />
                    <span>Strictly Necessary Cookies</span>
                    <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--accent-soft)] text-[var(--text-primary)]">
                      Always Active
                    </span>
                  </div>
                  {openAccordions['cat-necessary'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions['cat-necessary'] && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-muted)] leading-[1.68] border-t border-[var(--border)]">
                    These cookies are strictly required for the platform to function. They store your Supabase JWT session token upon login, prevent Cross-Site Request Forgery (CSRF), and maintain your active cart/enquiry session. The platform cannot operate securely without these.
                  </div>
                )}
              </div>

              {/* Accordion 2: Functional */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--bg-base)] overflow-hidden">
                <button
                  onClick={() => toggleAccordion('cat-functional')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sliders size={15} className="text-[var(--accent)]" />
                    <span>Preference & Customization Storage</span>
                    <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-semibold border border-[var(--border)] text-[var(--text-muted)]">
                      Functional
                    </span>
                  </div>
                  {openAccordions['cat-functional'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions['cat-functional'] && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-muted)] leading-[1.68] border-t border-[var(--border)]">
                    These enable the website to remember your personal choices. For example, your selected Light or Dark visual theme (<code>saathi_theme_preference</code>) and your cookie consent status (<code>saathi_cookie_consent_v1</code>) are remembered here.
                  </div>
                )}
              </div>

              {/* Accordion 3: Performance */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--bg-base)] overflow-hidden">
                <button
                  onClick={() => toggleAccordion('cat-performance')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-[var(--accent)]" />
                    <span>Platform Optimization (Aggregated)</span>
                    <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-semibold border border-[var(--border)] text-[var(--text-muted)]">
                      Consent-Based
                    </span>
                  </div>
                  {openAccordions['cat-performance'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions['cat-performance'] && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-muted)] leading-[1.68] border-t border-[var(--border)]">
                    If consented, these assist us in monitoring search latency, error telemetry, and category interaction metrics to ensure reliable high-volume performance across weddings and festival peak seasons.
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Section 03 */}
          <motion.section
            id="consent"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">03.</span>
              Consent Management & No Dark Patterns
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-4">
              In accordance with ethical web design principles and India&rsquo;s Digital Personal Data Protection Act (DPDP) 2023, Saathi does not utilize dark patterns or pre-ticked consent boxes.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68]">
              When you visit Saathi, you can choose to &ldquo;Accept All&rdquo;, &ldquo;Reject Non-Essential&rdquo;, or &ldquo;Manage Preferences&rdquo; with equal ease. Rejecting non-essential cookies will never penalize your browsing experience or restrict vendor discovery.
            </p>
          </motion.section>

          {/* Section 04 */}
          <motion.section
            id="management"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">04.</span>
              How to Manage Your Browser Preferences
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-4">
              You can modify or revoke your cookie choices at any point by clearing your browser cache or adjusting privacy settings in Chrome, Safari, Firefox, or Edge. You may also reset your on-site preferences by clicking the &ldquo;Cookie Preferences&rdquo; link in the Saathi footer.
            </p>
            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-xs text-[var(--text-muted)] leading-[1.68]">
              For any questions regarding our storage practices, write to{' '}
              <a href="mailto:privacy@saathi.in" className="text-[var(--accent)] hover:underline font-semibold">
                privacy@saathi.in
              </a>
              .
            </div>
          </motion.section>

          {/* Return Home Link */}
          <div className="pt-6">
            <Link
              href="/"
              className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
            >
              ← Return to Saathi Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
