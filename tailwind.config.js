/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          background: "var(--color-background)",
          surface: "var(--color-surface)",
          "text-primary": "var(--color-text-primary)",
          "text-secondary": "var(--color-text-secondary)",
          border: "var(--color-border)",
          "teal-primary": "var(--color-teal-primary)",
          "teal-secondary": "var(--color-teal-secondary)",
          "teal-light": "var(--color-teal-light)",
        },
      },
      boxShadow: {
        theme: "var(--color-shadow)",
      },
    },
  },
  plugins: [],
};
