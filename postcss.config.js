// Using ES Module syntax instead of CommonJS for compatibility with type:module
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Use the new package instead of tailwindcss directly
    autoprefixer: {},
  },
};
