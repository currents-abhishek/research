// @ts-check
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import { unified } from "@astrojs/markdown-remark"
import { rehypeTableWrap } from "./scripts/rehype-table-wrap.mjs"
import { rehypeHeadingAnchor } from "./scripts/rehype-heading-anchor.mjs"
import { researchLastmod } from "./scripts/sitemap-lastmod.mjs"

// Served at https://acme.bot/research by a host that is not decided yet (§9).
// `site` + `base` make every emitted URL (canonical, sitemap, RSS) absolute
// and correctly prefixed regardless of who serves the files.
export default defineConfig({
  site: "https://acme.bot",
  base: "/research",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    mdx(),
    sitemap({
      // Drafts never reach the build, so nothing to filter here; 404 is excluded by Astro.
      // lastmod: updatedDate ?? publishDate per article; newest article for the listing.
      serialize: researchLastmod(),
    }),
  ],
  markdown: {
    // GFM (tables, footnotes) is on by default in the unified processor (§4.4).
    processor: unified({ gfm: true, rehypePlugins: [rehypeTableWrap, rehypeHeadingAnchor] }),
    shikiConfig: { theme: "vesper" },
  },
})
