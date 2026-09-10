/**
 * Picking the right translation of an entry, for any collection.
 *
 * Every collection on this site carries `lang` and `translationKey`, so the
 * same three rules apply to all of them: show the reader's own language where
 * it exists, stand in the default one where it does not, and say which it was.
 * That was written once for the writing section and would have been written
 * again for projects, for the timeline and for the capabilities table — four
 * copies of a rule that has to agree with itself to be worth anything.
 *
 * Pure on purpose: it takes entries rather than fetching them, so it needs no
 * Astro and no build to test.
 */
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./schemas"

/** The shape this needs from an entry. Anything else about it is irrelevant. */
export interface Translatable {
  data: { lang: Locale; translationKey: string }
}

export interface Localized<T extends Translatable> {
  entry: T
  /**
   * True when the requested locale has no translation and the default-locale
   * entry is standing in. The UI says so rather than switching silently.
   */
  isFallback: boolean
  /** Locales this entry genuinely exists in — drives hreflang. */
  availableLocales: Locale[]
}

/**
 * One entry per `translationKey`, in the order the keys were first seen.
 *
 * An entry that exists in neither the requested locale nor the default one is
 * dropped rather than guessed at: a third language standing in for English
 * would be a stranger surprise than the entry simply not being there.
 */
export function localize<T extends Translatable>(
  entries: readonly T[],
  lang: Locale
): Localized<T>[] {
  const byKey = new Map<string, T[]>()
  for (const entry of entries) {
    const bucket = byKey.get(entry.data.translationKey)
    if (bucket) bucket.push(entry)
    else byKey.set(entry.data.translationKey, [entry])
  }

  const localized: Localized<T>[] = []
  for (const group of byKey.values()) {
    const translated = group.find((entry) => entry.data.lang === lang)
    const fallback = group.find((entry) => entry.data.lang === DEFAULT_LOCALE)
    const entry = translated ?? fallback
    if (!entry) continue

    localized.push({
      entry,
      isFallback: translated === undefined,
      availableLocales: LOCALES.filter((locale) =>
        group.some((candidate) => candidate.data.lang === locale)
      ),
    })
  }

  return localized
}
