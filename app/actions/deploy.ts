"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type DeployResult = {
  success: boolean;
  error?: string;
  deployedUrl?: string;
};

/**
 * Server Action to trigger a simulated deployment.
 * Updates project status to 'deployed' and saves the public URL.
 */
export async function deployProjectAction(
  projectId: string
): Promise<DeployResult> {
  try {
    const supabase = await createClient();
    
    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Fetch slug
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("slug, user_id")
      .eq("id", projectId)
      .single();

    if (fetchError || !project) {
      return { success: false, error: "Project not found." };
    }

    if (project.user_id !== user.id) {
      return { success: false, error: "Access denied." };
    }

    const deployedUrl = `/p/${project.slug}`;

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        status: "deployed",
        deployed_url: deployedUrl,
        updated_at: new Date().toISOString()
      })
      .eq("id", projectId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/project/${projectId}`);
    
    return { success: true, deployedUrl };
  } catch (e: any) {
    return { success: false, error: e.message || "An unexpected error occurred." };
  }
}
