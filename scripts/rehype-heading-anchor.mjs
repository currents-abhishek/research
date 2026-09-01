// Turns the depth marker before each h2/h3 into a real, clickable anchor:
//
//   <h2 id="method"><a class="hanchor" href="#method" …>#</a>Method</h2>
//
// It was CSS ::before generated content, which cannot be clicked, focused or
// read — a pseudo-element is not in the DOM. Emitting a real <a> at build time
// keeps it working without JS (it navigates to the section); the client script
// in ArticleLayout upgrades the click to "copy the link to the clipboard".
//
// This plugin runs BEFORE Astro adds heading ids, so `node.properties.id` is not
// set yet. We compute the slug with the same library and settings Astro uses
// (github-slugger, one instance per document so duplicate headings get the same
// -1/-2 suffixes), which keeps href and id in sync.
import GithubSlugger from "github-slugger"

const MARK = { h2: "#", h3: "##" }

const textOf = (node) =>
  node.type === "text"
    ? node.value
    : node.children?.map(textOf).join("") ?? ""

export function rehypeHeadingAnchor() {
  return (tree) => {
    const slugger = new GithubSlugger()
    const walk = (node) => {
      if (node.type === "element" && MARK[node.tagName]) {
        // Slug every heading in document order, so the counter stays aligned
        // with Astro's even for the tags we do not decorate.
        const id = node.properties?.id ?? slugger.slug(textOf(node))
        node.children.unshift({
          type: "element",
          tagName: "a",
          properties: {
            className: ["hanchor"],
            href: `#${id}`,
            "aria-label": "Copy link to this section",
          },
          children: [{ type: "text", value: MARK[node.tagName] }],
        })
        return
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}
