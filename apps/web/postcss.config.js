module.exports = {
  plugins: {
    tailwindcss: {
      config: {
        content: [
          // app content
          'src/**/*.{js,ts,jsx,tsx}',
          '../../packages/**/src/*.{js,ts,jsx,tsx}',
        ],
      },
    },
    autoprefixer: {},
  },
};
