/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#f5c518',
          'yellow-dark': '#d4a010',
          dark: '#0d1b35',
          'dark-2': '#162040',
          'dark-3': '#1e2d50',
          navy: '#0a1628',
        },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
