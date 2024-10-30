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
      snn: "376px", // => @media (min-width: 376px) { ... }
      sn: "430px", // => @media (min-width: 430px) { ... }
      snd: "570px", // => @media (min-width: 570px) { ... }
      mdd: "730px", // => @media (min-width: 700px) { ... }
      mx: "830px", // => @media (min-width: 830px) { ... }
      lgg: "1200px", // => @media (min-width: 1200px) { ... }
      xll: "1380px", // => @media (min-width: 1380px) { ... }
      xs: "1500px", // => @media (min-width: 1500px) { ... }
    },
  },
  plugins: [],
};
