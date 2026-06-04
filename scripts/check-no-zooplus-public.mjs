import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const PUBLIC_SOURCE_DIRS = [
  'src/components',
  'src/layouts',
  'src/pages',
  'src/styles',
];

const PUBLIC_EXTENSIONS = new Set(['.astro', '.ts', '.js', '.css']);

const ALLOWED_CONTENT_PATTERNS = [
  /\bprecioZooplus\b/,
  /\benlaceZooplus\b/,
  /zooplus\.es/,
];

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

const publicFiles = PUBLIC_SOURCE_DIRS
  .filter((dir) => fs.existsSync(path.join(ROOT, dir)))
  .flatMap((dir) => walk(dir))
  .filter((file) => PUBLIC_EXTENSIONS.has(path.extname(file)));

if (fs.existsSync(path.join(ROOT, 'public'))) {
  publicFiles.push(
    ...walk('public').filter((file) => path.extname(file) === '.txt')
  );
}

for (const file of publicFiles) {
  const lines = read(file).split('\n');
  lines.forEach((line, index) => {
    if (/zooplus/i.test(line)) {
      failures.push(`${file}:${index + 1}: ${line.trim()}`);
    }
  });
}

for (const file of walk('src/content/articulos').filter((f) => f.endsWith('.mdx'))) {
  const lines = read(file).split('\n');
  lines.forEach((line, index) => {
    if (!/Zooplus|zooplus/.test(line)) return;
    if (ALLOWED_CONTENT_PATTERNS.some((pattern) => pattern.test(line))) return;
    failures.push(`${file}:${index + 1}: ${line.trim()}`);
  });
}

for (const file of walk('src/content/productos').filter((f) => f.endsWith('.yaml'))) {
  const lines = read(file).split('\n');
  lines.forEach((line, index) => {
    if (!/Zooplus|zooplus/.test(line)) return;
    if (ALLOWED_CONTENT_PATTERNS.some((pattern) => pattern.test(line))) return;
    failures.push(`${file}:${index + 1}: ${line.trim()}`);
  });
}

if (failures.length) {
  console.error('Found public Zooplus references:');
  console.error(failures.slice(0, 80).join('\n'));
  if (failures.length > 80) {
    console.error(`...and ${failures.length - 80} more`);
  }
  process.exit(1);
}

console.log('No public Zooplus references found.');
