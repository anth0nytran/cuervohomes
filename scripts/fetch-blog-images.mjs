/**
 * Cuervo Homes — Blog Image Fetcher
 *
 * Downloads one hand-picked Unsplash photo per blog post and writes it to
 * public/images/blog/<slug>.webp at 1600px wide. Each post's frontmatter
 * `image` points at that file, so every article gets its own topical hero
 * instead of sharing the neighborhood photos.
 *
 * Usage: node scripts/fetch-blog-images.mjs [slug ...]
 *
 * All IDs are free-license Unsplash photos (not Unsplash+). To swap a
 * photo, change its ID below and re-run with that post's slug.
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "images", "blog");

const photos = {
    "capital-gains-tax-california-home-sale": "1772588627527-db42040f3a8b", // calculator + tax forms, dark desk
    "escrow-in-california-explained": "1450101499163-c8848c66ca85", // signing documents
    "first-time-home-buyer-orange-county": "1741156386380-0236c72eb6f9", // new house keys in hallway
    "how-much-is-my-home-worth-orange-county": "1749169981877-746c576d8be0", // coastal home, landscaped
    "how-to-sell-a-house-in-orange-county": "1632829882891-5047ccc421bc", // staged living room
    "is-now-a-good-time-to-buy-a-home-in-orange-county": "1762811054947-605b20298615", // modern home at dusk
    "mello-roos-hoa-fees-orange-county": "1791229289047-5a0630aba49b", // master-planned suburb aerial
    "newport-beach-vs-irvine-vs-costa-mesa": "1724204322371-ecd2e71c6b33", // Newport Harbor
    "oc-housing-update-rates-dip-fall-inventory-thinning": "1724304406928-c43b01912fa1", // calculator, key, houses
    "orange-county-home-buying-timeline": "1580709510343-94c4027ac9b7", // couple unpacking
    "orange-county-home-prices-by-city": "1710638051185-df480415e16b", // Laguna hillside homes
    "orange-county-housing-market-report": "1628961434939-30a5179c7e0d", // Dana Point coast aerial
    "orange-county-investment-property": "1582175761101-9b66700edd9e", // apartment building, palms
    "proposition-19-california-property-tax-transfer": "1758691031787-90867cb6fb2c", // couple at home
    "real-estate-contingencies-explained-california": "1769776400238-cd24612240ea", // house + magnifying glass
    "relocating-to-orange-county": "1633156619138-c990aec02c0d", // Huntington Beach Pier
    "repairs-before-selling-cost-vs-return": "1562259949-e8e7689d7828", // paint roller
    "selling-your-home-during-the-holidays": "1664289342468-fa99588e60b8", // house in holiday lights
    "who-pays-real-estate-agent-commission-california": "1638262052640-82e94d64664a", // handshake
};

const only = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });

for (const [slug, id] of Object.entries(photos)) {
    if (only.length && !only.includes(slug)) continue;

    const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2000&q=90&fm=jpg`);
    if (!res.ok) throw new Error(`${slug}: Unsplash returned ${res.status} for ${id}`);

    const file = path.join(OUT, `${slug}.webp`);
    await sharp(Buffer.from(await res.arrayBuffer()))
        .resize({ width: 1600, height: 1000, fit: "cover", position: "attention" })
        .webp({ quality: 78 })
        .toFile(file);

    console.log(`${slug}.webp  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
}
