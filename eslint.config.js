import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import astro from "eslint-plugin-astro"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist", ".astro", "coverage", "stats.html"]),

  {
    files: ["**/*.{js,ts,astro}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      // TypeScript already reports undefined identifiers, and does it with
      // knowledge of ambient declarations like Astro's `ImageMetadata`, which
      // ESLint's own scope analysis cannot see.
      "no-undef": "off",
    },
  },

  // Parses .astro frontmatter, templates and client-side scripts, and applies
  // the a11y rules to Astro's HTML-like template syntax. The second preset is
  // why eslint-plugin-jsx-a11y is still a dependency even though there is no
  // JSX in this project: Astro reuses its rules for .astro templates.
  ...astro.configs["flat/recommended"],
  ...astro.configs["flat/jsx-a11y-recommended"],

  // Node context: config files, the build-time Sätteri plugins, and the
  // setup script. The script is .js rather than .mjs so that this glob and
  // the main TS/JS block both see it.
  {
    files: ["*.config.{js,mjs,ts}", "src/mdast/**/*.ts", "scripts/**/*.js"],
    languageOptions: { globals: globals.node },
  },
])
