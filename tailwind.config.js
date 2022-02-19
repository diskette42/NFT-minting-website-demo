const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    screen:{
      'dragon': ''
    },
    extend: {
      fontFamily: {
        "VT323": ['VT323', "monospace"],
      },

    },
  },
  plugins: [],
}