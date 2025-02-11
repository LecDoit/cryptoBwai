/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: '#00ff7f', // Neon Green
        secondary: '#0d0d0d', // Deep Black
        background: '#121212', // Dark Grayish Black
        foreground: '#1e1e1e', // Slightly lighter gray
        text: '#e0e0e0', // Soft White
        border: '#2c2c2c', // Dark Borders
        hover: '#00cc66', // Slightly darker green for hover effects
      }
    },
  },
  plugins: [],
}
