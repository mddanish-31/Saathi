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

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const isLoginPage = currentPath === '/login' || currentPath.startsWith('/login?');
  const dashboardPath = user?.role === 'professional' ? '/professional/dashboard' : '/customer/dashboard';

  // Minimal Navbar on /login
  if (isLoginPage) {
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

  // Canonical Category Structure Data for Mega Menu
  const weddingSubcategories = [
    {
      code: 'A1',
      title: 'Wedding Planning & Coordination',
      slug: '/categories/weddings-events/planning',
      badge: 'Active Flow',
      services: [
        { name: 'Wedding Planning', href: '/categories/weddings-events/planning/wedding-planning' },
        { name: 'Event Planning', href: '/categories/weddings-events/planning/event-planning' },
        { name: 'Wedding Coordination', href: '/categories/weddings-events/planning/wedding-coordination' },
      ],
    },
    {
      code: 'A2',
      title: 'Photography & Videography',
      slug: '/categories/weddings-events/photography',
      badge: 'Coming Soon',
      services: [
        { name: 'Wedding Photography', href: '/categories/weddings-events/photography' },
        { name: 'Wedding Videography', href: '/categories/weddings-events/photography' },
        { name: 'Pre-Wedding Shoots', href: '/categories/weddings-events/photography' },
        { name: 'Drone & Cinematography', href: '/categories/weddings-events/photography' },
      ],
    },
    {
      code: 'A3',
      title: 'Music & Entertainment',
      slug: '/categories/weddings-events/entertainment',
      badge: 'Coming Soon',
      services: [
        { name: 'DJs & Sound Artists', href: '/categories/weddings-events/entertainment' },
        { name: 'Live Bands & Singers', href: '/categories/weddings-events/entertainment' },
        { name: 'Performers & Folk Troupes', href: '/categories/weddings-events/entertainment' },
        { name: 'Anchors / Emcees', href: '/categories/weddings-events/entertainment' },
      ],
    },
    {
      code: 'A4',
      title: 'Beauty, Makeup & Mehndi',
      slug: '/categories/weddings-events/beauty-makeup-mehndi',
      services: [
        { name: 'Bridal & Groom Makeup', href: '/categories/weddings-events/beauty-makeup-mehndi' },
        { name: 'Celebrity Makeup Artists', href: '/categories/weddings-events/beauty-makeup-mehndi' },
        { name: 'Couture Hairstylists', href: '/categories/weddings-events/beauty-makeup-mehndi' },
        { name: 'Mehndi & Henna Artists', href: '/categories/weddings-events/beauty-makeup-mehndi' },
      ],
    },
    {
      code: 'A5',
      title: 'Catering, Food & Desserts',
      slug: '/categories/weddings-events/catering-food-desserts',
      services: [
        { name: 'Artisanal Catering', href: '/categories/weddings-events/catering-food-desserts' },
        { name: 'Beverage & Bar Catering', href: '/categories/weddings-events/catering-food-desserts' },
        { name: 'Custom Wedding Cakes', href: '/categories/weddings-events/catering-food-desserts' },
        { name: 'Dessert & Sweet Bars', href: '/categories/weddings-events/catering-food-desserts' },
      ],
    },
    {
      code: 'A6',
      title: 'Wedding Venues',
      slug: '/categories/weddings-events/wedding-venues',
      services: [
        { name: 'Banquet & Marriage Halls', href: '/categories/weddings-events/wedding-venues' },
        { name: 'Luxury Resorts & Palaces', href: '/categories/weddings-events/wedding-venues' },
        { name: 'Sprawling Lawns & Gardens', href: '/categories/weddings-events/wedding-venues' },
        { name: 'Destination Venues', href: '/categories/weddings-events/wedding-venues' },
      ],
    },
    {
      code: 'A7',
      title: 'Decor, Styling & Essentials',
      slug: '/categories/weddings-events/decor-styling-essentials',
      services: [
        { name: 'Decoration & Mandap Styling', href: '/categories/weddings-events/decor-styling-essentials' },
        { name: 'Bespoke Floral & Lighting', href: '/categories/weddings-events/decor-styling-essentials' },
        { name: 'Furniture Rental', href: '/categories/weddings-events/decor-styling-essentials' },
        { name: 'Invitations & Gifting', href: '/categories/weddings-events/decor-styling-essentials' },
      ],
    },
    {
      code: 'A8',
      title: 'Wedding Transportation',
      slug: '/categories/weddings-events/wedding-transportation',
      services: [
        { name: 'Vintage & Luxury Cars', href: '/categories/weddings-events/wedding-transportation' },
        { name: 'Chauffeur Services', href: '/categories/weddings-events/wedding-transportation' },
        { name: 'Guest Fleet Logistics', href: '/categories/weddings-events/wedding-transportation' },
      ],
    },
  ];

  const homeServices = [
    { name: 'Interior Designers & Decorators', href: '/categories/home-spaces', desc: 'Full home & apartment transformations' },
    { name: 'Landscape & Garden Architects', href: '/categories/home-spaces', desc: 'Terrace, villa, and outdoor styling' },
    { name: 'Bespoke Carpentry & Furniture', href: '/categories/home-spaces', desc: 'Custom woodcraft and modular fittings' },
    { name: 'Renovation & Space Planning', href: '/categories/home-spaces', desc: 'Architectural consulting and upgrades' },
  ];

  const wellnessServices = [
    { name: 'Personal Care & Wellness Guides', href: '/categories/wellness-lifestyle', desc: 'Holistic lifestyle and rejuvenation' },
    { name: 'Classical Yoga & Fitness Trainers', href: '/categories/wellness-lifestyle', desc: 'Private 1-on-1 and group instructors' },
    { name: 'Grooming & Spa At-Home', href: '/categories/wellness-lifestyle', desc: 'Specialist care in personal comfort' },
    { name: 'Nutrition & Diet Consultants', href: '/categories/wellness-lifestyle', desc: 'Custom milestone nutrition planning' },
  ];

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
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Logo variant="full" size="md" onClick={() => handleNavClick('/')} />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-6)',
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

              {/* WEDDINGS MEGA MENU DROPDOWN */}
              {activeDropdown === 'weddings' && (
                <div
                  className="animate-slide-down"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-120px',
                    width: '780px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-xl)',
                    padding: 'var(--space-6)',
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 'var(--space-4)',
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
                        Weddings & Events Master Directory
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
                      <span>View All Categories</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* 4-Column Grid for A1 to A8 */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 'var(--space-5)',
                    }}
                  >
                    {weddingSubcategories.map((subcat) => (
                      <div key={subcat.code} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleNavClick(subcat.slug)}
                          style={{
                            textAlign: 'left',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            color: 'var(--text-headings)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '4px',
                            paddingBottom: '2px',
                          }}
                        >
                          <span>
                            {subcat.code}. {subcat.title}
                          </span>
                        </button>
                        {subcat.badge && (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              color: subcat.badge === 'Coming Soon' ? 'var(--text-muted)' : 'var(--saathi-maroon)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {subcat.badge}
                          </span>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
                          {subcat.services.map((srv) => (
                            <button
                              key={srv.name}
                              type="button"
                              onClick={() => handleNavClick(srv.href)}
                              style={{
                                textAlign: 'left',
                                fontSize: 'var(--text-xs)',
                                color: 'var(--text-secondary)',
                                padding: '2px 0',
                                cursor: 'pointer',
                                transition: 'color var(--transition-fast)',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                            >
                              • {srv.name}
                            </button>
                          ))}
                        </div>
                      </div>
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
                  {homeServices.map((srv) => (
                    <button
                      key={srv.name}
                      type="button"
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
                  {wellnessServices.map((srv) => (
                    <button
                      key={srv.name}
                      type="button"
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

            {/* Standard Nav Links */}
            <button
              type="button"
              onClick={() => handleNavClick('#categories')}
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              Explore All
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('#how-it-works')}
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('#for-professionals')}
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saathi-maroon)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              For Professionals
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-4)',
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
                  }}
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => handleNavClick('/login')}>
                  Login
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleNavClick('/signup')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu & Theme Toggle Trigger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
            className="saathi-mobile-actions"
          >
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-soft)',
                color: 'var(--text-primary)',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Accordion */}
        {mobileMenuOpen && (
          <div
            className="animate-slide-down"
            style={{
              padding: 'var(--space-6) 0',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
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
                    gap: 'var(--space-3)',
                  }}
                >
                  {weddingSubcategories.map((subcat) => (
                    <div key={subcat.code} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          color: 'var(--text-headings)',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleNavClick(subcat.slug)}
                          style={{ textAlign: 'left', cursor: 'pointer', color: 'var(--saathi-maroon)' }}
                        >
                          {subcat.code}. {subcat.title}
                        </button>
                        {subcat.badge && (
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{subcat.badge}</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '8px' }}>
                        {subcat.services.map((srv) => (
                          <button
                            key={srv.name}
                            type="button"
                            onClick={() => handleNavClick(srv.href)}
                            style={{
                              textAlign: 'left',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-secondary)',
                              padding: '2px 0',
                              cursor: 'pointer',
                            }}
                          >
                            • {srv.name}
                          </button>
                        ))}
                      </div>
                    </div>
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
                      marginTop: 'var(--space-2)',
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
                  {homeServices.map((srv) => (
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
                  {wellnessServices.map((srv) => (
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

            <button
              type="button"
              onClick={() => handleNavClick('#categories')}
              style={{
                textAlign: 'left',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--text-primary)',
                padding: 'var(--space-2) 0',
              }}
            >
              Explore All Categories
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('#how-it-works')}
              style={{
                textAlign: 'left',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--text-primary)',
                padding: 'var(--space-2) 0',
              }}
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('#for-professionals')}
              style={{
                textAlign: 'left',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--text-primary)',
                padding: 'var(--space-2) 0',
              }}
            >
              For Professionals
            </button>

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
                    Go to {user?.role === 'professional' ? 'Professional Portal' : 'My Account'}
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

      {/* Responsive media query styles */}
      <style>{`
        @media (min-width: 900px) {
          .saathi-desktop-nav {
            display: flex !important;
          }
          .saathi-desktop-actions {
            display: flex !important;
          }
          .saathi-mobile-actions button[aria-label*="menu"] {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

