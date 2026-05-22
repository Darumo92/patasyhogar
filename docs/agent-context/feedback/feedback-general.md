# Feedback: General

## Always build before push

Always run `npm run build` before `git push`. The build runs `astro build && node scripts/update-csp-hashes.mjs` which updates CSP hashes in `public/_headers`.

**Why:** The CSP hashes must be in sync with the built output. Pushing without building can deploy broken CSP headers or miss build errors.

**How to apply:** After staging and committing changes, run `npm run build` first. If build succeeds and `public/_headers` changed, amend or add a new commit with the updated headers before pushing.

## Never guess data - always ask user

NEVER guess or approximate any product data. If I cannot verify a piece of information (price, image URL, ASIN, product specs, store availability, dimensions), I MUST ask the user to verify it.

This applies to:
- Prices on Amazon.es (blocked by CAPTCHA)
- Prices on Tiendanimal/Zooplus (WebFetch often returns wrong product)
- Amazon product image URLs (can't scrape)
- Product availability/stock status
- Product specifications (dimensions, weight, etc.)

**Why:** User explicitly said "nunca te inventes nada y si no puedes conseguirlo dímelo". Guessing prices or using approximate data leads to incorrect information on the site.

**How to apply:** When I can't verify data through web search/fetch, immediately ask the user: "Can you check [specific URL] and give me [specific data]?" Don't put placeholder or approximate values.

## Revisar estado reciente antes de proponer plan diario

Antes de responder a "vamos con el plan de hoy" o variantes, no basta con leer los archivos base del plan. Hay que revisar también el estado reciente del repo y del tracking.

### Cómo aplicar

1. Revisar `git log --oneline -10` para detectar trabajo reciente no reflejado en documentos antiguos.
2. Revisar `project_backlinks_social_status.md` para posts/comentarios ya publicados y evitar repetir ángulos.
3. Revisar `.seo-engine/logs/changelog.md` si el plan menciona builds, herramientas o contenido SEO.
4. Si un archivo de plan está desactualizado, actualizarlo antes de proponer tareas.

### Corrección que originó esta regla

El 2026-05-19 se propuso empezar la calculadora de coste mascotas y hacer un post propio en Reddit sobre costes, pero la calculadora ya estaba publicada el 2026-05-18 y el post propio de coste mensual ya se había publicado en r/AskSpain el 2026-05-12. No repetir esa propuesta.

## Usar MCP Analytics/GSC/Cloudflare antes de pedir datos

El usuario confirmó el 2026-05-13 que ya hay acceso MCP a Google Search Console, Google Analytics y analytics/API de Cloudflare. Para cualquier revisión de plan SEO, diagnóstico de tráfico, priorización, rutina diaria, evaluación de contenidos existentes, indexación, clicks, impresiones, CTR, posiciones, rendimiento técnico o validación de si el plan actual tiene sentido, consultar primero esas fuentes mediante MCP antes de pedir datos al usuario.

### How to apply

- No pedir al usuario exportaciones, capturas o métricas que pueda obtener directamente de:
  - Google Search Console MCP
  - Google Analytics MCP
  - Cloudflare MCP/API
- Antes de decir "necesito que me pases los datos", comprobar si el dato está accesible por esos MCP.
- Usar GSC para queries, páginas, clicks, impresiones, CTR, posición media, indexación y oportunidades SEO.
- Usar GA4 para sesiones, usuarios, canales, engagement, conversiones/eventos si están configurados y comparación temporal.
- Usar Cloudflare para tráfico a nivel edge, requests, caché, errores, rendimiento, DNS/deploy/configuración si aplica.
- En Cloudflare, no usar el endpoint REST antiguo `/zones/{zone}/analytics/dashboard` para tráfico: el 2026-05-13 devolvió `Zone Analytics API is sunset and replaced by GraphQL API`. Para métricas de tráfico usar GraphQL/RUM si está disponible; REST sigue valiendo para zona, DNS, settings, seguridad y configuración.
- Si un MCP falla, no tiene permisos o no expone el dato concreto, indicar el intento realizado y pedir solo el dato faltante.

### Límites

Esta regla no elimina otros checks obligatorios:

- Keyword Surfer y SERP real siguen siendo necesarios cuando el workflow de contenido lo exige.
- GSC muestra rendimiento propio, no reemplaza el análisis de SERP actual de Google para una keyword nueva.
- La verificación de productos, ASINs, precios e imágenes sigue requiriendo fuentes verificables o confirmación del usuario cuando Amazon/tiendas bloqueen scraping.
- No usar datos de analytics como única razón para publicar artículos nuevos durante el plan outreach 2026-05-11 -> 2026-11-11; la regla de no publicar contenido nuevo sigue activa salvo confirmación explícita del usuario.

## Nunca adivinar URLs de patasyhogar — verificar slug siempre

SIEMPRE verificar la URL completa de cualquier link a patasyhogar antes de escribirlo. Nunca escribir `patasyhogar.com/[slug]` a ciegas ni construir la URL a partir del título del artículo.

**Por qué:** Las URLs de patasyhogar siguen el patrón `patasyhogar.com/[categoria]/[slug]/` donde `[categoria]` es uno de: `alimentacion`, `higiene`, `paseo`, `juguetes`, `hogar`, `cuidados`. Los slugs además pueden llevar prefijos (`mejor-`, `guia-`) o sufijos (`-guia`) que no son obvios. Adivinar la URL genera links rotos en contenido outreach.

**Cómo aplicar:**

1. Buscar el slug real en el filesystem: `ls src/content/articulos/ | grep -i [termino]`
2. Confirmar la categoría cruzando con el frontmatter del archivo MDX encontrado.
3. Construir la URL completa: `patasyhogar.com/[categoria]/[slug-del-archivo-sin-.mdx]/`
4. Solo entonces escribir el link en el comentario, post o artículo.

**Corrección que originó esta regla:**

El 2026-05-22 se escribió `patasyhogar.com/pienso-gato-indoor/` omitiendo la categoría `alimentacion/` y el prefijo `mejor-` del slug. La URL correcta era `patasyhogar.com/alimentacion/mejor-pienso-gato-indoor/`. Ya había pasado lo mismo el día anterior.

## Gap mínimo entre links propios en Reddit

NO publicar links a patasyhogar.com en días consecutivos. El algoritmo de spam de Reddit rastrea a nivel de dominio (no subreddit), y una cuenta nueva (1 mes, ~66 karma) quecae exactamente en el perfil de spam: mismo dominio, días seguidos, karma bajo.

**Gap mínimo entre links al mismo dominio:**

| Estado cuenta | Gap mínimo entre links propios |
|---|---|
| Nueva (<3 meses, <200 karma) | **5-7 días** |
| Establecida (3+ meses, 500+ karma) | 3-4 días |
| Alta (2000+, 1+ año) | 2-3 días |
| Mismo subreddit | **7+ días** siempre |

**Ratio objetivo:** 1 link propio por cada 15-20 interacciones sin link (~5-7% self-promotion). Reddit usa la regla del 10% como mínimo, pero para cuentas nuevas el objetivo es 5-7%.

**Cómo aplicar:**

- Antes de proponer un comentario con link, verificar la fecha del ÚLTIMO link a patasyhogar publicado en Reddit.
- Si han pasado menos de 5 días desde el último link → no poner link, aunque el contexto encaje.
- Los comentarios sin link se pueden hacer todos los días sin restricción.
- Cuando se pone un link, debe ser respuesta directa a una pregunta (no proactivo "también tengo un artículo sobre esto").

**Corrección que originó esta regla:**

El 2026-05-22 se propuso poner un link a patasyhogar el día después de haber puesto otro link (21 mayo en r/GatosArgentinos). Para una cuenta de 1 mes y ~66 karma, eso dispara señales de spam. Se estableció gap mínimo de 5-7 días entre links al mismo dominio.
