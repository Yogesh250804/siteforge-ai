"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, Globe } from "lucide-react";
import type { Project } from "@/lib/types/database";
import { updateProject } from "@/app/actions/projects";
import { EditorSidebar } from "./editor-sidebar";
import { PreviewSandbox } from "./preview-sandbox";

interface EditorWorkspaceProps {
  project: Project;
}

export function EditorWorkspace({ project }: EditorWorkspaceProps) {
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Controlled states bound to editors and simulators
  const [businessInfo, setBusinessInfo] = useState(project.business_info);
  const [content, setContent] = useState(project.generated_content);
  const [seoFields, setSeoFields] = useState(project.seo_fields);
  const [styles, setStyles] = useState(project.custom_styles);

  const handleSave = () => {
    setSaveStatus("saving");
    setErrorMsg("");

    startTransition(async () => {
      const result = await updateProject(project.id, {
        business_info: businessInfo,
        generated_content: content,
        seo_fields: seoFields,
        custom_styles: styles,
      });

      if (result?.success) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2500);
      } else {
        setSaveStatus("error");
        setErrorMsg(result?.error || "Failed to save project customization.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-40 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden">
      {/* Editor Sub-Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-850" />
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{project.name}</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400">
                {project.template_id}
              </span>
            </h1>
          </div>
        </div>

        {/* Global Save Indicator Status */}
        <div className="flex items-center gap-3">
          {saveStatus === "success" && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              Customization Saved!
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs font-bold text-red-650 truncate max-w-[200px]" title={errorMsg}>
              {errorMsg}
            </span>
          )}

          <button
            onClick={() => alert("To deploy this website onto your custom Vercel dashboard, upgrade to Pro!")}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-505 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 group active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span>Publish Site</span>
          </button>
        </div>
      </header>

      {/* splitscreen Body */}
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
          isSaving={saveStatus === "saving" || isPending}
        />

        {/* Right Live Preview viewport */}
        <PreviewSandbox
          businessInfo={businessInfo}
          content={content}
          styles={styles}
          templateId={project.template_id}
        />
      </div>
    </div>
  );
}
