# OpenCode Model Prices For All Providers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the global model-price plugin from eight provider IDs to every provider in the 2026-07-27 Models.dev catalog snapshot, including Kilo Gateway.

**Architecture:** Keep the existing pure formatter unchanged. Generate one named v1 `provider.models` plugin export per official provider ID because OpenCode's external-plugin loader has no wildcard provider hook; all exports delegate to `modelPricesFor`, and registering them does not connect disabled or unauthenticated providers.

**Tech Stack:** TypeScript, OpenCode plugin API 1.18.x, Bun test runner, Models.dev `api.json` for implementation-time verification only.

---

## File Structure

- Modify `~/.config/opencode/plugins/model-prices.ts`: generated exact-ID provider registrations; remains one of the two runtime files.
- Keep `~/.config/opencode/model-prices/format.ts` unchanged: pure catalog transformation shared by every provider.
- Modify `~/.config/opencode/model-prices/plugin.test.ts`: snapshot-size, uniqueness, Kilo, and delegation regressions.
- Modify `~/.config/opencode/model-prices/README.md`: document exhaustive snapshot coverage and future provider updates.
- Modify `docs/superpowers/specs/2026-07-25-opencode-model-prices-design.md`: already updated with the approved design.

No commit is created because the user did not request one and the production files are global configuration outside the repository.

### Task 1: Add Failing Coverage Regressions

**Files:**
- Modify: `/home/darumo/.config/opencode/model-prices/plugin.test.ts`
- Test: `/home/darumo/.config/opencode/model-prices/plugin.test.ts`

- [ ] **Step 1: Replace the eight-provider assertion with snapshot and uniqueness assertions**

Use a helper that executes every exported plugin function and extracts its provider hook:

```ts
async function providerHooks() {
  const module = await import("../plugins/model-prices").catch(() => ({}))
  const plugins: Plugin[] = Object.values(module)
  return Promise.all(plugins.map((plugin) => plugin({} as never)))
}

test("registers the complete 2026-07-27 provider snapshot without duplicates", async () => {
  const hooks = await providerHooks()
  const providerIDs = hooks.map((hook) => {
    if (!hook.provider) throw new Error("provider hook missing")
    return hook.provider.id
  })

  expect(providerIDs).toHaveLength(172)
  expect(new Set(providerIDs).size).toBe(172)
  expect(providerIDs).toContain("kilo")
})
```

- [ ] **Step 2: Add a Kilo-specific behavior regression**

```ts
test("decorates Kilo Gateway models and preserves their IDs", async () => {
  const hooks = await providerHooks()
  const hook = hooks.find((candidate) => candidate.provider?.id === "kilo")
  const modelsHook = hook?.provider?.models
  if (!modelsHook) throw new Error("kilo provider hook missing")

  const models = await modelsHook(
    {
      id: "kilo",
      name: "Kilo Gateway",
      source: "custom",
      env: [],
      options: {},
      models: {
        "example/model": {
          id: "example/model",
          providerID: "kilo",
          name: "Example through Kilo",
          cost: { input: 0.2, output: 0.8, cache: { read: 0, write: 0 } },
          limit: { context: 128_000, output: 8_192 },
        },
      },
    } as never,
    {},
  )

  expect(models["example/model"].id).toBe("example/model")
  expect(models["example/model"].providerID).toBe("kilo")
  expect(models["example/model"].name).toBe("Example through Kilo · $0.2/$0.8 · 128K")
})
```

- [ ] **Step 3: Update existing provider-specific tests to locate hooks by provider ID**

Do not depend on old export names such as `OpenCodeModelPrices`. Resolve `opencode` and `openai` from `providerHooks()` so generated export names remain an implementation detail.

- [ ] **Step 4: Run the test and verify RED**

Run from `/home/darumo/.config/opencode`:

```bash
bun test model-prices/plugin.test.ts
```

Expected: FAIL because only eight hooks exist, the snapshot length is not 172, and no `kilo` hook exists. Existing formatter behavior tests remain green.

### Task 2: Generate The Exhaustive Provider Hooks

**Files:**
- Modify: `/home/darumo/.config/opencode/plugins/model-prices.ts`
- Test: `/home/darumo/.config/opencode/model-prices/plugin.test.ts`

- [ ] **Step 1: Confirm the approved catalog baseline**

Run:

```bash
node -e 'fetch("https://models.dev/api.json").then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json() }).then(data => { const ids = Object.keys(data).sort(); if (ids.length !== 172 || !ids.includes("kilo")) throw new Error(`Unexpected catalog: ${ids.length} providers, kilo=${ids.includes("kilo")}`); console.log(`catalog-ok providers=${ids.length} kilo=true`) })'
```

Expected:

```text
catalog-ok providers=172 kilo=true
```

- [ ] **Step 2: Generate deterministic, collision-free named exports**

Run this read-only generator and capture its output:

```bash
node -e 'fetch("https://models.dev/api.json").then(r => r.json()).then(data => { const ids = Object.keys(data).sort(); const names = ids.map(id => "Provider" + id.split(/[^a-zA-Z0-9]+/).filter(Boolean).map(part => part[0].toUpperCase() + part.slice(1)).join("") + "ModelPrices"); if (ids.length !== 172 || new Set(names).size !== ids.length) throw new Error("Provider count or generated export collision"); console.log(ids.map((id, index) => `export const ${names[index]} = modelPricesFor(${JSON.stringify(id)})`).join("\n")) })'
```

Expected: exactly 172 `export const Provider... = modelPricesFor("...")` lines, including:

```ts
export const ProviderKiloModelPrices = modelPricesFor("kilo")
```

- [ ] **Step 3: Replace only the old eight export lines with the generated block**

Keep the imports and `modelPricesFor` implementation unchanged. Add this comment immediately before the generated registrations:

```ts
// Generated from https://models.dev/api.json on 2026-07-27.
// OpenCode v1 requires one named plugin export per exact provider ID.
```

Do not export `modelPricesFor` or an ID array because OpenCode treats every module export as a plugin entry point.

- [ ] **Step 4: Run the plugin tests and verify GREEN**

```bash
bun test model-prices/plugin.test.ts
```

Expected: all plugin tests pass; 172 unique hooks exist and the Kilo model name is decorated.

- [ ] **Step 5: Run the complete suite and typecheck**

```bash
npm run test:model-prices
npm run typecheck:model-prices
```

Expected: all tests pass and TypeScript exits with status 0 without warnings.

### Task 3: Prove Exact Catalog Coverage

**Files:**
- Verify: `/home/darumo/.config/opencode/plugins/model-prices.ts`
- Verify: `/home/darumo/.config/opencode/model-prices/format.ts`

- [ ] **Step 1: Compare runtime exports with the live official snapshot**

Run from `/home/darumo/.config/opencode`:

```bash
bun -e 'const module = await import("./plugins/model-prices.ts"); const hooks = await Promise.all(Object.values(module).map((plugin) => plugin({}))); const actual = hooks.map((hook) => hook.provider?.id).sort(); const response = await fetch("https://models.dev/api.json"); if (!response.ok) throw new Error(String(response.status)); const expected = Object.keys(await response.json()).sort(); const missing = expected.filter((id) => !actual.includes(id)); const extra = actual.filter((id) => !expected.includes(id)); if (missing.length || extra.length || actual.length !== new Set(actual).size) throw new Error(JSON.stringify({ missing, extra, duplicates: actual.length - new Set(actual).size })); console.log(`catalog-match providers=${actual.length}`)'
```

Expected:

```text
catalog-match providers=172
```

- [ ] **Step 2: Verify Kilo through OpenCode's actual catalog command**

Run:

```bash
opencode models kilo --verbose
```

Expected: every returned Kilo model with valid metadata has a name ending in `· $input/$output · context` or `· Free · context`; provider and model IDs remain unchanged. If Kilo is unavailable without destination credentials, the offline Kilo regression from Task 1 is the required proof and the destination performs this command after reconnecting Kilo.

- [ ] **Step 3: Verify the plugin adds no runtime network dependency**

Inspect both runtime files. Neither may contain `fetch(`, an HTTP client, or an LLM call. The Models.dev request appears only in implementation-time verification commands, never in the production plugin.

- [ ] **Step 4: Restart OpenCode and inspect `/models`**

Quit every running OpenCode process, reopen it, and enter `/models`. Confirm search, favorites, recents, variants, and model selection still work. Opening the dialog must not send a model request or consume tokens.

### Task 4: Update Portability Documentation

**Files:**
- Modify: `/home/darumo/.config/opencode/model-prices/README.md`

- [ ] **Step 1: Replace the eight-provider limitation**

Document these exact statements:

```markdown
- Covers all 172 provider IDs in the Models.dev snapshot from 2026-07-27, including Kilo Gateway (`kilo`).
- New models under those providers are decorated automatically.
- A provider ID introduced after the snapshot, or an arbitrary custom provider, requires regenerating `plugins/model-prices.ts`.
- Registering a hook does not connect or enable a provider.
```

- [ ] **Step 2: Preserve the two-file migration instructions**

The only runtime files copied to another computer remain:

```text
~/.config/opencode/plugins/model-prices.ts
~/.config/opencode/model-prices/format.ts
```

State that the destination must quit and restart OpenCode. Do not instruct users to copy `opencode.json`, authentication state, environment variables, package manifests, locks, or credentials.

- [ ] **Step 3: Run final verification**

```bash
npm run test:model-prices
npm run typecheck:model-prices
opencode --version
opencode models kilo --verbose
```

Expected: tests and typecheck pass, OpenCode is compatible with the public v1 `provider.models` hook, and Kilo names are decorated when its catalog is available.

- [ ] **Step 4: Recopy the changed runtime file**

Only `~/.config/opencode/plugins/model-prices.ts` changes. Replace that file on the destination PC, leave `format.ts` in place, quit OpenCode completely, and reopen it.
