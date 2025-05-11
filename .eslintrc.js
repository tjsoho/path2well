module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "plugin:@next/next/recommended"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
