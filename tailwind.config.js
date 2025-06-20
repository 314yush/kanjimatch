/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        brand: {
          primary: '#f0a234',
          '50': '#fffcf7',
          '100': '#fef8ee',
          '200': '#fcf0d9',
          '300': '#fae8c3',
          '400': '#ffd18b',
          '500': '#f7bd63',
          '600': '#f0a234',
          '700': '#d98825',
          '800': '#b16d1f',
          '900': '#90581f',
          '950': '#522f0e',
          secondary: "#A7D7F9", // Soft blue for game elements
          background: "#FDF6E3", // Page background
          surface: "#FEFBF6", // Card background
          "surface-darker": "#FCEECF", // Slightly darker surface for depth
          "text-primary": "#4A2E0A", // Dark brown for primary text
          "text-secondary": "#8D6E63", // Lighter brown for secondary text
        },
        success: "#4CAF50",
        error: "#F44336",
        warning: "#FFC107",
        // Adding specific colors from the design
        podium: {
          gold: "#FFC107",
          silver: "#A7D7F9",
          bronze: "#E57373",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        jp: ["Noto Sans JP", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      borderRadius: {
        'sm': '0.5rem',      // 8px
        DEFAULT: '1rem',     // 16px
        'md': '1.25rem',     // 20px
        'lg': '1.5rem',      // 24px
        'xl': '2rem',        // 32px
        'full': '9999px',
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 8px 16px rgba(0, 0, 0, 0.08)',
        'strong': '0 12px 24px rgba(74, 46, 10, 0.12)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      // Adding keyframe animations for a more dynamic feel
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

