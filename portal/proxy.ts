import type { NextRequest } from "next/server";
import { hasSupabaseConfig, updateSupabaseSession } from "./lib/supabase-server";

export async function proxy(request: NextRequest) {
  if (!hasSupabaseConfig()) {
    return;
  }

  return updateSupabaseSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
