# Today in GFW — publishing pipeline

## Source of truth

- GitHub source of truth: `defford/today-in-gfw` (created and populated; currently **public**).
- Production: Vercel project `today-in-gfw` (`prj_2OKGsITN6CIG9LsikjdXWQ5O8jaS`), domain `today-in-gfw.vercel.app`.
- Long-form articles: `data/perspectives.json`; homepage stories: `data/stories.json`.
- Events: `data/events.json` (generated snapshot of the separate Exploits Events Registry; never infer absent times).
- Private civic intelligence stays in its existing Google Sheet and **must not** be checked into GitHub.

## Proposed change → public article

1. Review a verified new civic finding from the research engine and decide whether an existing essay meaningfully changes.
2. Fetch the **latest** `main` from GitHub. Create an isolated `editorial/<date>-<topic>` branch from that commit. Never write over a stale snapshot of `main`.
3. Make a minimal editorial change, keeping each existing slug, source URL and other articles intact. Update the revised essay's `updated` date and append an evidence-based log note.
4. Open a pull request using the repository's checklist. GitHub Actions validates content structure, TypeScript and the Next.js build. Vercel generates a preview when Git integration is connected.
5. Review the preview and evidence; then approve and merge. Vercel Git integration deploys `main` to production.
6. Verify the deployment is READY, with `today-in-gfw.vercel.app` assigned and working, **before** reporting the article as published. If it fails, leave the previous production version in place and report the blocker.

## Existing-project Vercel connection

1. Create an empty GitHub repository named `today-in-gfw` under account `defford` (no generated README, .gitignore or license). Prefer private visibility.
2. Upload/push the entire contents of this package to its `main` branch; use GitHub App/connector for authenticated writes if available.
3. In the **existing** Vercel project `today-in-gfw`, go to **Settings → Git → Connect Git Repository** and link `defford/today-in-gfw`; select `main` as the production branch. Do NOT create a second Vercel site or move the domain.
3. Let Vercel build. Confirm that the existing production domain points to the Git-backed deployment and that all five journal articles, `/credits`, and the event calendar work.
4. Protect `main` and require quality checks and a reviewed PR for consequential changes, subject to your GitHub plan's branch-rules support.

## Safety and freshness

- This starter project contains the October 2026 editorial and event snapshots; it is **not** yet a live data-sync service.
- The automated editorial task can propose branches/PRs using GitHub tools only after the actual repository is connected. Do not use stale Vercel deployment snapshots as source code.
- Avoid storing API tokens in repo files or logs. Vercel Git integration requires no GitHub Actions deployment token.
- The GitHub Actions check verifies **structure**, not truth. Source verification, image rights, balanced interpretation and final approval are editorial responsibilities.

## Connection status (October 29, 2026)

GitHub source is populated and the public site is still served by the existing Vercel project. The Git repository has **not** yet been confirmed linked to that project. Complete **Settings → Git → Connect Git Repository** in the existing project, granting the Vercel GitHub app access to this repository if it is not listed. Do not create a duplicate Vercel project or replace the production domain. After connecting, verify one PR preview and one reviewed `main` deployment before declaring auto-publishing live.
