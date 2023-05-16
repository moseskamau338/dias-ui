/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
    darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily:{
        'sans': ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
      },
      fontSize:{
        'xs': '.75rem',
      },
      colors:{
         brand: {
           orange: '#FF9000',
           blue: '#005384',
           'light-blue': '#55BAF5'
         },
      }
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('tailwind-scrollbar-hide')
  ],
}

