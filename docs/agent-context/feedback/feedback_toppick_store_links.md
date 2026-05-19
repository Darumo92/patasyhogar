---
name: TopPick must have same store links as ComparisonTable
description: When a product has Zooplus/Tiendanimal links in ComparisonTable, the TopPick for the same product must also include those links
type: feedback
---

The TopPick component must include ALL store links (enlaceZooplus, enlaceTiendanimal, precioZooplus, precioTiendanimal) that the same product has in the ComparisonTable.

**Why:** The TopPick is the most prominent product on the page. If it only shows Amazon but the ComparisonTable shows 3 stores, it's inconsistent and the user misses the best price option.

**How to apply:**
- When adding multi-store links to a product in ComparisonTable, ALWAYS check if the same product is also the TopPick
- If it is, copy the same enlaceZooplus/enlaceTiendanimal/precioZooplus/precioTiendanimal to the TopPick
- Before committing, verify TopPick has the same store links as its ComparisonTable counterpart
