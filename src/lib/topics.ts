// Topics are WordPress categories. The vocabulary — slug, display name, and
// link — is parsed from the synced footer chrome, so it is whatever /blog
// shows today. WordPress already decides per category whether the link is
// the /blog/category/{slug}/ archive or a root pillar page like /ai-seo-agent
// (plugin §A2b2 `category_link` filter); we take its answer verbatim.
import chrome from "../generated/chrome.json"

export interface Topic { slug: string; name: string; href: string }

function parseTopics(footerHtml: string): Map<string, Topic> {
  const out = new Map<string, Topic>()
  const list = /<h5>Topics<\/h5>\s*<ul>([\s\S]*?)<\/ul>/i.exec(footerHtml)?.[1] ?? ""
  for (const m of list.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)) {
    const href = m[1]!
    const name = m[2]!.trim()
    const slug = href.replace(/\/+$/, "").split("/").pop()!.toLowerCase()
    out.set(slug, { slug, name, href })
  }
  return out
}

export const TOPICS = parseTopics(chrome.footer_html)
export const TOPIC_SLUGS = [...TOPICS.keys()]

export function topic(slug: string): Topic {
  const t = TOPICS.get(slug)
  if (!t) throw new Error(`Unknown topic "${slug}". Known: ${TOPIC_SLUGS.join(", ")}`)
  return t
}
