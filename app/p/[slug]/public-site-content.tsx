"use client";

import React, { useState, useTransition } from "react";
import { Sparkles, CheckCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import type { Project } from "@/lib/types/database";
import { submitContactFormAction } from "@/app/actions/contact";

interface PublicSiteContentProps {
  project: Project;
}

export function PublicSiteContent({ project }: PublicSiteContentProps) {
  const [isPending, startTransition] = useTransition();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Styling values
  const primaryColor = project.custom_styles.primaryColor || "#6366f1";
  const borderRadiusClass = project.custom_styles.borderRadius || "rounded-xl";

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitted(false);

    const formData = new FormData(e.currentTarget);
    formData.append("projectId", project.id);

    startTransition(async () => {
      const res = await submitContactFormAction(formData);
      if (res.success) {
        setFormSubmitted(true);
        // Clear input values
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        setFormError(res.error || "Failed to send message.");
      }
    });
  };

  return (
    <div className="min-h-screen text-slate-850 dark:text-slate-100 bg-white dark:bg-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white" 
            style={{ backgroundColor: primaryColor }}
          >
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            {project.name}
          </span>
        </div>
        <div className="flex gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <a href="#hero" className="hover:opacity-85">Home</a>
          <a href="#services" className="hover:opacity-85">Services</a>
          {project.generated_content.contactFormEnabled && (
            <a href="#contact" className="hover:opacity-85">Contact</a>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-24 px-6 text-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/30 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white max-w-2xl mx-auto mb-6">
          {project.generated_content.heroHeading || `Welcome to ${project.name}`}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
          {project.generated_content.heroSubheading || project.business_info.description}
        </p>
        <button 
          className="px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/10 transition-all active:scale-95 hover:brightness-105"
          style={{ 
            backgroundColor: primaryColor, 
            borderRadius: borderRadiusClass === "rounded-none" ? "0px" : borderRadiusClass === "rounded-xl" ? "12px" : "24px" 
          }}
        >
          {project.generated_content.heroCtaText || "Get Started"}
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-2xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400 mb-2 block">Our Mission</span>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">About Us</h2>
        <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
          {project.generated_content.aboutText}
        </p>
      </section>

      {/* Services Section */}
      {(project.generated_content.services || []).length > 0 && (
        <section id="services" className="py-20 px-6 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-extrabold text-center text-slate-900 dark:text-white mb-12">What We Offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(project.generated_content.services || []).map((service, index) => (
                <div 
                  key={index} 
                  className={`p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm ${borderRadiusClass} text-center`}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-white" 
                    style={{ backgroundColor: primaryColor + "20" }}
                  >
                    <CheckCircle className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 truncate">{service.title}</h4>
                  <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {(project.generated_content.testimonials || []).length > 0 && (
        <section id="testimonials" className="py-20 px-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-extrabold text-center text-slate-900 dark:text-white mb-12">Client Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(project.generated_content.testimonials || []).map((test, i) => (
              <div 
                key={i} 
                className={`p-6 bg-slate-50 dark:bg-slate-900/35 border border-slate-150 dark:border-slate-850 ${borderRadiusClass}`}
              >
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed mb-4">"{test.text}"</p>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">{test.name}</h5>
                  <p className="text-[10px] text-slate-400">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Form & Info */}
      {project.generated_content.contactFormEnabled && (
        <section id="contact" className="py-20 px-6 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Info details */}
            <div className="space-y-6 text-sm font-semibold">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Get in Touch</h3>
              {project.business_info.address && (
                <div className="flex gap-3 text-slate-500 dark:text-slate-400">
                  <MapPin className="w-5 h-5 shrink-0 text-indigo-500" />
                  <span>{project.business_info.address}</span>
                </div>
              )}
              {project.business_info.phone && (
                <div className="flex gap-3 text-slate-500 dark:text-slate-400">
                  <Phone className="w-5 h-5 shrink-0 text-indigo-500" />
                  <span>{project.business_info.phone}</span>
                </div>
              )}
              {project.business_info.email && (
                <div className="flex gap-3 text-slate-500 dark:text-slate-400">
                  <Mail className="w-5 h-5 shrink-0 text-indigo-500" />
                  <span className="truncate">{project.business_info.email}</span>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formSubmitted && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-xs font-semibold text-emerald-700 dark:text-emerald-350 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Your message has been sent successfully!</span>
                </div>
              )}
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-xs font-semibold text-red-700 dark:text-red-300">
                  {formError}
                </div>
              )}

              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <textarea
                name="message"
                required
                placeholder="Your Message..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 text-xs font-bold text-white flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all hover:brightness-105"
                style={{ 
                  backgroundColor: primaryColor, 
                  borderRadius: borderRadiusClass === "rounded-none" ? "0px" : borderRadiusClass === "rounded-xl" ? "8px" : "16px" 
                }}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isPending ? "Sending message..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-slate-100 dark:border-slate-800 text-xs text-slate-450 dark:text-slate-400 mt-auto bg-slate-50 dark:bg-slate-950/20">
        <p>{project.generated_content.footerText || `© ${new Date().getFullYear()} ${project.name}. All rights reserved.`}</p>
        <p className="mt-1 opacity-70">Powered by SiteForge AI</p>
      </footer>
    </div>
  );
}
