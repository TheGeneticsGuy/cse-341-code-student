import pluginJs from "@eslint/js";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["node_modules/", "dist/", "swagger-output.json"],
  },

  // ESLint Recommended Rules
  pluginJs.configs.recommended,

  {
    files: [
      "server.js",
      "swagger.js",
      "routes/**/*.js",
      "controllers/**/*.js",
      "db/**/*.js",
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  eslintPluginPrettierRecommended,
];
