import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050711",
        graphite: "#0d111d",
        steel: "#8fa4c1",
        plasma: "#55f3ff",
        violet: "#a855f7",
        aurora: "#48f1a8",
        ember: "#ffb86b",
        rosefire: "#ff5c93"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        "neon-cyan": "0 0 36px rgba(85, 243, 255, 0.35)",
        "neon-violet": "0 0 40px rgba(168, 85, 247, 0.32)",
        "inner-glow": "inset 0 0 40px rgba(85, 243, 255, 0.08)"
      },
      backgroundImage: {
        "scan-lines":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
        "holo-border":
          "linear-gradient(135deg, rgba(85,243,255,.85), rgba(168,85,247,.65), rgba(72,241,168,.72))"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" }
        },
        pulseRing: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        scan: "scan 2.6s linear infinite",
        "pulse-ring": "pulseRing 3.4s ease-in-out infinite",
        marquee: "marquee 24s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
