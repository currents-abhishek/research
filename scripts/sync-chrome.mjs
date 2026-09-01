// Fetches the site chrome from WordPress at build time and commits it.
// On any failure this exits 0 and leaves the previously committed files in
// place — a WordPress outage must never break a research deploy.
import { writeFile, mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ENDPOINT =
  process.env.CHROME_ENDPOINT ?? "https://acme.bot/blog/wp-json/acmebot/v1/chrome"
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/generated")
const TIMEOUT_MS = 8000

async function get(url, as = "json") {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return as === "json" ? res.json() : res.text()
}

try {
  const chrome = await get(ENDPOINT)
  for (const key of ["header_html", "footer_html", "css_url"]) {
    if (!chrome[key]) throw new Error(`chrome payload missing ${key}`)
  }

  // The plugin stylesheet opens with a render-blocking Google Fonts @import.
  // We self-host JetBrains Mono (§4.3), so strip it. Everything else is kept
  // verbatim: the blog-only rules simply never match a research page, and
  // keeping the file whole is far more robust than trying to extract the
  // chrome rules by selector.
  const css = (await get(chrome.css_url, "text")).replace(
    /^@import\s+url\(["']https:\/\/fonts\.googleapis\.com[^)]*\);?\s*$/gm,
    ""
  )

  await mkdir(OUT, { recursive: true })
  await writeFile(
    `${OUT}/chrome.json`,
    JSON.stringify(
      {
        version: chrome.version,
        syncedAt: chrome.generated,
        header_html: chrome.header_html,
        footer_html: chrome.footer_html,
      },
      null,
      2
    ) + "\n"
  )
  await writeFile(`${OUT}/chrome.css`, css)
  console.log(`chrome synced from plugin v${chrome.version}`)
} catch (err) {
  console.warn(`chrome sync failed (${err.message}) — using committed snapshot`)
  process.exit(0)
}
