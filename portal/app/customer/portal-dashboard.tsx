"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  LogOut,
  MessageCircle,
  Save,
  Send
} from "lucide-react";
import {
  logoutAction,
  resetSimulatorSessionAction,
  saveOnboardingAnswerAction,
  saveSimulatorProfileAction,
  submitOnboardingAction
} from "./actions";
import type { PortalClient } from "@/lib/demo-data";
import type { PortalStateRecord, SimulatorStateRecord } from "@/lib/neon";
import {
  guideSections,
  navItems,
  onboardingQuestions,
  processSteps,
  type PortalTab
} from "@/lib/portal-content";
import SimulatorView from "./chat-simulator/simulator-view";
import CoachingReportView from "./chat-simulator/coaching-report-view";
import type { ChatMessage } from "./chat-simulator/chat-arena";

type AnswerMap = Record<string, string>;
const callRequestHref = "/customer/whatsapp";
type NextActionState = {
  title: string;
  status: string;
  detail: string;
  copy: string;
  icon: "message" | "calendar" | "check";
  cta?: {
    label: string;
    kind: "tab" | "link";
    href?: string;
  };
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export default function PortalDashboard({
  client,
  initialSimulatorState,
  initialState
}: {
  client: PortalClient;
  initialSimulatorState: SimulatorStateRecord;
  initialState: PortalStateRecord;
}) {
  const [activeTab, setActiveTab] = useState<PortalTab>("onboarding");
  const [activeChats, setActiveChats] = useState<
    Record<
      string,
      {
        messages: ChatMessage[];
        status: "active" | "completed" | "ghosted";
      }
    >
  >(initialSimulatorState.activeChats);
  const [userProfile, setUserProfile] = useState<{ name: string; age: number; bio: string } | null>(
    initialSimulatorState.userProfile
  );
  const [completedMatchIds, setCompletedMatchIds] = useState<string[]>(
    initialSimulatorState.completedMatchIds
  );
  const [historicalStats, setHistoricalStats] = useState<{ dates: number; ghostings: number }>({
    dates: initialSimulatorState.historicalStats.dates,
    ghostings: initialSimulatorState.historicalStats.ghostings
  });

  useEffect(() => {
    setActiveChats(initialSimulatorState.activeChats);
  }, [initialSimulatorState.activeChats]);

  const handleRegisterFinishedRun = (characterId: string, outcome: "date" | "ghosted") => {
    setCompletedMatchIds((prev) => {
      if (!prev.includes(characterId)) {
        return [...prev, characterId];
      }
      return prev;
    });
    setHistoricalStats((prev) => ({
      dates: prev.dates + (outcome === "date" ? 1 : 0),
      ghostings: prev.ghostings + (outcome === "ghosted" ? 1 : 0)
    }));
  };
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>(initialState.answers);
  const [submitted, setSubmitted] = useState<boolean>(initialState.submitted);

  const answeredCount = onboardingQuestions.filter((question) => {
    return (answers[question.id] || "").trim().length > 0;
  }).length;
  const progress = Math.round((answeredCount / onboardingQuestions.length) * 100);
  const activeStepIndex = Math.max(0, Math.min(processSteps.length - 1, client.currentStep - 1));
  const consultationStatus = client.consultationStatus || "none";
  const shootingStatus = client.shootingStatus || "none";
  const effectiveStepIndex = submitted || consultationStatus !== "none"
    ? Math.max(activeStepIndex, 2)
    : activeStepIndex;
  const phaseLabel = processSteps[effectiveStepIndex].label;
  const nextAction =
    client.currentStep >= 5 || shootingStatus === "completed"
      ? "Lieferung vorbereiten"
      : client.currentStep >= 4
        ? shootingStatus === "scheduled"
          ? "Shooting geplant"
          : "Shooting-Termin folgt"
        : consultationStatus === "scheduled"
        ? "Vorgespräch geplant"
        : consultationStatus === "requested"
          ? "WhatsApp-Anfrage gesendet"
          : submitted
            ? "Vorgespräch anfragen"
            : progress === 100
              ? "Onboarding abschicken"
              : client.nextAction;
  const nextActionState = getNextActionState({
    client,
    consultationStatus,
    nextAction,
    progress,
    shootingStatus,
    submitted
  });

  const nextQuestion = onboardingQuestions[activeQuestionIndex];
  const activeTabLabel = useMemo(() => {
    return navItems.find((item) => item.id === activeTab)?.label || "Onboarding";
  }, [activeTab]);

  function updateAnswer(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  function handleQuestionSelect(index: number) {
    void saveOnboardingAnswerAction(nextQuestion.id, answers[nextQuestion.id] || "");
    setActiveQuestionIndex(index);
  }

  function handlePrimaryOnboardingAction() {
    if (activeQuestionIndex < onboardingQuestions.length - 1) {
      void saveOnboardingAnswerAction(nextQuestion.id, answers[nextQuestion.id] || "");
      setActiveQuestionIndex((current) => current + 1);
      return;
    }

    setSubmitted(true);
    void submitOnboardingAction(answers);
  }

  function handleNextActionClick() {
    setActiveTab("onboarding");
  }

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="portal-noise fixed inset-0 opacity-[0.055]" aria-hidden />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_78%_7%,rgba(253,47,125,0.12),transparent_34rem),radial-gradient(circle_at_18%_72%,rgba(32,213,245,0.055),transparent_30rem)]" />

      <div className="relative flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 border-r border-white/10 bg-black/28 px-4 py-5 backdrop-blur-2xl lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:h-screen lg:overflow-y-auto">
          <div className="px-2">
            <p className="text-lg font-black tracking-tight">MATCHMAKER</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.32em] text-rose">
              Kundenbereich
            </p>
          </div>

          <nav className="mt-10 space-y-1" aria-label="Kundenbereich">
            {navItems.map((item) => {
              const Icon = item.icon;
              const selected = activeTab === item.id;
              return (
                <div key={item.id} className="contents">
                  {item.id === "simulator" && (
                    <hr className="border-white/10 my-4 mx-2" />
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={cx(
                      "flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-bold transition",
                      selected
                        ? "bg-white text-ink"
                        : "text-white/62 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/42">Angemeldet</p>
            <p className="mt-3 text-sm font-black text-white">{client.name}</p>
            <p className="mt-1 text-xs text-white/48">{client.email}</p>
            <form action={logoutAction} className="mt-4">
              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-black text-white/70 transition hover:border-rose/45 hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                Ausloggen
              </button>
            </form>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0 lg:ml-[260px]">
          <header className="border-b border-white/10 bg-black/18 px-5 py-4 backdrop-blur-2xl md:px-8 md:py-5">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose">
                  {activeTabLabel}
                </p>
                <h1 className="mt-2 text-2xl font-black tracking-tight md:text-5xl">
                  Hallo {client.name.split(" ")[0]}, dein Plan steht.
                </h1>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/42 xl:hidden">
                  {client.packageName}
                </p>
              </div>
              <div className="hidden grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[520px] xl:grid">
                <StatusPill label="Paket" value={client.packageName} />
                <StatusPill label="Phase" value={phaseLabel} />
                <StatusPill label="Nächstes" value={nextAction} />
              </div>
            </div>
            <div className="mx-auto mt-4 w-full max-w-7xl xl:hidden">
              <NextActionCard
                action={nextActionState}
                phaseLabel={phaseLabel}
                onTabAction={handleNextActionClick}
              />
            </div>
          </header>

          <div className={cx(
            "mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-5 px-5 py-5 md:px-8 xl:py-7",
            activeTab !== "simulator" && activeTab !== "coaching-report" && "xl:grid-cols-[minmax(0,1fr)_320px]"
          )}>
            <div className="min-w-0">
              {activeTab !== "simulator" && activeTab !== "coaching-report" ? (
                <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 xl:hidden">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">
                      Onboarding
                    </p>
                    <p className="mt-1 text-sm font-black text-white/84">
                      {submitted ? "Eingereicht" : `${progress}% beantwortet`}
                    </p>
                  </div>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#ff7a1a,#fd2f7d)] transition-all"
                      style={{ width: submitted ? "100%" : `${progress}%` }}
                    />
                  </div>
                </div>
              ) : null}
              <div>
                {activeTab === "guide" ? <GuideView /> : null}
                {activeTab === "onboarding" ? (
                  <OnboardingView
                    activeQuestionIndex={activeQuestionIndex}
                    answers={answers}
                    onAnswerChange={updateAnswer}
                    onIndexChange={handleQuestionSelect}
                    onPrimaryAction={handlePrimaryOnboardingAction}
                    progress={progress}
                    question={nextQuestion}
                    submitted={submitted}
                  />
                ) : null}
                {activeTab === "process" ? <ProcessView activeStepIndex={effectiveStepIndex} /> : null}
                {activeTab === "simulator" ? (
                  <SimulatorView
                    clientName={client.name}
                    activeChats={activeChats}
                    onResetScenario={(characterId) => {
                      void resetSimulatorSessionAction(characterId);
                    }}
                    onSaveProfile={(profile) => {
                      void saveSimulatorProfileAction(profile);
                    }}
                    setActiveChats={setActiveChats}
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    onRegisterFinishedRun={handleRegisterFinishedRun}
                  />
                ) : null}
                {activeTab === "coaching-report" ? (
                  <CoachingReportView
                    activeChats={activeChats}
                    userProfile={userProfile}
                    completedMatchIds={completedMatchIds}
                    historicalStats={historicalStats}
                  />
                ) : null}
              </div>
            </div>

            {activeTab !== "simulator" && activeTab !== "coaching-report" ? (
              <aside className="hidden space-y-4 xl:block">
                <NextActionCard
                  action={nextActionState}
                  phaseLabel={phaseLabel}
                  onTabAction={handleNextActionClick}
                />

                <div className="portal-panel rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black">Onboarding</p>
                    <p className="text-sm font-black text-rose">{submitted ? "Fertig" : `${progress}%`}</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#ff3347,#fd2f7d)] transition-all"
                      style={{ width: submitted ? "100%" : `${progress}%` }}
                    />
                  </div>
                  <p className="mt-4 text-xs leading-5 text-white/48">
                    Autosave ist aktiv. Deine Antworten werden direkt für das Vorgespräch gesichert.
                  </p>
                </div>

                <div className="rounded-lg border border-cyan/20 bg-cyan/10 p-5">
                  <p className="text-sm font-black text-cyan">Kurz halten reicht</p>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    Stichpunkte sind okay. Wichtig ist, dass wir vor dem Call ein Gefühl für Ziel,
                    Stil und Unsicherheiten bekommen.
                  </p>
                </div>
              </aside>
            ) : null}
          </div>
        </section>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/80 px-2 py-2 backdrop-blur-2xl lg:hidden"
        aria-label="Kundenbereich mobil"
      >
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={cx(
                  "flex h-[58px] flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-black transition",
                  selected ? "bg-white text-ink" : "text-white/55"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/38">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-white">{value}</p>
    </div>
  );
}

function getNextActionState({
  client,
  consultationStatus,
  nextAction,
  progress,
  shootingStatus,
  submitted
}: {
  client: PortalClient;
  consultationStatus: string;
  nextAction: string;
  progress: number;
  shootingStatus: string;
  submitted: boolean;
}): NextActionState {
  if (client.currentStep >= 5 || shootingStatus === "completed") {
    return {
      title: "Lieferung",
      status: nextAction,
      detail: client.shootingAt ? formatDateTime(client.shootingAt) : "Shooting erledigt",
      copy: "Deine fertigen Fotos werden vorbereitet und sauber für dich ausgeliefert.",
      icon: "check"
    };
  }

  if (client.currentStep >= 4) {
    return {
      title: shootingStatus === "scheduled" ? "Shooting geplant" : "Shooting",
      status: nextAction,
      detail: client.shootingAt ? formatDateTime(client.shootingAt) : "Shooting-Termin folgt",
      copy:
        shootingStatus === "scheduled"
          ? "Dein Termin steht. Wenn sich etwas ändert, meldet Marko sich direkt bei dir."
          : "Das Shooting ist freigeschaltet. Marko trägt den Termin ein, sobald er feststeht.",
      icon: "calendar"
    };
  }

  if (consultationStatus === "scheduled") {
    return {
      title: "Vorgespräch geplant",
      status: nextAction,
      detail: client.consultationAt ? formatDateTime(client.consultationAt) : "Termin vorgemerkt",
      copy: "Der Termin ist gesetzt. Danach wird das Shooting konkret vorbereitet.",
      icon: "calendar"
    };
  }

  if (consultationStatus === "requested") {
    return {
      title: "Anfrage gesendet",
      status: nextAction,
      detail: "Marko meldet sich",
      copy: "Deine WhatsApp-Anfrage ist angekommen. Der nächste Schritt wird manuell freigeschaltet.",
      icon: "message"
    };
  }

  if (submitted) {
    return {
      title: "Bereit fürs Vorgespräch",
      status: "Vorgespräch anfragen",
      detail: "Onboarding eingereicht",
      copy: "Nimm jetzt kurz per WhatsApp Kontakt auf, damit ihr den Termin abstimmen könnt.",
      icon: "message",
      cta: {
        href: callRequestHref,
        kind: "link",
        label: "Vorgespräch anfragen"
      }
    };
  }

  return {
    title: progress === 100 ? "Onboarding abschließen" : "Onboarding fortsetzen",
    status: progress === 100 ? "Bereit zum Abschicken" : nextAction,
    detail: `${progress}% beantwortet`,
    copy:
      progress === 100
        ? "Öffne dein Onboarding und schicke die Antworten final ab."
        : "Mach direkt mit der nächsten Frage weiter. Deine Antworten werden automatisch gesichert.",
    icon: "message",
    cta: {
      kind: "tab",
      label: progress === 100 ? "Zum Abschicken" : "Onboarding öffnen"
    }
  };
}

function NextActionCard({
  action,
  phaseLabel,
  onTabAction
}: {
  action: NextActionState;
  phaseLabel: string;
  onTabAction: () => void;
}) {
  const Icon =
    action.icon === "calendar" ? CalendarCheck : action.icon === "check" ? Check : MessageCircle;

  return (
    <section className="portal-panel rounded-lg p-4 md:p-5" aria-label="Nächster Schritt">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rose/15 text-rose">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose">
            Nächster Schritt
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-white md:text-2xl">
            {action.title}
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            <InfoLine label="Phase" value={phaseLabel} />
            <InfoLine label={action.status} value={action.detail} />
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/64">{action.copy}</p>

      {action.cta?.kind === "link" && action.cta.href ? (
        <a
          href={action.cta.href}
          className="portal-next-cta mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-black text-white transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-rose/70 focus:ring-offset-2 focus:ring-offset-black"
        >
          {action.cta.label}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : null}

      {action.cta?.kind === "tab" ? (
        <button
          type="button"
          onClick={onTabAction}
          className="portal-next-cta mt-4 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-black text-white transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-rose/70 focus:ring-offset-2 focus:ring-offset-black"
        >
          {action.cta.label}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : null}

    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2">
      <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-white/36">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-black text-white/86">{value}</p>
    </div>
  );
}

function GuideView() {
  return (
    <section className="portal-panel rounded-lg p-5 md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose">Guide</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Vorbereitung ohne Overthinking.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/55">
          Das hier ist bewusst kurz: genug Struktur, damit das Shooting stark wird, ohne dass du
          dich verkopfst.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {guideSections.map((section) => {
          const Icon = section.icon;
          return (
            <article key={section.title} className="rounded-lg border border-white/10 bg-black/18 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.055] text-rose">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-black">{section.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{section.copy}</p>
              <ul className="mt-5 space-y-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-white/72">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function OnboardingView({
  activeQuestionIndex,
  answers,
  onAnswerChange,
  onIndexChange,
  onPrimaryAction,
  progress,
  question,
  submitted
}: {
  activeQuestionIndex: number;
  answers: AnswerMap;
  onAnswerChange: (id: string, value: string) => void;
  onIndexChange: (index: number) => void;
  onPrimaryAction: () => void;
  progress: number;
  question: (typeof onboardingQuestions)[number];
  submitted: boolean;
}) {
  const isLast = activeQuestionIndex === onboardingQuestions.length - 1;

  return (
    <section className="portal-panel rounded-lg p-5 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose">
            Onboarding
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight">
            Fünf kurze Bereiche, ein klares Vorgespräch.
          </h2>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/38">Fortschritt</p>
          <p className="mt-1 text-2xl font-black">{submitted ? "100%" : `${progress}%`}</p>
        </div>
      </div>

	      {progress === 100 && !submitted ? (
	        <div className="mt-7 rounded-lg border border-cyan/25 bg-cyan/10 p-5">
	          <p className="text-sm font-black text-cyan">Alles beantwortet</p>
	          <p className="mt-2 text-sm leading-6 text-white/62">
	            Du bist bereit zum Abschicken. Danach wechselt dein Prozess sichtbar ins Vorgespräch.
	          </p>
	        </div>
	      ) : null}

      <div className="mt-7 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="space-y-2">
          {onboardingQuestions.map((item, index) => {
            const filled = (answers[item.id] || "").trim().length > 0;
            const selected = index === activeQuestionIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onIndexChange(index)}
                className={cx(
                  "group grid w-full grid-cols-[34px_minmax(0,1fr)_18px] items-center gap-3 rounded-lg border px-3 py-3 text-left transition",
                  selected
                    ? "border-white/25 bg-white text-ink"
                    : "border-white/10 bg-black/16 text-white/62 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <span
                  className={cx(
                    "flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-black",
                    selected ? "border-black/10 bg-black/5" : "border-white/10 bg-white/[0.04]"
                  )}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black">{item.label}</span>
                  <span
                    className={cx(
                      "mt-0.5 block truncate text-[11px]",
                      selected ? "text-black/48" : "text-white/38"
                    )}
                  >
                    {item.kicker}
                  </span>
                </span>
                {filled ? (
                  <Check className="h-4 w-4 text-rose" />
                ) : (
                  <ChevronRight className="h-4 w-4 opacity-45 transition group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-white/10 bg-black/18 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan">
                {question.kicker}
              </p>
              <p className="mt-2 text-xs font-black text-white/38">
                {activeQuestionIndex + 1} von {onboardingQuestions.length}
              </p>
              <h3 className="mt-3 text-2xl font-black leading-tight">{question.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{question.hint}</p>
            </div>
            {submitted ? (
              <span className="rounded-lg border border-rose/25 bg-rose/10 px-3 py-2 text-xs font-black text-rose">
                Abgeschlossen
              </span>
            ) : null}
          </div>

            <textarea
              value={answers[question.id] || ""}
              onChange={(event) => onAnswerChange(question.id, event.target.value)}
              onBlur={(event) => {
                void saveOnboardingAnswerAction(question.id, event.target.value);
              }}
              readOnly={submitted}
            className="mt-6 min-h-[230px] w-full resize-none rounded-lg border border-white/10 bg-white/[0.035] p-4 text-base leading-7 text-white outline-none transition placeholder:text-white/26 focus:border-rose/60"
            placeholder="Schreib ruhig in Stichpunkten. Es muss nicht perfekt formuliert sein."
          />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs font-bold text-white/42">
              <Save className="h-4 w-4" />
              {submitted ? "Eingereicht" : "Autosave aktiv"}
            </p>
            <button
              type="button"
              onClick={onPrimaryAction}
              disabled={submitted}
              className={cx(
                "flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-black transition",
                submitted
                  ? "cursor-not-allowed border border-white/10 text-white/35"
                  : "accent-gradient text-white shadow-[0_0_26px_rgba(253,47,125,0.24)] hover:scale-[1.01]"
              )}
            >
              {submitted ? "Vorgespräch ist nächster Schritt" : isLast ? "Final abschicken" : "Speichern & weiter"}
              {submitted ? <Check className="h-4 w-4" /> : isLast ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessView({ activeStepIndex }: { activeStepIndex: number }) {
  return (
    <section className="portal-panel rounded-lg p-5 md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose">Prozess</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Sechs Schritte, klar geführt.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/55">
          Das ist der Kundenprozess in sauberer Form: reduziert, sichtbar, ohne altes Dashboard-
          Gewicht.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {processSteps.map((step, index) => {
          const done = index < activeStepIndex;
          const active = index === activeStepIndex;
          return (
            <article
              key={step.id}
              className={cx(
                "grid gap-4 rounded-lg border p-5 md:grid-cols-[76px_minmax(0,1fr)]",
                done && "border-rose/30 bg-rose/10",
                active && "border-white/24 bg-white/[0.06]",
                !done && !active && "border-white/10 bg-black/14"
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-lg font-black">
                {done ? <Check className="h-5 w-5 text-rose" /> : index + 1}
              </div>
              <div>
                <p className={cx("text-xs font-black uppercase tracking-[0.2em]", active ? "text-cyan" : "text-white/38")}>
                  {step.label}
                </p>
                <h3 className="mt-2 text-xl font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">{step.copy}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
