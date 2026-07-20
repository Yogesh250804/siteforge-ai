// ============================================================================
// Public Page Route (/p/[slug])
// Dynamically renders the public website for a given slug.
// Supports custom colors, fonts, section content, and dynamic SEO fields.
// ============================================================================

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types/database";
import { PublicSiteContent } from "./public-site-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Fetch project details from Supabase (bypasses RLS check for public select)
 */
async function getPublicProject(slug: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Project;
}

/**
 * Generate SEO tags dynamically based on the project's metadata fields.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProject(slug);

  if (!project) {
    return {
      title: "Page Not Found — SiteForge AI",
    };
  }

  const { title, description } = project.seo_fields;

  return {
    title: title || `${project.name} — AI Generated Site`,
    description: description || `Welcome to ${project.name}'s official landing page.`,
  };
}

export default async function PublicProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPublicProject(slug);

  if (!project) {
    notFound();
  }

  return <PublicSiteContent project={project} />;
}
