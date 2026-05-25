import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { ensureClientForUser } from "@/lib/neon";
import {
  createSupabaseServerClient,
  isAdminEmail,
  portalBaseUrl
} from "@/lib/supabase-server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/customer";

  if (!code) {
    redirect("/sign-in?error=invalid");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    redirect("/sign-in?error=send-failed");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?error=invalid");
  }

  if (next.startsWith("/admin")) {
    if (!isAdminEmail(user.email)) {
      await supabase.auth.signOut();
      redirect("/admin/login?error=invalid");
    }
    return NextResponse.redirect(`${portalBaseUrl()}${next}`);
  }

  const client = await ensureClientForUser(user);
  if (!client) {
    await supabase.auth.signOut();
    redirect("/sign-in?error=not-invited");
  }

  return NextResponse.redirect(`${portalBaseUrl()}${next}`);
}
