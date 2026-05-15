---
name: Usar Amazon API para productos
description: Desde 2026-05-15, al crear o revisar artículos comparativos usar primero scripts/amazon-api.mjs para verificar productos Amazon antes de pedir datos al usuario.
type: feedback
---

La cuenta de Amazon API ya es elegible y `scripts/amazon-api.mjs` funciona con las credenciales de `.env` (`AMAZON_CLIENT_ID`, `AMAZON_CLIENT_SECRET`). Para cualquier artículo nuevo o revisión de productos, usar la API como fuente principal de datos Amazon antes de pedir precio, título, imagen o URL al usuario.

## How to apply

- Para verificar ASINs existentes: `node scripts/amazon-api.mjs ASIN1 ASIN2 ...` (máximo 10 por llamada).
- Para buscar candidatos: `node scripts/amazon-api.mjs --search "keyword producto"`.
- Usar de la API: título real, ASIN, URL afiliada, precio, disponibilidad, imagen `m.media-amazon.com`, features/descripción si el recurso la devuelve, y reseñas/valoraciones si están disponibles.
- No inventar specs ni reseñas si la API no devuelve ese campo.
- Si la API devuelve datos incompletos, pedir al usuario solo el dato faltante o verificar por otra fuente permitida.
- En MDX mantener `enlaceAmazon` como `/dp/ASIN` o URL directa sin `?tag=patasyhogar-21`; los componentes añaden el tag automáticamente.
- Para imágenes Amazon, optimizar a `_AC_SL300_` cuando se usen en artículos.
- Ejecutar auditoría mensual de productos con `npm run audit:amazon`; semanalmente revisar una muestra de artículos prioritarios o tocados recientemente.
- Para precios, imágenes y disponibilidad volátiles, usar el cache central `src/data/amazon-products.json` generado con `npm run update:amazon-cache` en vez de retocar todos los MDX.

## Resultado validado 2026-05-15

- La API devolvió título, precio, imagen y URL afiliada para ASINs reales del sitio.
- El script fue corregido para leer precio en `offersV2.listings[0].price.money.displayAmount`.
- No apareció `AssociateNotEligible`, así que la cuenta es utilizable.
