import {
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  MessageSquareText,
  Shirt,
  Sparkles,
  UserRound
} from "lucide-react";

export type PortalTab = "guide" | "onboarding" | "process" | "simulator" | "coaching-report";

export const navItems = [
  { id: "guide" as const, label: "Guide", icon: BookOpen },
  { id: "onboarding" as const, label: "Onboarding", icon: UserRound },
  { id: "process" as const, label: "Prozess", icon: ClipboardList },
  { id: "simulator" as const, label: "Chat-Simulator", icon: Sparkles },
  { id: "coaching-report" as const, label: "Coach-Report", icon: MessageSquareText }
];

export const processSteps = [
  {
    id: "request",
    label: "Anfrage",
    title: "Anfrage bestätigt",
    copy: "Dein Erstkontakt und die Terminsicherung sind erledigt. Ab jetzt geht es um Vorbereitung statt Zufall.",
    status: "done"
  },
  {
    id: "onboarding",
    label: "Onboarding",
    title: "Persönliches Onboarding",
    copy: "Wir klären Ziele, Stil, Wirkung und die Dinge, die dich vor der Kamera sicherer machen.",
    status: "active"
  },
  {
    id: "call",
    label: "Vorgespräch",
    title: "Das Vorgespräch",
    copy: "Ein ruhiger Call vor dem Shooting: Ziele, Outfits, Locations, Ablauf und offene Fragen.",
    status: "upcoming"
  },
  {
    id: "shooting",
    label: "Shooting",
    title: "Das Shooting",
    copy: "Geführter Foto-Walk in Frankfurt mit klaren Anweisungen, Bewegung und natürlichen Situationen.",
    status: "upcoming"
  },
  {
    id: "delivery",
    label: "Lieferung",
    title: "Lieferung der fertigen Fotos",
    copy: "Nach dem Shooting werden die finalen Bilder vorbereitet und sauber für dich ausgeliefert.",
    status: "upcoming"
  }
];

export const guideSections = [
  {
    icon: Shirt,
    title: "Outfits vorbereiten",
    copy: "Bring 3 bis 6 klare Looks mit: clean, urban, elegant, aktiv. Keine wilden Muster, keine schlecht sitzenden Basics.",
    bullets: ["Passform vor Marke", "Kontraste zwischen Looks", "Schuhe und Jacken mitdenken"]
  },
  {
    icon: Sparkles,
    title: "Grooming & Timing",
    copy: "Haarschnitt nicht am selben Tag. Hautpflege simpel halten. Ziel ist frisch und echt, nicht komplett verändert.",
    bullets: ["Haare 3-7 Tage vorher", "Gesicht matt halten", "Kein neues Experiment am Shootingtag"]
  },
  {
    icon: LayoutDashboard,
    title: "Profilwirkung",
    copy: "Deine Bilder sollen nicht wie ein Shooting aussehen. Sie sollen den Eindruck erzeugen, dass du ein aktives, soziales Leben hast.",
    bullets: ["Erstes Bild: Nähe und Vertrauen", "Mitte: Lifestyle und Aktivität", "Ende: Raum für Neugier"]
  }
];

export const onboardingQuestions = [
  {
    id: "goals",
    label: "Zielbild",
    kicker: "Wirkung",
    title: "Was sollen die neuen Fotos für dich verändern?",
    hint: "Zum Beispiel mehr passende Matches, seriöser wirken, lockerer rüberkommen oder mehr Persönlichkeit zeigen."
  },
  {
    id: "personality",
    label: "Persönlichkeit",
    kicker: "Alltag",
    title: "Wie würdest du dich und dein Leben beschreiben?",
    hint: "Eher extrovertiert oder zurückhaltend? Was machst du gerne, worin fühlst du dich wohl, was soll man von dir spüren?"
  },
  {
    id: "style",
    label: "Stil",
    kicker: "Outfits",
    title: "Wie möchtest du optisch wirken?",
    hint: "Beschreibe deinen Kleidungsstil, Farben, Lieblingsstücke oder konkrete Looks, in denen du dich sicher fühlst."
  },
  {
    id: "camera",
    label: "Kamera",
    kicker: "Sicherheit",
    title: "Was macht dich vor der Kamera unsicher?",
    hint: "Je genauer du das beschreibst, desto besser kann das Shooting geführt werden. Stichpunkte reichen völlig."
  },
  {
    id: "call_notes",
    label: "Vorgespräch",
    kicker: "Offene Punkte",
    title: "Was sollen wir im Vorgespräch unbedingt klären?",
    hint: "Dating-Apps, Location-Ideen, No-Gos, Outfit-Fragen oder alles, was du vor dem Shooting loswerden möchtest."
  }
];

export const statusCards = [
  { label: "Aktuelle Phase", value: "Onboarding", icon: CheckCircle2 },
  { label: "Nächster Schritt", value: "Vorgespräch planen", icon: CalendarClock },
  { label: "Offene Fragen", value: "3 Hinweise", icon: MessageSquareText }
];
