import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  Rocket,
  Send
} from "lucide-react";
import {
  completeConsultationAction,
  completeShootingAction,
  markConsultationRequestedAction,
  scheduleConsultationAction,
  scheduleShootingAction,
  unlockShootingAction
} from "../../actions";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  getAdminClientDetail,
  type ClientEvent,
  type ClientRecord,
  type ConsultationStatus,
  type ShootingStatus
} from "@/lib/neon";
import { onboardingQuestions, processSteps } from "@/lib/portal-content";

function formatDateTime(value?: string | null) {
  if (!value) return "Nicht gesetzt";
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function statusLabel(status: ConsultationStatus) {
  const labels = {
    none: "Nicht angefragt",
    requested: "WhatsApp angefragt",
    scheduled: "Vorgespräch geplant",
    completed: "Vorgespräch erledigt"
  };
  return labels[status];
}

function shootingStatusLabel(status: ShootingStatus) {
  const labels = {
    none: "Noch nicht geplant",
    scheduled: "Shooting geplant",
    completed: "Shooting erledigt"
  };
  return labels[status];
}

function eventLabel(event: ClientEvent) {
  const labels: Record<string, string> = {
    onboarding_submitted: "Onboarding abgeschickt",
    whatsapp_call_request_clicked: "WhatsApp-Anfrage geklickt",
    consultation_scheduled: "Vorgespräch geplant",
    consultation_completed: "Vorgespräch erledigt",
    shooting_unlocked: "Shooting freigeschaltet",
    shooting_scheduled: "Shooting geplant",
    shooting_completed: "Shooting erledigt"
  };
  return labels[event.event_type] || event.event_type;
}

function toDateTimeLocal(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 16);
}

export default async function AdminClientDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const detail = await getAdminClientDetail(id);
  if (!detail) notFound();

  const { client, answers, submitted, events } = detail;
  const phase = processSteps[Math.max(0, client.current_step - 1)]?.label || "Unklar";

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="portal-noise fixed inset-0 opacity-[0.055]" aria-hidden />
      <section className="relative mx-auto w-full max-w-7xl px-5 py-8 md:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-black text-white/56 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Zur Übersicht
        </Link>

        <header className="mt-6 grid gap-5 border-b border-white/10 pb-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose">
              Kundendetail
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              {client.full_name}
            </h1>
            <p className="mt-3 text-sm text-white/48">{client.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StatusBox label="Paket" value={client.package_name} />
            <StatusBox label="Phase" value={phase} />
            <StatusBox label="Onboarding" value={submitted ? "Fertig" : "Offen"} />
            <StatusBox label="Vorgespräch" value={statusLabel(client.consultation_status)} />
            <StatusBox label="Shooting" value={shootingStatusLabel(client.shooting_status)} />
            <StatusBox label="Shooting-Termin" value={formatDateTime(client.shooting_at)} />
          </div>
        </header>

        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-5">
            <div className="portal-panel rounded-lg p-5 md:p-6">
              <h2 className="text-2xl font-black tracking-tight">Onboarding-Antworten</h2>
              <div className="mt-5 space-y-3">
                {onboardingQuestions.map((question) => (
                  <article key={question.id} className="rounded-lg border border-white/10 bg-black/16 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan">
                      {question.label}
                    </p>
                    <h3 className="mt-2 text-lg font-black">{question.title}</h3>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/66">
                      {answers[question.id] || "Noch keine Antwort."}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="portal-panel rounded-lg p-5 md:p-6">
              <h2 className="text-2xl font-black tracking-tight">Timeline</h2>
              <div className="mt-5 space-y-3">
                {events.length ? (
                  events.map((event) => (
                    <article
                      key={event.id}
                      className="grid gap-3 rounded-lg border border-white/10 bg-black/16 p-4 md:grid-cols-[150px_minmax(0,1fr)]"
                    >
                      <p className="text-xs font-bold text-white/42">
                        {formatDateTime(event.created_at)}
                      </p>
                      <div>
                        <p className="text-sm font-black">{eventLabel(event)}</p>
                        {Object.keys(event.payload || {}).length ? (
                          <pre className="mt-2 overflow-auto rounded-lg bg-white/[0.035] p-3 text-xs text-white/50">
                            {JSON.stringify(event.payload, null, 2)}
                          </pre>
                        ) : null}
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="rounded-lg border border-white/10 bg-black/16 p-5 text-sm text-white/50">
                    Noch keine Events.
                  </p>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <NextActionPanel client={client} submitted={submitted} />
            <ManualCorrectionPanel client={client} />
          </aside>
        </div>
      </section>
    </main>
  );
}

function PanelTitle({
  icon,
  kicker,
  title,
  detail
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose/15 text-rose">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose">{kicker}</p>
        <h2 className="mt-1 text-xl font-black tracking-tight">{title}</h2>
        {detail ? <p className="mt-1 text-xs text-white/48">{detail}</p> : null}
      </div>
    </div>
  );
}

function NextActionPanel({
  client,
  submitted
}: {
  client: ClientRecord;
  submitted: boolean;
}) {
  if (!submitted) {
    return (
      <div className="portal-panel rounded-lg p-5">
        <PanelTitle
          icon={<MessageCircle className="h-5 w-5" />}
          kicker="Nächster Schritt"
          title="Warten auf Onboarding"
          detail="Noch keine Freigabe nötig"
        />
        <p className="mt-5 text-sm leading-6 text-white/62">
          Sobald der Kunde das Onboarding abschickt, erscheint hier automatisch die nächste
          sinnvolle Aktion. Antworten kannst du trotzdem schon links mitlesen.
        </p>
      </div>
    );
  }

  if (client.consultation_status === "none" && client.current_step < 4) {
    return (
      <div className="portal-panel rounded-lg p-5">
        <PanelTitle
          icon={<Send className="h-5 w-5" />}
          kicker="Nächster Schritt"
          title="WhatsApp-Anfrage erfassen"
          detail="Onboarding ist fertig"
        />
        <p className="mt-5 text-sm leading-6 text-white/62">
          Wenn der Kunde sich per WhatsApp gemeldet hat, markierst du genau das hier. Danach geht es
          sauber weiter zum Termin.
        </p>
        <form action={markConsultationRequestedAction} className="mt-5">
          <input type="hidden" name="clientId" value={client.id} />
          <button
            type="submit"
            className="portal-next-cta flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-black text-white transition hover:scale-[1.01]"
          >
            <Send className="h-4 w-4" />
            WhatsApp-Anfrage markieren
          </button>
        </form>
      </div>
    );
  }

  if (client.consultation_status === "requested" && client.current_step < 4) {
    return (
      <div className="portal-panel rounded-lg p-5">
        <PanelTitle
          icon={<CalendarCheck className="h-5 w-5" />}
          kicker="Nächster Schritt"
          title="Vorgespräch planen"
          detail="Anfrage liegt vor"
        />
        <form action={scheduleConsultationAction} className="mt-5 space-y-3">
          <input type="hidden" name="clientId" value={client.id} />
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/38">
              Termin
            </span>
            <input
              name="consultationAt"
              type="datetime-local"
              defaultValue={toDateTimeLocal(client.consultation_at)}
              className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-rose/60"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/38">
              Interne Notiz
            </span>
            <textarea
              name="note"
              defaultValue={client.consultation_note || ""}
              className="min-h-[92px] w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-rose/60"
              placeholder="Kurz notieren, was wichtig ist..."
            />
          </label>
          <button
            type="submit"
            className="portal-next-cta flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-black text-white transition hover:scale-[1.01]"
          >
            <CalendarCheck className="h-4 w-4" />
            Termin speichern
          </button>
        </form>
      </div>
    );
  }

  if (client.consultation_status === "scheduled" && client.current_step < 4) {
    return (
      <div className="portal-panel rounded-lg p-5">
        <PanelTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          kicker="Nächster Schritt"
          title="Vorgespräch abschließen"
          detail={formatDateTime(client.consultation_at)}
        />
        <p className="mt-5 text-sm leading-6 text-white/62">
          Nach dem Call markierst du das Gespräch als erledigt. Erst danach wird das Shooting
          bewusst freigeschaltet.
        </p>
        <form action={completeConsultationAction} className="mt-5">
          <input type="hidden" name="clientId" value={client.id} />
          <button
            type="submit"
            className="portal-next-cta flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-black text-white transition hover:scale-[1.01]"
          >
            <CheckCircle2 className="h-4 w-4" />
            Gespräch als erledigt markieren
          </button>
        </form>
      </div>
    );
  }

  if (client.consultation_status === "completed" && client.current_step < 4) {
    return (
      <div className="portal-panel rounded-lg p-5">
        <PanelTitle
          icon={<Rocket className="h-5 w-5" />}
          kicker="Nächster Schritt"
          title="Shooting freischalten"
          detail="Vorgespräch ist erledigt"
        />
        <p className="mt-5 text-sm leading-6 text-white/62">
          Damit wechselst du den Kunden sichtbar in die Shooting-Phase. Danach kannst du den
          Shooting-Termin eintragen oder später ändern.
        </p>
        <form action={unlockShootingAction} className="mt-5">
          <input type="hidden" name="clientId" value={client.id} />
          <button
            type="submit"
            className="accent-gradient flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-black text-white shadow-[0_0_26px_rgba(253,47,125,0.24)] transition hover:scale-[1.01]"
          >
            <Rocket className="h-4 w-4" />
            Shooting freischalten
          </button>
        </form>
      </div>
    );
  }

  if (client.shooting_status === "completed" || client.current_step >= 5) {
    return (
      <div className="portal-panel rounded-lg p-5">
        <PanelTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          kicker="Nächster Schritt"
          title="Lieferung vorbereiten"
          detail="Shooting ist erledigt"
        />
        <p className="mt-5 text-sm leading-6 text-white/62">
          Der Kunde steht jetzt im letzten Prozessschritt. Der Shooting-Termin bleibt sichtbar,
          aber der nächste Fokus ist die Lieferung der fertigen Fotos.
        </p>
        {client.shooting_at ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-black text-white/82">
            Shooting: {formatDateTime(client.shooting_at)}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="portal-panel rounded-lg p-5">
      <PanelTitle
        icon={<Rocket className="h-5 w-5" />}
        kicker="Nächster Schritt"
        title={client.shooting_status === "scheduled" ? "Shooting verwalten" : "Shooting planen"}
        detail={client.shooting_at ? formatDateTime(client.shooting_at) : "Kundenportal steht auf Shooting"}
      />
      <p className="mt-5 text-sm leading-6 text-white/62">
        Trage den Shooting-Termin ein oder ändere ihn später. Der Kunde sieht den Termin direkt im
        Kundenbereich.
      </p>
      <form action={scheduleShootingAction} className="mt-5 space-y-3">
        <input type="hidden" name="clientId" value={client.id} />
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/38">
            Shooting-Termin
          </span>
          <input
            name="shootingAt"
            type="datetime-local"
            defaultValue={toDateTimeLocal(client.shooting_at)}
            className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-rose/60"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/38">
            Interne Notiz
          </span>
          <textarea
            name="note"
            defaultValue={client.shooting_note || ""}
            className="min-h-[92px] w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none focus:border-rose/60"
            placeholder="Location, Treffpunkt, Outfit-Hinweis..."
          />
        </label>
        <button
          type="submit"
          className="portal-next-cta flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-black text-white transition hover:scale-[1.01]"
        >
          <CalendarCheck className="h-4 w-4" />
          Shooting-Termin speichern
        </button>
      </form>
      <form action={completeShootingAction} className="mt-3">
        <input type="hidden" name="clientId" value={client.id} />
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-sm font-black text-white/70 transition hover:border-cyan/45 hover:text-white"
        >
          <CheckCircle2 className="h-4 w-4" />
          Shooting als erledigt markieren
        </button>
      </form>
    </div>
  );
}

function ManualCorrectionPanel({ client }: { client: ClientRecord }) {
  return (
    <details className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
      <summary className="cursor-pointer text-sm font-black text-white/62 transition hover:text-white">
        Manuelle Korrektur
      </summary>
      <div className="mt-4 space-y-2">
        <form action={markConsultationRequestedAction}>
          <input type="hidden" name="clientId" value={client.id} />
          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-black text-white/58 transition hover:border-rose/45 hover:text-white"
          >
            <Send className="h-3.5 w-3.5" />
            Auf Anfrage setzen
          </button>
        </form>
        <form action={completeConsultationAction}>
          <input type="hidden" name="clientId" value={client.id} />
          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-black text-white/58 transition hover:border-cyan/45 hover:text-white"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Auf erledigt setzen
          </button>
        </form>
        <form action={unlockShootingAction}>
          <input type="hidden" name="clientId" value={client.id} />
          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-black text-white/58 transition hover:border-rose/45 hover:text-white"
          >
            <Rocket className="h-3.5 w-3.5" />
            Shooting erzwingen
          </button>
        </form>
        <form action={completeShootingAction}>
          <input type="hidden" name="clientId" value={client.id} />
          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-black text-white/58 transition hover:border-cyan/45 hover:text-white"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Shooting erledigt
          </button>
        </form>
      </div>
    </details>
  );
}

function StatusBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/36">{label}</p>
      <p className="mt-1 truncate text-sm font-black">{value}</p>
    </div>
  );
}
