/**
 * The entity this corpus belongs to: one Person, one Organization, authored
 * here and serialized into every page.
 *
 * These are corpus invariants — identical on every page — so they live in one
 * module rather than being restated per layout. Pages reference them by `@id`
 * and never repeat their fields.
 *
 * The `@id`s are deliberately the same strings the /blog graph emits
 * (acmebot-toolkit.php, section B8). An `@id` is the join key that makes one
 * entity out of every property writing about it: minting a research-specific
 * one would split Abhishek Iyer and ACME.BOT into two entities each, which is
 * the opposite of what publishing on two properties is for.
 */

/** Same node as /blog. Not `${SITE}/research/#...` — see the module comment. */
export const PERSON_ID = "https://acme.bot/#abhishek-iyer"

/**
 * Minted by Yoast on /blog, which is why it carries the `/blog/` path. It
 * looks wrong here and is nonetheless correct: matching the string is what
 * consolidates the two properties' Organization into one node. Changing it
 * means changing Yoast's first, where WebSite.publisher and the logo
 * ImageObject also reference it.
 */
export const ORGANIZATION_ID = "https://acme.bot/blog/#organization"

/** Hosted in the /blog media library so both properties cite one URL. */
const PERSON_IMAGE = "https://acme.bot/wp-content/uploads/2026/09/abhishek-iyer.png"

export const LINKEDIN = "https://www.linkedin.com/in/abhishek-iyer-5b025b31/"
const X_PROFILE = "https://x.com/distantgradient"

export const PERSON_NAME = "Abhishek Iyer"

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: PERSON_NAME,
  alternateName: ["A. Iyer"],
  jobTitle: "Founder & Researcher",
  description:
    "Ex-Google Search engineer and founder of ACME.BOT. Loves to dig into search and answer engine internals.",
  // LinkedIn rather than a site URL: `url` is the entity's canonical page, and
  // acme.bot is the Organization's. LinkedIn also carries the employment
  // history that corroborates the ex-Google and founder claims below.
  url: LINKEDIN,
  image: {
    "@type": "ImageObject",
    "@id": "https://acme.bot/#abhishek-iyer-image",
    url: PERSON_IMAGE,
    contentUrl: PERSON_IMAGE,
    width: 800,
    height: 800,
    caption: PERSON_NAME,
  },
  // schema.org's primary sense for alumniOf is educational, but it is what the
  // ecosystem parses for a former employer; the precise alternative
  // (hasOccupation + OccupationalRole) is read by almost nothing.
  alumniOf: [{ "@type": "Organization", name: "Google" }],
  // His OWN profiles only. sameAs asserts identity, so a property he merely
  // publishes on does not belong here.
  sameAs: [LINKEDIN, X_PROFILE],
  knowsAbout: [
    "Answer Engine Optimization",
    "AEO",
    "Generative Engine Optimization",
    "GEO",
    "Search Engine Optimization",
    "SEO",
    "AI SEO agents",
    "Human-in-the-loop SEO agents",
    "HITL SEO agents",
    "Non-commodity content",
    "AI search",
    "Entity authority",
    "LLM citation behavior",
  ],
  // Third-party coverage. Each `name` says what the source actually says: both
  // quote Iyer rather than being about him, and schema.org has no inverse of
  // `mentions` on Person, so subjectOf carries both senses and the label keeps
  // the claim proportionate. An entry the source does not support is worse
  // than citing nothing.
  subjectOf: [
    {
      "@type": "NewsArticle",
      name: "New York Magazine: Iyer on GEO, and the finding that ChatGPT queries Google",
      url: "https://nymag.com/intelligencer/article/seo-is-dead-say-hello-to-geo.html",
      datePublished: "2025-08-04",
      publisher: { "@type": "Organization", name: "New York Magazine" },
    },
    {
      "@type": "Article",
      name: "Semrush: Iyer’s decoy-page experiment showing ChatGPT uses Google",
      url: "https://www.semrush.com/blog/chatgpt-definitely-uses-google/",
      publisher: { "@type": "Organization", name: "Semrush" },
    },
  ],
} as const

export const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "ACME.BOT",
  url: "https://acme.bot/",
  logo: {
    "@type": "ImageObject",
    "@id": "https://acme.bot/blog/#/schema/logo/image/",
    url: "https://acme.bot/logo/logo-small-wide.svg",
  },
  founder: { "@id": PERSON_ID },
  location: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
  },
  knowsAbout: [
    "Answer Engine Optimization",
    "AI SEO agents",
    "Human-in-the-loop SEO agents",
    "HITL SEO agents",
    "Non-commodity content",
    "Content refresh",
    "Internal linking",
    "AI keyword research",
  ],
} as const

/** Wraps nodes in the single `@graph` a page emits, so every `@id` reference
 *  resolves within that page. A bare `{"@id": ...}` pointing at a node defined
 *  on some other page is a dangling reference. */
export const graph = (...nodes: unknown[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
})
