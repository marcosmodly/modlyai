import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./widget/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Earth Tone palette
        earth: {
          background: '#1A1C19',    // Deep, muted olive-black (main page background)
          card: '#242723',          // Slate-earth shade (form containers, Pro Tips)
          border: '#3A3F38',        // Subtle border
          input: '#2D312C',         // Warm charcoal (input backgrounds)
          sage: '#8DA38E',          // Soft sage green (focus borders, toggle active)
          forest: '#3D543F',         // Deep forest green (buttons)
        },
        // Typography colors
        text: {
          heading: '#F0EFEA',       // Warm off-white/bone (main headings)
          primary: '#E3E5E2',       // Soft cream (input text, body)
          secondary: '#E3E5E2',     // Soft cream
          muted: '#7A8079',         // Muted taupe (placeholders)
          icon: '#D6C7B0',          // Soft sand/gold (icons)
        },
        // Legacy support (keeping for compatibility)
        dark: {
          base: '#1A1C19',
          surface: '#1A1C19',
          card: '#242723',
          border: '#3A3F38',
          hover: '#2D312C',
        },
        ai: {
          primary: '#8DA38E',
          secondary: '#3D543F',
          accent: '#8DA38E',
          glow: 'rgba(141, 163, 142, 0.3)',
        },
      },
      backgroundImage: {
        'gradient-ai': 'linear-gradient(135deg, #3D543F 0%, #8DA38E 100%)',
        'gradient-ai-subtle': 'linear-gradient(135deg, rgba(141, 163, 142, 0.08) 0%, rgba(141, 163, 142, 0.05) 100%)',
        'pro-tips': 'linear-gradient(135deg, rgba(141, 163, 142, 0.05) 0%, rgba(141, 163, 142, 0.02) 100%)',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(141, 163, 142, 0.2)',
        'glow-hover': '0 0 30px rgba(141, 163, 142, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
