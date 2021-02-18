module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ro: {
          DEFAULT: "#519872",
          white: "#fff9e0",
          lblue: "#8ac4ff",
          dblue: "#0C6291",
          red: "#dd614a",
          light: "#7fv685",
          dark: "#426a5a",
          black: "#393e41",
        },
      },
      fontFamily: {
        quote: ["Newsreader", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
