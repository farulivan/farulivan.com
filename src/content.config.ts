/**
 * Wiring only — no rules live here.
 *
 * Each collection pairs a loader (where the content comes from) with a schema
 * (what counts as valid). Because the schemas are a separate pure module,
 * moving to a CMS is a change to the `loader` lines alone: no schema moves, no
 * component moves, no page moves. The content boundary does here what a
 * network boundary does in an application that talks to a server.
 */
import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"

import {
  capabilitySchema,
  experienceSchema,
  postSchema,
  projectSchema,
} from "./content/schemas"

/** Locale lives in frontmatter, so these folders are organization only. */
const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.mdx" }),
  schema: postSchema,
})

/** Case studies. The body is the narrative; the frontmatter is everything else. */
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.mdx" }),
  schema: projectSchema,
})

/** Career timeline rows. Plain Markdown: there is no body, only frontmatter. */
const experience = defineCollection({
  loader: glob({ base: "./src/content/experience", pattern: "**/*.md" }),
  schema: experienceSchema,
})

/**
 * One file rather than one per row. These are a handful of short lists that
 * are read and edited together, and splitting them across a folder would be
 * filing for its own sake.
 *
 * TODO(content): the lists in capabilities.json are placeholders. JSON has no
 * comments, so the marker for them lives here.
 */
const capabilities = defineCollection({
  loader: file("./src/content/capabilities.json"),
  schema: capabilitySchema,
})

export const collections = { writing, projects, experience, capabilities }
