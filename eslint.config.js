import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const gatedContent = {
  patterns: [
    {
      group: ["**/content/achievements.json", "**/content/gallery.json", "**/content/notices.json"],
      message: "Import from @/lib/content instead. Direct JSON imports bypass the publish gate (PLAN.md section 3).",
    },
  ],
};

export default tseslint.config(
  { ignores: ["dist", "dist-ssr", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs.flat.recommended],
    languageOptions: { ecmaVersion: 2023, globals: globals.browser },
    rules: { "no-restricted-imports": ["error", gatedContent] },
  },
  {
    files: ["src/lib/content.ts", "src/**/*.test.ts"],
    rules: { "no-restricted-imports": "off" },
  },
  {
    files: ["scripts/**/*.mjs", "vite.config.ts"],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 2023, globals: globals.node },
  },
);
