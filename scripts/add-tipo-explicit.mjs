#!/usr/bin/env node
// Añade `tipo: comparativa` explícito a artículos sin campo `tipo`.
// Modo goteo para evitar señal de cambio masivo en Google: procesa 5 por invocación.
//
// Uso:
//   node scripts/add-tipo-explicit.mjs            # procesa próximos 5
//   node scripts/add-tipo-explicit.mjs --count=3  # procesa próximos 3
//   node scripts/add-tipo-explicit.mjs --dry-run  # muestra sin escribir
//   node scripts/add-tipo-explicit.mjs --list     # lista pendientes
//
// NO modifica actualizadoEn ni fecha. Sólo inserta línea `tipo: comparativa`
// tras la línea `categoria:`. Commit manual tras cada ejecución.

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ARTICLES_DIR = 'src/content/articulos';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const listOnly = args.includes('--list');
const countArg = args.find(a => a.startsWith('--count='));
const BATCH = countArg ? parseInt(countArg.split('=')[1], 10) : 5;

const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'));
const pending = [];

for (const file of files) {
  const path = join(ARTICLES_DIR, file);
  const raw = readFileSync(path, 'utf-8');
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!fmMatch) continue;
  const fm = fmMatch[1];
  if (/^tipo:\s*\w+/m.test(fm)) continue;
  if (!/^categoria:\s*\w+/m.test(fm)) continue;
  pending.push({ file, path, raw, fm });
}

console.log(`Artículos sin tipo explícito: ${pending.length}`);

if (listOnly) {
  for (const p of pending) console.log(`  - ${p.file}`);
  process.exit(0);
}

const batch = pending.slice(0, BATCH);
if (batch.length === 0) {
  console.log('Nada pendiente.');
  process.exit(0);
}

console.log(`\nProcesando lote de ${batch.length}:`);
for (const { file, path, raw } of batch) {
  const updated = raw.replace(
    /(^categoria:\s*\w+\s*\n)/m,
    `$1tipo: comparativa\n`
  );
  if (updated === raw) {
    console.log(`  [skip] ${file} — no se pudo insertar`);
    continue;
  }
  if (dryRun) {
    console.log(`  [dry] ${file}`);
  } else {
    writeFileSync(path, updated);
    console.log(`  [ok]  ${file}`);
  }
}

console.log(`\nPendientes restantes tras este lote: ${pending.length - batch.length}`);
console.log(`\nSugerencia: commit y push de este lote. Esperar mín. 24h antes del próximo.`);
