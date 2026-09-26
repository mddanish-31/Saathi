CREATE TYPE "public"."enquiry_status" AS ENUM('pending', 'reviewed', 'responded', 'confirmed');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('image', 'video', 'audio');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('customer', 'professional');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"hero_image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" text PRIMARY KEY NOT NULL,
	"professional_id" text NOT NULL,
	"customer_id" uuid,
	"service_id" text,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_phone" text NOT NULL,
	"service_name" text NOT NULL,
	"event_date" text NOT NULL,
	"event_location" text NOT NULL,
	"budget_range" text DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"status" "enquiry_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_items" (
	"id" text PRIMARY KEY NOT NULL,
	"professional_id" text NOT NULL,
	"title" text NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"image_url" text,
	"description" text DEFAULT '' NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"type" "media_type" DEFAULT 'image' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "professionals" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"brand_name" text NOT NULL,
	"tagline" text DEFAULT '' NOT NULL,
	"business_type" text DEFAULT '' NOT NULL,
	"avatar_url" text,
	"cover_image_url" text,
	"location" text NOT NULL,
	"cities_served" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"rating" numeric(3, 2) DEFAULT '0' NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"experience_years" integer DEFAULT 0 NOT NULL,
	"events_completed" integer DEFAULT 0 NOT NULL,
	"starting_price" text DEFAULT '' NOT NULL,
	"price_range" text DEFAULT '' NOT NULL,
	"price_model" text DEFAULT '' NOT NULL,
	"services_offered" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"about" text DEFAULT '' NOT NULL,
	"specialties" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"availability" text DEFAULT 'Available' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"category" text DEFAULT 'weddings-events' NOT NULL,
	"performance_type" text,
	"genres" text[],
	"event_types" text[],
	"performance_duration" text,
	"team_size" text,
	"equipment_provided" text[],
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"professional_id" text NOT NULL,
	"customer_id" uuid,
	"author_name" text NOT NULL,
	"rating" numeric(3, 2) NOT NULL,
	"date" text NOT NULL,
	"event_type" text DEFAULT '' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"comment" text NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rating_range" CHECK ("reviews"."rating" >= 1 AND "reviews"."rating" <= 5)
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"category_slug" text NOT NULL,
	"subcategory_slug" text NOT NULL,
	"starting_price" text NOT NULL,
	"price_model" text NOT NULL,
	"features" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"typical_timeline" text NOT NULL,
	"ideal_for" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "subcategories" (
	"id" text PRIMARY KEY NOT NULL,
	"category_slug" text NOT NULL,
	"code" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"badge" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"image_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subcategories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"business_name" text,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."professionals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_service_id_services_slug_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("slug") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_items" ADD CONSTRAINT "portfolio_items_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."professionals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."professionals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_category_slug_categories_slug_fk" FOREIGN KEY ("category_slug") REFERENCES "public"."categories"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_subcategory_slug_subcategories_slug_fk" FOREIGN KEY ("subcategory_slug") REFERENCES "public"."subcategories"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_slug_categories_slug_fk" FOREIGN KEY ("category_slug") REFERENCES "public"."categories"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_enquiries_professional_id" ON "enquiries" USING btree ("professional_id");--> statement-breakpoint
CREATE INDEX "idx_enquiries_customer_id" ON "enquiries" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "idx_notifications_user_id" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_portfolio_items_professional_id" ON "portfolio_items" USING btree ("professional_id");--> statement-breakpoint
CREATE INDEX "idx_professionals_category" ON "professionals" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_reviews_professional_id" ON "reviews" USING btree ("professional_id");