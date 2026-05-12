import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0A3D7A',
          light: '#1565C0',
          dark: '#062D5E',
        },
        accent: {
          DEFAULT: '#C9A227',
          light: '#F0C040',
          dark: '#9E7B0E',
        },
        uae: {
          red: '#EF3340',
          green: '#009A44',
          black: '#1A1A1A',
          white: '#FFFFFF',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-down': 'fadeDown 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
        'count-up': 'countUp 2s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A3D7A 0%, #1565C0 40%, #0D47A1 70%, #083180 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A227, #F0C040)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 8px 32px rgba(10, 61, 122, 0.10)',
        'card-hover': '0 20px 60px rgba(10, 61, 122, 0.18)',
        'primary': '0 8px 24px rgba(10, 61, 122, 0.30)',
        'gold': '0 8px 24px rgba(201, 162, 39, 0.40)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
