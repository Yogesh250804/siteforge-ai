// ============================================================================
// Project Server Actions
// CRUD operations for user website projects via Supabase.
// ============================================================================

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import type { Project, ProjectUpdate } from "@/lib/types/database";

// ---------------------------------------------------------------------------
// Validation Schemas
// ---------------------------------------------------------------------------

const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters.")
    .max(100, "Project name is too long."),
  template_id: z.string().min(1, "Please select a template."),
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProjectActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  success?: boolean;
} | null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a URL-safe slug from a project name */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 60);
}

/** Get the authenticated user or throw */
async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Not authenticated");
  }

  return { supabase, user };
}

// ---------------------------------------------------------------------------
// Get all projects for the current user
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  const { supabase } = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error.message);
    return [];
  }

  return (data as Project[]) ?? [];
}

// ---------------------------------------------------------------------------
// Create a new project
// ---------------------------------------------------------------------------

export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const parsed = CreateProjectSchema.safeParse({
    name: formData.get("name"),
    template_id: formData.get("template_id"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const { supabase, user } = await getAuthenticatedUser();

    const slug = slugify(parsed.data.name) + "-" + Date.now().toString(36);

    const { error } = await supabase.from("projects").insert({
      user_id: user.id,
      name: parsed.data.name,
      slug,
      template_id: parsed.data.template_id,
      business_info: {},
      generated_content: {},
      seo_fields: {},
      custom_styles: {},
      status: "draft",
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "You must be logged in to create a project." };
  }
}

// ---------------------------------------------------------------------------
// Update a project
// ---------------------------------------------------------------------------

export async function updateProject(
  projectId: string,
  updates: ProjectUpdate
): Promise<ProjectActionState> {
  try {
    const { supabase } = await getAuthenticatedUser();

    const { error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", projectId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "You must be logged in to update a project." };
  }
}

// ---------------------------------------------------------------------------
// Duplicate a project
// ---------------------------------------------------------------------------

export async function duplicateProject(
  projectId: string
): Promise<ProjectActionState> {
  try {
    const { supabase, user } = await getAuthenticatedUser();

    // Fetch the original project
    const { data: original, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (fetchError || !original) {
      return { error: "Project not found." };
    }

    const project = original as Project;
    const newSlug =
      slugify(project.name + " copy") + "-" + Date.now().toString(36);

    const { error: insertError } = await supabase.from("projects").insert({
      user_id: user.id,
      name: project.name + " (Copy)",
      slug: newSlug,
      template_id: project.template_id,
      business_info: project.business_info,
      generated_content: project.generated_content,
      seo_fields: project.seo_fields,
      custom_styles: project.custom_styles,
      status: "draft",
    });

    if (insertError) {
      return { error: insertError.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "You must be logged in to duplicate a project." };
  }
}

// ---------------------------------------------------------------------------
// Delete a project
// ---------------------------------------------------------------------------

export async function deleteProject(
  projectId: string
): Promise<ProjectActionState> {
  try {
    const { supabase } = await getAuthenticatedUser();

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "You must be logged in to delete a project." };
  }
}
