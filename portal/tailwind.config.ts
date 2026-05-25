import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050507",
        panel: "#0b0c10",
        panelStrong: "#111218",
        line: "rgba(255,255,255,0.1)",
        muted: "#9da0aa",
        rose: "#fd2f7d",
        coral: "#ff3347",
        cyan: "#20d5f5"
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        portal: "0 24px 80px rgba(0,0,0,0.48)"
      }
    }
  },
  plugins: []
};

export default config;
