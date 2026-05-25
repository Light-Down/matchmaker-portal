import Link from "next/link";
import { ArrowRight, CheckCircle2, LogOut, MessageCircle, UsersRound } from "lucide-react";
import { adminLogoutAction, createClientAction } from "./actions";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAdminClients, type AdminClientSummary } from "@/lib/neon";
import { processSteps } from "@/lib/portal-content";

function statusLabel(status: AdminClientSummary["consultation_status"]) {
  const labels = {
    none: "Nicht angefragt",
    requested: "WhatsApp angefragt",
    scheduled: "Geplant",
    completed: "Erledigt"
  };
  return labels[status];
}

function shootingStatusLabel(status: AdminClientSummary["shooting_status"]) {
  const labels = {
    none: "Nicht geplant",
    scheduled: "Geplant",
    completed: "Erledigt"
  };
  return labels[status];
}

function dateLabel(value?: string | null) {
  if (!value) return "Kein Termin";
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export default async function AdminPage() {
  await requireAdminSession();
  const clients = await getAdminClients();

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="portal-noise fixed inset-0 opacity-[0.055]" aria-hidden />
      <section className="relative mx-auto w-full max-w-7xl px-5 py-8 md:px-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose">
              Matchmaker Admin
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Kunden</h1>
          </div>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-black text-white/70 transition hover:border-rose/45 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Ausloggen
            </button>
          </form>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Metric label="Kunden" value={String(clients.length)} />
          <Metric
            label="Onboarding fertig"
            value={String(clients.filter((client) => client.onboarding_submitted).length)}
          />
          <Metric
            label="WhatsApp offen"
            value={String(clients.filter((client) => client.consultation_status === "requested").length)}
          />
          <Metric
            label="Shootings geplant"
            value={String(clients.filter((client) => client.shooting_status === "scheduled").length)}
          />
        </div>

        <form action={createClientAction} className="portal-panel mt-6 grid gap-3 rounded-lg p-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/38">
              Name
            </span>
            <input
              name="fullName"
              className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-rose/60"
              placeholder="Max Schmidt"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/38">
              E-Mail
            </span>
            <input
              name="email"
              type="email"
              className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-rose/60"
              placeholder="kunde@example.com"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/38">
              Paket
            </span>
            <input
              name="packageName"
              className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-rose/60"
              defaultValue="Match-Magnet"
              required
            />
          </label>
          <button
            type="submit"
            className="portal-next-cta flex h-11 items-center justify-center rounded-lg px-5 text-sm font-black text-white transition hover:scale-[1.01]"
          >
            Kunde anlegen
          </button>
        </form>

        <div className="portal-panel mt-6 overflow-hidden rounded-lg">
          <div className="border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] text-rose">
                <UsersRound className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-black">Kundenübersicht</h2>
                <p className="text-sm text-white/45">Status prüfen und Kundendetail öffnen.</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {clients.map((client) => (
              <Link
                key={client.id}
                href={`/admin/clients/${client.id}`}
                className="grid gap-4 px-5 py-4 transition hover:bg-white/[0.035] lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.9fr_0.9fr_44px] lg:items-center"
              >
                <div>
                  <p className="font-black">{client.full_name}</p>
                  <p className="mt-1 text-sm text-white/48">{client.email}</p>
                </div>
                <AdminCell label="Paket" value={client.package_name} />
                <AdminCell
                  label="Phase"
                  value={processSteps[Math.max(0, client.current_step - 1)]?.label || "Unklar"}
                />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Vorgespräch
                  </p>
                  <p className="mt-1 text-sm font-black">{statusLabel(client.consultation_status)}</p>
                  <p className="mt-1 text-xs text-white/42">
                    {client.consultation_status === "scheduled"
                      ? dateLabel(client.consultation_at)
                      : client.whatsapp_requested_at
                        ? "WhatsApp geklickt"
                    : "Noch kein Kontakt"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Shooting
                  </p>
                  <p className="mt-1 text-sm font-black">{shootingStatusLabel(client.shooting_status)}</p>
                  <p className="mt-1 text-xs text-white/42">{dateLabel(client.shooting_at)}</p>
                </div>
                <span className="hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/50 lg:flex">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/38">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function AdminCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{label}</p>
      <p className="mt-1 text-sm font-black text-white/86">{value}</p>
    </div>
  );
}
