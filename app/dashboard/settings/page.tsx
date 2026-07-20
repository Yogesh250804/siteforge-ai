import React from "react";
import { Settings, Shield, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update your profile preferences and security credentials
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                disabled
                placeholder="User Profile"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold focus:outline-none opacity-70 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-500" />
            Security & Session
          </h2>
          <p className="text-xs text-slate-400">
            Account authenticated securely via Supabase.
          </p>
        </div>
      </div>
    </div>
  );
}
