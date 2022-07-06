/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'darkPink': '#241025',
        'darkPurple': '#111827',
        'blueLogin': "#13111C",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
