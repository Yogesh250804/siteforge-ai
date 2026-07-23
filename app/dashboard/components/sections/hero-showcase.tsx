"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface HeroShowcaseSectionProps {
  heading: string;
  subheading: string;
  ctaText: string;
  badge?: string;
  primaryColor?: string;
  variant?: "spotlight" | "cinematic" | "terminal";
}

export function HeroShowcaseSection({
  heading,
  subheading,
  ctaText,
  badge = "SiteForge Engine v2.5",
  primaryColor = "#6366f1",
  variant = "spotlight",
}: HeroShowcaseSectionProps) {
  return (
    <section className="relative py-20 px-6 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Ambient Glow Backlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">
            {badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-medium"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center gap-3 pt-2"
        >
          <button
            className="px-6 py-3.5 text-white font-bold text-xs rounded-xl shadow-xl transition-all flex items-center gap-2 active:scale-95 hover:scale-[1.02]"
            style={{ backgroundColor: primaryColor }}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
