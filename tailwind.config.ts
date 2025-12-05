import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // We keep the "coffee" name so all existing classes still work,
        // but now it's a deep luxury green palette.
        coffee: {
          dark: "#02140A",   // deep forest green (almost black)
          mid: "#064E3B",    // rich emerald
          light: "#ECFDF3",  // very light green/white
          accent: "#16A34A"  // bright, premium green
        }
      },
      boxShadow: {
        "brand-soft": "0 18px 45px rgba(0,0,0,0.55)"
      },
      borderRadius: {
        brand: "1.75rem"
      }
    }
  },
  plugins: []
};

export default config;
