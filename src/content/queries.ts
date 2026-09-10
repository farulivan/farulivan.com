/**
 * The content query layer — the only module besides pages that is allowed to
 * touch `getCollection`.
 *
 * It exists because three writing routes (index, paginated index, post) need the
 * same non-obvious rules: drop drafts, prefer the requested locale, fall back
 * to the default locale when a translation is missing, and key URLs off
 * `translationKey` so `/writing/x` and `/id/writing/x` are always the same article.
 * Duplicating that across three files is how the three quietly drift apart.
 *
 * Data access lives in one place, and pages compose it.
 */
import { getCollection, render, type CollectionEntry } from "astro:content"

import { localize, type Localized } from "./localize"
import { LOCALES, type Locale } from "./schemas"

export type PostEntry = CollectionEntry<"writing">
export type LocalizedPost = Localized<PostEntry>

/** URL slug. Shared across locales so the language picker can stay on the page. */
export function postSlug(entry: PostEntry): string {
  return entry.data.translationKey
}

const newestFirst = (a: LocalizedPost, b: LocalizedPost) =>
  b.entry.data.pubDate.getTime() - a.entry.data.pubDate.getTime()

async function publishedPosts(): Promise<PostEntry[]> {
  return getCollection("writing", (entry) => entry.data.draft !== true)
}

/**
 * Every article visible in `lang`, newest first — its own translation where
 * one exists, the default-locale version marked as a fallback where it does
 * not. An article missing from both is simply absent.
 */
export async function getPosts(lang: Locale): Promise<LocalizedPost[]> {
  return localize(await publishedPosts(), lang).sort(newestFirst)
}

export async function getPost(
  lang: Locale,
  slug: string
): Promise<LocalizedPost | undefined> {
  const posts = await getPosts(lang)
  return posts.find((post) => postSlug(post.entry) === slug)
}

/** Every (locale, slug) pair the writing section should generate. */
export async function getPostRoutes(): Promise<
  { lang: Locale; slug: string; post: LocalizedPost }[]
> {
  const routes: { lang: Locale; slug: string; post: LocalizedPost }[] = []
  for (const lang of LOCALES) {
    for (const post of await getPosts(lang)) {
      routes.push({ lang, slug: postSlug(post.entry), post })
    }
  }
  return routes
}

/** Shape the writing list renders. Kept here so both index routes agree on it. */
export interface PostListItem {
  slug: string
  title: string
  description: string
  date: Date
  minutesRead: number | undefined
  tags: readonly string[]
}

/**
 * Reading time is written into frontmatter by the Sätteri plugin and is only
 * readable after `render()`, so the list renders each entry to reach it. At
 * static-build time over a writing-sized collection that is a non-issue; if a
 * collection ever grew large enough for it to matter, the fix is to move the
 * count into the loader rather than to drop the feature.
 */
export async function getPostListItems(lang: Locale): Promise<PostListItem[]> {
  const posts = await getPosts(lang)

  return Promise.all(
    posts.map(async ({ entry }) => {
      const { remarkPluginFrontmatter } = await render(entry)
      const minutesRead = remarkPluginFrontmatter.minutesRead

      return {
        slug: postSlug(entry),
        title: entry.data.title,
        description: entry.data.description,
        date: entry.data.pubDate,
        minutesRead: typeof minutesRead === "number" ? minutesRead : undefined,
        tags: entry.data.tags,
      }
    })
  )
}

/* --- Projects -------------------------------------------------------------
   The work index and the case studies. */

export type ProjectEntry = CollectionEntry<"projects">
export type LocalizedProject = Localized<ProjectEntry>

/**
 * URL slug, shared across locales so the language picker stays on the page —
 * the same rule the writing section uses, for the same reason.
 */
export function projectSlug(entry: ProjectEntry): string {
  return entry.data.translationKey
}

/**
 * Every project visible in `lang`, in the order the author set.
 *
 * Not newest first. A portfolio leads with its strongest work, and the year it
 * happened is a fact about it rather than a ranking of it.
 */
export async function getProjects(lang: Locale): Promise<LocalizedProject[]> {
  const all = await getCollection("projects")
  return localize(all, lang).sort(
    (a, b) => a.entry.data.order - b.entry.data.order
  )
}

/** The three or so that get a full row rather than a table line. */
export async function getFeaturedProjects(
  lang: Locale
): Promise<LocalizedProject[]> {
  const projects = await getProjects(lang)
  return projects.filter((project) => project.entry.data.featured)
}

export async function getProject(
  lang: Locale,
  slug: string
): Promise<LocalizedProject | undefined> {
  const projects = await getProjects(lang)
  return projects.find((project) => projectSlug(project.entry) === slug)
}

/** Every (locale, slug) pair the work section should generate. */
export async function getProjectRoutes(): Promise<
  { lang: Locale; slug: string; project: LocalizedProject }[]
> {
  const routes: { lang: Locale; slug: string; project: LocalizedProject }[] = []
  for (const lang of LOCALES) {
    for (const project of await getProjects(lang)) {
      routes.push({ lang, slug: projectSlug(project.entry), project })
    }
  }
  return routes
}

/**
 * The project after this one in the list, wrapping at the end.
 *
 * Wrapping rather than stopping: a case study with nowhere to go next is a dead
 * end on the page most likely to be someone's entry to the site.
 */
export async function getNextProject(
  lang: Locale,
  slug: string
): Promise<LocalizedProject | undefined> {
  const projects = await getProjects(lang)
  if (projects.length < 2) return undefined

  const index = projects.findIndex(
    (project) => projectSlug(project.entry) === slug
  )
  if (index === -1) return undefined

  return projects[(index + 1) % projects.length]
}

/* --- Experience ----------------------------------------------------------- */

export type ExperienceEntry = CollectionEntry<"experience">
export type LocalizedExperience = Localized<ExperienceEntry>

/**
 * The career timeline, in the order the entries set — which is most recent
 * first, the way a CV is read. Ordered explicitly rather than by year, because
 * two roles in the same year still need a fixed sequence.
 */
export async function getExperience(
  lang: Locale
): Promise<LocalizedExperience[]> {
  const all = await getCollection("experience")
  return localize(all, lang).sort(
    (a, b) => a.entry.data.order - b.entry.data.order
  )
}

/* --- Capabilities --------------------------------------------------------- */

export type CapabilityEntry = CollectionEntry<"capabilities">
export type LocalizedCapability = Localized<CapabilityEntry>

export async function getCapabilities(
  lang: Locale
): Promise<LocalizedCapability[]> {
  const all = await getCollection("capabilities")
  return localize(all, lang).sort(
    (a, b) => a.entry.data.order - b.entry.data.order
  )
}
