# Production SEO / GEO / AEO Checklist — cuervohomes.com

## 1) Environment Variables (Vercel)

Set these in Vercel Project Settings → Environment Variables:

- `RESEND_API_KEY`
- `LEAD_TO_EMAIL`
- `LEADS_BCC_EMAIL` (optional)
- `SITE_URL` (recommended): `https://www.cuervohomes.com`
- `ALLOWED_ORIGINS` (recommended): `https://www.cuervohomes.com,https://cuervohomes.com`

## 2) Build & Deploy

`npm run build` runs four stages in order:

1. `prebuild` → `seo:generate` regenerates `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt` from the Markdown in `src/content/blog/`.
2. `vite build` → client bundle into `dist/`.
3. `build:ssr` → Node render bundle into `dist-ssr/` (deleted after prerendering).
4. `prerender` → writes a real static HTML document for every route.

The build **fails loudly** if a route renders empty or without a `<title>`. That is intentional — a silently client-only build is invisible to AI answer engines.

### Post-deploy verification (do this every deploy)

Each of these must return `200`:

- `https://www.cuervohomes.com/`
- `https://www.cuervohomes.com/services`
- `https://www.cuervohomes.com/contact`
- `https://www.cuervohomes.com/blog`
- `https://www.cuervohomes.com/blog/orange-county-housing-market-report`
- `https://www.cuervohomes.com/sitemap.xml`
- `https://www.cuervohomes.com/robots.txt`
- `https://www.cuervohomes.com/llms.txt`

An unknown URL such as `https://www.cuervohomes.com/does-not-exist` must return a **404**, not a 200.

**Critical check — content without JavaScript:**

```bash
curl -s https://www.cuervohomes.com/ | grep -c "Orange County"
```

This must return a non-zero count. If it returns 0, prerendering did not run and the site is invisible to GPTBot, PerplexityBot, and ClaudeBot. Prior to August 2026 this returned 0 and every route except `/` returned a 404.

## 3) Google Search Console

- Add property; prefer **Domain property** + DNS TXT verification.
- Submit `https://www.cuervohomes.com/sitemap.xml`.
- Use URL Inspection on `/` and one blog post; confirm self-referencing canonical, indexable status, and detected structured data.
- Validate schema with the Rich Results Test — expect `RealEstateAgent`, `Person`, `BlogPosting`, `FAQPage`, and `BreadcrumbList`.

## 4) Outstanding manual tasks (not solvable in code)

- [ ] **Add `sameAs` profile URLs** to the entity graph in `index.html`. This is the highest-value remaining GEO task — it is how AI engines confirm Regina is a corroborated real-world entity. Needs the real URLs for: Google Business Profile, Zillow, Realtor.com, Facebook, Instagram, LinkedIn, Yelp.
- [ ] **Claim/verify** Google Business Profile, Bing Places, Apple Business Connect.
- [ ] **Reconcile the review counts.** `index.html` declares `aggregateRating` of 5.0 from 17 reviews, while the homepage displays 656 team reviews and 1,312 team sales. Conflicting numbers weaken trust scoring, and `aggregateRating` must correspond to reviews visible on the site.
- [ ] Confirm NAP (name, address, phone) is byte-identical across the site, GBP, Yelp, and Facebook.

## 5) Ongoing operations

- **Update the market report monthly.** Edit `src/content/blog/orange-county-housing-market-report.md`, refresh the figures and their observation dates, and bump `dateModified`. The URL is deliberately undated so it accrues authority rather than resetting each month.
- Keep every published statistic attributed to a named, dated source. Label any figure calculated in-house as calculated.
- Add a new post monthly; keep FAQ sections in the Markdown, since `FAQPage` schema is derived from them automatically.
- Re-test AI visibility monthly with prompts such as “best real estate agent in Orange County”, “is now a good time to buy a home in Orange County”, and “who pays realtor commission in California” across ChatGPT, Perplexity, and Gemini. Track whether Cuervo Homes is named.
- Add dedicated service-area pages over time (one URL per city) for stronger long-tail local rankings.

## 6) Scheduled publishing

Posts release themselves. A post is live once its `datePublished` is on or before
the build date; anything future-dated is excluded from the bundle, the prerendered
routes, the sitemap, and `llms.txt`.

Unreleased posts leave **no trace** in the deployed output — not the body, not the
slug, not a route. `src/lib/blog.ts` reads a `virtual:blog-posts` module built by
the `cuervo:scheduled-posts` plugin in `vite.config.ts`, which filters by date
before anything reaches the bundle. (An `import.meta.glob` cannot do this: globs
resolve at compile time and would bake every scheduled slug — the whole content
calendar — into the shipped JavaScript even with the bodies blanked.)

### Releasing on a schedule

`.github/workflows/publish-scheduled-post.yml` pings a Vercel deploy hook at
16:00 UTC on the 9th of each month. The workflow decides nothing; it only
rebuilds, and whatever has come due goes live. Re-running it is harmless.

One-time setup:

1. Vercel → Project → Settings → Git → Deploy Hooks → create a hook on `main`.
2. GitHub → Settings → Secrets and variables → Actions → add `VERCEL_DEPLOY_HOOK_URL`.

Until that secret exists the workflow fails loudly rather than silently skipping.
Use **Run workflow** on the Actions tab to publish early or retry a failed release.

GitHub cron runs in UTC and ignores US daylight saving, so 16:00 UTC is 9:00 AM
Pacific in summer and 8:00 AM in winter. Scheduled runs can also start several
minutes late under load. If exact timing ever matters more than simplicity,
switch the cron to daily — the date filter still releases each post on its own
date, and a daily rebuild makes the trigger time irrelevant.

### Previewing the queue

```bash
PUBLISH_AS_OF=2026-12-09 npm run build
```

Builds as if it were that date, so you can review a queued post rendered exactly
as it will ship. Every build prints what is live and what is still waiting:

```
6 post(s) live as of 2026-08-10, 1 scheduled
[prerender] 1 post(s) scheduled for later, not built as of 2026-08-10:
[prerender]   2026-09-09  how-to-sell-a-house-in-orange-county
```

### What not to schedule

**Never pre-write dated market data.** A post scheduled for next March cannot
honestly quote next March's median price, inventory, or mortgage rate. Market
commentary belongs in the single evergreen report at
`/blog/orange-county-housing-market-report`, refreshed monthly against published
C.A.R. and Freddie Mac figures. Scheduled posts should be evergreen — process
guides, disclosure and tax explainers, neighborhood comparisons — and should link
to the market report for current numbers rather than hardcoding a figure that
goes stale.

## 7) Authoring a new blog post

1. Create `src/content/blog/<slug>.md`. The filename becomes the URL.
2. Frontmatter requires `title`, `description`, `answer`, `category`, `datePublished`, `readingTime`, `image`, `imageAlt`. Supported list field: `tags`.
3. `answer` is the snippet-target block rendered under the H1 — keep it at or under ~55 words and make it directly answer the title question.
4. Write question-shaped `##` headings; each becomes a table-of-contents entry and an anchor.
5. Include a `## Frequently Asked Questions` section with `###` questions. **FAQPage schema is generated from it automatically** — no separate schema to maintain, and it cannot drift from what readers see.
6. Close with a `## Sources` section linking primary sources.
7. Run `npm run build`. The sitemap, `llms.txt`, and the static page are generated for you.
