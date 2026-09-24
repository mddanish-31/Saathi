import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { EnquiryProvider } from './context/EnquiryContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { WeddingsEventsPage } from './pages/WeddingsEventsPage';
import { WeddingPlanningPage } from './pages/WeddingPlanningPage';
import { MusicEntertainmentPage } from './pages/MusicEntertainmentPage';
import { ProfessionalProfilePage } from './pages/ProfessionalProfilePage';
import { EnquiryPage } from './pages/EnquiryPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { ProfessionalDashboardPage } from './pages/ProfessionalDashboardPage';
import { CustomerEnquiriesPage } from './pages/CustomerEnquiriesPage';
import { CateringPage } from './pages/CateringPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { MASTER_WEDDINGS_CATEGORY } from './data/weddingPlanningData';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const fullPath = window.location.pathname + window.location.search;
        setCurrentPath(fullPath);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const parseRoute = (pathWithSearch: string) => {
    let pathname = pathWithSearch;
    let search = '';
    const qIndex = pathWithSearch.indexOf('?');
    if (qIndex !== -1) {
      pathname = pathWithSearch.substring(0, qIndex);
      search = pathWithSearch.substring(qIndex);
    }

    const searchParams = new URLSearchParams(search);

    // 1. Landing
    if (pathname === '/' || pathname === '') {
      return { type: 'landing' };
    }

    // 2. Auth
    if (pathname === '/login') {
      return { type: 'login', returnTo: searchParams.get('returnTo') || undefined };
    }
    if (pathname === '/signup') {
      return { type: 'signup', returnTo: searchParams.get('returnTo') || undefined };
    }

    // 3. Dashboards
    if (pathname === '/customer/dashboard') {
      return { type: 'customer-dashboard' };
    }
    if (pathname === '/professional/dashboard') {
      return { type: 'professional-dashboard' };
    }

    // 4. Customer Enquiries
    if (pathname === '/customer/enquiries') {
      return { type: 'customer-enquiries' };
    }
    const customerEnquiryMatch = pathname.match(/^\/customer\/enquiries\/([^/]+)$/);
    if (customerEnquiryMatch) {
      return { type: 'customer-enquiries-detail', enquiryId: customerEnquiryMatch[1] };
    }

    // 5. Master Weddings & Events Category
    if (pathname === '/categories/weddings-events') {
      return { type: 'weddings-events' };
    }

    // 6. Subcategory A1: Planning & Coordination
    if (pathname === '/categories/weddings-events/planning') {
      return { type: 'wedding-planning' };
    }
    if (pathname === '/categories/weddings-events/planning/wedding-planning') {
      return { type: 'wedding-planning-service', serviceSlug: 'wedding-planning' };
    }
    if (pathname === '/categories/weddings-events/planning/event-planning') {
      return { type: 'wedding-planning-service', serviceSlug: 'event-planning' };
    }
    if (pathname === '/categories/weddings-events/planning/wedding-coordination') {
      return { type: 'wedding-planning-service', serviceSlug: 'wedding-coordination' };
    }

    // 6b. Subcategory A3: Music & Entertainment
    if (pathname === '/categories/weddings-events/entertainment') {
      return { type: 'music-entertainment' };
    }
    const a3ServiceMatch = pathname.match(/^\/categories\/weddings-events\/entertainment\/([^/]+)$/);
    if (a3ServiceMatch) {
      const a3ServiceSlugs = ['djs', 'live-bands', 'singers', 'performers', 'anchors-hosts', 'event-production'];
      if (a3ServiceSlugs.includes(a3ServiceMatch[1])) {
        return { type: 'music-entertainment-service', serviceSlug: a3ServiceMatch[1] };
      }
    }

    // 6c. Subcategory A5: Catering, Food & Desserts
    if (
      pathname === '/catering' ||
      pathname === '/categories/weddings-events/catering-food-desserts' ||
      pathname === '/categories/weddings-events/catering'
    ) {
      return { type: 'catering' };
    }
    if (pathname.startsWith('/categories/weddings-events/catering-food-desserts/')) {
      return { type: 'catering' };
    }

    // 7. Professionals Profile & Enquiry
    const proEnquireMatch = pathname.match(/^\/professionals\/([^/]+)\/enquire$/);
    if (proEnquireMatch) {
      return { type: 'professional-enquire', professionalId: proEnquireMatch[1] };
    }

    const proProfileMatch = pathname.match(/^\/professionals\/([^/]+)$/);
    if (proProfileMatch) {
      return { type: 'professional-profile', professionalId: proProfileMatch[1] };
    }

    // 8. Placeholders for upcoming categories
    if (pathname.startsWith('/categories/weddings-events/')) {
      const subSlug = pathname.replace('/categories/weddings-events/', '');
      const subFound = MASTER_WEDDINGS_CATEGORY.subCategories.find((s) => s.slug === subSlug);
      const title = subFound ? subFound.name : subSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        type: 'placeholder',
        title: `${title} (Coming Soon)`,
        description: 'This specialized vertical is currently in preparation and will be released in an upcoming Saathi platform phase.',
      };
    }

    if (pathname.startsWith('/categories/')) {
      const cleanName = pathname
        .replace('/categories/', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        type: 'placeholder',
        title: cleanName,
        description: 'This specialized vertical is scheduled for release in the upcoming platform phase.',
      };
    }

    // Fallback: Landing
    return { type: 'landing' };
  };

  const renderPage = () => {
    const route = parseRoute(currentPath);

    switch (route.type) {
      case 'login':
        return <LoginPage onNavigate={navigate} returnTo={route.returnTo} />;
      case 'signup':
        return <SignupPage onNavigate={navigate} returnTo={route.returnTo} />;
      case 'customer-dashboard':
        return <CustomerDashboardPage onNavigate={navigate} />;
      case 'professional-dashboard':
        return <ProfessionalDashboardPage onNavigate={navigate} />;
      case 'customer-enquiries':
        return <CustomerEnquiriesPage onNavigate={navigate} />;
      case 'customer-enquiries-detail':
        return <CustomerEnquiriesPage enquiryId={route.enquiryId} onNavigate={navigate} />;
      case 'weddings-events':
        return <WeddingsEventsPage onNavigate={navigate} />;
      case 'wedding-planning':
        return <WeddingPlanningPage onNavigate={navigate} />;
      case 'wedding-planning-service':
        return <WeddingPlanningPage activeServiceSlug={route.serviceSlug} onNavigate={navigate} />;
      case 'music-entertainment':
        return <MusicEntertainmentPage onNavigate={navigate} />;
      case 'music-entertainment-service':
        return <MusicEntertainmentPage activeServiceSlug={route.serviceSlug} onNavigate={navigate} />;
      case 'catering':
        return <CateringPage onNavigate={navigate} />;
      case 'professional-profile':
        return <ProfessionalProfilePage professionalId={route.professionalId!} onNavigate={navigate} />;
      case 'professional-enquire':
        return <EnquiryPage professionalId={route.professionalId!} onNavigate={navigate} />;
      case 'placeholder':
        return (
          <PlaceholderPage
            title={route.title!}
            description={route.description}
            onNavigate={navigate}
          />
        );
      case 'landing':
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  const isDashboardRoute =
    currentPath.startsWith('/customer') || currentPath.startsWith('/professional');
  const footerVariant = isDashboardRoute ? 'compact' : 'full';

  return (
    <ThemeProvider>
      <AuthProvider>
        <EnquiryProvider>
          <div
            className="saathi-app-root"
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-primary)',
            }}
          >
            <Navbar currentPath={currentPath} onNavigate={navigate} />
            <main style={{ flex: '1 0 auto' }}>
              {renderPage()}
            </main>
            <Footer onNavigate={navigate} variant={footerVariant} />
          </div>
        </EnquiryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;