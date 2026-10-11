# S19 — Dog first aid guide

## Objective and authorized scope

Prepare next week's Spanish article locally for the 2026-10-12 editorial slot.
User explicitly prohibits push. No publishing, pull requests, merge, or remote Git.
RDD is explicitly off; do not initiate native review transitions.

## Requirements

- Informative guide: practical safe first aid while seeking veterinary care.
- Verify clinical claims against primary veterinary sources; no invented experience.
- Obtain actual Google ES SERP through Playwright and distinguish historical volume.
- Avoid cannibalization with poisoning, heatstroke, processionary caterpillar and forbidden-food guides.
- Apply Spain Spanish, humanizer and project humanization/tone guidance.
- Unique appropriate hero, accessible alt text, FAQs, internal links and valid frontmatter.
- Keep all editorial records at human-review/prepared status, never published.
- Preserve pre-existing S17 task edits and untracked .atl/.

## Delivery and check policy

Feature branch: feat/primeros-auxilios-perros-s19, based on local main.
Forecast: approximately 360–460 authored lines, excluding generated files/image.
Delivery strategy: ask-on-risk; user chose feature-branch-chain on 2026-10-11.
Provisional slices: research/hero preparation, article/editorial records, validation handoff.
Work-unit commits remain local. Native review: disabled/unmanaged.
Test-first exception: editorial content has no meaningful deterministic RED;
use source-led review, structural checks, existing build and content validators.
Applicable checks: npm run build, npm run check:affiliate-density,
npm run check:no-zooplus-public and git diff --check.

## Tasks

- [ ] T1 — Verify SERP/clinical ledger and prepare brief/hero.
  Route: delegated; broad editorial research and preparation trigger.
  Allowed: docs/brief-s19-primeros-auxilios-perros.md and
  public/images/articulos/primeros-auxilios-perros-guia-emergencia.webp.
  Proof: actual SERP observations, claim ledger and inspected unique image.
- [ ] T2 — Draft coherent article and reconcile editorial tracking.
  Route: delegated; article-writer for prose, bounded mechanical tracking worker.
  Allowed: src/content/articulos/primeros-auxilios-perros-guia-emergencia.mdx,
  docs/PLAN_EDITORIAL_v7.md, .seo-engine/data/content-map.yaml,
  .seo-engine/data/content-queue.yaml, .seo-engine/data/seo-keywords.csv,
  .seo-engine/data/topic-clusters.yaml and .seo-engine/logs/changelog.md.
  Proof: verified claims, humanization, source links, human-review state.
- [ ] T3 — Build and independently verify rendered guide; hand off locally.
  Route: delegated; execution and independent verification trigger.
  Proof: observed build/content checks, desktop/mobile inspection, local commits,
  untouched unrelated work and no push. Human review remains pending.

## Progress and evidence

- 2026-10-11: read-only mapping identified S19, calendar date 2026-10-12.
- Existing SERP is historical; a fresh observation remains pending.
- User authorized Pexels with the existing project key and feature-branch-chain.
- New hero inspected: Pexels 6234618, Tima Miroshnichenko, WebP 800x533,
  25,706 bytes, MD5 0aa443ba724cfcff1a26153915d89e87; no duplicate among 191 others.
- Clinical ledger returned from 7 authoritative pages; parent spot-checked PDSA
  heatstroke and VCA emergencies. Brief prepared (116 lines) and independently
  checked against the ledger, existing informative routes and hero metadata.
- SERP blocked: one Playwright Google ES navigation stayed pending over five minutes,
  then was terminated without content. No variants/current volume observed.
  Requested actual SERP text from user; drafting waits for this prerequisite.
  Parent browser_tabs also remained pending and was terminated. Chromium exists
  on host; Playwright Extension 0.4.0 is installed in the dedicated profile.
  User reports no connection popup. Exact connection failure remains unknown.
- Checks: git diff --check exit 0. Untracked brief no-index whitespace check
  exit 1 with no output (file differs from /dev/null; no whitespace error).
- Build, content validators and rendered article checks not run: no MDX exists yet.
- Initial full Engram mirror #401 saved and read back; resync after this update.

## Next step

Recover the existing Playwright connection or receive actual Google ES SERP;
reconcile brief and then supply the article writer with its verified ledger.
No publication authorized. T1 remains incomplete until the SERP prerequisite.
