module.exports = {
  plugins: {
    tailwindcss: {
      config: {
        content: [
          // app content
          'src/**/*.{js,ts,jsx,tsx}',
          // include packages if not transpiling
          '../../packages/**/*.{js,ts,jsx,tsx}',
        ],
        theme: {
          extend: {
            colors: {
              'fvst-orange': '#ffaa4d',
              'fvst-purple': '#290076',
            },
          },
        },
        plugins: [],
      },
    },
    autoprefixer: {},
  },
};
