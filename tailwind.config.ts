import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B3D2E",
        secondary: "#1F7A4D",
        softGreen: "#E8F3ED",
        gold: "#C9A646",
        surface: "#F4F6F8",
      },
    },
  },
  plugins: [],
};

export default config;
