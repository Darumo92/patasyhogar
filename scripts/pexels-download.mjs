#!/usr/bin/env node
/**
 * Descarga una imagen de Pexels por búsqueda.
 *
 * Uso:
 *   node scripts/pexels-download.mjs "dog spring flowers garden" alergia-primaveral-perros-gatos-sintomas-tratamiento
 *
 * Argumentos:
 *   1. Query de búsqueda en Pexels
 *   2. Nombre del archivo destino (sin extensión ni ruta)
 *      Se guarda en public/images/articulos/<nombre>.webp
 *
 * Opciones:
 *   --orientation=landscape|portrait|square  (default: landscape)
 *   --index=N  Elegir la foto N de los resultados (default: 0, la primera)
 *   --list     Solo mostrar los primeros resultados sin descargar
 */

import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Load .env
const envPath = resolve(ROOT, '.env');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = Object.fromEntries(
  envContent.split('\n').filter(l => l.includes('=')).map(l => {
    const [key, ...rest] = l.split('=');
    return [key.trim(), rest.join('=').trim()];
  })
);

const API_KEY = envVars.PEXELS_API_KEY;
if (!API_KEY) {
  console.error('Error: PEXELS_API_KEY not found in .env');
  process.exit(1);
}

// Parse args
const args = process.argv.slice(2);
const flags = {};
const positional = [];

for (const arg of args) {
  if (arg.startsWith('--')) {
    const [key, val] = arg.slice(2).split('=');
    flags[key] = val ?? true;
  } else {
    positional.push(arg);
  }
}

const query = positional[0];
const filename = positional[1];
const orientation = flags.orientation || 'landscape';
const index = parseInt(flags.index || '0', 10);
const listOnly = flags.list === true;

if (!query) {
  console.error('Uso: node scripts/pexels-download.mjs "query" nombre-archivo [--orientation=landscape] [--index=0] [--list]');
  process.exit(1);
}

if (!listOnly && !filename) {
  console.error('Error: Falta el nombre del archivo destino (segundo argumento)');
  process.exit(1);
}

// Search Pexels
const searchUrl = new URL('https://api.pexels.com/v1/search');
searchUrl.searchParams.set('query', query);
searchUrl.searchParams.set('orientation', orientation);
searchUrl.searchParams.set('per_page', '10');
searchUrl.searchParams.set('locale', 'es-ES');

console.log(`Buscando en Pexels: "${query}" (${orientation})...\n`);

const searchRes = await fetch(searchUrl.toString(), {
  headers: { Authorization: API_KEY }
});

if (!searchRes.ok) {
  console.error(`Error API Pexels: ${searchRes.status} ${searchRes.statusText}`);
  process.exit(1);
}

const data = await searchRes.json();

if (!data.photos || data.photos.length === 0) {
  console.error('No se encontraron fotos para esa búsqueda.');
  process.exit(1);
}

// List mode
if (listOnly) {
  console.log(`Resultados (${data.photos.length}):\n`);
  data.photos.forEach((photo, i) => {
    console.log(`  [${i}] ID: ${photo.id}`);
    console.log(`      Fotógrafo: ${photo.photographer}`);
    console.log(`      Tamaño: ${photo.width}x${photo.height}`);
    console.log(`      URL: ${photo.url}`);
    console.log(`      Preview: ${photo.src.medium}`);
    console.log('');
  });
  process.exit(0);
}

// Download
const photo = data.photos[index];
if (!photo) {
  console.error(`No existe el índice ${index}. Solo hay ${data.photos.length} resultados.`);
  process.exit(1);
}

console.log(`Descargando foto [${index}]:`);
console.log(`  ID: ${photo.id}`);
console.log(`  Fotógrafo: ${photo.photographer}`);
console.log(`  Tamaño: ${photo.width}x${photo.height}`);
console.log(`  URL: ${photo.url}`);

const imageUrl = photo.src.large2x || photo.src.large || photo.src.original;
const imageRes = await fetch(imageUrl);

if (!imageRes.ok) {
  console.error(`Error descargando imagen: ${imageRes.status}`);
  process.exit(1);
}

const buffer = Buffer.from(await imageRes.arrayBuffer());
const destDir = resolve(ROOT, 'public/images/articulos');
mkdirSync(destDir, { recursive: true });

// Convert to WebP
const destPath = resolve(destDir, `${filename}.webp`);
const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
writeFileSync(destPath, webpBuffer);

console.log(`\nGuardada en: public/images/articulos/${filename}.webp (${(webpBuffer.length / 1024).toFixed(0)} KB)`);
console.log(`Crédito: ${photo.photographer} — ${photo.url}`);
