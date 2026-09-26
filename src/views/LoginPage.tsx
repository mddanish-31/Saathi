"use client";

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, Briefcase } from 'lucide-react';
import { Logo } from '../components/brand/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Container } from '../components/ui/Container';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  returnTo?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, returnTo: propReturnTo }) => {
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('customer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Extract returnTo from prop or window URL params
  const returnTo =
    propReturnTo ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('returnTo') || undefined
      : undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your email or phone number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError(null);
    const res = await login(identifier, password, role);
    if (res && res.error) {
      setError(res.error);
      return;
    }

    if (returnTo) {
      onNavigate(returnTo);
    } else if (role === 'professional') {
      onNavigate('/professional/dashboard');
    } else {
      onNavigate('/customer/dashboard');
    }
  };

  const handleGoogleLogin = () => {
    if (role === 'professional') {
      login('demo.pro@saathi.in', 'professional', 'Singhal Studios');
      if (returnTo) {
        onNavigate(returnTo);
      } else {
        onNavigate('/professional/dashboard');
      }
    } else {
      login('demo.customer@saathi.in', 'customer', 'Aanya Sharma');
      if (returnTo) {
        onNavigate(returnTo);
      } else {
        onNavigate('/customer/dashboard');
      }
    }
  };

  const isCustomer = role === 'customer';

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
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
            maxWidth: '460px',
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
            <div style={{ marginBottom: 'var(--space-4)' }}>
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
              Welcome back
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '380px' }}>
              {isCustomer
                ? 'Sign in to manage your enquiries, bookings, saved professionals and profile.'
                : 'Sign in to manage your profile, services, enquiries, bookings and clients.'}
            </p>
          </div>

          {/* Role Selection Segmented Control */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: 'var(--space-2)',
                textAlign: 'center',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              Choose how you want to continue
            </div>
            <div
              style={{
                display: 'flex',
                padding: '4px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-soft)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setRole('customer');
                  setError(null);
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: isCustomer ? 'var(--bg-surface)' : 'transparent',
                  color: isCustomer ? 'var(--saathi-maroon)' : 'var(--text-secondary)',
                  boxShadow: isCustomer ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <UserCheck size={16} />
                <span>Customer</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('professional');
                  setError(null);
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: !isCustomer ? 'var(--bg-surface)' : 'transparent',
                  color: !isCustomer ? 'var(--saathi-maroon)' : 'var(--text-secondary)',
                  boxShadow: !isCustomer ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Briefcase size={16} />
                <span>Professional</span>
              </button>
            </div>
          </div>

          {returnTo && (
            <div
              style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--saathi-nude-tint)',
                border: '1px solid var(--border-subtle)',
                marginBottom: 'var(--space-5)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 'var(--text-xs)',
                color: 'var(--saathi-maroon)',
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={16} />
              <span>We saved your intended destination!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
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

            {/* Email / Phone Field */}
            <Input
              label="Email or Phone Number"
              type="text"
              placeholder={isCustomer ? 'name@example.com or +91...' : 'studio@brand.com or +91...'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              leftIcon={<Mail size={16} />}
              required
            />

            {/* Password Field */}
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={16} />}
                required
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 'var(--space-2)',
                }}
              >
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions will be sent to your registered contact.')}
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    color: 'var(--saathi-maroon)',
                    cursor: 'pointer',
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight size={18} />}
            >
              Sign In
            </Button>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                margin: 'var(--space-1) 0',
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                OR
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            </div>

            {/* Google Social Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1.5px solid var(--border-default)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Footer Link to Signup */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              textAlign: 'center',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 'var(--space-5)',
            }}
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  const targetSignup = `/signup?role=${role}${returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : ''}`;
                  onNavigate(targetSignup);
                }}
                style={{
                  fontWeight: 600,
                  color: 'var(--saathi-maroon)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {isCustomer ? 'Create Customer Account' : 'Create Professional Account'}
              </button>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
