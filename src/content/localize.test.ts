import { describe, expect, it } from "vitest"

import { localize } from "./localize"
import type { Locale } from "./schemas"

/** The only two fields `localize` looks at, plus a marker to identify the pick. */
const entry = (lang: Locale, translationKey: string, mark = "") => ({
  data: { lang, translationKey },
  mark,
})

describe("localize", () => {
  it("prefers the requested locale", () => {
    const result = localize(
      [entry("en", "alpha", "english"), entry("id", "alpha", "indonesian")],
      "id"
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.entry.mark).toBe("indonesian")
    expect(result[0]?.isFallback).toBe(false)
  })

  it("stands the default locale in, and says that it did", () => {
    const result = localize([entry("en", "alpha", "english")], "id")

    expect(result[0]?.entry.mark).toBe("english")
    expect(result[0]?.isFallback).toBe(true)
  })

  it("reports the locales an entry genuinely exists in", () => {
    const result = localize(
      [entry("en", "alpha"), entry("id", "alpha"), entry("en", "beta")],
      "en"
    )

    expect(
      result.find((r) => r.entry.data.translationKey === "alpha")
        ?.availableLocales
    ).toEqual(["en", "id"])
    expect(
      result.find((r) => r.entry.data.translationKey === "beta")
        ?.availableLocales
    ).toEqual(["en"])
  })

  it("drops an entry that exists in neither the requested nor the default locale", () => {
    expect(localize([entry("id", "only-indonesian")], "en")).toEqual([])
  })

  it("returns one entry per translation key", () => {
    const result = localize(
      [entry("en", "alpha"), entry("id", "alpha"), entry("en", "beta")],
      "id"
    )

    expect(result.map((r) => r.entry.data.translationKey)).toEqual([
      "alpha",
      "beta",
    ])
  })

  it("keeps the order the keys were first seen in, so callers can sort themselves", () => {
    const result = localize(
      [entry("en", "gamma"), entry("en", "alpha"), entry("en", "beta")],
      "en"
    )

    expect(result.map((r) => r.entry.data.translationKey)).toEqual([
      "gamma",
      "alpha",
      "beta",
    ])
  })
})
