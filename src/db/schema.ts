import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
  uuid,
  jsonb,
  pgEnum,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['customer', 'professional']);
export const mediaTypeEnum = pgEnum('media_type', ['image', 'video', 'audio']);
export const enquiryStatusEnum = pgEnum('enquiry_status', [
  'pending',
  'reviewed',
  'responded',
  'confirmed',
]);

// 1. Users Table (Mirrors Supabase auth.users via trigger)
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  role: userRoleEnum('role').notNull().default('customer'),
  businessName: text('business_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 2. Categories Table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  code: text('code').notNull(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  heroImage: text('hero_image'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 3. Subcategories Table
export const subcategories = pgTable('subcategories', {
  id: text('id').primaryKey(),
  categorySlug: text('category_slug')
    .notNull()
    .references(() => categories.slug, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  badge: text('badge'),
  isActive: boolean('is_active').notNull().default(true),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 4. Services Table
export const services = pgTable('services', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  shortDescription: text('short_description').notNull(),
  fullDescription: text('full_description').notNull(),
  categorySlug: text('category_slug')
    .notNull()
    .references(() => categories.slug, { onDelete: 'cascade' }),
  subcategorySlug: text('subcategory_slug')
    .notNull()
    .references(() => subcategories.slug, { onDelete: 'cascade' }),
  startingPrice: text('starting_price').notNull(),
  priceModel: text('price_model').notNull(),
  features: text('features')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  typicalTimeline: text('typical_timeline').notNull(),
  idealFor: text('ideal_for').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 5. Professionals Table
export const professionals = pgTable(
  'professionals',
  {
    id: text('id').primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    brandName: text('brand_name').notNull(),
    tagline: text('tagline').notNull().default(''),
    businessType: text('business_type').notNull().default(''),
    avatarUrl: text('avatar_url'),
    coverImageUrl: text('cover_image_url'),
    location: text('location').notNull(),
    citiesServed: text('cities_served')
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    rating: numeric('rating', { precision: 3, scale: 2 }).notNull().default('0'),
    reviewCount: integer('review_count').notNull().default(0),
    experienceYears: integer('experience_years').notNull().default(0),
    eventsCompleted: integer('events_completed').notNull().default(0),
    startingPrice: text('starting_price').notNull().default(''),
    priceRange: text('price_range').notNull().default(''),
    priceModel: text('price_model').notNull().default(''),
    servicesOffered: text('services_offered')
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    about: text('about').notNull().default(''),
    specialties: text('specialties')
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    availability: text('availability').notNull().default('Available'),
    verified: boolean('verified').notNull().default(false),
    category: text('category').notNull().default('weddings-events'),

    // Category-specific nullable fields (e.g. music/entertainment)
    performanceType: text('performance_type'),
    genres: text('genres').array(),
    eventTypes: text('event_types').array(),
    performanceDuration: text('performance_duration'),
    teamSize: text('team_size'),
    equipmentProvided: text('equipment_provided').array(),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_professionals_category').on(table.category),
  ]
);

// 6. Portfolio Items Table
export const portfolioItems = pgTable(
  'portfolio_items',
  {
    id: text('id').primaryKey(),
    professionalId: text('professional_id')
      .notNull()
      .references(() => professionals.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    category: text('category').notNull().default(''),
    location: text('location').notNull().default(''),
    imageUrl: text('image_url'),
    description: text('description').notNull().default(''),
    tags: text('tags')
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    type: mediaTypeEnum('type').notNull().default('image'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_portfolio_items_professional_id').on(table.professionalId),
  ]
);

// 7. Reviews Table
export const reviews = pgTable(
  'reviews',
  {
    id: text('id').primaryKey(),
    professionalId: text('professional_id')
      .notNull()
      .references(() => professionals.id, { onDelete: 'cascade' }),
    customerId: uuid('customer_id').references(() => users.id, { onDelete: 'set null' }),
    authorName: text('author_name').notNull(),
    rating: numeric('rating', { precision: 3, scale: 2 }).notNull(),
    date: text('date').notNull(),
    eventType: text('event_type').notNull().default(''),
    location: text('location').notNull().default(''),
    comment: text('comment').notNull(),
    verified: boolean('verified').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    check('rating_range', sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
    index('idx_reviews_professional_id').on(table.professionalId),
  ]
);

// 8. Enquiries Table
export const enquiries = pgTable(
  'enquiries',
  {
    id: text('id').primaryKey(),
    professionalId: text('professional_id')
      .notNull()
      .references(() => professionals.id, { onDelete: 'cascade' }),
    customerId: uuid('customer_id').references(() => users.id, { onDelete: 'set null' }),
    serviceId: text('service_id').references(() => services.slug, { onDelete: 'set null' }),
    customerName: text('customer_name').notNull(),
    customerEmail: text('customer_email').notNull(),
    customerPhone: text('customer_phone').notNull(),
    serviceName: text('service_name').notNull(),
    eventDate: text('event_date').notNull(),
    eventLocation: text('event_location').notNull(),
    budgetRange: text('budget_range').notNull().default(''),
    message: text('message').notNull(),
    status: enquiryStatusEnum('status').notNull().default('pending'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_enquiries_professional_id').on(table.professionalId),
    index('idx_enquiries_customer_id').on(table.customerId),
  ]
);

// 9. Notifications Table
export const notifications = pgTable(
  'notifications',
  {
    id: text('id').primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    payload: jsonb('payload').notNull().default(sql`'{}'::jsonb`),
    read: boolean('read').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_notifications_user_id').on(table.userId),
  ]
);

// Drizzle Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  professional: one(professionals, {
    fields: [users.id],
    references: [professionals.userId],
  }),
  enquiries: many(enquiries),
  notifications: many(notifications),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
  services: many(services),
}));

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subcategories.categorySlug],
    references: [categories.slug],
  }),
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  category: one(categories, {
    fields: [services.categorySlug],
    references: [categories.slug],
  }),
  subcategory: one(subcategories, {
    fields: [services.subcategorySlug],
    references: [subcategories.slug],
  }),
  enquiries: many(enquiries),
}));

export const professionalsRelations = relations(professionals, ({ one, many }) => ({
  user: one(users, {
    fields: [professionals.userId],
    references: [users.id],
  }),
  portfolio: many(portfolioItems),
  reviews: many(reviews),
  enquiries: many(enquiries),
}));

export const portfolioItemsRelations = relations(portfolioItems, ({ one }) => ({
  professional: one(professionals, {
    fields: [portfolioItems.professionalId],
    references: [professionals.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  professional: one(professionals, {
    fields: [reviews.professionalId],
    references: [professionals.id],
  }),
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
  }),
}));

export const enquiriesRelations = relations(enquiries, ({ one }) => ({
  professional: one(professionals, {
    fields: [enquiries.professionalId],
    references: [professionals.id],
  }),
  customer: one(users, {
    fields: [enquiries.customerId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [enquiries.serviceId],
    references: [services.slug],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
