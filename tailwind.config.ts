import type { Config } from "tailwindcss";

const config: Config = {
  // Karanlık mod desteği (Sınıf tabanlı)
  darkMode: ["class"], 
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Hata veren kısmı daha güvenli hale getirdik
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // ... diğer renk tanımlamaların (gold, purple vb.) aynı kalabilir
      },
      // ... borderRadius, keyframes ve animation kısımların aynı kalabilir
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;