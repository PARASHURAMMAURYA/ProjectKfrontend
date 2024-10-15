/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        screens: {
          'min-320': '320px',
        },
  
        animation: {
          "spin-slow": "spin 30s linear infinite", // Customize duration here
          "spin-fast": "spin 2s linear infinite",
          "fade-in": "fade-in 2s ease-out",
          "slide-left": "slide-left 0.3s ease-out",
          "slide-up": "slide-up 2s ease-out",
          "slide-right":"slide-right 0.3s ease-out",
          marquee: 'marquee 20s linear infinite',
  
          // Add more custom animations as needed
        },
        keyframes: {
          "fade-in": {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          'slide-left': {
            '0%': { transform: 'translateX(240px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          'slide-up': {
            '0%': { transform: 'translateY(140px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          'slide-right': {
            '0%': { transform: 'translateX(-240px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          }
  
  
        },
      },
    },
  plugins: [],
}