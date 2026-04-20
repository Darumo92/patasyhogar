import sharp from 'sharp';

const W = 1000, H = 1500;

const pins = [
  {
    slug: 'mejor-arnes-perro',
    hero: 'mejor-arnes-perro.webp',
    eyebrow: 'GUÍA 2026',
    title1: 'Mejor arnés',
    title2: 'para perro',
    sub1: 'Antitirones, acolchados y',
    sub2: 'resistentes · Comparativa honesta',
  },
  {
    slug: 'mejor-pienso-perro',
    hero: 'mejor-pienso-perro-adulto-raza-mediana.webp',
    eyebrow: 'NUTRICIÓN',
    title1: 'Mejor pienso',
    title2: 'para perro adulto',
    sub1: 'Por tamaño, edad y necesidades',
    sub2: 'Analizamos ingredientes reales',
  },
  {
    slug: 'mejor-fuente-agua-gatos-silenciosa',
    hero: 'mejor-fuente-agua-gatos-silenciosa.webp',
    eyebrow: 'GATOS',
    title1: 'Mejor fuente',
    title2: 'de agua para gatos',
    sub1: 'Silenciosa, filtrada e higiénica',
    sub2: 'Los modelos que sí duran',
  },
  {
    slug: 'mejor-arena-aglomerante-gatos',
    hero: 'mejor-arena-aglomerante-gatos.webp',
    eyebrow: 'HIGIENE',
    title1: 'Mejor arena',
    title2: 'aglomerante gato',
    sub1: 'Sin polvo, sin olores y',
    sub2: 'económica · Comparativa real',
  },
  {
    slug: 'mejor-rascador-gatos-guia',
    hero: 'mejor-rascador-gatos-guia.webp',
    eyebrow: 'GATOS',
    title1: 'Mejor rascador',
    title2: 'para gato',
    sub1: 'Árbol, pared o suelo · Los',
    sub2: 'modelos que no se caen',
  },
  {
    slug: 'mejor-antiparasitario-perros-guia',
    hero: 'mejor-antiparasitario-perros-guia.webp',
    eyebrow: 'SALUD',
    title1: 'Mejor antiparasitario',
    title2: 'para perros',
    sub1: 'Pipetas, collares, pastillas',
    sub2: 'Comparativa por edad y peso',
  },
  {
    slug: 'mejor-comedero-automatico-wifi-gatos',
    hero: 'mejor-comedero-automatico-wifi-gatos.webp',
    eyebrow: 'TECNOLOGÍA',
    title1: 'Mejor comedero',
    title2: 'automático gato',
    sub1: 'WiFi, cámara, raciones exactas',
    sub2: 'Lo que funciona de verdad',
  },
  {
    slug: 'mejor-transportin-gatos-guia',
    hero: 'mejor-transportin-gatos-guia.webp',
    eyebrow: 'VIAJE',
    title1: 'Mejor transportín',
    title2: 'para gato',
    sub1: 'Seguro, homologado y cómodo',
    sub2: 'Coche, avión y veterinario',
  },
  {
    slug: 'mejor-champu-perros-piel-sensible',
    hero: 'champu-perros-piel-sensible.webp',
    eyebrow: 'HIGIENE',
    title1: 'Mejor champú',
    title2: 'piel sensible perro',
    sub1: 'Sin sulfatos ni parabenos',
    sub2: 'Para picores y alergias',
  },
];

for (const p of pins) {
  const heroBuf = await sharp(`public/images/articulos/${p.hero}`)
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
    <rect x="40" y="60" width="220" height="56" rx="28" fill="#3d6b4a"/>
    <text x="150" y="97" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">${p.eyebrow}</text>

    <text x="60" y="1120" font-family="Georgia, serif" font-size="82" font-weight="700" fill="#ffffff">${p.title1}</text>
    <text x="60" y="1215" font-family="Georgia, serif" font-size="82" font-weight="700" fill="#ffffff">${p.title2}</text>

    <rect x="60" y="1255" width="80" height="6" fill="#f4b860"/>
    <text x="60" y="1315" font-family="Arial, sans-serif" font-size="34" fill="#f4f1e8">${p.sub1}</text>
    <text x="60" y="1360" font-family="Arial, sans-serif" font-size="34" fill="#f4f1e8">${p.sub2}</text>

    <text x="60" y="1445" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#f4b860">patasyhogar.com</text>
  </svg>`;

  const out = `/tmp/pin-${p.slug}.png`;
  await sharp(heroBuf)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toFile(out);
  console.log('✓', out);
}
