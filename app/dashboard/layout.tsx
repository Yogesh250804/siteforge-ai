// ============================================================================
// Dashboard Layout
// Protected shell with sidebar navigation, header, and user info.
// Server Component — fetches user profile from Supabase.
// ============================================================================

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { DashboardHeader } from "./components/dashboard-header";

export const metadata = {
  title: "Dashboard — SiteForge AI",
  description: "Create, manage, and deploy AI-generated websites.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const userInfo = {
    id: user.id,
    email: user.email ?? "",
    fullName:
      profile?.full_name ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "User",
    avatarUrl:
      profile?.avatar_url ||
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null,
    plan: profile?.plan ?? "free",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <DashboardSidebar userInfo={userInfo} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader userInfo={userInfo} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
