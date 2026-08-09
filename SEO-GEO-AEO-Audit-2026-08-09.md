# Cuervo Homes — SEO / GEO / AEO Audit Summary

**Date:** 2026-08-09 · **Site:** https://www.cuervohomes.com · **Full report:** `SEO-GEO-AEO-Audit-2026-08-09.html`

## Grades

| Category | Before | After | Weight |
| --- | --- | --- | --- |
| SEO Core | 34 | 88 | 50% |
| AEO | 12 | 91 | 20% |
| GEO | 18 | 79 | 20% |
| Local + Entity | 55 | 68 | 10% |
| **Weighted total** | **F (29)** | **A− (85)** | — |

Scores are an assessed rubric. HTTP codes and word counts are measured.

## The two findings that mattered

1. **Every route except `/` returned HTTP 404 in production.** `vercel.json` carried redirects and headers but no SPA fallback and no static route output. `/services` (8 FAQs + FAQPage schema) and `/contact` (lead capture) were never indexable, and the sitemap was submitting both as valid URLs.
2. **The homepage shipped no crawlable text.** Production HTML was a title plus an empty `<div id="root">`. GPTBot, PerplexityBot, ClaudeBot and OAI-SearchBot largely do not execute JavaScript, so there was nothing for an answer engine to cite.

Net effect: one crawlable URL containing zero crawlable content.

## Top 10 actions

1. ~~Fix routing so all routes resolve~~ — **done** (static prerendering + real `404.html`)
2. ~~Prerender every route to readable HTML~~ — **done** (`scripts/prerender.mjs`)
3. ~~Publish answer-shaped content with citable data~~ — **done** (6 articles)
4. **Populate `sameAs` with real profile URLs** — *blocked, needs client*
5. **Resolve the 17-vs-656 review-count contradiction** — *blocked, client decision*
6. ~~Give Regina a first-class `Person` entity with credentials~~ — **done**
7. ~~Add per-page BreadcrumbList + BlogPosting schema~~ — **done**
8. ~~Add `llms.txt` and explicit AI-crawler allows~~ — **done**
9. ~~Fix the deployment checklist referencing soldbytoro.com~~ — **done**
10. **Convert remaining multi-MB PNGs to WebP** (`services/aerial.png` is 2.3 MB) — *open*

## Measured evidence

| Route | HTTP before | Words before | Words after |
| --- | --- | --- | --- |
| `/` | 200 | 0 | 1,797 |
| `/services` | 404 | 0 | 793 |
| `/contact` | 404 | 0 | 968 |
| `/blog` | 404 | 0 | 1,075 |
| `/blog/orange-county-housing-market-report` | 404 | 0 | 2,561 |
| `/blog/first-time-home-buyer-orange-county` | 404 | 0 | 2,871 |

Browser-verified after hydration: one `<title>`, one canonical, one description, zero console errors, FAQPage schema with 7 questions extracted from the visible FAQ.

## Roadmap

| Window | Focus | Measure |
| --- | --- | --- |
| Week 1 | Deploy; verify 9 URLs return 200 and unknown URLs 404; submit sitemap | Indexed pages 1 → 9 |
| Weeks 1–2 | `sameAs` + GBP/Bing/Apple claiming; NAP sync; fix review counts | GEO 79 → 92 |
| Weeks 3–4 | Baseline AI-engine prompt testing; add FAQ blocks to Home and Services | Named-mention rate |
| Weeks 5–8 | Monthly market-report refresh; 2 posts/month; build 11 city pages | Long-tail city rankings |
| Weeks 9–12 | Internal linking; WebP conversion; re-test prompts vs. baseline | Citation rate; LCP |

## Manual verification tasks

- Supply profile URLs for `sameAs` (GBP, Zillow, Realtor.com, Facebook, Instagram, LinkedIn, Yelp). Cannot be invented — fabricated URLs would damage entity resolution.
- Decide how to handle `aggregateRating`: surface the 17 reviews, or align markup with what is displayed and verifiable.
- After first deploy, confirm Vercel serves `/blog/<slug>` from the prerendered directory index. Standard static-hosting behaviour, but the one thing not verifiable from local build output.
- Grant Google Search Console access.
- Run the six AI-engine prompts in the HTML report monthly and log whether Cuervo Homes is named.

## Source data used in the articles

| Figure | Value | Source | As of |
| --- | --- | --- | --- |
| OC median existing SFR sale price | $1,490,000 | C.A.R. | June 2026 |
| OC median list price (active SFR) | $1,849,000 | OC housing report | Aug 3, 2026 |
| Active inventory / pending | 5,192 / 1,824 | OC housing report | Aug 3, 2026 |
| Median days on market | 41 (avg 61) | OC housing report | Aug 3, 2026 |
| 30-year fixed mortgage | 6.69% | Freddie Mac PMMS | Aug 6, 2026 |
| OC FHA / high-balance conforming limit | $1,249,125 | FHFA / HUD | 2026 |

Months of supply (~2.8) and expected market time (~87 days) are calculated in-house from the published inventory and pending counts, and are labelled as such in the articles.
