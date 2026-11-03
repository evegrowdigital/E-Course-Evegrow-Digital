/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fcfaff',
          100: '#f5ecff',
          200: '#ebd9ff',
          300: '#dbb8ff',
          400: '#c78bff',
          500: '#b05cf7',
          600: '#9a3df0',
          700: '#8029d6',
          800: '#6a22b0',
          900: '#561c8c',
        },
        ink: '#2b1f45',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 28px -10px rgba(154, 61, 240, 0.28)',
      },
    },
  },
  plugins: [],
};
