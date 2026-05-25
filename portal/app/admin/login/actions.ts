"use server";

import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  isAdminEmail,
  portalBaseUrl
} from "@/lib/supabase-server";

export async function adminLoginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!isAdminEmail(email)) {
    redirect("/admin/login?error=invalid");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${portalBaseUrl()}/auth/callback?next=/admin`,
      shouldCreateUser: true
    }
  });

  if (error) {
    redirect("/admin/login?error=send-failed");
  }

  redirect(`/admin/login?sent=1&email=${encodeURIComponent(email)}`);
}
