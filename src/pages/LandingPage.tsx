import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Briefcase,
  Shield,
  Layers,
  HeartHandshake,
  Camera,
  Heart,
  Calendar,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SearchBar } from '../components/ui/SearchBar';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CategoryCard } from '../components/ui/CategoryCard';
import { Card } from '../components/ui/Card';
import { PREVIEW_CATEGORIES } from '../data/previewCategories';
import { CategoryPreviewItem } from '../types';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: CategoryPreviewItem) => {
    if (cat.id === 'weddings-celebrations' || cat.id === 'weddings-events') {
      onNavigate('/categories/weddings-events');
    } else if (cat.id === 'photography-production') {
      onNavigate('/categories/weddings-events/photography');
    } else if (cat.id === 'events-gatherings') {
      onNavigate('/categories/weddings-events/entertainment');
    } else {
      scrollToSection('categories');
    }
  };

  return (
    <div className="saathi-landing-page">
      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section
        id="hero"
        style={{
          paddingTop: 'clamp(var(--space-12), 6vw, var(--space-20))',
          paddingBottom: 'clamp(var(--space-16), 8vw, var(--space-24))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '880px',
              margin: '0 auto',
            }}
          >
            {/* Editorial Eyebrow */}
            <div className="animate-slide-down" style={{ marginBottom: 'var(--space-4)' }}>
              <Badge variant="brand" icon={<Sparkles size={13} />}>
                The Premium Indian Services Platform
              </Badge>
            </div>

            {/* Headline */}
            <h1
              className="animate-slide-up"
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: 'var(--text-headings)',
                letterSpacing: 'var(--tracking-tight)',
                marginBottom: 'var(--space-5)',
                lineHeight: 1.15,
              }}
            >
              Find the right people <br />
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--saathi-maroon)',
                  fontWeight: 500,
                }}
              >
                for every occasion.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              className="animate-slide-up delay-100"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '680px',
                marginBottom: 'var(--space-8)',
              }}
            >
              SAATHI helps you discover and connect with trusted professionals for life's
              important moments, celebrations, and everyday needs.
            </p>

            {/* Search Bar Discovery Element */}
            <div
              className="animate-slide-up delay-200"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-8)' }}
            >
              <SearchBar
                onSearch={(_q, _loc) => {
                  scrollToSection('categories');
                }}
              />
            </div>

            {/* CTA Buttons */}
            <div
              className="animate-slide-up delay-300"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection('categories')}
                rightIcon={<ArrowRight size={18} />}
              >
                Explore Services
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('/signup')}
                leftIcon={<Briefcase size={18} />}
              >
                Join as a Professional
              </Button>
            </div>

            {/* Curated Occasion Badges (Visual balance without fake statistics) */}
            <div
              className="animate-fade-in delay-400"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                paddingTop: 'var(--space-4)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginRight: 'var(--space-2)',
                }}
              >
                Trending Occasions:
              </span>
              {['Weddings', 'Home Styling', 'Photography', 'Wellness', 'Corporate Events'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (item === 'Weddings') {
                      onNavigate('/categories/weddings-events');
                    } else if (item === 'Photography') {
                      scrollToSection('photography');
                    } else {
                      scrollToSection('categories');
                    }
                  }}
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--saathi-maroon)';
                    e.currentTarget.style.borderColor = 'var(--saathi-maroon)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          2. CATEGORY DISCOVERY SECTION
          ===================================================================== */}
      <section
        id="categories"
        style={{
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-16)',
          backgroundColor: 'var(--bg-surface-soft)',
          transition: 'background-color var(--transition-normal)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Curated Verticals"
            title="Discover Services by Occasion"
            subtitle="Explore specialist portfolios crafted for life's significant milestones and daily lifestyle essentials."
          />

          {/* Grid of Reusable CategoryCards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {PREVIEW_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          2B. PHOTOGRAPHY SECTION
          ===================================================================== */}
      <section
        id="photography"
        style={{
          paddingTop: 'clamp(var(--space-12), 6vw, var(--space-20))',
          paddingBottom: 'clamp(var(--space-12), 6vw, var(--space-20))',
          backgroundColor: 'var(--bg-app)',
          position: 'relative',
        }}
      >
        <Container>
          {/* Main Photography Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '820px',
              margin: '0 auto var(--space-16) auto',
            }}
          >
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <Badge variant="brand" icon={<Camera size={13} />}>
                Curated Visual Arts
              </Badge>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--text-headings)',
                letterSpacing: 'var(--tracking-tight)',
                marginBottom: 'var(--space-4)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              Capture Every Beautiful Moment
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '680px',
                marginBottom: 'var(--space-8)',
              }}
            >
              Professional photography services to preserve your most memorable moments.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/categories/weddings-events/photography')}
              rightIcon={<ArrowRight size={18} />}
            >
              Explore Photography
            </Button>
          </div>

          {/* New Section Below Photography: Why Choose Our Photography? */}
          <div
            id="why-choose-photography"
            style={{
              paddingTop: 'var(--space-16)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Why Choose Our Photography?"
              subtitle="Creative, professional and personalized photography for every occasion."
            />

            {/* 3 Feature Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-8)',
              }}
            >
              {/* Feature Card 1: Wedding Photography */}
              <Card
                padding="lg"
                elevation="sm"
                interactive
                className="hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-5)',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--saathi-maroon)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <Heart size={22} />
                    </div>

                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'var(--saathi-maroon)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      Milestone Rituals
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    Wedding Photography
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    Fine-art candid moments and royal traditional portraits documenting every sacred ritual, emotional glance, and spirited dance of your wedding celebrations.
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 var(--space-6) 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-2)',
                    }}
                  >
                    {['Candid & ritual master storytelling', 'Dual camera crew & drone vistas', 'Handcrafted heirloom photo albums'].map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <CheckCircle2 size={15} style={{ color: 'var(--saathi-maroon)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    rightIcon={<ArrowRight size={16} />}
                    onClick={() => onNavigate('/categories/weddings-events/photography')}
                  >
                    Explore Wedding Photography
                  </Button>
                </div>
              </Card>

              {/* Feature Card 2: Pre-Wedding Photography */}
              <Card
                padding="lg"
                elevation="sm"
                interactive
                className="hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-5)',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--saathi-maroon)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <Sparkles size={22} />
                    </div>

                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'var(--saathi-maroon)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      Cinematic Romance
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    Pre-Wedding Photography
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    Scenic conceptual sessions celebrating your distinct journey together across heritage palaces, serene landscapes, and customized styled narratives.
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 var(--space-6) 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-2)',
                    }}
                  >
                    {['Curated moodboards & location planning', 'Haute couture styling & outfit changes', 'Cinematic 4K teaser reels'].map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <CheckCircle2 size={15} style={{ color: 'var(--saathi-maroon)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    rightIcon={<ArrowRight size={16} />}
                    onClick={() => onNavigate('/categories/weddings-events/photography')}
                  >
                    Explore Pre-Wedding Shoots
                  </Button>
                </div>
              </Card>

              {/* Feature Card 3: Event Photography */}
              <Card
                padding="lg"
                elevation="sm"
                interactive
                className="hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-5)',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--saathi-nude-tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--saathi-maroon)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <Calendar size={22} />
                    </div>

                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'var(--saathi-maroon)',
                        backgroundColor: 'var(--bg-surface-soft)',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      Gatherings & Galas
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 600,
                      color: 'var(--text-headings)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    Event Photography
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    Vibrant, unobtrusive visual coverage for private celebrations, corporate galas, milestone birthdays, and exclusive cultural showcases.
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 var(--space-6) 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-2)',
                    }}
                  >
                    {['Discrete documentary photography', 'Fast turnaround digital galleries', 'Guest portrait station options'].map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <CheckCircle2 size={15} style={{ color: 'var(--saathi-maroon)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    rightIcon={<ArrowRight size={16} />}
                    onClick={() => onNavigate('/categories/weddings-events/photography')}
                  >
                    Explore Event Photography
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          3. HOW IT WORKS SECTION
          ===================================================================== */}
      <section
        id="how-it-works"
        style={{
          paddingTop: 'var(--space-20)',
          paddingBottom: 'var(--space-20)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="The Saathi Experience"
            title="How Saathi Works"
            subtitle="A clear, respectful path to discovering and collaborating with talented professionals."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {/* Step 01 */}
            <Card padding="lg" elevation="sm" className="hover-lift">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 700,
                    color: 'var(--saathi-nude)',
                    lineHeight: 1,
                  }}
                >
                  01
                </span>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saathi-maroon)',
                  }}
                >
                  <Compass size={20} />
                </div>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Discover
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Find the right service or professional tailored to your occasion, aesthetic
                preference, and project requirements.
              </p>
            </Card>

            {/* Step 02 */}
            <Card padding="lg" elevation="sm" className="hover-lift">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 700,
                    color: 'var(--saathi-nude)',
                    lineHeight: 1,
                  }}
                >
                  02
                </span>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saathi-maroon)',
                  }}
                >
                  <Users size={20} />
                </div>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Connect
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Explore authentic portfolios, evaluate past projects, and connect directly with the
                right specialist.
              </p>
            </Card>

            {/* Step 03 */}
            <Card padding="lg" elevation="sm" className="hover-lift">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 700,
                    color: 'var(--saathi-nude)',
                    lineHeight: 1,
                  }}
                >
                  03
                </span>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saathi-maroon)',
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Book & Collaborate
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Move forward with clear communication, agreed scopes, and memorable execution of your
                occasion.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          4. WHY SAATHI (TRUST & VALUE) SECTION
          ===================================================================== */}
      <section
        id="why-saathi"
        style={{
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-16)',
          backgroundColor: 'var(--bg-surface-soft)',
          transition: 'background-color var(--transition-normal)',
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Built On Trust"
            title="Why People Choose Saathi"
            subtitle="Thoughtfully engineered to bring distinction, transparency, and peace of mind to service discovery."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {/* Value 1 */}
            <Card padding="md" elevation="sm">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--saathi-nude-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--saathi-maroon)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <Layers size={18} />
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Curated Profiles
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Professional profiles showcasing authentic work, distinct specializations, and transparent
                service offerings.
              </p>
            </Card>

            {/* Value 2 */}
            <Card padding="md" elevation="sm">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--saathi-nude-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--saathi-maroon)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <Compass size={18} />
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Better Service Discovery
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Intuitive navigation crafted around your specific occasions and living spaces rather than
                cluttered directories.
              </p>
            </Card>

            {/* Value 3 */}
            <Card padding="md" elevation="sm">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--saathi-nude-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--saathi-maroon)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <HeartHandshake size={18} />
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Direct Engagement
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Connect directly with the individual craftspeople and teams responsible for executing your
                vision.
              </p>
            </Card>

            {/* Value 4 */}
            <Card padding="md" elevation="sm">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--saathi-nude-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--saathi-maroon)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <Shield size={18} />
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Safer Interactions
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                A respectful community framework with dedicated safety standards and grievance support
                protocols.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          5. FOR PROFESSIONALS CTA SECTION
          ===================================================================== */}
      <section
        id="for-professionals"
        style={{
          paddingTop: 'var(--space-20)',
          paddingBottom: 'var(--space-20)',
        }}
      >
        <Container>
          <div
            style={{
              borderRadius: 'var(--radius-2xl)',
              backgroundColor: 'var(--saathi-maroon)',
              color: '#FAF6F3',
              padding: 'clamp(var(--space-8), 5vw, var(--space-16))',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Subtle background decorative ornament */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(210, 179, 167, 0.15) 0%, rgba(210, 179, 167, 0) 70%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                maxWidth: '680px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(210, 179, 167, 0.22)',
                    color: '#FAF6F3',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  For Specialists & Providers
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)',
                  color: '#FAF6F3',
                  marginBottom: 'var(--space-4)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                Grow your business with Saathi.
              </h2>

              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.125rem)',
                  color: 'var(--saathi-soft-taupe)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                Give professionals a dedicated place to showcase their craft, connect with genuine clients,
                and expand their presence across India.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onNavigate('/signup')}
                  style={{
                    backgroundColor: 'var(--saathi-nude)',
                    color: 'var(--saathi-deep-plum)',
                    fontWeight: 700,
                  }}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Join as a Professional
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          6. FINAL MINIMAL CTA SECTION
          ===================================================================== */}
      <section
        style={{
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-12)',
          textAlign: 'center',
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Your next moment starts with the right people.
            </h2>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Discover specialists for weddings, home spaces, creative productions, and wellness.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('categories')}
              rightIcon={<ArrowRight size={18} />}
            >
              Explore Saathi
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};
