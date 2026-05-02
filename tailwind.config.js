/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 40px -4px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.02)',
      },
      colors: {
        'surface': '#f4f7fb',
      }
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          'background': '#f4f7fb',
          'primary': '#2563eb',     // Royal Blue
          'secondary': '#f0fdf4',   // Mint green tint
          'accent': '#10b981',      // Emerald Green
          'neutral': '#1e293b',     // Slate 800
          'base-100': '#ffffff',    // Pure White
          'base-200': '#f8fafc',    // Slate 50
          'base-300': '#f1f5f9',    // Slate 100
          'base-content': '#0f172a',// Slate 900
          'info': '#3b82f6',
          'success': '#22c55e',
          'warning': '#f59e0b',
          'error': '#ef4444',
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}
