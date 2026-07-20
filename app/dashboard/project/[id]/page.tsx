// ============================================================================
// Editor Route Page
// Server component that verifies auth, fetches project state,
// and mounts the client editor workspace.
// ============================================================================

import React from "react";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditorWorkspace } from "./components/editor-workspace";
import type { Project } from "@/lib/types/database";

export const metadata = {
  title: "Site Editor — SiteForge AI",
  description: "Customize and preview your AI-generated website.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectEditorPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch the project and verify ownership
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  const typedProject = project as Project;

  if (typedProject.user_id !== user.id) {
    redirect("/dashboard");
  }

  return <EditorWorkspace project={typedProject} />;
}
