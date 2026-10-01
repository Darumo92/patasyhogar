# S16: evidence-led feline aggression article

ODD, not SDD. Parent read and reconciled this file and mirror #39 before authorising T1-T3. Execution does not authorise publication. Publication and push to main were later authorised explicitly by the human on 2026-10-01 (see gates below). Draft date: 2026-09-30; scheduled date: 2026-09-21, preserved separately.

## Objective, problem and why

Prepare the requested new last-week S16 article, "Gato agresivo: tipos de agresividad felina y cómo actuar", for human review. Readers need safe immediate action, proportionate veterinary triage and context-dependent guidance. The queue has stale no-coverage assumptions and overlaps with existing petting-bite/stress guides; supported differentiation avoids duplicate content and unsafe or invented claims.

## Authorised scope and boundaries

| Boundary | Decision |
| --- | --- |
| Authorised now | T1-T3 and tracking; user now explicitly authorised configured Pexels key use and search/download for the remaining S16 hero, followed by final verification. |
| Source scope | `docs/brief-s16-gato-agresivo.md`, `src/content/articulos/gato-agresivo-causas-soluciones.mdx`, S16-only plan/queue/map/clusters/seo-keywords/changelog and at most two necessary incoming links in related guides. |
| Language | Article and editorial brief: professional Spanish for Spain. Technical ODD tracking: English. |
| Prohibited | No publication, commit, push, PR, branch operation, application code/schema/layout/component edit or `.atl/` mutation. |
| Remote/assets | Only Pexels API/CDN search/download using the configured key through the established script is authorised. No secret read/print, unrelated credentials or ambient authenticated operations. |
| Existing state | Initial status before tracking was only `?? .atl/`; resumed status was `?? .atl/` and `?? odd/`. Preserve unrelated work. |

Superseded 2026-10-01 for this S16 scope only: the human explicitly approved the article and authorised publication plus a single push to `origin main` ("sube los cambios a main"). The prohibitions above governed the drafting phase and are historical; no other scope, branch, remote or service is thereby authorised.

## Stable tasks and observed proof

| ID | Deliverable and route | Execution state | Proof |
| --- | --- | --- | --- |
| T1 | Vetted SERP/medical brief; delegated research preparation in the same general writer context | Executed | Brief persisted and read back (119 lines); principal and two variant Google ES queries observed 2026-09-30. Direct Surfer figures 210/110/90; clinical support and limitations separated from competitors. Corrected a table separator to preserve the observed video title. |
| T2 | Coherent article plus editorial tracking; same delegated general writer for multiple nontrivial MDX/data files | Executed | Full 157-line MDX readback; final 2230 prose words excluding headings/frontmatter/URLs, 2345 including headings. Four FAQs, three verified outgoing internal destinations and two incoming links. S16-only tracking human-review; image fields omitted. `git diff --check` passed. |
| T3 | Actual checks/built HTML/editorial pass; delegated bounded verification | Executed; asset readiness complete | All three required commands passed after each source mutation (initial, after H2 correction, and after hero integration). Final HTML/CSV assertions and YAML parses passed. Hero/OG/Article image verified in built output. Editorial pass performed. Native review observed skipped (`rdd_disabled`); human approval was open at T3 close and granted 2026-10-01 (gates below). No child review launched. |

T1 acceptance: preserve exact observed titles/URLs/PAA/related/AIO with dates and source limits; do not infer KD from adjacent decimals. Variant searches succeeded without timeout/captcha bypass. The browser reports personalised results; no account controls were used. Cornell (2016) is used selectively, current iCatCare for handling/conflict, AAFP landing page only, NHS for human bite care. No idiopathic diagnosis, startle/dominance advice, treatment guarantees or invented veterinary review. Rollback: the S16 brief only.

T2 acceptance: `informativo`/`hogar`/`gato`, draft date 2026-09-30, approximately 2,200-2,600 useful words; seven supported contexts include maternal and petting-related, not idiopathic. Lead with safety and prompt veterinary contact for sudden change without a blanket emergency label or enforced waiting interval. Directly cite consequential clinical guidance; no doses, product promises, invented Mango episodes or Laura review. Link out rather than duplicating existing guides; verify destinations. Tracking ends human-review, never published. Rollback: new S16 MDX and S16-only tracking/link edits, not unrelated records.

T3 acceptance: run exact authorised commands in foreground and record real output/exit codes:

```bash
npm run build
npm run check:affiliate-density
npm run check:no-zooplus-public
```

Build performs image optimisation, Astro output, sitemap repair and CSP updates and may mutate source. Inspect mutations and finish all normalisation/corrections/rebuilds before native freeze. Never hand-edit CSP or revert unrelated edits. Inspect `dist/cuidados/gato-agresivo-causas-soluciones/index.html` against `docs/agent-context/feedback/feedback-article-review-checklist.md`: title/meta limits, canonical, schema/FAQ parity, question headings, indexing, affiliate disclaimer, breadcrumb, author/tags, OG and internal links. Hero and image metadata remain partial if fallback is rendered. Read actual MDX and measure meaningful prose without frontmatter/URLs. One focused editorial pass covers support, intent, originality, natural voice, links, localisation and persona.

TDD is unknown: no explicit configuration, runner or test script found in bounded inspection. Ordinary content/build checks are appropriate; no invented RED/GREEN or test suite. Runtime evidence is actual generated HTML, not an invented interactive harness. Rollback: S16 verification corrections and attributable build mutations only.

## T3 observed verification receipt

- `npm run build`: exit 0 after each source mutation (pre-hero, after H2 correction, after hero integration). Each run: 169 pages, 13 inline executable CSP hashes; final run 189 article images/202 skipped. No tracked `public/_headers` delta or unexpected source mutation detected; dist regenerated normally. No native freeze yet.
- `npm run check:affiliate-density`: exit 0 every run, "Affiliate density check passed." `npm run check:no-zooplus-public`: exit 0 every run, "No public Zooplus references found."
- Final HTML assertions: title 56/meta 128, exact canonical, Article/BreadcrumbList/FAQPage/Person, 4 questions/4 answers, 2 question H2, no noindex/nofollow robots, zero affiliate disclaimer/destinations, Inicio/Cuidados/article breadcrumb, Daniel Ruiz and 5 tags.
- Hero integration verified in built HTML: `img` with src `/images/articulos/gato-agresivo-lenguaje-corporal.webp`, alt matching the Spanish frontmatter, width 800/height 400, `loading="eager"`, `fetchpriority="high"`. OG image and Article schema image both `https://patasyhogar.com/images/articulos/gato-agresivo-lenguaje-corporal.webp`. Public and dist copies are byte-identical (SHA-256 `9877130d906a3e4a2f8d5647ab5f46c6c56a1859e21622020f724edab072becc`).
- Links: 3 body destinations exist in built output; both incoming links present in built related guides. CSV has 3 valid S16 rows and blank KD/CPC; map/queue/clusters parse with existing js-yaml. `git diff --check` passed.
- Pre-asset image evidence: no article hero; related-card images were not a hero. OG was `https://patasyhogar.com/og-default.jpg`; Article image absent. This earlier partial receipt is preserved as historical; the current state is verified above.
- Auxiliary verification initially failed on a null class attribute, missing `yaml` import and an overbroad zero-button assertion. Corrected checker and existing js-yaml passed. Existing `/cuidados/` navigation CTA uses affiliate-button styling, not an affiliate destination. No dependency install or layout edit.
- Single editorial pass checked clinical support/safety, intent, originality/overlap, natural voice, links, localisation and persona. No fictional episode, clinician review, doses or guarantees. Native review observed skipped (`rdd_disabled`); human approval was pending at T3 time and was granted 2026-10-01 (gates below).

## Native review status and parent bookkeeping (final)

- Parent native canonical status: `next_transition: stop`, `reason_code: rdd_disabled`. Native review skipped as disabled/unmanaged. **This is not approval.** Do not activate or invoke any review actor; RDD stays off.
- Fallback assessment: RDD-off medium-risk path; configured writer is general premium medium (not mini) running in foreground, whose verification is deemed sufficient for this risk tier.
- Fresh explicit untracked-scope selection (excluding pre-existing `.atl/`): included article, brief, ODD and hero image. Result: **medium risk**, `configuration_change` in `content-map`, **12 paths, 471 authored lines**. `ask-on-risk` delivery decision still pending before any future delivery.
- Parent spot check: parent directly read the full final MDX and ODD, confirmed article evidence, and re-ran `npm run check:affiliate-density` → exit 0. Structural readback consistent with this record.
- Source normalisation finished before the checks; no native freeze was launched. Historical default-read references to "parent native RDD pending" earlier in this file are preserved as historical, superseded by the observed `rdd_disabled` status above.
- Human approval of 2026-10-01 is the human gate only. It does not reactivate, replace or imply native/RDD review; canonical status remains `next_transition: stop`, `reason_code: rdd_disabled`. Do not enable or invoke any review actor.

## Readiness, review and delivery gates

- Hero consent granted by user ("puedes usar la clave de pexels", "sigue"). Downloaded Pexels 4492140 by Aleksandr Nadyojin using `cat hissing`, index 8; visually read a tricolour cat with open mouth, visible teeth and upright ears next to a wall. No emotional diagnosis/staging claim. Local WebP 800x534, 28748 bytes, SHA-256 `9877130d906a3e4a2f8d5647ab5f46c6c56a1859e21622020f724edab072becc`, no exact article-image duplicate. MDX image/alt added; hero/OG/Article image integration verified in built HTML. Image gate complete.
- Human approval: **granted 2026-10-01**. The human reviewed the work and approved it after a read-only Playwright browser review (dark desktop and mobile viewports; no actionable console or layout errors) and then explicitly authorised publication and push to main ("sube los cambios a main"). Browser review was read-only; no remote state was changed by it. Native review remains observed skipped (`rdd_disabled`, disabled/unmanaged, not approval) and stays off; no review actor was invoked and RDD is not to be enabled.
- Status transition: the writer correctly left S16 tracking at `human-review` per T2 ("never published"). The `human-review` → `published`/approved marker update in queue/map/clusters/keywords/plan/changelog is the parent's human-approval action of 2026-10-01, not a writer-scope change. Article draft date `2026-09-30` is not backdated; `published_date` records 2026-10-01.
- Commit identity/evidence: human delivery authorisation received 2026-10-01; the earlier no-commit instruction is superseded for this S16 scope only. Commit identity (hash) and push receipt are reported externally in the session report and persistent memory; this file is not edited after the final commit to record its own hash.
- Delivery: the user explicitly requested direct delivery to main ("sube los cambios a main"); no PR creation and no artificial split. The 400-line per-task advisory and the PR/chain guard do not apply to a requested direct-main delivery; the user's explicit direction is the delivery decision (single work-unit commit on main). Total authored changed lines recounted at delivery below; no squeezing, omitted checks or artificial splits. Delivery state at file save: **publishing authorised and in progress**; the `git push` receipt distinguishes success and is reported externally, not written back into this file. Cloudflare deployment is not verified from a push and is not claimed here.

## Final authored line count

- Delivery-time recount (2026-10-01, after approval-marker updates, before commit): tracked files (8 modified): 75 additions / 20 deletions = 95 authored changed lines. New authored files (3): brief 144 lines, MDX 159 lines, ODD 90 lines (this file at recount). Hero binary excluded (28748 bytes, not authored lines).
- **Delivery-time total authored additions plus deletions: 488.** Above the 400 advisory threshold; not binding for this explicitly requested direct-main delivery (see delivery gate). Historical pre-approval measurement preserved: tracked 89, brief 144, MDX 159, ODD 79 = 471.
- Excluded: `.atl/` pre-existing registry files, `dist/` generated output, `public/images/articulos/gato-agresivo-lenguaje-corporal.webp` binary.

## References and handoff

- Editorial authority: `docs/PLAN_EDITORIAL_v7.md:44`, q_015 in `.seo-engine/data/content-queue.yaml`, S16 entry in `.seo-engine/data/topic-clusters.yaml`.
- Overlap/persona: `por-que-mi-gato-me-muerde.mdx`, `senales-estres-gatos.mdx`, `docs/brief-s11-por-que-gato-me-muerde.md`, `.seo-engine/config.yaml`.
- Evidence: `docs/brief-s16-gato-agresivo.md`; prior inline research remains context. Source URLs and limitations are in the brief.
- Rules: article checklist, humanization/tone/frontmatter templates and feedback SERP/built-HTML checklists. No invented experiences despite template allowance.
- Skills read at exact registry paths before work: `/home/darumo/.agents/skills/image/SKILL.md`, `/home/darumo/.agents/skills/humanizer/SKILL.md` (also invoked), `/home/darumo/.agents/skills/copy-editing/SKILL.md`, `/home/darumo/.agents/skills/work-unit-commits/SKILL.md`. Prior cognitive-doc-design and `.atl/skill-registry.md` read retained, not changed.
- File locator: `odd/tasks/gato-agresivo-s16.md` in repository `/home/darumo/Proyectos/patasyhogar`.
- Full mirror: project `patasyhogar`, topic `odd/gato-agresivo-s16/tasks`, observation #39 (upsert and readback required after each task).

Next: delivery authorised by the human on 2026-10-01 (direct main, no PR, no artificial split). Foreground checks run immediately before commit: `npm run build`, `npm run check:affiliate-density`, `npm run check:no-zooplus-public`, `git diff --check`; source normalisation via build only, no manual CSP edits. Stage only the twelve S16 files (eight tracked plus MDX, brief, hero, this ODD); exclude `.atl/` and unrelated artifacts. Conventional commit `feat: artículo S16 gato agresivo (publicado)` and a single `git push origin main` (no force). Push receipt, commit identity and final state are reported externally (session report and persistent memory); this file is not edited after the final commit. Cloudflare deployment is not verified from the push. T1/T2/T3 remain complete; RDD remains off.
