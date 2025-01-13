module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        grey: {
          main: "#3E3C41",
          dark: "#1E1E1E",
          light: "#98959D",
          secondary: "#666666",
          disabled: "#BDBDBD",
          lightest: "#E0E0E0",
        },
        purple: {
          main: "#9282FA",
          dark: "#75501B",
          light: "#BDB4FA",
          gradientStart: "#75501B",
          gradientEnd: "#BDB4FA",
        },
        background: {
          primary: "#151515",
          secondary: "#1E1E1E",
          tertiary: "#23242C",
        },
        border: {
          primary: "#3E3C41",
          secondary: "#86818C",
          divisor: "#353339",
        },
        alert: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
        },
        white: "#FFFFFF",
      },
      zIndex: {
        1: "1",
        2: "2",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
