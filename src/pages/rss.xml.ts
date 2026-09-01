import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { absolute, publishedResearch } from "../lib/site"

export async function GET(_ctx: APIContext) {
  const posts = await publishedResearch()
  return rss({
    title: "ACME.BOT Research",
    description: "Original data studies from ACME.BOT on answer engines and organic search.",
    site: absolute(),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.publishDate,
      link: absolute(p.id),
      categories: p.data.topics,
    })),
    customData: "<language>en-us</language>",
  })
}
