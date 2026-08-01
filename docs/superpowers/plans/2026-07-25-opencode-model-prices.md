# OpenCode Model Prices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decorate model names in OpenCode's native `/models` selector with input/output prices and context size without changing selector behavior or making additional network requests.

**Architecture:** A global OpenCode server plugin registers one provider hook for each provider currently available to this installation. Each hook receives OpenCode's normalized in-memory catalog and delegates to a pure formatter that returns complete model copies with only `name` changed.

**Tech Stack:** TypeScript, OpenCode plugin API `^1.18.5`, Bun test runner, Models.dev metadata already loaded by OpenCode.

---

## File Structure

- Create `~/.config/opencode/model-prices/format.ts`: pure price/context formatting and full-record model transformation.
- Create `~/.config/opencode/model-prices/format.test.ts`: unit tests for formatting, idempotence, and metadata preservation.
- Create `~/.config/opencode/plugins/model-prices.ts`: auto-discovered provider-hook registrations only.
- Create `~/.config/opencode/model-prices/plugin.test.ts`: unit tests for provider registration and hook delegation.
- Create `~/.config/opencode/model-prices/README.md`: safe installation, migration, and compatibility instructions.
- Modify `~/.config/opencode/package.json`: align `@opencode-ai/plugin` with installed OpenCode 1.18.5.
- Modify `~/.config/opencode/package-lock.json`: generated dependency lock update.

The test files live outside `plugins/` so OpenCode does not try to load them as plugins. The auto-discovered plugin file exports only valid plugin functions.

### Task 1: Align The Plugin SDK

**Files:**
- Modify: `/home/darumo/.config/opencode/package.json`
- Modify: `/home/darumo/.config/opencode/package-lock.json`

- [ ] **Step 1: Record the current compatibility baseline**

Run:

```bash
opencode --version
opencode models | wc -l
npm ls @opencode-ai/plugin
```

Expected before changes:

```text
1.18.5
277
@opencode-ai/plugin@1.14.41
```

- [ ] **Step 2: Update the declared SDK version**

Change `/home/darumo/.config/opencode/package.json` to:

```json
{
  "dependencies": {
    "@opencode-ai/plugin": "1.18.5"
  }
}
```

- [ ] **Step 3: Install the aligned dependency and refresh the lock**

Run from `/home/darumo/.config/opencode`:

```bash
npm install
```

Expected: installation succeeds without dependency errors and updates `package-lock.json`.

- [ ] **Step 4: Verify the installed SDK**

Run:

```bash
npm ls @opencode-ai/plugin
```

Expected: output contains `@opencode-ai/plugin@1.18.5` and exits with status 0.

No commit is created because these are user-global configuration files outside the project repository and no commit was requested.

### Task 2: Format A Standard Paid Model

**Files:**
- Create: `/home/darumo/.config/opencode/model-prices/format.test.ts`
- Create: `/home/darumo/.config/opencode/model-prices/format.ts`

- [ ] **Step 1: Write the first failing behavior test**

Create `/home/darumo/.config/opencode/model-prices/format.test.ts` with:

```ts
import { expect, test } from "bun:test"

test("decorates a paid model with input/output price and context", async () => {
  const module = await import("./format").catch(() => ({
    decorateModelName: undefined,
  }))

  const result = module.decorateModelName?.({
    name: "Claude Sonnet 4.6",
    cost: { input: 3, output: 15 },
    limit: { context: 200_000 },
  })

  expect(result).toBe("Claude Sonnet 4.6 · $3/$15 · 200K")
})
```

- [ ] **Step 2: Run the test and verify RED**

Run from `/home/darumo/.config/opencode`:

```bash
bun test model-prices/format.test.ts
```

Expected: FAIL because `decorateModelName` is not implemented and the result is `undefined`.

- [ ] **Step 3: Implement only the standard paid-model path**

Create `/home/darumo/.config/opencode/model-prices/format.ts` with:

```ts
export type PriceableModel = {
  name: string
  cost?: {
    input?: unknown
    output?: unknown
  }
  limit?: {
    context?: unknown
  }
  [key: string]: unknown
}

export function decorateModelName(model: PriceableModel): string {
  const input = model.cost?.input
  const output = model.cost?.output
  const context = model.limit?.context

  if (typeof input !== "number" || typeof output !== "number" || typeof context !== "number") {
    return model.name
  }

  return `${model.name} · $${input}/$${output} · ${Math.round(context / 1_000)}K`
}
```

- [ ] **Step 4: Run the test and verify GREEN**

Run:

```bash
bun test model-prices/format.test.ts
```

Expected: 1 test passes.

### Task 3: Handle Compact Formatting And Invalid Metadata

**Files:**
- Modify: `/home/darumo/.config/opencode/model-prices/format.test.ts`
- Modify: `/home/darumo/.config/opencode/model-prices/format.ts`

- [ ] **Step 1: Add failing edge-case tests**

Append to `/home/darumo/.config/opencode/model-prices/format.test.ts`:

```ts
test("keeps small non-zero prices visible", async () => {
  const { decorateModelName } = await import("./format")
  expect(
    decorateModelName({
      name: "Small Price",
      cost: { input: 0.003625, output: 0.87 },
      limit: { context: 128_000 },
    }),
  ).toBe("Small Price · $0.003625/$0.87 · 128K")
})

test("labels zero-cost models as free", async () => {
  const { decorateModelName } = await import("./format")
  expect(
    decorateModelName({
      name: "Free Model",
      cost: { input: 0, output: 0 },
      limit: { context: 200_000 },
    }),
  ).toBe("Free Model · Free · 200K")
})

test("formats exact million-token contexts with M", async () => {
  const { decorateModelName } = await import("./format")
  expect(
    decorateModelName({
      name: "Long Context",
      cost: { input: 1.25, output: 5 },
      limit: { context: 1_000_000 },
    }),
  ).toBe("Long Context · $1.25/$5 · 1M")
})

test("omits only invalid metadata segments", async () => {
  const { decorateModelName } = await import("./format")
  expect(
    decorateModelName({
      name: "Partial Metadata",
      cost: { input: "unknown", output: 5 },
      limit: { context: 128_000 },
    }),
  ).toBe("Partial Metadata · 128K")
})

test("does not append the same suffix twice", async () => {
  const { decorateModelName } = await import("./format")
  const model = {
    name: "Idempotent",
    cost: { input: 3, output: 15 },
    limit: { context: 200_000 },
  }
  const once = decorateModelName(model)
  const twice = decorateModelName({ ...model, name: once })
  expect(twice).toBe(once)
})
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
bun test model-prices/format.test.ts
```

Expected: the standard paid-model test passes; free, million-context, invalid-metadata, and idempotence tests fail.

- [ ] **Step 3: Implement compact and defensive formatting**

Replace `/home/darumo/.config/opencode/model-prices/format.ts` with:

```ts
export type PriceableModel = {
  name: string
  cost?: {
    input?: unknown
    output?: unknown
  }
  limit?: {
    context?: unknown
  }
  [key: string]: unknown
}

function finiteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
}

function formatNumber(value: number): string {
  const text = Number(value.toPrecision(12)).toString()
  return text.replace(/^(\d)\.?(\d*)e-(\d+)$/, (_, integer, fraction, exponent) =>
    `0.${"0".repeat(Number(exponent) - 1)}${integer}${fraction}`,
  )
}

function formatCost(model: PriceableModel): string | undefined {
  const input = model.cost?.input
  const output = model.cost?.output
  if (!finiteNonNegative(input) || !finiteNonNegative(output)) return
  if (input === 0 && output === 0) return "Free"
  return `$${formatNumber(input)}/$${formatNumber(output)}`
}

function formatContext(model: PriceableModel): string | undefined {
  const context = model.limit?.context
  if (!finiteNonNegative(context) || context === 0) return
  if (context >= 1_000_000 && context % 1_000_000 === 0) return `${context / 1_000_000}M`
  return `${Math.round(context / 1_000)}K`
}

export function decorateModelName(model: PriceableModel): string {
  const metadata = [formatCost(model), formatContext(model)].filter((value): value is string => Boolean(value))
  if (metadata.length === 0) return model.name
  const suffix = ` · ${metadata.join(" · ")}`
  if (model.name.endsWith(suffix)) return model.name
  return `${model.name}${suffix}`
}
```

- [ ] **Step 4: Run the tests and verify GREEN**

Run:

```bash
bun test model-prices/format.test.ts
```

Expected: 6 tests pass with no warnings.

### Task 4: Preserve Complete Model Records

**Files:**
- Modify: `/home/darumo/.config/opencode/model-prices/format.test.ts`
- Modify: `/home/darumo/.config/opencode/model-prices/format.ts`

- [ ] **Step 1: Write the failing provider-transformation test**

Append to `/home/darumo/.config/opencode/model-prices/format.test.ts`:

```ts
test("decorates every model without changing non-name metadata", async () => {
  const module = await import("./format") as typeof import("./format") & {
    decorateModels?: (models: Record<string, any>) => Record<string, any>
  }
  const models = {
    paid: {
      id: "paid",
      providerID: "example",
      name: "Paid",
      cost: { input: 2, output: 8, cache: { read: 0.2, write: 2.5 } },
      limit: { context: 128_000, output: 8_192 },
      capabilities: { reasoning: true },
      variants: { high: { reasoningEffort: "high" } },
    },
    free: {
      id: "free",
      providerID: "example",
      name: "Free",
      cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
      limit: { context: 1_000_000, output: 8_192 },
      capabilities: { reasoning: false },
      variants: {},
    },
    malformed: {
      id: "malformed",
      cost: { input: 1, output: 2 },
    },
  }

  const result = module.decorateModels?.(models)

  expect(Object.keys(result ?? {})).toEqual(["paid", "free", "malformed"])
  expect(result?.paid.name).toBe("Paid · $2/$8 · 128K")
  expect(result?.free.name).toBe("Free · Free · 1M")
  expect(result?.paid.id).toBe(models.paid.id)
  expect(result?.paid.cost).toEqual(models.paid.cost)
  expect(result?.paid.limit).toEqual(models.paid.limit)
  expect(result?.paid.capabilities).toEqual(models.paid.capabilities)
  expect(result?.paid.variants).toEqual(models.paid.variants)
  expect(result?.paid).not.toBe(models.paid)
  expect(result?.malformed).toBe(models.malformed)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
bun test model-prices/format.test.ts
```

Expected: FAIL because `decorateModels` is undefined.

- [ ] **Step 3: Implement the complete-record transformation**

Insert these mapped types after `PriceableModel` in `/home/darumo/.config/opencode/model-prices/format.ts`:

```ts
export type DecoratedModel<Model> = Model extends PriceableModel
  ? { [Key in keyof Model]: Key extends "name" ? string : Model[Key] }
  : Model

export type DecoratedModels<Models extends Record<string, unknown>> = {
  [Key in keyof Models]: DecoratedModel<Models[Key]>
}
```

Append the complete record transformation:

```ts
function defineDataProperty(result: Record<string, unknown>, id: string, value: unknown): void {
  Object.defineProperty(result, id, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  })
}

export function decorateModels<Models extends Record<string, unknown>>(models: Models): DecoratedModels<Models> {
  const result: Record<string, unknown> = {}

  for (const id of Object.keys(models)) {
    const descriptor = Object.getOwnPropertyDescriptor(models, id)
    if (!descriptor) continue
    if (!("value" in descriptor)) {
      Object.defineProperty(result, id, descriptor)
      continue
    }

    try {
      const model = descriptor.value
      if (!model || typeof model !== "object" || typeof (model as { name?: unknown }).name !== "string") {
        defineDataProperty(result, id, model)
        continue
      }
      defineDataProperty(result, id, {
        ...model,
        name: decorateModelName(model as PriceableModel),
      })
    } catch {
      defineDataProperty(result, id, descriptor.value)
    }
  }

  return result as DecoratedModels<Models>
}
```

- [ ] **Step 4: Run the tests and verify GREEN**

Run:

```bash
bun test model-prices/format.test.ts
```

Expected: 7 tests pass.

### Task 5: Register The Active Provider Hooks

**Files:**
- Create: `/home/darumo/.config/opencode/model-prices/plugin.test.ts`
- Create: `/home/darumo/.config/opencode/plugins/model-prices.ts`

- [ ] **Step 1: Write the failing registration test**

Create `/home/darumo/.config/opencode/model-prices/plugin.test.ts` with:

```ts
import { expect, test } from "bun:test"
import type { Plugin } from "@opencode-ai/plugin"

const expected = [
  "opencode",
  "opencode-go",
  "amazon-bedrock",
  "cloudflare-ai-gateway",
  "google-vertex",
  "google-vertex-anthropic",
  "openai",
  "zai-coding-plan",
]

test("registers pricing hooks for every currently active provider", async () => {
  const module = await import("../plugins/model-prices").catch(() => ({}))
  const plugins: Plugin[] = Object.values(module)
  const hooks = await Promise.all(plugins.map((plugin) => plugin({} as never)))
  const providerIDs = hooks.map((hook) => {
    if (!hook.provider) throw new Error("provider hook missing")
    return hook.provider.id
  })
  expect(providerIDs.sort()).toEqual(expected.toSorted())
})

test("a provider hook decorates names and preserves model IDs", async () => {
  const module = await import("../plugins/model-prices")
  const hook = await module.OpenCodeModelPrices({} as never)
  if (!hook.provider?.models) throw new Error("provider hook missing")
  const models = await hook.provider.models(
    {
      id: "opencode",
      name: "OpenCode",
      source: "custom",
      env: [],
      options: {},
      models: {
        example: {
          id: "example",
          providerID: "opencode",
          name: "Example",
          cost: { input: 1, output: 4, cache: { read: 0, write: 0 } },
          limit: { context: 200_000, output: 8_192 },
        },
      },
    } as never,
    {},
  )

  expect(models?.example.id).toBe("example")
  expect(models?.example.name).toBe("Example · $1/$4 · 200K")
})
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
bun test model-prices/plugin.test.ts
```

Expected: FAIL because the plugin module and provider exports do not exist.

- [ ] **Step 3: Implement the provider registrations**

Create `/home/darumo/.config/opencode/plugins/model-prices.ts` with:

```ts
import type { Plugin } from "@opencode-ai/plugin"
import { decorateModels } from "../model-prices/format"

function modelPricesFor(providerID: string): Plugin {
  return async () => ({
    provider: {
      id: providerID,
      async models(provider) {
        return decorateModels(provider.models)
      },
    },
  })
}

export const OpenCodeModelPrices = modelPricesFor("opencode")
export const OpenCodeGoModelPrices = modelPricesFor("opencode-go")
export const AmazonBedrockModelPrices = modelPricesFor("amazon-bedrock")
export const CloudflareGatewayModelPrices = modelPricesFor("cloudflare-ai-gateway")
export const GoogleVertexModelPrices = modelPricesFor("google-vertex")
export const GoogleVertexAnthropicModelPrices = modelPricesFor("google-vertex-anthropic")
export const OpenAIModelPrices = modelPricesFor("openai")
export const ZaiCodingPlanModelPrices = modelPricesFor("zai-coding-plan")
```

Do not export `modelPricesFor`: OpenCode treats every exported function in an auto-discovered plugin module as a plugin entry point.

- [ ] **Step 4: Run the registration tests and verify GREEN**

Run:

```bash
bun test model-prices/plugin.test.ts
```

Expected: 2 tests pass.

### Task 6: Verify Type Safety And OpenCode Startup

**Files:**
- Verify: `/home/darumo/.config/opencode/model-prices/format.ts`
- Verify: `/home/darumo/.config/opencode/plugins/model-prices.ts`
- Verify: `/home/darumo/.config/opencode/package.json`

- [ ] **Step 1: Run the complete unit suite**

Run from `/home/darumo/.config/opencode`:

```bash
bun test model-prices/format.test.ts model-prices/plugin.test.ts
```

Expected: 9 tests pass with no failures or warnings.

- [ ] **Step 2: Type-check production and test files**

Run:

```bash
bunx tsc --noEmit --strict --target ESNext --module Preserve --moduleResolution Bundler --types bun,node model-prices/format.ts model-prices/format.test.ts model-prices/plugin.test.ts plugins/model-prices.ts
```

Expected: command exits with status 0 and prints no TypeScript errors. Use the installed Bun type configuration so `bun:test` resolves without weakening the test types.

- [ ] **Step 3: Verify all eight connected providers at runtime**

Start a temporary OpenCode server on an unused loopback port and query its `/provider` endpoint. Verify that `connected` contains exactly:

```text
opencode
opencode-go
amazon-bedrock
cloudflare-ai-gateway
google-vertex
google-vertex-anthropic
openai
zai-coding-plan
```

For every model from those providers, verify that the model-map keys and model IDs are unchanged, each provider retains its original model count, and each name ends with exactly one decorated suffix. Expected at the recorded baseline: 277 models total across the eight providers. Stop the temporary server and remove its logs and other artifacts after verification. OpenCode prints no plugin initialization error.

- [ ] **Step 4: Verify there is no remote pricing dependency**

Inspect the production files and confirm that neither contains `fetch`, `webfetch`, an HTTP URL, nor an LLM client call. The only data source in `plugins/model-prices.ts` must be the `provider` argument passed by OpenCode.

- [ ] **Step 5: Restart and manually verify the native selector**

Quit every running OpenCode process, start OpenCode again, and enter `/models`.

Expected:

```text
<original model name> · $<input>/$<output> · <context>
```

Confirm that search, favorites, recent models, variants, and changing the active model still behave as before. The input/output prices are USD per one million tokens. No model request is made merely by opening the selector.

No commit is created because the implementation targets global OpenCode configuration outside the project repository and no commit was requested.

### Task 7: Prove Forward Compatibility For New Models

**Files:**
- Modify: `/home/darumo/.config/opencode/model-prices/plugin.test.ts`
- Modify: `/home/darumo/.config/opencode/package.json`
- Modify: `/home/darumo/.config/opencode/package-lock.json`

- [ ] **Step 1: Add an explicit future-model regression**

Append to `/home/darumo/.config/opencode/model-prices/plugin.test.ts`:

```ts
test("decorates future models without a model allowlist", async () => {
  const module = await import("../plugins/model-prices")
  const hook = await module.OpenAIModelPrices({} as never)
  if (!hook.provider?.models) throw new Error("provider hook missing")

  const models = await hook.provider.models(
    {
      id: "openai",
      name: "OpenAI",
      source: "custom",
      env: [],
      options: {},
      models: {
        "future-model-2099": {
          id: "future-model-2099",
          providerID: "openai",
          name: "Future Model 2099",
          cost: { input: 0.435, output: 0.87, cache: { read: 0, write: 0 } },
          limit: { context: 2_000_000, output: 16_384 },
        },
      },
    } as never,
    {},
  )

  expect(Object.keys(models)).toEqual(["future-model-2099"])
  expect(models["future-model-2099"].id).toBe("future-model-2099")
  expect(models["future-model-2099"].name).toBe("Future Model 2099 · $0.435/$0.87 · 2M")
})
```

This is a regression test for behavior already supplied by the generic provider transformation. It should pass immediately; no model-specific production code should be added.

- [ ] **Step 2: Run the compatibility regression**

Run from `/home/darumo/.config/opencode`:

```bash
bun test model-prices/plugin.test.ts
```

Expected: 3 plugin tests pass. If the new test fails, fix only generic provider transformation behavior; never add `future-model-2099` to production code.

- [ ] **Step 3: Record the implemented scripts and development toolchain**

Change `/home/darumo/.config/opencode/package.json` to use the implemented scripts and development-only dependencies:

```json
{
  "scripts": {
    "test:model-prices": "bun test model-prices/format.test.ts model-prices/plugin.test.ts",
    "typecheck:model-prices": "tsc -p model-prices/tsconfig.json"
  },
  "devDependencies": {
    "@opencode-ai/plugin": "^1.18.5",
    "@types/bun": "^1",
    "typescript": "~5.9.3"
  }
}
```

Run from `/home/darumo/.config/opencode`:

```bash
npm install
```

Expected: npm refreshes `package-lock.json`; the SDK, Bun types, and TypeScript remain development-only dependencies; no direct `@types/node` dependency is added.

- [ ] **Step 4: Run strict type checking and the complete suite**

Run:

```bash
npm run test:model-prices
npm run typecheck:model-prices
```

Expected: 10 tests pass and TypeScript exits with status 0 without errors. `model-prices/tsconfig.json` keeps strict first-party checks, sets `types: ["bun"]`, and documents `skipLibCheck: true` solely for the known `bun-types` 1.3.14 / `@types/node` 24 declaration conflict.

- [ ] **Step 5: Verify dependency and runtime compatibility**

Run:

```bash
npm ls @opencode-ai/plugin @types/bun typescript
opencode models | wc -l
```

Expected: the three development dependencies resolve cleanly, the 10-test suite and typecheck remain healthy, OpenCode still exposes the recorded 277-model baseline, and stderr contains no plugin error. A changed future catalog count is acceptable if provider/model IDs remain valid and all models from registered providers are decorated.

### Task 8: Document Safe Migration To Another Computer

**Files:**
- Create: `/home/darumo/.config/opencode/model-prices/README.md`

- [ ] **Step 1: Create the portability guide**

Create `/home/darumo/.config/opencode/model-prices/README.md` with:

````markdown
# OpenCode model prices

Adds input/output prices per one million tokens and context size to model names in OpenCode's native `/models` selector.

## Prerequisites

- The commands shown target Linux/macOS shells.
- OpenCode must be installed; this guide is verified on 1.18.5 and compatible OpenCode 1.x `provider.models` APIs.
- Bun is needed only for optional tests, npm only for optional typecheck dependencies, and SSH only for the `scp` method.
- Before OpenCode 2.x, check release notes and public `provider.models` API compatibility.

## Runtime behavior

- Uses the model catalog already loaded by OpenCode.
- Makes no network or LLM request.
- Consumes no model tokens.
- Automatically supports new models added to a registered provider.
- Uses OpenCode's public `provider.models` hook. A future incompatible major OpenCode release may require an update.

## Move to another computer

On the destination computer, create the directories:

```bash
mkdir -p ~/.config/opencode/plugins ~/.config/opencode/model-prices
```

From the source computer, replace `NEW_PC` with the destination SSH host:

```bash
scp ~/.config/opencode/plugins/model-prices.ts NEW_PC:~/.config/opencode/plugins/
scp ~/.config/opencode/model-prices/format.ts NEW_PC:~/.config/opencode/model-prices/
```

Restart OpenCode and inspect `/models`. Runtime needs no npm install because the `@opencode-ai/plugin` import is type-only and erased.

Optionally copy verification files:

```bash
scp ~/.config/opencode/model-prices/format.test.ts NEW_PC:~/.config/opencode/model-prices/
scp ~/.config/opencode/model-prices/plugin.test.ts NEW_PC:~/.config/opencode/model-prices/
scp ~/.config/opencode/model-prices/tsconfig.json NEW_PC:~/.config/opencode/model-prices/
```

Install the exact verified toolchain without changing package manifests or locks:

```bash
npm install --prefix ~/.config/opencode --no-save --package-lock=false '@opencode-ai/plugin@1.18.5' '@types/bun@1.3.14' 'typescript@5.9.3'
```

Do not install `@types/node` directly. On a newer compatible OpenCode/Bun host, matching host versions may be tested separately. The command above leaves `package.json`, any existing `package-lock.json`, and declared dependencies unchanged. Do not copy source manifests, OpenCode configuration, authentication files, environment variables, or credentials.

If verification files were copied, verify them without adding package scripts:

```bash
cd ~/.config/opencode
bun test model-prices/format.test.ts model-prices/plugin.test.ts
npm exec --prefix ~/.config/opencode -- tsc -p ~/.config/opencode/model-prices/tsconfig.json
```

Quit and restart OpenCode, then open `/models`.

Do not copy or overwrite `package.json`, lock files, `opencode.json`, `tui.json`, authentication files, environment variables, or credentials. The plugin registers `opencode`, `opencode-go`, `amazon-bedrock`, `cloudflare-ai-gateway`, `google-vertex`, `google-vertex-anthropic`, `openai`, and `zai-coding-plan`. Add another exact-ID hook only if the destination uses a different provider.
````

- [ ] **Step 2: Audit the guide for credential safety**

Confirm the guide contains no secret values, does not instruct users to copy `opencode.json`, and copies only plugin source plus optional tests and `tsconfig.json`.

- [ ] **Step 3: Perform a clean portability smoke test**

Run:

```bash
ls "/tmp/opencode"
PORTABLE_DIR="$(mktemp -d /tmp/opencode/model-prices-portability.XXXXXX)"
mkdir -p "$PORTABLE_DIR/plugins" "$PORTABLE_DIR/model-prices"
cp "/home/darumo/.config/opencode/plugins/model-prices.ts" "$PORTABLE_DIR/plugins/"
cp "/home/darumo/.config/opencode/model-prices/format.ts" "$PORTABLE_DIR/model-prices/"
PORTABLE_DIR="$PORTABLE_DIR" bun -e 'const mod = await import(`${process.env.PORTABLE_DIR}/plugins/model-prices.ts`); if (Object.keys(mod).length !== 8) process.exit(1)'
printf '{"dependencies":{"is-number":"7.0.0","@opencode-ai/plugin":"1.18.5"}}\n' > "$PORTABLE_DIR/package.json"
cp "$PORTABLE_DIR/package.json" "$PORTABLE_DIR/package.json.before"
npm install --prefix "$PORTABLE_DIR" --no-save --package-lock=false '@opencode-ai/plugin@1.18.5' '@types/bun@1.3.14' 'typescript@5.9.3'
cmp "$PORTABLE_DIR/package.json.before" "$PORTABLE_DIR/package.json"
test ! -e "$PORTABLE_DIR/package-lock.json"
cp "/home/darumo/.config/opencode/model-prices/format.test.ts" "$PORTABLE_DIR/model-prices/"
cp "/home/darumo/.config/opencode/model-prices/plugin.test.ts" "$PORTABLE_DIR/model-prices/"
cp "/home/darumo/.config/opencode/model-prices/tsconfig.json" "$PORTABLE_DIR/model-prices/"
(cd "$PORTABLE_DIR" && bun test model-prices/format.test.ts model-prices/plugin.test.ts)
npm exec --prefix "$PORTABLE_DIR" -- tsc -p "$PORTABLE_DIR/model-prices/tsconfig.json"
rm -r "$PORTABLE_DIR"
```

Expected: the production-only import exits with status 0 without credentials or source configuration; the optional no-save install leaves `package.json` byte-for-byte unchanged and creates no lock; 10 tests and typecheck pass; the temporary directory is removed.

- [ ] **Step 4: Run final runtime verification**

Run:

```bash
npm run test:model-prices
npm run typecheck:model-prices
opencode models | wc -l
```

Then start a temporary OpenCode server on an unused loopback port and inspect `/provider` as in Task 6. Expected: 10 tests pass, typecheck passes, every model from all registered connected providers has one suffix, IDs/counts remain unchanged, no network/LLM code exists in production files, and all temporary processes/artifacts are removed.

No commit is created because the implementation and guide live in user-global configuration and no commit was requested.
