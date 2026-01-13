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
          bg: "#FFFFFF", // Pure white for newsprint feel
          paper: "#F5F5F0", // Off-white for "aged" paper feel
          text: "#000000", // Pure black
          border: "#000000", // Pure black for hard lines
          gray: "#666666",
          accent: "#FF0000", // Correction pen red
        },
      },
      fontFamily: {
        wanted: ["var(--font-wanted)", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-wanted)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Times New Roman", "Times", "serif"],
      },
      fontSize: {
        'tiny': '10px',
        'xs': '12px',
        'sm': '13px',
        'base': '14px', // Standard size for eepark style
        'lg': '15px',
        'xl': '16px',
        '2xl': '18px',
        '3xl': '20px',
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.03em",
        normal: "-0.01em",
        wide: "0.02em",
      },
      lineHeight: {
        none: "1",
        tight: "1.2",
        snug: "1.35",
        normal: "1.45",
      },
      borderWidth: {
        'DEFAULT': '1px',
        '0': '0',
        '1px': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      spacing: {
        '1px': '1px',
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
      },
    },
  },
  plugins: [],
};

export default config;
