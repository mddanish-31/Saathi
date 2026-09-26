"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, UserCheck, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const CUSTOMER_FAQS: FAQItem[] = [
  {
    q: 'How does Saathi vet wedding and event professionals?',
    a: 'Every partner on Saathi undergoes a rigorous multi-tier verification process: verified GSTIN and business registration, minimum 5 years in active milestone operations, portfolio audits from documented real celebrations, and background reference checks with previous clients and premier venue coordinators.',
  },
  {
    q: 'Does Saathi charge couples or event hosts any booking fees?',
    a: 'No. Saathi does not levy any hidden convenience charges or commission markups on clients. You receive direct, transparent quotes from verified professionals with no inflated middleman costs.',
  },
  {
    q: 'Can I request custom quotes for destination celebrations outside major metros?',
    a: 'Yes. Most featured planning agencies, photography studios, and musical ensembles specialize in destination celebrations across Udaipur, Jaipur, Goa, Kerala, Jim Corbett, and international wedding destinations with comprehensive travel & logistics planning included in their proposals.',
  },
  {
    q: 'How are client reviews authenticated?',
    a: 'To maintain absolute editorial integrity, reviews on Saathi are locked to confirmed enquiries and verified client records. Unverified or anonymous submissions are rejected by our database policies.',
  },
  {
    q: 'What happens after I submit an enquiry for a professional?',
    a: 'The professional receives your exact dates, guest count, and ceremony requirements immediately. Their team reviews their seasonal calendar and contacts you via email or phone within 24 to 48 hours with an initial availability check and consultation invite.',
  },
];

const PROFESSIONAL_FAQS: FAQItem[] = [
  {
    q: 'How can our studio or ensemble apply for a verified Saathi profile?',
    a: 'Professionals can create an account and apply through the Partner Onboarding flow. You will be asked to provide business registration details, documented portfolio collections, verified client references, and service rate cards for curation review.',
  },
  {
    q: 'How does the enquiry management system work for partners?',
    a: 'Once verified, incoming client enquiries appear in real-time in your dedicated Professional Dashboard. You can review ceremony specifications, budget ranges, update status (Pending, Confirmed, Declined), and communicate directly with prospective clients.',
  },
  {
    q: 'Are there exclusive listing fees or lock-in contracts?',
    a: 'Saathi operates on high-trust partner relationships. We do not enforce restrictive exclusivity or lock-in periods; our goal is connecting exceptional talent with discerning milestone hosts.',
  },
  {
    q: 'How does Saathi protect partner intellectual property and portfolio media?',
    a: 'All uploaded portfolio imagery and audiovisual works remain the exclusive copyright of the respective artists and production houses. Media assets are hosted securely with strict hotlinking and right-click protection.',
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<'customer' | 'professional'>('customer');
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const currentFaqs = activeTab === 'customer' ? CUSTOMER_FAQS : PROFESSIONAL_FAQS;

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="brand-pill mb-4">Knowledge & Guidance</span>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--text-primary)] tracking-tight mb-4">
          Frequently Asked <span className="font-signature font-normal text-[var(--accent)]">Questions</span>
        </h1>
        <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
          Everything you need to know about navigating the Saathi marketplace, direct client-vendor connections, verification standards, and milestone orchestration.
        </p>
      </div>

      {/* Segment Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-full">
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setOpenIndices([0]);
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'customer'
                ? 'bg-[var(--accent)] text-[var(--text-inverse)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <UserCheck size={15} strokeWidth={1.75} />
            <span>For Clients & Couples</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('professional');
              setOpenIndices([0]);
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'professional'
                ? 'bg-[var(--accent)] text-[var(--text-inverse)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Briefcase size={15} strokeWidth={1.75} />
            <span>For Event Professionals</span>
          </button>
        </div>
      </div>

      {/* Accordion Group */}
      <div className="space-y-4">
        {currentFaqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div
              key={index}
              className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 select-none"
                aria-expanded={isOpen}
              >
                <span className="font-heading font-semibold text-base text-[var(--text-primary)]">
                  {faq.q}
                </span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center bg-[var(--bg-base)] border border-[var(--border)] text-[var(--accent)] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown size={16} strokeWidth={2} />
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)]">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Assistance Box */}
      <div className="mt-14 p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] text-center max-w-xl mx-auto">
        <ShieldCheck size={28} strokeWidth={1.75} className="text-[var(--accent)] mx-auto mb-3" />
        <h2 className="font-heading font-semibold text-lg text-[var(--text-primary)] mb-2">
          Still need personalized assistance?
        </h2>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-5">
          Our senior concierge team is available to assist with custom vendor matching, multi-day itinerary guidance, and platform support.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--text-inverse)] text-xs font-semibold hover:opacity-95 transition-opacity"
        >
          <span>Speak with Concierge</span>
          <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
