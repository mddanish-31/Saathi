"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setTicketId(data.ticketId);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <span className="brand-pill mb-4">Concierge & Client Support</span>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--text-primary)] tracking-tight mb-4">
          Connect with the <span className="font-signature font-normal text-[var(--accent)]">Saathi</span> team.
        </h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          Whether you are planning a multi-day heritage wedding, seeking custom vendor partnerships, or require tailored platform assistance, our team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
          {status === 'success' ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4 text-[var(--accent)]">
                <CheckCircle2 size={32} strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-2">
                Enquiry Dispatched
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto mb-4">
                Thank you for getting in touch. Your enquiry reference number is{' '}
                <strong className="text-[var(--text-primary)]">{ticketId}</strong>. A concierge advisor will reply to your email within 24 business hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--text-inverse)] text-sm font-semibold hover:opacity-95 transition-opacity"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm flex items-center gap-3">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Singhania"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:border-[var(--accent)] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:border-[var(--accent)] transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:border-[var(--accent)] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Destination Wedding Planning"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:border-[var(--accent)] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                  Message / Event Vision *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your expected dates, city, ceremony requirements, or vendor questions..."
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:border-[var(--accent)] transition-colors text-sm resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--text-inverse)] text-sm font-semibold hover:opacity-95 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <Send size={15} strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)]">
              Direct Channels
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                  <Mail size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Concierge Desk
                  </span>
                  <a href="mailto:concierge@saathi.in" className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    concierge@saathi.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                  <Phone size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Dedicated Helpline
                  </span>
                  <a href="tel:+912248900000" className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    +91 (022) 4890-0000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                  <MapPin size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Corporate Office
                  </span>
                  <p className="text-sm text-[var(--text-primary)]">
                    Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                  <Clock size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Response Horizon
                  </span>
                  <p className="text-sm text-[var(--text-primary)]">
                    Monday to Saturday, 9:00 AM – 7:30 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Link Box */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-[var(--text-primary)] text-base mb-1">
              Have a quick question?
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
              Explore answers on verification, direct bookings, payments, and client rights.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Browse Frequently Asked Questions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
