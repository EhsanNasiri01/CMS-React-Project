/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Dana: "Dana",
        DanaMedium: "Dana Medium",
        DanaDemiBold: "Dana DemiBold",
      },
      colors: {
        "dark-bg": "#131B2F",
        "darker-bg": "#071026",
      },
      container: {
        center: true,
        screens: {
          DEFAULT: "1775px",
        },
      },
    },
    plugins: [
      function ({ addVariant }) {
        addVariant("child", "& > * ");
        addVariant("child-hover", "& > *:hover");
      },
    ],
  },
};
