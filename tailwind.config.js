/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 150s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-50% - 1rem))' },
        }
      },
      colors: {
        primary: "#000000",
        secondary: "#BB0400",
        surface: "#FFFFFF",
        "surface-low": "#F1F3FF",
        "surface-high": "#E1E8FD",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        20: "5rem",
        24: "6rem",
      }
    },
  },
  plugins: [],
}
