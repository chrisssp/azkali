/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@gluestack-ui/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: "#0F6E56",
            50: "#edf7f4",
            100: "#c5e8de",
            200: "#9cd9c8",
            300: "#74cab2",
            400: "#4bbb9c",
            500: "#0F6E56",
            600: "#0c5c47",
            700: "#094a39",
            800: "#07382b",
            900: "#04261d",
          },
          guinda: {
            DEFAULT: "#8B1A1A",
            50: "#fdf0f0",
            100: "#f5c6c6",
            200: "#ec9d9d",
            300: "#e27373",
            400: "#d94a4a",
            500: "#8B1A1A",
            600: "#7a1717",
            700: "#631313",
            800: "#4d0f0f",
            900: "#360b0b",
          },
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "phone": "0 32px 64px -12px rgba(0,0,0,0.18), 0 16px 32px -8px rgba(0,0,0,0.10)",
        "card-hover": "0 12px 32px -4px rgba(15,110,86,0.18)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
