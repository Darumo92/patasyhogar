# S20 — Small-breed puppy food comparison

## Objective and authorization

Prepare the weekly Spanish comparison, scheduled 2026-10-19; user approved main publication2026-10-21.
User requested this week's article and authorized Pexels with the configured key.
User explicitly authorized main integration/push and browser/local-server cleanup. Parent owns Git delivery; deployment confirmation pending. No unrelated changes. RDD explicitly off.
Branch: feat/pienso-cachorro-raza-pequena-s20, based on main 94d44a0.
Preserve existing odd/tasks/collares-adiestramiento-s17.md edits and untracked .atl/.

Correction authorized2026-10-21: user requires Amazon affiliate links because Amazon
generates the revenue. Use Playwright when the API is unavailable. Existing GitHub
main/HTTPS publication authorization persists for this same S20 correction.
Correction branch: fix/s20-amazon-affiliate-links, based on main abd834b.

## Requirements

- Distinguish puppy small/toy breed nutrition from adult mini and large-breed puppies.
- Verify every product identity, pack, price, image and link; never invent missing data.
- Amazon API first; fallback permitted public sources only when API unavailable.
- Verify final products individually in Tiendanimal; no Zooplus.
- Amazon purchase links are a core acceptance requirement; a retailer-only fallback
  does not satisfy the commercial objective. Ask only for genuinely blocked fields.
- Store clean ASIN/product URLs in MDX; append patasyhogar-21 through rendering code.
- Primary source-backed feeding guidance; no fictional experience, tests or ratings.
- Spain Spanish, humanizer, author/tone guidance, approximately 2000–3000 useful words.
- Unique relevant hero, valid metadata, FAQs, internal links, low affiliate density.
- S20 publication approved2026-10-21; trackers record published approval, remote delivery/deployment pending.

## Delivery policy

Forecast: 340–390 authored changed lines, excluding binary image/generated assets.
Delivery strategy: exception-ok; explicit user instruction to send changes to main
supersedes pending chain-strategy choice and authorizes this delivery despite >400 authored lines.
Local work-unit commits only, explicit owned paths; record observed identities here.
Editorial exception to test-first: prose has no meaningful deterministic RED test.
Checks: npm run build; node scripts/check-affiliate-density.mjs;
node scripts/check-no-zooplus-public.mjs; git diff --check; rendered article inspection.
Rollback boundary: only S20 brief, article, hero, and matching editorial records.

## Tasks

- [x] T4 — Verify all four Amazon listings with Playwright and add primary Amazon CTAs.
  Route: delegated read-only product researcher, then one bounded implementation worker.
  Trigger: public product research plus cross-file affiliate link rendering change.
  Allowed: S20 MDX, existing narrow affiliate helper or new link component if required,
  S20 brief and only S20 editorial record notes that describe retailer coverage.
  Acceptance: actual Amazon product pages verified, exact formula/pack identified,
  four real tagged Amazon CTAs inside the table, retained Tiendanimal options,
  no guessed prices/ASINs, no invented ratings, no literal tag parameter in MDX.
  RED/GREEN: rendered-table assertion for four verified tagged Amazon product links;
  existing published table is expected to fail before the change.
  Observed: all four Amazon product pages opened with Playwright2026-10-21.
  ASINs: B005ZS7OUG (RoyalCanin800g), B00388OF7A (Advance3kg), B0117E8PNQ
  (PurinaOptiStart700g), B09Q8DVJRK (Hills6kg). PurinaHealthyStart remains a
  distinct Tiendanimal listing; no formula equivalence is asserted. Advance Amazon
  age2–10 is qualified separately from the manufacturer age1–10.
  RED: zero Amazon CTAs; GREEN: python /tmp/s20-amazon-check.py verifies four exact
  ASIN/tag/host/rel links, Amazon first, four retained Tiendanimal links and no raw
  MDX tag or fabricated ratings. New component appends the affiliate tag internally.
  Independent source/URL verification passed; original manufacturer budgets preserved.
  Work-unit commit:ff7fe50 (195 additions,38 deletions); integrated into main.
- [x] T5 — Build, inspect the complete corrected table in local Playwright and deliver.
  Route: delegated functional checks; parent browser spot check and Git delivery.
  Acceptance: build, density/no-Zooplus, rendered affiliate assertion, desktop/mobile
  table including both scroll ends, tagged hrefs, matching pack labels, closed owned
  browser/preview, scoped commits and authorized main push with observed evidence.
  Forecast for this correction: 130–200 authored changed lines; no unrelated UI fixes.
  Observed final build:173 pages,13 CSP hashes, headers unchanged. Density,
  no-Zooplus, whitespace, YAML and CSV195x17 checks passed. Prose2124 words.
  Parent repeated the rendered affiliate assertion (GREEN) and inspected desktop1440
  and mobile390 table captures, including both scroll ends and all four rows.
  Compact122x44 Amazon buttons are legible; no page overflow; all images load.
  Independent final component recheck passed. Parent browser closed gracefully;
  own preview20003 stopped with exit130 and localhost4321 refused connection (curl7).
  Functional and visual verification complete. Git push origin main succeeded
  abd834b..ff7fe50; local HEAD and origin/main both ff7fe50a1981cfcbc0b36d64c2877a3ff14c08e6.
  This work-unit closes T4/T5. Remote application deployment has not been verified.

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
  Local commit: 3ac52b3 (167 authored insertions, five image binaries).
  Native review: disabled/unmanaged; passive preparation structurally read back.
- [x] T2 — Draft coherent comparison and update matching editorial records.
  Route: delegated article-writer, then one bounded tracking worker.
  Scope: src/content/articulos/mejor-pienso-cachorro-raza-pequena.mdx;
  docs/PLAN_EDITORIAL_v7.md; .seo-engine/data/{content-map,content-queue,topic-clusters}.yaml;
  .seo-engine/data/seo-keywords.csv; .seo-engine/logs/changelog.md.
  Acceptance: sourced prose, complete verified products, no fabricated experiences,
  truthful approval state, title <=60 and description <=155 characters.
  Observed: documentary article and S20-only trackers prepared; user approved publication2026-10-21.
  Independent count: 1904 body + 139 FAQ = 2043 useful prose words, excluding
  headings/table/markup; title 43 and description 144 characters. Four verified
  Tiendanimal products, no Amazon identifiers or invented ratings.
  Local article/tracking work-unit commit: 90dd80c (288 additions, 23 deletions).
- [x] T3 — Verify build, content constraints and rendered page; local handoff.
  Route: delegated; command execution and independent verification as applicable.
  Acceptance: observed checks, honest gaps, scoped work-unit commit and authorized delivery only.
  Observed final build: 173 pages, 13 CSP hashes; public/_headers unchanged.
  Affiliate-density, no-Zooplus-public and git diff --check passed; parent
  repeated affiliate-density with exit 0. Three changed YAML files parsed;
  CSV has 195 data rows with 17 columns. Built canonical, five local images,
  four sponsored encoded CTAs and Article/FAQPage with four questions verified;
  no Review/ratingValue. Source allocations independently below 200 words each;
  Royal Canin conservative count below 190; corrected example uses 30 kg.
  Full browser walkthrough:13 desktop1440x1000/11517px and24 mobile390x844/17947px
  screenshots inspected, plus table ends/dark captures. Eight images load; no page
  overflow/cut/overlap. Four FAQ Enter toggles, seven TOC anchors, back-to-top,
  24 same-origin HTTP200 links and newsletter validation without submission verified.
  Two console errors originate from autofill extension. Follow-ups only: no table
  swipe hint, shared Header Escape and shared AuthorBox fictional experience claims;
  shared sources unchanged, fixes outside authorized scope. Browser page/tabs and own preview closed.
  Verification evidence included in work-unit commit 90dd80c. Main integrated by
  fast-forward from 94d44a0 to 90dd80c; remote push remains pending confirmation.
  Parent closed Playwright page/tabs; local port4321 connection refused (curl7).
  Native review remains disabled/unmanaged. No shared follow-up fixes were added.

## Evidence and progress

- 2026-10-21: plan line 48 and q_013 identify S20; permanent calendar advance
  already applied. Existing large-breed puppy/adult mini guides remain distinct.
- Google ES real browser SERP captured for 'pienso cachorro raza pequeña' and
  'mejor pienso cachorro raza pequeña'. Shopping/retail intent; PAA asks best
  puppy food/brands. No AI Overview observed. Surfer displays 0/N/A for exact
  queries; historical planned volume 260 must not be represented as current.
- API attempt inside sandbox: fetch failed; network-permitted retry returned
  AssociateNotEligible (requires 10+ qualified sales in last 30 days). No fields.
- Public primary-source and retailer fallback research completed in the brief.
- User authorized Pexels with configured project key, this article only.
- Engram initial mirror saved as observation 554 and read back successfully.
- Four manufacturer/retailer candidates verified; public Amazon listings remain
  inaccessible in the initial research. The retailer-only fallback was rejected by
  the user; Amazon monetization is required and T4/T5 reopen this feature.
- Advance composition/price sources conflict; omit exact composition and prices
  until reconciled, never combine older retailer formula with current manufacturer.
- ComparisonTable requires ratings and always emits Review. Use a plain comparison
  table with local CTAs matching the existing private Webgains URL format;
  no exported affiliate helper exists. This avoids invented ratings/schema.

## Next step

Original S20 push succeeded94d44a0..abd834b after explicit GitHub destination/HTTPS
credential confirmation. Browser and own preview were closed. T1/T2/T3 remain valid;
T4/T5 now correct missing Amazon monetization. Verify products through the authorized
Playwright fallback: complete. Scoped links, source checks, final build and local
visual verification are complete. Correction ff7fe50 is pushed to origin/main.
No implementation or Git delivery work remains; application deployment is unverified.
The prior automatic remote-operation rejection was resolved by user confirmation;
no new remote authorization question is needed for this same approved destination.
