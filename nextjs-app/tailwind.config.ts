import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}", // optional if using pages for static routes
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      boxShadow: {
        layer: "0 35px 60px -15px rgba(0, 0, 0, 0.1)",
        soft: "0 4px 24px rgba(0, 0, 0, 0.08)",
        glow: "0 0 15px rgba(245, 158, 11, 0.3)",
      },
      colors: {
        black: "#1a1a1a",
        white: "#fefefe",
        primary: {
          50: "#fff7ed",
          100: "#ffefd5",
          200: "#ffdfaa",
          300: "#ffcf80",
          400: "#ffbf55",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        secondary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        neutral: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        accent: {
          gold: "#facc15",
          amber: "#fbbf24",
          teal: "#0d9488",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-bebas-neue)", "sans-serif"],
        display: ["var(--font-archivo-black)", "sans-serif"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1", fontWeight: "900" }],
        "heading-1": ["3rem", { lineHeight: "1.1", fontWeight: "800" }],
        "heading-2": ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.7)" },
          "50%": { boxShadow: "0 0 15px 5px rgba(245, 158, 11, 0.4)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    typography,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".scroll-smooth": {
          "scroll-behavior": "smooth",
        },
        ".font-outline": {
          "-webkit-text-stroke": "1px currentColor",
          "text-stroke": "1px currentColor",
        },
        ".bg-radial-orange": {
          "background-image":
            "radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%)",
        },
      });
    }),
  ],
} satisfies Config;
