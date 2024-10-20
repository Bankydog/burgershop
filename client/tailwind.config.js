/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "640px", // Default Tailwind breakpoint
      md: "768px", // Default Tailwind breakpoint
      lg: "1024px", // Default Tailwind breakpoint
      xl: "1280px", // Default Tailwind breakpoint
      "2xl": "1536px", // Default Tailwind breakpoint

      // Custom screen size
      smm: "350px", // => @media (min-width: 350px) { ... }
      sn: "430px", // => @media (min-width: 430px) { ... }
      lgg: "1200px", // => @media (min-width: 1200px) { ... }
    },
  },
  plugins: [],
};
