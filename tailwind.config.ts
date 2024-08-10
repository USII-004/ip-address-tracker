import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      primary: "var(--font-rubik)",
    },
    extend: {
      backgroundImage: {
        'desktop-hero': "url('/images/pattern-bg-desktop.png')",
        'mobile-hero': "url('/images/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
};
export default config;
