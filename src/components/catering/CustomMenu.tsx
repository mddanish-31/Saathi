import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Check,
  Send,
  Sliders,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

export interface CustomMenuState {
  eventType: string;
  guestCount: number;
  dietPreference: 'pure-veg' | 'veg-non-veg' | 'jain-friendly';
  cuisines: string[];
  coursePreferences: {
    startersCount: number;
    mainCount: number;
    biryaniBread: boolean;
    saladsSides: boolean;
  };
  dessertStyle: string;
  beveragePreference: string;
  specialRequirements: string[];
  specialNotes: string;
}

interface CustomMenuProps {
  initialEventType?: string;
  initialGuestCount?: number;
  initialPackageTier?: string;
  onSubmitQuote: (summary: CustomMenuState & { estimatedPerPlate: number; estimatedTotal: number }) => void;
}

const EVENT_TYPE_OPTIONS = [
  'Wedding & Reception',
  'Sangeet & Cocktail Night',
  'Corporate Gala / Summit',
  'Birthday & Milestone Party',
  'Festive & Religious Gathering',
  'Intimate Private Dinner',
];

const CUISINE_OPTIONS = [
  'Royal Awadhi & Mughlai',
  'North Indian Tandoori',
  'Traditional South Indian',
  'Pan-Asian & Dim Sum',
  'Italian & Mediterranean',
  'Gujarati & Rajasthani Thali',
  'Coastal & Seafood',
];

const DESSERT_STYLE_OPTIONS = [
  'Royal Indian Mithai & Rabdi',
  'Artisanal French Patisserie',
  'Multi-Tier Custom Celebration Cake',
  'Live Fruit Kulfi & Gelato Cart',
  'Belgian Chocolate Fountain Table',
];

const BEVERAGE_OPTIONS = [
  'Botanical Mocktail Lounge',
  'Traditional Welcome Refreshments & Thandai',
  'Artisanal Specialty Coffee & Cold Brew Bar',
  'Fresh Tender Coconut & Juice Bar',
];

const SPECIAL_REQUIREMENT_OPTIONS = [
  'Live Charcoal Tandoor on Site',
  'Live Street-Food Chaat Bazar',
  'Dedicated Pure-Veg / Jain Kitchen Preparation',
  'Uniformed Silver VIP Table Service',
  'Eco-Friendly Biodegradable Tableware',
  'Pre-Event Tasting Session for Family',
];

export const CustomMenu: React.FC<CustomMenuProps> = ({
  initialEventType = EVENT_TYPE_OPTIONS[0],
  initialGuestCount = 150,
  onSubmitQuote,
}) => {
  const [menuState, setMenuState] = useState<CustomMenuState>({
    eventType: initialEventType,
    guestCount: initialGuestCount,
    dietPreference: 'veg-non-veg',
    cuisines: ['Royal Awadhi & Mughlai', 'North Indian Tandoori'],
    coursePreferences: {
      startersCount: 4,
      mainCount: 4,
      biryaniBread: true,
      saladsSides: true,
    },
    dessertStyle: DESSERT_STYLE_OPTIONS[0],
    beveragePreference: BEVERAGE_OPTIONS[0],
    specialRequirements: ['Live Charcoal Tandoor on Site'],
    specialNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Toggle Cuisine
  const handleToggleCuisine = (c: string) => {
    setMenuState((prev) => {
      const exists = prev.cuisines.includes(c);
      if (exists && prev.cuisines.length === 1) return prev; // keep at least 1
      const updated = exists
        ? prev.cuisines.filter((item) => item !== c)
        : [...prev.cuisines, c];
      return { ...prev, cuisines: updated };
    });
  };

  // Toggle Special Requirement
  const handleToggleRequirement = (req: string) => {
    setMenuState((prev) => {
      const exists = prev.specialRequirements.includes(req);
      const updated = exists
        ? prev.specialRequirements.filter((item) => item !== req)
        : [...prev.specialRequirements, req];
      return { ...prev, specialRequirements: updated };
    });
  };

  // Reset to default
  const handleReset = () => {
    setMenuState({
      eventType: EVENT_TYPE_OPTIONS[0],
      guestCount: 150,
      dietPreference: 'veg-non-veg',
      cuisines: ['Royal Awadhi & Mughlai', 'North Indian Tandoori'],
      coursePreferences: {
        startersCount: 4,
        mainCount: 4,
        biryaniBread: true,
        saladsSides: true,
      },
      dessertStyle: DESSERT_STYLE_OPTIONS[0],
      beveragePreference: BEVERAGE_OPTIONS[0],
      specialRequirements: ['Live Charcoal Tandoor on Site'],
      specialNotes: '',
    });
    setIsSubmitted(false);
  };

  // Dynamic estimate calculation (frontend/mock algorithm)
  const calculation = useMemo(() => {
    let base = 950;

    // Diet modifier
    if (menuState.dietPreference === 'veg-non-veg') base += 250;
    if (menuState.dietPreference === 'jain-friendly') base += 100;

    // Cuisines modifier
    base += (menuState.cuisines.length - 1) * 120;

    // Courses
    base += (menuState.coursePreferences.startersCount - 2) * 60;
    base += (menuState.coursePreferences.mainCount - 2) * 70;

    // Special Requirements
    base += menuState.specialRequirements.length * 90;

    const perPlate = Math.max(850, base);
    const total = perPlate * menuState.guestCount;

    return { perPlate, total };
  }, [menuState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmitQuote({
      ...menuState,
      estimatedPerPlate: calculation.perPlate,
      estimatedTotal: calculation.total,
    });
  };

  return (
    <section
      id="custom-menu-configurator"
      className="saathi-custom-menu"
      style={{
        padding: 'clamp(var(--space-12), 6vw, var(--space-20)) 0',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Custom Configurator"
          title="Design Your Custom Event Menu"
          subtitle="Select your event format, guest size, preferred regional cuisines, live counters, and service style. Get an instant transparent estimate and receive custom quotes."
        />

        {/* Configurator Grid: Form on Left, Real-Time Live Summary on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(var(--space-6), 4vw, var(--space-10))',
            alignItems: 'start',
          }}
        >
          {/* Left Form Column */}
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            {/* Step 1: Event Type Selection */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                1. Event Celebration Format
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 'var(--space-2)',
                }}
              >
                {EVENT_TYPE_OPTIONS.map((et) => {
                  const isSelected = menuState.eventType === et;
                  return (
                    <button
                      key={et}
                      type="button"
                      onClick={() => setMenuState((prev) => ({ ...prev, eventType: et }))}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        textAlign: 'left',
                        cursor: 'pointer',
                        border: '1px solid',
                        backgroundColor: isSelected ? 'var(--saathi-nude-tint)' : 'var(--bg-surface-soft)',
                        color: isSelected ? 'var(--saathi-maroon)' : 'var(--text-primary)',
                        borderColor: isSelected ? 'var(--saathi-maroon)' : 'var(--border-subtle)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {et}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Number of Guests */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <label
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-headings)',
                  }}
                >
                  2. Number of Guests
                </label>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    color: 'var(--saathi-maroon)',
                  }}
                >
                  {menuState.guestCount} Guests
                </span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min={25}
                max={1500}
                step={25}
                value={menuState.guestCount}
                onChange={(e) =>
                  setMenuState((prev) => ({ ...prev, guestCount: Number(e.target.value) }))
                }
                style={{
                  width: '100%',
                  accentColor: 'var(--saathi-maroon)',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-3)',
                }}
              />

              {/* Quick Guest Presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {[50, 100, 250, 500, 1000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMenuState((prev) => ({ ...prev, guestCount: preset }))}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      backgroundColor:
                        menuState.guestCount === preset
                          ? 'var(--saathi-maroon)'
                          : 'var(--bg-surface)',
                      color: menuState.guestCount === preset ? '#FFFFFF' : 'var(--text-secondary)',
                      borderColor:
                        menuState.guestCount === preset
                          ? 'var(--saathi-maroon)'
                          : 'var(--border-default)',
                    }}
                  >
                    {preset} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Dietary Preference */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                3. Dietary Preference
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
                {[
                  { id: 'pure-veg', label: '100% Pure Veg', dot: '#2E7D32' },
                  { id: 'veg-non-veg', label: 'Veg + Non-Veg', dot: '#C62828' },
                  { id: 'jain-friendly', label: 'Jain Friendly', dot: '#E65100' },
                ].map((diet) => {
                  const isSelected = menuState.dietPreference === diet.id;
                  return (
                    <button
                      key={diet.id}
                      type="button"
                      onClick={() =>
                        setMenuState((prev) => ({
                          ...prev,
                          dietPreference: diet.id as CustomMenuState['dietPreference'],
                        }))
                      }
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: '1px solid',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: isSelected ? 'var(--saathi-nude-tint)' : 'var(--bg-surface-soft)',
                        color: isSelected ? 'var(--saathi-maroon)' : 'var(--text-primary)',
                        borderColor: isSelected ? 'var(--saathi-maroon)' : 'var(--border-subtle)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: diet.dot,
                        }}
                      />
                      <span>{diet.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Cuisines Multi-Select */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                4. Select Preferred Cuisines
              </label>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {CUISINE_OPTIONS.map((c) => {
                  const isSelected = menuState.cuisines.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleToggleCuisine(c)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: '1px solid',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: isSelected ? 'var(--saathi-maroon)' : 'var(--bg-surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                        borderColor: isSelected ? 'var(--saathi-maroon)' : 'var(--border-default)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {isSelected && <Check size={12} />}
                      <span>{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Dessert & Beverage Preferences */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  5. Dessert Style
                </label>
                <select
                  value={menuState.dessertStyle}
                  onChange={(e) => setMenuState((prev) => ({ ...prev, dessertStyle: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  {DESSERT_STYLE_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-headings)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  6. Beverage Station
                </label>
                <select
                  value={menuState.beveragePreference}
                  onChange={(e) =>
                    setMenuState((prev) => ({ ...prev, beveragePreference: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    backgroundColor: 'var(--bg-surface-soft)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  {BEVERAGE_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 6: Special Requirements Multi-Select */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                7. Live Stations & Special Requirements
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>
                {SPECIAL_REQUIREMENT_OPTIONS.map((req) => {
                  const isChecked = menuState.specialRequirements.includes(req);
                  return (
                    <button
                      key={req}
                      type="button"
                      onClick={() => handleToggleRequirement(req)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-xs)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        border: '1px solid',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: isChecked ? 'var(--saathi-nude-tint)' : 'var(--bg-surface-soft)',
                        color: isChecked ? 'var(--saathi-maroon)' : 'var(--text-primary)',
                        borderColor: isChecked ? 'var(--saathi-maroon)' : 'var(--border-subtle)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '3px',
                          border: isChecked ? '1px solid var(--saathi-maroon)' : '1px solid var(--border-default)',
                          backgroundColor: isChecked ? 'var(--saathi-maroon)' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      >
                        {isChecked && <Check size={10} />}
                      </div>
                      <span>{req}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 7: Custom Notes */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-headings)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                8. Additional Requests & Dietary Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="E.g., 20 Jain guests, need special gluten-free dessert option, wedding theme is vintage pastel..."
                value={menuState.specialNotes}
                onChange={(e) => setMenuState((prev) => ({ ...prev, specialNotes: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Form Action Button */}
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Button
                id="custom-menu-create-btn"
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<Send size={16} />}
              >
                Create Custom Menu
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
                title="Reset selections"
                leftIcon={<RotateCcw size={15} />}
              >
                Reset
              </Button>
            </div>
          </form>

          {/* Right Column: Real-Time Dynamic Summary Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-2xl)',
              border: '2px solid var(--saathi-nude)',
              boxShadow: 'var(--shadow-lg)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
              position: 'sticky',
              top: '100px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 'var(--space-4)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--saathi-nude-tint)',
                    color: 'var(--saathi-maroon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sliders size={16} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                  }}
                >
                  Custom Menu Summary
                </h3>
              </div>

              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--saathi-maroon)',
                  backgroundColor: 'var(--saathi-nude-tint)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Live Estimate
              </span>
            </div>

            {/* Calculated Estimated Rates */}
            <div
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface-soft)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Estimated Rate
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--saathi-maroon)',
                    lineHeight: 1.1,
                  }}
                >
                  ₹{calculation.perPlate.toLocaleString('en-IN')}
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>
                    / plate
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Total Approx. ({menuState.guestCount} guests)
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--text-headings)',
                  }}
                >
                  ₹{calculation.total.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Structured Itemized Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-xs)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Event Format:</span>
                <strong style={{ color: 'var(--text-headings)' }}>{menuState.eventType}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Guest Count:</span>
                <strong style={{ color: 'var(--text-headings)' }}>{menuState.guestCount} Guests</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Dietary Preference:</span>
                <strong style={{ color: 'var(--text-headings)', textTransform: 'capitalize' }}>
                  {menuState.dietPreference.replace('-', ' ')}
                </strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Selected Cuisines ({menuState.cuisines.length}):</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {menuState.cuisines.join(', ')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Dessert Style:</span>
                <span style={{ color: 'var(--text-headings)', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>
                  {menuState.dessertStyle}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Beverage Station:</span>
                <span style={{ color: 'var(--text-headings)', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>
                  {menuState.beveragePreference}
                </span>
              </div>

              {menuState.specialRequirements.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Live Stations & Add-ons:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {menuState.specialRequirements.map((r, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.6875rem',
                          backgroundColor: 'var(--bg-surface-soft)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submission Feedback or Confidence Notice */}
            {isSubmitted ? (
              <div
                style={{
                  backgroundColor: '#E8F5E9',
                  border: '1px solid #A5D6A7',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#1B5E20',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={16} />
                <span>Custom menu configured! Scroll to browse matching caterers below.</span>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}
              >
                <Sparkles size={12} style={{ color: 'var(--saathi-maroon)' }} />
                <span>Instant estimate. All caterers provide detailed itemized contracts.</span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
