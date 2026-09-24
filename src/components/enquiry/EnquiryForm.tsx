import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { Professional, EnquiryData, AuthUser, ServiceItem } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { ALL_SERVICES } from '../../data/professionalDirectory';

interface EnquiryFormProps {
  professional: Professional;
  currentUser: AuthUser | null;
  initialServiceSlug?: string;
  onSubmitEnquiry: (enquiryData: Omit<EnquiryData, 'id' | 'createdAt' | 'status'>) => void;
  className?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  professional,
  currentUser,
  initialServiceSlug,
  onSubmitEnquiry,
  className = '',
}) => {
  const matchedServices = ALL_SERVICES.filter((srv: ServiceItem) =>
    professional.servicesOffered.includes(srv.slug)
  );

  const defaultService =
    matchedServices.find((s: ServiceItem) => s.slug === initialServiceSlug) || matchedServices[0] || ALL_SERVICES[0];

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [serviceId, setServiceId] = useState(defaultService.slug);
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState(professional.location.split('&')[0].trim());
  const [budgetRange, setBudgetRange] = useState('₹5L - ₹10L');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide your contact phone number.');
      return;
    }
    if (!eventDate) {
      setError('Please select an approximate or confirmed event date.');
      return;
    }
    if (!location.trim()) {
      setError('Please specify the destination city/location.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const selectedServiceObj = matchedServices.find((s: ServiceItem) => s.slug === serviceId) || defaultService;

    const newEnquiryPayload: Omit<EnquiryData, 'id' | 'createdAt' | 'status'> = {
      professionalId: professional.id,
      professionalName: professional.name,
      professionalBrand: professional.brandName,
      professionalAvatar: professional.avatarUrl,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceId,
      serviceName: selectedServiceObj.title,
      eventDate,
      eventLocation: location,
      budgetRange,
      message: message.trim() || 'Interested in availability and quotation for our celebration.',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitEnquiry(newEnquiryPayload);
    }, 400);
  };

  return (
    <div
      className={`saathi-enquiry-form-card ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      {/* Specialist Micro Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-surface-soft)',
          border: '1px solid var(--border-subtle)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <Avatar src={professional.avatarUrl} name={professional.name} size="md" />
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
            Enquiring with Specialist:
          </span>
          <strong style={{ fontSize: 'var(--text-base)', color: 'var(--text-headings)', fontFamily: 'var(--font-serif)' }}>
            {professional.brandName}
          </strong>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'block' }}>
            {professional.location} • From {professional.startingPrice}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            color: 'var(--text-headings)',
            marginBottom: 'var(--space-1)',
          }}
        >
          Event Enquiry & Quote Request
        </h2>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          Directly reach {professional.name} for dates, pricing, and custom packages.
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(229, 62, 62, 0.1)',
            border: '1px solid rgba(229, 62, 62, 0.3)',
            color: '#C53030',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            marginBottom: 'var(--space-4)',
          }}
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Name Input */}
        <Input
          label="Your Full Name"
          type="text"
          placeholder="e.g. Aanya Sharma"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User size={16} />}
          required
        />

        {/* Email & Phone */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          <Input
            label="Email Address"
            type="email"
            placeholder="aanya@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={16} />}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone size={16} />}
            required
          />
        </div>

        {/* Service Type Selection */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--text-headings)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Requested Service
          </label>
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {matchedServices.map((srv: ServiceItem) => (
              <option key={srv.slug} value={srv.slug}>
                {srv.title} ({srv.startingPrice})
              </option>
            ))}
          </select>
        </div>

        {/* Event Date & Location */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          <Input
            label="Tentative / Confirmed Event Date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            leftIcon={<Calendar size={16} />}
            required
          />

          <Input
            label="Celebration City / Venue"
            type="text"
            placeholder="e.g. Udaipur, Mumbai, Goa"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            leftIcon={<MapPin size={16} />}
            required
          />
        </div>

        {/* Budget Range */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--text-headings)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Estimated Planning & Event Budget
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <option value="Under ₹2 Lakhs">Under ₹2 Lakhs</option>
            <option value="₹2L - ₹5 Lakhs">₹2L - ₹5 Lakhs</option>
            <option value="₹5L - ₹10 Lakhs">₹5L - ₹10 Lakhs</option>
            <option value="₹10L - ₹25 Lakhs">₹10L - ₹25 Lakhs</option>
            <option value="₹25 Lakhs+">₹25 Lakhs & Above</option>
          </select>
        </div>

        {/* Requirements / Custom Note */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--text-headings)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Celebration Details & Specific Requirements
          </label>
          <textarea
            rows={4}
            placeholder="Tell the specialist about guest count, celebration ceremonies (Sangeet, Mehendi, Reception), theme vision, or specific logistics needs..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: 'var(--space-2)' }}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            rightIcon={<ArrowRight size={18} />}
          >
            Submit Enquiry to {professional.name.split(' ')[0]}
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginTop: 'var(--space-1)',
          }}
        >
          <ShieldCheck size={13} style={{ color: 'var(--saathi-maroon)' }} />
          <span>Your privacy is safeguarded. No promotional calls or spam.</span>
        </div>
      </form>
    </div>
  );
};
