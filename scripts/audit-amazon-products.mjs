#!/usr/bin/env node

/**
 * Audits Amazon products used in MDX articles via scripts/amazon-api.mjs.
 * Generates a Markdown report and does not modify articles.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { getItems } from './amazon-api.mjs';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const ARTICLES_DIR = path.join(ROOT, 'src/content/articulos');
const DEFAULT_OUT_DIR = path.join(ROOT, 'reports/amazon-products');
const ASIN_RE = /(?:https?:\/\/www\.amazon\.es)?\/dp\/([A-Z0-9]{10})/g;

const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const parsed = { limit: null, article: null, out: null, stdout: false, delay: 1500, retries: 3 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--limit') parsed.limit = Number(argv[++i]);
    else if (arg === '--article') parsed.article = argv[++i];
    else if (arg === '--out') parsed.out = argv[++i];
    else if (arg === '--delay') parsed.delay = Number(argv[++i]);
    else if (arg === '--retries') parsed.retries = Number(argv[++i]);
    else if (arg === '--stdout') parsed.stdout = true;
    else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Uso:
  node scripts/audit-amazon-products.mjs
  node scripts/audit-amazon-products.mjs --limit 10
  node scripts/audit-amazon-products.mjs --article mejor-comedero-automatico-wifi-gatos
  node scripts/audit-amazon-products.mjs --stdout

Opciones:
  --limit N       Audita solo los primeros N articulos con ASINs
  --article slug Audita un unico articulo por slug de fichero
  --out path     Ruta del reporte Markdown
  --stdout       Imprime el reporte en consola y no escribe fichero
  --delay MS     Pausa entre lotes de 10 ASINs (default: 1500)
  --retries N    Reintentos ante rate limit 429 (default: 3)`);
}

async function main() {
  const files = await listMdxFiles(ARTICLES_DIR);
  let articles = [];

  for (const file of files) {
    if (args.article && path.basename(file, '.mdx') !== args.article) continue;
    const content = await fs.readFile(file, 'utf8');
    const products = extractProducts(content, file);
    if (products.length > 0) {
      articles.push({ file, slug: path.basename(file, '.mdx'), products });
    }
  }

  if (args.limit) articles = articles.slice(0, args.limit);

  const allAsins = [...new Set(articles.flatMap(article => article.products.map(product => product.asin)))];
  const items = await fetchItems(allAsins);
  const report = buildReport(articles, items);

  if (args.stdout) {
    console.log(report);
    return;
  }

  const outPath = args.out ? path.resolve(ROOT, args.out) : defaultReportPath();
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, report, 'utf8');
  console.log(`Reporte generado: ${path.relative(ROOT, outPath)}`);
}

async function listMdxFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listMdxFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(fullPath);
  }
  return files.sort();
}

function extractProducts(content, file) {
  const lineStarts = getLineStarts(content);
  const products = [];
  const seen = new Set();

  for (const match of content.matchAll(ASIN_RE)) {
    const asin = match[1];
    const line = lineNumberForIndex(lineStarts, match.index);
    const context = contextAround(content, match.index);
    const product = {
      asin,
      line,
      file: path.relative(ROOT, file),
      name: extractField(context, 'nombre'),
      storedPrice: extractField(context, 'precioAmazon') || extractField(context, 'precio'),
      storedImage: extractField(context, 'imagen'),
      amazonUrl: match[0].startsWith('http') ? match[0] : `https://www.amazon.es/dp/${asin}`,
    };
    const key = `${product.file}:${product.line}:${asin}`;
    if (!seen.has(key)) {
      products.push(product);
      seen.add(key);
    }
  }

  return products;
}

function getLineStarts(content) {
  const starts = [0];
  for (let i = 0; i < content.length; i += 1) {
    if (content[i] === '\n') starts.push(i + 1);
  }
  return starts;
}

function lineNumberForIndex(starts, index) {
  let low = 0;
  let high = starts.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (starts[mid] <= index) low = mid + 1;
    else high = mid - 1;
  }
  return high + 1;
}

function contextAround(content, index) {
  const start = Math.max(0, content.lastIndexOf('{', index - 1), content.lastIndexOf('<TopPick', index - 1));
  const endCandidates = [content.indexOf('}', index), content.indexOf('/>', index)].filter(value => value !== -1);
  const end = endCandidates.length > 0 ? Math.min(...endCandidates) + 2 : Math.min(content.length, index + 600);
  return content.slice(start, end);
}

function extractField(context, field) {
  const propMatch = context.match(new RegExp(`${field}\\s*:\\s*["']([^"']+)["']`));
  if (propMatch) return propMatch[1];
  const attrMatch = context.match(new RegExp(`${field}=["']([^"']+)["']`));
  return attrMatch?.[1] || null;
}

async function fetchItems(asins) {
  const map = new Map();
  for (let i = 0; i < asins.length; i += 10) {
    const batch = asins.slice(i, i + 10);
    if (i > 0 && args.delay > 0) await sleep(args.delay);
    const items = await getItemsWithRetry(batch);
    for (const item of items) map.set(item.asin, item);
  }
  return map;
}

async function getItemsWithRetry(batch) {
  for (let attempt = 0; attempt <= args.retries; attempt += 1) {
    try {
      return await getItems(batch);
    } catch (error) {
      const isRateLimit = error.message.includes('429') || error.message.includes('ThrottleException');
      if (!isRateLimit || attempt === args.retries) throw error;
      const wait = Math.min(60000, 10000 * (attempt + 1));
      console.error(`Rate limit Amazon API. Reintentando en ${Math.round(wait / 1000)}s...`);
      await sleep(wait);
    }
  }
  return [];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildReport(articles, items) {
  const rows = [];
  const counts = { critical: 0, high: 0, medium: 0, low: 0, ok: 0 };
  const totalProducts = articles.reduce((sum, article) => sum + article.products.length, 0);
  const uniqueAsins = new Set(articles.flatMap(article => article.products.map(product => product.asin))).size;

  for (const article of articles) {
    for (const product of article.products) {
      const item = items.get(product.asin);
      const issues = findIssues(product, item);
      const severity = highestSeverity(issues);
      counts[severity] += 1;
      rows.push({ article, product, item, issues, severity });
    }
  }

  const generatedAt = new Date().toISOString();
  const lines = [
    '# Auditoria productos Amazon',
    '',
    `Generado: ${generatedAt}`,
    '',
    '## Resumen',
    '',
    `- Articulos auditados: ${articles.length}`,
    `- Productos detectados: ${totalProducts}`,
    `- ASINs unicos: ${uniqueAsins}`,
    `- Criticos: ${counts.critical}`,
    `- Altos: ${counts.high}`,
    `- Medios: ${counts.medium}`,
    `- Bajos: ${counts.low}`,
    `- OK: ${counts.ok}`,
    '',
    '## Hallazgos',
    '',
  ];

  for (const severity of ['critical', 'high', 'medium', 'low']) {
    const group = rows.filter(row => row.severity === severity);
    lines.push(`### ${labelSeverity(severity)} (${group.length})`, '');
    if (group.length === 0) {
      lines.push('Sin hallazgos.', '');
      continue;
    }
    lines.push('| Articulo | Linea | ASIN | Producto MDX | Precio MDX | Amazon | Issues |');
    lines.push('|---|---:|---|---|---|---|---|');
    for (const row of group) {
      lines.push(formatIssueRow(row));
    }
    lines.push('');
  }

  lines.push('## Productos OK', '');
  const okRows = rows.filter(row => row.severity === 'ok');
  lines.push(`Productos sin incidencias fuertes: ${okRows.length}.`, '');

  return lines.join('\n');
}

function findIssues(product, item) {
  if (!item) return [{ severity: 'critical', message: 'ASIN no encontrado por Amazon API' }];

  const issues = [];
  const title = item.itemInfo?.title?.displayValue;
  const price = item.offersV2?.listings?.[0]?.price?.money?.displayAmount;
  const availability = item.offersV2?.listings?.[0]?.availability;
  const image = item.images?.primary?.large?.url || item.images?.primary?.medium?.url;

  if (!price) issues.push({ severity: 'high', message: 'Amazon API no devuelve precio' });
  if (!image) issues.push({ severity: 'high', message: 'Amazon API no devuelve imagen' });
  if (!availability) issues.push({ severity: 'high', message: 'Amazon API no devuelve disponibilidad' });
  else if (availability.type && availability.type !== 'IN_STOCK') {
    issues.push({ severity: 'high', message: `Disponibilidad: ${availability.message || availability.type}` });
  }

  if (!product.storedImage) issues.push({ severity: 'high', message: 'Falta imagen en MDX' });
  else if (!product.storedImage.includes('m.media-amazon.com')) {
    issues.push({ severity: 'medium', message: 'Imagen MDX no es m.media-amazon.com' });
  }

  if (product.storedPrice && price) {
    const storedAmount = parseEuro(product.storedPrice);
    const apiAmount = parseEuro(price);
    if (storedAmount && apiAmount) {
      const diff = Math.abs(storedAmount - apiAmount);
      const pct = diff / apiAmount;
      if (diff >= 10 || pct >= 0.2) {
        issues.push({ severity: 'medium', message: `Precio distinto: MDX ${product.storedPrice}, API ${price}` });
      } else if (diff >= 3 || pct >= 0.08) {
        issues.push({ severity: 'low', message: `Precio algo distinto: MDX ${product.storedPrice}, API ${price}` });
      }
    }
  }

  if (product.name && title && titleMismatch(product.name, title)) {
    issues.push({ severity: 'medium', message: `Titulo puede no coincidir: API "${truncate(title, 80)}"` });
  }

  return issues;
}

function parseEuro(value) {
  const normalized = String(value)
    .replace(/~/g, '')
    .replace(/\s/g, '')
    .replace(/€/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  const match = normalized.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function titleMismatch(name, title) {
  const nameTokens = tokens(name);
  const titleTokens = new Set(tokens(title));
  if (nameTokens.length === 0) return false;
  const matches = nameTokens.filter(token => titleTokens.has(token)).length;
  return matches / nameTokens.length < 0.45;
}

function tokens(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !['para', 'con', 'the', 'and', 'los', 'las'].includes(token));
}

function highestSeverity(issues) {
  if (issues.length === 0) return 'ok';
  const order = ['critical', 'high', 'medium', 'low'];
  return order.find(severity => issues.some(issue => issue.severity === severity));
}

function labelSeverity(severity) {
  return {
    critical: 'Criticos',
    high: 'Altos',
    medium: 'Medios',
    low: 'Bajos',
  }[severity];
}

function formatIssueRow({ article, product, item, issues }) {
  const title = item?.itemInfo?.title?.displayValue || 'No encontrado';
  const price = item?.offersV2?.listings?.[0]?.price?.money?.displayAmount || '-';
  const amazon = `${escapeCell(truncate(title, 70))}<br>${escapeCell(price)}`;
  return [
    escapeCell(article.slug),
    product.line,
    product.asin,
    escapeCell(product.name || '-'),
    escapeCell(product.storedPrice || '-'),
    amazon,
    escapeCell(issues.map(issue => issue.message).join('; ')),
  ].join('|').replace(/^/, '|').replace(/$/, '|');
}

function escapeCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function truncate(value, max) {
  const text = String(value);
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function defaultReportPath() {
  const stamp = new Date().toISOString().slice(0, 10);
  return path.join(DEFAULT_OUT_DIR, `audit-${stamp}.md`);
}

main().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
