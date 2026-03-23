# SEO Content Engine — Changelog

## 2026-03-23 18:30
**Action:** Revisión completa de 8 artículos con SEO Content Engine
**Files:**
- `src/content/articulos/mejor-circuito-agilidad-perros.mdx` — corregidos 5 precios en tabla resumen, imagen unificada, E-E-A-T añadido, artículos relacionados
- `src/content/articulos/mejor-collar-antiparasitario-perro.mdx` — nota aclaratoria Advantix/Beaphar, artículos relacionados
- `src/content/articulos/mejor-collar-luminoso-perro.mdx` — nota sobre productos sin enlace, artículos relacionados
- `src/content/articulos/mejor-comedero-antihormigas-mascotas.mdx` — E-E-A-T añadido
- `src/content/articulos/mejor-comida-humeda-gatos.mdx` — actualizadoEn añadido, artículos relacionados
- `src/content/articulos/mejor-comida-humeda-perros.mdx` — E-E-A-T añadido, artículos relacionados
- `.seo-engine/data/content-map.yaml` — cluster_ids asignados a 8 artículos, internal_links_to actualizados, last_updated comida-humeda-gatos
**Summary:** Revisión de 8 artículos: precios corregidos, E-E-A-T reforzado en 3 artículos, artículos relacionados en 5, cluster_ids asignados en content-map, internal links actualizados.
**Triggered by:** user

## 2026-03-23 — Inicialización del SEO Engine
**Action:** Setup completo del SEO Content Engine
**Files:**
- `.seo-engine/config.yaml` — configuración del proyecto
- `.seo-engine/data/features.yaml` — 113 features en 5 categorías
- `.seo-engine/data/competitors.yaml` — 4 competidores (sin verificar)
- `.seo-engine/data/seo-keywords.csv` — 38 seed keywords
- `.seo-engine/data/content-map.yaml` — 113 artículos registrados
- `.seo-engine/data/content-queue.yaml` — 19 ideas en cola (9 pillar + 10 cluster)
- `.seo-engine/data/topic-clusters.yaml` — 9 clusters temáticos
- `.seo-engine/templates/blog-frontmatter.yaml` — template frontmatter Astro
- `.seo-engine/templates/blog-structures.yaml` — estructuras por tipo de blog
- `.seo-engine/templates/comparison-template.md` — plantilla X vs Y
- `.seo-engine/templates/tone-guide.md` — guía de tono y estilo
- `.seo-engine/USAGE-GUIDE.md` — guía de uso
- `.seo-engine/logs/changelog.md` — este archivo
**Summary:** Inicialización completa con auto-detección de proyecto Astro, escaneo de 113 artículos MDX, generación de topic clusters, keywords semilla y cola de contenido.
**Triggered by:** user

## 2026-03-23 — Revisión y mejora de muda-pelo-gatos-guia-cuidados
**Action:** Evaluación SEO + aplicación de mejoras
**Files:**
- `src/content/articulos/muda-pelo-gatos-guia-cuidados.mdx` — añadida experiencia personal del autor (E-E-A-T), 2 enlaces externos autoritativos (Cornell Feline Health Center, AVEPA), variados anchor texts de enlaces internos repetidos
- `.seo-engine/data/content-map.yaml` — asignado cluster_id tc_higiene_gatos
- `.seo-engine/data/seo-keywords.csv` — añadidas 3 keywords: "muda pelo gatos", "gato suelta mucho pelo", "bolas pelo gato"
**Summary:** Artículo evaluado con 8.5/10. Mejoras aplicadas: experiencia personal E-E-A-T en intro, enlaces externos a Cornell y AVEPA, anchor text variado en links internos repetidos, keyword tracking y asignación a cluster.
**Triggered by:** user
