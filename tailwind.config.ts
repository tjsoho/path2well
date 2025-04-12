import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          teal: "#018D8D",     // TRUE TEAL
          white: "#FFFFFF",     // WHITE
          black: "#0D1719",     // BLACK
          purple: "#8C51C7",    // PURPLE
          pink: "#FF77BE",      // PINK
          azure: "#007FFF",     // AZURE
          carmine: "#960119",   // CARMINE
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        ethnocentric: ['var(--font-ethnocentric)'],
        chocolates: ['var(--font-tt-chocolates)'],
        beauty: ['var(--font-beauty)'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        shine: "shine 3s linear infinite",
        "shine-slow": "shine 2s linear infinite",
        flip: "flip 6s infinite steps(2, end)",
        kitrotate: "kitrotate 3s linear infinite both",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        kitrotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
