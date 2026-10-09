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
- [ ] T1 — Research brief and verified hero. Delegated direct: external research and reading that prepares writing. Exact targets: `docs/brief-s18-envenenamiento-perros.md`, `public/images/articulos/envenenamiento-perros.webp`. Record real SERP, source ledger, overlap, voice and article outline. Checks: source support, image readback, `git diff --check`. Runtime checks N/A for passive brief. Rollback only these new files.
- [ ] T2 — Coherent Spanish article and S18-only engine registration. Delegated direct: premium article writer; multiple editorial/tracking files. Checks: factual/editorial pass, frontmatter, links, humanization, `npm run build`, `npm run check:affiliate-density`, `npm run check:no-zooplus-public`, `git diff --check`. Content has no meaningful deterministic RED; structural/build checks instead. Rollback article and S18-only registration.
- [ ] T3 — Focused verification and human-review handoff. Delegated direct: built-output checks and veterinary safety validation; independent verifier if native assessment high/unavailable. Parent reruns one reported command. Record actual failures, pending review, and commit evidence. No publication.

## Delivery and progress
- Strategy: `ask-on-risk`; user selected `feature-branch-chain` on 2026-10-09 after forecast reached 450–555 lines. Slice 1: research and hero; slice 2: article and registration; slice 3: verification record if needed. No PR creation, publication or integration is authorized. Never shorten prose or omit evidence to fit a line budget.
- Running authored lines: T1 brief 140 lines plus task progress, new hero binary; no work-unit commit yet. Accumulated S18 forecast approximately 450–555 authored lines including article and engine registration: exceeds the advisory 400-line budget; parent owns delivery/slice decision before committing, never omit evidence to fit.
- Verification: T1 source/structure/image checks observed; `git diff --check` passed (exit 0, no output; tracked diff only), new brief/task whitespace checked separately. Native tier: pending; assess the writer diff even though RDD is off.
- Engram mirror: initial readback completed by parent (observation 170 matched local task). Updated full task mirror saved under `odd/envenenamiento-perros-s18/tasks`; readback required in T1 handoff, mark pending if unavailable.
- Next step: parent reads `docs/brief-s18-envenenamiento-perros.md`, resolves delivery strategy/commits T1, then authorizes the writer. Keep T1 unchecked until parent work-unit commit evidence exists.

### T1 observation handoff — 2026-10-09
- Skill resolution: `paths-injected`; loaded `/home/darumo/.agents/skills/humanizer/SKILL.md` and `/home/darumo/.agents/skills/work-unit-commits/SKILL.md`; loaded project humanization and tone guides. Fictional persona instructions excluded by explicit task constraints and project factual state.
- Google ES SERP successfully observed via Playwright MCP for main keyword and rat-poison variant; top 8 organic results each, PAA, related queries and AI Overview presence/failure recorded in brief. Main Surfer header 320 observed; plan volume 390 remains historical, not current measurement. Personalized Spain/Rubí results, not nationwide ranking claims.
- Veterinary ledger: 13 verified claim-source entries (SURvet, Medivet ES, PDSA, ASPCA Poison Control, MSD Vet Manual), consulted 2026-10-09 with supporting excerpts and geographic/clinical limitations. No home doses, universal timing windows or hotline invented.
- Overlap checked against MDX and engine: food toxicity article owns food lists; S19 owns general first aid. Existing food guide's human-hotline claim/doses/timings flagged, not copied or changed.
- Hero: existing Pexels script, authorized key only, query `veterinario perro`, index 9, Pexels 7468978 by Mikhail Nilov. Original 6000x4000; local WebP 800x533, 19338 bytes. Image visually read; no poisoning diagnosis implied. MD5 unique among existing WebP files; two nearest visual candidates inspected and distinct.
- Structural checks: candidate title 46 characters, description 133; all proposed existing internal-link targets confirmed. No deterministic RED/runtime boundary for passive research/image. Build intentionally not run; no installs, article/engine edits, commits, push or reviews.
- Rollback boundary: only newly created `docs/brief-s18-envenenamiento-perros.md` and `public/images/articulos/envenenamiento-perros.webp`; task progress is coordination evidence. Preserve unrelated S17 modification and `.atl/`.
- Blockers for writing: none within evidence-supported scope. Human publication review, future MDX safety/build checks and parent commit/delivery decision remain pending; no veterinary review occurred.
