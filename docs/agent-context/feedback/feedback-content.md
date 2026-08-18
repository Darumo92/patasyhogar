# Feedback: Content

## Siempre pedir SERP antes de escribir

> **Actualizado 2026-08-18:** esta regla queda superada por `feedback-serp-playwright-mcp.md`. El agente obtiene la SERP real con Playwright MCP; solo se pide al usuario si el MCP falla.

NUNCA saltar el paso de pedir datos SERP al usuario antes de escribir cualquier artículo o pillar page. Sin excepciones.

**Why:** El usuario tuvo que detectar él mismo que me salté este paso obligatorio del workflow SEO engine (paso 1d). TODOS los pilares anteriores se hicieron con SERP. No inventar excusas ni asumir que conversaciones anteriores saltaron pasos — verificar, no suponer.

**How to apply:** Antes de escribir CUALQUIER contenido nuevo (artículo, pillar, cluster page), pedir al usuario los datos SERP reales (top resultados, PAA, búsquedas relacionadas) y ESPERAR su respuesta. No proceder sin ellos. No sustituir con web search propio. No asumir que "esta vez se puede saltar".

## Article review workflow

Reviewing all articles one by one for excellence. **36 done, 73 remaining** (as of 2026-03-18).

### Steps per article:

1. **Read the full article** — understand all products, prices, links, structure, and content quality
2. **Verify what each product actually IS** — don't trust the article's description blindly
3. **Verify ALL Amazon ASINs** — pass links (not bare ASINs) to user to check price, availability AND image
   - If price matches article: OK
   - If price differs: update
   - If "Precio no disponible": find replacement or remove
   - If ASIN doesn't exist: find alternative ASIN or remove
4. **When replacing a product, update EVERYTHING**: ASIN, name, image, price, description, puntosFuertes, and all text mentions
5. **Verify product images** — ask user for BOTH price AND image in the same request
6. **Search Tiendanimal** — AFTER finalizing Amazon products. Search EACH relevant product INDIVIDUALLY by name (site:tiendanimal.es "product name"), never generic category searches
   - Verify each URL with WebFetch to confirm it's the right product and get the price
   - Only add links that are verified — NEVER invent URLs
7. **Add per-store pricing** — precioAmazon and precioTiendanimal in ComparisonTable when verified
8. **Remove redundant AffiliateButton groups** — the ComparisonTable already has buy buttons. TopPick stays editorial and must not render store links.
9. **Remove AffiliateButton import** if no longer used
10. **Fix price consistency** — prices must match between ComparisonTable, TopPick, text mentions, and markdown tables
11. **Check content quality** — products in correct sections, descriptions accurate, SEO, structure
12. **Convert duplicate markdown tables** to specs-only (no prices that could get out of sync)
13. **Update title year** if it contains 2025 -> 2026
14. **Do NOT add actualizadoEn** — bulk updates trigger Google freshness spam signal
15. **Build and push** after each article: `npm run build` then `git add` + `git commit` + `git push`
16. **Post a summary** of all changes made to the article

### Order of verification:
- First: ALL Amazon ASINs (batch them, pass as clickable links, ask price + image)
- Second: Find replacements for unavailable products (ask user for price + image)
- Third: Search Tiendanimal INDIVIDUALLY for each relevant product in the FINAL lineup
- Fourth: Verify each store URL with WebFetch (correct product, not generic page)
- Fifth: Apply all changes at once

### Key rules:
- NEVER guess prices, URLs, or images — always verify or ask user
- NEVER invent Tiendanimal URLs — only use verified ones
- ALWAYS pass Amazon links as full URLs (https://www.amazon.es/dp/ASIN), not bare ASINs
- ALWAYS ask for price AND image together
- ALWAYS search each product individually by name in each store (not generic searches)
- ALWAYS verify store URLs point to the correct product (not a generic category page)
- For vet/pharmacy products (antiparasitarios, medicamentos): convert to text descriptions without ComparisonTable if no store links available
- Image from Tiendanimal or other non-Amazon retailers is OK if Amazon image is not available, but download it locally because direct hotlinking is not reliable
- When a product isn't available anywhere: remove it, don't leave broken links
- Check that products are classified in the correct section of the article

### Articles reviewed (36):
1. alfombras-olfato-perros
2. alfombrilla-refrigerante-perros
3. alimentos-prohibidos-perros (informativo)
4. alimentos-toxicos-gatos (informativo)
5. arbol-rascador-pequeno-pisos
6. asiento-coche-perro
7. cachorro-primeras-semanas-casa (informativo)
8. cepillos-quitar-pelo-perro-sofa
9. champu-perros-piel-sensible
10. collar-antiladridos-perros
11. collar-gps-gato
12. como-adiestrar-gato-tecnicas (informativo)
13. como-banar-gato (informativo)
14. como-cortar-unas-gato (informativo)
15. como-eliminar-pulgas-perro-casa (informativo)
16. como-limpiar-dientes-perro (informativo)
17. como-limpiar-oidos-perro
18. como-presentar-perro-gato (informativo)
19. como-saber-edad-gato (informativo)
20. como-socializar-cachorro (informativo)
21. comparativa-fuentes-agua-gatos
22. correa-extensible-perros
23. mejor-antiparasitario-gatos-guia
24. mejor-antiparasitario-perros-guia
25. mejor-arenero-arena-gatos
26. mejor-arnes-antitirones-perro
27. mejor-arnes-gato-pasear
28. mejor-arnes-perro
29. mejor-aspirador-pelo-mascotas
30. mejor-bebedero-perros-guia
31. mejor-bozal-perro
32. mejor-cama-gato-guia
33. mejor-cama-perro-guia
34. mejor-cepillo-dientes-perros
35. mejor-abrigo-perro-invierno
36. jaula-perro-casa-coche

### Next article to review: mejor-cepillo-gatos

## Deep article review beyond prices

Article reviews must be COMPREHENSIVE, not just price/link/image verification. Check EVERYTHING.

**Why:** User pointed out that products were misclassified (a fountain listed as a bowl), descriptions didn't match products, and content structure was wrong. Just checking prices and links misses fundamental quality issues.

**How to apply — Full review checklist:**

### Content & Structure
- Products are in the correct category/section (don't put a fountain in the bowls section)
- Product descriptions match what the product actually is
- Text analysis sections accurately describe each product
- No duplicate products across sections
- Logical flow and organization of sections
- Tables are accurate and consistent with the rest of the article

### SEO & Quality
- Title contains primary keyword, max ~60 chars
- Meta description with keyword + CTA, max ~155 chars
- H2/H3 structure is logical and keyword-rich
- Internal links to related articles
- FAQs are relevant and well-written
- Tags are relevant (3-6 long-tail keywords)
- imagenAlt is descriptive with keywords
- Content is comprehensive, detailed, useful for the reader
- No thin or filler content
- Advice is accurate and helpful

### Products & Data
- All ASINs verified (price + image from user)
- Products searched in Tiendanimal when relevant
- Prices consistent throughout article
- Images verified by user
- No invented URLs
- Product specs/data are accurate

### Cleanup
- Remove AffiliateButton import and all button groups
- Remove redundant markdown tables that duplicate ComparisonTable data
- Title year updated if needed

## No bulk actualizadoEn

Don't add `actualizadoEn` to articles during structural reviews (removing buttons, fixing tables). Only add it when there are real content changes (new product, updated price, rewritten text).

**Why:** Google would see 100+ articles "updated" on the same day as spam/freshness manipulation.

**How to apply:** Skip actualizadoEn during bulk article reviews. Only set it when making significant content changes to individual articles.

## Artículos nuevos retomados con cadencia baja

El usuario confirmó el 2026-06-12 que quiere retomar la creación de artículos nuevos pese al bloqueo de indexación en Google, porque Bing sí está indexando las páginas e incluso posiciona algunas búsquedas en top 1. La nueva cadencia objetivo es **mínimo 1 artículo por semana**, en paralelo con Reddit y Quora diarios.

### Cómo aplicar

- Mantener el plan de autoridad externa: Reddit + Quora siguen siendo rutina diaria.
- Crear artículos nuevos con cadencia baja, no publicación masiva.
- Seguir el workflow completo de artículos: cannibalization check, pedir SERP real al usuario, verificar productos si aplica, humanización estricta y `npm run build` tras cambios.
- Priorizar temas con posibilidad de tracción en Bing, long-tail útil y encaje con artículos existentes para enlazado interno.
- No volver al calendario masivo archivado sin nueva confirmación.

## Regla antigua superada: no publicar articulos nuevos durante outreach 6 meses

Esta regla quedó superada por la decisión del 2026-06-12. Se conserva como histórico para entender el cambio de criterio.

Antes decía: NO publicar artículos nuevos durante plan outreach 6 meses (2026-05-11 -> 2026-11-11).

**Why:** Diagnóstico 2026-05-11 confirmó que problema patasyhogar = falta autoridad externa, no volumen contenido. Evidencia tuespaciodetrabajo (<20 artículos + identidad real David, mismo blackout exacto) confirma. Más artículos = más URLs rechazadas + diluye crawl budget + refuerza señal "site farm" en dominio fresh sin autoridad. Solución única: backlinks externos + brand mentions.

**How to apply:**
- Si usuario pide "publicar artículo X" -> recordar plan outreach activo + pedir confirmación explícita
- Si propones tú artículo nuevo -> STOP
- Free tool calculadora coste mascotas SI permitido (build planificado sem 2)
- Bug fixes técnicos críticos SI (ej: build roto, CSP error, broken link interno)
- Editar artículos existentes para mejorar calidad SI permitido (sin tocar `actualizadoEn` salvo cambio mayor genuino)
- Plan v7 (60 artículos calendarizados) archivado en `project-state/_archive/project_plan_v7_calendario.md` — referencia histórica, no ejecutar
- Re-evaluar regla 2026-11-11 según KPIs alcanzados

## No quitar "mejor" de títulos sin datos

No aplicar el patrón "quitar mejor de todos los títulos" de forma automática. Solo cambiar cuando hay datos reales de KW Surfer que lo justifiquen.

**Why:** El usuario corrigió que estaba quitando "mejor" mecánicamente sin verificar si realmente mejoraba el performance. En algunos casos "mejor X" SI tiene volumen (ej: "mejor pienso para perros" = 1600, "mejor cama para gatos" = 4400).

**How to apply:** Antes de tocar un título, verificar en el CSV que la keyword sin "mejor" tiene más volumen que con "mejor". Si no hay datos, no tocar. Productos nicho con <400 vol tampoco vale la pena optimizar.

## Usar skills antes de presentar borradores publicables

Antes de presentar al usuario CUALQUIER texto destinado a publicación (comentarios Reddit, respuestas Quora, artículos Medium, posts propios, captions, etc.), aplicar las herramientas de humanización y tono del proyecto.

### Skills y archivos obligatorios

1. **Skill `humanizer`** — catálogo de 29 patrones IA a evitar. Leer antes de humanizar.
2. **`.seo-engine/templates/humanization-guide.md`** — patrones específicos del proyecto: persona del autor, coherencia Mango/Kira, experiencia personal, variación de intros, asimetría de listas, fórmulas de honestidad.
3. **`.seo-engine/templates/tone-guide.md`** — reglas de tono y voz del proyecto.
4. **`feedback_reddit_coherencia_replies.md`** — para replies Reddit específicamente.
5. **`feedback_reddit_humano.md`** — sin paréntesis aclaratorios tipo "(gato naranja, 5 años)".

### Cómo aplicar

1. Redactar borrador.
2. Leer los archivos anteriores.
3. Hacer audit anti-IA: "¿qué hace que esto suene IA?" -> corregir tells.
4. Aplicar reglas específicas del proyecto (persona, coherencia, tono Reddit vs Quora vs Medium).
5. Presentar versión final humanizada al usuario.

### Por qué

El usuario tuvo que pedir explícitamente que se usaran las skills. El AGENTS.md ya dice "Antes de presentar al usuario cualquier texto destinado a publicación, aplicar la guía de humanización", pero en la práctica se saltó este paso en el borrador del reply Reddit. Esta feedback refuerza que las skills deben aplicarse proactivamente, no solo cuando el usuario lo recuerde.
# Feedback: Content

## Siempre castellano de España

Todo texto publicable de Patas y Hogar debe escribirse SIEMPRE en castellano de España. No usar español latino, argentino, colombiano, mexicano ni voseo, aunque el canal o subreddit sea de Latinoamérica.

Aplica a:
- Reddit
- Quora
- Medium
- artículos MDX
- borradores sociales
- comentarios externos
- meta titles/descriptions

### Cómo aplicar

- Usar `coche`, no `auto` ni `carro`.
- Usar `autobús`, no `colectivo`, `camión` ni `buseta`.
- Usar `puedes`, `tienes`, `cuentas`, no `podés`, `tenés`, `contás`.
- Usar `enfadarse`, `ponerse nervioso`, `agobiarse`, no giros regionales latinoamericanos.
- Mantener tuteo natural de España, sin adaptar el dialecto al país del subreddit.
- Antes de entregar cualquier borrador publicable, hacer una pasada explícita de dialecto para detectar latinismos o mezclas (`auto/coche`, `vos/tú`, `podés/puedes`, etc.).

### Corrección que originó esta regla

El 2026-05-20 se redactaron borradores para Reddit mezclando `autos` y `coches`, y después se pasó a tono argentino en `r/GatosArgentinos`. El usuario corrigió: "Siempre y digo SIEMPRE en castellano de España".
