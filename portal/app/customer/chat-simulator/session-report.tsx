"use client";

import { Award, RefreshCw, Users, BookOpen } from "lucide-react";
import type { SimulatorCharacter } from "@/lib/simulator-content";
import type { ChatMessage } from "./chat-arena";

interface SessionReportProps {
  character: SimulatorCharacter;
  scores: {
    total: number;
    flow: number;
    humor: number;
    timing: number;
  };
  messages: ChatMessage[];
  isDateAgreed: boolean;
  onRestart: () => void;
  onBackToBoard: () => void;
}

export default function SessionReport({
  character,
  scores,
  messages,
  isDateAgreed,
  onRestart,
  onBackToBoard
}: SessionReportProps) {
  return (
    <section className="portal-panel rounded-lg p-5 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Banner Result */}
      <div className={`text-center p-6 rounded-lg border ${
        isDateAgreed
          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
          : "bg-rose/10 border-rose/25 text-rose"
      }`}>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/30 mb-3 border border-current">
          <Award className="h-6 w-6" />
        </span>
        <h2 className="text-2xl font-black tracking-tight uppercase">
          {isDateAgreed ? "Date gesichert! 🎉" : "Geghostet... 👻"}
        </h2>
        <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">
          {isDateAgreed
            ? `Du hast es geschafft! ${character.name} hat deiner Einladung zu einem Treffen zugestimmt.`
            : `Das Gespräch mit ${character.name} ist eingeschlafen. Sie hat dich geghostet.`}
        </p>
      </div>

      {/* Conditionally render Stats Breakdown + Coach Feedback */}
      {isDateAgreed ? (
        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          {/* Score Breakdown (Only shown for successful dates) */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/36 flex items-center gap-2">
              <Award className="h-4 w-4 text-rose" /> Leistungsauswertung
            </h3>

            <div className="space-y-3.5">
              <MetricBar label="Gesamtscore" value={scores.total} color="bg-rose" />
              <MetricBar label="Gesprächsfluss (Flow)" value={scores.flow} color="bg-cyan" />
              <MetricBar label="Humor & Spannung" value={scores.humor} color="bg-rose" />
              <MetricBar label="Date-Timing" value={scores.timing} color="bg-emerald-400" />
            </div>
          </div>

          {/* Coach Summary Feedback (Scrollable Chat review format) */}
          <div className="space-y-4 flex flex-col h-[400px]">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/36 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyan" /> Coach Feedback (Analyse)
            </h3>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 border border-white/5 rounded-xl bg-black/20 scrollbar-thin">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div key={msg.id} className="space-y-2.5">
                    {/* Message Bubble */}
                    <div className={`flex flex-col max-w-[85%] md:max-w-2xl ${isUser ? "ml-auto items-end" : "mr-auto items-start"}`}>
                      <div className={`p-3.5 rounded-2xl text-xs leading-5 ${
                        isUser
                          ? "accent-gradient text-white rounded-tr-none shadow-md shadow-rose/5"
                          : "bg-panelStrong text-white/90 rounded-tl-none border border-white/5"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-white/24 mt-1 px-1 uppercase tracking-wider font-bold">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Inline Coach Annotations for User Messages */}
                    {isUser && msg.coaching && (
                      <div className="ml-auto max-w-[85%] md:max-w-2xl p-3.5 bg-cyan/5 border border-cyan/15 rounded-xl space-y-2 text-left">
                        <div className="flex items-center justify-between border-b border-cyan/10 pb-1.5">
                          <span className="text-[9px] font-black text-cyan uppercase tracking-wider flex items-center gap-1">
                            💡 Coach Bewertung
                          </span>
                          <span className="text-[10px] font-black text-white px-1.5 py-0.5 rounded bg-cyan/20">
                            Score: {msg.coaching.score}/100
                          </span>
                        </div>
                        <p className="text-[11px] leading-4.5 text-white/80">{msg.coaching.analysis}</p>
                        
                        {/* Alternatives review */}
                        {msg.coaching.alternatives && msg.coaching.alternatives.length > 0 && (
                          <div className="pt-2 border-t border-cyan/5 space-y-1">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-wider block">
                              Bessere Alternativen:
                            </span>
                            <div className="space-y-1">
                              {msg.coaching.alternatives.map((alt, idx) => (
                                <p key={idx} className="text-[10px] leading-4 text-cyan/95 italic bg-black/10 p-1.5 rounded border border-white/5">
                                  &ldquo;{alt}&rdquo;
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {messages.length === 0 && (
                <p className="text-xs text-white/40 italic text-center py-4">Kein Verlauf vorhanden.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* If Ghosted: Full width Chat Review (no progress bars) */
        <div className="space-y-4 flex flex-col h-[480px]">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/36 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-cyan" /> Coach Feedback (Gesprächs-Analyse)
          </h3>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 border border-white/5 rounded-xl bg-black/20 scrollbar-thin">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} className="space-y-2.5">
                  {/* Message Bubble */}
                  <div className={`flex flex-col max-w-[85%] md:max-w-2xl ${isUser ? "ml-auto items-end" : "mr-auto items-start"}`}>
                    <div className={`p-3.5 rounded-2xl text-xs leading-5 ${
                      isUser
                        ? "accent-gradient text-white rounded-tr-none shadow-md shadow-rose/5"
                        : "bg-panelStrong text-white/90 rounded-tl-none border border-white/5"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-white/24 mt-1.5 px-1 uppercase tracking-wider font-bold">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Inline Coach Annotations for User Messages */}
                  {isUser && msg.coaching && (
                    <div className="ml-auto max-w-[85%] md:max-w-2xl p-3.5 bg-cyan/5 border border-cyan/15 rounded-xl space-y-2 text-left">
                      <div className="flex items-center justify-between border-b border-cyan/10 pb-1.5">
                        <span className="text-[9px] font-black text-cyan uppercase tracking-wider flex items-center gap-1">
                          💡 Coach Bewertung
                        </span>
                        <span className="text-[10px] font-black text-white px-1.5 py-0.5 rounded bg-cyan/20">
                          Score: {msg.coaching.score}/100
                        </span>
                      </div>
                      <p className="text-[11px] leading-4.5 text-white/80">{msg.coaching.analysis}</p>
                      
                      {/* Alternatives review */}
                      {msg.coaching.alternatives && msg.coaching.alternatives.length > 0 && (
                        <div className="pt-2 border-t border-cyan/5 space-y-1">
                          <span className="text-[8px] font-black text-white/40 uppercase tracking-wider block">
                            Bessere Alternativen:
                          </span>
                          <div className="space-y-1">
                            {msg.coaching.alternatives.map((alt, idx) => (
                              <p key={idx} className="text-[10px] leading-4 text-cyan/95 italic bg-black/10 p-1.5 rounded border border-white/5">
                                &ldquo;{alt}&rdquo;
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {messages.length === 0 && (
              <p className="text-xs text-white/40 italic text-center py-4">Kein Verlauf vorhanden.</p>
            )}
          </div>
        </div>
      )}

      {/* Actions buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 flex h-11 items-center justify-center gap-2 rounded-lg bg-white text-ink hover:bg-white/90 text-sm font-black transition"
        >
          <RefreshCw className="h-4 w-4" />
          Erneut versuchen
        </button>
        <button
          type="button"
          onClick={onBackToBoard}
          className="flex-1 flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.02] text-white hover:bg-white/[0.04] text-sm font-black transition"
        >
          <Users className="h-4 w-4" />
          Anderes Match wählen
        </button>
      </div>
    </section>
  );
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-black text-white/80 mb-1.5">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
