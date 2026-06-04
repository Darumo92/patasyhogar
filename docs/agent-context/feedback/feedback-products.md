# Feedback: Products

## Always verify product images

ALWAYS ask the user to verify product images, just like prices. Never assume an image is correct.

**Why:** User has had to remind multiple times that images were missing, broken, or didn't match the product. Even when ASINs don't change, the image might not match. The user wants to verify images the same way they verify prices — by being asked explicitly.

**How to apply:**
- When verifying Amazon ASINs: ask for BOTH price AND image URL in the same request
- When changing a product: always ask user for the new image URL
- When a product has no image: ask the user for the image URL right away
- When using images from non-Amazon sources (Tiendanimal or other retailers): ask user to provide the image URL
- Never leave a product without a user-verified image
- Format: pass the Amazon link and ask "¿Precio e imagen?" so the user can check both at once
- CSP only allows images from 'self' and m.media-amazon.com — NEVER use image URLs from other domains (Tiendanimal, amascotados, etc.) directly in articles. They will be blocked by CSP.
- For products without Amazon: download the image locally to public/images/productos/ and reference as /images/productos/filename.jpg
- Always verify that the image actually renders on the live site, not just that the URL returns 200
- ALWAYS check that EVERY product in the ComparisonTable has an imagen field — never leave a product without image
- Before committing, grep for products without imagen to catch missing ones

## Ask user for Amazon image URLs

Amazon blocks all attempts to scrape product image URLs (CAPTCHA on all regions). When a product needs an Amazon image URL (m.media-amazon.com/images/I/...), ASK THE USER directly to provide it.

**Why:** Wasted significant time trying to extract Amazon image URLs via web search, WebFetch, third-party sites, etc. None work. Manufacturer website images also fail due to hotlinking protection.

**How to apply:** When reviewing an article and a product needs a new/updated image, immediately ask the user: "Can you give me the Amazon image URL for [product name] at [Amazon URL]?" Don't try to find it yourself.

## Product change checklist

When adding or changing any product ASIN in an article, ALWAYS verify and update ALL of the following:
1. **Nombre** — must match the real Amazon product name
2. **Imagen** — must be the real image from the Amazon product page (run validate-products.mjs --fix --article <slug>)
3. **Precio** — must reflect the current Amazon.es price (rounded format ~XX€)
4. **puntosFuertes** — must describe the real product's features, not the old one
5. **Article body text** — any detailed review section, comparison tables, summary tables, and FAQs mentioning the product must be updated
6. **Verify the product fits the article topic** — e.g., don't put an Obesity food in a Diabetic article

**Why:** We had 15+ products where the ASIN was changed but the name/description still referred to the old product, causing inaccurate information on the site.

**How to apply:** After any ASIN change, grep the file for the old product name to ensure no stale references remain. Run `node scripts/validate-products.mjs --fix --article <slug>` to update images and prices automatically.

## Product review full checklist

MANDATORY checklist for EVERY product in ComparisonTable/TopPick - run through this BEFORE committing:

1. **imagen** - EVERY product MUST have a working image URL. No exceptions.
   - Amazon CDN URLs (m.media-amazon.com) are preferred as they allow hotlinking
   - Manufacturer websites (ruffwear.com, 4knines.com etc.) BLOCK hotlinking — never use them
   - If Amazon blocks access to get image URLs, ASK THE USER to provide them
   - Never commit a product without a verified working image
2. ASIN/enlaceAmazon - correct product link
3. nombre - matches real product
4. precio - verified from real source (official store, retailer, price comparison)
5. precioAmazon, precioTiendanimal - per-store prices where available
6. puntosFuertes - match real product specs (dimensions, weight capacity, materials)
7. enlaceTiendanimal - search Tiendanimal for products that fit that store before committing. Ask user to verify prices if scraping fails.
   - **ORDER OF OPERATIONS**: First verify ALL Amazon ASINs and replace unavailable products. THEN search Tiendanimal for the FINAL product list. This avoids wasting time searching other stores for products that get replaced.
8. All text mentions in article body
9. Specs table row
10. **NEVER skip checking Tiendanimal when relevant** - this was forgotten multiple times

**Why:** User corrected MULTIPLE TIMES that:
- Images were missing for products (Ruffwear, 4Knines had no image field at all)
- Old images were kept when ASIN was changed (Catit Vesper, Feandrea)
- Manufacturer website images don't work (hotlinking blocked)
- Product descriptions didn't match the actual product linked

**How to apply:** After editing any product data, scan the ENTIRE ComparisonTable for products without `imagen:` field. If you can't get an Amazon image URL, ask the user to provide it. Do NOT commit products without working images.

## Añadir productos al registro del quiz

Al crear o modificar artículos comparativos, SIEMPRE añadir los productos al registro centralizado en `src/content/productos/[categoria].yaml` con sus filtros y afinidad para el quiz/recomendador.

**Why:** El recomendador universal en `/elegir/` se alimenta del registro de productos. Si un producto está en un artículo pero no en el registro, no aparece en las recomendaciones. El usuario quiere que el recomendador cubra TODA la web sin dejar nada fuera.

**How to apply:** En el checklist de creación/revisión de artículos, después de verificar productos y hacer build, añadir los productos al YAML correspondiente en `src/content/productos/` con id, datos de tiendas, categoría, subcategoría, animal, articuloSlug, descripcionCorta, filtros y afinidad.

## MANDATORY: search each product in Tiendanimal

MANDATORY STEP: For EVERY article review, search each product individually in Tiendanimal BEFORE committing when it is a product Tiendanimal plausibly sells. This is not optional for relevant products and should not need to be reminded by the user.

**Why:** The user has had to remind multiple times that products weren't searched in other stores. Products from brands like Feliway, Trixie, Julius-K9, Earth Rated, Moser, etc. are often available in Tiendanimal at different prices. Missing these links means the reader doesn't see another useful buying option.

**How to apply:**
1. After verifying all Amazon ASINs/prices/images, search each relevant product in Tiendanimal
2. Search individually by product name: `site:tiendanimal.es "[product name]"`
3. If search returns a URL, verify with WebFetch to confirm product and get price
4. Also verify what the product actually IS — don't trust the article's description
5. Never assume a product isn't available just because a generic category search didn't show it
6. Search by brand name too if the specific product name doesn't work
7. This step comes AFTER Amazon verification and BEFORE committing changes
8. Do NOT ask the user "should I search other stores?" — just do it for Tiendanimal when relevant
9. Zooplus is disabled from 2026-06-04: do not search, add, or render Zooplus unless the user explicitly reactivates it.

## TopPick is editorial, ComparisonTable has store links

The TopPick component must not render store links. Store links for article products belong in ComparisonTable.

**Why:** The TopPick is the most prominent product on the page. Repeating store buttons there and again in ComparisonTable makes articles feel too affiliate-heavy.

**How to apply:**
- Keep TopPick focused on name, image, description and price.
- Add verified Amazon/Tiendanimal links to ComparisonTable only.
- Before committing, run `node scripts/check-affiliate-density.mjs`.

## Usar Amazon API para productos

La cuenta de Amazon API ya es elegible y `scripts/amazon-api.mjs` funciona con las credenciales de `.env` (`AMAZON_CLIENT_ID`, `AMAZON_CLIENT_SECRET`). Para cualquier artículo nuevo o revisión de productos, usar la API como fuente principal de datos Amazon antes de pedir precio, título, imagen o URL al usuario.

**How to apply:**
- Para verificar ASINs existentes: `node scripts/amazon-api.mjs ASIN1 ASIN2 ...` (máximo 10 por llamada).
- Para buscar candidatos: `node scripts/amazon-api.mjs --search "keyword producto"`.
- Usar de la API: título real, ASIN, URL afiliada, precio, disponibilidad, imagen `m.media-amazon.com`, features/descripción si el recurso la devuelve, y reseñas/valoraciones si están disponibles.
- No inventar specs ni reseñas si la API no devuelve ese campo.
- Si la API devuelve datos incompletos, pedir al usuario solo el dato faltante o verificar por otra fuente permitida.
- En MDX mantener `enlaceAmazon` como `/dp/ASIN` o URL directa sin `?tag=patasyhogar-21`; los componentes añaden el tag automáticamente.
- Para imágenes Amazon, optimizar a `_AC_SL300_` cuando se usen en artículos.
- Ejecutar auditoría mensual de productos con `npm run audit:amazon`; semanalmente revisar una muestra de artículos prioritarios o tocados recientemente.
- Para precios, imágenes y disponibilidad volátiles, usar el cache central `src/data/amazon-products.json` generado con `npm run update:amazon-cache` en vez de retocar todos los MDX.

**Resultado validado 2026-05-15:**
- La API devolvió título, precio, imagen y URL afiliada para ASINs reales del sitio.
- El script fue corregido para leer precio en `offersV2.listings[0].price.money.displayAmount`.
- No apareció `AssociateNotEligible`, así que la cuenta es utilizable.

## Verify product names match ASINs

When passing ASINs to the user for price/image verification, ALSO ask them to confirm the product name is correct.

**Why:** Multiple articles had wrong product names for their ASINs. Examples: "Trixie Comedero con Foso" was actually "Nayeco Antihormigas Inox", "Van Ness Anti-Ant" was actually "GP GP10060", "Safari De-matting Comb" was actually "Hertzko Cortanudos". Wrong names mislead readers and hurt credibility.

**How to apply:**
- BEFORE searching in Tiendanimal, verify ALL product names match their ASINs using WebSearch ("ASIN" amazon.es)
- Don't rely on the article's product names — verify each one independently
- When sending ASINs to user for price/image, also verify the name yourself via WebSearch
- If a name is wrong, fix it immediately in ComparisonTable, TopPick, and all text mentions
- This step goes AFTER Amazon price verification and BEFORE Tiendanimal search
