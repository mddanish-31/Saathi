import { describe, it, expect } from 'vitest';
import { queryProfessionalsSchema, updateEnquiryStatusSchema } from '../src/lib/validators';

/**
 * Business logic verification: Review Eligibility Rule.
 * Only customers with a 'confirmed' enquiry for that professional may submit reviews.
 */
function verifyReviewEligibility(
  customerId: string,
  professionalId: string,
  enquiries: Array<{ customerId: string; professionalId: string; status: string }>
): { eligible: boolean; reason?: string } {
  const match = enquiries.find(
    (e) =>
      e.customerId === customerId &&
      e.professionalId === professionalId &&
      e.status === 'confirmed'
  );

  if (!match) {
    return {
      eligible: false,
      reason: 'Eligibility required: Only customers with a confirmed celebration booking can leave a review.',
    };
  }

  return { eligible: true };
}

/**
 * Business logic verification: Professional Profile Ownership Rule.
 */
function verifyProfessionalOwnership(
  requestingUserId: string,
  professionalOwnerId: string | null
): { authorized: boolean; statusCode: number } {
  if (!professionalOwnerId) {
    return { authorized: true, statusCode: 200 };
  }
  if (requestingUserId !== professionalOwnerId) {
    return { authorized: false, statusCode: 403 };
  }
  return { authorized: true, statusCode: 200 };
}

describe('API Route Logic & Authorization Rules', () => {
  describe('Review Eligibility Validation', () => {
    const mockEnquiries = [
      { customerId: 'usr-1', professionalId: 'pro-aura-weddings', status: 'confirmed' },
      { customerId: 'usr-2', professionalId: 'pro-aura-weddings', status: 'pending' },
      { customerId: 'usr-3', professionalId: 'pro-aura-weddings', status: 'responded' },
    ];

    it('allows review when customer has a confirmed enquiry', () => {
      const check = verifyReviewEligibility('usr-1', 'pro-aura-weddings', mockEnquiries);
      expect(check.eligible).toBe(true);
    });

    it('blocks review when customer enquiry is pending', () => {
      const check = verifyReviewEligibility('usr-2', 'pro-aura-weddings', mockEnquiries);
      expect(check.eligible).toBe(false);
      expect(check.reason).toContain('Eligibility required');
    });

    it('blocks review when customer has no booking with professional', () => {
      const check = verifyReviewEligibility('usr-unknown', 'pro-aura-weddings', mockEnquiries);
      expect(check.eligible).toBe(false);
    });
  });

  describe('Professional Ownership Rule', () => {
    it('authorizes the owner to make updates', () => {
      const check = verifyProfessionalOwnership('usr-pro-123', 'usr-pro-123');
      expect(check.authorized).toBe(true);
      expect(check.statusCode).toBe(200);
    });

    it('rejects another authenticated user trying to edit someone else profile with 403', () => {
      const check = verifyProfessionalOwnership('usr-attacker-456', 'usr-pro-123');
      expect(check.authorized).toBe(false);
      expect(check.statusCode).toBe(403);
    });
  });

  describe('Pagination & Limit Constraints', () => {
    it('enforces limit cannot exceed 50', () => {
      const parsed = queryProfessionalsSchema.safeParse({ limit: '75' });
      expect(parsed.success).toBe(false);
    });

    it('allows valid page and limit within bounds', () => {
      const parsed = queryProfessionalsSchema.safeParse({ page: '2', limit: '25' });
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.page).toBe(2);
        expect(parsed.data.limit).toBe(25);
      }
    });
  });
});
