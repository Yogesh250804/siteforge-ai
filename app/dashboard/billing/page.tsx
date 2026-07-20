import React from "react";
import { CreditCard, Check } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Billing & Plans
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your subscription and usage details
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400 uppercase tracking-wider">
              Current Plan
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2">
              Free Starter
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Perfect for building and testing layouts.
            </p>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            $0
          </span>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
          <h3 className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Plan Features
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
            {["1 Live Website", "Standard Presets", "Subdomain hosting", "AI site builder trial"].map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
