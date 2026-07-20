"use client";

import React, { useState } from "react";
import { 
  Type, 
  Palette, 
  Search, 
  PhoneCall, 
  ChevronRight, 
  Trash2, 
  Plus, 
  Info,
  Check,
  RefreshCw
} from "lucide-react";
import type { BusinessInfo, GeneratedContent, SeoFields, CustomStyles } from "@/lib/types/database";

interface EditorSidebarProps {
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  content: GeneratedContent;
  setContent: React.Dispatch<React.SetStateAction<GeneratedContent>>;
  seoFields: SeoFields;
  setSeoFields: React.Dispatch<React.SetStateAction<SeoFields>>;
  styles: CustomStyles;
  setStyles: React.Dispatch<React.SetStateAction<CustomStyles>>;
  onSave: () => void;
  isSaving: boolean;
}

type TabType = "content" | "design" | "seo" | "contact";

export function EditorSidebar({
  businessInfo,
  setBusinessInfo,
  content,
  setContent,
  seoFields,
  setSeoFields,
  styles,
  setStyles,
  onSave,
  isSaving
}: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>("content");

  // Style presets
  const colorPresets = [
    { primary: "#D97706", name: "Amber" },
    { primary: "#9333EA", name: "Purple" },
    { primary: "#2563EB", name: "Blue" },
    { primary: "#0D9488", name: "Teal" },
    { primary: "#EC4899", name: "Pink" },
    { primary: "#18181B", name: "Charcoal" }
  ];

  return (
    <div className="w-full lg:w-[380px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0">
      {/* Tabs list */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {[
          { id: "content", label: "Content", icon: Type },
          { id: "design", label: "Design", icon: Palette },
          { id: "seo", label: "SEO", icon: Search },
          { id: "contact", label: "Contact", icon: PhoneCall }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 py-3.5 flex flex-col items-center gap-1 border-b-2 text-xs font-bold transition-all ${
                active 
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" 
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Panel Scroll Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div className="space-y-5">
            {/* Hero Heading */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Hero Title</label>
              <input
                type="text"
                value={content.heroHeading || ""}
                onChange={(e) => setContent({ ...content, heroHeading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Hero Subheading */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Hero Subtitle</label>
              <textarea
                value={content.heroSubheading || ""}
                onChange={(e) => setContent({ ...content, heroSubheading: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Hero CTA Text */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">CTA Button Text</label>
              <input
                type="text"
                value={content.heroCtaText || ""}
                onChange={(e) => setContent({ ...content, heroCtaText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* About text */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">About Us Copy</label>
              <textarea
                value={content.aboutText || ""}
                onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Services Editor */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Services Grid Items</label>
              <div className="space-y-4">
                {(content.services || []).map((service, index) => (
                  <div key={index} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const updated = [...(content.services || [])];
                        updated[index] = { ...service, title: e.target.value };
                        setContent({ ...content, services: updated });
                      }}
                      placeholder="Service Title"
                      className="w-full px-3 py-1.5 rounded border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-950 text-xs font-bold focus:outline-none"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => {
                        const updated = [...(content.services || [])];
                        updated[index] = { ...service, description: e.target.value };
                        setContent({ ...content, services: updated });
                      }}
                      placeholder="Service Description"
                      rows={2}
                      className="w-full px-3 py-1.5 rounded border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-950 text-xs font-semibold focus:outline-none resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DESIGN TAB */}
        {activeTab === "design" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Primary Color Preset</label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.primary}
                    onClick={() => setStyles({ ...styles, primaryColor: preset.primary })}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                      styles.primaryColor === preset.primary 
                        ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20" 
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full shrink-0" 
                      style={{ backgroundColor: preset.primary }}
                    />
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Custom Color Hex</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={styles.primaryColor || "#D97706"}
                  onChange={(e) => setStyles({ ...styles, primaryColor: e.target.value })}
                  className="w-9 h-9 rounded border border-slate-200 dark:border-slate-800 cursor-pointer overflow-hidden p-0"
                />
                <input
                  type="text"
                  value={styles.primaryColor || ""}
                  onChange={(e) => setStyles({ ...styles, primaryColor: e.target.value })}
                  placeholder="#000000"
                  className="flex-1 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Border Radius */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Border Corners</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "rounded-none", name: "Sharp" },
                  { value: "rounded-xl", name: "Rounded" },
                  { value: "rounded-3xl", name: "Curved" }
                ].map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setStyles({ ...styles, borderRadius: preset.value })}
                    className={`p-2 text-center rounded-lg border text-xs font-bold transition-all ${
                      styles.borderRadius === preset.value
                        ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-650"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === "seo" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">SEO Title Tag</label>
              <input
                type="text"
                value={seoFields.title || ""}
                onChange={(e) => setSeoFields({ ...seoFields, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Meta Description</label>
              <textarea
                value={seoFields.description || ""}
                onChange={(e) => setSeoFields({ ...seoFields, description: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === "contact" && (
          <div className="space-y-5">
            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Street Address</label>
              <input
                type="text"
                value={businessInfo.address || ""}
                onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <input
                type="text"
                value={businessInfo.phone || ""}
                onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Contact Email</label>
              <input
                type="email"
                value={businessInfo.email || ""}
                onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-55/30 dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Toggle contact form */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-850 dark:text-white">Enable Contact Form</p>
                <p className="text-[10px] text-slate-400">Allow visitors to send you messages.</p>
              </div>
              <button
                onClick={() => setContent({ ...content, contactFormEnabled: !content.contactFormEnabled })}
                className={`w-10 h-6 rounded-full p-1 transition-all ${
                  content.contactFormEnabled ? "bg-indigo-650" : "bg-slate-200 dark:bg-slate-800"
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transition-all ${
                    content.contactFormEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Save Button Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving changes...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Save Customization</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
