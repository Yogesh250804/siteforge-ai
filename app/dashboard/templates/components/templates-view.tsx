"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  Eye, 
  ArrowRight, 
  Laptop, 
  Tablet, 
  Smartphone,
  Sliders,
  Maximize2
} from "lucide-react";
import { templates, getTemplateCategories, type Template } from "@/lib/templates";
import { TemplateRenderer } from "./template-renderer";
import { TemplatePreviewModal } from "./template-preview-modal";

export function TemplatesView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<Template | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Track per-card thumbnail device viewports
  const [cardDevices, setCardDevices] = useState<Record<string, "desktop" | "tablet" | "mobile">>({});

  const categories = ["All", ...getTemplateCategories()];

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((tmpl) => {
      const matchesCategory =
        selectedCategory === "All" || tmpl.category === selectedCategory;
      const matchesSearch =
        tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenPreview = (tmpl: Template, device: "desktop" | "tablet" | "mobile" = "desktop") => {
    setActivePreviewTemplate(tmpl);
    setPreviewDevice(device);
    setPreviewModalOpen(true);
  };

  const handleCardDeviceChange = (
    e: React.MouseEvent,
    templateId: string,
    device: "desktop" | "tablet" | "mobile"
  ) => {
    e.stopPropagation();
    setCardDevices((prev) => ({ ...prev, [templateId]: device }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore Template Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Production-ready responsive website layouts designed for instant AI deployment.
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 self-start sm:self-auto active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Build from Scratch</span>
        </Link>
      </div>

      {/* Controls Bar: Search & Category Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((tmpl) => {
          const currentDevice = cardDevices[tmpl.id] || "desktop";

          return (
            <div
              key={tmpl.id}
              className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-[480px]"
            >
              {/* TOP: Industry badge + Template Name */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                    {tmpl.category}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tmpl.name}
                  </h3>
                </div>

                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                  style={{ backgroundColor: tmpl.colorScheme.primary }}
                  title={`Accent: ${tmpl.colorScheme.primary}`}
                />
              </div>

              {/* MIDDLE: Primary Live Website Viewport (~70% height focus) */}
              <div className="relative flex-1 bg-slate-100 dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-800 flex items-center justify-center p-2.5">
                {/* Embedded Live Webpage Renderer */}
                <div
                  className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                    currentDevice === "mobile"
                      ? "w-[170px] h-[98%]"
                      : currentDevice === "tablet"
                        ? "w-[240px] h-[98%]"
                        : "w-full h-full"
                  }`}
                >
                  <TemplateRenderer
                    template={tmpl}
                    device={currentDevice}
                    isThumbnail={true}
                  />
                </div>

                {/* Glassmorphism Centered Action Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center gap-2.5 p-4 z-20">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenPreview(tmpl, currentDevice)}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleOpenPreview(tmpl, currentDevice)}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>
                  </div>

                  <Link
                    href={`/dashboard/create?template=${tmpl.id}`}
                    className="w-full max-w-[210px] py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Use Template</span>
                  </Link>
                </div>

                {/* Device Switcher Pills on Thumbnail */}
                <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleCardDeviceChange(e, tmpl.id, "desktop")}
                    className={`p-1 rounded ${
                      currentDevice === "desktop"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Desktop View"
                  >
                    <Laptop className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleCardDeviceChange(e, tmpl.id, "tablet")}
                    className={`p-1 rounded ${
                      currentDevice === "tablet"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Tablet View"
                  >
                    <Tablet className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleCardDeviceChange(e, tmpl.id, "mobile")}
                    className={`p-1 rounded ${
                      currentDevice === "mobile"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* BOTTOM: 2 Feature Tags & Use Template CTA */}
              <div className="p-3.5 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5 truncate">
                  {tmpl.defaultSections.slice(0, 2).map((sect) => (
                    <span
                      key={sect.id}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50 truncate max-w-[100px]"
                    >
                      {sect.name}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/dashboard/create?template=${tmpl.id}`}
                  className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Preview Modal */}
      <TemplatePreviewModal
        template={activePreviewTemplate}
        open={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        initialDevice={previewDevice}
      />
    </div>
  );
}
