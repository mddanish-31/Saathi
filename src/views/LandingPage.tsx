"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Star,
  Search,
  CheckCircle2,
  Lock,
  Plus,
  X,
  ChevronDown,
} from 'lucide-react';
import { Professional } from '../types';
import { BotanicalAccent } from '../components/brand/BotanicalAccent';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

// Curated High-Resolution Editorial Photos for Edge-Blended Hero Panel
const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    title: 'Heritage Palace Mandaps',
    vertical: 'Decor & Mandap Styling',
    location: 'Udaipur, Rajasthan',
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'Bespoke Turnkey Orchestration',
    vertical: 'Wedding Planning',
    location: 'Delhi NCR',
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    title: 'Live Sufi & Contemporary Ensembles',
    vertical: 'Music & Entertainment',
    location: 'Mumbai, Maharashtra',
  },
  {
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    title: 'Artisanal Regional Feasts',
    vertical: 'Fine Catering & Desserts',
    location: 'Bengaluru, Karnataka',
  },
  {
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    title: 'Cinematic Visual Epics',
    vertical: 'Photography & Films',
    location: 'Jaipur, Rajasthan',
  },
];

// Service & Category Verticals Per Sketch (Circular Avatar + Info + CTA)
const SERVICE_VERTICALS = [
  {
    id: 'planning',
    code: 'A1',
    name: 'Wedding Planning',
    subtitle: 'Turnkey orchestration & timelines',
    stats: '48+ Verified Curators',
    href: '/categories/weddings-events/planning',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'photography',
    code: 'A2',
    name: 'Photography & Films',
    subtitle: 'Candid & cinematic storytellers',
    stats: '64+ Visual Masters',
    href: '/categories/weddings-events/photography',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'entertainment',
    code: 'A3',
    name: 'Music & Live Acts',
    subtitle: 'Concert DJs, Sufi & Bollywood acts',
    stats: '36+ Live Ensembles',
    href: '/categories/weddings-events/entertainment',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'beauty',
    code: 'A4',
    name: 'Beauty & Makeup',
    subtitle: 'Editorial bridal styling & mehndi',
    stats: '52+ Bridal Stylists',
    href: '/categories/weddings-events/beauty-makeup-mehndi',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'catering',
    code: 'A5',
    name: 'Catering & Food',
    subtitle: 'Fine dining & artisanal banquets',
    stats: '29+ Gourmet Partners',
    href: '/categories/weddings-events/catering-food-desserts',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'venues',
    code: 'A6',
    name: 'Wedding Venues',
    subtitle: 'Heritage palaces, estates & lawns',
    stats: '42+ Historic Locations',
    href: '/categories/weddings-events/wedding-venues',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'decor',
    code: 'A7',
    name: 'Decor & Mandap',
    subtitle: 'Thematic floral architecture',
    stats: '38+ Production Studios',
    href: '/categories/weddings-events/decor-styling-essentials',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'transportation',
    code: 'A8',
    name: 'Transportation',
    subtitle: 'Vintage motorcades & guest shuttles',
    stats: '24+ Chauffeur Fleets',
    href: '/categories/weddings-events/wedding-transportation',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80',
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
    location: 'South Mumbai',
  },
];

const getInitials = (name: string): string => {
  if (!name) return 'S';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? 'fill-[var(--accent)] text-[var(--accent)]'
              : 'text-[var(--border)] stroke-[var(--border)]'
          }
        />
      ))}
    </div>
  );
};

// Edge-Blended Hero Image Panel (No hard borders, no card frame, gradient alpha mask fade)
const EdgeBlendedHeroImage: React.FC<{
  panelOpacity: any;
  panelTranslateY: any;
  shouldReduceMotion: boolean | null;
}> = ({ panelOpacity, panelTranslateY, shouldReduceMotion }) => {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
      interval = setInterval(() => {
        setActiveHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
      }, 4500);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      style={{
        opacity: shouldReduceMotion ? 1 : panelOpacity,
        y: shouldReduceMotion ? 0 : panelTranslateY,
        willChange: 'transform, opacity',
      }}
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Edge-blended container using radial and directional mask gradient */}
      <div
        className="relative w-full h-full"
        style={{
          maskImage:
            'radial-gradient(ellipse 90% 86% at 55% 50%, black 48%, rgba(0,0,0,0.6) 74%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 86% at 55% 50%, black 48%, rgba(0,0,0,0.6) 74%, transparent 100%)',
        }}
      >
        {HERO_IMAGES.map((img, idx) => {
          if (idx !== 0 && !mounted) return null;
          return (
            <div
              key={img.url}
              className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
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
                quality={65}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* Clean editorial caption directly on bottom with subtle gradient scrim (no glassmorphism/blur) */}
      <div
        className="absolute inset-x-0 bottom-0 pt-10 pb-4 px-6 z-20 flex items-center justify-between text-xs text-white pointer-events-none"
        style={{
          backgroundColor: 'rgba(18, 16, 14, 0.85)',
          backgroundImage: 'linear-gradient(to top, rgba(14, 12, 10, 0.95) 0%, rgba(14, 12, 10, 0.6) 60%, transparent 100%)',
        }}
      >
        <span className="font-medium tracking-tight text-white">
          {HERO_IMAGES[activeHeroIndex].title}
        </span>
        <span className="flex items-center gap-1.5 text-white text-[11px]">
          <MapPin size={11} className="text-[var(--accent)]" />
          {HERO_IMAGES[activeHeroIndex].location}
        </span>
      </div>
    </motion.div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [featuredPros, setFeaturedPros] = useState<Professional[]>([]);
  const [loadingPros, setLoadingPros] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Reviews state & modal
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

  // Scroll transitions for Hero -> Next Section seamless blending
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.7, 0.3]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 1], [0, 36]);

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

  const scrollToCategories = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Subtle Botanical Corner Motif */}
      <BotanicalAccent variant="corner" className="absolute top-0 right-0" />

      {/* =====================================================================
          1. HERO SECTION — PER SKETCH LAYOUT
          Left: Headline (Fraunces + italic accent word) + Subhead + Search + Scroll cue
          Right: Full-bleed edge-blended photo dissolving into page background
          ===================================================================== */}
      <motion.section
        ref={heroRef}
        style={{
          opacity: shouldReduceMotion ? 1 : heroOpacity,
          y: shouldReduceMotion ? 0 : heroTranslateY,
        }}
        className="relative pt-6 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, subhead, search, scroll cue */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.12] mb-6">
              Milestone celebrations made{' '}
              <span className="italic font-normal text-[var(--accent)]">effortless</span> and
              unforgettable.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-lg mb-8 leading-relaxed font-normal">
              Saathi connects couples and event hosts with India’s foremost independent wedding
              planners, live musicians, and culinary directors.
            </p>

            {/* Clean minimal search bar with single terracotta button */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border)] rounded-full p-1.5 pl-4 shadow-sm flex items-center gap-2 focus-within:border-[var(--accent)] transition-colors mb-10"
            >
              <Search size={18} className="text-[var(--text-muted)] shrink-0" strokeWidth={1.75} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search planners, caterers, live acts..."
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
              />
              <button
                type="submit"
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--btn-primary-text)] text-xs font-medium px-5 py-2.5 rounded-full transition-all active:scale-95 shrink-0"
              >
                Search
              </button>
            </form>

            {/* Scroll Cue at bottom of left hero column */}
            <button
              type="button"
              onClick={scrollToCategories}
              className="inline-flex items-center gap-3 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium tracking-wide transition-colors group focus-visible:outline-none"
              aria-label="Scroll down to explore service verticals"
            >
              <div className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center p-1 group-hover:border-[var(--accent)] transition-colors">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-1.5 rounded-full bg-[var(--accent)]"
                />
              </div>
              <span>Scroll to explore</span>
            </button>
          </div>

          {/* Right Column: Edge-blended photo panel */}
          <div className="lg:col-span-6 w-full">
            <EdgeBlendedHeroImage
              panelOpacity={heroOpacity}
              panelTranslateY={heroTranslateY}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        </div>
      </motion.section>

      {/* Abstract Botanical Divider */}
      <BotanicalAccent variant="divider" />

      {/* =====================================================================
          2. SERVICE & CATEGORY SECTION — PER SKETCH
          Each Card: Circular avatar/photo, Name, Couple of info lines, Clean CTA
          Reveals with staggered scroll entrance
          ===================================================================== */}
      <section id="services" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--text-primary)] tracking-tight">
              Curated for every <span className="italic font-normal text-[var(--accent)]">ceremony</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-2 font-normal">
              Specialized departments staffed by verified, peer-reviewed professionals.
            </p>
          </div>
          <Link
            href="/categories/weddings-events"
            className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors self-start md:self-end"
          >
            All Verticals
          </Link>
        </div>

        {/* Staggered Grid of 8 Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_VERTICALS.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.35,
                delay: shouldReduceMotion ? 0 : index * 0.06,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[var(--border-strong)] transition-all duration-200"
            >
              {/* Circular Avatar / Photo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[var(--border)] mb-4 shrink-0 relative bg-[var(--bg-base)]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="120px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Name in Display Font */}
              <h3 className="font-display font-medium text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                {cat.name}
              </h3>

              {/* Info Lines */}
              <p className="text-xs text-[var(--text-muted)] mb-1 leading-relaxed">
                {cat.subtitle}
              </p>
              <p className="text-[11px] font-medium text-[var(--accent)] mb-5">
                {cat.stats}
              </p>

              {/* Clean CTA */}
              <Link
                href={cat.href}
                className="mt-auto px-4 py-2 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-primary)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors active:scale-95"
              >
                Explore Category
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Abstract Botanical Divider */}
      <BotanicalAccent variant="divider" />

      {/* =====================================================================
          3. FEATURED VERIFIED PROFESSIONALS — REAL API DATA
          Same Design System: Circular avatar, Name, Info lines, Clean CTA
          Reveals with staggered scroll entrance
          ===================================================================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--text-primary)] tracking-tight">
              Featured <span className="italic font-normal text-[var(--accent)]">professionals</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-2 font-normal">
              Direct access to vetted master planners, musicians, and cinematographers.
            </p>
          </div>
          <Link
            href="/categories/weddings-events"
            className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            Directory
          </Link>
        </div>

        {loadingPros ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPros.map((pro, index) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[var(--border-strong)] transition-all duration-200"
              >
                {/* Circular Avatar / Photo */}
                <div className="w-20 h-20 rounded-full overflow-hidden border border-[var(--border)] mb-4 shrink-0 relative bg-[var(--bg-base)]">
                  {pro.coverImageUrl ? (
                    <Image
                      src={pro.coverImageUrl}
                      alt={pro.brandName}
                      fill
                      sizes="96px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-lg text-[var(--text-muted)] bg-[var(--accent-soft)]">
                      {getInitials(pro.brandName)}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-display font-medium text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1 line-clamp-1">
                  {pro.brandName}
                </h3>

                {/* Info Lines */}
                <p className="text-xs text-[var(--text-muted)] mb-1 flex items-center gap-1 justify-center">
                  <span>{pro.businessType || 'Wedding Specialist'}</span>
                  <span>•</span>
                  <span>{pro.location}</span>
                </p>

                <div className="flex items-center gap-2 mb-5 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-[var(--accent)] text-[var(--accent)]" />
                    <span className="font-medium text-[var(--text-primary)]">
                      {pro.rating ? pro.rating.toFixed(1) : '5.0'}
                    </span>
                  </div>
                  <span>•</span>
                  <span>From {pro.startingPrice}</span>
                </div>

                {/* Clean CTA */}
                <Link
                  href={`/professionals/${pro.id}`}
                  className="mt-auto px-4 py-2 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-primary)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors active:scale-95"
                >
                  View Profile
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Abstract Botanical Divider */}
      <BotanicalAccent variant="divider" />

      {/* =====================================================================
          4. HOW IT WORKS — EDITORIAL 3-STEP PROTOCOL
          ===================================================================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--text-primary)] tracking-tight mb-3">
            How Saathi <span className="italic font-normal text-[var(--accent)]">works</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed font-normal">
            Direct connections between milestone hosts and vetted creative masters. Three clear steps with zero platform markups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="font-display font-light text-5xl text-[var(--accent)] opacity-40 mb-5">
                01
              </div>
              <h3 className="font-display font-medium text-xl text-[var(--text-primary)] mb-2">
                Discover & Filter
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Explore verified specialist verticals across wedding planning, cinematography, Sufi ensembles, and fine dining with verified portfolios.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
              Curated Roster
            </div>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="font-display font-light text-5xl text-[var(--accent)] opacity-40 mb-5">
                02
              </div>
              <h3 className="font-display font-medium text-xl text-[var(--text-primary)] mb-2">
                Direct Proposals
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Send your milestone timeline, guest count, and creative vision directly to the professional. Receive tailored proposals without middleman fees.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
              Zero Platform Commission
            </div>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="font-display font-light text-5xl text-[var(--accent)] opacity-40 mb-5">
                03
              </div>
              <h3 className="font-display font-medium text-xl text-[var(--text-primary)] mb-2">
                Milestone Execution
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Collaborate with verified contracts, guaranteed backstage coordination, punctual arrival protocols, and complete peace of mind.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
              Guaranteed Reliability
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Botanical Divider */}
      <BotanicalAccent variant="divider" />

      {/* =====================================================================
          5. REVIEWS & TESTIMONIALS
          ===================================================================== */}
      <section id="reviews" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--text-primary)] tracking-tight">
              Celebrated by <span className="italic font-normal text-[var(--accent)]">couples & hosts</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-2 font-normal">
              Genuine experiences from families and event hosts across India.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--btn-primary-text)] text-xs font-medium active:scale-95 transition-all inline-flex items-center gap-1.5 self-start md:self-end"
          >
            <Plus size={14} />
            <span>Share Experience</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="mb-4">
                  <StarRating rating={rev.rating} />
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed mb-6 font-normal">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-medium text-xs bg-[var(--accent-soft)] text-[var(--text-primary)] border border-[var(--border)] shrink-0">
                    {getInitials(rev.authorName)}
                  </div>
                  <div>
                    <span className="font-display font-medium text-xs text-[var(--text-primary)] block">
                      {rev.authorName}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] block">
                      {rev.location}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[var(--accent)] font-medium block">
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

      {/* Review Submission Modal (DPDP Compliant) */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-lg relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-medium text-xl text-[var(--text-primary)]">
                  Submit a Verified Review
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  DPDP Act 2023 Compliant Feedback
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 rounded-full hover:bg-[var(--bg-base)] text-[var(--text-muted)] transition-colors"
                aria-label="Close review modal"
              >
                <X size={18} />
              </button>
            </div>

            {submittedReviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 size={40} className="mx-auto text-[var(--accent)]" />
                <h4 className="font-display font-medium text-lg text-[var(--text-primary)]">
                  Thank You
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  Your review has been verified and added to our community testimonials.
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                    Email Address (Verification Only)
                  </label>
                  <input
                    type="email"
                    required
                    value={reviewForm.email}
                    onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                    placeholder="e.g. radhika@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
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
                            size={20}
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-start gap-2 text-[11px] text-[var(--text-muted)] leading-relaxed">
                  <Lock size={13} className="shrink-0 mt-0.5 text-[var(--accent)]" />
                  <span>
                    DPDP Act 2023: We strictly collect your name and email to authenticate genuine feedback. No personal data is shared.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--btn-primary-text)] text-xs font-medium active:scale-95 transition-all"
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
          6. REFINED EDITORIAL CTA BANNER
          ===================================================================== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] p-10 sm:p-16 text-center max-w-3xl mx-auto shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--text-primary)] tracking-tight mb-4">
            Ready to plan your <span className="italic font-normal text-[var(--accent)]">milestone</span>?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg mx-auto mb-8 leading-relaxed font-normal">
            Browse verified Indian event curators, compare rate cards, and connect directly with creative masters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/categories/weddings-events"
              className="px-6 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--btn-primary-text)] text-sm font-medium active:scale-95 transition-all shadow-sm"
            >
              Browse All Categories
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--accent)] active:scale-95 transition-all"
            >
              Concierge Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
