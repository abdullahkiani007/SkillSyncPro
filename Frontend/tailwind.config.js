/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFD460',
          DEFAULT: '#E14411',
          dark: '#8B322C',
        },
        secondary: {
          light: '#FEFAE0',
          DEFAULT: '#FFD700',
          dark: '#2D4059',
        },
      },
    backgroundImage:{
      'parallax':"url('https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=2157&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    }
    },
  },
  plugins: [],
}

