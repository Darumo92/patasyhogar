#!/usr/bin/env node
/**
 * Fixes {product} placeholder left by geo-optimize.mjs in H2 headings.
 * Extracts product category from article title and replaces the placeholder.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(__dirname, '..', 'src', 'content', 'articulos');

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
let fixed = 0;

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (!content.includes('{product}')) continue;

  // Extract title
  const titleMatch = content.match(/^titulo:\s*["']?(.+?)["']?\s*$/m);
  if (!titleMatch) continue;
  const title = titleMatch[1].replace(/^["']|["']$/g, '');

  // Build product name from title
  let productName = title
    .replace(/^Mejor(es)?\s+/i, '')
    .replace(/\s+\d{4}.*$/, '')  // Remove year
    .replace(/:\s+.+$/, '')  // Remove subtitle
    .replace(/\s+guía.*$/i, '')
    .replace(/\s+comparativa.*$/i, '')
    .replace(/\s+definitiv[ao].*$/i, '')
    .replace(/\s+completa?.*$/i, '')
    .trim();

  // If the title doesn't start with "Mejor", try other patterns
  if (productName === title) {
    // For titles like "Cepillos para quitar pelo..." or "Juguetes de estimulación..."
    productName = title
      .replace(/\s+\d{4}.*$/, '')
      .replace(/:\s+.+$/, '')
      .replace(/\s+guía.*$/i, '')
      .replace(/\s+comparativa.*$/i, '')
      .trim();
  }

  // Make it lowercase for the question context
  const productLower = productName.toLowerCase();

  // Replace placeholders
  content = content.replace(/## ¿Cómo elegir \{product\}\?/g, `## ¿Cómo elegir ${productLower}?`);
  content = content.replace(/## ¿Qué tener en cuenta al comprar \{product\}\?/g, `## ¿Qué tener en cuenta al comprar ${productLower}?`);
  content = content.replace(/## ¿Qué tipos de \{product\} hay\?/g, `## ¿Qué tipos de ${productLower} hay?`);

  // Catch any remaining {product}
  if (content.includes('{product}')) {
    content = content.replace(/\{product\}/g, productLower);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  fixed++;
  console.log(`✅ ${file} → "${productLower}"`);
}

console.log(`\nFixed ${fixed} files.`);
