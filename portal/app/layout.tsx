import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kundenbereich | Matchmaker Frankfurt",
  description: "Geschützter Kundenbereich für Guide, Onboarding und Shooting-Vorbereitung.",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
