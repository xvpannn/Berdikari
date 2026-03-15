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
        cakep: {
          maroon: "#800000",
          "maroon-dark": "#5A0000",
          heading: "#0F172A",
          grayLight: "#F8FAFC",
          textMain: "#1E293B",
          textMuted: "#64748B",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;
