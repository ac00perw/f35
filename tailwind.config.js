module.exports = {
  // mode: 'jit',
  purge: [
      './public/**/*.html',
      './src/**/*.vue'
    ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['korolev', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
