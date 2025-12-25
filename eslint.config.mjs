import nextPlugin from "@next/eslint-plugin-next";

const config = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**"],
  },
  {
    files: [
      "**/*.{js,jsx,ts,tsx}",
      "next.config.mjs",
      "postcss.config.mjs",
      "tailwind.config.mjs",
      "eslint.config.mjs",
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];

export default config;
