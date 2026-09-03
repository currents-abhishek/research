// Raw model answers for <EvalTable />, keyed "{query id}:{engine}". They are
// ~360 KB of text that sits behind two disclosure clicks, so they are served
// as a separate file and fetched on the first "Show raw model output" click
// instead of being inlined into the article HTML (which was 520 KB with them).
import type { APIRoute } from "astro"
import data from "../../data/answer-quality-eval.json"

export const GET: APIRoute = () => {
  const answers: Record<string, string> = {}
  for (const q of data.queries) for (const a of q.answers) answers[`${q.id}:${a.engine}`] = a.text
  return new Response(JSON.stringify(answers), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
}
