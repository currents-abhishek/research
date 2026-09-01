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
