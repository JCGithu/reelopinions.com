module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ro: {
          DEFAULT: "#519872",
          white: "#fff9e0",
          white2: "#F9F5F1",
          lblue: "#8ac4ff",
          dblue: "#0C6291",
          red: "#dd614a",
          redlight: "#F17E5C",
          light: "#7FB685",
          dark: "#426a5a",
          black: "#393e41",
          vibrant: "#24A148",
          vibrantdark: "#005A4A",
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
