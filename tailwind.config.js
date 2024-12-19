/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BearSansUI', 'sans-serif'],
        heading: ['BearSansUIHeading', 'sans-serif'],
      },
      colors: {
        primary: '#5a5678',
        secondary: '#f9f4ed',
      },
    },
  },
  plugins: [],
};
