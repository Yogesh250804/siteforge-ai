"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Laptop, Tablet, Smartphone, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import type { Template } from "@/lib/templates";
import { TemplateRenderer } from "./template-renderer";

interface TemplatePreviewModalProps {
  template: Template | null;
  open: boolean;
  onClose: () => void;
  initialDevice?: "desktop" | "tablet" | "mobile";
}

export function TemplatePreviewModal({
  template,
  open,
  onClose,
  initialDevice = "desktop",
}: TemplatePreviewModalProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(initialDevice);

  useEffect(() => {
    setDevice(initialDevice);
  }, [initialDevice, template]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !template) return null;

  const deviceWidths = {
    desktop: "w-full max-w-6xl h-[85vh] rounded-2xl",
    tablet: "w-[768px] h-[80vh] rounded-2xl",
    mobile: "w-[375px] h-[750px] rounded-[36px] border-[10px] border-slate-900 dark:border-slate-800",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl h-[92vh] flex flex-col items-center justify-between overflow-hidden">
        {/* Header Bar */}
        <div className="w-full h-16 bg-slate-900/90 border border-slate-800 rounded-2xl px-6 flex items-center justify-between backdrop-blur-md shadow-2xl shrink-0 mb-4">
          {/* Left Info */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: template.colorScheme.primary }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="preview-modal-title" className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>{template.name}</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                  {template.category}
                </span>
              </h2>
            </div>
          </div>

          {/* Middle Device Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setDevice("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                device === "desktop"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                device === "tablet"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                device === "mobile"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Right Action CTA & Close */}
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/create?template=${template.id}`}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Device Viewport Body */}
        <div className="flex-1 w-full flex items-center justify-center overflow-auto py-2 px-4">
          <div
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${deviceWidths[device]}`}
          >
            {/* Desktop Mock Address Bar */}
            {device === "desktop" && (
              <div className="h-9 bg-slate-100 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center px-4 justify-between shrink-0 select-none">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="px-6 py-0.5 bg-white dark:bg-slate-900 rounded-md text-[10px] text-slate-400 font-mono border border-slate-200 dark:border-slate-800 w-[300px] text-center truncate">
                  https://siteforge.live/templates/{template.id}
                </div>
                <div className="w-12" />
              </div>
            )}

            {/* Live Template Content */}
            <div className="flex-1 overflow-hidden">
              <TemplateRenderer template={template} device={device} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
