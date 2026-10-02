"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquarePlus, Send, CheckCircle2, AlertCircle, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    email: '',
    category: 'suggestion',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit feedback. Please try again.');
      }

      setStatus('success');
      setFormData({ email: '', category: 'suggestion', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        <span>Return to Home</span>
      </Link>

      {/* Editorial Header */}
      <div className="max-w-2xl mb-12">
        <span className="brand-pill mb-4 inline-flex items-center gap-1.5">
          <MessageSquarePlus size={13} className="text-[var(--accent)]" />
          <span>Product Feedback & Reports</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-heading font-semibold text-[var(--text-primary)] tracking-tight mb-4">
          Help us refine the <span className="font-signature font-normal text-[var(--accent)]">Saathi</span> experience.
        </h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          Encountered an issue, spotted a bug, or have a suggestion to make booking wedding specialists smoother? Share your thoughts directly with our design and engineering team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
          {status === 'success' ? (
            <div className="py-10 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mx-auto">
                <CheckCircle2 size={30} />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-[var(--text-primary)]">
                Thank you for your report!
              </h3>
              <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                Your feedback has been delivered securely to our product engineering queue. We review every note to uphold our high bar for the platform.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="button-primary text-xs px-6 py-2.5"
                >
                  Submit Another Note
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-3">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Feedback Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'suggestion', label: 'Suggestion' },
                    { id: 'bug', label: 'Bug / Issue' },
                    { id: 'report', label: 'Report Profile' },
                    { id: 'general', label: 'General' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`text-xs py-2 px-3 rounded-lg border text-center font-medium transition-all ${
                        formData.category === cat.id
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)] shadow-sm'
                          : 'border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-muted)] hover:border-[var(--text-secondary)]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="feedback-email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Your Email Address <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <p className="text-[11px] text-[var(--text-muted)] mt-1">
                  We will only use this if we need to follow up regarding your report.
                </p>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="feedback-message" className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Your Message or Report <span className="text-[var(--accent)]">*</span>
                </label>
                <textarea
                  id="feedback-message"
                  required
                  rows={5}
                  minLength={5}
                  maxLength={2000}
                  placeholder="Tell us what happened, what felt clunky, or what you would love to see..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-y"
                />
                <div className="flex justify-between items-center text-[11px] text-[var(--text-muted)] mt-1">
                  <span>Minimum 5 characters</span>
                  <span>{formData.message.length} / 2000</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full button-primary py-3 text-sm flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Report...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Informational Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[var(--text-primary)]">
              <ShieldCheck size={18} className="text-[var(--accent)]" />
              <span>Submission Security & Privacy</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Every submission is subject to Row-Level Security (RLS) enforcement. Public access and directory enumeration of submissions are strictly blocked at the database engine level.
            </p>
            <ul className="text-xs text-[var(--text-secondary)] space-y-2 list-disc list-inside">
              <li>Rate-limited protection against automated spam</li>
              <li>Read access strictly isolated to privileged administrators</li>
              <li>Optional identity attachment for registered members</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface-soft)] border border-[var(--border-subtle)] space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Urgent Event Need?
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              If you require immediate assistance with an upcoming ceremony or active vendor enquiry, reach our dedicated concierge instead.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Contact Concierge Desk →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
