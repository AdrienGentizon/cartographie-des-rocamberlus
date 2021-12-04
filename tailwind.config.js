module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        noise:
          "linear-gradient(135deg, #008ba2b5, #00ac94cf),  url('./assets/images/bg-noise.svg')",
        noise2: "url('./assets/images/bg-noise.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
