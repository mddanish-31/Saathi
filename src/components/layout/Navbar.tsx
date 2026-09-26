"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown, Sparkles, ArrowRight, Phone, Mail } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface VerticalItem {
  code: string;
  title: string;
  slug: string;
}

const WEDDING_VERTICALS: VerticalItem[] = [
  { code: 'A1', title: 'Wedding Planning & Coordination', slug: '/categories/weddings-events/planning' },
  { code: 'A2', title: 'Photography & Videography', slug: '/categories/weddings-events/photography' },
  { code: 'A3', title: 'Music & Entertainment', slug: '/categories/weddings-events/entertainment' },
  { code: 'A4', title: 'Beauty, Makeup & Mehndi', slug: '/categories/weddings-events/beauty-makeup-mehndi' },
  { code: 'A5', title: 'Catering, Food & Desserts', slug: '/categories/weddings-events/catering-food-desserts' },
  { code: 'A6', title: 'Wedding Venues', slug: '/categories/weddings-events/wedding-venues' },
  { code: 'A7', title: 'Decor & Mandap Styling', slug: '/categories/weddings-events/decor-styling-essentials' },
  { code: 'A8', title: 'Wedding Transportation', slug: '/categories/weddings-events/wedding-transportation' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const dropdownTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (href.startsWith('#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(href);
    }
  };

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isAuthPage =
    currentPath === '/login' ||
    currentPath.startsWith('/login?') ||
    currentPath === '/signup' ||
    currentPath.startsWith('/signup?');

  const dashboardPath = user?.role === 'professional' ? '/professional/dashboard' : '/customer/dashboard';

  // Minimal Navbar on /login and /signup
  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Logo size="md" asLink={true} />
          <ThemeToggle />
        </div>
      </header>
    );
  }

  return (
    <header
      ref={navContainerRef}
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-[var(--bg-surface)] border-b border-[var(--border)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center flex-shrink-0">
          <Logo size="md" showTagline={true} asLink={true} />
        </div>

        {/* Center: Desktop Navigation Links (Underline-grow-on-hover, no SaaS pill backgrounds) */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-8 relative">
          {/* Mega Menu Trigger: Weddings & Events */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('weddings')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleNavClick('/categories/weddings-events')}
              aria-expanded={activeDropdown === 'weddings'}
              aria-haspopup="true"
              className="relative py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group"
            >
              <span>Weddings & Events</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  activeDropdown === 'weddings' ? 'rotate-180 text-[var(--accent)]' : ''
                }`}
              />
              {/* Editorial underline indicator */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-250 ${
                  currentPath.startsWith('/categories/weddings-events')
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            {/* Weddings Mega Menu Dropdown */}
            {activeDropdown === 'weddings' && (
              <div
                className="animate-slide-down absolute top-full left-0 w-[540px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-lg p-5 z-50"
                role="menu"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2 text-xs font-heading font-semibold text-[var(--text-primary)]">
                    <Sparkles size={14} className="text-[var(--accent)]" />
                    <span>Curated Milestone Verticals</span>
                  </div>
                  <Link
                    href="/categories/weddings-events"
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Directory</span>
                    <ArrowRight size={12} strokeWidth={2} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {WEDDING_VERTICALS.map((subcat) => (
                    <Link
                      key={subcat.code}
                      href={subcat.slug}
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--bg-base)] transition-all group"
                    >
                      <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--bg-base)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                        {subcat.code}
                      </span>
                      <span className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                        {subcat.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Direct Link: Music & Entertainment */}
          <Link
            href="/categories/weddings-events/entertainment"
            className="relative py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>Music & Live Acts</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-250 ${
                currentPath === '/categories/weddings-events/entertainment'
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>

          {/* Direct Link: FAQ */}
          <Link
            href="/faq"
            className="relative py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>FAQ</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-250 ${
                currentPath === '/faq' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>

          {/* Direct Link: Contact */}
          <Link
            href="/contact"
            className="relative py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>Concierge</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-250 ${
                currentPath === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        </nav>

        {/* Right: Actions (Clean editorial CTA, not heavy filled blocks) */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href={dashboardPath}
                className="px-4 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.97] transition-all inline-flex items-center gap-1.5"
              >
                <User size={13} strokeWidth={2} />
                <span>{user?.role === 'professional' ? 'Pro Portal' : 'My Account'}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={16} strokeWidth={1.75} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] active:scale-[0.97] text-xs font-semibold transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition-transform"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* =====================================================================
          MOBILE FULL-SCREEN EDITORIAL OVERLAY MENU
          No capsule buttons, generous padding, full-tap-width, staggered animation
          ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 bg-[var(--bg-surface)] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto lg:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
              <Logo size="md" showTagline={false} asLink={true} onClick={() => setMobileMenuOpen(false)} />
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition-transform"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Vertical Stacked Navigation Links (Generous padding, full-tap-width) */}
            <motion.div
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                },
                closed: {},
              }}
              className="py-6 space-y-1 flex-1 flex flex-col justify-center"
            >
              {[
                { title: 'Home', href: '/' },
                { title: 'All Weddings & Events', href: '/categories/weddings-events' },
                { title: 'Wedding Planning & Coordination', href: '/categories/weddings-events/planning' },
                { title: 'Music & Entertainment', href: '/categories/weddings-events/entertainment' },
                { title: 'Frequently Asked Questions', href: '/faq' },
                { title: 'Concierge Desk', href: '/contact' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 12 },
                  }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-3.5 px-2 text-xl font-heading font-medium text-[var(--text-primary)] hover:text-[var(--accent)] border-b border-[var(--border)]/50 transition-colors"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Actions inside Overlay */}
            <div className="pt-6 border-t border-[var(--border)] space-y-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    href={dashboardPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 px-4 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 hover:border-[var(--accent)] transition-colors"
                  >
                    <User size={16} />
                    <span>{user?.role === 'professional' ? 'Pro Portal' : 'My Account'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      onNavigate('/');
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent)] text-center transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] text-center hover:border-[var(--accent)] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-xs font-semibold text-center transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2">
                <span>Saathi • Simpler 2 Gather</span>
                <span>BKC, Mumbai</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
