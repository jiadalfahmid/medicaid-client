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
          'background': '#f8fcff',  // Soft white-blue for a clean medical feel
          'primary': '#00bfff',     // Professional medical blue
          'secondary': '#001824',   // Deep teal for contrast
          'accent': '#00ccff',      // Vibrant cyan for highlights
          'neutral': '#f0f4f8',     // Light gray-blue for backgrounds/cards
          'base-100': '#ffffff',    // Pure white for containers
          'base-content': '#1a2e40', // Dark navy for readability
          'info': '#3b82f6',        // Blue for info messages
          'success': '#22c55e',     // Green for success messages
          'warning': '#f59e0b',     // Orange for warnings
          'error': '#ef4444',       // Red for errors
        },
      },
    ],
  },
   plugins: [
    require('daisyui'),
  ],
}
