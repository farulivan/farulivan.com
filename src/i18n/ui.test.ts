import { describe, expect, it } from "vitest"

import { LOCALES } from "@/content/schemas"

import { en, ui } from "./ui"

/**
 * Key completeness is already a compile-time guarantee: `id` is typed
 * `Record<TranslationKey, string>`, so a missing key fails `astro check`.
 * These tests cover what types cannot — that no locale was filled in with
 * placeholders, copied English, or an unsubstituted placeholder token.
 */
describe("translation dictionaries", () => {
  const keys = Object.keys(en) as (keyof typeof en)[]

  it("covers every declared locale", () => {
    for (const locale of LOCALES) {
      expect(ui[locale], `missing dictionary for "${locale}"`).toBeDefined()
    }
  })

  it("has no empty strings in any locale", () => {
    for (const locale of LOCALES) {
      for (const key of keys) {
        expect(ui[locale][key].trim(), `${locale}.${key} is empty`).not.toBe("")
      }
    }
  })

  it("declares the same placeholder tokens in every locale", () => {
    // A translation that drops "{minutes}" renders a sentence with a hole in
    // it — visible only on that locale's pages, which is exactly the bug a
    // human reviewer misses.
    const tokensOf = (value: string) =>
      [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort()

    for (const key of keys) {
      const expected = tokensOf(en[key])
      for (const locale of LOCALES) {
        expect(tokensOf(ui[locale][key]), `${locale}.${key}`).toEqual(expected)
      }
    }
  })

  it("actually translates the non-default locales", () => {
    /*
     * Some strings are identical in both languages on purpose. Naming them
     * means every other key must genuinely differ — a copied dictionary, or
     * one key left in English, fails here rather than passing on a percentage.
     *
     * Each entry needs a reason:
     */
    const sameInBothLanguages = new Set<keyof typeof en>([
      "site.title", // a name, a job title and "end to end", which Indonesian engineers say in English too
      "site.descriptor", // same
      "cv.detail", // a file format and a size, both substituted in
      "nav.openMenu", // "Menu" is the Indonesian word too
      "footer.menu", // same
      "lang.en", // languages are named in their own language, not the reader's
      "lang.id", // same
      "contact.github", // a product name
      "contact.linkedin", // same
      "contact.col.link", // "link" is what Indonesian readers say, and the copy uses it everywhere
    ])

    for (const key of keys) {
      if (sameInBothLanguages.has(key)) {
        expect(ui.id[key], `${key} is listed as untranslated`).toBe(en[key])
      } else {
        expect(ui.id[key], `${key} was left in English`).not.toBe(en[key])
      }
    }
  })
})
