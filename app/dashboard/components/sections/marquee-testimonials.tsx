"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

interface MarqueeTestimonialsProps {
  title?: string;
  testimonials: TestimonialItem[];
}

export function MarqueeTestimonials({
  title = "Trusted by Innovators Worldwide",
  testimonials,
}: MarqueeTestimonialsProps) {
  return (
    <section className="py-16 px-6 bg-slate-950 text-white border-t border-slate-800 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-center text-xs font-mono uppercase tracking-widest text-slate-400">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3 backdrop-blur-md hover:border-slate-700 transition-colors"
            >
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{t.text}"
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{t.role}</p>
                </div>
                <Quote className="w-4 h-4 text-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
