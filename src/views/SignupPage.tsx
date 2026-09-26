"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, Lock, ArrowRight, UserCheck, Briefcase } from 'lucide-react';
import { Logo } from '../components/brand/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Container } from '../components/ui/Container';
import { useAuth } from '../context/AuthContext';

interface SignupPageProps {
  onNavigate: (path: string) => void;
  returnTo?: string;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, returnTo: propReturnTo }) => {
  const { signup } = useAuth();
  const [role, setRole] = useState<'customer' | 'professional'>('customer');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const returnTo =
    propReturnTo ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('returnTo') || undefined
      : undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (role === 'professional' && !businessName.trim()) {
      setError('Please enter your business or studio brand name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (!password) {
      setError('Please create a password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms & Conditions to continue.');
      return;
    }

    setError(null);

    const res = await signup({
      name,
      email,
      phone,
      role,
      businessName: role === 'professional' ? businessName : undefined,
      password,
    });

    if (res && res.error) {
      setError(res.error);
      return;
    }

    if (role === 'professional') {
      onNavigate('/professional/dashboard');
    } else if (returnTo) {
      onNavigate(returnTo);
    } else {
      onNavigate('/customer/dashboard');
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 180px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) 0',
      }}
    >
      <Container narrow>
        <div
          className="animate-slide-up"
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: 'clamp(var(--space-6), 5vw, var(--space-10))',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: 'var(--space-6)',
            }}
          >
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <Logo variant="full" layout="stacked" size="lg" showTagline={true} onClick={() => onNavigate('/')} />
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-3xl)',
                color: 'var(--text-headings)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Create your account
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              Join the trusted network for weddings, occasions, and lifestyle services
            </p>
          </div>

          {/* Role Selection Segmented Control */}
          <div
            style={{
              display: 'flex',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <button
              type="button"
              onClick={() => setRole('customer')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0.55rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: role === 'customer' ? 'var(--bg-surface)' : 'transparent',
                color: role === 'customer' ? 'var(--saathi-maroon)' : 'var(--text-secondary)',
                boxShadow: role === 'customer' ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)',
              }}
            >
              <UserCheck size={15} />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('professional')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0.55rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: role === 'professional' ? 'var(--bg-surface)' : 'transparent',
                color: role === 'professional' ? 'var(--saathi-maroon)' : 'var(--text-secondary)',
                boxShadow: role === 'professional' ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Briefcase size={15} />
              <span>Professional</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
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
                }}
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Aanya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User size={16} />}
              required
            />

            {/* Business Name if Professional */}
            {role === 'professional' && (
              <Input
                label="Brand / Studio Name"
                type="text"
                placeholder="e.g. Sharma Luxury Celebrations"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                leftIcon={<Briefcase size={16} />}
                required
              />
            )}

            {/* Email & Phone Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
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

            {/* Passwords Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              <Input
                label="Password"
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={16} />}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock size={16} />}
                required
              />
            </div>

            {/* Terms Agreement Checkbox */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginTop: 'var(--space-1)',
              }}
            >
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  marginTop: '3px',
                  accentColor: 'var(--saathi-maroon)',
                  cursor: 'pointer',
                }}
              />
              <label
                htmlFor="terms-checkbox"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                }}
              >
                I agree to the Terms of Service, Privacy Policy, and Vendor Integrity Standards.
              </label>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: 'var(--space-2)' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight size={18} />}
              >
                {role === 'professional' ? 'Complete Professional Registration' : 'Complete Customer Registration'}
              </Button>
            </div>
          </form>

          {/* Footer Link to Login */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              textAlign: 'center',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 'var(--space-5)',
            }}
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate(returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : '/login')}
                style={{
                  fontWeight: 600,
                  color: 'var(--saathi-maroon)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
