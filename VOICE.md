# VOICE.md

How Abhishek edits a research article. Each entry is a real edit, the before and after, and the reason. Read this before drafting or revising anything under `src/content/research/`.

Source of the examples below: the 2026-09-15 edit pass on `ai-answers-cite-old-pages-kept-fresh.mdx`.

## Page shape

The first screen is, in order: **h1 → subtext → "what this means for us" → the chart → two or three stat tiles → Summary.** Method and Caveats sit together at the bottom, above the Appendix.

- **Drop the "What we did" paragraph. Put the chart there instead.**
  - Before: an opening paragraph restating the method ("What we did: ran a pilot study. 59 buyer-intent prompts through…").
  - After: the figure, straight under the takeaway line.
  - Why: the reader should see the finding before the procedure. The method is one scroll down for anyone who wants it; the chart is the argument.
- **Method moves to the bottom, directly above Caveats.**
  - Before: Summary → Method → Takeaways → Caveats.
  - After: Summary → Takeaways → Method → Caveats → Appendix.
  - Why: Method and Caveats are the same genre (how to read the numbers) and belong together. Neither earns a place ahead of the takeaways.
- **Stat tiles right after the chart, exactly two or three.** The value is one big number; the label is plain words with the hedge in parentheses.
  - Example: `1.9 yrs` / "typical age of a cited page (half are older)" and `69%` / "were edited in the last 12 months".
  - Why: the tiles are the numbers a reader would quote. Give them the number and the exact reading of it, nothing else.

## Figure caption

- **The caption reads the chart for the reader: what each colour is, then what each colour's shape means.** No section under the chart repeating it.
  - Before: "Same 356 pages, two dates each. Blue is when the page was born; orange is when it was last touched. Striped segments are Wayback Machine estimates for pages that declared no date." followed by a five-bullet section walking the same bars.
  - After: "Each of the 356 cited pages have two dates in this graph. Blue is when a page was first published; orange is when it was last updated. Blue is spread out: pages of every age get cited, old ones included. Orange is bunched at the right: most cited pages were updated recently."
  - Why: a reader looks at the chart and the caption together. Open with a full sentence that says what one bar-pair is ("Each of the 356 cited pages have two dates in this graph"), not a compressed note ("Same 356 pages, two dates each"). Say the shape and its meaning in one sentence per colour, and cut the section that re-explains the bars in prose; the stat tiles and Summary already carry the numbers. Method notes (what striped means, where estimates come from) stay out of the caption: the in-chart legend labels them and the Method section explains them.

## Headline

- **Say the finding as a full sentence about the subject, including the qualifier.**
  - Before: "Answer engines prefer old articles, but regularly updated"
  - After: "Answer engines prefer to cite old pages that have been regularly updated"
  - Why: "prefer to cite" names the behaviour we measured. "Old pages that have been regularly updated" is one noun phrase, not two clauses joined by "but", so the reader gets one idea.

## Subtext

- **The subtext is a plain-terms TL;DR: the premise, the sample, then the key numbers as short sentences.** It is longer than a meta description and lives in the `deck` frontmatter field; `description` stays short for the meta tag.
  - After: "A pilot study of 356 cited pages among 59 prompt queries shows a clear preference of answer engines like ChatGPT, Google AI Mode and Google AI Overviews towards regularly updated pages. The typical cited page is two years old. Seven in ten were edited in the last year. Only four in ten were written in the last year."
  - Why: someone who reads only the header should leave with the premise (what was studied), the sample size, and the takeaway in simple terms. Ratios in words ("seven in ten"), one per sentence.
- **Name the engines in the subtext.** "Answer engines" alone is jargon; "answer engines like ChatGPT, Google AI Mode and Google AI Overviews" tells a first-time reader what was measured.
  - Before: "…a clear preference of answer engines towards regularly updated pages."
  - After: "…a clear preference of answer engines like ChatGPT, Google AI Mode and Google AI Overviews towards regularly updated pages."
  - Why: the reader may not know the term, and the named products are the ones they search for.

## The "what this means for us" line

- **Directly under the subtext, a bold-led paragraph that turns the finding into what we do next.**
  - After: "**What this means for us:** only 35% of cited pages are under a year old. Refreshing the pages we already have beats publishing new ones — keeping content updated can be important to maintain citations."
  - Why: research on this site exists to change what we do. State the action next to the finding, before the reader scrolls. "For us" is honest: it is our read, not advice to the world.
- **The takeaway is hedged like the finding, not an order.**
  - Before: "…put a real edit date on every page and keep it moving."
  - After: "…keeping content updated can be important to maintain citations."
  - Why: an imperative ("put a date on every page") claims we know the mechanism. "Can be important to maintain citations" says what the data supports and names the thing at stake, the citation, rather than a tactic.

## What stays in Takeaways

- **Takeaways are findings. A section about how a number was checked is method, and goes to Method or the Appendix.**
  - Before: a Takeaways section "The undated pages, checked another way" walking the Wayback comparison (59 pages, 49% changed, exclusion counts).
  - After: section removed. The Wayback approach is described in Method; the outcome table stays in the Appendix; the one line the argument needs ("publishers who mark up dates are the ones who edit") stays in the declared-dates section.
  - Why: a reader in Takeaways wants what we found, not how we double-checked it. Verification detail is real and kept, but lower on the page.

- **A section whose point is already in the takeaway line is cut.**
  - Before: a Takeaways section "Most cited pages don't state a date — say yours" (28% carry a usable date, 45% of readable articles declare one, "put a declared dateModified on the page").
  - After: section removed. The action already sits under the subtext ("keeping content updated can be important to maintain citations"); the coverage numbers remain in Method and the Appendix.
  - Why: once the top of the page says what to do, a section that re-derives the same instruction is repetition, not a finding.

## Section headings and tables

- **A robustness check is a caveat's answer, not a takeaway. File it under Caveats, titled "However…".**
  - Before: "The same shape in the pages that state their own dates" opened Takeaways, directly under the chart.
  - After: moved to the end of Caveats as "However, estimates don't seem to change the outcome", with the same bullets (declared-only median 15 months and 4 months, same shape).
  - Why: the section exists to answer the first caveat (two fifths of the set is estimated). Next to the caveat it reads as reassurance; among the takeaways it read as a finding. "However" tells the reader the caveat was raised and dealt with. Keep an h3 under ~50 characters so it stays on one line at the column width.

- **A heading states one finding, not a contrast.**
  - Before: "SaaS is fresh, shopping is stale"
  - After: "SaaS is the freshest"
  - Why: one claim per heading. The contrast is still visible in the table and the bullets under it.
- **A table carries only the columns that make the point, and the rows that matter are highlighted.**
  - Before: seven columns (dated citations, median created, median edit, edited < 90 d, created > 1 y, edited < 1 y) for five verticals.
  - After: vertical, median days since created, median days since edit. SaaS and Shopping rows wrapped in `<mark>`.
  - Why: the heading is about edit age, so the table shows age and edit age and nothing else. Highlighting the two rows the prose talks about tells the reader where to look; the full columns can go in the Appendix if anyone needs them.

## Claims

- **Link findings across studies with "related to", not "explains".**
  - Before: "It also explains a finding from the answer-quality study: most factual errors in AI answers were staleness, not invention."
  - After: "This is related to a finding from the answer-quality study: …"
  - Why: two snapshot studies can point the same way; neither proves the other. "Explains" claims a mechanism we didn't test.

- **Report the outcome with the certainty the experiment supports, then translate it to the takeaway. Don't state a law.**
  - Before: "Being new doesn't get a page cited. Being kept up to date does."
  - After: "Answer engines seem to be biased to cite old pages that have been recently updated instead of fresh new pages."
  - Why: one snapshot of 356 pages shows a bias, not a rule. "Seem to be biased" is what the data supports. Absolute phrasing ("doesn't get cited") overclaims and reads as a slogan; a soft, specific claim reads as a finding and still translates to the same action.

## Appendix

- **No appendix of summary tables. Show three worked examples and link the full data instead.**
  - Before: an Appendix with six tables (half-year bins, by engine, time since edit, time since created, Wayback outcomes, date sources).
  - After: an "Examples" section: three prompts, one per engine, each an expandable block listing every cited page with its published date, updated date and where the updated date came from. Under it, one link: "Full set of data tracking created and modified date provenance for 767 citation URLs" (CSV).
  - Why: a reader who wants to check the claim wants to see a real prompt and its real citations, not more aggregates. Anyone who wants the aggregates can compute them from the file.
