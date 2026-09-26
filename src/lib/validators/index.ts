import { z } from 'zod';

// ============================================================================
// AUTH VALIDATORS
// ============================================================================
export const signupSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().optional(),
  role: z.enum(['customer', 'professional']),
  businessName: z.string().trim().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ============================================================================
// ENQUIRY VALIDATORS
// ============================================================================
export const createEnquirySchema = z.object({
  professionalId: z.string().trim().min(1, 'Professional ID is required'),
  serviceId: z.string().trim().optional(),
  serviceName: z.string().trim().min(1, 'Service name is required'),
  customerName: z.string().trim().min(1, 'Customer name is required'),
  customerEmail: z.string().trim().email('Valid customer email is required'),
  customerPhone: z.string().trim().min(5, 'Valid contact number is required'),
  eventDate: z.string().trim().min(1, 'Event date is required'),
  eventLocation: z.string().trim().min(1, 'Event location is required'),
  budgetRange: z.string().trim().default(''),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(2000),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'responded', 'confirmed']),
});

// ============================================================================
// PROFESSIONAL VALIDATORS
// ============================================================================
export const queryProfessionalsSchema = z.object({
  category: z.string().trim().optional(),
  city: z.string().trim().optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

export const updateProfessionalSchema = z.object({
  name: z.string().trim().min(1).optional(),
  brandName: z.string().trim().min(1).optional(),
  tagline: z.string().trim().optional(),
  businessType: z.string().trim().optional(),
  avatarUrl: z.string().trim().optional(),
  coverImageUrl: z.string().trim().optional(),
  location: z.string().trim().optional(),
  citiesServed: z.array(z.string().trim()).optional(),
  startingPrice: z.string().trim().optional(),
  priceRange: z.string().trim().optional(),
  priceModel: z.string().trim().optional(),
  servicesOffered: z.array(z.string().trim()).optional(),
  about: z.string().trim().optional(),
  specialties: z.array(z.string().trim()).optional(),
  availability: z.string().trim().optional(),
});

export const portfolioItemSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  category: z.string().trim().default(''),
  location: z.string().trim().default(''),
  imageUrl: z.string().trim().optional(),
  description: z.string().trim().default(''),
  tags: z.array(z.string().trim()).default([]),
  type: z.enum(['image', 'video', 'audio']).default('image'),
});

// ============================================================================
// REVIEW VALIDATORS
// ============================================================================
export const createReviewSchema = z.object({
  authorName: z.string().trim().min(1, 'Author name is required'),
  rating: z.coerce.number().min(1).max(5),
  eventType: z.string().trim().default(''),
  location: z.string().trim().default(''),
  comment: z.string().trim().min(3, 'Review comment must be at least 3 characters').max(1000),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryStatusInput = z.infer<typeof updateEnquiryStatusSchema>;
export type QueryProfessionalsInput = z.infer<typeof queryProfessionalsSchema>;
export type UpdateProfessionalInput = z.infer<typeof updateProfessionalSchema>;
export type PortfolioItemInput = z.infer<typeof portfolioItemSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
