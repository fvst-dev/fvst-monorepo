module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "next",
  ],
  ignorePatterns: [
    "dist/*",
    "__generated/*",
    "next.config.js",
    "src/prisma/client/*",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
