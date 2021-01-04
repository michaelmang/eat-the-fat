module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        'accent': '#9b9b7a',
        'cta': '#FFCB69',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
