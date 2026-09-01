# acme-research

Static Astro site for `https://acme.bot/research`. Independent of WordPress at
runtime and of the acme.bot product. Spec: `PHASE-1-ASTRO-SITE.md` in acme-growth.

## Run

- Node ≥ 22.12 (`.nvmrc`). `npm install`, then `npm run dev` / `npm run build` / `npm run preview`.
- `npm run build` runs `scripts/sync-chrome.mjs` first (see below), then `astro build` → `dist/`.
- Output is served under `/research`; `astro.config.mjs` sets `site` + `base` so all URLs are absolute.
- **Trailing slash is canonical.** `trailingSlash: "always"` + `build.format: "directory"`, so
  every route builds to `slug/index.html` and every emitted URL (canonical, og:url, sitemap,
  RSS, internal links) ends in `/`. Dev and preview enforce it: `/research/foo` 404s, `/research/foo/` serves.
  `path()` in `src/lib/site.ts` skips anything with a file extension, so `rss.xml`, the woff2 and
  `_astro/*` assets keep exact paths.
- **Host must 301 non-slash → slash** (`/research/foo` → `/research/foo/`). A static build cannot
  do this itself; it is one nginx `rewrite` / Cloudflare rule at deploy time. Without it those
  URLs 404 instead of redirecting.

## Content

- Articles: `src/content/research/*.mdx`. Schema: `src/content.config.ts`.
- **Filename = URL.** `foo.mdx` → `/research/foo/`. Renaming a published file is a redirect, not a rename.
- `topics` are WordPress category slugs; the build fails on unknown ones. Names + links come from the synced footer (`src/lib/topics.ts`) — WP decides whether a category links to `/blog/category/{slug}/` or a root pillar page.
- Tables with 5+ columns get `table-wrap--bleed` (`scripts/rehype-table-wrap.mjs`) and run end-to-end, breaking out of the 68ch measure; `.bleed` is the same utility for components.
- `draft: true` excludes from build, listing, sitemap, RSS.
- `readingTime` computed at 250 wpm (blog parity) unless set.
- In MDX: `<Figure>`, `<Callout>`, `<Cite id="…" />`, `<EvalTable />` are available without import (registered in `src/pages/[slug].astro`). `<EvalTable />` is article-specific: it renders `src/data/answer-quality-eval.json` as the expandable per-query table (port of `aeo_tracker/reports/answer-quality-eval.html`). Tables/footnotes are plain GFM. `<mark>` = keyword highlight.
- Citations are frontmatter (`citations:`), rendered as a Sources block; `<Cite id>` links to one.

## Chrome (header/footer)

- Sourced from WordPress: `GET /blog/wp-json/acmebot/v1/chrome` (plugin §A5d).
- `scripts/sync-chrome.mjs` fetches it + the plugin CSS at build time into `src/generated/` (committed). Fetch failure → exit 0, committed snapshot is used.
- `SiteHeader.astro` / `SiteFooter.astro` own no markup, with one exception: `SiteHeader` injects the `Research` / `Blog` section nav before `.acmebot-header-tools`, because the WordPress chrome ships brand + CTA only. Injected here (not in `src/generated/`, which the sync overwrites and CI drift-checks); styled by `.acmebot-header-nav` in `research.css`. Everything else — change chrome in the plugin, not here.
- `src/styles/tokens.css` remaps the plugin's `--acme-*` tokens onto the research palette (plugin dark bg is zinc-950; product site and research use zinc-900).
- CI `chrome-drift.yml` re-syncs on PR + weekly and fails if `src/generated/` changed.
- `CHROME_ENDPOINT` env var overrides the endpoint URL (staging, local WP).

## Design

- Dark only; no toggle; `<html class="dark" data-theme="dark">`.
- Tokens: `src/styles/tokens.css` (from `common/src/styles/themes/zinc.css`, surfaces swapped for a space-grey ramp: bg #2f3237, card #212428, border #43474d; text tokens unchanged). Body prose is `--research-prose` (zinc-300); headings `--foreground`.
- Article bodies use the document type scale (`--doc-*`), never the display scale.
- JetBrains Mono self-hosted as one variable woff2 (`public/fonts/`), preloaded, `font-display: swap`. No Google Fonts request.
- Cyan (`--highlight`) only on links, one accent rule, focus. Not headings/borders/backgrounds.

## SEO / analytics

- Per page: title, description, canonical, OG/Twitter, JSON-LD (`Article` + `BreadcrumbList` on articles, `CollectionPage` on index).
- `sitemap-index.xml` and `rss.xml` generated; drafts excluded.
- GA4 / Google Ads / OpenPanel IDs in `src/lib/analytics.ts`, copied from plugin §B0. Plugin is the source of truth.
- No author bylines (blog suppresses them; research matches).

## Not yet

- Pagination (add past ~30 articles).
- Search (Pagefind if requested — see spec §11).
- Hosting/rewrite decision (spec §9/§11). Build is host-agnostic.
