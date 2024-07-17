/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      // center: true,
      padding: '2.25rem',
      screens: {
        sm: '100%',
        md: '100%',
        xl: '1440px',
      },
    },
    screens: {
      'phone': '600px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      'red': '#FC4747',
      'dark-blue': '#10141E',
      'greyish-blue': '#5A698F',
      'semi-dark-blue': '#161D2F',
    },
    fontSize: {
      sm: ['.813rem', {
        fontWeight: '400'
      }],
      base: [' .938rem', {
        fontWeight: '400'
      }],
      xl: ['1.125rem', {
        fontWeight: '700'
      }],
      '2xl': ['1.5rem', {
        fontWeight: '700'
      }],
      '2xl-light': ['1.5rem', {
        fontWeight: '400'
      }],
      '3xl': ['2rem', {
        fontWeight: '400'
      }],
    },
    extend: {},
  },
  plugins: [],
}