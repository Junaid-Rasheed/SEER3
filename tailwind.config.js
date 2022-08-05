/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Space Mono", "monospace"],
      helvetica: "HelveticaLTStd",
    },
    extend: {
      colors: {
        decode3: {
          DEFAULT: "#B1EF07",
        },
      },
      backgroundImage: {
        'data': "url('/assets/desktop/Desktop Transparent-01.png')",
        'data-mobile': "url('/assets/mobile/Mobile Transparent-01.png')",
        'contact': "url('/assets/desktop/Desktop Transparent-03.png')",
        'data-contact': "url('/assets/mobile/Mobile Transparent-03.png')",
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
   require('@tailwindcss/aspect-ratio'),
  ],
};
