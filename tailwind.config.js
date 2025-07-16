/** @type {import('tailwindcss').Config} */
export default {
  // Activa el modo oscuro mediante la clase "dark" en el <html> o en un contenedor
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [],
}
