# OpenCode model prices in `/models`

## Goal

Show each available model's input price, output price, and context window in OpenCode's native `/models` selector without replacing or reimplementing that selector.

The compact display format is:

```text
Claude Sonnet 4.6 · $3/$15 · 200K
```

Prices are USD per one million tokens, ordered as input/output. Models whose catalog prices are both zero display `Free`. Context uses compact `K` and `M` suffixes.

## Architecture

Install a global server plugin at `~/.config/opencode/plugins/model-prices.ts`. The plugin registers one exact-ID provider hook for every provider in the official Models.dev catalog snapshot. The snapshot taken on 2026-07-27 contains 172 provider IDs, including `kilo` for Kilo Gateway.

OpenCode's public v1 plugin API does not expose a wildcard provider hook to external local plugins. Its experimental v2 catalog transform is not accepted by the current external-plugin loader. The production module therefore contains generated named exports that all delegate to the same formatter. Registering a hook transforms that provider's catalog entry but does not authenticate, connect, enable, or expose an otherwise disconnected provider.

Every hook delegates to one pure transformation function. OpenCode passes the provider's already-loaded model catalog to the hook. The transformation returns every original model with all metadata preserved and changes only `model.name`.

The native `/models` command continues to own rendering, filtering, ordering, favorites, recent models, variants, and selection. Because it already renders `model.name`, the enriched names appear without replacing any selector behavior.

## Data Flow

1. OpenCode loads its model catalog and normalizes each model's `cost` and `limit` data.
2. The provider hook receives a serializable copy of that provider and its complete model record.
3. The plugin maps every model to a complete copy with a decorated `name`.
4. OpenCode continues its normal provider initialization and sends the resulting catalog to the TUI.
5. The existing `/models` dialog displays the decorated name and selects the original provider/model ID.

The plugin does not call an LLM, send prompts, or count tokens. It also does not fetch Models.dev or any pricing service itself, so it adds no network request.

## Formatting Rules

- Preserve the original model name as the prefix.
- Show `Free` when both input and output costs are zero.
- Otherwise show `$input/$output` using enough decimal precision to avoid rounding small non-zero prices to zero.
- Remove unnecessary trailing zeros.
- Format context values below one million as rounded `K` values and exact million multiples as `M` values.
- If cost or context metadata is absent or invalid, omit only that segment instead of preventing provider initialization.
- Never append the suffix twice if an upstream or duplicate hook already decorated the name.

## Scope And Side Effects

The decorated `model.name` can also appear wherever OpenCode displays the current model name. Provider IDs, model IDs, API options, costs, limits, capabilities, headers, variants, and status remain unchanged.

OpenCode's plugin API supports one exact provider ID per provider hook. The generated registrations cover every provider present in the official Models.dev snapshot, not only the providers connected on the machine where the plugin was created. Arbitrary custom provider IDs and providers added after the snapshot require regenerating the registration block. This does not duplicate formatting logic and does not require changing `format.ts`.

## Forward Compatibility

- The plugin never stores a model allowlist. Every model passed by a registered provider is transformed, so models added in later catalog updates work without code or configuration changes.
- The provider snapshot is exhaustive as of 2026-07-27 and is tested as an exact, duplicate-free set of 172 IDs. New provider IDs require a plugin update because the public v1 hook has no wildcard form.
- Runtime code uses only the public `provider.models` hook and a type-only import from `@opencode-ai/plugin`.
- Declare the development SDK as `^1.18.5` so compatible OpenCode 1.x releases can update it without changing the plugin.
- Add an explicit regression test with an arbitrary future model ID that is absent from the current catalog.
- Compatibility cannot be guaranteed if a future major OpenCode release removes or incompatibly changes the public `provider.models` hook. Such a release requires a plugin update rather than silent fallback behavior.

## Failure Handling

- A malformed individual model is returned unchanged.
- A formatting error must not remove models from the provider because provider-hook results replace the provider's complete model record.
- The transformation always returns every input record.
- The plugin has no remote dependency and therefore needs no network fallback.

## Verification

Use test-driven development for the pure formatter and provider transformation:

- Standard paid model: input/output/context are formatted correctly.
- Small decimal costs remain visible.
- Zero-cost model displays `Free`.
- Thousand and million context windows use compact units.
- Invalid metadata is omitted safely.
- Reapplying the transformation is idempotent.
- Every model and all non-name metadata survive the provider transformation.
- An arbitrary future model is decorated without adding its ID to plugin code.
- The registered provider IDs exactly match the 172-ID Models.dev snapshot and contain no duplicates.
- The `kilo` hook decorates a representative Kilo Gateway model while preserving its provider/model IDs.

Then verify:

- Strict TypeScript type checking against a compatible `@opencode-ai/plugin` `^1.18.5` release.
- OpenCode starts with the global plugin enabled.
- The provider API reports the same connected provider IDs before and after the exhaustive hook registration; the plugin must not connect or expose otherwise disconnected providers.
- All models from every connected provider represented in the snapshot retain their original IDs and per-provider counts, with exactly one decorated suffix.
- The native `/models` dialog shows the enriched names and still changes the active model normally.

## Configuration Changes

- Add the global plugin file under `~/.config/opencode/plugins/`, which OpenCode auto-discovers.
- Align `~/.config/opencode/package.json` from `@opencode-ai/plugin` `1.14.41` to the compatible range `^1.18.5`.
- Do not alter unrelated global configuration or credentials.
- Restart OpenCode after installation because plugins and configuration are loaded only at startup.

## Portability

Moving the plugin to another computer must not require copying the source computer's credentials or full OpenCode configuration.

Copy only:

- `~/.config/opencode/plugins/model-prices.ts`
- `~/.config/opencode/model-prices/format.ts`
- Optionally, `~/.config/opencode/model-prices/*.test.ts` for verification
- Optionally, `~/.config/opencode/model-prices/tsconfig.json` for type checking

On the destination computer, the two production files need no npm dependency installation because the SDK import is type-only and erased at runtime. Restart OpenCode after copying them. For optional verification only, install the tested toolchain with `npm install --prefix ~/.config/opencode --no-save --package-lock=false '@opencode-ai/plugin@1.18.5' '@types/bun@1.3.14' 'typescript@5.9.3'`; this must leave the destination manifests and declared dependencies unchanged. Never copy source `package.json`, lock files, `opencode.json`, `tui.json`, authentication state, environment variables, or credentials. The plugin works automatically for all 172 provider IDs in the 2026-07-27 Models.dev snapshot, including Kilo Gateway. An arbitrary custom provider or a provider introduced after that snapshot needs another exact-ID hook. Check release notes and `provider.models` API compatibility before using a future OpenCode 2.x release.
