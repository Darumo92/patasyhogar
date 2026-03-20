---
name: Product change checklist
description: When adding or changing a product ASIN, always verify and update ALL product info (image, price, name, description, article text)
type: feedback
---

When adding or changing any product ASIN in an article, ALWAYS verify and update ALL of the following:
1. **Nombre** — must match the real Amazon product name
2. **Imagen** — must be the real image from the Amazon product page (run validate-products.mjs --fix --article <slug>)
3. **Precio** — must reflect the current Amazon.es price (rounded format ~XX€)
4. **puntosFuertes** — must describe the real product's features, not the old one
5. **Article body text** — any detailed review section, comparison tables, summary tables, and FAQs mentioning the product must be updated
6. **Verify the product fits the article topic** — e.g., don't put an Obesity food in a Diabetic article

**Why:** We had 15+ products where the ASIN was changed but the name/description still referred to the old product, causing inaccurate information on the site.

**How to apply:** After any ASIN change, grep the file for the old product name to ensure no stale references remain. Run `node scripts/validate-products.mjs --fix --article <slug>` to update images and prices automatically.
