import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...pluginQuery.configs["flat/recommended"],
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["simple-import-sort"],
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      semi: ["error"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "max-len": ["error", { code: 140, ignoreComments: true }],
      "prefer-const": "off"
    },
  }),
];

export default eslintConfig;
