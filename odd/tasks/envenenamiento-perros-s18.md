# S18 — Evidence-led dog poisoning guide

## Objective and why
Create this week's scheduled Spanish informational article about suspected dog poisoning, with veterinary sources and clear emergency triage. Avoid duplicating the existing food-toxicity guide or inventing treatment, experience, statistics, or product claims.

## Authorization and boundaries
- User requested article creation on 2026-10-09 and explicitly authorized Pexels search/download using the configured key.
- Local drafting, research, proportionate checks, and feature-branch work-unit commits are authorized. Publication, push, PR, and merge are not authorized.
- Preserve existing modified `odd/tasks/collares-adiestramiento-s17.md` and untracked `.atl/`.
- Branch: `feat/envenenamiento-perros-s18`; starting boundary: `d3cfa24a5b46f6246f6dd270a08d4a76d6e2437b`.
- RDD: off, global decision, read on 2026-10-09. Do not enable or start native reviews.

## Scope and acceptance
- Target: `src/content/articulos/envenenamiento-perros.mdx`, `/cuidados/envenenamiento-perros/`, `tipo: informativo`, `animal: perro`, `categoria: higiene` (health-guide precedent).
- Real Google ES SERP via Playwright MCP; ask for missing data only if access fails. Veterinary primary/official source ledger with consultation date and uncertainty.
- Explicit overlap boundary with `alimentos-prohibidos-perros`; practical non-food exposures and emergency decision-making, with relevant internal links.
- Spanish editorial voice; no invented Mango/Kira experience. Humanizer and project humanization/tone guides required.
- Human review remains pending; never mark published or the plan completed before publication approval.
- Hero downloaded through the existing Pexels script and visually inspected; no secret output.

## Tasks and routes
- [x] T1 — Research brief and verified hero. Delegated direct: external research and reading that prepares writing. Exact targets: `docs/brief-s18-envenenamiento-perros.md`, `public/images/articulos/envenenamiento-perros.webp`. Source support, image readback and staged `git diff --cached --check` observed. Runtime checks N/A for passive brief. Work-unit commit: `6ecc053`; slice 1 has 181 authored additions plus binary hero. Rollback only these new files and their task record.
- [ ] T2 — Coherent Spanish article and S18-only engine registration. Delegated direct: premium article writer; multiple editorial/tracking files. Checks: factual/editorial pass, frontmatter, links, humanization, `npm run build`, `npm run check:affiliate-density`, `npm run check:no-zooplus-public`, `git diff --check`. Content has no meaningful deterministic RED; structural/build checks instead. Rollback article and S18-only registration.
- [ ] T3 — Focused verification and human-review handoff. Delegated direct: built-output checks and veterinary safety validation; independent verifier if native assessment high/unavailable. Parent reruns one reported command. Record actual failures, pending review, and commit evidence. No publication.

## Delivery and progress
- Strategy: `ask-on-risk`; user selected `feature-branch-chain` on 2026-10-09 after forecast reached 450–555 lines. Slice 1: research and hero; slice 2: article and registration; slice 3: verification record if needed. No PR creation, publication or integration is authorized. Never shorten prose or omit evidence to fit a line budget.
- Running authored lines: T1 committed as `6ecc053`, 181 authored additions plus binary hero. T2 MDX is 155 lines; S18-only registration and progress are uncommitted. Advisory 400-line feature budget remains subject to selected `feature-branch-chain`; parent owns commits and final line accounting, never omit evidence to fit.
- Verification: T1 source/structure/image checks observed. T2 foreground build and content checks passed; detailed evidence below. Native assessment retained as high/unassessable due to pre-existing `.atl/` inventory, not approval; RDD remains off.
- Engram mirror: parent initially read observation 170 against the local task. Full current task, including selected `feature-branch-chain` and T1 commit evidence, is mirrored under `odd/envenenamiento-perros-s18/tasks`; mechanical worker readback is required before handoff.
- Next step: independent focused T3 verification, parent command rerun and T2 commit. T2 remains open until commit. Human review/publication approval remains pending; do not start STATUS, bypass assessment inventory, enable RDD or claim approval.

### T1 observation handoff — 2026-10-09
- Skill resolution: `paths-injected`; loaded `/home/darumo/.agents/skills/humanizer/SKILL.md` and `/home/darumo/.agents/skills/work-unit-commits/SKILL.md`; loaded project humanization and tone guides. Fictional persona instructions excluded by explicit task constraints and project factual state.
- Google ES SERP successfully observed via Playwright MCP for main keyword and rat-poison variant; top 8 organic results each, PAA, related queries and AI Overview presence/failure recorded in brief. Main Surfer header 320 observed; plan volume 390 remains historical, not current measurement. Personalized Spain/Rubí results, not nationwide ranking claims.
- Veterinary ledger: 13 verified claim-source entries (SURvet, Medivet ES, PDSA, ASPCA Poison Control, MSD Vet Manual), consulted 2026-10-09 with supporting excerpts and geographic/clinical limitations. No home doses, universal timing windows or hotline invented.
- Overlap checked against MDX and engine: food toxicity article owns food lists; S19 owns general first aid. Existing food guide's human-hotline claim/doses/timings flagged, not copied or changed.
- Hero: existing Pexels script, authorized key only, query `veterinario perro`, index 9, Pexels 7468978 by Mikhail Nilov. Original 6000x4000; local WebP 800x533, 19338 bytes. Image visually read; no poisoning diagnosis implied. MD5 unique among existing WebP files; two nearest visual candidates inspected and distinct.
- Structural checks: candidate title 46 characters, description 133; all proposed existing internal-link targets confirmed. No deterministic RED/runtime boundary for passive research/image. Build intentionally not run; no installs, article/engine edits, commits, push or reviews.
- Rollback boundary: only newly created `docs/brief-s18-envenenamiento-perros.md` and `public/images/articulos/envenenamiento-perros.webp`; task progress is coordination evidence. Preserve unrelated S17 modification and `.atl/`.
- Blockers for writing: none within evidence-supported scope. Human publication review, future MDX safety/build checks and parent commit/delivery decision remain pending; no veterinary review occurred.

### T2 mechanical registration/check handoff — 2026-10-09
- Skill resolution: `paths-injected`; read `/home/darumo/.agents/skills/humanizer/SKILL.md` and `/home/darumo/.agents/skills/work-unit-commits/SKILL.md`, project humanization/tone guides, brief, full MDX, SEO rules/config and applicable feedback. No MDX rewrite or unrelated S17/food-guide edit.
- Registered only S18 in content-map, content-queue (`q_037`, unused and unique), seo-keywords, topic-clusters and bounded changelog. Status `human-review`; informational dog guide, hygiene category, health/behaviour cluster. Current Surfer 320 consulted 2026-10-09 with Playwright Google ES provenance; plan 390 preserved as historical. No product feature registration needed; features.yaml excluded from authorized surfaces. Editorial plan not marked complete.
- Build source boundaries inspected: optimizer visits article/product image directories; read-only preflight replicated extension, timestamps and dimensions and derived zero mutations. Sitemap fixer writes only dist; CSP updater writes public/_headers and dist/_headers. No dependencies installed or normalizer bypassed.
- `npm run build`: foreground exit 0, 171 pages, 7.51 seconds; 0 images converted, 204 skipped (191 article/13 product files); 13 executable CSP hashes regenerated; no build warnings/errors. S18 route generated. No manual CSP edit.
- `npm run check:affiliate-density`: foreground exit 0, "Affiliate density check passed." `npm run check:no-zooplus-public`: foreground exit 0, "No public Zooplus references found." `git diff --check`: exit 0, no output; untracked MDX trailing-whitespace/final-newline checked separately and passed.
- Structural read-only assertions passed: title 46, meta 133, four frontmatter/rendered FAQs; four MDX internal destinations present in built HTML and corresponding dist files; 13 unique external URLs match source-ledger scope. JSON-LD parsed: WebSite, Article, BreadcrumbList, FAQPage. Three engine YAMLs parse, q_037 unique, S18 human-review. Public/dist hero byte-identical. Zero affiliate anchors and no rendered affiliate-disclaimer element.
- Auxiliary HTML assertions initially failed twice because global DNS-prefetch/analytics snippets mention retailers and shared inline CSS contains affiliate-disclaimer selectors. Narrowed to actual anchors and rendered disclaimer elements; final assertions passed without changing source. These were checker false positives, not article/build defects.
- No deterministic RED applies to passive article/registration; build/structural evidence substitutes per parent scope policy. Build does not prove clinical accuracy. Independent T3 safety verification, human approval, incoming pillar link and parent commit evidence remain pending. No commit, push, publication, PR, merge or native review performed.
