import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const commercialBadge = 'Precios y disponibilidad revisados';
const commercialNewsletter = 'Actualizamos precios y productos regularmente. Suscríbete y te avisaremos de los cambios en esta guía y otras similares.';
const informativeBadge = 'Guía informativa';
const informativeNewsletter = 'Suscríbete y te avisaremos cuando actualicemos esta guía y otras guías de cuidados.';

// Match only the known layout's rendered elements, never CSS or script contents.
function copyFor(route) {
  const html = readFileSync(join(process.cwd(), 'dist', route, 'index.html'), 'utf8')
    .replace(/<!--[^]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[^]*?<\/\1>/gi, '');
  const trustBars = [...html.matchAll(/<aside\b[^>]*\bclass="trust-bar"[^>]*>([^]*?)<\/aside>/g)];
  assert.equal(trustBars.length, 1, `${route}: expected one rendered trust bar`);
  const badges = [...trustBars[0][1].matchAll(/<div\b[^>]*\bclass="trust-item"[^>]*>([^]*?)<\/div>/g)]
    .map(match => plainText(match[1].replace(/<svg\b[^>]*>[^]*?<\/svg>/g, '')));
  assert.equal(badges.length, 3, `${route}: expected three trust badges`);
  const newsletters = [...html.matchAll(/<p\b[^>]*\bclass="article-newsletter-desc"[^>]*>([^]*?)<\/p>/g)];
  assert.equal(newsletters.length, 1, `${route}: expected one rendered newsletter description`);
  return { badges, newsletter: plainText(newsletters[0][1]) };
}

function plainText(text) {
  // These two copy sites contain plain text (apart from the badge's SVG).
  // Fail on unexpected markup/entities rather than silently misparse HTML.
  assert.doesNotMatch(text, /[<>]|&(?:#\w+|\w+);/, 'Unexpected markup or entity in copy site');
  return text.replace(/\s+/g, ' ').trim();
}

const cases = [
  ['paseo/collares-adiestramiento-perros', false],
  ['cuidados/envenenamiento-perros', true],
  ['cuidados/gato-agresivo-causas-soluciones', true],
];
let failures = 0;
for (const [route, informative] of cases) {
  try {
    const { badges, newsletter } = copyFor(route);
    const expectedBadge = informative ? informativeBadge : commercialBadge;
    const expectedNewsletter = informative ? informativeNewsletter : commercialNewsletter;
    // Check both sites independently so RED exposes both incorrect messages.
    for (const [site, actual, expected] of [
      ['trust badge', badges[1], expectedBadge],
      ['newsletter', newsletter, expectedNewsletter],
    ]) {
      try {
        assert.equal(actual, expected, `${route}: ${site}`);
        if (informative) assert.doesNotMatch(actual, /precios|productos|disponibilidad/i);
        console.log(`PASS ${route}: ${site} = ${actual}`);
      } catch (error) {
        failures++;
        console.error(`FAIL ${error.message}`);
      }
    }
    if (informative) assert.ok(!badges.includes(commercialBadge), `${route}: commercial badge remains`);
  } catch (error) {
    failures++;
    console.error(`FAIL ${route}: ${error.message}`);
  }
}
console.log(`Article copy regression: ${failures === 0 ? 'PASS' : 'FAIL'} (${failures} failures).`);
process.exitCode = failures === 0 ? 0 : 1;
