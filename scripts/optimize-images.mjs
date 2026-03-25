/**
 * Converts all JPG images in public/images/ to WebP format.
 * Keeps the original JPG as fallback and creates a .webp alongside it.
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = ['public/images/articulos', 'public/images/productos'];
const WEBP_QUALITY = 80;
const ARTICLE_MAX_WIDTH = 800; // hero images display at max 800px

async function getJpgFiles(dir) {
  try {
    const files = await readdir(dir);
    return files
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .map(f => join(dir, f));
  } catch {
    return [];
  }
}

async function convertToWebp(filePath) {
  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  // Skip if WebP already exists and is newer than source
  try {
    const srcStat = await stat(filePath);
    const webpStat = await stat(webpPath);
    if (webpStat.mtimeMs >= srcStat.mtimeMs) {
      return { file: basename(filePath), skipped: true };
    }
  } catch {
    // WebP doesn't exist yet, proceed
  }

  let pipeline = sharp(filePath);

  // Resize article hero images to max display width (saves ~30-50%)
  if (filePath.includes('articulos')) {
    const meta = await sharp(filePath).metadata();
    if (meta.width > ARTICLE_MAX_WIDTH) {
      pipeline = pipeline.resize(ARTICLE_MAX_WIDTH);
    }
  }

  const info = await pipeline
    .webp({ quality: WEBP_QUALITY })
    .toFile(webpPath);

  const srcSize = (await stat(filePath)).size;
  const savings = Math.round((1 - info.size / srcSize) * 100);

  return {
    file: basename(filePath),
    srcSize: Math.round(srcSize / 1024),
    webpSize: Math.round(info.size / 1024),
    savings,
    skipped: false,
  };
}

async function main() {
  let totalSrc = 0;
  let totalWebp = 0;
  let converted = 0;
  let skipped = 0;

  for (const dir of DIRS) {
    const files = await getJpgFiles(dir);
    if (files.length === 0) continue;

    console.log(`\n📁 ${dir} (${files.length} images)`);

    for (const file of files) {
      const result = await convertToWebp(file);
      if (result.skipped) {
        skipped++;
        continue;
      }
      converted++;
      totalSrc += result.srcSize;
      totalWebp += result.webpSize;
      console.log(`  ✅ ${result.file}: ${result.srcSize}KB → ${result.webpSize}KB (-${result.savings}%)`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Converted: ${converted} images`);
  console.log(`  Skipped (already up-to-date): ${skipped}`);
  if (converted > 0) {
    console.log(`  Total: ${totalSrc}KB → ${totalWebp}KB (-${Math.round((1 - totalWebp / totalSrc) * 100)}%)`);
  }
}

main().catch(console.error);
