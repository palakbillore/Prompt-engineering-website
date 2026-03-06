/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Display font for headings — editorial and sharp
        display: ['"Syne"', 'sans-serif'],
        // Body font — refined and readable
        body: ['"DM Sans"', 'sans-serif'],
        // Monospace for code blocks
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Brand palette: deep ink + electric amber accent
        ink: {
          950: '#0a0b0f',
          900: '#10121a',
          800: '#171925',
          700: '#1e2130',
          600: '#262a3d',
          500: '#3a3f57',
          400: '#5a6080',
          300: '#8892b0',
          200: '#b8c0d8',
          100: '#e2e6f0',
          50:  '#f4f5f9',
        },
        amber: {
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
        },
        emerald: {
          500: '#10b981',
          400: '#34d399',
        },
        rose: {
          500: '#f43f5e',
          400: '#fb7185',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
} 