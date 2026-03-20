---
name: Product review full checklist
description: CRITICAL - Every product MUST have an image. Every product change MUST update ALL fields. Verify BEFORE committing.
type: feedback
---

MANDATORY checklist for EVERY product in ComparisonTable/TopPick - run through this BEFORE committing:

1. **imagen** - EVERY product MUST have a working image URL. No exceptions.
   - Amazon CDN URLs (m.media-amazon.com) are preferred as they allow hotlinking
   - Manufacturer websites (ruffwear.com, 4knines.com etc.) BLOCK hotlinking — never use them
   - If Amazon blocks access to get image URLs, ASK THE USER to provide them
   - Never commit a product without a verified working image
2. ASIN/enlaceAmazon - correct product link
3. nombre - matches real product
4. precio - verified from real source (official store, retailer, price comparison)
5. precioAmazon, precioZooplus, precioTiendanimal - per-store prices where available
6. puntosFuertes - match real product specs (dimensions, weight capacity, materials)
7. enlaceZooplus, enlaceTiendanimal - **ALWAYS search all 3 stores for EVERY product** before committing. Ask user to verify prices if scraping fails.
   - **ORDER OF OPERATIONS**: First verify ALL Amazon ASINs and replace unavailable products. THEN search Zooplus/Tiendanimal for the FINAL product list. This avoids wasting time searching other stores for products that get replaced.
8. All text mentions in article body
9. Specs table row
10. **NEVER skip checking Zooplus and Tiendanimal** - this was forgotten multiple times

**Why:** User corrected MULTIPLE TIMES that:
- Images were missing for products (Ruffwear, 4Knines had no image field at all)
- Old images were kept when ASIN was changed (Catit Vesper, Feandrea)
- Manufacturer website images don't work (hotlinking blocked)
- Product descriptions didn't match the actual product linked

**How to apply:** After editing any product data, scan the ENTIRE ComparisonTable for products without `imagen:` field. If you can't get an Amazon image URL, ask the user to provide it. Do NOT commit products without working images.
