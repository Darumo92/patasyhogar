#!/usr/bin/env node

/**
 * validate-products.mjs
 *
 * Scans all MDX articles, extracts Amazon ASINs, scrapes Amazon.es for real
 * product data (images, prices, availability), and can update the MDX files.
 *
 * Usage:
 *   node scripts/validate-products.mjs                  # Report only (dry-run)
 *   node scripts/validate-products.mjs --fix             # Update MDX files
 *   node scripts/validate-products.mjs --article <slug>  # Process one article
 *   node scripts/validate-products.mjs --fix --article mejor-cama-gato
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICULOS_DIR = path.join(ROOT, 'src', 'content', 'articulos');

const RATE_LIMIT_MIN_MS = 2000;
const RATE_LIMIT_MAX_MS = 4000;
const SESSION_REFRESH_EVERY = 10;
const CAPTCHA_RETRY_DELAY_MS = 7000;
const MAX_RETRIES = 2;

// ---------------------------------------------------------------------------
// ANSI colors
// ---------------------------------------------------------------------------

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
};

function colorize(color, text) {
  return `${color}${text}${C.reset}`;
}

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { fix: false, article: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--fix') opts.fix = true;
    if (args[i] === '--article' && args[i + 1]) {
      opts.article = args[i + 1];
      i++;
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// Sleep / random delay helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(min = RATE_LIMIT_MIN_MS, max = RATE_LIMIT_MAX_MS) {
  return sleep(min + Math.random() * (max - min));
}

// ---------------------------------------------------------------------------
// HTTP helpers (Node built-in https with cookie jar)
// ---------------------------------------------------------------------------

class Session {
  constructor() {
    this.cookies = {};
    this.headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
    };
  }

  _buildCookieHeader() {
    const parts = [];
    for (const [k, v] of Object.entries(this.cookies)) {
      parts.push(`${k}=${v}`);
    }
    return parts.length > 0 ? parts.join('; ') : undefined;
  }

  _parseCookies(setCookieHeaders) {
    if (!setCookieHeaders) return;
    const list = Array.isArray(setCookieHeaders)
      ? setCookieHeaders
      : [setCookieHeaders];
    for (const raw of list) {
      const pair = raw.split(';')[0];
      const eqIdx = pair.indexOf('=');
      if (eqIdx > 0) {
        const name = pair.substring(0, eqIdx).trim();
        const value = pair.substring(eqIdx + 1).trim();
        this.cookies[name] = value;
      }
    }
  }

  get(urlStr, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const url = new URL(urlStr);
      const mod = url.protocol === 'https:' ? https : http;

      const headers = { ...this.headers };
      const cookie = this._buildCookieHeader();
      if (cookie) headers.Cookie = cookie;

      const req = mod.get(
        {
          hostname: url.hostname,
          path: url.pathname + url.search,
          headers,
          timeout: timeoutMs,
        },
        (res) => {
          this._parseCookies(res.headers['set-cookie']);

          // Handle redirects
          if (
            [301, 302, 303, 307, 308].includes(res.statusCode) &&
            res.headers.location
          ) {
            let redirectUrl = res.headers.location;
            if (redirectUrl.startsWith('/')) {
              redirectUrl = `${url.protocol}//${url.hostname}${redirectUrl}`;
            }
            res.resume(); // consume the response
            this.get(redirectUrl, timeoutMs).then(resolve).catch(reject);
            return;
          }

          const chunks = [];
          const encoding = res.headers['content-encoding'];

          let stream = res;
          if (encoding === 'gzip') {
            stream = res.pipe(zlib.createGunzip());
          } else if (encoding === 'deflate') {
            stream = res.pipe(zlib.createInflate());
          } else if (encoding === 'br') {
            stream = res.pipe(zlib.createBrotliDecompress());
          }

          stream.on('data', (chunk) => chunks.push(chunk));
          stream.on('end', () => {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: Buffer.concat(chunks).toString('utf-8'),
            });
          });
          stream.on('error', reject);
        },
      );

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      req.on('error', reject);
    });
  }

  async init() {
    try {
      await this.get('https://www.amazon.es');
      await sleep(1000);
    } catch {
      // ignore, cookies may still be set
    }
    return this;
  }
}

// ---------------------------------------------------------------------------
// Image URL normalization
// ---------------------------------------------------------------------------

function normalizeImageUrl(url) {
  const match = url.match(
    /^(https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_%-]+)/,
  );
  if (match) {
    let base = match[1].replace(/\.+$/, '');
    return `${base}._AC_SL1500_.jpg`;
  }
  return url;
}

// ---------------------------------------------------------------------------
// Amazon scraping
// ---------------------------------------------------------------------------

/**
 * Extract main product image from Amazon HTML.
 * Uses multiple patterns like the Python reference script.
 */
function extractImageFromHtml(html) {
  // Pattern 1: colorImages JSON - hiRes
  let m = html.match(
    /"hiRes"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  );
  if (m) return normalizeImageUrl(m[1]);

  // Pattern 2: colorImages JSON - large
  m = html.match(
    /"large"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  );
  if (m) return normalizeImageUrl(m[1]);

  // Pattern 3: data-old-hires
  m = html.match(
    /data-old-hires="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  );
  if (m) return normalizeImageUrl(m[1]);

  // Pattern 4: landingImage src
  m = html.match(
    /id="landingImage"[^>]*src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  );
  if (m) return normalizeImageUrl(m[1]);

  // Pattern 5: imgTagWrapperId
  m = html.match(
    /id="imgTagWrapperId"[^>]*>[\s\S]*?src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  );
  if (m) return normalizeImageUrl(m[1]);

  // Pattern 6: mainUrl
  m = html.match(
    /"mainUrl"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  );
  if (m) return normalizeImageUrl(m[1]);

  // Pattern 7: any product image in imageBlock
  const allMatches = [
    ...html.matchAll(
      /(https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_-]+)\._[^"']+\.jpg/g,
    ),
  ];
  const productImgs = allMatches
    .map((x) => x[1])
    .filter((id) => {
      const basename = id.split('/').pop();
      return basename.length > 10;
    });

  if (productImgs.length > 0) {
    return `${productImgs[0]}._AC_SL1500_.jpg`;
  }

  return null;
}

/**
 * Extract price from Amazon HTML.
 */
function extractPriceFromHtml(html) {
  // Pattern 1: JSON priceAmount
  let m = html.match(/"priceAmount"\s*:\s*([0-9]+[.,][0-9]{2})/);
  if (m) return parseFloat(m[1].replace(',', '.'));

  // Pattern 2: a-price-whole + a-price-fraction
  m = html.match(
    /class="a-price-whole">([0-9.,]+)<[\s\S]*?class="a-price-fraction">([0-9]+)</,
  );
  if (m) {
    const whole = m[1].replace(/[.,]/g, '');
    const fraction = m[2];
    return parseFloat(`${whole}.${fraction}`);
  }

  // Pattern 3: class="a-price" with a-offscreen
  m = html.match(
    /class="a-price[^"]*"[\s\S]*?class="a-offscreen">([0-9.,]+)\s*€/,
  );
  if (m) return parseFloat(m[1].replace('.', '').replace(',', '.'));

  // Pattern 4: priceBlockBuyingPriceString or similar
  m = html.match(/id="priceblock[^"]*"[^>]*>[\s\S]*?([0-9]+[.,][0-9]{2})\s*€/);
  if (m) return parseFloat(m[1].replace(',', '.'));

  // Pattern 5: corePrice_feature_div
  m = html.match(
    /corePrice_feature_div[\s\S]*?class="a-offscreen">([0-9.,]+)\s*€/,
  );
  if (m) return parseFloat(m[1].replace('.', '').replace(',', '.'));

  // Pattern 6: simple euro pattern in price context
  m = html.match(
    /class="[^"]*priceToPay[^"]*"[\s\S]*?([0-9]+[.,][0-9]{2})\s*€/,
  );
  if (m) return parseFloat(m[1].replace('.', '').replace(',', '.'));

  return null;
}

/**
 * Check if the product page indicates unavailability.
 */
function checkAvailability(html) {
  // Product not found
  if (html.includes('id="g"') && html.includes('Perros de Amazon')) return false;
  if (html.includes('Page Not Found')) return false;

  // "Actualmente no disponible"
  if (
    html.includes('Actualmente no disponible') ||
    html.includes('Currently unavailable')
  ) {
    return false;
  }

  // Very short page might be a 404 or error
  if (html.length < 5000 && !html.includes('productTitle')) return false;

  return true;
}

/**
 * Detect CAPTCHA page.
 */
function isCaptcha(html) {
  return (
    html.toLowerCase().includes('captcha') &&
    html.length < 20000
  );
}

/**
 * Fetch product data for a single ASIN from Amazon.es.
 */
async function fetchProductData(session, asin) {
  const url = `https://www.amazon.es/dp/${asin}`;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const resp = await session.get(url);
      const html = resp.body;

      if (isCaptcha(html)) {
        if (attempt < MAX_RETRIES) {
          await sleep(CAPTCHA_RETRY_DELAY_MS + Math.random() * 3000);
          continue;
        }
        return { asin, error: 'CAPTCHA', available: null, image: null, price: null };
      }

      const available = checkAvailability(html);
      const image = extractImageFromHtml(html);
      const price = extractPriceFromHtml(html);

      return { asin, available, image, price, error: null };
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        await sleep(3000 + Math.random() * 3000);
        continue;
      }
      return {
        asin,
        error: err.message || 'Unknown error',
        available: null,
        image: null,
        price: null,
      };
    }
  }

  return { asin, error: 'Max retries exceeded', available: null, image: null, price: null };
}

// ---------------------------------------------------------------------------
// MDX parsing
// ---------------------------------------------------------------------------

/**
 * Extract all products from an MDX file content.
 * Returns array of { nombre, asin, imagen, precio, source, startIdx, endIdx }
 */
function extractProducts(content) {
  const products = [];

  // Extract ASINs via /dp/ pattern and their surrounding context
  const asinPattern = /\/dp\/([A-Z0-9]{10})/g;
  let match;

  while ((match = asinPattern.exec(content)) !== null) {
    const asin = match[1];
    const matchIdx = match.index;

    // Try to find the enclosing product object { ... } for ComparisonTable
    // or the enclosing <TopPick ... /> component
    const product = { asin, imagen: null, precio: null, nombre: null, source: null };

    // Look for the enclosing block — find the { or <TopPick before this ASIN
    // Check if it's inside a ComparisonTable product object
    const objStart = findEnclosingBrace(content, matchIdx);
    if (objStart !== -1) {
      const objEnd = findClosingBrace(content, objStart);
      if (objEnd !== -1) {
        const block = content.substring(objStart, objEnd + 1);
        product.source = 'ComparisonTable';

        // Extract nombre
        const nombreMatch = block.match(/nombre:\s*"([^"]*)"/);
        if (nombreMatch) product.nombre = nombreMatch[1];

        // Extract imagen
        const imagenMatch = block.match(/imagen:\s*"([^"]*)"/);
        if (imagenMatch) product.imagen = imagenMatch[1];

        // Extract precio
        const precioMatch = block.match(/precio:\s*"([^"]*)"/);
        if (precioMatch) product.precio = precioMatch[1];
      }
    }

    // Check if it's inside a TopPick component
    const topPickStart = findEnclosingTopPick(content, matchIdx);
    if (topPickStart !== -1) {
      const topPickEnd = content.indexOf('/>', topPickStart);
      if (topPickEnd !== -1) {
        const block = content.substring(topPickStart, topPickEnd + 2);
        product.source = 'TopPick';

        const nombreMatch = block.match(/nombre="([^"]*)"/);
        if (nombreMatch) product.nombre = nombreMatch[1];

        const imagenMatch = block.match(/imagen="([^"]*)"/);
        if (imagenMatch) product.imagen = imagenMatch[1];

        const precioMatch = block.match(/precio="([^"]*)"/);
        if (precioMatch) product.precio = precioMatch[1];
      }
    }

    // Also check for AffiliateButton (has no imagen/precio, just note)
    if (!product.source) {
      const abStart = findEnclosingAffiliateButton(content, matchIdx);
      if (abStart !== -1) {
        product.source = 'AffiliateButton';
      }
    }

    products.push(product);
  }

  // Deduplicate by ASIN (keep the first, which is usually TopPick or ComparisonTable)
  const seen = new Set();
  const unique = [];
  for (const p of products) {
    const key = `${p.asin}-${p.source}`;
    if (!seen.has(key) && p.source !== 'AffiliateButton') {
      seen.add(key);
      unique.push(p);
    }
  }

  return unique;
}

function findEnclosingBrace(content, idx) {
  // Walk backwards from idx to find the nearest unmatched {
  let depth = 0;
  for (let i = idx; i >= 0; i--) {
    if (content[i] === '}') depth++;
    if (content[i] === '{') {
      if (depth === 0) return i;
      depth--;
    }
  }
  return -1;
}

function findClosingBrace(content, idx) {
  let depth = 0;
  for (let i = idx; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findEnclosingTopPick(content, idx) {
  // Look backwards for <TopPick
  const before = content.substring(0, idx);
  const lastTopPick = before.lastIndexOf('<TopPick');
  if (lastTopPick === -1) return -1;

  // Make sure there's no /> between the <TopPick and our idx
  const between = content.substring(lastTopPick, idx);
  if (between.includes('/>')) return -1;

  return lastTopPick;
}

function findEnclosingAffiliateButton(content, idx) {
  const before = content.substring(0, idx);
  const last = before.lastIndexOf('<AffiliateButton');
  if (last === -1) return -1;
  const between = content.substring(last, idx);
  if (between.includes('/>') || between.includes('>')) {
    // check more carefully
    const closingTag = content.indexOf('/>', last);
    if (closingTag !== -1 && closingTag >= idx) return last;
  }
  return -1;
}

/**
 * Parse the approximate price from a string like "~25€", "~20-30€", "~50,99€"
 * Returns a number (the first / main price) or null.
 */
function parsePriceFromString(priceStr) {
  if (!priceStr) return null;
  const m = priceStr.match(/([0-9]+[.,]?[0-9]*)/);
  if (m) return parseFloat(m[1].replace(',', '.'));
  return null;
}

/**
 * Format a price as the approximate string used in MDX (e.g. "~25€").
 */
function formatPrice(price) {
  if (price === null || price === undefined) return null;
  const rounded = Math.round(price);
  return `~${rounded}\u20AC`;
}

// ---------------------------------------------------------------------------
// MDX update logic
// ---------------------------------------------------------------------------

function updateMdxContent(content, asinUpdates) {
  let updated = content;

  for (const [asin, data] of Object.entries(asinUpdates)) {
    if (!data.image && !data.price) continue;

    // Update ComparisonTable product objects containing this ASIN
    const objPattern = new RegExp(
      '\\{[^{}]*?\\/dp\\/' + asin + '[^{}]*?\\}',
      'gs',
    );
    for (const objMatch of updated.matchAll(objPattern)) {
      let block = objMatch[0];
      let newBlock = block;

      if (data.image) {
        newBlock = newBlock.replace(
          /(imagen:\s*")https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+(")/,
          `$1${data.image}$2`,
        );
      }

      if (data.price) {
        newBlock = newBlock.replace(
          /(precio:\s*")[^"]*(")/,
          `$1${data.price}$2`,
        );
      }

      if (newBlock !== block) {
        updated = updated.replace(block, newBlock);
      }
    }

    // Also handle objects where imagen comes before enlaceAmazon
    const objPattern2 = new RegExp(
      '\\{[^{}]*?imagen:\\s*"[^"]*"[^{}]*?\\/dp\\/' + asin + '[^{}]*?\\}',
      'gs',
    );
    for (const objMatch of updated.matchAll(objPattern2)) {
      let block = objMatch[0];
      let newBlock = block;

      if (data.image) {
        newBlock = newBlock.replace(
          /(imagen:\s*")https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+(")/,
          `$1${data.image}$2`,
        );
      }

      if (data.price) {
        newBlock = newBlock.replace(
          /(precio:\s*")[^"]*(")/,
          `$1${data.price}$2`,
        );
      }

      if (newBlock !== block) {
        updated = updated.replace(block, newBlock);
      }
    }

    // Update TopPick components containing this ASIN
    const tpPattern = new RegExp(
      '<TopPick\\b[^>]*\\/dp\\/' + asin + '[^>]*\\/>',
      'gs',
    );
    for (const tpMatch of updated.matchAll(tpPattern)) {
      let block = tpMatch[0];
      let newBlock = block;

      if (data.image) {
        newBlock = newBlock.replace(
          /(imagen=")https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+(")/,
          `$1${data.image}$2`,
        );
      }

      if (data.price) {
        newBlock = newBlock.replace(
          /(precio=")[^"]*(")/,
          `$1${data.price}$2`,
        );
      }

      if (newBlock !== block) {
        updated = updated.replace(block, newBlock);
      }
    }

    // Also handle TopPick where imagen comes before enlaceAmazon
    const tpPattern2 = new RegExp(
      '<TopPick\\b[^>]*imagen="[^"]*"[^>]*\\/dp\\/' + asin + '[^>]*\\/>',
      'gs',
    );
    for (const tpMatch of updated.matchAll(tpPattern2)) {
      let block = tpMatch[0];
      let newBlock = block;

      if (data.image) {
        newBlock = newBlock.replace(
          /(imagen=")https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+(")/,
          `$1${data.image}$2`,
        );
      }

      if (data.price) {
        newBlock = newBlock.replace(
          /(precio=")[^"]*(")/,
          `$1${data.price}$2`,
        );
      }

      if (newBlock !== block) {
        updated = updated.replace(block, newBlock);
      }
    }
  }

  return updated;
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function printReport(articleResults) {
  const issues = {
    wrongImage: [],
    unavailable: [],
    priceChanged: [],
    fetchError: [],
  };

  let totalProducts = 0;
  let totalOk = 0;

  for (const { slug, products } of articleResults) {
    for (const p of products) {
      totalProducts++;
      const fetched = p.fetched;

      if (!fetched) continue;

      if (fetched.error) {
        issues.fetchError.push({ slug, ...p });
        continue;
      }

      if (fetched.available === false) {
        issues.unavailable.push({ slug, ...p });
        continue;
      }

      let hasIssue = false;

      // Check image mismatch
      if (fetched.image && p.imagen) {
        const currentNorm = normalizeImageUrl(p.imagen);
        if (currentNorm !== fetched.image) {
          issues.wrongImage.push({
            slug,
            ...p,
            currentImage: p.imagen,
            newImage: fetched.image,
          });
          hasIssue = true;
        }
      }

      // Check price difference
      if (fetched.price !== null && p.precio) {
        const currentPrice = parsePriceFromString(p.precio);
        if (currentPrice !== null) {
          const diff = Math.abs(fetched.price - currentPrice);
          const pctDiff =
            currentPrice > 0 ? (diff / currentPrice) * 100 : 100;
          // Flag if price differs by more than 20% or more than 5 euros
          if (pctDiff > 20 || diff > 5) {
            issues.priceChanged.push({
              slug,
              ...p,
              currentPrice: p.precio,
              newPrice: fetched.price,
            });
            hasIssue = true;
          }
        }
      }

      if (!hasIssue) totalOk++;
    }
  }

  console.log('\n' + colorize(C.bold + C.cyan, '═'.repeat(70)));
  console.log(colorize(C.bold + C.cyan, '  PRODUCT VALIDATION REPORT'));
  console.log(colorize(C.bold + C.cyan, '═'.repeat(70)));

  // Unavailable products
  if (issues.unavailable.length > 0) {
    console.log(
      `\n${colorize(C.bgRed + C.white + C.bold, ' UNAVAILABLE ')} ${colorize(C.red, `${issues.unavailable.length} product(s) not available on Amazon`)}`,
    );
    for (const p of issues.unavailable) {
      console.log(
        `  ${colorize(C.red, '✗')} ${colorize(C.dim, p.slug)} → ${p.nombre || p.asin}`,
      );
      console.log(
        `    ${colorize(C.dim, `https://www.amazon.es/dp/${p.asin}`)}`,
      );
    }
  }

  // Wrong images
  if (issues.wrongImage.length > 0) {
    console.log(
      `\n${colorize(C.bgYellow + C.bold, ' WRONG IMAGE ')} ${colorize(C.yellow, `${issues.wrongImage.length} product(s) with outdated images`)}`,
    );
    for (const p of issues.wrongImage) {
      console.log(
        `  ${colorize(C.yellow, '⚠')} ${colorize(C.dim, p.slug)} → ${p.nombre || p.asin}`,
      );
      console.log(`    ${colorize(C.red, 'Current:')} ${p.currentImage}`);
      console.log(`    ${colorize(C.green, 'Amazon: ')} ${p.newImage}`);
    }
  }

  // Price changes
  if (issues.priceChanged.length > 0) {
    console.log(
      `\n${colorize(C.bgYellow + C.bold, ' PRICE CHANGE ')} ${colorize(C.yellow, `${issues.priceChanged.length} product(s) with significant price difference`)}`,
    );
    for (const p of issues.priceChanged) {
      console.log(
        `  ${colorize(C.yellow, '$')} ${colorize(C.dim, p.slug)} → ${p.nombre || p.asin}`,
      );
      console.log(
        `    MDX: ${colorize(C.red, p.currentPrice)} → Amazon: ${colorize(C.green, `${p.newPrice.toFixed(2)}€`)}`,
      );
    }
  }

  // Fetch errors
  if (issues.fetchError.length > 0) {
    console.log(
      `\n${colorize(C.bgRed + C.white + C.bold, ' FETCH ERROR ')} ${colorize(C.red, `${issues.fetchError.length} product(s) could not be fetched`)}`,
    );
    for (const p of issues.fetchError) {
      console.log(
        `  ${colorize(C.red, '✗')} ${p.asin} (${p.slug}): ${p.fetched?.error || 'unknown'}`,
      );
    }
  }

  // Summary
  const totalIssues =
    issues.unavailable.length +
    issues.wrongImage.length +
    issues.priceChanged.length +
    issues.fetchError.length;

  console.log('\n' + colorize(C.bold + C.cyan, '─'.repeat(70)));
  console.log(colorize(C.bold, '  SUMMARY'));
  console.log(
    `  Total products scanned: ${colorize(C.bold, String(totalProducts))}`,
  );
  console.log(`  ${colorize(C.green, '✓')} OK: ${totalOk}`);
  console.log(
    `  ${colorize(C.red, '✗')} Unavailable: ${issues.unavailable.length}`,
  );
  console.log(
    `  ${colorize(C.yellow, '⚠')} Wrong image: ${issues.wrongImage.length}`,
  );
  console.log(
    `  ${colorize(C.yellow, '$')} Price changed: ${issues.priceChanged.length}`,
  );
  console.log(
    `  ${colorize(C.red, '!')} Fetch errors: ${issues.fetchError.length}`,
  );
  console.log(colorize(C.bold + C.cyan, '─'.repeat(70)));

  if (totalIssues > 0) {
    console.log(
      `\n${colorize(C.dim, 'Run with')} ${colorize(C.bold, '--fix')} ${colorize(C.dim, 'to update MDX files with corrected images.')}`,
    );
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs();

  console.log(colorize(C.bold + C.cyan, '\n  Patas y Hogar — Product Validator\n'));

  if (opts.fix) {
    console.log(
      colorize(C.bgYellow + C.bold, ' MODE: FIX ') +
        ' — Will update MDX files\n',
    );
  } else {
    console.log(
      colorize(C.bgGreen + C.bold, ' MODE: DRY RUN ') +
        ' — Report only, no files modified\n',
    );
  }

  // 1. Scan phase: read MDX files and extract products
  console.log(colorize(C.bold, '▶ Scanning articles for products...\n'));

  let mdxFiles;
  if (opts.article) {
    const filePath = path.join(ARTICULOS_DIR, `${opts.article}.mdx`);
    if (!fs.existsSync(filePath)) {
      console.error(
        colorize(C.red, `Article not found: ${filePath}`),
      );
      process.exit(1);
    }
    mdxFiles = [filePath];
  } else {
    mdxFiles = fs
      .readdirSync(ARTICULOS_DIR)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => path.join(ARTICULOS_DIR, f))
      .sort();
  }

  const articleData = [];
  const allAsins = new Map(); // asin -> [{ slug, product }]

  for (const filePath of mdxFiles) {
    const slug = path.basename(filePath, '.mdx');
    const content = fs.readFileSync(filePath, 'utf-8');
    const products = extractProducts(content);

    if (products.length === 0) continue;

    articleData.push({ slug, filePath, content, products });

    for (const p of products) {
      if (!allAsins.has(p.asin)) {
        allAsins.set(p.asin, []);
      }
      allAsins.get(p.asin).push({ slug, product: p });
    }

    console.log(
      `  ${colorize(C.dim, slug)}: ${colorize(C.bold, String(products.length))} products`,
    );
  }

  const uniqueAsins = [...allAsins.keys()];
  console.log(
    `\n  Total: ${colorize(C.bold, String(articleData.length))} articles, ${colorize(C.bold, String(uniqueAsins.length))} unique ASINs\n`,
  );

  if (uniqueAsins.length === 0) {
    console.log(colorize(C.yellow, 'No products found. Nothing to do.'));
    return;
  }

  // 2. Fetch phase: scrape Amazon.es for each unique ASIN
  console.log(colorize(C.bold, '▶ Fetching product data from Amazon.es...\n'));

  let session = await new Session().init();
  const fetchResults = new Map(); // asin -> result
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < uniqueAsins.length; i++) {
    const asin = uniqueAsins[i];

    process.stdout.write(
      `  [${i + 1}/${uniqueAsins.length}] ${colorize(C.dim, asin)} ... `,
    );

    const result = await fetchProductData(session, asin);
    fetchResults.set(asin, result);

    if (result.error) {
      console.log(colorize(C.red, `FAILED (${result.error})`));
      failCount++;
    } else if (result.available === false) {
      console.log(colorize(C.yellow, 'UNAVAILABLE'));
      failCount++;
    } else {
      const parts = [];
      if (result.image) parts.push(colorize(C.green, 'img'));
      if (result.price !== null) parts.push(colorize(C.green, `${result.price.toFixed(2)}€`));
      console.log(colorize(C.green, 'OK') + ` (${parts.join(', ')})`);
      successCount++;
    }

    // Rate limiting
    if (i < uniqueAsins.length - 1) {
      await randomDelay();
    }

    // Refresh session periodically
    if ((i + 1) % SESSION_REFRESH_EVERY === 0 && i < uniqueAsins.length - 1) {
      process.stdout.write(
        colorize(C.dim, '  [Refreshing session...]\n'),
      );
      session = await new Session().init();
      await sleep(2000);
    }
  }

  console.log(
    `\n  Fetch results: ${colorize(C.green, String(successCount))} OK, ${colorize(C.red, String(failCount))} failed\n`,
  );

  // Attach fetch results to products
  const articleResults = articleData.map(({ slug, filePath, content, products }) => ({
    slug,
    filePath,
    content,
    products: products.map((p) => ({
      ...p,
      fetched: fetchResults.get(p.asin) || null,
    })),
  }));

  // 3. Report phase
  const issues = printReport(articleResults);

  // 4. Fix phase
  if (opts.fix) {
    const totalFixable = issues.wrongImage.length + issues.priceChanged.length;

    if (totalFixable === 0) {
      console.log(
        colorize(C.green, '\nNo fixable issues found. All files are up to date.'),
      );
      return;
    }

    console.log(
      `\n${colorize(C.bold, '▶ Updating MDX files...')}\n`,
    );

    let filesUpdated = 0;

    for (const { slug, filePath, content } of articleData) {
      // Build update map for this article
      const asinUpdates = {};
      const articleProducts = articleResults.find((a) => a.slug === slug);
      if (!articleProducts) continue;

      for (const p of articleProducts.products) {
        if (!p.fetched || p.fetched.error || p.fetched.available === false) continue;

        const updates = {};

        // Only update images that are actually different
        if (p.fetched.image && p.imagen) {
          const currentNorm = normalizeImageUrl(p.imagen);
          if (currentNorm !== p.fetched.image) {
            updates.image = p.fetched.image;
          }
        }

        // Update prices that have changed significantly
        if (p.fetched.price !== null && p.precio) {
          const currentPrice = parsePriceFromString(p.precio);
          if (currentPrice !== null) {
            const diff = Math.abs(p.fetched.price - currentPrice);
            const pctDiff = diff / currentPrice;
            if (pctDiff > 0.2 || diff > 5) {
              updates.price = formatPrice(p.fetched.price);
            }
          }
        }

        if (Object.keys(updates).length > 0) {
          asinUpdates[p.asin] = updates;
        }
      }

      if (Object.keys(asinUpdates).length === 0) continue;

      const newContent = updateMdxContent(content, asinUpdates);

      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        filesUpdated++;
        const updatedAsins = Object.keys(asinUpdates).length;
        console.log(
          `  ${colorize(C.green, '✓')} ${slug}.mdx — ${updatedAsins} product(s) updated`,
        );
      }
    }

    console.log(
      `\n  ${colorize(C.bold + C.green, `${filesUpdated} file(s) updated.`)}`,
    );
  }

  console.log('');
}

main().catch((err) => {
  console.error(colorize(C.red, `\nFatal error: ${err.message}`));
  console.error(err.stack);
  process.exit(1);
});
