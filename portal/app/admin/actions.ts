"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  completeConsultation,
  completeShooting,
  createClientInvite,
  markConsultationRequested,
  scheduleConsultation,
  scheduleShooting,
  unlockShooting
} from "@/lib/neon";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { requireAdminSession } from "@/lib/admin-auth";

async function requireAdmin() {
  await requireAdminSession();
}

function clientIdFrom(formData: FormData) {
  return String(formData.get("clientId") || "");
}

export async function adminLogoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.startsWith("sb-")) cookieStore.delete(cookie.name);
  });
  redirect("/admin/login");
}

export async function createClientAction(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") || "");
  const fullName = String(formData.get("fullName") || "");
  const packageName = String(formData.get("packageName") || "Match-Magnet");

  if (!email || !fullName) return;

  await createClientInvite(email, fullName, packageName);
  revalidatePath("/admin");
}

export async function markConsultationRequestedAction(formData: FormData) {
  await requireAdmin();
  const clientId = clientIdFrom(formData);
  await markConsultationRequested(clientId);
  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function scheduleConsultationAction(formData: FormData) {
  await requireAdmin();
  const clientId = clientIdFrom(formData);
  const consultationAt = String(formData.get("consultationAt") || "");
  const note = String(formData.get("note") || "");
  await scheduleConsultation(clientId, consultationAt, note);
  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function completeConsultationAction(formData: FormData) {
  await requireAdmin();
  const clientId = clientIdFrom(formData);
  await completeConsultation(clientId);
  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function unlockShootingAction(formData: FormData) {
  await requireAdmin();
  const clientId = clientIdFrom(formData);
  await unlockShooting(clientId);
  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function scheduleShootingAction(formData: FormData) {
  await requireAdmin();
  const clientId = clientIdFrom(formData);
  const shootingAt = String(formData.get("shootingAt") || "");
  const note = String(formData.get("note") || "");
  await scheduleShooting(clientId, shootingAt, note);
  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function completeShootingAction(formData: FormData) {
  await requireAdmin();
  const clientId = clientIdFrom(formData);
  await completeShooting(clientId);
  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}
