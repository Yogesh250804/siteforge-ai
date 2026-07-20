"use client";

import React, { useState } from "react";
import { Laptop, Smartphone, Eye, Globe, Sparkles, CheckCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import type { BusinessInfo, GeneratedContent, CustomStyles } from "@/lib/types/database";

interface PreviewSandboxProps {
  businessInfo: BusinessInfo;
  content: GeneratedContent;
  styles: CustomStyles;
  templateId: string;
}

export function PreviewSandbox({
  businessInfo,
  content,
  styles,
  templateId
}: PreviewSandboxProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Apply styling variables dynamically
  const primaryColor = styles.primaryColor || "#6366f1";
  const borderRadiusClass = styles.borderRadius || "rounded-xl";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="flex-1 bg-slate-100 dark:bg-slate-950 flex flex-col h-full overflow-hidden">
      
      {/* Device Toolbar */}
      <div className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Live Preview Simulator</span>
        </div>

        <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 rounded-xl p-1 bg-slate-50 dark:bg-slate-950">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-1.5 rounded-lg transition-all ${
              device === "desktop"
                ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400"
                : "text-slate-450 hover:text-slate-700"
            }`}
            title="Desktop View"
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-1.5 rounded-lg transition-all ${
              device === "mobile"
                ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400"
                : "text-slate-450 hover:text-slate-700"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <div className="w-24"></div> {/* spacer to center controls */}
      </div>

      {/* Frame Sandbox viewport */}
      <div className="flex-1 p-6 flex justify-center items-center overflow-auto">
        
        {/* Mock Device Container */}
        <div
          className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
            device === "mobile"
              ? "w-[360px] h-[640px] rounded-[36px] border-[10px] border-slate-850 dark:border-slate-800"
              : "w-full h-full rounded-2xl"
          }`}
        >
          {/* Browser Address Bar (for desktop) */}
          {device === "desktop" && (
            <div className="h-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 flex items-center px-4 justify-between shrink-0 select-none">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="px-10 py-1 bg-slate-100 dark:bg-slate-950 rounded-lg text-[10px] text-slate-400 font-mono w-[300px] text-center truncate">
                {businessInfo.name.toLowerCase().replace(/\s+/g, "-")}.siteforge.live
              </div>
              <div className="w-12" />
            </div>
          )}

          {/* Website Content Viewport */}
          <div className="flex-1 overflow-y-auto text-slate-850 dark:text-slate-100 bg-white dark:bg-slate-900 font-sans">
            
            {/* Header */}
            <header className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur z-10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                  {businessInfo.name}
                </span>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="cursor-pointer hover:opacity-80">Home</span>
                <span className="cursor-pointer hover:opacity-80">Services</span>
                {content.contactFormEnabled && <span className="cursor-pointer hover:opacity-80">Contact</span>}
              </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-6 text-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/30 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white max-w-xl mx-auto mb-4">
                {content.heroHeading || `Welcome to ${businessInfo.name}`}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                {content.heroSubheading || businessInfo.description}
              </p>
              <button 
                className={`px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95`}
                style={{ backgroundColor: primaryColor, borderRadius: borderRadiusClass === "rounded-none" ? "0px" : borderRadiusClass === "rounded-xl" ? "12px" : "24px" }}
              >
                {content.heroCtaText || "Get Started"}
              </button>
            </section>

            {/* About Section */}
            <section className="py-16 px-6 max-w-xl mx-auto text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Our Mission</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About Us</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                {content.aboutText || "Describe your business history or core values inside the editor panel to custom craft this story."}
              </p>
            </section>

            {/* Services Section */}
            {(content.services || []).length > 0 && (
              <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-xl mx-auto">
                  <h3 className="text-lg font-bold text-center text-slate-900 dark:text-white mb-8">What We Offer</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(content.services || []).map((service, index) => (
                      <div key={index} className={`p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 ${borderRadiusClass} text-center`}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-white" style={{ backgroundColor: primaryColor + "30" }}>
                          <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate mb-1.5">{service.title}</h4>
                        <p className="text-[10px] text-slate-400 line-clamp-3 leading-relaxed">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Testimonials */}
            {(content.testimonials || []).length > 0 && (
              <section className="py-16 px-6 max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-center text-slate-900 dark:text-white mb-8">Client Testimonials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content.testimonials || []).map((test, i) => (
                    <div key={i} className={`p-5 bg-slate-50 dark:bg-slate-900/35 border border-slate-150 dark:border-slate-850 ${borderRadiusClass}`}>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 italic leading-relaxed mb-4">"{test.text}"</p>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">{test.name}</h5>
                        <p className="text-[9px] text-slate-400">{test.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Form & Info */}
            {content.contactFormEnabled && (
              <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Info details */}
                  <div className="space-y-4 text-xs font-semibold">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Get in Touch</h3>
                    {businessInfo.address && (
                      <div className="flex gap-2.5 text-slate-500 dark:text-slate-400">
                        <MapPin className="w-4 h-4 shrink-0 text-indigo-500" />
                        <span>{businessInfo.address}</span>
                      </div>
                    )}
                    {businessInfo.phone && (
                      <div className="flex gap-2.5 text-slate-500 dark:text-slate-400">
                        <Phone className="w-4 h-4 shrink-0 text-indigo-500" />
                        <span>{businessInfo.phone}</span>
                      </div>
                    )}
                    {businessInfo.email && (
                      <div className="flex gap-2.5 text-slate-500 dark:text-slate-400">
                        <Mail className="w-4 h-4 shrink-0 text-indigo-500" />
                        <span className="truncate">{businessInfo.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none"
                    />
                    <textarea
                      required
                      placeholder="Your Message..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                      style={{ backgroundColor: primaryColor, borderRadius: borderRadiusClass === "rounded-none" ? "0px" : borderRadiusClass === "rounded-xl" ? "8px" : "16px" }}
                    >
                      {formSubmitted ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" /> Message Sent
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </section>
            )}

            {/* Footer */}
            <footer className="py-8 px-6 text-center border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
              <p>{content.footerText || `© ${new Date().getFullYear()} ${businessInfo.name}. All rights reserved.`}</p>
              <p className="mt-1 opacity-70">Powered by SiteForge AI</p>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
}
