"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Scale,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface PolicySection {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: PolicySection[] = [
  { id: 'intro', number: '01', title: 'Introduction & Scope' },
  { id: 'data-collected', number: '02', title: 'Categories of Personal Data' },
  { id: 'cloud-security', number: '03', title: 'Cloud & Supabase Infrastructure' },
  { id: 'dpdp-rights', number: '04', title: 'Data Principal Rights (DPDP)' },
  { id: 'retention', number: '05', title: 'Data Retention & Purpose Limitation' },
  { id: 'grievance', number: '06', title: 'Grievance Redressal & DPO' },
];

export const PrivacyPolicyView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'acc-identity': true,
    'acc-milestone': false,
    'acc-rights-erasure': false,
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
        <span className="brand-pill mb-4">Statutory Disclosure</span>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-4">
          Privacy <span className="font-signature font-normal text-[var(--accent)]">Policy</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-[1.68]">
          Last Updated: September 26, 2026 • Effective Date: September 26, 2026
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2 leading-[1.68]">
          Enacted under the Information Technology Act, 2000, IT Rules 2021, and the Digital Personal Data Protection (DPDP) Act, 2023 of the Republic of India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sticky Desktop Section Navigation */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-[var(--accent)] block mb-4">
            Policy Navigation
          </span>
          <nav className="space-y-1.5" aria-label="Privacy sections">
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
              <Shield size={14} className="text-[var(--accent)]" />
              <span>AES-256 Cloud Encrypted</span>
            </div>
          </div>
        </aside>

        {/* Policy Sections with Scroll-Reveal & Accordions */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section 01 */}
          <motion.section
            id="intro"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">01.</span>
              Introduction & Scope
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-4">
              Saathi (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;, or the &ldquo;Platform&rdquo;) is an editorial marketplace connecting couples, families, and milestone event hosts with vetted wedding and gathering professionals across India. We are committed to processing your personal data with utmost transparency, integrity, and strict adherence to Indian privacy legislation.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68]">
              This Privacy Policy governs the collection, processing, storage, and transfer of personal data when you access or use our web platform, submit event enquiries, or register as an event professional.
            </p>
          </motion.section>

          {/* Section 02 */}
          <motion.section
            id="data-collected"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">02.</span>
              Categories of Personal Data Collected
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-6">
              Under Section 4 and Section 6 of the DPDP Act, 2023, we collect only the personal data reasonably necessary to deliver our marketplace services:
            </p>

            {/* Accordion FAQ breakdown for detailed data points */}
            <div className="space-y-3">
              {/* Accordion 1 */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--bg-base)] overflow-hidden">
                <button
                  onClick={() => toggleAccordion('acc-identity')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck size={15} className="text-[var(--accent)]" />
                    Identity, Contact & Profile Records
                  </span>
                  {openAccordions['acc-identity'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions['acc-identity'] && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-muted)] leading-[1.68] border-t border-[var(--border)]">
                    Includes your full legal name, verified email address, contact phone number, and city of residence. For verified professionals, this also includes your business name, GSTIN (where applicable), and past portfolio photographs.
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--bg-base)] overflow-hidden">
                <button
                  onClick={() => toggleAccordion('acc-milestone')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Scale size={15} className="text-[var(--accent)]" />
                    Milestone Ceremony Specifications
                  </span>
                  {openAccordions['acc-milestone'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions['acc-milestone'] && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-muted)] leading-[1.68] border-t border-[var(--border)]">
                    Proposed celebration dates, venues or geographic areas, ceremony types (e.g. Sangeet, Muhurtham, Pheras, Reception), expected guest counts, and estimated service budgets. This information is shared exclusively with professionals you directly enquire with.
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Section 03 */}
          <motion.section
            id="cloud-security"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">03.</span>
              Cloud Infrastructure & Supabase Security Architecture
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-4">
              To provide enterprise-grade reliability, data isolation, and low-latency availability, Saathi utilizes <strong className="text-[var(--text-primary)]">Supabase Inc.</strong> as our cloud database and authentication provider.
            </p>
            <div className="space-y-3 text-xs leading-[1.68]">
              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <strong className="text-[var(--text-primary)] block mb-1">Row-Level Security (RLS)</strong>
                <p className="text-[var(--text-muted)]">
                  Every SQL query is evaluated against verified JWT claims. Customers can only view their own enquiries, and professionals can only view records explicitly dispatched to their business profile.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <strong className="text-[var(--text-primary)] block mb-1">End-to-End Encryption</strong>
                <p className="text-[var(--text-muted)]">
                  Data in transit is secured with mandatory TLS 1.3 encryption. Data at rest is encrypted using AES-256 standard volumes.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 04 */}
          <motion.section
            id="dpdp-rights"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">04.</span>
              Data Principal Rights under DPDP Act, 2023
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-6">
              As a Data Principal residing in India, you are entitled to exercise statutory rights regarding your personal records:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <strong className="text-[var(--text-primary)] block mb-1">Right to Access</strong>
                <p className="text-[var(--text-muted)] leading-[1.68]">
                  Request an itemized digital extract of all personal information and enquiries stored on Saathi.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <strong className="text-[var(--text-primary)] block mb-1">Right to Correction</strong>
                <p className="text-[var(--text-muted)] leading-[1.68]">
                  Update or rectify outdated, incomplete, or inaccurate event requirements and contact info.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <strong className="text-[var(--text-primary)] block mb-1">Right to Erasure</strong>
                <p className="text-[var(--text-muted)] leading-[1.68]">
                  Permanently delete your user profile and purge associated enquiries when milestones conclude.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <strong className="text-[var(--text-primary)] block mb-1">Right to Nominate</strong>
                <p className="text-[var(--text-muted)] leading-[1.68]">
                  Designate an authorized family member or representative to manage your rights in case of incapacity.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 05 */}
          <motion.section
            id="retention"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">05.</span>
              Data Retention & Purpose Limitation
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-4">
              We retain customer enquiry records strictly for the duration necessary to satisfy the milestone coordination purposes for which it was collected. After celebration completion or account closure, inactive records are systematically purged or anonymized within 90 days.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68]">
              We do not sell, rent, monetize, or exchange Data Principal information with any ad networks or undisclosed marketing third parties.
            </p>
          </motion.section>

          {/* Section 06 */}
          <motion.section
            id="grievance"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span className="text-[var(--accent)] font-mono text-sm">06.</span>
              Grievance Redressal & Data Protection Officer
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-[1.68] mb-4">
              In statutory compliance with Section 12 of the DPDP Act 2023 and Rule 3(2) of the Information Technology Intermediary Rules 2021, the contact details of our Grievance Officer are set forth below:
            </p>

            <div className="p-5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] space-y-2.5 text-xs">
              <p className="text-[var(--text-primary)] font-semibold text-sm">
                Grievance Redressal Officer: Adv. Siddharth K. Nair
              </p>
              <p className="text-[var(--text-muted)]">
                Designation: Head of Legal & Data Compliance, Saathi Technologies Pvt. Ltd.
              </p>
              <p className="text-[var(--text-muted)]">
                Email:{' '}
                <a href="mailto:grievance@saathi.in" className="text-[var(--accent)] hover:underline font-semibold">
                  grievance@saathi.in
                </a>{' '}
                (Official statutory response within 7 business days)
              </p>
              <p className="text-[var(--text-muted)]">
                Postal Address: Unit 402, Signature Tower, G-Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051, India.
              </p>
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
