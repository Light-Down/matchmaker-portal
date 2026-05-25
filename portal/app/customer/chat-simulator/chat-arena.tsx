"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  Send,
  Sparkles,
  Info,
  ChevronDown,
  AlertTriangle,
  Smile,
  Copy,
  TrendingUp,
  X,
  RotateCcw
} from "lucide-react";
import type { SimulatorCharacter } from "@/lib/simulator-content";

export interface ChatMessage {
  id: string;
  sender: "user" | "character";
  text: string;
  timestamp: string;
  coaching?: {
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
}

interface ChatArenaProps {
  character: SimulatorCharacter;
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onBack: () => void;
  onViewReport: () => void;
  onResetChat: () => void;
}

export default function ChatArena({
  character,
  messages,
  isTyping,
  onSendMessage,
  onBack,
  onViewReport,
  onResetChat
}: ChatArenaProps) {
  const [inputText, setInputText] = useState("");
  const [showCoaching, setShowCoaching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lastMessage = messages[messages.length - 1];
  const lastCoaching = lastMessage?.sender === "user" ? lastMessage.coaching : null;

  const isGhosted = messages.some((m) => m.coaching?.is_ghosted);
  const isDateAgreed = messages.some((m) => m.coaching?.is_date_agreed);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping || isGhosted || isDateAgreed) return;
    onSendMessage(inputText.trim());
    setInputText("");
    // Automatically close coaching drawer so it can open with new feedback
    setShowCoaching(false);
  };

  const handleUseAlternative = (alternativeText: string) => {
    setInputText(alternativeText);
    setShowCoaching(false);
  };

  return (
    <div className="portal-panel rounded-lg overflow-hidden flex flex-col h-[680px] relative">
      {/* Chat Header */}
      <header className="border-b border-white/10 bg-panelStrong px-4 py-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1 rounded-lg hover:bg-white/[0.06] text-white/70 hover:text-white transition"
            aria-label="Zurück zum Match-Board"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={character.avatarUrl}
              alt={character.name}
              className="h-10 w-10 rounded-full object-cover border border-white/10"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-panelStrong" />
          </div>
          
          <div>
            <h3 className="text-sm font-black text-white">
              {character.name}, {character.age}
            </h3>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              {isTyping ? "schreibt..." : "Online"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetChat}
            className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white/60 hover:text-white transition"
            title="Chat zurücksetzen / neu starten"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onViewReport}
              className="px-3.5 py-1.5 rounded-lg bg-rose/10 hover:bg-rose/20 text-rose border border-rose/30 text-xs font-black transition"
            >
              Auswertung
            </button>
          )}
        </div>
      </header>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-black/10">
        {/* Profile Intro Card */}
        <div className="flex flex-col items-center p-5 border border-white/5 bg-white/[0.015] rounded-2xl mb-6 text-center max-w-sm mx-auto mt-2">
          <img
            src={character.avatarUrl}
            alt={character.name}
            className="h-16 w-16 rounded-full object-cover border border-white/10 mb-2.5 shadow-lg"
          />
          <h4 className="text-sm font-black text-white">
            {character.name}, {character.age}
          </h4>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">
            {character.categoryLabel}
          </p>
          <p className="text-xs text-white/60 italic mt-3 leading-5 border-t border-white/5 pt-3 w-full">
            &ldquo;{character.bio}&rdquo;
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center p-6 space-y-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/10 text-rose border border-rose/20 animate-pulse">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <p className="text-sm font-black text-white/80">Ihr habt euch gematcht! 🎉</p>
            <p className="text-xs text-white/42 max-w-[260px] leading-5">
              Frauen schreiben im Regelfall nicht zuerst. Mach den ersten Schritt und schick ihr einen kreativen Einstieg!
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${isUser ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-6 ${
                    isUser
                      ? "accent-gradient text-white rounded-tr-none shadow-md shadow-rose/10"
                      : "bg-panelStrong text-white/90 rounded-tl-none border border-white/5"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-white/26 mt-1.5 px-1 font-bold uppercase tracking-wider">
                  {msg.timestamp}
                </span>
              </div>
            );
          })
        )}

        {/* Typing dots indicator */}
        {isTyping && (
          <div className="flex max-w-[80%] mr-auto items-start flex-col">
            <div className="bg-panelStrong text-white/90 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" />
            </div>
          </div>
        )}

        {/* End Scenario Banners */}
        {isGhosted && (
          <div className="p-4 rounded-lg bg-rose/10 border border-rose/30 flex items-start gap-3 mt-4">
            <AlertTriangle className="h-5 w-5 text-rose shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-rose uppercase tracking-wider">Geghostet! 👻</h4>
              <p className="text-xs leading-5 text-white/60 mt-1">
                Oh je! Die KI hat das Interesse verloren und ghostet dich jetzt. Keine Panik – klicke auf den Coaching-Button unten, um zu sehen, was schiefgelaufen ist.
              </p>
              <button
                type="button"
                onClick={onViewReport}
                className="mt-3 text-xs font-black text-white hover:text-rose transition border border-white/10 hover:border-rose/30 bg-black/16 rounded-lg px-3 py-1.5"
              >
                Zur Auswertung
              </button>
            </div>
          </div>
        )}

        {isDateAgreed && (
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 mt-4 animate-pulse">
            <Smile className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">Date gesichert! 🎉</h4>
              <p className="text-xs leading-5 text-white/60 mt-1">
                Klasse Arbeit! Du hast das Match von einem Treffen überzeugt. Dein Profil und Vibe haben perfekt gepasst.
              </p>
              <button
                type="button"
                onClick={onViewReport}
                className="mt-3 text-xs font-black text-ink bg-emerald-400 hover:bg-emerald-300 rounded-lg px-3.5 py-1.5 transition shadow-lg shadow-emerald-400/20"
              >
                Zur Auswertung
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Coaching Drawer Toggle Overlay */}
      {showCoaching && lastCoaching && (
        <div className="absolute inset-x-0 bottom-[64px] bg-panelStrong/95 backdrop-blur-xl border-t border-white/10 p-5 z-20 shadow-2xl transition-all duration-300 max-h-[420px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan" />
              <h4 className="text-sm font-black text-white">Smart Flirt Coach</h4>
            </div>
            <button
              type="button"
              onClick={() => setShowCoaching(false)}
              className="p-1 rounded hover:bg-white/5 text-white/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Score and Risk Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/36">Nachrichten Score</p>
                <p className="text-2xl font-black mt-1 text-cyan">{lastCoaching.score}/100</p>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/36">Ghosting-Risiko</p>
                <p className={`text-sm font-black mt-2.5 uppercase tracking-wide ${
                  lastCoaching.ghost_risk === "high"
                    ? "text-rose"
                    : lastCoaching.ghost_risk === "medium"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}>
                  {lastCoaching.ghost_risk === "high" ? "Hoch" : lastCoaching.ghost_risk === "medium" ? "Mittel" : "Gering"}
                </p>
              </div>
            </div>

            {/* Coach Analysis */}
            <div className="p-3.5 bg-cyan/5 border border-cyan/15 rounded-lg">
              <p className="text-[10px] font-black uppercase tracking-wider text-cyan flex items-center gap-1.5">
                <Info className="h-3 w-3" /> Coach Feedback
              </p>
              <p className="text-xs leading-5 text-white/80 mt-2">
                {lastCoaching.analysis}
              </p>
            </div>

            {/* Alternatives */}
            {lastCoaching.alternatives && lastCoaching.alternatives.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-white/36 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" /> Bessere Alternativen
                </p>
                <div className="space-y-2">
                  {lastCoaching.alternatives.map((alt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleUseAlternative(alt)}
                      className="w-full text-left p-3 rounded-lg border border-white/5 bg-white/[0.015] hover:bg-white/[0.04] text-xs leading-5 text-white/70 hover:text-white transition flex items-start gap-2.5 group"
                    >
                      <Copy className="h-3.5 w-3.5 text-cyan shrink-0 mt-0.5 opacity-40 group-hover:opacity-100" />
                      <span>{alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Form Footer */}
      <footer className="border-t border-white/10 bg-panelStrong p-3 shrink-0 flex items-center gap-2">
        {/* Coach button */}
        {lastCoaching && (
          <button
            type="button"
            onClick={() => setShowCoaching(!showCoaching)}
            className={`p-3.5 rounded-lg border transition ${
              showCoaching
                ? "bg-cyan/15 border-cyan text-cyan shadow-lg shadow-cyan/15"
                : "bg-white/[0.03] border-white/10 text-white/48 hover:border-cyan/40 hover:text-cyan hover:bg-cyan/5"
            }`}
            title="Coaching Tipps für die letzte Nachricht anzeigen"
            disabled={isGhosted || isDateAgreed}
          >
            <Sparkles className="h-4.5 w-4.5" />
          </button>
        )}

        <form onSubmit={handleSend} className="flex-1 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isGhosted
                ? "Du wurdest geghostet 👻"
                : isDateAgreed
                ? "Date ist abgemacht! 🎉"
                : "Deine Nachricht schreiben..."
            }
            className="flex-1 h-12 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/26 focus:border-rose/60 focus:outline-none transition"
            disabled={isTyping || isGhosted || isDateAgreed}
            required
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping || isGhosted || isDateAgreed}
            className={`h-12 w-12 rounded-lg flex items-center justify-center transition shrink-0 ${
              !inputText.trim() || isTyping || isGhosted || isDateAgreed
                ? "border border-white/10 text-white/24 bg-white/[0.01]"
                : "accent-gradient text-white hover:scale-105 active:scale-95 shadow-md shadow-rose/10"
            }`}
            aria-label="Nachricht senden"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </footer>
    </div>
  );
}
