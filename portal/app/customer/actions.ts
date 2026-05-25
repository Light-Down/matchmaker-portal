"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getCurrentClient,
  markOnboardingSubmitted,
  resetSimulatorSession,
  saveSimulatorProfile,
  type SimulatorProfile,
  upsertCustomerQuestion,
  upsertOnboardingAnswer,
  upsertOnboardingAnswers
} from "@/lib/neon";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.startsWith("sb-")) cookieStore.delete(cookie.name);
  });
  redirect("/sign-in");
}

async function getSessionClientId() {
  const client = await getCurrentClient();
  return client?.id ?? null;
}

export async function saveOnboardingAnswerAction(questionKey: string, answer: string) {
  const clientId = await getSessionClientId();
  if (!clientId) return;

  await upsertOnboardingAnswer(clientId, questionKey, answer);
}

export async function submitOnboardingAction(answers?: Record<string, string>) {
  const clientId = await getSessionClientId();
  if (!clientId) return;

  if (answers) {
    await upsertOnboardingAnswers(clientId, answers);
  }

  await markOnboardingSubmitted(clientId);
}

export async function saveCustomerQuestionAction(promptKey: string, body: string) {
  const clientId = await getSessionClientId();
  if (!clientId) return;

  await upsertCustomerQuestion(clientId, promptKey, body);
}

export async function saveSimulatorProfileAction(profile: SimulatorProfile) {
  const clientId = await getSessionClientId();
  if (!clientId) return;

  await saveSimulatorProfile(clientId, profile);
}

export async function resetSimulatorSessionAction(characterId: string) {
  const clientId = await getSessionClientId();
  if (!clientId) return;

  await resetSimulatorSession(clientId, characterId);
}
