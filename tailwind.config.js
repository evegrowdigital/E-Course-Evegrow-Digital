/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8f4ff',
          100: '#efe6ff',
          200: '#e0cfff',
          300: '#cbb0fb',
          400: '#b08ef3',
          500: '#9568e2',
          600: '#7b4bc9',
          700: '#6538a8',
          800: '#4d2b82',
          900: '#35205c',
        },
        ink: '#2b1f45',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -10px rgba(101, 56, 168, 0.25)',
      },
    },
  },
  plugins: [],
};
