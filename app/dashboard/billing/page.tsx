import React from "react";
import { CreditCard, Check, Sparkles, Zap } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Billing & Plans
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your subscription, features, and usage limits
        </p>
      </div>

      {/* Current Active Plan Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border border-indigo-100 dark:border-indigo-900/50">
              Current Active Plan
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-3">
              Free Starter
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Perfect for building and testing AI website layouts.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              $0
            </span>
            <span className="text-xs text-slate-400 font-medium"> / month</span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
          <h3 className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Plan Features Included
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {[
              "Unlimited Draft Websites",
              "Standard AI Site Generation",
              "Subdomain Public Hosting",
              "Vercel Deployment Tunnel",
            ].map((feat, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upgrade Tier Recommendation Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-700/40 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Pro Tier Coming Soon
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Unlock Custom Domains & Premium AI Models
            </h3>
            <p className="text-xs text-indigo-200/70 max-w-lg leading-relaxed">
              Export full React/Next.js codebases, remove SiteForge branding, and connect your custom apex domains with automated SSL.
            </p>
          </div>
          <button
            disabled
            className="px-5 py-3 bg-white/10 border border-white/20 text-white/80 text-xs font-bold rounded-xl cursor-not-allowed shrink-0"
          >
            Upgrade Available Soon
          </button>
        </div>
      </div>
    </div>
  );
}
