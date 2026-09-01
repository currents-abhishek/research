// Wraps every <table> in <div class="table-wrap"> so wide data tables scroll
// horizontally on narrow viewports instead of breaking the single column (§4.4).
//
// Tables with WIDE_COLS or more columns also get `table-wrap--bleed`, which
// breaks them out of the 68ch measure and runs them end-to-end across the
// viewport (see research.css). Narrow tables stay on the measure.
const WIDE_COLS = 5

function columnCount(table) {
  let row = null
  const findRow = (n) => {
    if (row || n.type !== "element") return
    if (n.tagName === "tr") { row = n; return }
    n.children?.forEach(findRow)
  }
  findRow(table)
  if (!row) return 0
  return row.children.filter(
    (c) => c.type === "element" && (c.tagName === "th" || c.tagName === "td")
  ).length
}

export function rehypeTableWrap() {
  return (tree) => {
    const walk = (node, parent, index) => {
      if (node.type === "element" && node.tagName === "table" && parent) {
        const className = ["table-wrap"]
        if (columnCount(node) >= WIDE_COLS) className.push("table-wrap--bleed")
        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: { className },
          children: [node],
        }
        return
      }
      if (node.children) node.children.forEach((c, i) => walk(c, node, i))
    }
    walk(tree, null, 0)
  }
}
