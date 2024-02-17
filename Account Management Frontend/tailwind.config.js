/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        cerebri: ["Cerebri Sans", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        muted: "#94989a",
        white: "#ffffff",
        light: "#e2e6eb",
        black: "#323a46",
        purple: "#6a69f5",
        success: "#50cd89",
        danger: "#f1416c",
        warning: "#ffc700",
        info: "#009ef7",
        dark: "#151515",
        darklight: "#1F1F1F",
        darkborder: "#343331",
        darkmuted: "#767273",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base", // only generate global styles
    }),
    require("tailwind-scrollbar"),
  ],
};
