// ============================================================================
// Projects Grid Component
// Client component that renders the project cards and create dialog.
// ============================================================================

"use client";

import React, { useState } from "react";
import { Plus, Sparkles, FolderOpen } from "lucide-react";
import type { Project } from "@/lib/types/database";
import { ProjectCard } from "./project-card";
import { CreateProjectDialog } from "./create-project-dialog";

export function ProjectsGrid({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Your Projects
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {initialProjects.length === 0
              ? "Create your first AI-powered website"
              : `${initialProjects.length} project${initialProjects.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/10 transition-all flex items-center gap-2 group"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Project</span>
        </button>
      </div>

      {/* Project grid or empty state */}
      {initialProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Create new card */}
          <button
            onClick={() => setDialogOpen(true)}
            className="group border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-400 dark:hover:border-indigo-700 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10 transition-all min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
              <Plus className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Create New Project
            </p>
          </button>

          {/* Existing project cards */}
          {initialProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-6">
            <FolderOpen className="w-10 h-10 text-indigo-600/40 dark:text-indigo-400/40" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
            No projects yet
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8">
            Create your first AI-powered website by choosing a template and
            providing your business details. It only takes a minute.
          </p>
          <button
            onClick={() => setDialogOpen(true)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/10 transition-all flex items-center gap-2 group"
          >
            <Sparkles className="w-4 h-4" />
            Create Your First Project
          </button>
        </div>
      )}

      {/* Create project dialog */}
      <CreateProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
