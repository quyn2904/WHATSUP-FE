const { ESLint } = require("eslint");
const typescriptEslintParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const importPlugin = require("eslint-plugin-import");
const reactRefreshPlugin = require("eslint-plugin-react-refresh");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptEslintParser
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": typescriptEslintPlugin,
      import: importPlugin,
      "react-refresh": reactRefreshPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin
    },
    rules: {
      "no-console": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
