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
import { glob } from "astro/loaders"

import { postSchema } from "./content/schemas"

/** Locale lives in frontmatter, so these folders are organization only. */
const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.mdx" }),
  schema: postSchema,
})

export const collections = { writing }
