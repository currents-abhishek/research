import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"
import { TOPIC_SLUGS } from "./lib/topics"

// Slugs come from the filename. Once a file is named, the filename is a
// published URL — renaming one is a redirect, not a rename (see README).
const research = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200, "Meta description / deck — keep to ~160 chars"),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // WordPress category slugs (see lib/topics.ts). Validated against the
    // synced footer so a typo fails the build instead of shipping a dead tag.
    topics: z
      .array(
        z.string().refine((t: string) => TOPIC_SLUGS.includes(t), {
          message: `Unknown topic. Known WordPress category slugs: ${TOPIC_SLUGS.join(", ")}`,
        })
      )
      .default([]),
    heroImage: z.string().optional(),
    // Minutes. Computed at build if absent (250 wpm, matching the blog).
    readingTime: z.number().int().positive().optional(),
    citations: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          url: z.string().url(),
          publisher: z.string().optional(),
          accessed: z.coerce.date().optional(),
        })
      )
      .default([]),
    draft: z.boolean().default(false),
    // Phase 3: set while an article is still canonical on /blog during migration.
    canonicalUrl: z.string().url().optional(),
  }),
})

export const collections = { research }
