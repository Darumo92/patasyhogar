#!/usr/bin/env node

/**
 * amazon-api.mjs
 *
 * Amazon Creators API client for fetching product data (title, price, images).
 * Requires AMAZON_CLIENT_ID and AMAZON_CLIENT_SECRET in .env
 * Account needs 10+ qualifying sales in last 30 days.
 *
 * Usage:
 *   node scripts/amazon-api.mjs B0D5CJ14HQ                    # Get one ASIN
 *   node scripts/amazon-api.mjs B0D5CJ14HQ B09B2SBHQK          # Get multiple ASINs (max 10)
 *   node scripts/amazon-api.mjs --search "comedero automático gatos"  # Search products
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, '..', '.env');

// ---------------------------------------------------------------------------
// Load .env
// ---------------------------------------------------------------------------

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return;
  for (const line of fs.readFileSync(ENV_PATH, 'utf-8').split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

loadEnv();

const CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const PARTNER_TAG = 'patasyhogar-21';
const MARKETPLACE = 'www.amazon.es';

// v3.2 (EU/LwA)
const TOKEN_ENDPOINT = 'https://api.amazon.co.uk/auth/o2/token';
const API_BASE = 'https://creatorsapi.amazon/catalog/v1';

// ---------------------------------------------------------------------------
// Token cache
// ---------------------------------------------------------------------------

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'creatorsapi::default',
    }),
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(`Token error: ${data.error} — ${data.error_description}`);
  }

  cachedToken = data.access_token;
  // Refresh 60s before expiry
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

// ---------------------------------------------------------------------------
// API calls
// ---------------------------------------------------------------------------

async function apiCall(operation, body) {
  const token = await getAccessToken();

  const res = await fetch(`${API_BASE}/${operation}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Respuesta no JSON (status ${res.status}): ${text.slice(0, 200)}`);
  }

  if (data.type === 'AccessDeniedException' || data.reason === 'AssociateNotEligible') {
    console.error(`\n❌ ${data.message || 'Acceso denegado'}`);
    console.error('   Necesitas 10+ ventas cualificadas en los últimos 30 días.');
    console.error(`   Razón: ${data.reason || 'desconocida'}\n`);
    process.exit(1);
  }

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${JSON.stringify(data)}`);
  }

  if (data.Output?.__type?.includes('InternalFailure')) {
    throw new Error('API InternalFailure — revisa el formato de la petición');
  }

  return data;
}

/**
 * Get product details by ASINs (max 10 per request)
 */
export async function getItems(asins) {
  const data = await apiCall('getItems', {
    itemIds: asins,
    itemIdType: 'ASIN',
    marketplace: MARKETPLACE,
    partnerTag: PARTNER_TAG,
    resources: [
      'images.primary.large',
      'images.primary.medium',
      'itemInfo.title',
      'itemInfo.features',
      'itemInfo.byLineInfo',
      'offersV2.listings.price',
      'offersV2.listings.availability',
      'customerReviews.starRating',
      'customerReviews.count',
      'parentASIN',
    ],
  });

  return data.itemsResult?.items || [];
}

/**
 * Search products by keyword
 */
export async function searchItems(keywords, options = {}) {
  const data = await apiCall('searchItems', {
    keywords,
    marketplace: MARKETPLACE,
    partnerTag: PARTNER_TAG,
    itemCount: options.count || 10,
    resources: [
      'images.primary.large',
      'itemInfo.title',
      'offersV2.listings.price',
      'customerReviews.starRating',
      'customerReviews.count',
    ],
    ...(options.browseNodeId && { browseNodeId: options.browseNodeId }),
    ...(options.sortBy && { sortBy: options.sortBy }),
  });

  return data.searchResult?.items || [];
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function formatItem(item) {
  const title = item.itemInfo?.title?.displayValue || '(sin título)';
  const price = item.offersV2?.listings?.[0]?.price?.displayAmount || '(sin precio)';
  const image = item.images?.primary?.large?.url
    || item.images?.primary?.medium?.url
    || '(sin imagen)';
  const rating = item.customerReviews?.starRating?.value ?? '-';
  const reviewCount = item.customerReviews?.count?.value ?? '-';
  const url = item.detailPageURL || `https://www.amazon.es/dp/${item.asin}`;

  return [
    `  ASIN:      ${item.asin}`,
    `  Título:    ${title}`,
    `  Precio:    ${price}`,
    `  Imagen:    ${image}`,
    `  Rating:    ${rating}/5 (${reviewCount} reseñas)`,
    `  URL:       ${url}`,
  ].join('\n');
}

async function main() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('❌ Falta AMAZON_CLIENT_ID y/o AMAZON_CLIENT_SECRET en .env');
    console.error('   Añade estas líneas a .env:');
    console.error('   AMAZON_CLIENT_ID=amzn1.application-oa2-client.xxx');
    console.error('   AMAZON_CLIENT_SECRET=amzn1.oa2-cs.v1.xxx');
    process.exit(1);
  }

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Uso:');
    console.log('  node scripts/amazon-api.mjs B0D5CJ14HQ              # Un ASIN');
    console.log('  node scripts/amazon-api.mjs B0D5CJ14HQ B09B2SBHQK   # Varios ASINs');
    console.log('  node scripts/amazon-api.mjs --search "keywords"      # Buscar productos');
    process.exit(0);
  }

  if (args[0] === '--search') {
    const keywords = args.slice(1).join(' ');
    if (!keywords) {
      console.error('❌ Falta el término de búsqueda');
      process.exit(1);
    }
    console.log(`🔍 Buscando: "${keywords}" en amazon.es...\n`);
    const items = await searchItems(keywords);
    if (items.length === 0) {
      console.log('No se encontraron resultados.');
    } else {
      items.forEach((item, i) => {
        console.log(`[${i + 1}]`);
        console.log(formatItem(item));
        console.log();
      });
    }
  } else {
    const asins = args.filter(a => /^B[A-Z0-9]{9}$/.test(a));
    if (asins.length === 0) {
      console.error('❌ No se encontraron ASINs válidos en los argumentos');
      process.exit(1);
    }
    if (asins.length > 10) {
      console.error('❌ Máximo 10 ASINs por petición');
      process.exit(1);
    }
    console.log(`📦 Consultando ${asins.length} ASIN(s) en amazon.es...\n`);
    const items = await getItems(asins);
    items.forEach((item, i) => {
      console.log(`[${i + 1}]`);
      console.log(formatItem(item));
      console.log();
    });
    if (items.length < asins.length) {
      const found = new Set(items.map(i => i.asin));
      const missing = asins.filter(a => !found.has(a));
      console.log(`⚠️  ASINs no encontrados: ${missing.join(', ')}`);
    }
  }
}

main().catch(err => {
  console.error(`❌ Error: ${err.message}`);
  process.exit(1);
});
