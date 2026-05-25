import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { signInAction } from "./actions";

const errorCopy: Record<string, string> = {
  invalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
  "not-invited": "Für diese E-Mail ist noch kein Kundenbereich freigeschaltet.",
  "send-failed": "Der Magic Link konnte gerade nicht versendet werden."
};

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ email?: string; error?: string; sent?: string }>;
}) {
  const params = await searchParams;
  const error = params.error ? errorCopy[params.error] : null;
  const sent = params.sent === "1";

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <div className="portal-noise fixed inset-0 opacity-[0.06]" aria-hidden />
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="max-w-2xl">
            <div className="mb-10">
              <p className="text-xl font-black tracking-tight">MATCHMAKER</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-rose">Frankfurt Kundenbereich</p>
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Dein Shooting beginnt vor dem Shooting.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/62">
              Logge dich mit deiner freigeschalteten E-Mail ein. Im Kundenbereich findest du Guide,
              Onboarding-Fragen, Vorgespräch und deinen persönlichen Prozess.
            </p>
          </div>

          <div className="portal-panel relative rounded-lg p-6">
            <Link
              href="/admin/login"
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/42 transition hover:border-rose/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose/70"
            >
              Mark&apos;s Login
            </Link>
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-rose">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Einloggen</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Gib deine freigeschaltete E-Mail ein. Du bekommst danach einen Magic Link fuer den
              sicheren Kundenbereich.
            </p>

            <form action={signInAction} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                  E-Mail
                </span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <input
                    name="email"
                    type="email"
                    defaultValue={params.email || ""}
                    className="h-[52px] w-full rounded-lg border border-white/10 bg-white/[0.04] py-4 pl-11 pr-4 text-sm text-white outline-none transition focus:border-rose/70"
                    placeholder="deine@email.de"
                    required
                  />
                </span>
              </label>

              {sent ? (
                <p className="rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan">
                  Magic Link ist unterwegs. Oeffne deine E-Mail auf diesem Geraet.
                </p>
              ) : null}

              {error ? (
                <p className="rounded-lg border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="accent-gradient flex w-full items-center justify-center gap-3 rounded-lg px-5 py-4 text-sm font-black text-white shadow-[0_0_28px_rgba(253,47,125,0.24)] transition hover:scale-[1.01]"
              >
                Magic Link senden
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
