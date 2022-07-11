module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineHeight: {
        '32': '8rem',
      },
      minHeight: {
        '28': '7rem',
      },
      minWidth: {
        '28': '7rem',
        '56': '14rem'
      },
      rotate: {
        '360': '360deg',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}