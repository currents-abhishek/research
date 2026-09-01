// Supplies <lastmod> for the sitemap from article frontmatter. astro.config
// runs before content collections exist, so this reads the MDX files directly
// (dates only — the collection schema is still the source of truth for content).
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const DIR = new URL("../src/content/research/", import.meta.url)
const BASE = "/research"

function frontmatterDates(text) {
  const fm = /^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? ""
  const get = (k) => /^\s*(\S+)/.exec(fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m"))?.[1] ?? "")?.[1]
  const draft = /^draft:\s*true/m.test(fm)
  return { publish: get("publishDate"), updated: get("updatedDate"), draft }
}

export function researchLastmod() {
  const dates = new Map()
  let newest
  for (const f of readdirSync(DIR).filter((f) => f.endsWith(".mdx"))) {
    const { publish, updated, draft } = frontmatterDates(readFileSync(join(DIR.pathname, f), "utf8"))
    if (draft || !publish) continue
    const d = new Date(updated ?? publish)
    if (Number.isNaN(d.valueOf())) continue
    dates.set(f.replace(/\.mdx$/, ""), d)
    if (!newest || d > newest) newest = d
  }
  return (item) => {
    const path = new URL(item.url).pathname.replace(/\/$/, "")
    const slug = path.slice(BASE.length + 1)
    const d = path === BASE ? newest : dates.get(slug)
    if (d) item.lastmod = d.toISOString().slice(0, 10)
    return item
  }
}
