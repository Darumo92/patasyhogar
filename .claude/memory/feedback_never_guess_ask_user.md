---
name: Never guess data - always ask user
description: CRITICAL - Never invent prices, images, specs or any product data. If unable to verify, ASK the user.
type: feedback
---

NEVER guess or approximate any product data. If I cannot verify a piece of information (price, image URL, ASIN, product specs, store availability, dimensions), I MUST ask the user to verify it.

This applies to:
- Prices on Amazon.es (blocked by CAPTCHA)
- Prices on Tiendanimal/Zooplus (WebFetch often returns wrong product)
- Amazon product image URLs (can't scrape)
- Product availability/stock status
- Product specifications (dimensions, weight, etc.)

**Why:** User explicitly said "nunca te inventes nada y si no puedes conseguirlo dímelo". Guessing prices or using approximate data leads to incorrect information on the site.

**How to apply:** When I can't verify data through web search/fetch, immediately ask the user: "Can you check [specific URL] and give me [specific data]?" Don't put placeholder or approximate values.
