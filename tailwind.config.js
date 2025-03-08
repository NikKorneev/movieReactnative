/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#030014",
				accent: "#Ab8bff",
				secondary: "#151312",
				light: {
					100: "#d6c6ff",
					200: "A8B5db",
					300: "#9cA4ab",
				},
				dark: {
					100: "#221f3d",
					200: "#0f0d23",
				},
			},
		},
	},
	plugins: [],
};
