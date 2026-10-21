# S20 — Small-breed puppy food comparison

## Objective and authorization

Prepare the weekly Spanish comparison, scheduled 2026-10-19, for local human review.
User requested this week's article and authorized Pexels with the configured key.
No push, PR, merge, publication, or unrelated changes. RDD explicitly off.
Branch: feat/pienso-cachorro-raza-pequena-s20, based on main 94d44a0.
Preserve existing odd/tasks/collares-adiestramiento-s17.md edits and untracked .atl/.

## Requirements

- Distinguish puppy small/toy breed nutrition from adult mini and large-breed puppies.
- Verify every product identity, pack, price, image and link; never invent missing data.
- Amazon API first; fallback permitted public sources only when API unavailable.
- Verify final products individually in Tiendanimal; no Zooplus.
- Primary source-backed feeding guidance; no fictional experience, tests or ratings.
- Spain Spanish, humanizer, author/tone guidance, approximately 2000–3000 useful words.
- Unique relevant hero, valid metadata, FAQs, internal links, low affiliate density.
- Editorial records remain human-review; human review and publication are separate.

## Delivery policy

Forecast: 340–390 authored changed lines, excluding binary image/generated assets.
Delivery strategy: ask-on-risk; ask once for chain strategy before exceeding ~400.
Local work-unit commits only, explicit owned paths; record observed identities here.
Editorial exception to test-first: prose has no meaningful deterministic RED test.
Checks: npm run build; node scripts/check-affiliate-density.mjs;
node scripts/check-no-zooplus-public.mjs; git diff --check; rendered article inspection.
Rollback boundary: only S20 brief, article, hero, and matching editorial records.

## Tasks

- [x] T1 — Prepare verified source/SERP/product ledger and unique hero.
  Route: delegated; broad editorial research and execution require bounded workers.
  Scope: docs/brief-s20-pienso-cachorro-raza-pequena.md and
  public/images/articulos/pienso-cachorro-raza-pequena.webp.
  Also authorized: public/images/productos/s20-{royal-canin-mini-puppy,
  advance-puppy-mini,purina-small-mini-puppy,hills-puppy-small-mini}.webp.
  Acceptance: real SERP, verified factual/product evidence, inspected unique hero.
  Observed: 89-line source/SERP brief, inspected unique 800x534 hero and four
  nonblank 400x400 product images. Price/formula gaps explicitly retained.
  git diff --check passed; build not applicable before article exists.
- [ ] T2 — Draft coherent comparison and update matching editorial records.
  Route: delegated article-writer, then one bounded tracking worker.
  Scope: src/content/articulos/mejor-pienso-cachorro-raza-pequena.mdx;
  docs/PLAN_EDITORIAL_v7.md; .seo-engine/data/{content-map,content-queue,topic-clusters}.yaml;
  .seo-engine/data/seo-keywords.csv; .seo-engine/logs/changelog.md.
  Acceptance: sourced prose, complete verified products, no fabricated experiences,
  human-review state, title <=60 and description <=155 characters.
- [ ] T3 — Verify build, content constraints and rendered page; local handoff.
  Route: delegated; command execution and independent verification as applicable.
  Acceptance: observed checks, honest gaps, local work-unit commit, no remote Git.

## Evidence and progress

- 2026-10-21: plan line 48 and q_013 identify S20; permanent calendar advance
  already applied. Existing large-breed puppy/adult mini guides remain distinct.
- Google ES real browser SERP captured for 'pienso cachorro raza pequeña' and
  'mejor pienso cachorro raza pequeña'. Shopping/retail intent; PAA asks best
  puppy food/brands. No AI Overview observed. Surfer displays 0/N/A for exact
  queries; historical planned volume 260 must not be represented as current.
- API attempt inside sandbox: fetch failed; network-permitted retry returned
  AssociateNotEligible (requires 10+ qualified sales in last 30 days). No fields.
- Public primary-source and retailer fallback research underway.
- User authorized Pexels with configured project key, this article only.
- Engram initial mirror saved as observation 554 and read back successfully.
- Four manufacturer/retailer candidates verified; public Amazon listings remain
  inaccessible. Tiendanimal-only comparison is acceptable; use local product images.
- Advance composition/price sources conflict; omit exact composition and prices
  until reconciled, never combine older retailer formula with current manufacturer.
- ComparisonTable requires ratings and always emits Review. Use a plain comparison
  table with existing affiliate URL helper to avoid inventing a rating/schema.

## Next step

Draft the documentary comparison from verified ledger, with no fabricated
ratings, no Amazon links, and no unresolved Advance price/composition figures.
