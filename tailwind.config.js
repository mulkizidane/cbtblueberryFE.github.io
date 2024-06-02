/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgba(247, 238, 221, 1)',
        'secondary': 'rgba(220, 210, 190, 1)',
        'btn': 'rgba(10, 100, 170, 1)',
        'btn-sec': 'rgba(0, 141, 218, 1)',
        'btn-ter': 'rgba(183, 168, 33, 1)',
        'btn-young': 'rgba(65, 201, 226, 1)',
        'card': 'rgba(0, 141, 218, 0.6)',
        'dark-card': 'rgba(10, 100, 170, 0.34)',
        'extra': 'rgba(217, 217, 217, 1)'
      },
      boxShadow: {
        'soft': '0px 5px 50px rgba(0, 67, 101, 8%)',
        'multiple': '0 5px 50px rgba(0, 67, 101, 10%), 0 2px 6px rgba(0, 67, 101, 10%)'
      },
    },
  },
  plugins: [],
}

