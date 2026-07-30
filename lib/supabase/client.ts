// ============================================================================
// Supabase Browser Client
// Used in Client Components ("use client") for auth state and real-time features.
// ============================================================================

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createBrowserClient(
    url,
    anonKey
  );
}
