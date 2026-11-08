/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          700: '#1C5440',
          800: '#14402F',
          900: '#0E2A20',
        },
        cream: {
          50: '#FDFAF5',
          100: '#FBF4E9',
        },
        sand: {
          200: '#F1E6D4',
          300: '#E3D3BA',
        },
        amber: {
          400: '#E8B563',
          500: '#D9912B',
        },
        terracotta: {
          600: '#A85A3C',
        },
        charcoal: {
          600: '#5B564E',
          900: '#1A1A18',
        },
        whatsapp: '#25D366',
        status: {
          open: '#2E7D4F',
          closed: '#B3402F',
        }
      },
      fontFamily: {
        ethiopic: ['"Noto Sans Ethiopic"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', '"Noto Serif Ethiopic"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '"Noto Sans Ethiopic"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'arch': '50% 50% 12px 12px / 30% 30% 12px 12px',
      }
    },
  },
  plugins: [],
}
