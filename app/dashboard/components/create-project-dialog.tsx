// ============================================================================
// Create Project Dialog Component
// Modal for creating a new project with name input and template selection.
// ============================================================================

"use client";

import React, { useState, useActionState, useEffect } from "react";
import { X, Sparkles, Check } from "lucide-react";
import { createProject, type ProjectActionState } from "@/app/actions/projects";
import { templates } from "@/lib/templates";
import { LoadingSpinner } from "@/app/dashboard/components/ui/loading-spinner";

export function CreateProjectDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState<ProjectActionState, FormData>(
    createProject,
    null
  );
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);

  // Close dialog on success
  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state?.success, onClose]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isPending) {
        onClose();
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isPending, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          if (!isPending) onClose();
        }}
      />

      {/* Dialog */}
      <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 id="create-dialog-title" className="font-bold text-base text-slate-900 dark:text-white">
              Create New Project
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isPending}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form action={formAction} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Error display */}
            {state?.error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs font-medium text-rose-700 dark:text-rose-300">
                {state.error}
              </div>
            )}

            {/* Project name */}
            <div>
              <label
                htmlFor="project-name"
                className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
              >
                Project Name
              </label>
              <input
                id="project-name"
                name="name"
                type="text"
                required
                placeholder="My Awesome Website"
                disabled={isPending}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-medium disabled:opacity-50 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {state?.fieldErrors?.name && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {state.fieldErrors.name[0]}
                </p>
              )}
            </div>

            {/* Template selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Choose a Template
              </label>
              <div className="grid grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
                {templates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    disabled={isPending}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`relative text-left p-3.5 rounded-xl border transition-all ${
                      selectedTemplate === tmpl.id
                        ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-600 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-950/50"
                    }`}
                  >
                    {selectedTemplate === tmpl.id && (
                      <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 border border-slate-200/50 dark:border-slate-800/50"
                      style={{ backgroundColor: tmpl.colorScheme.primary + "20" }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded"
                        style={{ backgroundColor: tmpl.colorScheme.primary }}
                      />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {tmpl.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {tmpl.category}
                    </p>
                  </button>
                ))}
              </div>
              {state?.fieldErrors?.template_id && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {state.fieldErrors.template_id[0]}
                </p>
              )}
            </div>

            {/* Hidden field for template_id */}
            <input
              type="hidden"
              name="template_id"
              value={selectedTemplate}
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-950/50">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isPending ? (
                <LoadingSpinner size="sm" className="text-white" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>{isPending ? "Creating..." : "Create Project"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
