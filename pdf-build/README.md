# Artemis Resource PDF — Build Instructions

## Objective
Rebuild 13 resource PDFs as detailed (20+ page), visual, on-brand documents for the University of Artemis "Give" page Resources section.

## Pipeline
**Creative Flow** (see `/home/z/my-project/skills/pdf/briefs/creative-flow.md`):
1. Write a standalone HTML file per PDF (720×1020px pages, content flows).
2. Embed the shared theme CSS from `/home/z/my-project/pdf-build/theme.css` (copy contents into a `<style>` tag, or `<link>` it — but for portability, inline it).
3. Pull factual content from `/home/z/my-project/pdf-build/artemis-content.json`.
4. Use shared images from `/home/z/my-project/public/resources/img/` (reference with **relative** paths from the HTML file's location, e.g. `../public/resources/img/world-night.png` — or copy images next to the HTML).
5. Validate: `python3 /home/z/my-project/skills/pdf/scripts/poster_validate.py check-html <file>.html`
6. Convert: `node /home/z/my-project/skills/pdf/scripts/html2pdf-next.js <file>.html --output <out>.pdf --width 720px --height 1020px`
7. QA: `python3 /home/z/my-project/skills/pdf/scripts/pdf_qa.py --no-tables <out>.pdf`
8. Brand metadata: `python3 /home/z/my-project/skills/pdf/scripts/pdf.py meta.set <out>.pdf -o <out>.pdf -d '{"Title":"...","Author":"University of Artemis","Subject":"...","Creator":"University of Artemis"}'`
9. Final PDF must land at `/home/z/my-project/public/resources/<filename>.pdf` (overwriting the old one).

## Design System (non-negotiable)
- **Crimson** `#8A0000` primary, `#6B0000` deep, ink `#141414`, bg `#FAFAF8`, dark `#0c0a09`.
- **Fonts**: Inter (sans) + Noto Serif SC (serif headlines). Load via Google Fonts `<link>` in `<head>`.
- **Page**: 720×1020px. Cover = fixed-height dark page with image overlay. Body = flowing `.main-content` on cream/white. Ending = fixed-height dark page.
- **No `break-before: page` between sections** — use `margin-top` for chapter separation (see brief).
- **`break-inside: avoid`** on every card, figure, table, stat block, pullquote.
- **Each chapter ≥ 50% of a page** of content (no half-empty pages).

## Content Depth Rules
- **Every paragraph 3–5 sentences** — no single-sentence paragraphs.
- **Every section ≥ 150 words** of body content under its heading.
- **20+ pages minimum** per PDF. To hit 20+ pages with 720×1020px pages, you need roughly 6,000–9,000 words of real content plus figures/cards/tables.
- Write **actual, substantive content** — real narratives, real numbers, real explanations. Not placeholders, not "lorem ipsum", not bullet stubs.
- Use the JSON data as the factual skeleton, then **expand into prose**. E.g. for a pillar, write 3–4 paragraphs of narrative + a stat block + a pullquote + a detail callout.

## Images
Available at `/home/z/my-project/public/resources/img/`:
- `world-night.png` (1440×720) — Earth at night, global network
- `campus-architecture.png` (1344×768) — repurposed campus building
- `students-global.png` (1344×768) — diverse students collaborating
- `research-lab.png` (1344×768) — research lab interior
- `venice-node.png` (1344×768) — Venice canal/palazzo
- `abstract-crimson.png` (1440×720) — abstract crimson texture (covers)
- `graduation.png` (1344×768) — graduation ceremony
- `governance-building.png` (1344×768) — neoclassical institution

**IMPORTANT**: In HTML, reference images with a path relative to the HTML file. If the HTML is at `/home/z/my-project/pdf-build/<name>.html`, use `../public/resources/img/<file>.png`. Verify the path resolves before converting. You may also generate **PDF-specific images** via `z-ai image -p "<prompt>" -o "<path>.png" -s <size>` if a section needs a custom visual.

## Page-count strategy (how to reach 20+ pages)
- Cover (1 page)
- Executive summary / at-a-glance (1–2 pages)
- 5–7 chapters, each 2–4 pages (narrative + cards/tables/figures)
- A data/numbers spread (1–2 pages)
- Case studies or examples (1–2 pages)
- How to use this document / next steps (1 page)
- Ending (1 page)
= 20–28 pages. Aim for this structure.

## The 13 PDFs (filename → title → content source)
1. `artemis-founding-prospectus.pdf` — Founding Prospectus — vision, model, financial engine, naming, the ask (flagship, use ALL data)
2. `artemis-campaign-overview.pdf` — Campaign Overview — milestones, pillars, allocation, how to give
3. `artemis-case-for-support.pdf` — Case for Support — detailed narrative: why Artemis, why now
4. `artemis-financial-model.pdf` — Financial Model Breakdown — pro-forma, revenue, OPEX, endowment
5. `artemis-tax-guide.pdf` — Tax Deductibility Guide — jurisdiction-by-jurisdiction (use tax_jurisdictions)
6. `artemis-legal-entities.pdf` — Legal Entity Overview — corporate structure, governance (use legal_entities)
7. `artemis-naming-booklet.pdf` — Naming Opportunities Booklet — all naming opps (use naming_opportunities)
8. `artemis-giving-circles.pdf` — Giving Circles Benefits Guide — circle details (use giving_circles)
9. `artemis-campus-master-plan.pdf` — Campus Master Plan — repurposing, nodes, tiers (use campus_nodes)
10. `artemis-collegium-map.pdf` — Collegium Alliance Map — 50 colleges, 6 continents (use campus_nodes + world image)
11. `artemis-academic-prospectus.pdf` — Academic Prospectus — programs, curriculum, tutorials (use academic_pillars + programs)
12. `artemis-research-portfolio.pdf` — Centers of Inquiry Research Portfolio — 19 centers (use centers_of_inquiry)
13. `artemis-strategic-plan.pdf` — Strategic Plan 2025-2030 — 5-year roadmap (use strategic_plan_years)

## Worklog
Each subagent MUST append a worklog entry to `/home/z/my-project/worklog.md` (append mode, do not overwrite) with Task ID, Agent, Task, Work Log, Stage Summary.
