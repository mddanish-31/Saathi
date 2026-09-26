"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Check, Shield } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'saathi_cookie_consent_v1';

export const CookieBanner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!saved) {
        // Small delay so it doesn't jarringly pop on immediate page load
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  if (!mounted || !visible) return null;

  const handleAcceptAll = () => {
    const consent = { necessary: true, analytics: true, marketing: true, timestamp: Date.now() };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    } catch {}
    setVisible(false);
  };

  const handleRejectAll = () => {
    const consent = { necessary: true, analytics: false, marketing: false, timestamp: Date.now() };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    } catch {}
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const consent = { ...preferences, necessary: true, timestamp: Date.now() };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    } catch {}
    setVisible(false);
    setShowManage(false);
  };

  return (
    <aside
      aria-label="Cookie Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-lg p-5 transition-all duration-300 animate-slide-up"
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 text-[var(--accent)] font-heading font-semibold text-sm">
          <Cookie size={18} strokeWidth={1.75} />
          <span>Privacy & Cookie Preferences</span>
        </div>
        <button
          onClick={handleRejectAll}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-md transition-colors"
          aria-label="Close and reject non-essential cookies"
        >
          <X size={16} strokeWidth={1.75} />
        </button>
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
        Saathi uses necessary session cookies to secure your account and optional analytics to refine our marketplace experience under India’s Digital Personal Data Protection (DPDP) Act, 2023. Read our{' '}
        <Link href="/cookies" className="underline text-[var(--text-primary)] hover:text-[var(--accent)]">
          Cookie Policy
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline text-[var(--text-primary)] hover:text-[var(--accent)]">
          Privacy Policy
        </Link>.
      </p>

      {showManage ? (
        <div className="space-y-3 mb-4 pt-2 border-t border-[var(--border)] text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-[var(--text-primary)] block">Essential Cookies</span>
              <span className="text-[var(--text-muted)] text-[11px]">Authentication, CSRF token & security. Always active.</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--accent-soft)] text-[var(--text-primary)]">
              Required
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-[var(--text-primary)] block">Performance & Analytics</span>
              <span className="text-[var(--text-muted)] text-[11px]">Helps us analyze marketplace search performance.</span>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
              className="accent-[var(--accent)] h-4 w-4 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-[var(--text-primary)] block">Marketing & Personalization</span>
              <span className="text-[var(--text-muted)] text-[11px]">Customizes event recommendations.</span>
            </div>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
              className="accent-[var(--accent)] h-4 w-4 rounded cursor-pointer"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSavePreferences}
              className="flex-1 py-1.5 px-3 bg-[var(--accent)] text-[var(--text-inverse)] rounded-lg text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
            >
              <Check size={14} strokeWidth={2} /> Save Preferences
            </button>
            <button
              onClick={() => setShowManage(false)}
              className="py-1.5 px-3 border border-[var(--border)] text-[var(--text-muted)] rounded-lg text-xs hover:text-[var(--text-primary)] transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 bg-[var(--accent)] text-[var(--text-inverse)] rounded-xl text-xs font-semibold hover:opacity-95 transition-all text-center"
          >
            Accept All
          </button>
          <button
            onClick={handleRejectAll}
            className="flex-1 py-2 px-3 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] rounded-xl text-xs font-semibold hover:border-[var(--accent)] transition-colors text-center"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={() => setShowManage(true)}
            className="w-full py-1.5 text-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            Manage Preferences
          </button>
        </div>
      )}
    </aside>
  );
};
