/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'th-orange':'#f79256',
        'li-orange':'#fbd1a2',
        'green-blue':'#7dcfb6',
        'li-blue':'#00b2ca',
        'th-blue':'#1d4e89',
      },
      borderWidth:{
        '1':'1px',
      },
      screens:{
        'sm':'120px',
      },
    },
  },
  plugins: [],
}
