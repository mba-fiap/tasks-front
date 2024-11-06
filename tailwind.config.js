/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          200: '#FFEBF2',
          500: '#ED1164',
        },
        gray: {
          200: '#EFF1F3',
          500: '#91A3AD',
        },
      },
    },
  },
  plugins: [],
}
