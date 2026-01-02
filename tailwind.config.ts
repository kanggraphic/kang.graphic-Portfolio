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
        editorial: {
          bg: "#F9F9F9",
          paper: "#FAFAFA",
          text: "#000000",
          border: "#000000",
          gray: "#666666",
          accent: "#0066FF",
        },
      },
      fontFamily: {
        wanted: ["var(--font-wanted)", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-wanted)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
      },
      spacing: {
        '1px': '1px',
      },
    },
  },
  plugins: [],
};

export default config;
