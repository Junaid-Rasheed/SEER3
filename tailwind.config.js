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
        'data': "url('/assets/desktop/Desktop Background-01.png')",
        'data-mobile': "url('/assets/mobile/Mobile Background-01.png')",
        'investment': "url('/assets/desktop/Desktop Background-02.png')",
        'investment-mobile': "url('/assets/mobile/Mobile Background-02.png')",
      }
    },
  },
  plugins: [],
};
