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

- [x] T0 — Repair browser automation and verify it before resuming SERP.
  Route: delegated; explicit user-authorized MCP repair and CLI installation evaluation.
  Scope: only Playwright MCP config, official CLI installation if useful, and
  its documented project usage. Preserve OAuth/model/provider and browser profiles.
  Proof: bounded real browser smoke/navigation/snapshot, followed by Google ES.
  No arbitrary browser/session closing, security-option weakening or remote Git.
  Observed: fresh MCP 0.0.83 initialized, listed 25 tools, navigated example.com
  and returned its snapshot; Google ES main query and two variants returned SERP.
  Existing cached CLI help succeeded (parent repeated it, exit 0); no installation.
- [x] T1 — Verify SERP/clinical ledger and prepare brief/hero.
  Route: delegated; broad editorial research and preparation trigger.
  Allowed: docs/brief-s19-primeros-auxilios-perros.md and
  public/images/articulos/primeros-auxilios-perros-guia-emergencia.webp.
  Proof: actual SERP observations, claim ledger and inspected unique image.
  Observed: main query + kit/choking variants captured and reconciled in brief;
  clinical ledger/image independently checked; whitespace check passes.
- [x] T2 — Draft coherent article and reconcile editorial tracking.
  Route: delegated; article-writer for prose, bounded mechanical tracking worker.
  Allowed: src/content/articulos/primeros-auxilios-perros-guia-emergencia.mdx,
  docs/PLAN_EDITORIAL_v7.md, .seo-engine/data/content-map.yaml,
  .seo-engine/data/content-queue.yaml, .seo-engine/data/seo-keywords.csv,
  .seo-engine/data/topic-clusters.yaml and .seo-engine/logs/changelog.md.
  Proof: verified claims, humanization, source links, human-review state.
  Observed: final body 1,517 visible words excluding headings/references/FAQs,
  plus 89 FAQ-answer words. Independent verifier closed length/source-budget
  findings; all six source-derived allocations including FAQs remain below 200.
  Engine/plan/brief tracking integrity checks pass, all S19 status human-review.
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
- Preparation checkpoint: de297f2 (192 authored insertions plus hero), local only.
  T1 is still incomplete because actual SERP evidence has not been obtained.
- Cached Playwright implementation recognizes the dedicated-profile env and spawns
  the extension connect page detached with ignored stdio. Its bridge wait has no
  deadline when no extension token is supplied; this is a possible hang mechanism,
  not a confirmed runtime cause. No MCP settings/processes were changed.
- Build, content validators and rendered article checks not run: no MDX exists yet.
- 2026-10-11: user explicitly requested correcting Playwright, suggesting the CLI.
  Repair is now authorized; compare the official CLI and MCP, then verify the
  selected implementation without changing any provider, quota or approval rules.
- T0 repair: only Codex Playwright args/env changed to direct persistent Chromium
  launch. Parsed TOML comparison verified all other settings unchanged. Dedicated
  profile and extensions preserved. Fresh MCP smoke and three Google queries pass;
  owned test browsers/transports closed. Live advertised MCP reload remains untested
  until reconnection/new session. Project reference updated; CLI navigation not needed.
- Main actual Surfer reading 110 on 2026-10-11; botiquin variant 0/N/A, choking
  variant volume not observed. Evidence captured locally; brief ready to draft.
- T0 local work-unit commit c26d3f3 (57 authored changed lines); T1 preparation
  commit de297f2 (192 lines). Running committed authored count so far: 249.
  RDD disabled/unmanaged; no native review transitions.
- T1 completed SERP/brief commit f24d216 (79 authored changed lines).
  Running committed authored count: 328. Feature-branch-chain approved;
  provisional local slices: preparation de297f2..f24d216, article/tracking next.
- T2 proportionate checks: build passed (172 pages, 13 generated CSP hashes),
  optimizer 0 converted/205 skipped, no tracked public/_headers delta.
  Affiliate-density and no-Zooplus-public passed; parent repeated affiliate-density.
  Three YAML and 17-column CSV checks pass; unrelated records preserved.
- T3 independent rendered desktop/mobile/light/dark verification underway on
  owned preview 127.0.0.1:4321; human editorial review remains pending.
- Initial full Engram mirror #401 saved and read back; resync after this update.

## Next step

Finish independent rendered verification, record local commit boundaries and
close owned preview. Deliver locally for human review; no publication authorized.
