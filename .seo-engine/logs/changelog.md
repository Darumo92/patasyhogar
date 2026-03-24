# SEO Content Engine — Changelog

## 2026-03-24 18:30
**Action:** Creación de persona de autor completa para humanización
**Files:**
- `.seo-engine/config.yaml` (persona completa: Daniel Ruiz, Valencia, mascotas Kira y Mango, veterinaria Laura, zonas, historial)
- `.seo-engine/templates/humanization-guide.md` (actualizado: reglas de consistencia de persona, tabla de experiencias por tema, fórmulas de honestidad adaptadas)
**Summary:** Se crea un perfil de autor ficticio pero detallado y consistente (Daniel Ruiz, Valencia) con 2 mascotas actuales, 2 anteriores, veterinaria de confianza, y zonas habituales. Todas las experiencias en artículos se generan a partir de este perfil. La guía incluye tabla de experiencias tipo por tema para mantener coherencia.
**Triggered by:** user

## 2026-03-24 18:00
**Action:** Integración de guía de humanización en SEO engine
**Files:**
- `.seo-engine/templates/humanization-guide.md` (nuevo — guía completa anti-IA + experiencia personal)
- `.seo-engine/templates/tone-guide.md` (añadida sección humanización + reglas en "Lo que NUNCA hacer")
- `.seo-engine/templates/blog-structures.yaml` (añadido bloque `humanization` a todos los tipos)
- `CLAUDE.md` (humanization-guide en File Reference, Core Rules, Blog Writing Workflow, Evaluate Workflow, Audit Workflow)
**Summary:** Se integran las reglas de humanización en todo el flujo del SEO engine: escritura, revisión y auditoría. Incluye anti-patrones IA (intros formulaicas, simetría en listas, ausencia de experiencia), variaciones de intro, puntos de inserción de experiencia personal, y checklist de humanización.
**Triggered by:** user

## 2026-03-24 10:00
**Action:** Nuevo artículo informativo: "Garrapatas en perros: cómo prevenir y extraerlas"
**Files:**
- `src/content/articulos/garrapatas-perros-prevenir-extraer.mdx` (nuevo)
- `public/images/articulos/garrapatas-perros-prevenir-extraer.webp` (Pexels: Karel Svanda)
- `.seo-engine/data/content-map.yaml` (entrada añadida)
- `.seo-engine/data/topic-clusters.yaml` (añadido a tc_higiene_perros)
- `.seo-engine/data/seo-keywords.csv` (4 keywords añadidas)
**Summary:** Guía tutorial informativa sobre garrapatas en perros: detección, extracción paso a paso, prevención y enfermedades transmitidas. Cluster tc_higiene_perros. Internal links a antiparasitarios, collares y pulgas. E-E-A-T: cita ESCCAP, especies en España, datos parasitológicos.
**Triggered by:** user

## 2026-03-23 23:30
**Action:** Revisión SEO Engine completa de 8 artículos con SERP analysis
**Files:**
- 8 artículos MDX: enlaces externos (ISFM, AVEPA, REIAC, ECHA, Applied Animal Behaviour Science), tags ampliados, artículos relacionados
- `.seo-engine/data/content-map.yaml`: cluster_ids y internal_links para 8 artículos
**Summary:** Revisión fuente-agua-gatos, gatera, gps-perro, juguete-cachorro, juguete-gatos, juguete-mental, juguete-resistente, limpiador-enzimatico. Enlaces externos, artículos relacionados, tags, clusters.
**Triggered by:** user

## 2026-03-23 23:00
**Action:** Revisión SEO Engine completa de 6 artículos con SERP analysis
**Files:**
- 6 artículos MDX: títulos 2025→2026, tags ampliados, enlaces externos, artículos relacionados, internal links
- `mejor-escalera-rampa-perros.mdx`: TopPick cambiado (Rampa Madera 10kg → TRIXIE Petwalk 75kg)
- `.seo-engine/data/content-map.yaml`: cluster_ids, títulos, internal_links actualizados
**Summary:** Revisión completa de correa-perro, cortapelos, cortauñas, difusor-feromonas, dispensador-bolsas, escalera-rampa. Años corregidos, TopPick cambiado, enlaces externos de autoridad, artículos relacionados, tags ampliados.
**Triggered by:** user

## 2026-03-23 22:00
**Action:** Revisión SEO Engine completa con SERP analysis de 8 artículos
**Files:**
- 8 artículos MDX: enlaces externos de autoridad (RSCE, ESCCAP, DGT, ANECPLA, FEDIAF, ACVIM), tags ampliados a 6
- `mejor-comida-humeda-gatos.mdx`: título simplificado (sin "exigentes"), precioZooplus Cosma Nature
- `mejor-comida-humeda-perros.mdx`: Royal Canin precio aclarado (sobre individual)
- `.seo-engine/data/content-map.yaml`: título y keywords actualizados comida-humeda-gatos
**Summary:** Revisión SERP + SEO Engine: enlaces externos de autoridad en 8 artículos, tags ampliados, título optimizado comida-humeda-gatos, precios aclarados comida-humeda-perros.
**Triggered by:** user

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
