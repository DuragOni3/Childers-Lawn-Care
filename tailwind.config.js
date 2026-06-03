/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "off-white":     "#f4fff6",
        "off-white-dark":"#e6f7ea",
        "green-primary": "#1e7e34",
        "green-dark":    "#0d3d1a",
        "green-mid":     "#145a24",
        "green-light":   "#4ade80",
        "green-text":    "#1a2e1a",
        yellow:          "#facc15",
        "yellow-dark":   "#ca8a04",
        "yellow-light":  "#fef9c3",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};
