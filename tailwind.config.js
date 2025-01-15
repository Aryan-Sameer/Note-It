/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: false,
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class"
}