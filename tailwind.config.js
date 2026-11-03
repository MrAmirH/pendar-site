/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Vazirmatn Variable"', 'Vazirmatn', 'Tahoma', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Deep navy (سرمه‌ای) — primary brand scale. 700 = #1E3A8A, 900 = #0F172A
        navy: {
          50: '#F4F7FC',
          100: '#E6ECF8',
          200: '#C9D6EF',
          300: '#9DB3E0',
          400: '#6684C9',
          500: '#3F5FB0',
          600: '#2B4A9B',
          700: '#1E3A8A',
          800: '#16295F',
          900: '#0F172A',
          950: '#0A1020',
        },
        // WhatsApp accent for order / inquiry CTAs
        wa: {
          DEFAULT: '#25D366',
          dark: '#1EBE5A',
          soft: '#E8FAF0',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          alt: '#F3F4F6',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,.04), 0 8px 24px -8px rgba(15,23,42,.10)',
        lift: '0 2px 4px rgba(15,23,42,.05), 0 20px 40px -12px rgba(30,58,138,.25)',
        glass: '0 8px 32px rgba(15,23,42,.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
