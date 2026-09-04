import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "src/assets/update_photos";
const OUT = "public/c_homes";
const TEAM = path.join(OUT, "team");

await mkdir(TEAM, { recursive: true });

/**
 * The Cuervo logos arrive as white artwork burned onto a solid black canvas.
 * The site is dark-themed, so pasting them in as-is would show a black slab.
 * Luminance is the artwork here, so it doubles as the alpha channel: build a
 * pure-white image and join the greyscale copy onto it as alpha.
 */
async function whiteArtToTransparent(src, out, width) {
  const trimmed = await sharp(src)
    .trim({ background: "#000000", threshold: 12 })
    .toBuffer();

  const resized = await sharp(trimmed).resize({ width, withoutEnlargement: true }).toBuffer();
  const { width: w, height: h } = await sharp(resized).metadata();

  const alpha = await sharp(resized).greyscale().raw().toBuffer();

  await sharp({ create: { width: w, height: h, channels: 3, background: "#ffffff" } })
    .joinChannel(alpha, { raw: { width: w, height: h, channels: 1 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);

  console.log(`  ${path.basename(out).padEnd(38)} ${w}x${h}`);
}

/** Already transparent (Nest) — just trim the empty margin and scale. */
async function trimTransparent(src, out, width) {
  await sharp(src)
    .trim({ threshold: 2 })
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const m = await sharp(out).metadata();
  console.log(`  ${path.basename(out).padEnd(38)} ${m.width}x${m.height}`);
}

/** Black artwork on white — for light backgrounds and the schema.org logo. */
async function blackOnWhite(src, out, width) {
  await sharp(src)
    .trim({ background: "#ffffff", threshold: 12 })
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const m = await sharp(out).metadata();
  console.log(`  ${path.basename(out).padEnd(38)} ${m.width}x${m.height}`);
}

/**
 * Headshots come from five different shoots — studio grey, blue vignette,
 * garden, a wood wall, and a full-length outdoor portrait. Square-cropping to a
 * common size is what keeps the team grid from looking like a scrapbook; the
 * CSS treatment does the rest.
 *
 * `crop` is an explicit sharp extract region, for sources where a gravity
 * crop cannot find the face on its own — Erik's frame is a 3:4.5 portrait, so
 * a "north" crop lands on tree canopy and a "centre" crop cuts off his head.
 */
async function headshot(src, slug, { gravity = "north", crop = null } = {}) {
  const jpg = path.join(TEAM, `${slug}.jpg`);
  const webp = path.join(TEAM, `${slug}.webp`);
  const input = crop ? sharp(src).extract(crop) : sharp(src);
  const base = input.resize(900, 900, { fit: "cover", position: gravity }).flatten({ background: "#ffffff" });
  await base.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(jpg);
  await base.clone().webp({ quality: 82 }).toFile(webp);
  console.log(`  ${(slug + ".jpg/.webp").padEnd(38)} 900x900`);
}

console.log("Logos:");
await whiteArtToTransparent(`${SRC}/Cursive Logo White_ Black.png`, `${OUT}/chg-cursive-white.png`, 1200);
await whiteArtToTransparent(`${SRC}/CH_ Logo.png`, `${OUT}/chg-horizontal-white.png`, 1600);
await blackOnWhite(`${SRC}/CHG Logo Black on White .png`, `${OUT}/chg-cursive-black.png`, 1200);
await trimTransparent(`${SRC}/Nest Logo OFFICIAL WHT.png`, `${OUT}/nest-real-estate-white.png`, 1200);

console.log("Headshots:");
await headshot(`${SRC}/Regina New Headshot.JPG`, "regina-cuervo");
await headshot(`${SRC}/Elisa Ayala.JPG`, "elisa-ayala");
await headshot(`${SRC}/Erik Ramires.jpg`, "erik-ramirez", {
  crop: { left: 512, top: 1429, width: 2227, height: 2227 },
});
await headshot(`${SRC}/Christopher Bautista.png`, "christopher-bautista", { gravity: "centre" });
await headshot(`${SRC}/Richard Mayen .jpg`, "richard-mayen", { gravity: "centre" });
