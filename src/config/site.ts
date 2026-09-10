/**
 * App-level configuration.
 *
 * Identity and links only. Content rules live in `src/content/schemas.ts` and
 * copy lives in `src/i18n/ui.ts`; neither belongs here.
 */
import type { TranslationKey } from "@/i18n/ui"

export const siteConfig = {
  /** Appears in <title> and in structured data. */
  name: "Farul Ivan",
  /**
   * Canonical origin, no trailing slash. Also set as `site` in
   * astro.config.ts, which is what makes canonical URLs, the sitemap, RSS
   * and robots.txt absolute.
   */
  url: "https://farulivan.com",
  /** Fallback link-preview image, served from public/. */
  ogImage: "/og-default.png",
  /** Posts per page on the writing index. */
  postsPerPage: 10,
  /**
   * Primary navigation. `key` is a translation key rather than literal text,
   * so adding a locale never means touching this file.
   */
  nav: [
    // About joins this list in the change that adds its page. Listing it
    // before the route exists would ship a dead link.
    { key: "nav.work", href: "/work" },
    { key: "nav.writing", href: "/writing" },
    { key: "nav.contact", href: "/contact" },
  ],
  /**
   * The site menu. Five entries is what the card holds at this type size on
   * the shortest phone it has to work on; a sixth would either shrink the
   * type or push the last one off screen.
   */
  menu: [
    { key: "nav.home", href: "/" },
    { key: "nav.work", href: "/work" },
    { key: "nav.about", href: "/about" },
    { key: "nav.writing", href: "/writing" },
    { key: "nav.contact", href: "/contact" },
  ],
  /**
   * Where to reach him. Two links rather than three: an employer follows a
   * GitHub profile and a LinkedIn profile, and a third account nobody checks
   * is worse than no link at all.
   */
  social: {
    github: "https://github.com/farulivan",
    linkedin: "https://www.linkedin.com/in/farulivan",
  },
  contact: {
    email: "farulivan@gmail.com",
  },
  /**
   * The download states its format and size in the label. Update `size`
   * whenever the file is replaced — a stale number is worse than none.
   */
  cv: {
    // TODO(asset): the real CV. public/cv.pdf is a marked placeholder.
    href: "/cv.pdf",
    format: "PDF",
    size: "1 KB",
  },
} as const satisfies {
  name: string
  url: string
  ogImage: string
  postsPerPage: number
  nav: readonly { key: TranslationKey; href: string }[]
  menu: readonly { key: TranslationKey; href: string }[]
  social: Readonly<Record<string, string>>
  contact: { email: string }
  cv: { href: string; format: string; size: string }
}
