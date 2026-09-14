/**
 * The content kernel.
 *
 * Every rule about what valid content looks like lives here, as plain Zod.
 * This module imports nothing but `astro/zod`, so it is fully unit-testable
 * without Astro, a DOM, or a build — and because both the build (through
 * `content.config.ts`) and the tests validate against these exact schemas,
 * they cannot disagree about what "correct content" means.
 *
 * `astro/zod` rather than a separate `zod` install: Astro bundles its own Zod
 * and passing a schema built by a different copy breaks `defineCollection`.
 */
import { z } from "astro/zod"

export const LOCALES = ["en", "id"] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"

/** BCP-47 tags for `Intl`, `<html lang>`, hreflang and the sitemap. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-US",
  id: "id-ID",
}

/**
 * Search engines truncate titles past ~60 and descriptions past ~160
 * characters. Encoding those limits in the schema turns a soft SEO guideline
 * into a build failure, which is the only version anyone actually respects.
 */
const SEO_TITLE_MAX = 70
const SEO_DESCRIPTION_MIN = 50
const SEO_DESCRIPTION_MAX = 160

/** Fields every localized entry carries, whatever collection it belongs to. */
const localized = {
  /**
   * Stored explicitly rather than inferred from the folder path: the folders
   * are an organizational convenience, and deriving meaning from them would
   * make this schema depend on the loader's layout.
   */
  lang: z.enum(LOCALES),
  /**
   * Shared identifier linking an entry to its translations in other locales.
   * The language picker, the hreflang tags and the untranslated-fallback all
   * key off this rather than off the filename.
   */
  translationKey: z.string().min(1),
}

/**
 * `image()` is injected by Astro's schema callback — see content.config.ts.
 * Typed by its result (`ImageMetadata`, an ambient Astro global) rather than
 * imported from `astro:content`, which would cost this module its purity.
 */
type ImageHelper = () => z.ZodType<ImageMetadata>

export const postSchema = ({ image }: { image: ImageHelper }) =>
  z.object({
    ...localized,
    title: z.string().min(1).max(SEO_TITLE_MAX),
    description: z.string().min(SEO_DESCRIPTION_MIN).max(SEO_DESCRIPTION_MAX),
    pubDate: z.coerce.date(),
    /**
     * Authoritative "last updated" when present. The git-derived timestamp is
     * only a fallback, because hosts that shallow-clone (Vercel does, at
     * depth 2, and will not let you change it) report the wrong commit.
     */
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /**
     * `image()` validates the path and imports the asset, so `<Image>` can
     * emit real width/height and avoid layout shift. `alt` is required, which
     * makes an inaccessible image a build error rather than a review comment.
     */
    hero: z.object({ src: image(), alt: z.string().min(1) }).optional(),
  })

/**
 * A case study.
 *
 * The metadata is here and the narrative is in the body, which is the split
 * that keeps the work index cheap: listing every project needs the title, the
 * year, the role and the stack, and none of it needs the prose parsed.
 */
export const projectSchema = ({ image }: { image: ImageHelper }) =>
  z.object({
    ...localized,
    title: z.string().min(1).max(SEO_TITLE_MAX),
    /**
     * Two or three lines under the title in the work list, and the page
     * description when the case study is shared. One sentence doing both jobs
     * is one sentence to keep good.
     */
    summary: z.string().min(SEO_DESCRIPTION_MIN).max(SEO_DESCRIPTION_MAX),
    year: z.number().int().min(2000).max(2100),
    role: z.string().min(1),
    /** Both optional: freelance work often has neither a team nor an end. */
    teamSize: z.string().min(1).optional(),
    duration: z.string().min(1).optional(),
    stack: z.array(z.string().min(1)).min(1),
    /**
     * `featured` decides whether the project gets a full row on the home page
     * and the work index; `order` decides where it sits. Both are explicit
     * because "most recent first" is the wrong order for a portfolio — the
     * strongest work goes first, whenever it happened.
     */
    featured: z.boolean().default(false),
    order: z.number().int(),
    /**
     * Optional by design. Screenshots are still being captured, and anything
     * covered by an agreement never gets one — the work list has a variant
     * that sets the project as type instead, which is a designed state rather
     * than a gap.
     */
    screenshot: z.object({ src: image(), alt: z.string().min(1) }).optional(),
    /**
     * The block that matters when someone is deciding whether to hire you, so
     * the schema will not let a case study ship without it.
     *
     * `summary` is required and `figures` is not: plenty of good work moved
     * something nobody counted, and a sentence saying what changed is worth
     * more than an invented percentage. Where there are numbers, they are
     * strings — "40%" and "1.2s" and "3×" are not the same kind of quantity
     * and nothing here does arithmetic on them.
     */
    outcome: z.object({
      summary: z.string().min(1),
      figures: z
        .array(
          z.object({
            value: z.string().min(1),
            caption: z.string().min(1),
          })
        )
        .default([]),
    }),
    /* `z.url()` rather than `z.string().url()`, which Zod now deprecates. */
    liveUrl: z.url().optional(),
    sourceUrl: z.url().optional(),
  })

/**
 * One role in the career timeline.
 *
 * `order` rather than a date range: the timeline is a staircase of years, and
 * two roles in the same year still need a fixed sequence.
 */
export const experienceSchema = z.object({
  ...localized,
  year: z.number().int().min(1990).max(2100),
  role: z.string().min(1),
  company: z.string().min(1),
  /** Two lines on what shipped, which is the height the row is drawn at. */
  description: z.string().min(1).max(240),
  order: z.number().int(),
})

/**
 * One group of things you can do, as a row in the capabilities table.
 *
 * Grouped rather than a flat list because an undifferentiated pile of tools is
 * the least informative thing a portfolio can print. The domain is the claim;
 * the items are the evidence.
 */
export const capabilitySchema = z.object({
  ...localized,
  domain: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
  /**
   * One honest line about how deep this actually goes.
   *
   * A list of tools says what you have touched; it does not say which of them
   * you would want to be woken up about. Saying "growing, deliberately" of a
   * group is worth more than letting it sit at the same weight as the one you
   * have spent three years in, and it is the sentence that survives contact
   * with an interview.
   */
  note: z.string().min(1).max(160).optional(),
  order: z.number().int(),
})
