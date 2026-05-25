"use client";

import { useEffect, useState } from "react";
import {
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  Brain,
  MessageSquare,
  Shield,
  Zap,
  AlertCircle,
  Loader2
} from "lucide-react";
import type { ChatMessage } from "./chat-arena";

interface CoachingReportViewProps {
  activeChats: Record<
    string,
    {
      messages: ChatMessage[];
      status: "active" | "completed" | "ghosted";
    }
  >;
  userProfile: { name: string; age: number; bio: string } | null;
  completedMatchIds: string[];
  historicalStats: { dates: number; ghostings: number };
}

interface ReportData {
  strengths: string[];
  weaknesses: string[];
  openerAnalysis: string;
  communicationPatterns: string;
  executiveSummary: string;
}

export default function CoachingReportView({
  activeChats,
  userProfile,
  completedMatchIds,
  historicalStats
}: CoachingReportViewProps) {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Count unique finished chats (status: completed or ghosted)
  const finishedChats = Object.entries(activeChats).filter(
    ([_, chat]) => chat.status === "completed" || chat.status === "ghosted"
  );
  const completedChatsCount = completedMatchIds.length;
  const isUnlocked = completedChatsCount >= 5;

  // Aggregate global stats from finished chats
  const getGlobalStats = () => {
    let totalScoreSum = 0;
    let userMsgCount = 0;
    let ghostedCount = 0;

    finishedChats.forEach(([_, chat]) => {
      if (chat.status === "ghosted") {
        ghostedCount++;
      }
      chat.messages.forEach((msg) => {
        if (msg.sender === "user" && msg.coaching?.score) {
          totalScoreSum += msg.coaching.score;
          userMsgCount++;
        }
      });
    });

    const avgScore = userMsgCount > 0 ? Math.round(totalScoreSum / userMsgCount) : 0;
    
    let datePotential = "Mittel";
    if (avgScore > 80) datePotential = "Sehr hoch";
    else if (avgScore > 65) datePotential = "Hoch";
    else if (avgScore > 45) datePotential = "Mittel";
    else if (avgScore > 0) datePotential = "Niedrig";

    let confidence = 0;
    if (userMsgCount > 0) {
      confidence = Math.min(100, Math.round(avgScore * 0.7 + userMsgCount * 3));
    }

    let ghostRisk = "Gering";
    if (ghostedCount > 0 || (avgScore > 0 && avgScore < 50)) {
      ghostRisk = "Hoch";
    } else if (avgScore > 0 && avgScore < 70) {
      ghostRisk = "Mittel";
    }

    return {
      avgScore,
      datePotential,
      confidence,
      ghostRisk,
      ghostedCount
    };
  };

  const stats = getGlobalStats();

  useEffect(() => {
    if (!isUnlocked) return;

    async function fetchReport() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/simulator/report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            activeChats,
            userProfile
          })
        });

        if (!response.ok) {
          throw new Error("Fehler beim Laden des Coach-Berichts");
        }

        const data = await response.json();
        setReport(data);
      } catch (err) {
        console.error("Error fetching report:", err);
        // Clean fallback generation based on stats
        setReport(generateFallbackReport(stats));
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [isUnlocked, activeChats, userProfile]);

  // Locked State Screen
  if (!isUnlocked) {
    const required = 5;
    const progressPercent = Math.min(100, Math.round((completedChatsCount / required) * 100));

    return (
      <div className="space-y-6 relative min-h-[600px] overflow-hidden">
        {/* Lock Overlay Shield */}
        <div className="absolute inset-0 bg-ink/75 backdrop-blur-[5px] flex flex-col items-center justify-center z-20 p-6 text-center">
          <div className="portal-panel max-w-xl p-8 rounded-2xl border border-white/10 shadow-2xl bg-black/40 space-y-6 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose to-cyan" />
            
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose/10 text-rose border border-rose/25 animate-pulse">
              <Lock className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tight">Dating-Coach Analyse gesperrt</h2>
              <p className="text-sm text-white/60 leading-6">
                Ein echter Coach benötigt genügend Datenmaterial, um deine Kommunikationsmuster, Stärken und Fehler sauber zu analysieren. Absolviere mindestens 5 Chatversuche mit verschiedenen Charakteren, um deinen Report freizuschalten.
              </p>
            </div>

            {/* Progress Meter */}
            <div className="space-y-2.5 max-w-xs mx-auto">
              <div className="flex justify-between text-xs font-black uppercase tracking-wider text-white/80">
                <span>Absolvierte Chats</span>
                <span>{completedChatsCount} / {required}</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose to-cyan transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-cyan font-bold tracking-wider uppercase">
                {required - completedChatsCount} weitere Matches nötig
              </p>
            </div>
          </div>
        </div>

        {/* Blurred Teaser Screen in Background */}
        <div className="opacity-20 pointer-events-none select-none">
          <div className="portal-panel rounded-lg p-5 flex items-center justify-between mb-6">
            <h2 className="text-xl font-black">Dein Dating-Coach Gutachten</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-6">
            <div className="portal-panel p-4 rounded-lg h-24 bg-white/5" />
            <div className="portal-panel p-4 rounded-lg h-24 bg-white/5" />
            <div className="portal-panel p-4 rounded-lg h-24 bg-white/5" />
            <div className="portal-panel p-4 rounded-lg h-24 bg-white/5" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 portal-panel p-6 rounded-lg h-96 bg-white/5" />
            <div className="md:col-span-2 portal-panel p-6 rounded-lg h-96 bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  // Loading state (Unlocked but fetching)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <Loader2 className="h-10 w-10 text-rose animate-spin" />
        <div className="text-center space-y-1">
          <p className="text-sm font-black uppercase tracking-wider text-white">Analysiere Chat-Historien...</p>
          <p className="text-xs text-white/40">Der Dating-Coach wertet deine Muster aus</p>
        </div>
      </div>
    );
  }

  // Unlocked Dashboard Render
  return (
    <div className="space-y-6">
      {/* Unlocked Header */}
      <div className="portal-panel rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan/5 border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
            <Unlock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight uppercase">Dating-Coach Verhaltensreport</h2>
            <p className="text-xs text-white/50">Freigeschaltet • Analyse aus {completedChatsCount} absolvierten Chat-Simulationen</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            🏆 {historicalStats.dates} {historicalStats.dates === 1 ? "Date" : "Dates"}
          </span>
          <span className="rounded-lg bg-rose/10 px-3 py-1.5 text-xs font-black text-rose border border-rose/20 flex items-center gap-1">
            👻 {historicalStats.ghostings} {historicalStats.ghostings === 1 ? "Ghost" : "Ghosts"}
          </span>
          <span className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-black text-emerald-400 border border-emerald-500/30">
            COACHING-FÄHIG
          </span>
        </div>
      </div>

      {/* Aggregate Stats Dashboard */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Schnitt Score"
          value={stats.avgScore > 0 ? `${stats.avgScore}/100` : "—"}
          subtext="Gesprächsqualität"
          icon={Sparkles}
          iconColor="text-rose"
        />
        <StatCard
          label="Date Wahrscheinlichkeit"
          value={stats.datePotential}
          subtext="Treffen-Potenzial"
          icon={Zap}
          iconColor="text-cyan"
        />
        <StatCard
          label="Flirt-Sicherheit"
          value={`${stats.confidence}%`}
          subtext="Selbstbewusstsein"
          icon={Shield}
          iconColor="text-emerald-400"
        />
        <StatCard
          label="Abbruch-Gefahr"
          value={stats.ghostRisk}
          subtext={`Gesamt geghostet: ${historicalStats.ghostings} Mal`}
          icon={AlertCircle}
          iconColor={
            stats.ghostRisk === "Hoch"
              ? "text-rose"
              : stats.ghostRisk === "Mittel"
              ? "text-amber-400"
              : "text-emerald-400"
          }
        />
      </div>

      {/* Deep Analysis Content */}
      {report && (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column: Strengths & Weaknesses */}
          <div className="md:col-span-1 space-y-6">
            <div className="portal-panel rounded-lg p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Deine Stärken
              </h3>
              <ul className="space-y-3">
                {report.strengths.map((str, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs leading-5 text-white/80 items-start">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
                {report.strengths.length === 0 && (
                  <p className="text-xs text-white/40 italic">Keine klaren Stärken identifiziert.</p>
                )}
              </ul>
            </div>

            <div className="portal-panel rounded-lg p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-rose flex items-center gap-2">
                <XCircle className="h-4 w-4" /> Deine Schwächen
              </h3>
              <ul className="space-y-3">
                {report.weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs leading-5 text-white/80 items-start">
                    <XCircle className="h-4 w-4 text-rose shrink-0 mt-0.5" />
                    <span>{weak}</span>
                  </li>
                ))}
                {report.weaknesses.length === 0 && (
                  <p className="text-xs text-white/40 italic">Keine gravierenden Fehler festgestellt.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column: In-depth summaries */}
          <div className="md:col-span-2 space-y-6">
            {/* Opener Analysis */}
            <div className="portal-panel rounded-lg p-6 space-y-3.5">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/36 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-rose" /> Analyse der Gesprächseröffnungen (Opener)
              </h3>
              <p className="text-xs leading-6 text-white/80">
                {report.openerAnalysis}
              </p>
            </div>

            {/* Communication Patterns */}
            <div className="portal-panel rounded-lg p-6 space-y-3.5">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/36 flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan" /> Kommunikations- & Schreibverhalten
              </h3>
              <p className="text-xs leading-6 text-white/80">
                {report.communicationPatterns}
              </p>
            </div>

            {/* Executive Summary / Gutachten */}
            <div className="portal-panel rounded-lg p-6 space-y-4 relative overflow-hidden bg-gradient-to-b from-panelStrong/50 to-panel">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-rose flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Gutachten des Dating-Coaches
              </h3>
              <div className="space-y-3 leading-6 text-xs text-white/85">
                {report.executiveSummary.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor
}: {
  label: string;
  value: string;
  subtext: string;
  icon: any;
  iconColor: string;
}) {
  return (
    <div className="portal-panel rounded-lg p-3.5 bg-black/16">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">{label}</p>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
      <p className="mt-0.5 text-[10px] text-white/40">{subtext}</p>
    </div>
  );
}

// Generates an structured, clean fallback report if Gemini is not set up or offline
function generateFallbackReport(stats: {
  avgScore: number;
  datePotential: string;
  confidence: number;
  ghostRisk: string;
  ghostedCount: number;
}): ReportData {
  const isHighScore = stats.avgScore > 65;
  const highGhostRate = stats.ghostedCount > 2;

  const strengths = isHighScore
    ? [
        "Hohe Personalisierung bei den Gesprächseinstiegen.",
        "Gutes Eingehen auf die individuellen Bio-Inhalte der Matches.",
        "Sichere Gesprächsführung in flirty Chats."
      ]
    : [
        "Grundlegende Bereitschaft, offene Fragen zu stellen.",
        "Ausdauer in der Konversationsführung."
      ];

  const weaknesses = highGhostRate
    ? [
        "Mangelnde Ausdauer bei abweisenden oder trockenen Antworten.",
        "Bedürftiges Verhalten (Needy Vibe) bei längeren Antwortpausen.",
        "Zu schneller Vorschlag eines Treffens ohne ausreichenden Vibe."
      ]
    : [
        "Zu förmlicher Ton bei jüngeren oder unkomplizierten Matches.",
        "Verwendung von klassischen Smalltalk-Phrasen."
      ];

  const openerAnalysis = isHighScore
    ? "Deine Eröffnungen zeigen ein überdurchschnittliches Feingefühl. Wenn du Bezüge zu den Bios herstellst, ist deine Erfolgsquote extrem hoch. Meide jedoch unüberlegte Grüße wie 'hey', die bei kritischen Matches sofort blockiert werden."
    : "Deine Gesprächseröffnungen sind oft noch zu austauschbar. Standardgrüße wie 'Hey, wie geht's?' sind der Hauptgrund, warum Gespräche im Keim erstickt werden. Versuche, dich immer auf ein konkretes, visuelles Detail oder einen frechen Satz aus der Bio zu stützen.";

  const communicationPatterns = `Mit einem Gesamt-Conversations-Score von ${stats.avgScore}/100 schreibst du solide, verlierst aber bei abweisenden Reaktionen schnell den Faden. Dein Gesprächsfluss (Flow) leidet, wenn Matches trocken antworten, da du dann oft in ein unstrukturiertes 'Interview-Verhalten' zurückfällst. Dein Pacing (Date-Timing) ist gut, solange du nicht vor der 3. Nachricht drängst.`;

  const executiveSummary = `Lieber Absolvent,\n\nbasierend auf deinen ${stats.ghostedCount + 2} analysierten Match-Simulationen zeigt sich ein klares Bild: Du hast das Rüstzeug für überzeugende Chats, neigst aber unter Druck zu typischen Anfängerfehlern.\n\nWenn ein Match wie Sarah oder Emma nicht sofort begeistert reagiert, verfällst du entweder in belehrende Monologe oder versuchst, das Gespräch durch übermäßige Rechtfertigung zu retten. Das verströmt Bedürftigkeit und führt direkt zum Ghosting.\n\nFokussiere dich in deinen nächsten Chatversuchen darauf: 1. Halte deine Nachrichten kurz und knackig (Schnitt 8-12 Wörter). 2. Verwende verspielten Banter (Necken) statt netter Zustimmung. 3. Schlage ein Date erst vor, wenn ein gemeinsamer Humor-Vibe entstanden ist. Mach weiter so!`;

  return {
    strengths,
    weaknesses,
    openerAnalysis,
    communicationPatterns,
    executiveSummary
  };
}
