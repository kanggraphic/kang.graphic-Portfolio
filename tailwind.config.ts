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
        newspaper: {
          bg: "#F5F5F0",
          text: "#0A0A0A",
          divider: "#D4D4D4",
          gray: "#666666",
        },
      },
      fontFamily: {
        gothic: ["var(--font-gothic)"],
        serif: ["var(--font-serif)"],
      },
      letterSpacing: {
        tighter: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
