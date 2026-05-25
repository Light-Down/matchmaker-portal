import type { User } from "@supabase/supabase-js";
import { demoClient, type PortalClient } from "./demo-data";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
  hasSupabaseConfig
} from "./supabase-server";

export type ConsultationStatus = "none" | "requested" | "scheduled" | "completed";
export type ShootingStatus = "none" | "scheduled" | "completed";
export type SimulatorChatStatus = "active" | "completed" | "ghosted";

export type ClientRecord = {
  id: string;
  email: string;
  full_name: string;
  package_name: string;
  current_step: number;
  next_action: string;
  next_appointment: string;
  consultation_status: ConsultationStatus;
  consultation_at: string | null;
  consultation_note: string | null;
  shooting_status: ShootingStatus;
  shooting_at: string | null;
  shooting_note: string | null;
};

export type PortalStateRecord = {
  answers: Record<string, string>;
  questions: Record<string, string>;
  submitted: boolean;
};

export type SimulatorProfile = {
  name: string;
  age: number;
  bio: string;
};

export type SimulatorCoaching = {
  score: number;
  flow_score?: number;
  humor_score?: number;
  timing_score?: number;
  neediness_score?: number;
  analysis: string;
  ghost_risk: "low" | "medium" | "high";
  alternatives: string[];
  is_date_agreed: boolean;
  is_ghosted: boolean;
};

export type SimulatorMessage = {
  id: string;
  sender: "user" | "character";
  text: string;
  timestamp: string;
  coaching?: SimulatorCoaching;
};

export type SimulatorStateRecord = {
  userProfile: SimulatorProfile | null;
  activeChats: Record<string, { messages: SimulatorMessage[]; status: SimulatorChatStatus }>;
  completedMatchIds: string[];
  historicalStats: { dates: number; ghostings: number };
};

export type ClientEvent = {
  id: string;
  client_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
};

export type AdminClientSummary = ClientRecord & {
  onboarding_submitted: boolean;
  whatsapp_requested_at: string | null;
};

export type AdminClientDetail = {
  client: ClientRecord;
  answers: Record<string, string>;
  submitted: boolean;
  events: ClientEvent[];
};

type DbClient = {
  id: string;
  auth_user_id?: string | null;
  email: string;
  full_name: string;
  package_name: string;
  current_step: number;
  next_action: string;
  next_appointment: string;
};

type AppointmentRow = {
  kind: "consultation" | "shooting";
  status: ConsultationStatus | ShootingStatus;
  scheduled_at: string | null;
  note: string | null;
};

type SimulatorSessionRow = {
  id: string;
  character_id: string;
  status: SimulatorChatStatus;
  outcome: "date" | "ghosted" | null;
};

type SimulatorMessageRow = {
  id: string;
  session_id: string;
  sender: "user" | "character";
  body: string;
  coaching: SimulatorCoaching | null;
  created_at: string;
};

const nowIso = () => new Date().toISOString();

type DemoStore = {
  client: ClientRecord;
  answers: Record<string, string>;
  submitted: boolean;
  events: ClientEvent[];
};

declare global {
  var __matchmakerDemoStore: DemoStore | undefined;
}

const demoStore =
  globalThis.__matchmakerDemoStore ??
  (globalThis.__matchmakerDemoStore = {
    client: toClientRecord(demoClient),
    answers: {},
    submitted: false,
    events: []
  });

function toClientRecord(client: PortalClient): ClientRecord {
  return {
    id: client.id,
    email: client.email,
    full_name: client.name,
    package_name: client.packageName,
    current_step: client.currentStep,
    next_action: client.nextAction,
    next_appointment: client.nextAppointment,
    consultation_status: client.consultationStatus || "none",
    consultation_at: client.consultationAt || null,
    consultation_note: client.consultationNote || null,
    shooting_status: client.shootingStatus || "none",
    shooting_at: client.shootingAt || null,
    shooting_note: client.shootingNote || null
  };
}

export function toPortalClient(record: ClientRecord): PortalClient {
  return {
    id: record.id,
    email: record.email,
    name: record.full_name,
    packageName: record.package_name,
    currentStep: record.current_step,
    nextAction: record.next_action,
    nextAppointment: record.next_appointment,
    consultationStatus: record.consultation_status,
    consultationAt: record.consultation_at,
    consultationNote: record.consultation_note,
    shootingStatus: record.shooting_status,
    shootingAt: record.shooting_at,
    shootingNote: record.shooting_note
  };
}

function formatMessageTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function demoEvent(eventType: string, payload: Record<string, unknown> = {}) {
  demoStore.events.unshift({
    id: `demo-event-${demoStore.events.length + 1}`,
    client_id: demoStore.client.id,
    event_type: eventType,
    payload,
    created_at: nowIso()
  });
}

function emptySimulatorState(): SimulatorStateRecord {
  return {
    userProfile: null,
    activeChats: {},
    completedMatchIds: [],
    historicalStats: { dates: 0, ghostings: 0 }
  };
}

function appointmentFor(appointments: AppointmentRow[], kind: "consultation" | "shooting") {
  return appointments.find((appointment) => appointment.kind === kind);
}

function mergeClientAppointments(client: DbClient, appointments: AppointmentRow[]): ClientRecord {
  const consultation = appointmentFor(appointments, "consultation");
  const shooting = appointmentFor(appointments, "shooting");

  return {
    id: client.id,
    email: client.email,
    full_name: client.full_name,
    package_name: client.package_name,
    current_step: client.current_step,
    next_action: client.next_action,
    next_appointment: client.next_appointment,
    consultation_status: (consultation?.status as ConsultationStatus | undefined) || "none",
    consultation_at: consultation?.scheduled_at || null,
    consultation_note: consultation?.note || null,
    shooting_status: (shooting?.status as ShootingStatus | undefined) || "none",
    shooting_at: shooting?.scheduled_at || null,
    shooting_note: shooting?.note || null
  };
}

async function hydrateClients(rows: DbClient[]) {
  if (!rows.length) return [];
  const admin = createSupabaseAdminClient();
  const { data: appointments, error } = await admin
    .from("appointments")
    .select("kind,status,scheduled_at,note,client_id")
    .in(
      "client_id",
      rows.map((row) => row.id)
    );

  if (error) throw error;

  return rows.map((row) =>
    mergeClientAppointments(
      row,
      ((appointments || []) as Array<AppointmentRow & { client_id: string }>).filter(
        (appointment) => appointment.client_id === row.id
      )
    )
  );
}

export function hasNeonDatabase() {
  return hasSupabaseConfig();
}

export async function getCurrentUser() {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}

export async function getClientByEmail(email: string) {
  if (!hasSupabaseConfig()) {
    return demoStore.client.email.toLowerCase() === email.toLowerCase() ? demoStore.client : null;
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("clients")
    .select("id,email,full_name,package_name,current_step,next_action,next_appointment")
    .eq("email", email.toLowerCase())
    .in("status", ["invited", "active"])
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  const [client] = await hydrateClients([data as DbClient]);
  return client || null;
}

export async function ensureClientForUser(user: User) {
  if (!hasSupabaseConfig()) return demoStore.client;
  const email = user.email?.toLowerCase();
  if (!email) return null;

  const admin = createSupabaseAdminClient();
  const selectColumns = "id,email,full_name,package_name,current_step,next_action,next_appointment";

  const existing = await admin
    .from("clients")
    .select(selectColumns)
    .eq("auth_user_id", user.id)
    .in("status", ["invited", "active"])
    .maybeSingle();

  if (existing.error) throw existing.error;
  if (existing.data) {
    const [client] = await hydrateClients([existing.data as DbClient]);
    return client || null;
  }

  const linked = await admin
    .from("clients")
    .update({ auth_user_id: user.id, status: "active" })
    .eq("email", email)
    .is("auth_user_id", null)
    .in("status", ["invited", "active"])
    .select(selectColumns)
    .maybeSingle();

  if (linked.error) throw linked.error;
  if (!linked.data) return null;

  const [client] = await hydrateClients([linked.data as DbClient]);
  return client || null;
}

export async function getCurrentClient() {
  const user = await getCurrentUser();
  if (!user) return null;
  return ensureClientForUser(user);
}

export async function getClientById(clientId: string) {
  if (!hasSupabaseConfig()) {
    return demoStore.client.id === clientId ? demoStore.client : null;
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("clients")
    .select("id,email,full_name,package_name,current_step,next_action,next_appointment")
    .eq("id", clientId)
    .in("status", ["invited", "active", "paused", "completed"])
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  const [client] = await hydrateClients([data as DbClient]);
  return client || null;
}

export async function getClientPortalState(clientId: string): Promise<PortalStateRecord> {
  if (!hasSupabaseConfig()) {
    return {
      answers: demoStore.client.id === clientId ? demoStore.answers : {},
      questions: {},
      submitted: demoStore.client.id === clientId ? demoStore.submitted : false
    };
  }

  const supabase = await createSupabaseServerClient();
  const [answers, memories] = await Promise.all([
    supabase
      .from("onboarding_answers")
      .select("question_key,answer,submitted_at")
      .eq("client_id", clientId),
    supabase
      .from("coach_memories")
      .select("memory_key,content")
      .eq("client_id", clientId)
      .eq("source", "customer_question")
  ]);

  if (answers.error) throw answers.error;
  if (memories.error) throw memories.error;

  const answerRows = answers.data || [];
  return {
    answers: Object.fromEntries(
      answerRows.map((row) => [String(row.question_key), String(row.answer || "")])
    ),
    questions: Object.fromEntries(
      (memories.data || []).map((row) => [String(row.memory_key), String(row.content || "")])
    ),
    submitted: answerRows.some((row) => row.submitted_at)
  };
}

export async function upsertOnboardingAnswer(clientId: string, questionKey: string, answer: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) demoStore.answers[questionKey] = answer;
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("onboarding_answers").upsert(
    {
      client_id: clientId,
      question_key: questionKey,
      answer
    },
    { onConflict: "client_id,question_key" }
  );
  if (error) throw error;
}

export async function upsertOnboardingAnswers(clientId: string, answers: Record<string, string>) {
  const entries = Object.entries(answers);
  if (!entries.length) return;

  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) demoStore.answers = { ...demoStore.answers, ...answers };
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("onboarding_answers").upsert(
    entries.map(([questionKey, answer]) => ({
      client_id: clientId,
      question_key: questionKey,
      answer
    })),
    { onConflict: "client_id,question_key" }
  );
  if (error) throw error;
}

export async function markOnboardingSubmitted(clientId: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) {
      demoStore.submitted = true;
      demoStore.client.current_step = Math.max(demoStore.client.current_step, 3);
      demoStore.client.next_action = "Vorgespräch anfragen";
      demoEvent("onboarding_submitted");
    }
    return;
  }

  const admin = createSupabaseAdminClient();
  const [answers] = await Promise.all([
    admin
      .from("onboarding_answers")
      .update({ submitted_at: new Date().toISOString() })
      .eq("client_id", clientId)
      .is("submitted_at", null),
    updateClientProgress(clientId, { next_action: "Vorgespräch anfragen" }, 3)
  ]);

  if (answers.error) throw answers.error;
  await recordClientEvent(clientId, "onboarding_submitted");
}

export async function upsertCustomerQuestion(clientId: string, promptKey: string, body: string) {
  if (!hasSupabaseConfig()) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("coach_memories").upsert(
    {
      client_id: clientId,
      memory_key: promptKey,
      content: body,
      source: "customer_question"
    },
    { onConflict: "client_id,memory_key" }
  );
  if (error) throw error;
}

export async function recordClientEvent(
  clientId: string,
  eventType: string,
  payload: Record<string, unknown> = {}
) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) demoEvent(eventType, payload);
    return;
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("portal_events").insert({
    client_id: clientId,
    event_type: eventType,
    payload
  });
  if (error) throw error;
}

async function upsertAppointment(
  clientId: string,
  kind: "consultation" | "shooting",
  status: ConsultationStatus | ShootingStatus,
  scheduledAt?: string,
  note?: string
) {
  const admin = createSupabaseAdminClient();
  const payload: Record<string, unknown> = {
    client_id: clientId,
    kind,
    status
  };

  if (scheduledAt !== undefined) {
    payload.scheduled_at = scheduledAt ? new Date(scheduledAt).toISOString() : null;
  }
  if (note !== undefined) {
    payload.note = note || null;
  }

  const { error } = await admin.from("appointments").upsert(
    payload,
    { onConflict: "client_id,kind" }
  );
  if (error) throw error;
}

async function updateClientProgress(
  clientId: string,
  values: Record<string, unknown>,
  minimumStep: number
) {
  const admin = createSupabaseAdminClient();
  const { data: current, error: currentError } = await admin
    .from("clients")
    .select("current_step")
    .eq("id", clientId)
    .maybeSingle();

  if (currentError) throw currentError;

  const { error } = await admin
    .from("clients")
    .update({
      ...values,
      current_step: Math.max(Number(current?.current_step || 1), minimumStep)
    })
    .eq("id", clientId);

  if (error) throw error;
}

export async function markConsultationRequested(clientId: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) {
      demoStore.submitted = true;
      demoStore.client.consultation_status = "requested";
      demoStore.client.current_step = Math.max(demoStore.client.current_step, 3);
      demoStore.client.next_action = "WhatsApp-Anfrage gesendet";
      demoEvent("whatsapp_call_request_clicked");
    }
    return;
  }

  const [appointment] = await Promise.all([
    upsertAppointment(clientId, "consultation", "requested"),
    updateClientProgress(clientId, { next_action: "WhatsApp-Anfrage gesendet" }, 3)
  ]);

  await appointment;
  await recordClientEvent(clientId, "whatsapp_call_request_clicked");
}

export async function scheduleConsultation(clientId: string, consultationAt: string, note: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) {
      demoStore.client.consultation_status = "scheduled";
      demoStore.client.consultation_at = consultationAt || null;
      demoStore.client.consultation_note = note || null;
      demoStore.client.current_step = Math.max(demoStore.client.current_step, 3);
      demoStore.client.next_action = "Vorgespräch geplant";
      demoStore.client.next_appointment = consultationAt || "Vorgespräch geplant";
      demoEvent("consultation_scheduled", { consultationAt, note });
    }
    return;
  }

  const [appointment] = await Promise.all([
    upsertAppointment(clientId, "consultation", "scheduled", consultationAt, note),
    updateClientProgress(
      clientId,
      {
        next_action: "Vorgespräch geplant",
        next_appointment: consultationAt || "Vorgespräch geplant"
      },
      3
    )
  ]);

  await appointment;
  await recordClientEvent(clientId, "consultation_scheduled", { consultationAt, note });
}

export async function completeConsultation(clientId: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) {
      demoStore.client.consultation_status = "completed";
      demoStore.client.current_step = Math.max(demoStore.client.current_step, 3);
      demoStore.client.next_action = "Shooting vorbereiten";
      demoEvent("consultation_completed");
    }
    return;
  }

  const [appointment] = await Promise.all([
    upsertAppointment(clientId, "consultation", "completed"),
    updateClientProgress(clientId, { next_action: "Shooting vorbereiten" }, 3)
  ]);

  await appointment;
  await recordClientEvent(clientId, "consultation_completed");
}

export async function unlockShooting(clientId: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) {
      demoStore.client.current_step = 4;
      demoStore.client.next_action = "Shooting-Termin planen";
      demoEvent("shooting_unlocked");
    }
    return;
  }

  await updateClientProgress(clientId, { next_action: "Shooting-Termin planen" }, 4);
  await recordClientEvent(clientId, "shooting_unlocked");
}

export async function scheduleShooting(clientId: string, shootingAt: string, note: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) {
      demoStore.client.shooting_status = "scheduled";
      demoStore.client.shooting_at = shootingAt || null;
      demoStore.client.shooting_note = note || null;
      demoStore.client.current_step = Math.max(demoStore.client.current_step, 4);
      demoStore.client.next_action = "Shooting geplant";
      demoStore.client.next_appointment = shootingAt || "Shooting geplant";
      demoEvent("shooting_scheduled", { shootingAt, note });
    }
    return;
  }

  const [appointment] = await Promise.all([
    upsertAppointment(clientId, "shooting", "scheduled", shootingAt, note),
    updateClientProgress(
      clientId,
      {
        next_action: "Shooting geplant",
        next_appointment: shootingAt || "Shooting geplant"
      },
      4
    )
  ]);

  await appointment;
  await recordClientEvent(clientId, "shooting_scheduled", { shootingAt, note });
}

export async function completeShooting(clientId: string) {
  if (!hasSupabaseConfig()) {
    if (demoStore.client.id === clientId) {
      demoStore.client.shooting_status = "completed";
      demoStore.client.current_step = 5;
      demoStore.client.next_action = "Lieferung vorbereiten";
      demoEvent("shooting_completed");
    }
    return;
  }

  const [appointment] = await Promise.all([
    upsertAppointment(clientId, "shooting", "completed"),
    updateClientProgress(clientId, { next_action: "Lieferung vorbereiten" }, 5)
  ]);

  await appointment;
  await recordClientEvent(clientId, "shooting_completed");
}

export async function createClientInvite(email: string, fullName: string, packageName: string) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("clients").upsert(
    {
      email: email.trim().toLowerCase(),
      full_name: fullName.trim(),
      package_name: packageName.trim() || "Match-Magnet",
      status: "invited",
      current_step: 2,
      next_action: "Onboarding beantworten",
      next_appointment: "Vorgespräch noch nicht geplant"
    },
    { onConflict: "email" }
  );
  if (error) throw error;
}

export async function getAdminClients(): Promise<AdminClientSummary[]> {
  if (!hasSupabaseConfig()) {
    return [
      {
        ...demoStore.client,
        onboarding_submitted: demoStore.submitted || demoStore.client.current_step >= 3,
        whatsapp_requested_at:
          demoStore.events.find((event) => event.event_type === "whatsapp_call_request_clicked")
            ?.created_at || null
      }
    ];
  }

  const admin = createSupabaseAdminClient();
  const [clientRows, submittedRows, whatsappRows] = await Promise.all([
    admin
      .from("clients")
      .select("id,email,full_name,package_name,current_step,next_action,next_appointment")
      .order("created_at", { ascending: false }),
    admin
      .from("onboarding_answers")
      .select("client_id,submitted_at")
      .not("submitted_at", "is", null),
    admin
      .from("portal_events")
      .select("client_id,created_at")
      .eq("event_type", "whatsapp_call_request_clicked")
      .order("created_at", { ascending: false })
  ]);

  if (clientRows.error) throw clientRows.error;
  if (submittedRows.error) throw submittedRows.error;
  if (whatsappRows.error) throw whatsappRows.error;

  const clients = await hydrateClients((clientRows.data || []) as DbClient[]);
  const submitted = new Set((submittedRows.data || []).map((row) => String(row.client_id)));
  const whatsappByClient = new Map<string, string>();
  (whatsappRows.data || []).forEach((row) => {
    const clientId = String(row.client_id);
    if (!whatsappByClient.has(clientId)) whatsappByClient.set(clientId, String(row.created_at));
  });

  return clients.map((client) => ({
    ...client,
    onboarding_submitted: submitted.has(client.id) || client.current_step >= 3,
    whatsapp_requested_at: whatsappByClient.get(client.id) || null
  }));
}

export async function getAdminClientDetail(clientId: string): Promise<AdminClientDetail | null> {
  const client = await getClientById(clientId);
  if (!client) return null;

  if (!hasSupabaseConfig()) {
    return {
      client,
      answers: demoStore.answers,
      submitted: demoStore.submitted || client.current_step >= 3,
      events: demoStore.events
    };
  }

  const admin = createSupabaseAdminClient();
  const [answerRows, eventRows] = await Promise.all([
    admin
      .from("onboarding_answers")
      .select("question_key,answer,submitted_at")
      .eq("client_id", clientId)
      .order("updated_at", { ascending: false }),
    admin
      .from("portal_events")
      .select("id,client_id,event_type,payload,created_at")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(50)
  ]);

  if (answerRows.error) throw answerRows.error;
  if (eventRows.error) throw eventRows.error;

  const answers = answerRows.data || [];
  return {
    client,
    answers: Object.fromEntries(
      answers.map((row) => [String(row.question_key), String(row.answer || "")])
    ),
    submitted: answers.some((row) => row.submitted_at) || client.current_step >= 3,
    events: (eventRows.data || []) as ClientEvent[]
  };
}

export async function getClientSimulatorState(clientId: string): Promise<SimulatorStateRecord> {
  if (!hasSupabaseConfig()) return emptySimulatorState();

  const supabase = await createSupabaseServerClient();
  const [profileRes, sessionsRes, messagesRes] = await Promise.all([
    supabase
      .from("simulator_profiles")
      .select("display_name,age,bio")
      .eq("client_id", clientId)
      .maybeSingle(),
    supabase
      .from("simulator_sessions")
      .select("id,character_id,status,outcome")
      .eq("client_id", clientId)
      .order("created_at", { ascending: true }),
    supabase
      .from("simulator_messages")
      .select("id,session_id,sender,body,coaching,created_at")
      .eq("client_id", clientId)
      .order("sort_index", { ascending: true })
  ]);

  if (profileRes.error) throw profileRes.error;
  if (sessionsRes.error) throw sessionsRes.error;
  if (messagesRes.error) throw messagesRes.error;

  const messagesBySession = new Map<string, SimulatorMessage[]>();
  ((messagesRes.data || []) as SimulatorMessageRow[]).forEach((message) => {
    const list = messagesBySession.get(message.session_id) || [];
    list.push({
      id: message.id,
      sender: message.sender,
      text: message.body,
      timestamp: formatMessageTime(message.created_at),
      coaching: message.coaching || undefined
    });
    messagesBySession.set(message.session_id, list);
  });

  const activeChats: SimulatorStateRecord["activeChats"] = {};
  const completedMatchIds: string[] = [];
  const historicalStats = { dates: 0, ghostings: 0 };

  ((sessionsRes.data || []) as SimulatorSessionRow[]).forEach((session) => {
    activeChats[session.character_id] = {
      messages: messagesBySession.get(session.id) || [],
      status: session.status
    };

    if (session.status === "completed" || session.status === "ghosted") {
      completedMatchIds.push(session.character_id);
    }
    if (session.outcome === "date") historicalStats.dates += 1;
    if (session.outcome === "ghosted") historicalStats.ghostings += 1;
  });

  return {
    userProfile: profileRes.data
      ? {
          name: String(profileRes.data.display_name),
          age: Number(profileRes.data.age),
          bio: String(profileRes.data.bio || "")
        }
      : null,
    activeChats,
    completedMatchIds,
    historicalStats
  };
}

export async function saveSimulatorProfile(clientId: string, profile: SimulatorProfile) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("simulator_profiles").upsert(
    {
      client_id: clientId,
      display_name: profile.name,
      age: profile.age,
      bio: profile.bio
    },
    { onConflict: "client_id" }
  );
  if (error) throw error;
}

export async function resetSimulatorSession(clientId: string, characterId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("simulator_sessions")
    .delete()
    .eq("client_id", clientId)
    .eq("character_id", characterId);
  if (error) throw error;
}

export async function getOrCreateSimulatorSession(clientId: string, characterId: string) {
  const supabase = await createSupabaseServerClient();
  const existing = await supabase
    .from("simulator_sessions")
    .select("id,character_id,status,outcome")
    .eq("client_id", clientId)
    .eq("character_id", characterId)
    .maybeSingle();

  if (existing.error) throw existing.error;
  if (existing.data) return existing.data as SimulatorSessionRow;

  const created = await supabase
    .from("simulator_sessions")
    .insert({ client_id: clientId, character_id: characterId, status: "active" })
    .select("id,character_id,status,outcome")
    .single();

  if (created.error) throw created.error;
  return created.data as SimulatorSessionRow;
}

export async function getSimulatorMessages(clientId: string, sessionId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("simulator_messages")
    .select("id,session_id,sender,body,coaching,created_at")
    .eq("client_id", clientId)
    .eq("session_id", sessionId)
    .order("sort_index", { ascending: true });

  if (error) throw error;
  return (data || []) as SimulatorMessageRow[];
}

export async function appendSimulatorMessage({
  clientId,
  sessionId,
  sender,
  body,
  coaching,
  sortIndex
}: {
  clientId: string;
  sessionId: string;
  sender: "user" | "character";
  body: string;
  coaching?: SimulatorCoaching;
  sortIndex: number;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("simulator_messages").insert({
    client_id: clientId,
    session_id: sessionId,
    sender,
    body,
    coaching: coaching || null,
    sort_index: sortIndex
  });
  if (error) throw error;
}

export async function updateSimulatorSessionStatus(
  clientId: string,
  sessionId: string,
  status: SimulatorChatStatus
) {
  const outcome = status === "completed" ? "date" : status === "ghosted" ? "ghosted" : null;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("simulator_sessions")
    .update({
      status,
      outcome,
      ended_at: outcome ? new Date().toISOString() : null
    })
    .eq("client_id", clientId)
    .eq("id", sessionId);
  if (error) throw error;
}

export async function getCachedCoachReport(clientId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("coach_reports")
    .select("report")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) throw error;
  return (data?.report as Record<string, unknown> | undefined) || null;
}

export async function saveCoachReport(clientId: string, report: Record<string, unknown>) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("coach_reports").upsert(
    {
      client_id: clientId,
      report
    },
    { onConflict: "client_id" }
  );
  if (error) throw error;
}
