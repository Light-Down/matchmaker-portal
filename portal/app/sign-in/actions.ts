"use server";

import { redirect } from "next/navigation";
import { getClientByEmail } from "@/lib/neon";
import { createSupabaseServerClient, portalBaseUrl } from "@/lib/supabase-server";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    redirect("/sign-in?error=invalid");
  }

  const client = await getClientByEmail(email);
  if (!client) {
    redirect("/sign-in?error=not-invited");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${portalBaseUrl()}/auth/callback?next=/customer`,
      shouldCreateUser: true
    }
  });

  if (error) {
    redirect("/sign-in?error=send-failed");
  }

  redirect(`/sign-in?sent=1&email=${encodeURIComponent(email)}`);
}
