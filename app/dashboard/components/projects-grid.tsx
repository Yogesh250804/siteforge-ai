// ============================================================================
// Projects Grid Component
// Client component that renders the project cards and empty state.
// ============================================================================

import Link from "next/link";
import React from "react";
import { Plus, Sparkles, FolderPlus } from "lucide-react";
import type { Project } from "@/lib/types/database";
import { ProjectCard } from "./project-card";
import { EmptyState } from "@/app/dashboard/components/ui/empty-state";

export function ProjectsGrid({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {initialProjects.length === 0
              ? "Create your first AI-powered website"
              : `${initialProjects.length} project${initialProjects.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 group active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Project</span>
        </Link>
      </div>

      {/* Project grid or empty state */}
      {initialProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Create new card */}
          <Link
            href="/dashboard/create"
            className="group border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500 dark:hover:border-indigo-600 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-all min-h-[180px] bg-white/40 dark:bg-slate-900/40"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/60 group-hover:scale-110 transition-all">
              <Plus className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Create New Project
            </p>
          </Link>

          {/* Existing project cards */}
          {initialProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <EmptyState
          icon={FolderPlus}
          title="No projects yet"
          description="Create your first AI-powered website by choosing a template and providing your business details. It takes less than a minute."
          actionLabel="Create Your First Project"
          actionHref="/dashboard/create"
          className="my-8"
        />
      )}
    </>
  );
}
