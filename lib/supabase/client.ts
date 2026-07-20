// ============================================================================
// Supabase Browser Client
// Used in Client Components ("use client") for auth state and real-time features.
// ============================================================================

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
