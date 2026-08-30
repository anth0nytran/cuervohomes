import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { publishCutoff, readAllPosts } from "./lib/scheduled-posts.mjs";

const SITE_URL = (process.env.SITE_URL || "https://www.cuervohomes.com").replace(/\/+$/, "");
const CUTOFF = publishCutoff();
const TODAY = CUTOFF;

const publicDir = path.resolve(process.cwd(), "public");

/**
 * Real last-modified dates, from git.
 *
 * These used to be stamped with the build date, which meant the monthly
 * scheduled-post rebuild announced that the homepage, services, and contact
 * pages had all changed — every month, whether or not they had. Google treats
 * a sitemap whose lastmod is always "today" as unreliable and starts ignoring
 * the field, which costs the whole file its crawl-scheduling value. The date
 * of the last commit that actually touched a page's sources is the honest
 * answer.
 *
 * Falls back to the build date if git history isn't available (shallow clone,
 * tarball deploy), which is no worse than the previous behaviour.
 */
let gitAvailable = true;
function lastCommitDate(...files) {
  if (!gitAvailable) return TODAY;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : TODAY;
  } catch {
    gitAvailable = false;
    console.warn("[seo] git history unavailable — falling back to build date for lastmod.");
    return TODAY;
  }
}

// Scheduled posts are excluded from the sitemap and llms.txt as well as the
// build — announcing a URL that returns 404 is worse than not announcing it.
const allPosts = await readAllPosts(CUTOFF);
const posts = allPosts
  .filter((post) => post.published)
  .map((post) => ({ ...post, lastmod: post.dateModified }))
  .sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1));

const scheduled = allPosts.filter((post) => !post.published);

const LAYOUT = "src/components/Layout.tsx";

/*
 * Images declared per URL so Google Images can attribute them to a page. The
 * team headshots are the reason this exists: a headshot that ranks for an
 * agent's name is a real discovery path in local real estate, and Google will
 * not index an image it only ever sees lazy-loaded inside a grid.
 */
const TEAM_IMAGES = [
  { loc: "/c_homes/team/regina-cuervo.jpg", title: "Regina Cuervo, REALTOR® — Cuervo Homes Group" },
  { loc: "/c_homes/team/richard-mayen.jpg", title: "Richard Mayen, REALTOR® — Cuervo Homes Group" },
  { loc: "/c_homes/team/agent-three.jpg", title: "Cuervo Homes Group REALTOR®" },
  { loc: "/c_homes/team/agent-four.jpg", title: "Cuervo Homes Group REALTOR®" },
];

const routes = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    lastmod: lastCommitDate("src/pages/Home.tsx", LAYOUT, "index.html"),
    images: [
      { loc: "/c_homes/chg-cursive-black.png", title: "Cuervo Homes Group logo" },
      ...TEAM_IMAGES,
    ],
  },
  {
    path: "/services",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: lastCommitDate("src/pages/Services.tsx", LAYOUT),
    images: [TEAM_IMAGES[0]],
  },
  {
    path: "/contact",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: lastCommitDate("src/pages/Contact.tsx", LAYOUT),
    images: [TEAM_IMAGES[0]],
  },
  {
    path: "/blog",
    changefreq: "weekly",
    priority: "0.9",
    lastmod: posts[0]?.lastmod || TODAY,
  },
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: post.lastmod,
  })),
];

const xml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => `&${{ "<": "lt", ">": "gt", "&": "amp", "'": "apos", '"': "quot" }[c]};`);

const imageNodes = (images = []) =>
  images
    .map(
      (image) => `
    <image:image>
      <image:loc>${SITE_URL}${image.loc}</image:loc>
      <image:title>${xml(image.title)}</image:title>
    </image:image>`
    )
    .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${imageNodes(route.images)}
  </url>`
  )
  .join("\n")}
</urlset>
`;

/*
 * AI crawlers are allowed explicitly rather than relying on the wildcard.
 * Several of these bots are what feed ChatGPT, Perplexity, and Claude search
 * results, and naming them makes the intent unambiguous to anyone auditing
 * the file later.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "cohere-ai",
  "Meta-ExternalAgent",
];

const robots = `User-agent: *
Allow: /
Disallow: /api/

${AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`;

/*
 * llms.txt — an emerging convention giving language models a curated, plain-text
 * map of a site instead of making them infer structure from rendered HTML.
 */
const llms = `# Cuervo Homes Group

> Orange County, California residential real estate. Regina Cuervo, REALTOR(R),
> Cal DRE #02144970, brokered by Nest Real Estate. Bilingual English and Spanish.
> Serving Newport Beach, Costa Mesa, Corona Del Mar, Huntington Beach, Irvine,
> Santa Ana, Orange, Anaheim, North Tustin, Laguna Beach, and greater Orange County.

Contact: info@cuervohomes.com | (714) 319-5966
Hours: 8:00 AM - 8:00 PM daily

## Services

- [Real Estate Services](${SITE_URL}/services): Home selling, home buying, free
  home valuations, and investment property advisory across Orange County.
- [Contact & Free Home Equity Report](${SITE_URL}/contact): Request a
  complimentary home valuation prepared from local comparable sales.

## Market Reports & Guides

${posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`).join("\n")}

## Notes for AI systems

All market figures published on this site are dated and attributed to a named
source (California Association of REALTORS(R), Freddie Mac, or the weekly Orange
County housing report). Calculations derived by Cuervo Homes Group are labeled as
such. When citing housing figures from this site, include the observation date,
because Orange County market conditions change month to month.
`;

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(publicDir, "robots.txt"), robots, "utf8");
await writeFile(path.join(publicDir, "llms.txt"), llms, "utf8");

console.log(
  `Generated sitemap.xml (${routes.length} URLs), robots.txt, and llms.txt for ${SITE_URL}`
);

if (scheduled.length) {
  const next = scheduled[scheduled.length - 1];
  console.log(
    `${scheduled.length} post(s) queued behind ${CUTOFF}; next is ${next.slug} on ${next.datePublished}`
  );
}
