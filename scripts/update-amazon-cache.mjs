#!/usr/bin/env node

/**
 * Updates src/data/amazon-products.json from all Amazon ASINs used in MDX articles.
 * This centralizes volatile Amazon data (price, image, availability) without editing articles.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { getItems } from './amazon-api.mjs';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const ARTICLES_DIR = path.join(ROOT, 'src/content/articulos');
const OUT_PATH = path.join(ROOT, 'src/data/amazon-products.json');
const ASIN_RE = /(?:https?:\/\/www\.amazon\.es)?\/dp\/([A-Z0-9]{10})/g;

const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const parsed = { delay: 5000, retries: 5, limit: null, article: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--delay') parsed.delay = Number(argv[++i]);
    else if (arg === '--retries') parsed.retries = Number(argv[++i]);
    else if (arg === '--limit') parsed.limit = Number(argv[++i]);
    else if (arg === '--article') parsed.article = argv[++i];
    else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Uso:
  node scripts/update-amazon-cache.mjs
  node scripts/update-amazon-cache.mjs --article mejor-comedero-automatico-wifi-gatos
  node scripts/update-amazon-cache.mjs --limit 20

Opciones:
  --delay MS     Pausa entre lotes de 10 ASINs (default: 5000)
  --retries N    Reintentos ante rate limit 429 (default: 5)
  --limit N      Limita numero de ASINs unicos
  --article slug Actualiza solo ASINs de un articulo`);
}

async function main() {
  const asins = await collectAsins();
  const existing = await readExistingCache();
  const updated = { ...existing };
  const missing = [];
  const now = new Date().toISOString();

  for (let i = 0; i < asins.length; i += 10) {
    const batch = asins.slice(i, i + 10);
    if (i > 0 && args.delay > 0) await sleep(args.delay);
    const items = await getItemsWithRetry(batch);
    const found = new Set(items.map(item => item.asin));

    for (const item of items) {
      updated[item.asin] = formatCacheEntry(item, now);
    }

    for (const asin of batch) {
      if (!found.has(asin)) {
        missing.push(asin);
        updated[asin] = {
          ...(updated[asin] || { asin }),
          asin,
          availability: 'No encontrado por Amazon API',
          availabilityType: 'NOT_FOUND',
          updatedAt: now,
        };
      }
    }
  }

  await fs.writeFile(OUT_PATH, `${JSON.stringify(sortObject(updated), null, 2)}\n`, 'utf8');
  console.log(`Cache actualizado: ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`ASINs consultados: ${asins.length}`);
  console.log(`ASINs no encontrados: ${missing.length}`);
}

async function collectAsins() {
  const files = await listMdxFiles(ARTICLES_DIR);
  const asins = new Set();

  for (const file of files) {
    if (args.article && path.basename(file, '.mdx') !== args.article) continue;
    const content = await fs.readFile(file, 'utf8');
    for (const match of content.matchAll(ASIN_RE)) asins.add(match[1]);
  }

  const list = [...asins].sort();
  return args.limit ? list.slice(0, args.limit) : list;
}

async function listMdxFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listMdxFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(fullPath);
  }
  return files;
}

async function readExistingCache() {
  try {
    return JSON.parse(await fs.readFile(OUT_PATH, 'utf8'));
  } catch {
    return {};
  }
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

function formatCacheEntry(item, updatedAt) {
  const listing = item.offersV2?.listings?.[0];
  return {
    asin: item.asin,
    title: item.itemInfo?.title?.displayValue,
    price: listing?.price?.money?.displayAmount,
    image: optimizeImage(item.images?.primary?.large?.url || item.images?.primary?.medium?.url),
    url: item.detailPageURL,
    availability: listing?.availability?.message,
    availabilityType: listing?.availability?.type,
    updatedAt,
  };
}

function optimizeImage(url) {
  return url?.replace(/\._SL\d+_?/, '._AC_SL300_').replace(/\._AC_SL\d+_?/, '._AC_SL300_');
}

function sortObject(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
