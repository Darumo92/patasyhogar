import sharp from 'sharp';
import { readFileSync } from 'fs';

const W = 1000, H = 1500;
const heroPath = 'public/images/articulos/mejor-cama-perro-guia.webp';
const out = '/tmp/pin-mejor-cama-perro.png';

const title = 'Mejores camas\npara perros 2026';
const subtitle = 'Comparativa honesta';
const domain = 'patasyhogar.com';

const hero = await sharp(heroPath)
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .toBuffer();

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="45%" stop-color="#000000" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0a1f14" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="40" y="60" width="180" height="56" rx="28" fill="#3d6b4a"/>
  <text x="130" y="97" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">GUÍA 2026</text>

  <text x="60" y="1120" font-family="Georgia, serif" font-size="92" font-weight="700" fill="#ffffff">Mejores camas</text>
  <text x="60" y="1220" font-family="Georgia, serif" font-size="92" font-weight="700" fill="#ffffff">para perros 2026</text>

  <rect x="60" y="1260" width="80" height="6" fill="#f4b860"/>
  <text x="60" y="1320" font-family="Arial, sans-serif" font-size="38" fill="#f4f1e8">Comparativa honesta · Ortopédicas,</text>
  <text x="60" y="1368" font-family="Arial, sans-serif" font-size="38" fill="#f4f1e8">viscoelásticas y refrigerantes</text>

  <text x="60" y="1450" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#f4b860">patasyhogar.com</text>
</svg>`;

await sharp(hero)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .png()
  .toFile(out);

console.log('Pin generado:', out);
