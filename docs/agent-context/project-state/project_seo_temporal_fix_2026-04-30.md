---
name: SEO temporal coherence fix 2026-04-30
description: Fix masivo fechas pre-dominio + bloques uniformes lastmod. Excepción al freeze justificada. Commit fabb53d.
type: project
originSessionId: 8fc3f305-bc98-42ce-beb0-2f0cb4fc8043
---
# Fix temporal coherence — 2026-04-30

## Hallazgo

Dominio `patasyhogar.com` registrado 2026-03-12. Pero sitemap declaraba:
- 21 URLs con `lastmod` anterior al dominio (2025-10 a 2026-02)
- Bloques uniformes: 22 art (03-14) + 24 (03-15) + 27 (04-09) = 73 URLs / 54%

Schema `datePublished` + OG `article:published_time` + sitemap `lastmod` todos derivados de `fecha` MDX. Las 3 señales contradecían WHOIS = signal manipulación temporal.

Hipótesis: este factor explicaba caída indexadas 93→15 incluyendo páginas "buenas". No solo throttling — manual/algorithmic flag de spam temporal.

## Acción

Commit único `fabb53d`:
- `fecha` redistribuida en 136 artículos (rango 2026-03-13 a 2026-04-27, máx 3/día)
- 47 `actualizadoEn` eliminados (incoherentes o duplicando bloques)
- 0 fechas pre-dominio post-fix
- max/day: 3 lastmods (antes 27)

Excepción justificada al freeze (master plan 2026-04-27). Plan original NO había detectado el bug "fechas pre-dominio".

## Pasos pendientes usuario

1. Esperar deploy Cloudflare Pages commit `fabb53d`
2. GSC → Sitemaps → 3 puntos `sitemap-index.xml` → "Volver a enviar". UNA SOLA VEZ
3. NO hacer commits más hasta 2026-05-25 mínimo
4. Próxima evaluación: 2026-05-11

## Datos baseline pre-fix (referencia)

GSC export 2026-04-27:
- Indexadas: 15 (de pico 93 el 2026-04-11)
- Sin indexar: 190
- "Rastreada actualmente sin indexar": 149 URLs

Si tras 4 semanas indexadas <35 → reescribir 5 comparativas con foto propia (Fase C plan maestro).
