import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Imbari vibrant tropical palette
        coffee: {
          dark: "#1e293b",   // navy blue (dark slate)
          mid: "#1e3a8a",    // rich blue
          light: "#fef3c7",  // cream/amber light
          accent: "#ff6b35", // vibrant orange
          brown: "#3e2723",  // dark coffee brown
          chocolate: "#4a2c2a", // dark chocolate brown
          cream: "#f5e6d3",   // coffee cream for dark backgrounds
          'very-dark': "#2d1b13" // very dark brown
        },
        imbari: {
          orange: "#ff6b35",
          coral: "#ff8c42",
          blue: "#1e3a8a",
          navy: "#1e293b",
          teal: "#14b8a6",
          turquoise: "#06b6d4",
          cream: "#fef3c7",
          peach: "#fed7aa",
          gold: "#fbbf24",
          'coffee-brown': "#3e2723",
          'dark-chocolate': "#4a2c2a",
          'coffee-cream': "#f5e6d3",
          'very-dark-brown': "#2d1b13"
        }
      },
      boxShadow: {
        "brand-soft": "0 18px 45px rgba(255, 107, 53, 0.25)",
        "brand-glow": "0 0 40px rgba(255, 107, 53, 0.3)"
      },
      borderRadius: {
        brand: "1.75rem"
      }
    }
  },
  plugins: []
};

export default config;
