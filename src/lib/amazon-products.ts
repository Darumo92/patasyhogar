import amazonProducts from '../data/amazon-products.json';

export interface AmazonProductCacheEntry {
  asin: string;
  title?: string;
  price?: string;
  image?: string;
  url?: string;
  availability?: string;
  availabilityType?: string;
  updatedAt?: string;
}

const products = amazonProducts as Record<string, AmazonProductCacheEntry>;

export function asinFromAmazonUrl(url?: string | null): string | null {
  if (!url) return null;
  return url.match(/\/dp\/([A-Z0-9]{10})/)?.[1] || null;
}

export function getAmazonProduct(urlOrAsin?: string | null): AmazonProductCacheEntry | null {
  const asin = urlOrAsin?.match(/^[A-Z0-9]{10}$/) ? urlOrAsin : asinFromAmazonUrl(urlOrAsin);
  return asin ? products[asin] || null : null;
}

export function cachedAmazonPrice(urlOrAsin?: string | null): string | undefined {
  return getAmazonProduct(urlOrAsin)?.price;
}

export function cachedAmazonImage(urlOrAsin?: string | null): string | undefined {
  return getAmazonProduct(urlOrAsin)?.image;
}

export function cachedAmazonAvailability(urlOrAsin?: string | null): AmazonProductCacheEntry | null {
  const product = getAmazonProduct(urlOrAsin);
  return product?.availability || product?.availabilityType || product?.updatedAt ? product : null;
}

export function isAmazonAvailable(entry?: AmazonProductCacheEntry | null): boolean {
  if (!entry?.availabilityType) return true;
  return entry.availabilityType === 'IN_STOCK';
}

export function formatAmazonCheckedDate(entry?: AmazonProductCacheEntry | null): string | null {
  if (!entry?.updatedAt) return null;
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(entry.updatedAt));
}
