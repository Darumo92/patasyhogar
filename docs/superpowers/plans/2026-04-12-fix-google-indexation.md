# Plan: Corregir indexacion de Google

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conseguir que Google indexe los 145 URLs del sitemap (actualmente solo 28 = 19%) eliminando problemas tecnicos que desperdician crawl budget y mejorando las senales de descubrimiento.

**Architecture:** El sitio genera 795 paginas totales, de las cuales 644 son tag pages (81%). Aunque tienen noindex, Google las rastrea igualmente consumiendo crawl budget. Ademas hay 55 URLs fantasma (old category paths y tags) que Google sigue rastreando. La estrategia es: (1) reducir drasticamente las paginas que desperdician crawl budget, (2) anadir redirects faltantes, (3) mejorar senales de descubrimiento en GSC, (4) reforzar internal linking.

**Tech Stack:** Astro 5, Cloudflare Pages, Google Search Console

---

## Diagnostico actual (12 abril 2026)

### Numeros clave

| Metrica | Valor |
|---------|-------|
| Articulos en el sitio | 133 |
| URLs en sitemap | 145 |
| URLs rastreadas por Google | 83 |
| URLs del sitemap rastreadas | **28 (19%)** |
| URLs del sitemap NO rastreadas | **117 (81%)** |
| URLs fantasma (no en sitemap) | 55 |
| Tag pages generadas | **644** |
| Paginas totales generadas | 795 |

### Problemas identificados

1. **644 tag pages (81% del sitio) desperdician crawl budget.** Tienen `noindex, follow` pero Google las rastrea igualmente. No estan en el sitemap pero se descubren via internal links.

2. **55 URLs fantasma** que Google rastrea pero no estan en el sitemap:
   - 38 son `/tags/` pages
   - 10 son URLs de categorias antiguas (`/descanso/`, `/comportamiento/`) que tienen redirect 301
   - 2 son articulos movidos de `/alimentacion/` a `/cuidados/` SIN redirect
   - 5 son otros (aviso-legal, areneros consolidados, etc.)

3. **2 redirects faltantes** para articulos que cambiaron de categoria:
   - `/alimentacion/cuantas-veces-dia-debe-comer-perro/` -> `/cuidados/cuantas-veces-dia-debe-comer-perro/`
   - `/alimentacion/perro-no-quiere-comer-causas/` -> `/cuidados/perro-no-quiere-comer-causas/`

4. **Sitio muy joven** (primeros articulos de oct-nov 2025). Google asigna crawl budget limitado a sitios nuevos.

5. **Categorias enteras sin rastrear**: `/higiene/`, `/hogar/`, `/juguetes/`, `/paseo/`, `/gatos/`, `/perros/` no han sido rastreadas.

6. **9 pillar pages no rastreadas** (guia-alimentacion-perros, guia-completa-alimentacion-gatos, etc.)

---

## Fase 1: Parar la hemorragia de crawl budget (tecnico)

### Task 1: Reducir tag pages de 644 a algo manejable

**Problema:** 644 tag pages es desproporcionado para 133 articulos. Cada tag con 1-2 articulos no aporta valor SEO y consume crawl budget.

**Files:**
- Modify: `src/pages/tags/[tag].astro`
- Modify: `astro.config.mjs` (ya filtra tags del sitemap - verificar)

**Opciones (elegir una):**

**Opcion A (recomendada): Eliminar tag pages individuales, mantener solo indice**
- [ ] **Step 1:** Eliminar `src/pages/tags/[tag].astro` completamente
- [ ] **Step 2:** Mantener `src/pages/tags/index.astro` como indice de tags (o eliminarlo tambien)
- [ ] **Step 3:** Anadir a `public/_redirects`: `/tags/* /articulos/ 301` para redirigir cualquier tag page rastreada
- [ ] **Step 4:** Run `npm run build` y verificar que ya no se generan las 644 tag pages

**Opcion B (conservadora): Filtrar tags con pocas paginas**
- [ ] **Step 1:** En `[tag].astro`, filtrar `getStaticPaths()` para solo generar tags con >= 3 articulos
- [ ] **Step 2:** Run `npm run build` y contar cuantas tag pages quedan
- [ ] **Step 3:** Si quedan mas de ~50, subir el umbral a 5

**Razonamiento:** Las tag pages con noindex no aportan SEO directo. Su unico valor es UX (navegacion por tags). Pero con 644 paginas, el coste en crawl budget supera con creces el beneficio UX. Para un sitio nuevo con crawl budget limitado, es mejor eliminarlas.

---

### Task 2: Anadir redirects faltantes

**Files:**
- Modify: `public/_redirects`

- [ ] **Step 1:** Anadir estos redirects al final de la seccion correspondiente en `public/_redirects`:

```
# Redirect articles moved from alimentacion to cuidados
/alimentacion/cuantas-veces-dia-debe-comer-perro/ /cuidados/cuantas-veces-dia-debe-comer-perro/ 301
/alimentacion/perro-no-quiere-comer-causas/ /cuidados/perro-no-quiere-comer-causas/ 301
```

- [ ] **Step 2:** Verificar que no hay mas articulos informativos con categoria `alimentacion` que deberian tener redirect. Revisar cada articulo `tipo: informativo` y confirmar que su URL canonica coincide con `/cuidados/[slug]/`.

```bash
# Buscar articulos informativos y verificar su categoria
grep -l "tipo: informativo" src/content/articulos/*.mdx | while read f; do
  slug=$(basename "$f" .mdx)
  cat=$(grep "^categoria:" "$f" | awk '{print $2}')
  echo "$cat -> /cuidados/$slug/"
done
```

- [ ] **Step 3:** Anadir redirects para cualquier articulo informativo cuya URL antigua (`/[categoria]/[slug]/`) no tenga redirect.

- [ ] **Step 4:** Run `npm run build` para verificar

---

### Task 3: Revisar si hay mas URLs fantasma sin redirect

**Files:**
- Modify: `public/_redirects` (si se encuentran mas)

- [ ] **Step 1:** Comparar las URLs fantasma restantes contra `_redirects`:

URLs fantasma que necesitan verificacion:
```
/comportamiento/mejor-rascador-esquina-gatos/ -> debe redirigir a /juguetes/mejor-rascador-gatos-guia/
/higiene/mejor-arenero-abierto-gatos/ -> ya tiene redirect a /higiene/mejor-arenero-arena-gatos/
/higiene/mejor-arenero-autolimpiable/ -> ya tiene redirect a /higiene/mejor-arenero-arena-gatos/
/juguetes/mejor-juguete-cana-gatos/ -> debe redirigir a /juguetes/mejor-juguete-gatos-guia/
/juguetes/mejor-juguete-inteligencia-gatos/ -> debe redirigir a /juguetes/mejor-juguete-gatos-guia/
/juguetes/mejor-juguete-rellenable-perros/ -> debe redirigir a /juguetes/mejor-juguete-mental-perros-guia/
/juguetes/mejor-lanzador-pelotas-perro/ -> debe redirigir (verificar destino correcto)
```

- [ ] **Step 2:** Verificar con `grep` en `_redirects` cuales faltan y anadir los que no existen.

- [ ] **Step 3:** Run `npm run build`

- [ ] **Step 4:** Commit todos los cambios de Fase 1

```bash
git add public/_redirects src/pages/tags/
git commit -m "fix: reduce crawl budget waste — remove tag pages, add missing redirects"
```

---

## Fase 2: Mejorar senales de descubrimiento (GSC + interlinking)

### Task 4: Acciones en Google Search Console (manual - usuario)

Estas acciones requieren acceso manual a Google Search Console:

- [ ] **Step 1: Verificar estado del sitemap**
  - Ir a GSC > Sitemaps
  - Verificar que `https://patasyhogar.com/sitemap-index.xml` esta enviado y sin errores
  - Si no esta enviado, enviarlo

- [ ] **Step 2: Verificar informe de cobertura/indexacion**
  - Ir a GSC > Paginas (o Indexacion > Paginas)
  - Anotar cuantas paginas estan:
    - Indexadas (no enviadas en sitemap)
    - Indexadas (enviadas en sitemap)
    - Rastreada, actualmente no indexada
    - Descubierta, actualmente no indexada
    - Excluida por "noindex"
    - Excluida por redireccion (301)
    - Soft 404
    - Duplicada (URL canonica alternativa)
  - **Exportar estos CSVs y compartirlos** — esta informacion es critica para saber POR QUE Google no indexa

- [ ] **Step 3: Solicitar indexacion de paginas clave**
  - En GSC > Inspeccion de URL, solicitar indexacion para estas paginas prioritarias (max ~10-20 por dia):

  **Prioridad 1 — Pillar pages:**
  ```
  https://patasyhogar.com/cuidados/guia-alimentacion-perros/
  https://patasyhogar.com/cuidados/guia-completa-alimentacion-gatos/
  https://patasyhogar.com/cuidados/guia-completa-higiene-grooming-perros/
  https://patasyhogar.com/cuidados/guia-completa-higiene-cuidado-gatos/
  https://patasyhogar.com/cuidados/guia-completa-paseo-viaje-perros/
  https://patasyhogar.com/cuidados/guia-completa-juguetes-enriquecimiento-mascotas/
  https://patasyhogar.com/cuidados/guia-completa-hogar-seguro-mascotas/
  https://patasyhogar.com/cuidados/guia-completa-salud-bienestar-perros/
  https://patasyhogar.com/cuidados/guia-completa-salud-bienestar-gatos/
  ```

  **Prioridad 2 — Category pages:**
  ```
  https://patasyhogar.com/higiene/
  https://patasyhogar.com/hogar/
  https://patasyhogar.com/juguetes/
  https://patasyhogar.com/paseo/
  https://patasyhogar.com/perros/
  https://patasyhogar.com/gatos/
  ```

  **Prioridad 3 — Articulos con mas potencial SEO** (elegir 10-15 con keywords de mayor volumen de `seo-keywords.csv`)

- [ ] **Step 4: Verificar canonicals**
  - Usar "Inspeccion de URL" en GSC para 5-10 articulos y confirmar que:
    - La URL canonica declarada coincide con la URL inspeccionada
    - No hay duplicados canonicos
    - El estado es "URL is on Google" o "URL can be indexed"

---

### Task 5: Reforzar internal linking desde paginas ya indexadas

**Contexto:** Google ya ha rastreado estas paginas clave:
- Homepage `/`
- `/alimentacion/`
- `/cuidados/`
- 22 articulos individuales

Las paginas NO rastreadas necesitan ser enlazadas desde las YA rastreadas para que Google las descubra.

**Files:**
- Modify: `src/pages/index.astro` (verificar que enlaza a TODAS las categorias)
- Modify: `src/pages/[categoria]/index.astro` (verificar que lista TODOS los articulos)
- Verify: articulos existentes tienen internal links

- [ ] **Step 1:** Verificar que la homepage enlaza a todas las categorias:

```bash
grep -c "alimentacion\|higiene\|paseo\|juguetes\|hogar\|cuidados\|perros\|gatos" src/pages/index.astro
```

- [ ] **Step 2:** Verificar que las category pages listan TODOS los articulos de esa categoria (no solo los destacados o los ultimos N):

```bash
# Revisar si hay limit o slice en la query de articulos
grep -n "slice\|limit\|filter\|length" src/pages/\[categoria\]/index.astro
```

- [ ] **Step 3:** Verificar que `/cuidados/index.astro` lista TODOS los articulos informativos (no solo un subconjunto):

```bash
grep -n "slice\|limit\|filter\|length" src/pages/cuidados/index.astro
```

- [ ] **Step 4:** Verificar internal linking en los 22 articulos ya indexados — deben enlazar a articulos NO indexados del mismo cluster:

```bash
# Ejemplo: verificar links internos en un articulo indexado
grep -c "patasyhogar.com\|](/\|href=\"/" src/content/articulos/mejor-comedero-automatico-perros-app.mdx
```

- [ ] **Step 5:** Si se detectan paginas de categoria que NO listan todos los articulos, corregir la query para que muestre el listado completo.

---

### Task 6: Anadir pagina de actualizaciones como hub de descubrimiento

**Contexto:** Una pagina de "ultimas actualizaciones" o "changelog" enlaza a todos los articulos recientes, dando a Google un punto de entrada adicional.

**Files:**
- Verify: `src/pages/actualizaciones.astro` (ya existe)

- [ ] **Step 1:** Verificar que `actualizaciones.astro` lista articulos y que esta enlazada desde el footer o la navegacion

- [ ] **Step 2:** Si la pagina no esta enlazada desde la navegacion, anadir un link en el footer

- [ ] **Step 3:** Verificar que esta incluida en el sitemap (no filtrada en `astro.config.mjs`)

---

## Fase 3: Optimizaciones adicionales de crawl

### Task 7: Verificar que no hay soft 404s ni errores de rastreo

- [ ] **Step 1 (manual - usuario):** En GSC, ir a Paginas > filtrar por "Soft 404" y "Error del servidor (5xx)". Exportar la lista si hay resultados.

- [ ] **Step 2 (manual - usuario):** En GSC, ir a Paginas > filtrar por "Rastreada, actualmente no indexada". Exportar la lista. Estas son paginas que Google rastreo pero decidio NO indexar — puede indicar thin content o problemas de calidad.

- [ ] **Step 3:** Si hay articulos en "Rastreada, actualmente no indexada", revisar su contenido:
  - Tiene suficientes palabras (min 2000 para comparativas)?
  - Tiene contenido unico o es muy similar a otro articulo?
  - El titulo y H1 son coherentes?

---

### Task 8: Ping al sitemap tras deploy

**Files:**
- Modify: `package.json` (opcional) o documentar como paso manual

- [ ] **Step 1:** Despues de cada deploy, hacer ping al sitemap para notificar a Google:

```bash
curl "https://www.google.com/ping?sitemap=https://patasyhogar.com/sitemap-index.xml"
```

- [ ] **Step 2:** Opcionalmente, anadir esto como script post-deploy:

```json
{
  "scripts": {
    "ping-sitemap": "curl -s 'https://www.google.com/ping?sitemap=https://patasyhogar.com/sitemap-index.xml' && echo ' Sitemap pinged'"
  }
}
```

---

## Fase 4: Monitoreo (2-4 semanas despues)

### Task 9: Seguimiento de progreso

- [ ] **Step 1 (semana 1):** Re-exportar los CSVs de GSC y comparar:
  - Paginas indexadas: antes vs ahora
  - Paginas rastreadas del sitemap: antes (28) vs ahora
  - URLs fantasma: antes (55) vs ahora

- [ ] **Step 2 (semana 2):** Verificar en GSC:
  - Las pillar pages estan indexadas?
  - Las category pages estan indexadas?
  - Los redirects 301 han sido procesados? (las URLs antiguas deberian desaparecer)

- [ ] **Step 3 (semana 4):** Evaluacion completa:
  - Si la indexacion ha mejorado significativamente (>60% del sitemap), el problema era crawl budget
  - Si NO ha mejorado, investigar:
    - Problemas de calidad de contenido (thin content)
    - Problemas de canonicalizacion
    - Penalizacion manual (GSC > Seguridad y acciones manuales)

---

## Resumen de impacto esperado

| Accion | Impacto esperado |
|--------|-----------------|
| Eliminar 644 tag pages | Google deja de rastrear ~38 tags, libera crawl budget para articulos |
| Anadir 2+ redirects faltantes | Google deja de rastrear URLs muertas y sigue los redirects |
| Solicitar indexacion en GSC | Aceleracion directa de rastreo para paginas clave |
| Reforzar internal linking | Google descubre articulos no rastreados via links desde paginas ya indexadas |
| Ping sitemap tras deploy | Google se entera mas rapido de cambios |

**Meta realista:** Pasar de 28 URLs del sitemap rastreadas (19%) a 80-100 (55-69%) en 4 semanas, y >120 (83%) en 8 semanas.
