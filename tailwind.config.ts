import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: "var(--color-espresso, #1C1512)",
          50: "#322722",
          100: "#281F1B",
          200: "#221A17",
          300: "#1C1512",
          400: "#16100E",
          900: "#0D0A08",
        },
        cream: {
          DEFAULT: "var(--color-cream, #F7F2EA)",
          light: "var(--color-cream-light, #FAF7F2)",
          dark: "var(--color-cream-dark, #EDE3D3)",
          100: "#FAF7F2",
          200: "#F7F2EA",
          300: "#EDE3D3",
          400: "#E3D5C0",
        },
        gold: {
          DEFAULT: "var(--color-gold, #B38B54)",
          light: "var(--color-gold-light, #D9B97E)",
          dark: "#8F6D3C",
          50: "#F8F3EC",
          100: "#EFE3D2",
          200: "#E0C8A4",
          300: "#D9B97E",
          400: "#C6A168",
          500: "#B38B54",
          600: "#997341",
          700: "#7A5930",
        },
        taupe: {
          DEFAULT: "var(--color-taupe, #8A7762)",
          light: "#A4927E",
          dark: "#6B5A49",
        },
      },
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "sans-serif"],
        display: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Cairo", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
