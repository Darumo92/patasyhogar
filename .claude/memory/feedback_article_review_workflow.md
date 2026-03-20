---
name: Article review workflow
description: Complete step-by-step workflow for reviewing all 109 articles one by one for excellence - 36/109 done as of 2026-03-18
type: feedback
---

## Article Review Workflow

Reviewing all articles one by one for excellence. **36 done, 73 remaining** (as of 2026-03-18).

### Steps per article:

1. **Read the full article** — understand all products, prices, links, structure, and content quality
2. **Verify what each product actually IS** — don't trust the article's description blindly
3. **Verify ALL Amazon ASINs** — pass links (not bare ASINs) to user to check price, availability AND image
   - If price matches article: ✓
   - If price differs: update
   - If "Precio no disponible": find replacement or remove
   - If ASIN doesn't exist: find alternative ASIN or remove
4. **When replacing a product, update EVERYTHING**: ASIN, name, image, price, description, puntosFuertes, and all text mentions
5. **Verify product images** — ask user for BOTH price AND image in the same request
6. **Search Zooplus and Tiendanimal** — AFTER finalizing Amazon products. Search EACH product INDIVIDUALLY by name (site:zooplus.es "product name"), never generic category searches
   - Verify each URL with WebFetch to confirm it's the right product and get the price
   - Only add links that are verified — NEVER invent URLs
7. **Add per-store pricing** — precioAmazon, precioZooplus, precioTiendanimal in ComparisonTable and TopPick
8. **Remove redundant AffiliateButton groups** — the ComparisonTable already has buy buttons
9. **Remove AffiliateButton import** if no longer used
10. **Fix price consistency** — prices must match between ComparisonTable, TopPick, text mentions, and markdown tables
11. **Check content quality** — products in correct sections, descriptions accurate, SEO, structure
12. **Convert duplicate markdown tables** to specs-only (no prices that could get out of sync)
13. **Update title year** if it contains 2025 → 2026
14. **Do NOT add actualizadoEn** — bulk updates trigger Google freshness spam signal
15. **Build and push** after each article: `npm run build` then `git add` + `git commit` + `git push`
16. **Post a summary** of all changes made to the article

### Order of verification:
- First: ALL Amazon ASINs (batch them, pass as clickable links, ask price + image)
- Second: Find replacements for unavailable products (ask user for price + image)
- Third: Search Zooplus/Tiendanimal INDIVIDUALLY for each product in the FINAL lineup
- Fourth: Verify each store URL with WebFetch (correct product, not generic page)
- Fifth: Apply all changes at once

### Key rules:
- NEVER guess prices, URLs, or images — always verify or ask user
- NEVER invent Zooplus/Tiendanimal URLs — only use verified ones
- ALWAYS pass Amazon links as full URLs (https://www.amazon.es/dp/ASIN), not bare ASINs
- ALWAYS ask for price AND image together
- ALWAYS search each product individually by name in each store (not generic searches)
- ALWAYS verify store URLs point to the correct product (not a generic category page)
- For vet/pharmacy products (antiparasitarios, medicamentos): convert to text descriptions without ComparisonTable if no store links available
- Image from Zooplus/Tiendanimal is OK if Amazon image not available
- When a product isn't available anywhere: remove it, don't leave broken links
- Check that products are classified in the correct section of the article

### Articles reviewed (36):
1. alfombras-olfato-perros ✓
2. alfombrilla-refrigerante-perros ✓
3. alimentos-prohibidos-perros ✓ (informativo)
4. alimentos-toxicos-gatos ✓ (informativo)
5. arbol-rascador-pequeno-pisos ✓
6. asiento-coche-perro ✓
7. cachorro-primeras-semanas-casa ✓ (informativo)
8. cepillos-quitar-pelo-perro-sofa ✓
9. champu-perros-piel-sensible ✓
10. collar-antiladridos-perros ✓
11. collar-gps-gato ✓
12. como-adiestrar-gato-tecnicas ✓ (informativo)
13. como-banar-gato ✓ (informativo)
14. como-cortar-unas-gato ✓ (informativo)
15. como-eliminar-pulgas-perro-casa ✓ (informativo)
16. como-limpiar-dientes-perro ✓ (informativo)
17. como-limpiar-oidos-perro ✓
18. como-presentar-perro-gato ✓ (informativo)
19. como-saber-edad-gato ✓ (informativo)
20. como-socializar-cachorro ✓ (informativo)
21. comparativa-fuentes-agua-gatos ✓
22. correa-extensible-perros ✓
23. mejor-antiparasitario-gatos-guia ✓
24. mejor-antiparasitario-perros-guia ✓
25. mejor-arenero-arena-gatos ✓
26. mejor-arnes-antitirones-perro ✓
27. mejor-arnes-gato-pasear ✓
28. mejor-arnes-perro ✓
29. mejor-aspirador-pelo-mascotas ✓
30. mejor-bebedero-perros-guia ✓
31. mejor-bozal-perro ✓
32. mejor-cama-gato-guia ✓
33. mejor-cama-perro-guia ✓
34. mejor-cepillo-dientes-perros ✓
35. mejor-abrigo-perro-invierno ✓ (prev session)
36. jaula-perro-casa-coche ✓ (prev session)

### Next article to review: mejor-cepillo-gatos
