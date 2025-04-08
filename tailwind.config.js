/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#5C2C0F",       // Deep brown
        accent: "#C8912F",      // Gold
        highlight: "#D94B57",   // Pink-red for CTAs
        cream: "#FDF8F2",       // Background
        body: "#1E1E1E",        // Text
      },
      keyframes: {
        zoomOut: {
          '0%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        zoomOut: 'zoomOut 3s ease-out',
      },
    },
  },
  plugins: [],
}

