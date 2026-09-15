/**
 * Presentation formatters. Business rules never live here.
 *
 * A single-locale site could hold its `Intl` objects in module-level
 * constants. With several locales the equivalent is a small cache:
 * constructing an `Intl.DateTimeFormat` is genuinely expensive, and a writing
 * index would otherwise build one per row per render.
 */
import { LOCALE_TAGS, type Locale } from "../content/schemas"

const dateFormatters = new Map<string, Intl.DateTimeFormat>()

function dateFormatter(
  lang: Locale,
  options: Intl.DateTimeFormatOptions,
  cacheKey: string
): Intl.DateTimeFormat {
  const key = `${lang}:${cacheKey}`
  let formatter = dateFormatters.get(key)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(LOCALE_TAGS[lang], options)
    dateFormatters.set(key, formatter)
  }
  return formatter
}

/** "3 September 2026" / "3 September 2026" — long form, for post headers. */
export function formatDate(date: Date, lang: Locale): string {
  return dateFormatter(
    lang,
    { day: "numeric", month: "long", year: "numeric" },
    "long"
  ).format(date)
}

/** "3 Sep 2026" — compact form, for list rows. */
export function formatDateShort(date: Date, lang: Locale): string {
  return dateFormatter(
    lang,
    { day: "numeric", month: "short", year: "numeric" },
    "short"
  ).format(date)
}

/** Machine-readable value for <time datetime="…">. */
export function toDateAttribute(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export interface PostDates {
  pubDate: Date
  /** Explicit frontmatter value; authoritative when present. */
  updatedDate?: Date | undefined
  /** Git-derived ISO string injected at build time; unreliable on hosts that shallow-clone. */
  lastModified?: string | undefined
}

export interface ResolvedPostDate {
  date: Date
  /** "updated" when the post has been revised since publication. */
  kind: "published" | "updated"
}

/**
 * The single place that decides which date a post displays.
 *
 * Precedence is frontmatter `updatedDate`, then the git-derived timestamp,
 * then the publication date. Explicit frontmatter wins because hosts that
 * shallow-clone the repository — Vercel clones at depth 2 and does not allow
 * changing it — resolve `git log` to a valid but wrong commit. An update that
 * is not actually later than publication is ignored rather than displayed.
 */
export function resolvePostDate({
  pubDate,
  updatedDate,
  lastModified,
}: PostDates): ResolvedPostDate {
  const candidate =
    updatedDate ?? (lastModified ? new Date(lastModified) : undefined)

  const isUsable =
    candidate !== undefined &&
    !Number.isNaN(candidate.getTime()) &&
    candidate.getTime() > pubDate.getTime()

  return isUsable
    ? { date: candidate, kind: "updated" }
    : { date: pubDate, kind: "published" }
}

/**
 * A span of time as a hirer reads one.
 *
 * Two shapes come out of this, because the timeline uses both at once. The
 * years alone are the headline — big enough to scan a whole career from across
 * the room — and the months are the line underneath that says exactly when.
 *
 * `2023` and `2023-02` are both valid inputs. Where the month is unknown the
 * detail line is simply absent rather than guessed, which is why the caller
 * gets `undefined` for it and not an empty string dressed up as an answer.
 */
export interface Period {
  start: string
  end?: string | undefined
  ongoing?: boolean | undefined
}

const monthName = (value: string, lang: Locale) => {
  const [year, month] = value.split("-")
  if (!month) return undefined
  // Midday, so no timezone can move the date onto the previous month.
  const date = new Date(Number(year), Number(month) - 1, 15, 12)
  return dateFormatter(lang, { month: "short" }, "month").format(date)
}

/** "2023–26", or "2021" for a single point. The scannable half. */
export function formatYears({ start, end, ongoing }: Period): string {
  const from = start.slice(0, 4)
  if (ongoing) return `${from}–`
  if (!end) return from
  const to = end.slice(0, 4)
  // An en dash and the last two digits: "2023–26" reads as one span where
  // "2023–2026" reads as two numbers that happen to be next to each other.
  return from === to ? from : `${from}–${to.slice(2)}`
}

/**
 * "Feb 2023 – Jan 2026", or undefined when no month is known at either end.
 *
 * `present` is passed in rather than hard-coded, because it is the one word in
 * the line that has to change with the reader's language.
 */
export function formatMonths(
  { start, end, ongoing }: Period,
  lang: Locale,
  present: string
): string | undefined {
  const from = monthName(start, lang)
  if (!from) return undefined

  const fromLabel = `${from} ${start.slice(0, 4)}`
  if (ongoing) return `${fromLabel} – ${present}`
  if (!end) return fromLabel

  const to = monthName(end, lang)
  if (!to) return undefined
  return `${fromLabel} – ${to} ${end.slice(0, 4)}`
}
