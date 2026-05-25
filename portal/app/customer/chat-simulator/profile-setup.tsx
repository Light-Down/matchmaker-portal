"use client";

import { useState } from "react";
import { ArrowRight, User, Calendar, FileText } from "lucide-react";

interface ProfileSetupProps {
  initialName: string;
  onSave: (profile: { name: string; age: number; bio: string }) => void;
}

export default function ProfileSetup({ initialName, onSave }: ProfileSetupProps) {
  const [name, setName] = useState(initialName.split(" ")[0] || "");
  const [age, setAge] = useState<string>("27");
  const [bio, setBio] = useState<string>(
    "Liebe guten Kaffee, Wochenendtrips und Konzerte. Lass uns herausfinden, wer den schlechteren Musikgeschmack hat! 🎶"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Bitte gib deinen Namen an.");
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
      setError("Bitte gib ein gültiges Alter (18-99) an.");
      return;
    }
    setError(null);
    onSave({ name, age: ageNum, bio });
  };

  return (
    <section className="portal-panel rounded-lg p-5 md:p-7 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose/15 text-rose mb-3">
          <User className="h-6 w-6" />
        </span>
        <h2 className="text-2xl font-black tracking-tight">Erstelle dein Tinder-Profil</h2>
        <p className="mt-2 text-sm text-white/55">
          Gib uns ein paar Grunddaten. Dieses Profil wird von der KI genutzt, um realistisch auf dich zu reagieren.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="sim-name" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/38 mb-2">
            <User className="h-3.5 w-3.5 text-rose" /> Vorname
          </label>
          <input
            id="sim-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 rounded-lg border border-white/10 bg-white/[0.035] px-4 text-white placeholder:text-white/26 focus:border-rose/60 focus:outline-none transition"
            placeholder="z.B. Max"
            required
          />
        </div>

        <div>
          <label htmlFor="sim-age" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/38 mb-2">
            <Calendar className="h-3.5 w-3.5 text-rose" /> Alter
          </label>
          <input
            id="sim-age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full h-12 rounded-lg border border-white/10 bg-white/[0.035] px-4 text-white placeholder:text-white/26 focus:border-rose/60 focus:outline-none transition"
            placeholder="z.B. 27"
            min="18"
            max="99"
            required
          />
        </div>

        <div>
          <label htmlFor="sim-bio" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/38 mb-2">
            <FileText className="h-3.5 w-3.5 text-rose" /> Deine Bio / Selbstbeschreibung
          </label>
          <textarea
            id="sim-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full min-h-[120px] resize-none rounded-lg border border-white/10 bg-white/[0.035] p-4 text-white placeholder:text-white/26 focus:border-rose/60 focus:outline-none transition leading-6"
            placeholder="Schreibe eine kurze Bio wie auf Tinder..."
            required
          />
          <p className="mt-1.5 text-[11px] text-white/36">
            Tipp: Schreibe locker, nenne Hobbys oder stell eine humorvolle Frage. Das zieht Matches an!
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose/10 border border-rose/30 text-rose rounded-lg text-xs font-black">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="portal-next-cta flex h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-black text-white transition hover:scale-[1.01]"
        >
          Profil aktivieren & Matches finden
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
