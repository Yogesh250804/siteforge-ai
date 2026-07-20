import React from "react";
import { FolderOpen, Sparkles } from "lucide-react";
import { templates } from "@/lib/templates";

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Website Presets
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore our catalog of 10 industry-specific responsive presets
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
              style={{ backgroundColor: tmpl.colorScheme.primary }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              {tmpl.name}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {tmpl.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tmpl.defaultSections.map((sect) => (
                <span
                  key={sect.id}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-850 text-[10px] font-bold text-slate-500 dark:text-slate-400"
                >
                  {sect.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
