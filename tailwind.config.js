/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          'background': '#f4f7fb',
          'primary': '#2563eb',     // Royal Blue
          'secondary': '#f0fdf4',   // Mint green tint
          'accent': '#10b981',      // Emerald Green
          'neutral': '#1f2937',     // Dark Gray
          'base-100': '#ffffff',    // Pure White
          'base-200': '#f8fafc',
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
