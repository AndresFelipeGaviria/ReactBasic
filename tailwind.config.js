
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-pattern': '30px 30px',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),

  ],
}

