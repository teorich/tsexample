const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  theme: {
    screens: {
      sm: '380px',
      md: '420px',
      lg: '680px',
      // or maybe name them after devices for `tablet:flex-row`
      tablet: '1024px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      red: colors.red,
      black: colors.black,
      yellow: colors.amber,
      gray: colors.gray,
      dark: {
        DEFAULT: '#3e5066',
      },
      blue: {
        DEFAULT: '#01b6eb',
      },
      pink: {
        light: '#ff7ce5',
        DEFAULT: '#ff49db',
        dark: '#ff16d1',
      },
      bipgray: {
        DEFAULT: '#9ea6b8',
      },
      accent: {
        DEFAULT: '#ffb300',
      },
    },
    fontFamily: {
      mulish: ['Mulish-Regular'],
      mulishBold: ['Mulish-Bold'],
    },
  },
};
