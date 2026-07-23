"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";

export interface PricingPlan {
  title: string;
  priceMonthly: string;
  priceAnnual: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingMatrixProps {
  plans?: PricingPlan[];
  primaryColor?: string;
}

const defaultPlans: PricingPlan[] = [
  {
    title: "STARTER",
    priceMonthly: "$29",
    priceAnnual: "$19",
    description: "Perfect for independent creators and single site deployments.",
    features: ["1 Active AI Website", "Standard Presets", "Subdomain Hosting", "Vercel Deploy Tunnel"],
  },
  {
    title: "PRO BUSINESS",
    priceMonthly: "$79",
    priceAnnual: "$59",
    description: "Designed for scaling brands requiring custom apex domains.",
    features: [
      "Unlimited AI Websites",
      "Full Code Export (Next.js/React)",
      "Custom Apex Domain & SSL",
      "Priority Gemini 1.5 Pro Context",
    ],
    popular: true,
  },
  {
    title: "ENTERPRISE",
    priceMonthly: "$199",
    priceAnnual: "$149",
    description: "Dedicated infrastructure, custom SLAs, and white-label agent APIs.",
    features: [
      "Dedicated Server Tunnels",
      "White-Label Branding",
      "24/7 Priority SLA Support",
      "Custom AI System Rules",
    ],
  },
];

export function PricingMatrixSection({
  plans = defaultPlans,
  primaryColor = "#6366f1",
}: PricingMatrixProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <section className="py-16 px-6 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            Flexible Scaling Plans
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Transparent Pricing Built For Growth
          </h2>

          {/* Billing Cycle Switch */}
          <div className="inline-flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCycle === "monthly" ? "bg-slate-800 text-white" : "text-slate-400"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCycle === "annual" ? "bg-indigo-600 text-white" : "text-slate-400"
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                plan.popular
                  ? "bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-white">{plan.title}</h3>
                  {plan.popular && (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                      POPULAR
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-3xl font-extrabold text-white">
                    {billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-400 font-medium"> / month</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{plan.description}</p>

                <div className="border-t border-slate-800 pt-4 space-y-2">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full mt-6 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                }`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
