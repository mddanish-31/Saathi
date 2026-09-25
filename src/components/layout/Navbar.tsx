"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, ChevronDown, Sparkles, Home, Heart, ArrowRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Container } from '../ui/Container';
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
  { code: 'A7', title: 'Decor, Styling & Wedding Essentials', slug: '/categories/weddings-events/decor-styling-essentials' },
  { code: 'A8', title: 'Wedding Transportation', slug: '/categories/weddings-events/wedding-transportation' },
];

const HOME_SERVICES = [
  { name: 'Interior Designers & Decorators', href: '/categories/home-spaces', desc: 'Full home & apartment transformations' },
  { name: 'Landscape & Garden Architects', href: '/categories/home-spaces', desc: 'Terrace, villa, and outdoor styling' },
  { name: 'Bespoke Carpentry & Furniture', href: '/categories/home-spaces', desc: 'Custom woodcraft and modular fittings' },
  { name: 'Renovation & Space Planning', href: '/categories/home-spaces', desc: 'Architectural consulting and upgrades' },
];

const WELLNESS_SERVICES = [
  { name: 'Personal Care & Wellness Guides', href: '/categories/wellness-lifestyle', desc: 'Holistic lifestyle and rejuvenation' },
  { name: 'Classical Yoga & Fitness Trainers', href: '/categories/wellness-lifestyle', desc: 'Private 1-on-1 and group instructors' },
  { name: 'Grooming & Spa At-Home', href: '/categories/wellness-lifestyle', desc: 'Specialist care in personal comfort' },
  { name: 'Nutrition & Diet Consultants', href: '/categories/wellness-lifestyle', desc: 'Custom milestone nutrition planning' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const dropdownTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click & Escape key for dropdowns
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
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
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
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-nav)',
          backgroundColor: isScrolled ? 'var(--nav-bg)' : 'var(--bg-app)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
          transition: 'all var(--transition-normal)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
            }}
          >
            <Logo variant="full" size="md" onClick={() => handleNavClick('/')} />
            <ThemeToggle />
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header
      ref={navContainerRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-nav)',
        backgroundColor: isScrolled ? 'var(--nav-bg)' : 'var(--bg-app)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        transition: 'all var(--transition-normal)',
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Logo variant="full" size="md" onClick={() => handleNavClick('/')} />
          </div>

          {/* Desktop Navigation Links — Only shown for Authenticated Marketplace Users */}
          {isAuthenticated ? (
            <nav
              aria-label="Marketplace Navigation"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 'clamp(var(--space-3), 1.6vw, var(--space-6))',
                position: 'relative',
              }}
              className="saathi-desktop-nav"
            >
              {/* Mega Menu Trigger: Weddings & Events */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => handleMouseEnter('weddings')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('/categories/weddings-events')}
                  aria-expanded={activeDropdown === 'weddings'}
                  aria-haspopup="true"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: currentPath.startsWith('/categories/weddings-events') ? 600 : 500,
                    color: currentPath.startsWith('/categories/weddings-events')
                      ? 'var(--saathi-maroon)'
                      : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '8px 0',
                    transition: 'color var(--transition-fast)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = currentPath.startsWith('/categories/weddings-events')
                      ? 'var(--saathi-maroon)'
                      : 'var(--text-secondary)')
                  }
                >
                  <span>Weddings & Events</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform: activeDropdown === 'weddings' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)',
                    }}
                  />
                </button>

                {/* WEDDINGS MEGA MENU DROPDOWN — 2-COLUMN x 4-ROW */}
                {activeDropdown === 'weddings' && (
                  <div
                    className="animate-slide-down"
                    role="menu"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '-60px',
                      width: '560px',
                      maxWidth: 'calc(100vw - 32px)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: 'var(--shadow-xl)',
                      padding: 'var(--space-5)',
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 'var(--space-3)',
                        marginBottom: 'var(--space-4)',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} color="var(--saathi-maroon)" />
                        <span
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'var(--text-base)',
                            fontWeight: 600,
                            color: 'var(--text-headings)',
                          }}
                        >
                          Weddings & Events Directory
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNavClick('/categories/weddings-events')}
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--saathi-maroon)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>View All Verticals</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    {/* 2-Column Grid for A1 to A8 */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {WEDDING_VERTICALS.map((subcat) => (
                        <button
                          key={subcat.code}
                          type="button"
                          role="menuitem"
                          onClick={() => handleNavClick(subcat.slug)}
                          style={{
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0.6rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-surface-soft)',
                            border: '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--saathi-nude-tint)';
                            e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-surface-soft)';
                            e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          }}
                        >
                          <span
                            style={{
                              fontSize: 'var(--text-xs)',
                              fontWeight: 700,
                              color: 'var(--saathi-maroon)',
                              backgroundColor: 'var(--bg-surface)',
                              padding: '2px 6px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-subtle)',
                              flexShrink: 0,
                            }}
                          >
                            {subcat.code}
                          </span>
                          <span
                            style={{
                              fontSize: 'var(--text-xs)',
                              fontWeight: 600,
                              color: 'var(--text-headings)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {subcat.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown: Home & Living */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => handleMouseEnter('home')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('/categories/home-spaces')}
                  aria-expanded={activeDropdown === 'home'}
                  aria-haspopup="true"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: currentPath.startsWith('/categories/home-spaces') ? 600 : 500,
                    color: currentPath.startsWith('/categories/home-spaces')
                      ? 'var(--saathi-maroon)'
                      : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '8px 0',
                    transition: 'color var(--transition-fast)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = currentPath.startsWith('/categories/home-spaces')
                      ? 'var(--saathi-maroon)'
                      : 'var(--text-secondary)')
                  }
                >
                  <span>Home & Living</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform: activeDropdown === 'home' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)',
                    }}
                  />
                </button>

                {activeDropdown === 'home' && (
                  <div
                    className="animate-slide-down"
                    role="menu"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '320px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--space-4)',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <Home size={15} color="var(--saathi-maroon)" />
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                        Home & Living Spaces
                      </span>
                    </div>
                    {HOME_SERVICES.map((srv) => (
                      <button
                        key={srv.name}
                        type="button"
                        role="menuitem"
                        onClick={() => handleNavClick(srv.href)}
                        style={{
                          textAlign: 'left',
                          padding: 'var(--space-2)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-soft)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--saathi-nude-tint)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-soft)')}
                      >
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                          {srv.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {srv.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown: Wellness & Beauty */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => handleMouseEnter('wellness')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('/categories/wellness-lifestyle')}
                  aria-expanded={activeDropdown === 'wellness'}
                  aria-haspopup="true"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: currentPath.startsWith('/categories/wellness-lifestyle') ? 600 : 500,
                    color: currentPath.startsWith('/categories/wellness-lifestyle')
                      ? 'var(--saathi-maroon)'
                      : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '8px 0',
                    transition: 'color var(--transition-fast)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = currentPath.startsWith('/categories/wellness-lifestyle')
                      ? 'var(--saathi-maroon)'
                      : 'var(--text-secondary)')
                  }
                >
                  <span>Wellness & Beauty</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform: activeDropdown === 'wellness' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)',
                    }}
                  />
                </button>

                {activeDropdown === 'wellness' && (
                  <div
                    className="animate-slide-down"
                    role="menu"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '320px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--space-4)',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <Heart size={15} color="var(--saathi-maroon)" />
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                        Personal Wellness & Care
                      </span>
                    </div>
                    {WELLNESS_SERVICES.map((srv) => (
                      <button
                        key={srv.name}
                        type="button"
                        role="menuitem"
                        onClick={() => handleNavClick(srv.href)}
                        style={{
                          textAlign: 'left',
                          padding: 'var(--space-2)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-soft)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--saathi-nude-tint)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-soft)')}
                      >
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                          {srv.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {srv.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          ) : null}

          {/* Desktop Right Actions: EXACTLY ONE ThemeToggle */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-4)',
              flexShrink: 0,
            }}
            className="saathi-desktop-actions"
          >
            <ThemeToggle />

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<User size={14} />}
                  onClick={() => handleNavClick(dashboardPath)}
                >
                  {user?.role === 'professional' ? 'Pro Portal' : 'My Account'}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onNavigate('/');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Button variant="ghost" size="sm" onClick={() => handleNavClick('/login')}>
                  Login
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleNavClick('/signup')}>
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Right Actions: Exactly ONE ThemeToggle + ONE Menu Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              flexShrink: 0,
            }}
            className="saathi-mobile-actions"
          >
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-soft)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="animate-slide-down"
            style={{
              padding: 'var(--space-6) 0',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
            }}
          >
            {/* Authenticated Marketplace Navigation for Mobile */}
            {isAuthenticated ? (
              <>
                {/* Expandable Accordion: Weddings & Events */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedCat(mobileExpandedCat === 'weddings' ? null : 'weddings')
                    }
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-2) 0',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Weddings & Events</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: mobileExpandedCat === 'weddings' ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-fast)',
                      }}
                    />
                  </button>

                  {mobileExpandedCat === 'weddings' && (
                    <div
                      style={{
                        padding: 'var(--space-3)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        borderRadius: 'var(--radius-md)',
                        marginTop: 'var(--space-1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {WEDDING_VERTICALS.map((subcat) => (
                        <button
                          key={subcat.code}
                          type="button"
                          onClick={() => handleNavClick(subcat.slug)}
                          style={{
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0.5rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              color: 'var(--saathi-maroon)',
                              flexShrink: 0,
                            }}
                          >
                            {subcat.code}
                          </span>
                          <span
                            style={{
                              fontSize: 'var(--text-xs)',
                              fontWeight: 600,
                              color: 'var(--text-headings)',
                            }}
                          >
                            {subcat.title}
                          </span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleNavClick('/categories/weddings-events')}
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          color: 'var(--saathi-maroon)',
                          textAlign: 'center',
                          padding: 'var(--space-2)',
                          borderTop: '1px solid var(--border-subtle)',
                          marginTop: 'var(--space-1)',
                          cursor: 'pointer',
                        }}
                      >
                        View All Weddings & Events →
                      </button>
                    </div>
                  )}
                </div>

                {/* Expandable Accordion: Home & Living */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === 'home' ? null : 'home')}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-2) 0',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Home & Living</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: mobileExpandedCat === 'home' ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-fast)',
                      }}
                    />
                  </button>

                  {mobileExpandedCat === 'home' && (
                    <div
                      style={{
                        padding: 'var(--space-3)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        borderRadius: 'var(--radius-md)',
                        marginTop: 'var(--space-1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {HOME_SERVICES.map((srv) => (
                        <button
                          key={srv.name}
                          type="button"
                          onClick={() => handleNavClick(srv.href)}
                          style={{
                            textAlign: 'left',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-secondary)',
                            padding: '4px 0',
                            cursor: 'pointer',
                          }}
                        >
                          • {srv.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expandable Accordion: Wellness & Beauty */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === 'wellness' ? null : 'wellness')}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-2) 0',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Wellness & Beauty</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: mobileExpandedCat === 'wellness' ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-fast)',
                      }}
                    />
                  </button>

                  {mobileExpandedCat === 'wellness' && (
                    <div
                      style={{
                        padding: 'var(--space-3)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        borderRadius: 'var(--radius-md)',
                        marginTop: 'var(--space-1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {WELLNESS_SERVICES.map((srv) => (
                        <button
                          key={srv.name}
                          type="button"
                          onClick={() => handleNavClick(srv.href)}
                          style={{
                            textAlign: 'left',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-secondary)',
                            padding: '4px 0',
                            cursor: 'pointer',
                          }}
                        >
                          • {srv.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : null}

            {/* Mobile Auth CTAs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {isAuthenticated ? (
                <>
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<User size={16} />}
                    onClick={() => handleNavClick(dashboardPath)}
                  >
                    Go to {user?.role === 'professional' ? 'Pro Portal' : 'My Account'}
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    leftIcon={<LogOut size={16} />}
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      onNavigate('/');
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" fullWidth onClick={() => handleNavClick('/login')}>
                    Login
                  </Button>
                  <Button variant="primary" fullWidth onClick={() => handleNavClick('/signup')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
