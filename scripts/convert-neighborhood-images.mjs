/**
 * Cuervo Homes — Convert Downloaded Images
 *
 * Takes images you downloaded from Unsplash (or generated with AI)
 * and converts them to the exact sizes/formats the website needs.
 *
 * SETUP:
 *   1. Download your chosen images from Unsplash
 *   2. Place them in public/neighborhoods/source/ named by slug:
 *        newport-beach.jpg    (hero + tile from same image)
 *        costa-mesa.jpg
 *        huntington-beach.jpg
 *        santa-ana.jpg
 *        irvine.jpg
 *        north-tustin.jpg
 *        orange.jpg
 *        anaheim.jpg
 *
 *      OR use separate hero/tile images:
 *        newport-beach-hero.jpg
 *        newport-beach-tile.jpg
 *
 *   3. Run: node scripts/convert-neighborhood-images.mjs
 *
 * OUTPUT:
 *   public/neighborhoods/hero/{slug}-2560.webp  (2560px wide, hero carousel)
 *   public/neighborhoods/hero/{slug}-1600.webp  (1600px wide, hero responsive)
 *   public/neighborhoods/tiles/{slug}.webp      (800px wide, tile card)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');

const SOURCE_DIR = path.join(PUBLIC, 'neighborhoods', 'source');
const HERO_DIR = path.join(PUBLIC, 'neighborhoods', 'hero');
const TILE_DIR = path.join(PUBLIC, 'neighborhoods', 'tiles');

const SLUGS = [
  'newport-beach',
  'costa-mesa',
  'huntington-beach',
  'santa-ana',
  'irvine',
  'north-tustin',
  'orange',
  'anaheim',
];

// Ensure output directories exist
fs.mkdirSync(HERO_DIR, { recursive: true });
fs.mkdirSync(TILE_DIR, { recursive: true });
fs.mkdirSync(SOURCE_DIR, { recursive: true });

// Check for sharp
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('ERROR: sharp is required. Install it with:');
  console.error('  npm install sharp');
  process.exit(1);
}

// Find source file for a given slug and type
function findSource(slug, type = '') {
  const suffix = type ? `-${type}` : '';
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff'];
  for (const ext of extensions) {
    const filePath = path.join(SOURCE_DIR, `${slug}${suffix}${ext}`);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

console.log('');
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║       CUERVO HOMES — Neighborhood Image Converter          ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`Source: ${SOURCE_DIR}`);
console.log(`Hero:   ${HERO_DIR}`);
console.log(`Tiles:  ${TILE_DIR}`);
console.log('');

let processed = 0;
let skipped = 0;

for (const slug of SLUGS) {
  // Look for separate hero/tile files first, then fall back to single file
  const heroSource = findSource(slug, 'hero') || findSource(slug);
  const tileSource = findSource(slug, 'tile') || findSource(slug);

  if (!heroSource && !tileSource) {
    console.log(`  ⊘  ${slug} — no source file found, skipping`);
    skipped++;
    continue;
  }

  console.log(`  ▸  ${slug}`);

  // Generate hero images (2560px and 1600px wide)
  if (heroSource) {
    try {
      // 2560px hero
      await sharp(heroSource)
        .resize(2560, 1440, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 88, effort: 6 })
        .toFile(path.join(HERO_DIR, `${slug}-2560.webp`));

      // 1600px hero
      await sharp(heroSource)
        .resize(1600, 900, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(path.join(HERO_DIR, `${slug}-1600.webp`));

      console.log(`       ✓ hero → ${slug}-2560.webp + ${slug}-1600.webp`);
    } catch (err) {
      console.error(`       ✗ hero error: ${err.message}`);
    }
  }

  // Generate tile image (800px wide)
  if (tileSource) {
    try {
      await sharp(tileSource)
        .resize(800, 600, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 82, effort: 6 })
        .toFile(path.join(TILE_DIR, `${slug}.webp`));

      console.log(`       ✓ tile → ${slug}.webp`);
    } catch (err) {
      console.error(`       ✗ tile error: ${err.message}`);
    }
  }

  processed++;
  console.log('');
}

console.log('════════════════════════════════════════════════════════════════');
console.log(`  Processed: ${processed}  |  Skipped: ${skipped}  |  Total: ${SLUGS.length}`);
console.log('');

if (skipped > 0) {
  console.log('Missing source files for:');
  for (const slug of SLUGS) {
    if (!findSource(slug, 'hero') && !findSource(slug)) {
      console.log(`  → ${slug}.jpg (or .png/.webp)`);
    }
  }
  console.log('');
  console.log(`Place them in: ${SOURCE_DIR}`);
  console.log('Then re-run this script.');
  console.log('');
}

if (processed > 0) {
  console.log('Done! Your images are ready.');
  console.log('Also copy to dist/ if you have a build:');
  console.log('  cp -r public/neighborhoods/hero dist/neighborhoods/hero');
  console.log('  cp -r public/neighborhoods/tiles dist/neighborhoods/tiles');
  console.log('');
}
