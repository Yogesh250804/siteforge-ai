// ============================================================================
// Project Card Component
// Displays a single project with status badge, actions menu, and hover effects.
// ============================================================================

"use client";

import React, { useState, useTransition } from "react";
import {
  MoreHorizontal,
  Edit3,
  Copy,
  Trash2,
  Globe,
  Clock,
  ExternalLink,
} from "lucide-react";
import type { Project } from "@/lib/types/database";
import { duplicateProject, deleteProject } from "@/app/actions/projects";
import { getTemplateById } from "@/lib/templates";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  draft: {
    label: "Draft",
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
  generating: {
    label: "Generating",
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  preview: {
    label: "Preview",
    color: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  deployed: {
    label: "Live",
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
};

export function ProjectCard({ project }: { project: Project }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  const template = getTemplateById(project.template_id);
  const status = statusConfig[project.status] || statusConfig.draft;

  const timeAgo = getTimeAgo(new Date(project.updated_at));

  const handleDuplicate = () => {
    setMenuOpen(false);
    startTransition(async () => {
      await duplicateProject(project.id);
    });
  };

  const handleDelete = () => {
    setConfirmDelete(false);
    setMenuOpen(false);
    startTransition(async () => {
      await deleteProject(project.id);
    });
  };

  return (
    <div
      className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-300 ${
        isPending ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Template Color Accent Bar */}
      <div
        className="h-1.5 w-full"
        style={{
          background: template
            ? `linear-gradient(90deg, ${template.colorScheme.primary}, ${template.colorScheme.secondary})`
            : "linear-gradient(90deg, #6366f1, #8b5cf6)",
        }}
      />

      <div className="p-5">
        {/* Top row: name + actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {project.name}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {template?.name || project.template_id}
            </p>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Project actions"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 z-50 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 text-xs">
                  <button
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Project
                  </button>
                  <button
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                    onClick={handleDuplicate}
                  >
                    <Copy className="w-3.5 h-3.5" /> Duplicate
                  </button>
                  {project.deployed_url && (
                    <a
                      href={project.deployed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Live Site
                    </a>
                  )}
                  <hr className="my-1 border-slate-100 dark:border-slate-800" />
                  <button
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium"
                    onClick={() => {
                      setMenuOpen(false);
                      setConfirmDelete(true);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status + Time */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold ${status.bg} ${status.color}`}
          >
            {project.status === "deployed" && (
              <Globe className="w-3 h-3" />
            )}
            {status.label}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock className="w-3 h-3" />
            {timeAgo}
          </span>
        </div>
      </div>

      {/* Delete confirmation overlay */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-5 z-30">
          <div className="text-center">
            <Trash2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
              Delete this project?
            </p>
            <p className="text-[10px] text-slate-500 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Time formatting utility
// ---------------------------------------------------------------------------

function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
