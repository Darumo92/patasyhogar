#!/usr/bin/env node
/**
 * Descarga imágenes de Pexels para TODOS los artículos.
 * Las guarda en public/images/articulos/<slug>.jpg
 *
 * Uso:
 *   node scripts/pexels-batch-download.mjs          # procesa todos
 *   node scripts/pexels-batch-download.mjs --dry-run # solo muestra lo que haría
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ARTICLES_DIR = resolve(ROOT, 'src/content/articulos');
const IMAGES_DIR = resolve(ROOT, 'public/images/articulos');

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
if (!API_KEY) { console.error('Error: PEXELS_API_KEY not found in .env'); process.exit(1); }

const dryRun = process.argv.includes('--dry-run');

// Curated search queries per article slug for optimal Pexels results
const QUERIES = {
  // Alimentación
  'mejor-pienso-cachorro-gato': 'kitten eating food bowl',
  'mejor-pienso-cachorro-raza-grande': 'large breed puppy eating',
  'mejor-pienso-gato-esterilizado': 'cat eating food bowl indoor',
  'mejor-pienso-gato-indoor': 'cat relaxing indoors home',
  'mejor-pienso-gato-pelo-largo': 'persian long hair cat portrait',
  'mejor-pienso-gato-senior': 'old senior cat resting',
  'mejor-pienso-hipoalergenico-perro': 'dog scratching itchy skin',
  'mejor-pienso-perro-adulto-raza-mediana': 'medium dog eating food',
  'mejor-pienso-perro-diabetico': 'dog veterinary checkup',
  'mejor-pienso-perro-esterilizado': 'dog eating kibble bowl',
  'mejor-pienso-perro-raza-grande': 'large dog eating food bowl',
  'mejor-pienso-perro-raza-pequena': 'small dog eating food bowl',
  'mejor-pienso-perro-senior': 'old senior dog resting',
  'mejor-comida-humeda-gatos': 'cat eating wet food',
  'mejor-comida-humeda-perros': 'dog eating wet food bowl',
  'mejores-snacks-naturales-perros': 'dog treat reward training',
  'snacks-naturales-gatos': 'cat receiving treat hand',
  'mejor-comedero-gatos-guia': 'cat eating from bowl',
  'mejor-comedero-perros-guia': 'dog eating from bowl',
  'mejor-comedero-antihormigas-mascotas': 'pet food bowl clean floor',
  'mejor-bebedero-perros-guia': 'dog drinking water bowl',
  'comparativa-fuentes-agua-gatos': 'cat drinking water fountain',
  'mejor-fuente-agua-gatos-silenciosa': 'cat drinking water',
  'diferencia-pienso-grain-free-normal': 'dog food kibble close up',
  'pienso-gato-problemas-urinarios': 'cat at veterinary clinic',

  // Higiene
  'mejor-champu-gato': 'cat bath grooming',
  'champu-perros-piel-sensible': 'dog bath shampoo grooming',
  'mejor-cepillo-gatos': 'cat being brushed grooming',
  'mejor-cepillo-perro': 'dog being brushed grooming',
  'mejor-cepillo-dientes-perros': 'dog teeth smile close up',
  'mejor-cortapelos-perros': 'dog grooming haircut salon',
  'mejor-cortaunas-perros': 'dog paw nails close up',
  'mejor-secador-perros': 'dog after bath wet fur',
  'mejor-toallitas-perros': 'dog paws being cleaned',
  'mejor-antiparasitario-gatos-guia': 'cat outdoor garden flea',
  'mejor-antiparasitario-perros-guia': 'dog running field grass',
  'mejor-collar-antiparasitario-perro': 'dog wearing collar outdoors',
  'mejor-arenero-arena-gatos': 'cat litter box clean',
  'mejor-limpiador-enzimatico-mascotas': 'puppy on clean floor home',
  'alergia-primaveral-perros-gatos-sintomas-tratamiento': 'dog spring flowers meadow',

  // Paseo
  'mejor-arnes-perro': 'dog wearing harness walk',
  'mejor-arnes-antitirones-perro': 'dog pulling leash walk',
  'mejor-arnes-gato-pasear': 'cat wearing harness outdoors',
  'mejor-correa-perro': 'dog walk leash park',
  'correa-extensible-perros': 'dog retractable leash park',
  'mejor-bozal-perro': 'dog muzzle portrait calm',
  'mejor-transportin-gatos-guia': 'cat in carrier travel',
  'mejor-transportin-perros-guia': 'dog in travel carrier crate',
  'mejor-gps-perro': 'dog outdoors adventure hiking',
  'collar-gps-gato': 'cat outdoors exploring garden',
  'collar-antiladridos-perros': 'dog barking outdoors',
  'mejor-collar-luminoso-perro': 'dog walking night dark',
  'mejor-abrigo-perro-invierno': 'dog wearing coat winter snow',
  'mejor-chubasquero-perro': 'dog rain wet outdoors',
  'mejor-chaleco-salvavidas-perro': 'dog swimming water lake',
  'mejor-protector-maletero-perros': 'dog in car trunk boot',
  'asiento-coche-perro': 'dog sitting car seat',
  'mejor-protector-patas-perro': 'dog paw pads close up',
  'mejor-dispensador-bolsas-caca-perro': 'dog walk park owner',
  'mejores-bolsas-caca-perro-biodegradables': 'dog walking park nature',
  'mejor-piscina-perros': 'dog playing water pool summer',
  'alfombrilla-refrigerante-perros': 'dog hot summer panting',

  // Juguetes
  'mejor-juguete-cachorro': 'puppy playing toy cute',
  'mejor-juguete-gatos-guia': 'cat playing toy feather',
  'mejor-juguete-mental-perros-guia': 'dog puzzle toy smart',
  'mejor-juguete-resistente-perros-guia': 'dog chewing tough toy',
  'mejor-rascador-gatos-guia': 'cat scratching post playing',
  'mejor-circuito-agilidad-perros': 'dog agility course training',
  'alfombras-olfato-perros': 'dog sniffing nose close up',
  'mejor-difusor-feromonas-gatos': 'calm relaxed cat sleeping',
  'mejor-repelente-gatos-muebles': 'cat on sofa furniture',
  'arbol-rascador-pequeno-pisos': 'cat climbing cat tree tower',

  // Hogar
  'mejor-cama-perro-guia': 'dog sleeping cozy bed',
  'mejor-cama-gato-guia': 'cat sleeping cozy bed',
  'mejor-manta-perros': 'dog cozy blanket sofa',
  'protector-sofa-mascotas': 'dog cat on sofa couch',
  'mejor-gatera-puerta-gato': 'cat door flap home',
  'mejor-puerta-seguridad-perros': 'dog behind baby gate home',
  'mejor-escalera-rampa-perros': 'small dog couch stairs',
  'jaula-perro-casa-coche': 'dog in crate kennel home',
  'mejor-aspirador-pelo-mascotas': 'pet hair on carpet vacuum',
  'cepillos-quitar-pelo-perro-sofa': 'dog hair on sofa couch',
  'mejores-empapadores-perros': 'puppy training pad indoor',

  // Informativos - Perros
  'alimentos-prohibidos-perros': 'dog looking at food table',
  'cachorro-primeras-semanas-casa': 'cute puppy first day home',
  'como-eliminar-pulgas-perro-casa': 'dog scratching flea itchy',
  'como-limpiar-dientes-perro': 'dog mouth teeth clean',
  'como-limpiar-oidos-perro': 'dog ears close up portrait',
  'como-socializar-cachorro': 'puppies playing together park',
  'cuantas-veces-dia-debe-comer-perro': 'dog waiting food bowl hungry',
  'cuanto-ejercicio-necesita-perro': 'dog running exercise outdoors',
  'perro-miedo-petardos-fuegos-artificiales': 'scared dog hiding afraid',
  'perro-no-quiere-comer-causas': 'sad dog next to food bowl',
  'perro-sobrepeso-dieta-ejercicio': 'overweight chubby dog',
  'por-que-perro-ladra-noche': 'dog barking night dark',
  'por-que-perros-comen-hierba': 'dog eating grass field',
  'procesionaria-pino-perros-peligros-primeros-auxilios': 'dog sniffing pine tree forest',
  'razas-perro-piso-pequeno': 'small dog apartment living room',

  // Informativos - Gatos
  'alimentos-toxicos-gatos': 'cat curious kitchen food',
  'como-adiestrar-gato-tecnicas': 'cat training clicker treat',
  'como-banar-gato': 'cat bath water wet',
  'como-cortar-unas-gato': 'cat paw claws close up',
  'como-presentar-perro-gato': 'dog and cat together friends',
  'como-saber-edad-gato': 'cat face close up portrait',
  'cuanto-debe-comer-gato-adulto': 'cat eating food portion',
  'enriquecimiento-ambiental-gato-interior': 'indoor cat playing climbing',
  'gato-maulla-mucho-noche-causas': 'cat meowing open mouth',
  'gato-vomita-causas-soluciones': 'cat sick veterinary',
  'por-que-gatos-amasan': 'cat kneading paws blanket',
  'senales-estres-gatos': 'stressed cat hiding scared',

  // Informativos - Ambos
  'residencias-mascotas-verano': 'dog cat pet boarding kennel',
};

function getSearchQuery(slug, titulo, animal) {
  if (QUERIES[slug]) return QUERIES[slug];

  // Fallback: simple English translation attempt
  console.warn(`  ⚠ No curated query for "${slug}", using fallback`);
  const animalEn = animal === 'perro' ? 'dog' : animal === 'gato' ? 'cat' : 'pet';
  return `${animalEn} cute portrait`;
}

// Extract frontmatter field
function getField(content, field) {
  const match = content.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  if (!match) return '';
  return match[1].replace(/^["']|["']$/g, '').trim();
}

async function searchPexels(query) {
  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('per_page', '3');

  const res = await fetch(url.toString(), { headers: { Authorization: API_KEY } });
  if (!res.ok) {
    if (res.status === 429) return { rateLimited: true };
    return { error: `${res.status} ${res.statusText}` };
  }
  return res.json();
}

async function downloadImage(photo, destPath) {
  const imageUrl = photo.src.large2x || photo.src.large || photo.src.original;
  const res = await fetch(imageUrl);
  if (!res.ok) return false;
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
  return buffer.length;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Main
mkdirSync(IMAGES_DIR, { recursive: true });

const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx')).sort();
const results = [];
let downloaded = 0;
let failed = 0;
let skipped = 0;

console.log(`\nProcesando ${files.length} artículos...\n`);

for (let i = 0; i < files.length; i++) {
  const slug = files[i].replace('.mdx', '');
  const content = readFileSync(resolve(ARTICLES_DIR, files[i]), 'utf-8');

  const titulo = getField(content, 'titulo');
  const animal = getField(content, 'animal');

  const query = getSearchQuery(slug, titulo, animal);

  if (dryRun) {
    console.log(`[${i + 1}/${files.length}] ${slug}`);
    console.log(`  Título: ${titulo}`);
    console.log(`  Query: "${query}"`);
    console.log('');
    continue;
  }

  process.stdout.write(`[${i + 1}/${files.length}] ${slug} → "${query}" ... `);

  // Rate limit: Pexels allows 200 req/hour ≈ 1 every 18s, but bursts are OK
  // We'll do a small delay between requests
  if (i > 0) await sleep(500);

  let data = await searchPexels(query);

  // Handle rate limiting with backoff
  if (data.rateLimited) {
    console.log('RATE LIMITED, waiting 60s...');
    await sleep(60000);
    data = await searchPexels(query);
  }

  if (data.error) {
    console.log(`ERROR: ${data.error}`);
    failed++;
    results.push({ slug, titulo, query, status: 'error', error: data.error });
    continue;
  }

  if (!data.photos || data.photos.length === 0) {
    console.log('NO RESULTS');
    failed++;
    results.push({ slug, titulo, query, status: 'no_results' });
    continue;
  }

  const photo = data.photos[0];
  const destPath = resolve(IMAGES_DIR, `${slug}.jpg`);
  const bytes = await downloadImage(photo, destPath);

  if (!bytes) {
    console.log('DOWNLOAD FAILED');
    failed++;
    results.push({ slug, titulo, query, status: 'download_failed' });
    continue;
  }

  downloaded++;
  console.log(`OK (${(bytes / 1024).toFixed(0)} KB) — ${photo.photographer}`);
  results.push({
    slug, titulo, query,
    status: 'ok',
    photoId: photo.id,
    photographer: photo.photographer,
    photoUrl: photo.url,
    size: bytes,
  });
}

if (dryRun) {
  console.log('\n--- DRY RUN completado. No se descargó nada. ---\n');
  process.exit(0);
}

// Write report
const reportLines = [
  '# Pexels Image Download Report',
  `Date: ${new Date().toISOString().split('T')[0]}`,
  `Total: ${files.length} | Downloaded: ${downloaded} | Failed: ${failed}`,
  '',
  '## Results',
  '',
];

for (const r of results) {
  if (r.status === 'ok') {
    reportLines.push(`- ✅ **${r.slug}** — "${r.query}" → ${r.photographer} ([photo](${r.photoUrl}))`);
  } else {
    reportLines.push(`- ❌ **${r.slug}** — "${r.query}" → ${r.status}${r.error ? `: ${r.error}` : ''}`);
  }
}

const reportPath = resolve(ROOT, 'pexels-download-report.md');
writeFileSync(reportPath, reportLines.join('\n'));
console.log(`\n--- Resumen ---`);
console.log(`Descargados: ${downloaded}`);
console.log(`Fallidos: ${failed}`);
console.log(`Reporte: pexels-download-report.md\n`);
