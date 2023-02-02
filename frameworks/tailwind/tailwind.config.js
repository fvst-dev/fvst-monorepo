module.exports = {
  content: [
    // app content
    "src/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fvst-orange": "#ffaa4d",
      },
    },
  },
  plugins: [],
};
