module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase"]
      },

      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"]
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow"
      },

      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase"],
        leadingUnderscore: "require"
      },

      {
        selector: "typeLike",
        format: ["PascalCase"]
      }
    ]
  }
};
