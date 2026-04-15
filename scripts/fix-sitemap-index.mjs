/**
 * Post-build script: adds <lastmod> to sitemap-index.xml entries.
 *
 * @astrojs/sitemap generates the index without <lastmod>, so Google
 * doesn't know when child sitemaps were updated and may skip re-reading them.
 * This script adds the current build timestamp as lastmod.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';
const INDEX_FILE = join(DIST_DIR, 'sitemap-index.xml');

const xml = readFileSync(INDEX_FILE, 'utf-8');

// Only add lastmod if not already present
if (xml.includes('<lastmod>')) {
  console.log('sitemap-index.xml already has <lastmod>, skipping');
  process.exit(0);
}

const now = new Date().toISOString();

const fixed = xml.replace(
  /<loc>(.*?)<\/loc>/g,
  `<loc>$1</loc><lastmod>${now}</lastmod>`
);

writeFileSync(INDEX_FILE, fixed, 'utf-8');
console.log(`Added <lastmod>${now}</lastmod> to sitemap-index.xml`);
