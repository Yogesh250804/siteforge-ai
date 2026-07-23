"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ShieldCheck, Zap, Layers, ArrowUpRight } from "lucide-react";

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  colSpan?: "1" | "2" | "3";
  iconName?: string;
}

interface BentoGridSectionProps {
  title: string;
  subtitle?: string;
  items: BentoItem[];
  primaryColor?: string;
}

export function BentoGridSection({
  title,
  subtitle,
  items,
  primaryColor = "#6366f1",
}: BentoGridSectionProps) {
  return (
    <section className="py-16 px-6 bg-slate-950 text-white border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest mb-3 border border-white/10"
            style={{ backgroundColor: primaryColor + "15", color: primaryColor }}
          >
            Capabilities & Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Bento Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const spanClass =
              item.colSpan === "2"
                ? "md:col-span-2"
                : item.colSpan === "3"
                  ? "md:col-span-3"
                  : "md:col-span-1";

            return (
              <motion.div
                key={item.id || index}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative p-6 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/50 transition-all ${spanClass}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-sm"
                      style={{ backgroundColor: primaryColor + "20" }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
