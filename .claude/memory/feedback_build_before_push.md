---
name: Always build before push
description: Run npm run build before every git push to update CSP hashes and verify the site compiles
type: feedback
---

Always run `npm run build` before `git push`. The build runs `astro build && node scripts/update-csp-hashes.mjs` which updates CSP hashes in `public/_headers`.

**Why:** The CSP hashes must be in sync with the built output. Pushing without building can deploy broken CSP headers or miss build errors.

**How to apply:** After staging and committing changes, run `npm run build` first. If build succeeds and `public/_headers` changed, amend or add a new commit with the updated headers before pushing.
