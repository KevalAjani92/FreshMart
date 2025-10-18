// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         "fresh-green": "#22c55e",
//         "grocery-orange": "#f97316",
//         "grocery-yellow": "#eab308",
//         primary: {
//           50: "#f0fdf4",
//           100: "#dcfce7",
//           200: "#bbf7d0",
//           300: "#86efac",
//           400: "#4ade80",
//           500: "#22c55e", // Fresh Green
//           600: "#16a34a",
//           700: "#15803d",
//           800: "#166534",
//           900: "#14532d",
//         },
//         secondary: {
//           50: "#fff7ed",
//           100: "#ffedd5",
//           200: "#fed7aa",
//           300: "#fdba74",
//           400: "#fb923c",
//           500: "#f97316", // Orange
//           600: "#ea580c",
//           700: "#c2410c",
//           800: "#9a3412",
//           900: "#7c2d12",
//         },
//         accent: {
//           50: "#fefce8",
//           100: "#fef9c3",
//           200: "#fef08a",
//           300: "#fde047",
//           400: "#facc15",
//           500: "#eab308", // Yellow
//           600: "#ca8a04",
//           700: "#a16207",
//           800: "#854d0e",
//           900: "#713f12",
//         },
//       },
//       fontFamily: {
//         sans: ["Inter", "system-ui", "sans-serif"],
//       },
//       borderRadius: {
//         "2xl": "1rem",
//         "3xl": "1.5rem",
//       },
//       boxShadow: {
//         soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
//         "soft-lg":
//           "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//         fresh:
//           "0 4px 6px -1px rgba(34,197,94,0.15), 0 2px 4px -1px rgba(34,197,94,0.1)",
//         "fresh-lg":
//           "0 10px 25px -5px rgba(34,197,94,0.2), 0 10px 10px -5px rgba(34,197,94,0.1)",
//       },

//       animation: {
//         "bounce-gentle": "bounce-gentle 2s infinite",
//         "pulse-soft": "pulse-soft 2s infinite",
//         float: "float 6s ease-in-out infinite",
//         "float-delayed": "float-delayed 8s ease-in-out infinite",
//         "float-slow": "float-slow 10s ease-in-out infinite",
//         gradient: "gradient 3s ease infinite",
//         "slide-down": "slide-down 0.3s ease-out",
//         shimmer: "shimmer 2s infinite",
//         "pulse-glow": "pulse-glow 2s ease-in-out infinite",
//       },
//       keyframes: {
//         "bounce-gentle": {
//           "0%,100%": { transform: "translateY(0)" },
//           "50%": { transform: "translateY(-4px)" },
//         },
//         "pulse-soft": {
//           "0%,100%": { opacity: "1" },
//           "50%": { opacity: "0.8" },
//         },
//         float: {
//           "0%,100%": { transform: "translateY(0px)" },
//           "50%": { transform: "translateY(-20px)" },
//         },
//         "float-delayed": {
//           "0%,100%": { transform: "translateY(0px)" },
//           "50%": { transform: "translateY(-15px)" },
//         },
//         "float-slow": {
//           "0%,100%": { transform: "translateY(0px)" },
//           "50%": { transform: "translateY(-10px)" },
//         },
//         gradient: {
//           "0%,100%": { "background-position": "0% 50%" },
//           "50%": { "background-position": "100% 50%" },
//         },
//         "slide-down": {
//           from: { opacity: "0", transform: "translateY(-10px)" },
//           to: { opacity: "1", transform: "translateY(0)" },
//         },
//         shimmer: {
//           "0%": { transform: "translateX(-100%)" },
//           "100%": { transform: "translateX(100%)" },
//         },
//         "pulse-glow": {
//           "0%,100%": { "box-shadow": "0 0 20px rgba(34, 197, 94, 0.3)" },
//           "50%": { "box-shadow": "0 0 40px rgba(34, 197, 94, 0.6)" },
//         },
//       },
//     },
//   },
//   plugins: [],
// };
