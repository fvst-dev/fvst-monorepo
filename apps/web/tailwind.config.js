module.exports = {
  content: [
    // app content
    'app/**/*.{js,ts,jsx,tsx}',
    // include packages
    `../../packages/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        fvst: {
          lilac: '#290076',
          orange: '#FFAA4D',
          blue: '#00A4EB',
          grey: '#DDE5FD',
        },
      },
      fontSize: {
        xs: [
          '0.75rem',
          {
            lineHeight: '1rem',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        lg: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        xl: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '-0.03125rem',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            letterSpacing: '-0.09375rem',
            lineHeight: '2rem',
          },
        ],
        '3xl': [
          '1.875rem',
          {
            letterSpacing: '-0.09375rem',
            lineHeight: '2.25rem',
          },
        ],
        '4xl': [
          '2.25rem',
          {
            letterSpacing: '-0.125rem',
            lineHeight: '2.5rem',
          },
        ],
        '5xl': [
          '3rem',
          {
            letterSpacing: '-0.15625rem',
            lineHeight: '3rem',
          },
        ],
        '6xl': [
          '3.75rem',
          {
            letterSpacing: '-0.15625rem',
            lineHeight: '3.75rem',
          },
        ],
        '7xl': [
          '4.5rem',
          {
            letterSpacing: '-0.15625rem',
            lineHeight: '4.5rem',
          },
        ],
        '8xl': [
          '6rem',
          {
            letterSpacing: '-0.15625rem',
            lineHeight: '6rem',
          },
        ],
        '9xl': [
          '8rem',
          {
            letterSpacing: '-0.15625rem',
            lineHeight: '8rem',
          },
        ],
      },
    },
  },
  plugins: [require('autoprefixer')],
};
