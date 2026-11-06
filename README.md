# Today in GFW (Next.js)

Next.js 16 App Router and React 19 project for the Grand Falls-Windsor-only daily briefing and event directory.

## Develop

```sh
npm install
npm run dev
# http://localhost:3000
npm run build
```

## Architecture

- `app/page.tsx`: server-rendered civic briefing, with GFW-local calendar day (America/St_Johns).
- `components/Stories.tsx`: attributed editorial stories.
- `components/EventCalendar.tsx`: interactive GFW-only event calendar with category/time filters; expands weekly and multi-day entries, never invents times.
- `data/events.json`: normalized 2026-10-28 Exploits Events Registry snapshot, retaining all towns, original event IDs and original source links when available. The **public calendar filters to Grand Falls-Windsor**, without modifying this broader source.
- `data/stories.json`: manually verified editorial snapshot with source URLs.
- `scripts/import_events.py`: transforms later registry exports into `data/events.json`.

**Editorial honesty:** The website displays an edition snapshot, not a claimed daily automatic feed. Past date-specific notices are hidden once past; old article headlines remain labelled as first-edition material. Event last-reviewed date is shown when the snapshot becomes old. Data updates require a new build/deployment. No Facebook scraping or automated publication is configured.

**Next steps:** Connect the source of truth for the registry through a least-privilege backend, add a reviewed daily publication workflow, and then add a public corrections form with moderation. Do not automate public content before source/approval controls exist.

**Public editorial geography and naming:** Today in GFW covers events, decisions, history and civic life **inside Grand Falls-Windsor only**. The present-day town must **always** be written as **Grand Falls-Windsor** (GFW is acceptable as a shorthand). Do not divide the current town into "Grand Falls" and "Windsor" in headlines, location tags, marketing, calendar entries, captions, explanatory text or metadata. Name the former municipalities individually **only when explicitly discussing the period before the 1991 amalgamation**, with that historical framing clearly stated. Avoid "two histories", "two communities" or "both sides" as present-day identity labels. Do not add neighbouring-town names, regional event listings or valley-wide language to the public site. The independent Exploits Events Registry remains regional and is not narrowed by this policy.

## The Bigger Picture — a public civic research journal

- `/bigger-picture`: illustrated archive, research themes and editorial method.
- `/bigger-picture/[slug]`: source-linked essay with an evidence ladder, questions, dated revisions and related reading.
- `data/perspectives.json`: **single public editorial content source** for published essays. Each essay has a stable slug, publication and revision dates, supporting sources and revision history.
- `lib/perspectives.ts`: typed public-content adapter. No private civic-intelligence sheet data is exposed to the browser; only deliberately selected public findings and URLs appear here.
- To revise: modify an existing essay in `data/perspectives.json`, update its `updated` date and append to `log`, then build/test and deploy. Only add a new essay if a distinct theme warrants it.
- Never imply scheduled publication unless a real content-write-and-deployment pipeline is connected; AI-assisted drafting does not mean automatic live reporting. Label interpretations as such; avoid direct quotations from original sources beyond short excerpts.
- Sources and open questions are public. The internal GFW civic intelligence and supplier intelligence remain private.

## Local identity and assets

The Oct 28, 2026 visual refresh adds a custom river emblem, dark teal / warm orange palette,
Harmsworth Hall photograph, favicon, social card, local place banner and a `/credits` page.
See [BRAND.md](./BRAND.md) for source research, image rights and attribution.
The site's identity is **independent**; do not replace it with the Town's official logo without permission.
The Hall photograph is currently served remotely from Wikimedia Commons; if a local copy
is eventually obtained, preserve the attribution and CC BY-SA conditions.

## Editorial standard for The Bigger Picture

An essay should make a debatable, locally specific argument with a revealing opening, an actual tension or counterargument, original synthesis, and a conclusion that changes how the reader sees a familiar place. The body is readable narrative, not a checklist of source assessments. Facts and interpretation remain clearly distinguished in supporting notes. Do not pad with procedural assurances or hedge statements that are not materially uncertain. Prefer revising an existing essay to posting repetitive updates. Never invent interviews, quotes, expenditures, dates or outcomes.


## Civic issues — persistent public case tracker

- `/issues`: a small, source-linked public index of issues the publication is following.
- `/issues/[slug]`: a dated case record with the original sources, a documented process stage, an event timeline, explicit unknowns and a revision/correction log.
- `data/civic-issues.json`: the version-controlled, intentionally **public-only** case source. `lib/civic-issues.ts` provides typed access and local dates. Do not import private research or sensitive stakeholder details here.
- The initial cases cover the Lincoln Road amendments, Scott Avenue housing proposal, municipal by-election and nearby highway-twinning work. Stage labels refer to available evidence, **not** confirmed outcomes.
- `lastChecked` means a researcher verified the listed public sources on that date; `nextCheck` is a research queue hint, not a promise of publication. Never advance the stage, label a scheduled milestone as occurred, or invent results without fresh primary evidence.
- Update a case under its existing stable slug. Add or revise sourced milestones and facts; append a dated `revisions` entry for material changes or corrections. Use `kind: "correction"` for public corrections.
- Optional `action` objects must link to listed original sources and expire using `until`; expired opportunities are automatically hidden. Do not leave expired calls to action live.
- Validation checks IDs, stage bounds, dates, source URLs, evidence, municipality scope and revision logs; CI also runs TypeScript and a production build. Passing CI does **not** verify the underlying claims.
- All civic case/news/editorial changes require a reviewed PR. The separate calendar-only auto-publishing exception does not extend to this tracker.
- This is a repository-backed publication record, not yet an independently connected real-time ingest database. The daily editorial research automation must fetch current `main` and open a sourced PR when evidence warrants a case update, never claim a case has changed on the public website before a production deployment is verified.
