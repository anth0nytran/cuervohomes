/**
 * Cuervo Homes — Neighborhood Image Fetcher
 *
 * Fetches curated real estate photos from Unsplash that match the dark,
 * cinematic, luxury aesthetic of the website.
 *
 * Usage: node scripts/fetch-neighborhood-images.mjs
 *
 * This uses Unsplash's public source URLs (no API key needed).
 * Images are downloaded, resized, and converted to WebP.
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');

// ─── Curated Unsplash photo IDs ─────────────────────────────────────────────
// Each picked for: twilight/golden hour, luxury home, no people, rich detail,
// matches that city's real housing style, survives dark overlay
//
// HERO = full-screen background (needs cinematic, wide composition)
// TILE = thumbnail card (needs clear focal point, works at small size)

const neighborhoods = [
  {
    slug: 'newport-beach',
    // Waterfront luxury modern home, warm dusk lighting
    heroQuery: 'luxury+waterfront+mansion+dusk+california',
    tileQuery: 'luxury+coastal+home+exterior+modern',
  },
  {
    slug: 'costa-mesa',
    // Mid-century modern, warm tones, artistic neighborhood
    heroQuery: 'mid+century+modern+home+exterior+evening',
    tileQuery: 'modern+renovated+home+california+exterior',
  },
  {
    slug: 'huntington-beach',
    // Coastal contemporary, beach vibes, sunset
    heroQuery: 'beach+house+california+sunset+exterior',
    tileQuery: 'coastal+contemporary+home+exterior',
  },
  {
    slug: 'santa-ana',
    // Spanish Colonial Revival, historic charm
    heroQuery: 'spanish+colonial+home+california+golden+hour',
    tileQuery: 'spanish+style+home+exterior+california',
  },
  {
    slug: 'irvine',
    // Clean modern suburban, Mediterranean planned community
    heroQuery: 'modern+suburban+luxury+home+california+twilight',
    tileQuery: 'new+construction+home+california+exterior',
  },
  {
    slug: 'north-tustin',
    // Estate property, large lot, ranch luxury
    heroQuery: 'luxury+estate+home+large+lot+california+dusk',
    tileQuery: 'ranch+estate+home+california+luxury',
  },
  {
    slug: 'orange',
    // Craftsman bungalow, Old Towne charm, historic
    heroQuery: 'craftsman+bungalow+home+evening+warm+light',
    tileQuery: 'craftsman+home+exterior+charming',
  },
  {
    slug: 'anaheim',
    // Tuscan hillside, city view, modern suburban
    heroQuery: 'hillside+luxury+home+california+city+lights+dusk',
    tileQuery: 'tuscan+style+home+california+exterior',
  },
];

// ─── Directories ─────────────────────────────────────────────────────────────

const HERO_DIR = path.join(PUBLIC, 'neighborhoods', 'hero');
const TILE_DIR = path.join(PUBLIC, 'neighborhoods', 'tiles');

fs.mkdirSync(HERO_DIR, { recursive: true });
fs.mkdirSync(TILE_DIR, { recursive: true });

// ─── Download helper ─────────────────────────────────────────────────────────

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const request = (currentUrl, redirectCount = 0) => {
      if (redirectCount > 10) {
        reject(new Error('Too many redirects'));
        return;
      }

      client.get(currentUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          response.resume();
          const redirectUrl = response.headers.location;
          const redirectClient = redirectUrl.startsWith('https') ? https : http;

          // Re-implement for redirect
          const request2 = (url2, rc = 0) => {
            if (rc > 10) { reject(new Error('Too many redirects')); return; }
            const c = url2.startsWith('https') ? https : http;
            c.get(url2, (res) => {
              if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                res.resume();
                request2(res.headers.location, rc + 1);
              } else if (res.statusCode === 200) {
                res.pipe(file);
                file.on('finish', () => file.close(resolve));
              } else {
                reject(new Error(`HTTP ${res.statusCode} for ${url2}`));
              }
            }).on('error', reject);
          };
          request2(redirectUrl, redirectCount + 1);
        } else if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => file.close(resolve));
        } else {
          reject(new Error(`HTTP ${response.statusCode} for ${currentUrl}`));
        }
      }).on('error', reject);
    };

    request(url);
  });
}

// ─── Check for sharp (image processing) ─────────────────────────────────────

let hasSharp = false;
try {
  await import('sharp');
  hasSharp = true;
} catch {
  hasSharp = false;
}

async function convertToWebp(inputPath, outputPath, width) {
  if (hasSharp) {
    const sharp = (await import('sharp')).default;
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);
  } else {
    // Fallback: just copy the jpg and rename — user can convert later
    fs.copyFileSync(inputPath, outputPath.replace('.webp', '.jpg'));
    console.log(`    ⚠ sharp not installed — saved as .jpg (run: npm i sharp)`);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('');
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║          CUERVO HOMES — Neighborhood Image Fetcher         ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log('');

for (const hood of neighborhoods) {
  console.log(`▸ ${hood.slug}`);

  // Unsplash source URLs — these return a random photo matching the query
  // at the exact dimensions we need. No API key required.
  const heroUrl2560 = `https://source.unsplash.com/2560x1440/?${hood.heroQuery}`;
  const heroUrl1600 = `https://source.unsplash.com/1600x900/?${hood.heroQuery}`;
  const tileUrl = `https://source.unsplash.com/800x600/?${hood.tileQuery}`;

  const tmpHero = path.join(HERO_DIR, `${hood.slug}-raw.jpg`);
  const tmpTile = path.join(TILE_DIR, `${hood.slug}-raw.jpg`);

  try {
    // Download hero (2560)
    console.log(`    ↓ hero 2560...`);
    await download(heroUrl2560, tmpHero);

    if (hasSharp) {
      await convertToWebp(tmpHero, path.join(HERO_DIR, `${hood.slug}-2560.webp`), 2560);
      await convertToWebp(tmpHero, path.join(HERO_DIR, `${hood.slug}-1600.webp`), 1600);
      fs.unlinkSync(tmpHero);
      console.log(`    ✓ hero-2560.webp + hero-1600.webp`);
    } else {
      fs.renameSync(tmpHero, path.join(HERO_DIR, `${hood.slug}-2560.jpg`));
      console.log(`    ✓ hero-2560.jpg (convert to webp manually)`);

      // Download 1600 separately without sharp
      console.log(`    ↓ hero 1600...`);
      const tmpHero1600 = path.join(HERO_DIR, `${hood.slug}-1600-raw.jpg`);
      await download(heroUrl1600, tmpHero1600);
      fs.renameSync(tmpHero1600, path.join(HERO_DIR, `${hood.slug}-1600.jpg`));
      console.log(`    ✓ hero-1600.jpg`);
    }

    // Download tile
    console.log(`    ↓ tile...`);
    await download(tileUrl, tmpTile);

    if (hasSharp) {
      await convertToWebp(tmpTile, path.join(TILE_DIR, `${hood.slug}.webp`), 800);
      fs.unlinkSync(tmpTile);
      console.log(`    ✓ tile.webp`);
    } else {
      fs.renameSync(tmpTile, path.join(TILE_DIR, `${hood.slug}.jpg`));
      console.log(`    ✓ tile.jpg (convert to webp manually)`);
    }

    console.log('');
  } catch (err) {
    console.error(`    ✗ Error: ${err.message}`);
    console.log('');
  }

  // Small delay to be respectful to Unsplash
  await new Promise(r => setTimeout(r, 1500));
}

console.log('════════════════════════════════════════════════════════════════');
console.log('');
if (!hasSharp) {
  console.log('NOTE: Install sharp for auto WebP conversion:');
  console.log('  npm install sharp');
  console.log('  Then re-run this script.');
  console.log('');
  console.log('Or convert manually:');
  console.log('  - Hero images: 2560px and 1600px wide, .webp format');
  console.log('  - Tile images: ~800px wide, .webp format');
  console.log('');
}
console.log('Done! Check:');
console.log(`  ${HERO_DIR}`);
console.log(`  ${TILE_DIR}`);
console.log('');
console.log('IMPORTANT: Review each image to make sure it matches the vibe.');
console.log('Unsplash returns random results — re-run or swap manually if needed.');
console.log('');
