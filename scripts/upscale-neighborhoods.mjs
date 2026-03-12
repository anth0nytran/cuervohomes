import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");
const neighborhoodsDir = path.join(publicDir, "neighborhoods");
const sourceDir = path.join(neighborhoodsDir, "source");

const images = [
    { slug: "newport-beach", source: "newport-beach.jpg" },
    { slug: "costa-mesa", source: "costa-mesa.jpg" },
    { slug: "huntington-beach", source: "huntington-beach.jpg" },
    { slug: "santa-ana", source: "santa-ana.jpg" },
    { slug: "irvine", source: "irvine.jpg" },
    { slug: "north-tustin", source: "north-tustin.jpg" },
    { slug: "orange", source: "orange.jpg" },
    { slug: "anaheim", source: "anaheim.jpg" },
];

const variants = [
    {
        dir: "hero",
        suffix: "1600",
        width: 1600,
        height: 900,
        quality: 90,
    },
    {
        dir: "hero",
        suffix: "2560",
        width: 2560,
        height: 1440,
        quality: 92,
    },
    {
        dir: "tiles",
        suffix: null,
        width: 1600,
        height: 1600,
        quality: 90,
    },
];

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true });
}

async function resolveInputPath(sourceFile, slug) {
    const preferred = path.join(sourceDir, sourceFile);

    try {
        await fs.access(preferred);
        return preferred;
    } catch {
        return path.join(neighborhoodsDir, `${slug}.png`);
    }
}

async function buildVariant(inputPath, slug, variant) {
    const outputDir = path.join(neighborhoodsDir, variant.dir);
    await ensureDir(outputDir);

    const outputName = variant.suffix ? `${slug}-${variant.suffix}.webp` : `${slug}.webp`;
    const outputPath = path.join(outputDir, outputName);

    await sharp(inputPath)
        .resize(variant.width, variant.height, {
            fit: "cover",
            position: sharp.strategy.attention,
        })
        .sharpen({ sigma: 1.05, flat: 0.85, jagged: 1.8 })
        .webp({
            quality: variant.quality,
            effort: 6,
            smartSubsample: true,
        })
        .toFile(outputPath);

    console.log(`Wrote ${path.relative(publicDir, outputPath)}`);
}

async function main() {
    for (const image of images) {
        const inputPath = await resolveInputPath(image.source, image.slug);

        for (const variant of variants) {
            await buildVariant(inputPath, image.slug, variant);
        }
    }
}

main().catch((error) => {
    console.error("Failed to build neighborhood images.", error);
    process.exitCode = 1;
});
