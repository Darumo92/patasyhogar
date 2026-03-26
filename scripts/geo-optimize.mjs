#!/usr/bin/env node
/**
 * GEO Optimization Script
 * Adds prose verdicts to comparativas and direct answers to informativos.
 * Also converts first eligible H2 to question format.
 *
 * Usage: node scripts/geo-optimize.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(__dirname, '..', 'src', 'content', 'articulos');
const dryRun = process.argv.includes('--dry-run');

// ============================================================
// COMPARATIVAS: Extract TopPick nombre and add prose verdict
// ============================================================

function extractTopPickName(content) {
  // Match nombre="..." or nombre='...' in TopPick component
  const match = content.match(/<TopPick[\s\S]*?nombre=["']([^"']+)["']/);
  return match ? match[1] : null;
}

function extractTopPickPrice(content) {
  const match = content.match(/<TopPick[\s\S]*?precio=["']([^"']+)["']/);
  return match ? match[1] : null;
}

function extractTitle(content) {
  const match = content.match(/^titulo:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1].replace(/^["']|["']$/g, '') : null;
}

function extractAnimal(content) {
  const match = content.match(/^animal:\s*(\w+)/m);
  return match ? match[1] : null;
}

function extractTipo(content) {
  const match = content.match(/^tipo:\s*(\w+)/m);
  return match ? match[1] : 'comparativa';
}

function extractDescription(content) {
  const match = content.match(/^descripcion:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1].replace(/^["']|["']$/g, '') : null;
}

function countProducts(content) {
  // Count products in ComparisonTable
  const tableMatch = content.match(/<ComparisonTable[\s\S]*?productos=\{(\[[\s\S]*?\])\}/);
  if (!tableMatch) return 0;
  const nombres = tableMatch[1].match(/nombre:/g);
  return nombres ? nombres.length : 0;
}

function hasProseVerdict(content) {
  // Check if there's already a prose line with bold recommendation before TopPick
  const topPickIndex = content.indexOf('<TopPick');
  if (topPickIndex === -1) return false;
  const beforeTopPick = content.substring(0, topPickIndex);
  // Check for a bold recommendation pattern
  return /\*\*el mejor|\*\*la mejor|\*\*los mejores|\*\*las mejores|\*\*nuestra recomendación|\*\*nuestro favorito/i.test(beforeTopPick);
}

function getProductCategory(titulo) {
  // Extract what type of product from the title
  const t = titulo.toLowerCase();
  // Remove common prefixes
  return t
    .replace(/^mejor(es)?\s+/i, '')
    .replace(/\s+\d{4}$/, '')
    .replace(/\s+para\s+(perros?|gatos?|mascotas?).*$/, '')
    .replace(/\s+de\s+(perros?|gatos?|mascotas?).*$/, '')
    .trim();
}

function generateVerdict(titulo, topPickName, numProducts, animal) {
  const animalText = animal === 'perro' ? 'perros' : animal === 'gato' ? 'gatos' : 'mascotas';
  const n = numProducts || 'varios';

  return `Después de analizar ${n} modelos, **${topPickName}** es nuestra recomendación principal. A continuación te explicamos por qué y repasamos las mejores alternativas.\n\n`;
}

// ============================================================
// INFORMATIVOS: Check if intro has direct answer
// ============================================================

function getIntroAfterFrontmatter(content) {
  // Find end of frontmatter
  const parts = content.split('---');
  if (parts.length < 3) return null;
  const afterFrontmatter = parts.slice(2).join('---').trim();
  // Skip import lines
  const lines = afterFrontmatter.split('\n');
  let startIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ') || lines[i].trim() === '') {
      startIdx = i + 1;
    } else {
      break;
    }
  }
  return lines.slice(startIdx).join('\n');
}

function hasDirectAnswer(introText) {
  if (!introText) return true; // can't check, skip
  const firstParagraph = introText.split('\n\n')[0];
  // Check if it contains a bold definitive statement or direct answer pattern
  const directPatterns = [
    /\*\*[^*]+\*\*/,  // Bold statement
    /la respuesta (corta|rápida|es)/i,
    /en resumen/i,
    /sí,?\s/i,  // Direct yes answer
    /no,?\s/i,  // Direct no answer
    /los principales?|las principales?/i,
    /se debe a|porque|la causa principal/i,
  ];
  return directPatterns.some(p => p.test(firstParagraph));
}

// ============================================================
// H2 QUESTION FORMAT
// ============================================================

// Map of common H2 patterns to question format equivalents
const h2Conversions = {
  // Comparativas
  'Guía de compra': '¿Cómo elegir {product}?',
  'Criterios de compra': '¿Qué tener en cuenta al elegir {product}?',
  'Cómo elegir': '¿Cómo elegir {product}?',
  'Qué tener en cuenta': '¿Qué tener en cuenta al comprar {product}?',
  // Informativos - common patterns
  'Causas principales': '¿Cuáles son las causas principales?',
  'Causas más comunes': '¿Cuáles son las causas más comunes?',
  'Síntomas': '¿Cuáles son los síntomas?',
  'Tratamiento': '¿Cuál es el tratamiento?',
  'Prevención': '¿Cómo prevenirlo?',
  'Cuándo acudir al veterinario': '¿Cuándo acudir al veterinario?',
  'Cuándo ir al veterinario': '¿Cuándo ir al veterinario?',
  'Cuándo preocuparse': '¿Cuándo preocuparse?',
  'Errores comunes': '¿Cuáles son los errores más comunes?',
  'Errores frecuentes': '¿Cuáles son los errores más frecuentes?',
  'Conclusión': 'Nuestra opinión final',
  'Nuestra recomendación': '¿Cuál recomendamos?',
  'Recomendación final': '¿Cuál recomendamos?',
};

function convertFirstEligibleH2(content) {
  let converted = false;
  let result = content;

  // Find all H2s
  const h2Regex = /^## (.+)$/gm;
  let match;
  let conversionsCount = 0;

  while ((match = h2Regex.exec(content)) !== null && conversionsCount < 2) {
    const h2Text = match[1].trim();

    // Skip H2s that are already questions
    if (h2Text.startsWith('¿') || h2Text.endsWith('?')) continue;

    // Skip section headers that shouldn't be converted
    if (['Preguntas frecuentes', 'FAQs', 'Análisis detallado', 'Tabla comparativa'].some(s => h2Text.includes(s))) continue;

    // Check exact matches first
    for (const [pattern, replacement] of Object.entries(h2Conversions)) {
      if (h2Text.startsWith(pattern)) {
        result = result.replace(`## ${h2Text}`, `## ${replacement}`);
        conversionsCount++;
        converted = true;
        break;
      }
    }

    // If not matched, try to convert "Tipos de X" -> "¿Qué tipos de X hay?"
    if (!converted) {
      const tiposMatch = h2Text.match(/^Tipos de (.+)/i);
      if (tiposMatch) {
        result = result.replace(`## ${h2Text}`, `## ¿Qué tipos de ${tiposMatch[1]} hay?`);
        conversionsCount++;
        converted = true;
      }

      const beneficiosMatch = h2Text.match(/^Beneficios de (.+)/i);
      if (beneficiosMatch) {
        result = result.replace(`## ${h2Text}`, `## ¿Cuáles son los beneficios de ${beneficiosMatch[1]}?`);
        conversionsCount++;
        converted = true;
      }

      const ventajasMatch = h2Text.match(/^Ventajas de (.+)/i);
      if (ventajasMatch) {
        result = result.replace(`## ${h2Text}`, `## ¿Cuáles son las ventajas de ${ventajasMatch[1]}?`);
        conversionsCount++;
        converted = true;
      }
    }
  }

  return { content: result, converted };
}

// ============================================================
// MAIN
// ============================================================

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
let comparativasProcessed = 0;
let comparativasModified = 0;
let informativosProcessed = 0;
let informativosModified = 0;
let h2sConverted = 0;

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  const tipo = extractTipo(content);
  const titulo = extractTitle(content);

  if (tipo !== 'informativo' && content.includes('<TopPick')) {
    // COMPARATIVA: Add prose verdict
    comparativasProcessed++;

    if (!hasProseVerdict(content)) {
      const topPickName = extractTopPickName(content);
      const numProducts = countProducts(content);

      if (topPickName) {
        const verdict = generateVerdict(titulo, topPickName, numProducts, extractAnimal(content));

        // Insert verdict right before <TopPick
        content = content.replace(
          /^(<TopPick)/m,
          verdict + '$1'
        );
        modified = true;
        comparativasModified++;

        if (dryRun) {
          console.log(`[COMPARATIVA] ${file}`);
          console.log(`  TopPick: ${topPickName}`);
          console.log(`  Products: ${numProducts}`);
          console.log(`  Verdict: ${verdict.trim()}`);
          console.log();
        }
      }
    } else {
      if (dryRun) {
        console.log(`[SKIP] ${file} — already has prose verdict`);
      }
    }
  }

  // H2 conversions for all articles
  const h2Result = convertFirstEligibleH2(content);
  if (h2Result.converted) {
    content = h2Result.content;
    modified = true;
    h2sConverted++;
  }

  if (modified && !dryRun) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

console.log('\n📊 GEO Optimization Summary:');
console.log(`  Comparativas processed: ${comparativasProcessed}`);
console.log(`  Comparativas modified (verdict added): ${comparativasModified}`);
console.log(`  H2s converted to question format: ${h2sConverted}`);
if (dryRun) {
  console.log('\n⚠️  Dry run — no files were modified. Run without --dry-run to apply changes.');
}
