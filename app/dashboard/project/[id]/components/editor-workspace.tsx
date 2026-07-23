"use client";

import React, { useState, useTransition, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Save } from "lucide-react";
import type { Project } from "@/lib/types/database";
import { updateProject } from "@/app/actions/projects";
import { EditorSidebar } from "./editor-sidebar";
import { PreviewSandbox } from "./preview-sandbox";
import { DeployModal } from "./deploy-modal";
import { ToastFeedback, ToastType } from "@/app/dashboard/components/ui/toast-feedback";
import { LoadingSpinner } from "@/app/dashboard/components/ui/loading-spinner";

interface EditorWorkspaceProps {
  project: Project;
}

export function EditorWorkspace({ project }: EditorWorkspaceProps) {
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);
  const [deployOpen, setDeployOpen] = useState(false);

  // Controlled states bound to editors and simulators
  const [businessInfo, setBusinessInfo] = useState(project.business_info);
  const [content, setContent] = useState(project.generated_content);
  const [seoFields, setSeoFields] = useState(project.seo_fields);
  const [styles, setStyles] = useState(project.custom_styles);

  const handleSave = useCallback(() => {
    setSaveStatus("saving");

    startTransition(async () => {
      const result = await updateProject(project.id, {
        business_info: businessInfo,
        generated_content: content,
        seo_fields: seoFields,
        custom_styles: styles,
      });

      if (result?.success) {
        setSaveStatus("success");
        setToast({ type: "success", message: "Project customizations saved successfully!" });
        setTimeout(() => setSaveStatus("idle"), 2500);
      } else {
        setSaveStatus("error");
        setToast({
          type: "error",
          message: result?.error || "Failed to save project customization.",
        });
      }
    });
  }, [project.id, businessInfo, content, seoFields, styles]);

  // Keyboard shortcut listener (Cmd+S / Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  const isSaving = saveStatus === "saving" || isPending;

  return (
    <div className="fixed inset-0 z-40 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden">
      {/* Editor Sub-Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="truncate max-w-[150px] sm:max-w-[250px]">{project.name}</span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                {project.template_id}
              </span>
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
            title="Save changes (Ctrl+S / Cmd+S)"
          >
            {isSaving ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Save className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            )}
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
          </button>

          <button
            onClick={() => setDeployOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 group active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span>Publish Site</span>
          </button>
        </div>
      </header>

      {/* Splitscreen Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <EditorSidebar
          businessInfo={businessInfo}
          setBusinessInfo={setBusinessInfo}
          content={content}
          setContent={setContent}
          seoFields={seoFields}
          setSeoFields={setSeoFields}
          styles={styles}
          setStyles={setStyles}
          onSave={handleSave}
          isSaving={isSaving}
        />

        {/* Right Live Preview viewport */}
        <PreviewSandbox
          businessInfo={businessInfo}
          content={content}
          styles={styles}
          templateId={project.template_id}
        />
      </div>

      {/* Deploy Modal */}
      <DeployModal
        open={deployOpen}
        onClose={() => setDeployOpen(false)}
        projectId={project.id}
      />

      {/* Toast Notification */}
      {toast && (
        <ToastFeedback
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
