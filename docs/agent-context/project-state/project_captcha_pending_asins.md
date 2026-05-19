---
name: Pending CAPTCHA ASINs to revalidate
description: 17 ASINs blocked by CAPTCHA during product validation on 2026-03-16, need to recheck
type: project
---

17 ASINs were blocked by Amazon CAPTCHA during the full product validation run on 2026-03-16. These need to be revalidated.

**ASINs to recheck:**
B001BYON4S, B002O0SK4W, B003TOM430, B004AWJA50, B00L3O2U28, B0115C7BL2, B01B1Q72VQ, B01FH6IID2, B01LX1SDAK, B01MSDL6B1, B06XVTB7DJ, B07KG3NYKM, B07VZBSVN2, B082K4X4V6, B08G819S9Z, B0B56YGN5Y, B0B5HDR4CW

**Why:** Amazon started returning CAPTCHAs after ~510 successful requests in a single session. The script `scripts/validate-products.mjs` was running a full scan of 542 ASINs.

**How to apply:** Re-run the validation script for these specific ASINs. Could also be done by running the script on individual articles containing these ASINs.
