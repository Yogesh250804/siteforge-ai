// ============================================================================
// Dashboard Header Component
// Top bar with mobile menu trigger, breadcrumb, and user avatar.
// ============================================================================

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  FolderOpen,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/actions/auth";

interface UserInfo {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  plan: string;
}

export function DashboardHeader({ userInfo }: { userInfo: UserInfo }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 lg:px-8 shrink-0">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb / Page title placeholder */}
        <div className="hidden lg:block">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Dashboard
          </h2>
        </div>

        {/* Right side: user avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              {userInfo.fullName}
            </p>
            <p className="text-[10px] text-slate-400">{userInfo.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400">
            {userInfo.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  SiteForge<span className="text-indigo-600">AI</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-3 space-y-1">
              {[
                { label: "Projects", href: "/dashboard", icon: LayoutDashboard },
                { label: "Templates", href: "/dashboard/templates", icon: FolderOpen },
                { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
                { label: "Settings", href: "/dashboard/settings", icon: Settings },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-100 dark:border-slate-800 p-3">
              <form action={logout}>
                <button
                  type="submit"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
