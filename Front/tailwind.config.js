/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#6202B6",
        "purple-600": "#9312FF",
        "purple-400":"#AF72FF",
        "Blue-400":"#53CAFF",
        "custom-menu": "#4D5862", 
        
        "light-white": "rgba(255,255,255,0.17)",
      },
      fontFamily: {
        'poppins': ['Poppins'],
      },
      boxShadow: {
        custom: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}