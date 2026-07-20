// ============================================================================
// Database Types for SiteForge AI
// Mirrors the Supabase Postgres schema (profiles + projects tables)
// ============================================================================

export type Plan = "free" | "pro" | "agency";
export type ProjectStatus = "draft" | "generating" | "preview" | "deployed";

/**
 * User profile — extends Supabase auth.users with app-specific fields.
 * Auto-created via a Postgres trigger when a new auth user signs up.
 */
export interface Profile {
  id: string; // UUID, references auth.users.id
  full_name: string | null;
  avatar_url: string | null;
  plan: Plan;
  created_at: string; // ISO timestamp
  updated_at: string;
}

/**
 * Business information collected during the project creation wizard.
 */
export interface BusinessInfo {
  name: string;
  industry: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
  socialLinks?: Record<string, string>;
}

/**
 * SEO metadata fields for a generated website.
 */
export interface SeoFields {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * AI-generated content for a project's website sections.
 */
export interface GeneratedContent {
  heroHeading?: string;
  heroSubheading?: string;
  heroCtaText?: string;
  aboutText?: string;
  services?: Array<{ title: string; description: string; icon?: string }>;
  testimonials?: Array<{ name: string; role: string; text: string }>;
  contactFormEnabled?: boolean;
  footerText?: string;
  [key: string]: unknown; // allow extension
}

/**
 * Custom styling overrides for a generated website.
 */
export interface CustomStyles {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  darkMode?: boolean;
  borderRadius?: string;
  [key: string]: unknown;
}

/**
 * A website project created by a user.
 */
export interface Project {
  id: string; // UUID
  user_id: string; // UUID
  name: string;
  slug: string;
  template_id: string;
  business_info: BusinessInfo;
  generated_content: GeneratedContent;
  seo_fields: SeoFields;
  custom_styles: CustomStyles;
  status: ProjectStatus;
  deployed_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Convenience type for creating a new project (omit server-generated fields).
 */
export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;

/**
 * Convenience type for updating an existing project.
 */
export type ProjectUpdate = Partial<
  Omit<Project, "id" | "user_id" | "created_at">
>;
