# Checklist para artículos nuevos y revisiones

## Artículos nuevos

1. **Verificar que el tema no existe ya** — buscar en `src/content/articulos/` y proponer ampliar el existente si lo hay.
2. **URLs y productos Amazon reales** — usar `scripts/amazon-api.mjs`; nunca inventar ASINs/URLs/imágenes. Si un producto no existe, buscar reemplazo.
3. **Contenido extenso y de calidad SEO** — mínimo ~2000-3000 palabras por comparativa, introducción, H2/H3, comparativas, guía de compra, FAQs.
4. **Imagen única** — verificar duplicados con `md5sum public/images/articulos/*.webp | sort | awk '{print $1}' | uniq -d`. Específica y representativa.
5. **Campos correctos en `ComparisonTable`:**
   - `nombre: string`
   - `imagen: string`
   - `puntosFuertes: string` (NO array, NO `caracteristicas`, NO `descripcion`)
   - `precio: string` (ej `"~15E"`)
   - `enlaceAmazon: string` (`/dp/ASIN`)
   - `valoracion: number` (escala 1-5, NO `puntuacion`, NO escala 1-10)
6. **Optimización SEO** — título ≤ 60 chars, meta descripción ≤ 155 chars, FAQs con schema (3-5), internal linking, tags relevantes (3-6), `imagenAlt` descriptivo.
7. **Coherencia de experiencias personales:**
   - Grep de nombres propios (`Mango`, `Kira`, `Laura`, `Nala`, `Thor`, `Ana`, `Carlos`) en `src/content/articulos/`.
   - No contradecir anécdotas existentes.
   - Coherencia temporal, ubicación, personalidad.
   - No repetir anécdotas — variar usando quirks del perfil en `.seo-engine/config.yaml`.
   - Mango = tranquilo y territorial; Kira = nerviosa y tragona. No invertir rasgos.
8. **Rebuild tras cambios** — `npm run build`.

## Workflow de revisión de artículos existentes

### Contenido y estructura
- Productos en la categoría correcta.
- Descripciones coinciden con el producto real.
- Sin duplicados entre secciones.
- Flujo lógico.

### Productos y datos
1. Verificar todos los ASINs con `scripts/amazon-api.mjs`.
2. Si precio difiere: actualizar desde la API. Si no disponible: pedir solo el dato faltante, buscar reemplazo o eliminar.
3. Buscar cada producto en Tiendanimal cuando encaje con esa tienda.
4. Añadir `precioAmazon` y `precioTiendanimal` cuando estén verificados.
5. Precios consistentes en `ComparisonTable`, `TopPick`, texto y tablas markdown.

### SEO y calidad
- Título ≤ 60, meta ≤ 155, H2/H3 lógica, internal links, FAQs, tags, `imagenAlt`, sin relleno.

### Limpieza
- Eliminar imports no usados, grupos de botones redundantes, barras sticky de compra y tablas duplicadas con precios.
- No añadir `AffiliateButton` directo en MDX. `TopPick` no debe renderizar enlaces de tienda; los CTAs de compra van en `ComparisonTable`.

### Reglas de revisión
- **No** añadir `actualizadoEn` en revisiones masivas — solo cuando hay cambios reales.
- `npm run build` después de cada artículo revisado.
- Antes de push: siempre `npm run build` para actualizar CSP hashes.

## Calidad sobre velocidad

En cambios masivos, procesar pocos artículos a la vez y verificar calidad. No aplicar texto cookie-cutter idéntico.
