---
name: Always verify product images
description: Every product change must include image verification - check if image exists, loads correctly, and matches the product
type: feedback
---

ALWAYS ask the user to verify product images, just like prices. Never assume an image is correct.

**Why:** User has had to remind multiple times that images were missing, broken, or didn't match the product. Even when ASINs don't change, the image might not match. The user wants to verify images the same way they verify prices — by being asked explicitly.

**How to apply:**
- When verifying Amazon ASINs: ask for BOTH price AND image URL in the same request
- When changing a product: always ask user for the new image URL
- When a product has no image: ask the user for the image URL right away
- When using images from non-Amazon sources (Zooplus, Tiendanimal): ask user to provide the image URL
- Never leave a product without a user-verified image
- Format: pass the Amazon link and ask "¿Precio e imagen?" so the user can check both at once
- CSP only allows images from 'self' and m.media-amazon.com — NEVER use image URLs from other domains (Zooplus, Tiendanimal, amascotados, etc.) directly in articles. They will be blocked by CSP.
- For products without Amazon: download the image locally to public/images/productos/ and reference as /images/productos/filename.jpg
- Always verify that the image actually renders on the live site, not just that the URL returns 200
- ALWAYS check that EVERY product in the ComparisonTable has an imagen field — never leave a product without image
- Before committing, grep for products without imagen to catch missing ones
