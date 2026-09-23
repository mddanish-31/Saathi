import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  FileText,
  Bookmark,
  MessageSquare,
  CalendarCheck,
  Star,
  Bell,
  Settings,
  Clock,
  CheckCircle2,
  Sparkles,
  Home,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEnquiry } from '../context/EnquiryContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ThemeToggle } from '../components/ui/ThemeToggle';

interface CustomerDashboardPageProps {
  onNavigate: (path: string) => void;
}

type DashboardTab =
  | 'overview'
  | 'enquiries'
  | 'saved'
  | 'messages'
  | 'bookings'
  | 'reviews'
  | 'notifications'
  | 'settings';

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { enquiries } = useEnquiry();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  const customerEnquiries = enquiries;
  const pendingCount = customerEnquiries.filter((e) => e.status === 'pending').length;
  const activeBookingsCount = 0; // Local state: zero bookings until booking module
  const savedCount = 0; // Local state: zero bookmarks until saved module

  const tabs: { id: DashboardTab; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <Compass size={16} /> },
    { id: 'enquiries', label: 'My Enquiries', icon: <FileText size={16} />, badgeCount: customerEnquiries.length },
    { id: 'saved', label: 'Saved Professionals', icon: <Bookmark size={16} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={16} /> },
    { id: 'bookings', label: 'My Bookings', icon: <CalendarCheck size={16} /> },
    { id: 'reviews', label: 'Reviews', icon: <Star size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'settings', label: 'Profile & Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div
      className="saathi-customer-dashboard"
      style={{
        paddingTop: 'clamp(var(--space-6), 3vw, var(--space-10))',
        paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
        backgroundColor: 'var(--bg-app)',
        minHeight: 'calc(100vh - 120px)',
      }}
    >
      <Container>
        {/* Welcome Header */}
        <div
          className="animate-slide-up"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Avatar name={user?.name || 'Customer'} size="lg" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                  }}
                >
                  Welcome, {user?.name || 'Guest'}
                </h1>
                <Badge variant="brand">Customer Portal</Badge>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Find, connect and manage the professionals you need.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Compass size={16} />}
            onClick={() => onNavigate('/categories/weddings-events')}
          >
            Explore Services
          </Button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div
          className="saathi-tab-strip"
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 'var(--space-2)',
            paddingBottom: 'var(--space-2)',
            marginBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--border-subtle)',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--saathi-maroon)' : 'var(--bg-surface)',
                  color: isActive ? '#FAF6F3' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--saathi-maroon)' : 'var(--border-subtle)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {typeof tab.badgeCount === 'number' && tab.badgeCount > 0 && (
                  <span
                    style={{
                      padding: '0.1rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--saathi-nude-tint)',
                      color: isActive ? '#FAF6F3' : 'var(--saathi-maroon)',
                    }}
                  >
                    {tab.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Scalable 4-Card Overview Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              {/* Metric 1: My Enquiries */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    My Enquiries
                  </span>
                  <FileText size={16} />
                </div>
                <strong style={{ fontSize: '1.85rem', color: 'var(--text-headings)', fontFamily: 'var(--font-serif)' }}>
                  {customerEnquiries.length}
                </strong>
              </div>

              {/* Metric 2: Pending Responses */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Pending Responses
                  </span>
                  <Clock size={16} style={{ color: 'var(--saathi-maroon)' }} />
                </div>
                <strong style={{ fontSize: '1.85rem', color: 'var(--saathi-maroon)', fontFamily: 'var(--font-serif)' }}>
                  {pendingCount}
                </strong>
              </div>

              {/* Metric 3: Active Bookings */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Active Bookings
                  </span>
                  <CalendarCheck size={16} />
                </div>
                <strong style={{ fontSize: '1.85rem', color: 'var(--text-headings)', fontFamily: 'var(--font-serif)' }}>
                  {activeBookingsCount}
                </strong>
              </div>

              {/* Metric 4: Saved Professionals */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Saved Professionals
                  </span>
                  <Bookmark size={16} />
                </div>
                <strong style={{ fontSize: '1.85rem', color: 'var(--text-headings)', fontFamily: 'var(--font-serif)' }}>
                  {savedCount}
                </strong>
              </div>
            </div>

            {/* Recent Enquiries Preview */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-xl)',
                      color: 'var(--text-headings)',
                    }}
                  >
                    Recent Service Enquiries
                  </h2>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Latest quotations and provider communications
                  </p>
                </div>

                <Button variant="outline" size="sm" onClick={() => setActiveTab('enquiries')}>
                  View All Enquiries
                </Button>
              </div>

              {customerEnquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-8) 0', color: 'var(--text-secondary)' }}>
                  <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                    You haven't submitted any service enquiries yet.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('/categories/weddings-events/planning')}
                  >
                    Explore Professionals
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {customerEnquiries.slice(0, 3).map((enq) => (
                    <div
                      key={enq.id}
                      className="hover-lift"
                      onClick={() => onNavigate(`/customer/enquiries/${enq.id}`)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <Avatar name={enq.professionalBrand} size="md" />
                        <div>
                          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)' }}>
                            {enq.professionalBrand}
                          </h3>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            {enq.serviceName} • {enq.eventDate} ({enq.eventLocation})
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <span
                          style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            backgroundColor:
                              enq.status === 'pending'
                                ? 'rgba(210, 179, 167, 0.25)'
                                : 'rgba(46, 125, 50, 0.15)',
                            color: enq.status === 'pending' ? 'var(--saathi-maroon)' : '#2E7D32',
                          }}
                        >
                          {enq.status}
                        </span>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--saathi-maroon)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                          }}
                        >
                          <span>Details</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Category Exploration Shortcuts */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Browse Marketplace Verticals
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <button
                  type="button"
                  onClick={() => onNavigate('/categories/weddings-events')}
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={18} color="var(--saathi-maroon)" />
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                        Weddings & Events
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Planners, decor & rituals</div>
                    </div>
                  </div>
                  <ChevronRight size={15} color="var(--text-muted)" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/categories/home-spaces')}
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Home size={18} color="var(--saathi-maroon)" />
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                        Home & Living
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Interior, landscape & carpentry</div>
                    </div>
                  </div>
                  <ChevronRight size={15} color="var(--text-muted)" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/categories/wellness-lifestyle')}
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={18} color="var(--saathi-maroon)" />
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                        Wellness & Beauty
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Yoga, personal care & grooming</div>
                    </div>
                  </div>
                  <ChevronRight size={15} color="var(--text-muted)" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-6)',
                paddingBottom: 'var(--space-4)',
                borderBottom: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
              }}
            >
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--text-headings)' }}>
                  All Active Enquiries
                </h2>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Manage requests and follow up with specialist teams
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/categories/weddings-events/planning')}
              >
                Send New Enquiry
              </Button>
            </div>

            {customerEnquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--text-secondary)' }}>
                <FileText size={36} color="var(--saathi-maroon)" style={{ marginBottom: 'var(--space-3)', opacity: 0.7 }} />
                <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-headings)', marginBottom: 'var(--space-2)' }}>
                  No active enquiries
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', maxWidth: '380px', margin: '0 auto var(--space-4)' }}>
                  Submit a customized quote enquiry to any specialist on Saathi to track proposals here.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('/categories/weddings-events/planning')}
                >
                  Find Specialists
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {customerEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    onClick={() => onNavigate(`/customer/enquiries/${enq.id}`)}
                    style={{
                      padding: 'var(--space-5)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 'var(--space-4)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <Avatar name={enq.professionalBrand} size="md" />
                      <div>
                        <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-headings)' }}>
                          {enq.professionalBrand}
                        </h3>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Service: <strong>{enq.serviceName}</strong> • Date: {enq.eventDate} ({enq.eventLocation})
                        </p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Ref ID: {enq.id}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          backgroundColor:
                            enq.status === 'pending'
                              ? 'rgba(210, 179, 167, 0.25)'
                              : 'rgba(46, 125, 50, 0.15)',
                          color: enq.status === 'pending' ? 'var(--saathi-maroon)' : '#2E7D32',
                        }}
                      >
                        {enq.status}
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--saathi-maroon)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                        }}
                      >
                        <span>View Enquiry</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED PROFESSIONALS */}
        {activeTab === 'saved' && (
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Bookmark size={40} color="var(--saathi-maroon)" style={{ marginBottom: 'var(--space-3)', opacity: 0.6 }} />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              No saved professionals yet
            </h2>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                maxWidth: '420px',
                margin: '0 auto var(--space-6)',
                lineHeight: 1.6,
              }}
            >
              Bookmark specialists while exploring to easily compare portfolios, review pricing models, and request custom quotes later.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/categories/weddings-events/planning')}
            >
              Explore Specialists
            </Button>
          </div>
        )}

        {/* TAB 4: MESSAGES */}
        {activeTab === 'messages' && (
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <MessageSquare size={40} color="var(--saathi-maroon)" style={{ marginBottom: 'var(--space-3)', opacity: 0.6 }} />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              No conversations yet
            </h2>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                maxWidth: '420px',
                margin: '0 auto var(--space-6)',
                lineHeight: 1.6,
              }}
            >
              When you send an enquiry or a specialist replies to your quotation request, your direct communication will appear here.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => setActiveTab('enquiries')}
            >
              Check My Enquiries
            </Button>
          </div>
        )}

        {/* TAB 5: MY BOOKINGS */}
        {activeTab === 'bookings' && (
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <CalendarCheck size={40} color="var(--saathi-maroon)" style={{ marginBottom: 'var(--space-3)', opacity: 0.6 }} />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              No upcoming bookings
            </h2>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                maxWidth: '420px',
                margin: '0 auto var(--space-6)',
                lineHeight: 1.6,
              }}
            >
              Once you accept a specialist proposal and confirm the scope of work, your milestone timelines and booking agreements will be tracked here.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/categories/weddings-events')}
            >
              Explore Services
            </Button>
          </div>
        )}

        {/* TAB 6: REVIEWS */}
        {activeTab === 'reviews' && (
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Star size={40} color="var(--saathi-maroon)" style={{ marginBottom: 'var(--space-3)', opacity: 0.6 }} />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              No reviews yet
            </h2>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                maxWidth: '420px',
                margin: '0 auto var(--space-6)',
                lineHeight: 1.6,
              }}
            >
              You can write authentic reviews and share feedback for professionals after completing your booked events or milestone consultations.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('/categories/weddings-events')}
            >
              Browse Professionals
            </Button>
          </div>
        )}

        {/* TAB 7: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-4)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              Activity & Notifications
            </h2>

            {customerEnquiries.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {customerEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--saathi-maroon)" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                        Enquiry sent to {enq.professionalBrand} ({enq.serviceName})
                      </p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Status: <span style={{ textTransform: 'capitalize' }}>{enq.status}</span> • Event Date: {enq.eventDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-8) 0', color: 'var(--text-secondary)' }}>
                <Bell size={32} color="var(--saathi-maroon)" style={{ marginBottom: 'var(--space-2)', opacity: 0.5 }} />
                <p style={{ fontSize: 'var(--text-xs)' }}>No notifications yet. You're all caught up!</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: PROFILE & SETTINGS */}
        {activeTab === 'settings' && (
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-sm)',
              maxWidth: '680px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-4)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              Customer Profile & Preferences
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <Avatar name={user?.name || 'Customer'} size="lg" />
                <div>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-headings)' }}>
                    {user?.name || 'Guest User'}
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    {user?.email || 'customer@example.com'}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--saathi-nude-tint)',
                      color: 'var(--saathi-maroon)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    Customer Account
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                    Visual Theme
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Switch between Warm Light and Modern Dark modes
                  </div>
                </div>
                <ThemeToggle />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-headings)' }}>
                  Email & Communication Preferences
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--saathi-maroon)' }} />
                  Receive instant alerts when a specialist updates or quotes an enquiry
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--saathi-maroon)' }} />
                  Receive curated seasonal service highlights and occasion planning guides
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert('Customer preferences saved successfully.')}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

