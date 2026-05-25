import { LockKeyhole } from "lucide-react";
import { adminLoginAction } from "./actions";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ email?: string; error?: string; sent?: string }>;
}) {
  const params = await searchParams;
  const invalid = params.error === "invalid";
  const sendFailed = params.error === "send-failed";
  const sent = params.sent === "1";

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="portal-noise fixed inset-0 opacity-[0.055]" aria-hidden />
      <section className="relative mx-auto flex min-h-screen w-full max-w-md items-center px-6">
        <div className="portal-panel w-full rounded-lg p-6">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-rose">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose">
            Matchmaker Admin
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Einloggen</h1>
          <p className="mt-3 text-sm leading-6 text-white/56">
            Admin-Zugang laeuft ueber Supabase Magic Link. Nur E-Mails aus `ADMIN_EMAILS` duerfen
            den Adminbereich oeffnen.
          </p>

          <form action={adminLoginAction} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                Admin-E-Mail
              </span>
              <input
                name="email"
                type="email"
                defaultValue={params.email || ""}
                className="h-[52px] w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-rose/70"
                required
              />
            </label>

            {sent ? (
              <p className="rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan">
                Magic Link ist unterwegs.
              </p>
            ) : null}

            {invalid ? (
              <p className="rounded-lg border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
                Diese E-Mail ist nicht als Admin freigeschaltet.
              </p>
            ) : null}

            {sendFailed ? (
              <p className="rounded-lg border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
                Der Magic Link konnte gerade nicht versendet werden.
              </p>
            ) : null}

            <button
              type="submit"
              className="accent-gradient flex h-12 w-full items-center justify-center rounded-lg text-sm font-black text-white shadow-[0_0_28px_rgba(253,47,125,0.24)] transition hover:scale-[1.01]"
            >
              Magic Link senden
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
