/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      colors: {
        brand: {
          50: "#f0fdf6",
          100: "#dcfce9",
          200: "#bbf7d4",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warm: {
          50: "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
        canvas: "#f8f6f2",
        ink: "#1a2e1f",
        muted: "#5c6b62",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(22, 101, 52, 0.08)",
        card: "0 8px 32px -8px rgba(22, 101, 52, 0.12)",
      },
    },
  },
  plugins: [],
};
