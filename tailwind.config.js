/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FFF2CC',
          300: '#FFE7A3',
          400: '#FFDF71',
          500: '#FFD93D',
          600: '#FFCD1F',
          700: '#FFC000',
          800: '#DBA000',
          900: '#B68600',
          950: '#8C6700',
        },
        space: {
          50: '#E6E8F2',
          100: '#C5C9E2',
          200: '#9EA5CD',
          300: '#7781B8',
          400: '#565FA3',
          500: '#3A4189',
          600: '#2D3266',
          700: '#212544',
          800: '#151726',
          900: '#0A0C15',
          950: '#050610',
        },
      },
    },
  },
  plugins: [],
}
