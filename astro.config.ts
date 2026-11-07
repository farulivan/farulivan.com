import { satteri } from "@astrojs/markdown-satteri"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"
import { visualizer } from "rollup-plugin-visualizer"

import { LOCALE_TAGS } from "./src/content/schemas"
import { externalLinksPlugin } from "./src/mdast/external-links"
import { modifiedTimePlugin } from "./src/mdast/modified-time"
import { readingTimePlugin } from "./src/mdast/reading-time"

/** Opt-in bundle treemap: `pnpm analyze`. Never part of a normal build. */
const analyze = process.env.ANALYZE === "true"

export default defineConfig({
  /** Absolute URLs for canonicals, Open Graph, the sitemap and RSS. */
  site: "https://farulivan.com",
  output: "static",
  trailingSlash: "never",

  /**
   * The default locale is unprefixed (`/blog`), others are prefixed
   * (`/id/blog`). Pages use a single `[...lang]` rest parameter and emit
   * `lang: undefined` for English, so each route is written exactly once.
   */
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: "en", locales: LOCALE_TAGS },
    }),
  ],

  /**
   * Self-hosted through Astro's Fonts API: it downloads the files, emits
   * `font-display: swap`, and generates metric-matched fallbacks, which is
   * what keeps the layout from shifting as the webfont arrives.
   */
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Lexend",
      cssVariable: "--font-lexend",
      /*
       * A weight range, not a list: Lexend is a variable font, so one file
       * covers 300 for display and the wordmark, 400 for prose, 500 for labels
       * and 600 for emphasis. Four static cuts would be four downloads.
       */
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],

  /*
   * No monospace webfont. Code blocks are the only place this site uses one,
   * and the stack every OS already ships reads well there. Loading a second
   * family for a handful of blocks is not worth the bytes.
   */

  /**
   * Astro 7 renders Markdown with Sätteri, its native Rust pipeline, which
   * does NOT run remark or rehype plugins. These are mdast plugins written
   * against Sätteri's own AST; reaching for a remark plugin here would mean
   * installing @astrojs/markdown-remark and giving up the faster pipeline.
   */
  markdown: {
    /*
     * Both themes are emitted on every token as --shiki-light / --shiki-dark
     * and `defaultColor: false` stops Shiki picking a winner, so the choice
     * happens in CSS. With a single theme Shiki bakes it in as an inline
     * style, and light mode renders a dark code block.
     */
    shikiConfig: {
      /*
       * The high-contrast variants, not plain github-light/dark. The Lighthouse
       * budget asserts accessibility at exactly 1.00, and github-light's comment
       * token is #6A737D on white — 4.4:1, which fails the 4.5:1 threshold and
       * takes the whole page down with it.
       */
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
      defaultColor: false,
    },
    processor: satteri({
      mdastPlugins: [
        readingTimePlugin,
        modifiedTimePlugin,
        externalLinksPlugin,
      ],
    }),
  },

  vite: {
    plugins: [
      tailwindcss(),
      ...(analyze
        ? [
            visualizer({
              filename: "stats.html",
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
  },
})
