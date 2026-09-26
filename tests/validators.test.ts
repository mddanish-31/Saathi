import { describe, it, expect } from 'vitest';
import {
  signupSchema,
  loginSchema,
  createEnquirySchema,
  updateEnquiryStatusSchema,
  queryProfessionalsSchema,
  createReviewSchema,
  portfolioItemSchema,
} from '../src/lib/validators';
import { sanitizeText } from '../src/lib/sanitize';
import { checkRateLimit } from '../src/lib/rate-limiter';

describe('Zod Validation Schemas', () => {
  describe('signupSchema', () => {
    it('accepts valid customer signup', () => {
      const valid = {
        name: 'Aanya Sharma',
        email: 'aanya@example.com',
        phone: '+91 98201 12345',
        role: 'customer',
        password: 'SecurePassword123!',
      };
      const res = signupSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('accepts valid professional signup with business name', () => {
      const valid = {
        name: 'Kavya Singhal',
        email: 'kavya@auraweddings.com',
        role: 'professional',
        businessName: 'Aura Bespoke Curators',
        password: 'StudioPassword123!',
      };
      const res = signupSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('rejects invalid email address', () => {
      const invalid = {
        name: 'Aanya',
        email: 'not-an-email',
        role: 'customer',
        password: 'Password123!',
      };
      const res = signupSchema.safeParse(invalid);
      expect(res.success).toBe(false);
    });

    it('rejects password shorter than 6 characters', () => {
      const invalid = {
        name: 'Aanya',
        email: 'aanya@example.com',
        role: 'customer',
        password: '123',
      };
      const res = signupSchema.safeParse(invalid);
      expect(res.success).toBe(false);
    });
  });

  describe('loginSchema', () => {
    it('validates correct email and password', () => {
      const res = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'mypassword',
      });
      expect(res.success).toBe(true);
    });

    it('rejects empty password', () => {
      const res = loginSchema.safeParse({
        email: 'test@example.com',
        password: '',
      });
      expect(res.success).toBe(false);
    });
  });

  describe('createEnquirySchema', () => {
    it('validates a complete, high-intent celebration enquiry', () => {
      const valid = {
        professionalId: 'pro-aura-weddings',
        serviceId: 'wedding-planning',
        serviceName: 'Full-Service Wedding Planning',
        customerName: 'Aanya Sharma',
        customerEmail: 'aanya@example.com',
        customerPhone: '+91 98201 54321',
        eventDate: '2026-12-15',
        eventLocation: 'Udaipur, Rajasthan',
        budgetRange: '₹15L - ₹25L',
        message: 'Looking for turnkey planning for 3-day royal palace celebration.',
      };
      const res = createEnquirySchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('rejects enquiry with message shorter than 5 characters', () => {
      const invalid = {
        professionalId: 'pro-aura-weddings',
        serviceName: 'Planning',
        customerName: 'Aanya',
        customerEmail: 'aanya@example.com',
        customerPhone: '+91 98201 54321',
        eventDate: '2026-12-15',
        eventLocation: 'Mumbai',
        message: 'Hi',
      };
      const res = createEnquirySchema.safeParse(invalid);
      expect(res.success).toBe(false);
    });
  });

  describe('updateEnquiryStatusSchema', () => {
    it('accepts valid statuses', () => {
      expect(updateEnquiryStatusSchema.safeParse({ status: 'pending' }).success).toBe(true);
      expect(updateEnquiryStatusSchema.safeParse({ status: 'reviewed' }).success).toBe(true);
      expect(updateEnquiryStatusSchema.safeParse({ status: 'responded' }).success).toBe(true);
      expect(updateEnquiryStatusSchema.safeParse({ status: 'confirmed' }).success).toBe(true);
    });

    it('rejects unknown status string', () => {
      expect(updateEnquiryStatusSchema.safeParse({ status: 'cancelled' }).success).toBe(false);
      expect(updateEnquiryStatusSchema.safeParse({ status: 'archived' }).success).toBe(false);
    });
  });

  describe('queryProfessionalsSchema', () => {
    it('caps limit at 50 if higher number is requested', () => {
      const res = queryProfessionalsSchema.safeParse({ limit: '100' });
      expect(res.success).toBe(false); // Schema enforces max 50
    });

    it('accepts limit up to 50', () => {
      const res = queryProfessionalsSchema.safeParse({ limit: '50' });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.limit).toBe(50);
      }
    });

    it('defaults page to 1 and limit to 20', () => {
      const res = queryProfessionalsSchema.safeParse({});
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.page).toBe(1);
        expect(res.data.limit).toBe(20);
      }
    });
  });

  describe('createReviewSchema', () => {
    it('accepts rating between 1 and 5', () => {
      const valid = {
        authorName: 'Rohan Mehra',
        rating: 5,
        comment: 'Outstanding wedding choreography and flawless execution.',
      };
      expect(createReviewSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects rating greater than 5', () => {
      const invalid = {
        authorName: 'Rohan Mehra',
        rating: 6,
        comment: 'Too good to be true!',
      };
      expect(createReviewSchema.safeParse(invalid).success).toBe(false);
    });

    it('rejects rating less than 1', () => {
      const invalid = {
        authorName: 'Rohan Mehra',
        rating: 0,
        comment: 'Terrible experience.',
      };
      expect(createReviewSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe('portfolioItemSchema', () => {
    it('accepts image, video, and audio media types', () => {
      expect(portfolioItemSchema.safeParse({ title: 'Mandap', type: 'image' }).success).toBe(true);
      expect(portfolioItemSchema.safeParse({ title: 'Sangeet Reel', type: 'video' }).success).toBe(true);
      expect(portfolioItemSchema.safeParse({ title: 'Live Mix', type: 'audio' }).success).toBe(true);
    });
  });
});

describe('Sanitization & Security Utilities', () => {
  it('strips script and html tags from input string', () => {
    const malicious = '<script>alert("hack")</script>Hello <b>World</b>!';
    const sanitized = sanitizeText(malicious);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('</script>');
    expect(sanitized).not.toContain('<b>');
    expect(sanitized).toContain('Hello');
  });

  it('escapes dangerous HTML characters', () => {
    const xss = '" onmouseover="alert(1)';
    const sanitized = sanitizeText(xss);
    expect(sanitized).toContain('&quot;');
  });
});

describe('Rate Limiter', () => {
  it('enforces limit threshold', () => {
    const key = `test_rate_limit_${Date.now()}`;
    const limit = 3;
    const windowMs = 5000;

    expect(checkRateLimit(key, limit, windowMs).success).toBe(true);
    expect(checkRateLimit(key, limit, windowMs).success).toBe(true);
    expect(checkRateLimit(key, limit, windowMs).success).toBe(true);

    const blocked = checkRateLimit(key, limit, windowMs);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.reset).toBeGreaterThan(0);
  });
});
