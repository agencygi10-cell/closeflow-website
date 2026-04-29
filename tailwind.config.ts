import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0014",
          deep: "#10001f",
          purple: "#6b21a8",
          violet: "#8b5cf6",
          lilac: "#c4b5fd",
          pink: "#ec4899",
          glow: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #6b21a8 0%, #a855f7 50%, #ec4899 100%)",
        "hero-radial":
          "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(236,72,153,0.25) 0%, transparent 55%), radial-gradient(circle at 50% 100%, rgba(107,33,168,0.45) 0%, transparent 60%)",
      },
      animation: {
        "gradient-shift": "gradientShift 12s ease infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(168, 85, 247, 0.35)",
        "glow-pink": "0 0 60px rgba(236, 72, 153, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
