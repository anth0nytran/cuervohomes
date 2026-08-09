import { mkdir, writeFile, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://www.cuervohomes.com").replace(/\/+$/, "");
const TODAY = new Date().toISOString().slice(0, 10);

const publicDir = path.resolve(process.cwd(), "public");
const blogDir = path.resolve(process.cwd(), "src", "content", "blog");

/** Pulls a scalar frontmatter field without a full YAML parse. */
function frontmatterValue(raw, key) {
  const match = new RegExp(`^${key}:\\s*(.*)$`, "m").exec(raw);
  if (!match) return null;
  return match[1].trim().replace(/^["']|["']$/g, "");
}

async function loadPosts() {
  let files = [];
  try {
    files = await readdir(blogDir);
  } catch {
    return [];
  }

  const posts = [];
  for (const file of files.filter((f) => f.endsWith(".md"))) {
    const raw = await readFile(path.join(blogDir, file), "utf8");
    const slug = file.replace(/\.md$/, "");
    posts.push({
      slug,
      title: frontmatterValue(raw, "title") || slug,
      description: frontmatterValue(raw, "description") || "",
      lastmod:
        frontmatterValue(raw, "dateModified") || frontmatterValue(raw, "datePublished") || TODAY,
    });
  }

  return posts.sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1));
}

const posts = await loadPosts();

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: TODAY },
  { path: "/services", changefreq: "monthly", priority: "0.8", lastmod: TODAY },
  { path: "/contact", changefreq: "monthly", priority: "0.8", lastmod: TODAY },
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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
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
const llms = `# Cuervo Homes

> Orange County, California residential real estate. Regina Cuervo, REALTOR(R),
> Cal DRE #02144970, WE'RE Real Estate Inc. Bilingual English and Spanish.
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
County housing report). Calculations derived by Cuervo Homes are labeled as
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
