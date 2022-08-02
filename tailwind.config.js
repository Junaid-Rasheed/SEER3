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
    },
  },
  plugins: [],
};
