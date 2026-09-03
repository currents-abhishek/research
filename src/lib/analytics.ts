// Analytics — copied from acmebot-toolkit.php §B0 (GA4 + Google Ads + OpenPanel),
// which itself mirrors the Next.js app. Same IDs, same `defer`, so /research
// reports alongside /blog. The plugin is the source of truth: if the IDs change
// there, change them here. (OpenPanel's client values are public — they ship in
// the HTML of every /blog page today.)
export const GA_ID = "G-W0S1V579N3"
export const ADS_ID = "AW-18057749604"

const OPENPANEL = {
  clientId: "b30a52fe-42f1-40cf-b84d-2bbacacbb89c",
  clientSecret: "sec_77b87ce97cbd1e5bf913",
  apiUrl: "https://analytics.acme.bot/api",
  trackScreenViews: true,
  trackOutgoingLinks: true,
  trackAttributes: true,
}

export const gtagInline = (ga: string, ads: string) =>
  `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${ga}");gtag("config","${ads}");`

export const opInline = () =>
  `window.op=window.op||function(){(window.op.q=window.op.q||[]).push(arguments)};op("init",${JSON.stringify(OPENPANEL)});`

// Injects the two loader scripts on the first user interaction (pointer, key,
// touch, scroll, mouse move), or 8 s after `load` for a visitor who never
// interacts. Keeps ~350 KB of third-party JS and its long tasks off the
// critical path; the inline queues above buffer any events fired before the
// loaders arrive. Trade-off, agreed 2026-09-03: a visitor who leaves within
// a few seconds without touching the page is not counted.
export const analyticsLoader = (ga: string) =>
  `(function(){var d=document,done=false;function go(){if(done)return;done=true;` +
  `["https://www.googletagmanager.com/gtag/js?id=${ga}","https://openpanel.dev/op1.js"].forEach(function(u){var s=d.createElement("script");s.src=u;s.async=true;d.head.appendChild(s)})}` +
  `["pointerdown","keydown","touchstart","scroll","mousemove"].forEach(function(e){addEventListener(e,go,{once:true,passive:true})});` +
  `addEventListener("load",function(){setTimeout(go,8000)})})();`
