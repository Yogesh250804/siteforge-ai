"use server";

import { createClient } from "@/lib/supabase/server";
import { generateWebsiteContent } from "@/lib/gemini";
import { BusinessInfo } from "@/lib/types/database";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 60);
}

export type GeneratorResult = {
  success: boolean;
  error?: string;
  projectId?: string;
};

/**
 * Server Action to generate a complete website.
 * 1. Validates auth.
 * 2. Invokes Gemini API (or fallback) to generate themed site contents.
 * 3. Creates the database project with preloaded JSON state.
 */
export async function generateSiteAction(
  businessInfo: BusinessInfo,
  templateId: string
): Promise<GeneratorResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    if (!businessInfo.name.trim()) {
      return { success: false, error: "Business name is required." };
    }

    // Generate AI Content
    const generatedContent = await generateWebsiteContent(businessInfo, templateId);

    // Create unique slug
    const baseSlug = slugify(businessInfo.name) || "site";
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    // Insert project
    const { data: newProject, error: insertError } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        name: businessInfo.name,
        slug,
        template_id: templateId,
        business_info: businessInfo,
        generated_content: generatedContent,
        seo_fields: {
          title: `${businessInfo.name} — ${businessInfo.industry}`,
          description: businessInfo.description,
          keywords: [businessInfo.industry, businessInfo.name]
        },
        custom_styles: {
          darkMode: false,
          borderRadius: "rounded-xl"
        },
        status: "preview"
      })
      .select("id")
      .single();

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    revalidatePath("/dashboard");
    return { success: true, projectId: newProject.id };
  } catch (e: any) {
    return { success: false, error: e.message || "An unexpected error occurred." };
  }
}
