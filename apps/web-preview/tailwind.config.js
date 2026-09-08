/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#06080d',
          card: 'rgba(11, 15, 23, 0.85)',
          gold: '#e6b800',
          cyan: '#00f0ff',
          neonGreen: '#39ff14',
          neonRed: '#ff0055',
          neonPurple: '#a855f7'
        }
      },
      fontFamily: {
        cyber: ['Chakra Petch', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
