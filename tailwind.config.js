/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          400: '#D4F567',
          500: '#CAE962',
          600: '#B3CF57',
      }
    },
    animation: {
      'grow': 'grow 0.3s ease-in',
    },
    keyframes: {
      grow: {
        '0%': { width: '0%' },
        '100%': { width: '212px' },
      }
    }
  },
  plugins: [],
}
}
