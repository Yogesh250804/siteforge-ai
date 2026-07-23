import React from "react";
import { Settings, Shield, User, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userEmail = user?.email ?? "Not authenticated";
  const userFullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    userEmail.split("@")[0];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your profile details and security authentication credentials
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Profile Information
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                readOnly
                defaultValue={userFullName}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                readOnly
                defaultValue={userEmail}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Email is managed through your primary Supabase auth provider.
              </p>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Security & Authentication
          </h2>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Protected via Supabase SSR Authentication
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Your session is secured with HTTP-only cookies and Row-Level Security (RLS) policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
