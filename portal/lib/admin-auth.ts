import { redirect } from "next/navigation";
import { createSupabaseServerClient, isAdminEmail } from "./supabase-server";

export async function requireAdminSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login");
  }

  return user;
}
