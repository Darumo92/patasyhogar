import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function walk(dir) {
  const entries = fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true });
  return entries.flatMap((entry) => {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(rel);
    return rel;
  });
}

const failures = [];

for (const file of walk('src/content/articulos').filter((f) => f.endsWith('.mdx'))) {
  const lines = read(file).split('\n');
  lines.forEach((line, index) => {
    if (/AffiliateButton|<AffiliateButton/.test(line)) {
      failures.push(`${file}:${index + 1}: ${line.trim()}`);
    }
  });
}

const topPick = read('src/components/TopPick.astro');
const topPickForbidden = [
  /affiliate-button/,
  /target="_blank"/,
  /rel="nofollow noopener noreferrer sponsored"/,
  /amazonHref\(/,
  /tiendanimalHref\(/,
  /assets\.ikhnaie\.me/,
  /patasyhogar-21/,
];

for (const pattern of topPickForbidden) {
  if (pattern.test(topPick)) {
    failures.push(`src/components/TopPick.astro: contains ${pattern}`);
  }
}

const articleLayout = read('src/layouts/Article.astro');
const articleForbidden = [
  /sticky-cta/,
  /sticky CTA/i,
];

for (const pattern of articleForbidden) {
  if (pattern.test(articleLayout)) {
    failures.push(`src/layouts/Article.astro: contains ${pattern}`);
  }
}

if (failures.length) {
  console.error('Affiliate density check failed:');
  console.error(failures.slice(0, 80).join('\n'));
  if (failures.length > 80) {
    console.error(`...and ${failures.length - 80} more`);
  }
  process.exit(1);
}

console.log('Affiliate density check passed.');
