/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tg-accent': 'var(--tg-theme-accent-text-color)',
      },
    },
  },
  plugins: [],
}
