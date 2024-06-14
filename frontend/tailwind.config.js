const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
    screens: {
      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [flowbite.plugin()],
};
