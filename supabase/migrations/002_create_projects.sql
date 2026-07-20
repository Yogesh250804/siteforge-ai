-- ============================================================================
-- Migration 002: Create projects table
-- Stores user website projects with JSONB columns for flexible data.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  template_id TEXT NOT NULL,
  business_info JSONB NOT NULL DEFAULT '{}',
  generated_content JSONB NOT NULL DEFAULT '{}',
  seo_fields JSONB NOT NULL DEFAULT '{}',
  custom_styles JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'preview', 'deployed')),
  deployed_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Each user's project slugs must be unique
  UNIQUE(user_id, slug)
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own projects
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: users can insert their own projects
CREATE POLICY "Users can create own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: users can update their own projects
CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: users can delete their own projects
CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- Auto-update updated_at timestamp
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
