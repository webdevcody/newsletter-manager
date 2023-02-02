// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        wdc: {
          dark: "#1c2026",
          light: "#34eafa",
          primary: "#2fdeed",
        },
      },
      fontFamily: {
        wdc: ["var(--font-main-font)", ...fontFamily.sans],
      },
    },
  },
};
