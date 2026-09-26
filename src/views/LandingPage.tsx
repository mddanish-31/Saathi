"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Star,
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  Plus,
  X,
} from 'lucide-react';
import { Logo } from '../components/brand/Logo';
import { Professional } from '../types';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

// 4-6 Curated High-Resolution Service-Related Photos for Shuffling Hero Panel
const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    title: 'Heritage Palace Mandaps',
    vertical: 'Weddings & Planning',
    location: 'Udaipur, Rajasthan',
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'Bespoke Floral Architecture',
    vertical: 'Decor & Styling',
    location: 'Delhi NCR',
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    title: 'Live Sufi & Bollywood Ensembles',
    vertical: 'Music & Acts',
    location: 'Mumbai, Maharashtra',
  },
  {
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    title: 'Artisanal Culinary Experiences',
    vertical: 'Catering & Food',
    location: 'Bengaluru, Karnataka',
  },
  {
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    title: 'Cinematic Pheras & Stories',
    vertical: 'Photography & Films',
    location: 'Jaipur, Rajasthan',
  },
];

// Bento Grid Categories: 1 Featured 2x2, two 1x2, three 1x1 per spec
const BENTO_CATEGORIES = [
  {
    code: 'A1',
    name: 'Wedding Planning & Coordination',
    subtitle: 'Turnkey orchestration, bespoke timelines, multi-day guest hospitality, and vendor direction for luxury unions.',
    badge: 'Featured Vertical • A1',
    href: '/categories/weddings-events/planning',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    gridSpan: 'md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[480px]',
    isFeatured: true,
  },
  {
    code: 'A3',
    name: 'Music & Entertainment',
    subtitle: 'Concert DJs, Sufi-Bollywood fusion acts, celebrity hosts, and precision sound engineering.',
    badge: 'Live Acts • A3',
    href: '/categories/weddings-events/entertainment',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
    gridSpan: 'md:col-span-2 md:row-span-1 min-h-[230px]',
    isFeatured: false,
  },
  {
    code: 'A2',
    name: 'Photography & Cinematography',
    subtitle: 'Award-winning candid and cinematic visual masters capturing sacred vows and royal celebrations.',
    badge: 'Visual Stories • A2',
    href: '/categories/weddings-events/photography',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80',
    gridSpan: 'md:col-span-2 md:row-span-1 min-h-[230px]',
    isFeatured: false,
  },
  {
    code: 'A7',
    name: 'Decor, Mandap & Styling',
    subtitle: 'Visionary floral designers & thematic mandap architects.',
    badge: 'Styling • A7',
    href: '/categories/weddings-events/decor-styling-essentials',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    gridSpan: 'md:col-span-1 md:row-span-1 min-h-[220px]',
    isFeatured: false,
  },
  {
    code: 'A5',
    name: 'Fine Catering & Desserts',
    subtitle: 'Fine-dining regional banquet & live counter masters.',
    badge: 'Culinary • A5',
    href: '/categories/weddings-events/catering-food-desserts',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    gridSpan: 'md:col-span-1 md:row-span-1 min-h-[220px]',
    isFeatured: false,
  },
  {
    code: 'A6',
    name: 'Venues & Heritage Palaces',
    subtitle: 'Royal havelis, luxury coastal resorts, and expansive lawns.',
    badge: 'Venues • A6',
    href: '/categories/weddings-events/wedding-venues',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gridSpan: 'md:col-span-2 md:row-span-1 min-h-[220px]',
    isFeatured: false,
  },
];

interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  relativeDate: string;
  comment: string;
  eventType: string;
  location: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Priyamvada Mehta',
    rating: 5,
    relativeDate: '2 weeks ago',
    comment:
      'Orchestrating our 3-day Udaipur union across four heritage venues seemed terrifying until we connected with Aura Bespoke through Saathi. It was pure poetry in motion.',
    eventType: 'Destination Wedding',
    location: 'Lake Pichola, Udaipur',
  },
  {
    id: 'rev-2',
    authorName: 'Ashwin Ramanathan',
    rating: 5,
    relativeDate: '3 weeks ago',
    comment:
      'Our parents were deeply traditional about Muhurtham timings, while we wanted contemporary ease. The verified team balanced sacred ritual with modern punctuality seamlessly.',
    eventType: 'Vedic Muhurtham',
    location: 'Bangalore Palace, Bengaluru',
  },
  {
    id: 'rev-3',
    authorName: 'Ananya Singhania',
    rating: 5,
    relativeDate: '1 month ago',
    comment:
      'The Sufi live ensemble curated for our Sangeet night electrified the entire courtyard. Transparent pricing, zero hidden markups, and flawless backstage coordination.',
    eventType: 'Sangeet & Cocktail',
    location: 'The Oberoi Sukhvilas, Chandigarh',
  },
  {
    id: 'rev-4',
    authorName: 'Rohan Deshmukh',
    rating: 5,
    relativeDate: '1 month ago',
    comment:
      'Finding master regional caterers who could deliver authentic Maratha royal recipes alongside modern dessert stations was our priority. Exceeded our highest expectations.',
    eventType: 'Wedding Reception',
    location: 'Taj Lands End, Mumbai',
  },
  {
    id: 'rev-5',
    authorName: 'Meera Kapur',
    rating: 5,
    relativeDate: '2 months ago',
    comment:
      'The cinematography team captured candid, emotional moments that our family will cherish for generations. Direct vendor connection with zero platform friction.',
    eventType: 'Pheras & Pre-Wedding',
    location: 'Samode Palace, Jaipur',
  },
];

// Helper to generate initials avatar
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Star Rating Component with Staggered Scale-Pop Animation
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star, idx) => (
        <motion.div
          key={star}
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.1,
            delay: idx * 0.05,
            ease: 'easeOut',
          }}
        >
          <Star
            size={15}
            className={
              star <= rating
                ? 'fill-[var(--accent)] text-[var(--accent)]'
                : 'text-[var(--border)] stroke-[var(--border)]'
            }
          />
        </motion.div>
      ))}
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [featuredPros, setFeaturedPros] = useState<Professional[]>([]);
  const [loadingPros, setLoadingPros] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  // Reviews state & submission form modal
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    reviewText: '',
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submittedReviewSuccess, setSubmittedReviewSuccess] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked transforms on Hero image panel:
  // Scales down from 1 to ~0.70 and opacity fades down to ~0.25 to blend into background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.45, 0.22]);
  const panelTranslateY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  // Calm crossfade slideshow loop running every 4 seconds (1.5s crossfade)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real verified professionals from Supabase API
  useEffect(() => {
    let isMounted = true;
    async function loadPros() {
      try {
        const res = await fetch('/api/professionals?limit=4');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.professionals) {
            setFeaturedPros(json.professionals);
          }
        }
      } catch (err) {
        console.error('Failed to load featured professionals:', err);
      } finally {
        if (isMounted) setLoadingPros(false);
      }
    }
    loadPros();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/categories/weddings-events?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate('/categories/weddings-events');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.email.trim() || !reviewForm.reviewText.trim()) {
      return;
    }

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName: reviewForm.name.trim(),
      rating: reviewForm.rating,
      relativeDate: 'Just now',
      comment: reviewForm.reviewText.trim(),
      eventType: 'Verified Celebration',
      location: 'India',
    };

    setReviews([newRev, ...reviews]);
    setSubmittedReviewSuccess(true);
    setTimeout(() => {
      setSubmittedReviewSuccess(false);
      setShowReviewModal(false);
      setReviewForm({ name: '', email: '', rating: 5, reviewText: '' });
    }, 1800);
  };

  return (
    <div className="relative w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* =====================================================================
          1. HERO SECTION — SHUFFLING IMAGE PANEL & EDITORIAL COPY
          ===================================================================== */}
      <section
        ref={heroRef}
        className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline + Subtitle + Direct Search + CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Animated Infinity Logo Mark */}
            <div className="mb-6">
              <Logo size="hero" animated={true} showTagline={false} asLink={false} />
            </div>

            {/* Editorial Eyebrow with hairline dividers */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[var(--border)]" />
              <span className="text-xs uppercase tracking-[0.025em] font-semibold text-[var(--accent)] font-heading">
                Simpler 2 Gather • India&rsquo;s Editorial Marketplace
              </span>
              <span className="w-8 h-[1px] bg-[var(--border)]" />
            </div>

            {/* Hero Headline with Fraunces Italic Accent */}
            <h1 className="hero-headline font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-6">
              Milestone celebrations made{' '}
              <span className="font-signature font-normal text-[var(--accent)]">effortless</span> and
              unforgettable.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mb-8 leading-[1.68] font-normal">
              Saathi curates India&rsquo;s foremost wedding planners, musicians, caterers, and production
              studios — vetted for craftsmanship, trusted for your grandest memories.
            </p>

            {/* Direct Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-lg mb-8 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-2 shadow-sm flex items-center gap-2"
            >
              <div className="pl-3 text-[var(--text-muted)]">
                <Search size={18} strokeWidth={1.75} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search planners, live bands, venues, or cities..."
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-xs font-semibold active:scale-[0.97] transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Explore</span>
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </form>

            {/* Subtle CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link
                href="/categories/weddings-events"
                className="px-6 py-3 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-xs font-semibold active:scale-[0.97] transition-all inline-flex items-center gap-2"
              >
                <span>Explore Curated Verticals</span>
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-semibold hover:border-[var(--accent)] active:scale-[0.97] transition-all inline-flex items-center gap-2"
              >
                <span>Speak to Concierge</span>
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[var(--text-muted)] pt-4 border-t border-[var(--border)] w-full">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[var(--accent)]" />
                100% Vetted Production Partners
              </span>
              <span>•</span>
              <span>Zero Platform Markups</span>
              <span>•</span>
              <span>Direct Vendor Proposals</span>
            </div>
          </div>

          {/* Right Column: Shuffling Crossfade Image Panel with Scroll-Linked Mask & Transform */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <motion.div
              style={{
                scale: shouldReduceMotion ? 1 : panelScale,
                opacity: shouldReduceMotion ? 1 : panelOpacity,
                y: shouldReduceMotion ? 0 : panelTranslateY,
                willChange: 'transform, opacity',
              }}
              className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            >
              {/* Slideshow of 5 photos crossfading every 4 seconds with 1.5s calm ease-in-out */}
              {HERO_IMAGES.map((img, idx) => (
                <div
                  key={img.url}
                  className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
                  style={{
                    opacity: idx === activeHeroIndex ? 1 : 0,
                    zIndex: idx === activeHeroIndex ? 2 : 1,
                  }}
                >
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient Scrim on Bottom 40% for text clarity */}
                  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
                </div>
              ))}

              {/* Edge Gradient Mask Overlay ensuring soft visual blend into page background */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl z-10"
                style={{
                  boxShadow: 'inset 0 0 32px 8px var(--bg-base)',
                }}
              />

              {/* Floating Meta Caption Bar displaying current active slide details */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between gap-3 text-xs font-medium text-white/95 bg-black/40 backdrop-blur-md border border-white/20 py-2.5 px-4 rounded-xl">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--saathi-nude)] block">
                    {HERO_IMAGES[activeHeroIndex].vertical}
                  </span>
                  <span className="font-heading font-semibold text-xs">
                    {HERO_IMAGES[activeHeroIndex].title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <MapPin size={12} strokeWidth={2} />
                  <span>{HERO_IMAGES[activeHeroIndex].location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BENTO GRID CATEGORIES SHOWCASE (TRUE MIXED-SIZE GRID)
          ===================================================================== */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="brand-pill mb-3">Service Verticals</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
              Curated for Every <span className="font-signature font-normal text-[var(--accent)]">Ceremony</span>
            </h2>
          </div>
          <Link
            href="/categories/weddings-events"
            className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1.5 self-start md:self-end"
          >
            <span>View All Verticals & Rate Cards</span>
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        {/* Bento Grid: 1 Featured 2x2 Tile, Two 1x2 Tiles, Three 1x1 Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[230px]">
          {BENTO_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.35,
                delay: index * 0.06, // 60ms stagger per tile
                ease: 'easeOut',
              }}
              className={`${cat.gridSpan} relative rounded-2xl overflow-hidden border border-[var(--border)] group cursor-pointer`}
            >
              <Link href={cat.href} className="block w-full h-full relative">
                {/* Full-bleed image with hover scale(1.03) strictly on image only */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Bottom 40% Gradient Scrim for crisp text legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/85 via-black/45 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
                </div>

                {/* Eyebrow Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-sm text-white/90 border border-white/20">
                    {cat.badge}
                  </span>
                </div>

                {/* Scrim Overlay Content: Category Name in Font #2 (General Sans 600) */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end text-white">
                  <h3 className="font-heading font-semibold text-lg md:text-xl text-white mb-1 tracking-tight">
                    {cat.name}
                  </h3>
                  {cat.subtitle && (
                    <p className="text-xs text-white/80 line-clamp-2 max-w-lg mb-3 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--saathi-nude)] group-hover:translate-x-1 transition-transform">
                    <span>Explore Verified Specialists</span>
                    <ArrowRight size={13} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED VERIFIED PROFESSIONALS (REAL API DATA)
          ===================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="brand-pill mb-3">Vetted Partners</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
              Featured <span className="font-signature font-normal text-[var(--accent)]">Professionals</span>
            </h2>
          </div>
          <Link
            href="/categories/weddings-events"
            className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
          >
            <span>Browse Complete Directory</span>
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        {loadingPros ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPros.map((pro) => (
              <Link
                key={pro.id}
                href={`/professionals/${pro.id}`}
                className="card-editorial group flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                      {pro.businessType || 'Wedding Specialist'}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)]">
                      <Star size={13} className="fill-[var(--accent)] text-[var(--accent)]" />
                      <span>{pro.rating ? pro.rating.toFixed(1) : '5.0'}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">({pro.reviewCount || 0})</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {pro.brandName}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mb-3 flex items-center gap-1">
                    <MapPin size={12} strokeWidth={1.75} />
                    <span>{pro.location}</span>
                  </p>

                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-4">
                    {pro.about}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">Starting Rate</span>
                    <span className="font-semibold text-[var(--text-primary)]">{pro.startingPrice}</span>
                  </div>
                  <span className="text-xs font-semibold text-[var(--accent)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    Profile →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* =====================================================================
          4. HOW IT WORKS (3 NUMBERED STEPS — EDITORIAL TYPOGRAPHY)
          ===================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border)]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="brand-pill mb-3">The Protocol</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-4">
            How Saathi <span className="font-signature font-normal text-[var(--accent)]">Works</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-[1.68]">
            Direct connections between milestone hosts and vetted creative masters. Three clear steps with zero platform markups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="font-heading font-semibold text-5xl md:text-6xl text-[var(--accent)]/30 mb-6 tracking-tight">
                01
              </div>
              <h3 className="font-heading font-semibold text-xl text-[var(--text-primary)] mb-3">
                Discover & Filter
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-[1.68]">
                Explore verified specialist verticals across wedding planning, cinematography, Sufi ensembles, and fine dining with verified portfolios and transparent pricing models.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Curated Roster
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="font-heading font-semibold text-5xl md:text-6xl text-[var(--accent)]/30 mb-6 tracking-tight">
                02
              </div>
              <h3 className="font-heading font-semibold text-xl text-[var(--text-primary)] mb-3">
                Direct Enquiry & Proposals
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-[1.68]">
                Send your milestone timeline, guest count, and creative vision directly to the professional. Receive tailored proposals without middleman delays or undisclosed markups.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Zero Platform Commission
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="font-heading font-semibold text-5xl md:text-6xl text-[var(--accent)]/30 mb-6 tracking-tight">
                03
              </div>
              <h3 className="font-heading font-semibold text-xl text-[var(--text-primary)] mb-3">
                Milestone Execution
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-[1.68]">
                Collaborate with verified contracts, guaranteed backstage coordination, punctual arrival protocols, and complete peace of mind on your grandest celebration day.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Guaranteed Reliability
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. NEW: REVIEWS SECTION (INITIALS AVATARS, STAR POP, DPDP FORM)
          ===================================================================== */}
      <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="brand-pill mb-3">Verified Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
              Celebrated by <span className="font-signature font-normal text-[var(--accent)]">Couples & Hosts</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-2 leading-[1.68]">
              Genuine reviews from families and milestone hosts across India.
            </p>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-5 py-2.5 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-xs font-semibold active:scale-[0.97] transition-all inline-flex items-center gap-2 self-start md:self-end"
          >
            <Plus size={15} />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Reviews Layout: Mobile Scroll-Snap Carousel, Desktop 3-Column Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 md:grid md:grid-cols-3 md:gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="snap-start flex-shrink-0 w-[85vw] sm:w-[350px] md:w-auto bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Star Rating with Scale-Pop Animation */}
                <div className="mb-4">
                  <StarRating rating={rev.rating} />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-[1.68] mb-6 font-normal">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Reviewer Footer: Auto-Generated Initials Avatar + Name + Relative Date */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold text-xs bg-[var(--accent-soft)] text-[var(--text-primary)] border border-[var(--border)] flex-shrink-0">
                    {getInitials(rev.authorName)}
                  </div>
                  <div>
                    <span className="font-heading font-semibold text-xs text-[var(--text-primary)] block">
                      {rev.authorName}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] block">
                      {rev.location}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--accent)] block">
                    {rev.eventType}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {rev.relativeDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          DPDP-COMPLIANT REVIEW SUBMISSION MODAL
          ===================================================================== */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--accent)]">
                  DPDP Compliant Feedback
                </span>
                <h3 className="font-heading font-semibold text-xl text-[var(--text-primary)]">
                  Submit a Verified Review
                </h3>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 rounded-full hover:bg-[var(--bg-base)] text-[var(--text-muted)] transition-colors"
                aria-label="Close review modal"
              >
                <X size={18} />
              </button>
            </div>

            {submittedReviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 size={42} className="mx-auto text-[var(--accent)]" />
                <h4 className="font-heading font-semibold text-lg text-[var(--text-primary)]">
                  Thank You for Your Feedback
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  Your review has been verified and added to the testimonials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                    Email Address (For Verification Only)
                  </label>
                  <input
                    type="email"
                    required
                    value={reviewForm.email}
                    onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                    placeholder="e.g. radhika@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating ?? reviewForm.rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="p-1 text-[var(--accent)] transition-transform hover:scale-110"
                        >
                          <Star
                            size={22}
                            className={
                              isFilled
                                ? 'fill-[var(--accent)] text-[var(--accent)]'
                                : 'text-[var(--border)] stroke-[var(--border)]'
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.reviewText}
                    onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                    placeholder="Share your experience with the wedding planning, music, catering or cinematography..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--soft-taupe)] focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-start gap-2 text-[11px] text-[var(--text-muted)] leading-relaxed">
                  <Lock size={14} className="flex-shrink-0 mt-0.5 text-[var(--accent)]" />
                  <span>
                    DPDP Act 2023 Compliant: We strictly collect your name and email to verify genuine service reviews. No demographic data or extraneous cookies are stored.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-xs font-semibold active:scale-[0.97] transition-all"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          6. EDITORIAL CALL-TO-ACTION PANEL (TOKEN COMPLIANT — NO SIZED SATURATION)
          ===================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] p-10 sm:p-16 text-center max-w-4xl mx-auto relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--text-primary)] mb-4 border border-[var(--border)]">
              Begin Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4">
              Ready to create your <span className="font-signature font-normal text-[var(--accent)]">milestone</span>?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto mb-8 leading-[1.68]">
              Explore India’s verified master planners, musicians, and culinary directors today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/categories/weddings-events"
                className="px-6 py-3 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-xs font-semibold active:scale-[0.97] transition-all inline-flex items-center gap-2"
              >
                <span>Browse All Categories</span>
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-semibold hover:border-[var(--accent)] active:scale-[0.97] transition-all inline-flex items-center gap-2"
              >
                <span>Concierge Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

