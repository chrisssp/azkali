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
            DEFAULT: "#006341",
            50: "#e6f2ec", 
            100: "#cce5d9",
            200: "#99cba4",
            300: "#66b170",
            400: "#43b02a", // Accent green
            500: "#006341", // Primary green
            600: "#005537",
            700: "#003930", // Dark green
            800: "#002b24",
            900: "#001e18",
          },
          guinda: {
            DEFAULT: "#AF272F",
            50: "#fdf3f4",
            100: "#fbe4e6",
            200: "#f5c3c8",
            300: "#ee9aa3",
            400: "#e46673",
            500: "#AF272F", // Brand Red (175, 39, 47)
            600: "#981f26",
            700: "#7c171e",
            800: "#63141a",
            900: "#531519",
          },
        },
        emerald: {
          50: "#e6f2ec", 
          100: "#cce5d9",
          200: "#99cba4",
          300: "#66b170",
          400: "#43b02a",
          500: "#006341",
          600: "#005537",
          700: "#003930",
          800: "#002b24",
          900: "#001e18",
        },
      },
      fontFamily: {
        heading: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
