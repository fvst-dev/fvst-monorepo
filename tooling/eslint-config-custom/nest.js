module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist/*", "src/prisma/client/*"],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-useless-constructor": "off",
  },
};
