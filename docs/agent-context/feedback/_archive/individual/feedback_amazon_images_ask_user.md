---
name: Ask user for Amazon image URLs
description: When needing Amazon product images, ask the user directly instead of trying to scrape them
type: feedback
---

Amazon blocks all attempts to scrape product image URLs (CAPTCHA on all regions). When a product needs an Amazon image URL (m.media-amazon.com/images/I/...), ASK THE USER directly to provide it.

**Why:** Wasted significant time trying to extract Amazon image URLs via web search, WebFetch, third-party sites, etc. None work. Manufacturer website images also fail due to hotlinking protection.

**How to apply:** When reviewing an article and a product needs a new/updated image, immediately ask the user: "Can you give me the Amazon image URL for [product name] at [Amazon URL]?" Don't try to find it yourself.
