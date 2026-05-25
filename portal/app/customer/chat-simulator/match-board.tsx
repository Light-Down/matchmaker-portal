"use client";

import { MessageSquare, Shield, Zap, Sparkles, AlertCircle } from "lucide-react";
import { simulatorCharacters, type SimulatorCharacter } from "@/lib/simulator-content";

interface MatchBoardProps {
  stats: {
    avgScore: number;
    datePotential: string;
    confidence: number;
    ghostRisk: string;
  };
  activeChats: Record<string, { lastMessage?: string; status: "active" | "completed" | "ghosted" }>;
  onSelectCharacter: (characterId: string) => void;
  userProfile: { name: string; age: number; bio: string } | null;
  onEditProfile: () => void;
}

export default function MatchBoard({
  stats,
  activeChats,
  onSelectCharacter,
  userProfile,
  onEditProfile
}: MatchBoardProps) {

  return (
    <div className="space-y-6">
      {/* Quick Profile Summary Header */}
      <div className="portal-panel rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-rose/15 flex items-center justify-center text-rose font-black border border-rose/30">
            {userProfile?.name ? userProfile.name.charAt(0) : "U"}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">Dein aktives Profil</p>
            <h3 className="text-base font-black">
              {userProfile?.name || "Unbekannt"}, {userProfile?.age || ""}
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={onEditProfile}
          className="text-xs font-black text-rose hover:text-white border border-white/10 hover:border-rose/40 rounded-lg px-3 py-1.5 transition bg-white/[0.02]"
        >
          Profil anpassen
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Conv. Score"
          value={stats.avgScore > 0 ? `${stats.avgScore}/100` : "—"}
          subtext="Gesprächsqualität"
          icon={Sparkles}
          iconColor="text-rose"
        />
        <StatCard
          label="Date Potential"
          value={stats.avgScore > 0 ? stats.datePotential : "—"}
          subtext="Treffen-Wahrscheinlichkeit"
          icon={Zap}
          iconColor="text-cyan"
        />
        <StatCard
          label="Flirt Confidence"
          value={stats.avgScore > 0 ? `${stats.confidence}%` : "—"}
          subtext="Echtes Selbstbewusstsein"
          icon={Shield}
          iconColor="text-emerald-400"
        />
        <StatCard
          label="Ghosting Risk"
          value={stats.avgScore > 0 ? stats.ghostRisk : "—"}
          subtext="Gefahr des Abbruchs"
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

      {/* Matches Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {simulatorCharacters.map((char) => {
          const activeState = activeChats[char.id];
          const hasChatted = !!activeState;
          const status = activeState?.status || "none";
          const lastMsg = activeState?.lastMessage;

          return (
            <article
              key={char.id}
              className="portal-panel rounded-lg overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:scale-[1.01]"
            >
              <div>
                <div className="relative h-44 w-full bg-panelStrong overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  {/* Overlays removed as requested */}

                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-xl font-black text-white">
                      {char.name}, {char.age}
                    </h4>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs leading-5 text-white/55 italic">
                    &ldquo;{char.bio}&rdquo;
                  </p>
                  
                  {hasChatted && (
                    <div className="mt-3 p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-rose mb-0.5">Letzter Chat-Status</p>
                      <p className="text-xs text-white/70 truncate">
                        {status === "ghosted" ? (
                          <span className="text-rose">Geghostet 👻</span>
                        ) : status === "completed" ? (
                          <span className="text-emerald-400">Date ausgemacht! 🎉</span>
                        ) : (
                          lastMsg || "Läuft..."
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectCharacter(char.id)}
                  className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg text-xs font-black transition ${
                    status === "ghosted"
                      ? "border border-rose/30 bg-rose/5 text-rose hover:bg-rose/10"
                      : status === "completed"
                      ? "border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10"
                      : "accent-gradient text-white hover:scale-[1.01]"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  {status === "ghosted"
                    ? "Erneut versuchen"
                    : status === "completed"
                    ? "Chat ansehen / Neustart"
                    : hasChatted
                    ? "Chat fortsetzen"
                    : "Chat starten"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
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
    <div className="portal-panel rounded-lg p-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">{label}</p>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
      <p className="mt-0.5 text-[10px] text-white/40">{subtext}</p>
    </div>
  );
}
