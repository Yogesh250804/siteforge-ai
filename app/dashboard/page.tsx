// ============================================================================
// Dashboard Page — Projects Overview
// Server Component that fetches projects, with a client wrapper for
// the create dialog and interactive elements.
// ============================================================================

import React from "react";
import { getProjects } from "@/app/actions/projects";
import { ProjectsGrid } from "./components/projects-grid";

export default async function DashboardPage() {
  const projects = await getProjects();

  return <ProjectsGrid initialProjects={projects} />;
}
