import { getCollection, type CollectionEntry } from "astro:content"

export const SITE = "https://acme.bot"
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "") // "/research"

/** Assets keep their exact path; only page routes get the trailing slash. */
const isFile = (p: string) => /\.[^/]+$/.test(p)

/**
 * Root-relative path under the base, always trailing-slashed for page routes:
 * path("") → "/research/", path("foo") → "/research/foo/".
 * Files are left alone: path("rss.xml") → "/research/rss.xml".
 */
export const path = (p = "") => {
  const clean = p.replace(/^\//, "").replace(/\/$/, "")
  if (!clean) return `${BASE}/`
  return isFile(clean) ? `${BASE}/${clean}` : `${BASE}/${clean}/`
}
/** Absolute URL under the base. */
export const absolute = (p = "") => `${SITE}${path(p)}`

export type Research = CollectionEntry<"research">

export async function publishedResearch(): Promise<Research[]> {
  const all = await getCollection("research", ({ data }) => !data.draft)
  return all.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
}

/** Blog parity: max(1, ceil(words / 250)) — acmebot-toolkit.php `_acmebot_read_time`. */
export function readingTime(entry: Research): number {
  if (entry.data.readingTime) return entry.data.readingTime
  const text = (entry.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|\-]+/g, " ")
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 250))
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })
export const isoDate = (d: Date) => d.toISOString().slice(0, 10)
