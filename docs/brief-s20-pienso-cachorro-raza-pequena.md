# S20 — Small-breed puppy kibble comparison

Status: user approved main publication2026-10-21; original and Amazon correction pushes confirmed, application deployment unverified.
Target: 2100–2500 useful Spanish prose words; Spain Spanish; documentary comparison, no hands-on testing.
Primary query: pienso cachorro raza pequeña. Secondary: mejor pienso cachorro raza pequeña.

## Search evidence and angle

Parent observed real Google ES results on 2026-10-21: commercial comparison and retail intent.
Main query: Amazon category, TodoMascota mini, Kiwoko adults, Virbac Puppy Small & Toy,
Tiendanimal small-breed guide and Guaw puppy category. Mejor query: Tiendanimal guide,
Kiwoko, DonCanino junior, TodoMascota, Qanimals, Barakaldo, Patitas&co and ElConfidencial.
PAA: best small-breed puppy food and brands. No AI Overview observed.
Related queries include small-breed food, adult mini, OCU and 20 kg puppy packs.
Exact Surfer readings: 0/N/A; historical plan volume 260 is NOT current observed volume.
Existing large-breed puppy, adult mini and general puppy guides are distinct; link rather than repeat.
Explain expected adult weight, age windows and manageable pack sizes before ranking brands.
A toy puppy under 4 kg adult weight must not receive the Royal Canin Mini recommendation by default.
Editorial pick: Royal Canin Mini Puppy only for the verified 4–10 kg adult/2–10 month bracket.
No universal winner, fabricated pets anecdotes, veterinarians, test results, ratings or review counts.

## Verification and implementation constraints

Amazon API attempted first: sandbox fetch failed; network-enabled retry returned AssociateNotEligible
(requires 10+ qualified sales in 30 days). Initial pass returned no fields; subsequent authorized Playwright verification below resolved Amazon identities. No API retry/cache write.
Retail verification below was performed by parent/researcher; image downloads inspected by this worker.
ComparisonTable.astro allows omitted Amazon links but requires valoracion and emits Review/ratingValue
unconditionally. Do NOT use it for unrated products. Parent approved plain MDX/HTML table with existing
styles and store CTAs only inside that table; no AffiliateButton or changes to existing components.
TopPick.astro supports an editorial box without store links; no rating required.
No exported Tiendanimal helper found in src/lib. Existing private helper in ComparisonTable.astro
uses https://assets.ikhnaie.me/click.html?wgcampaignid=1746742&wgprogramid=9507&wgtarget=
plus encodeURIComponent(retailerURL). Match this established URL format; do not change components.
Use target="_blank" and rel="nofollow noopener noreferrer sponsored" on store links.
Avoid speculative stock/returns/shipping/Product schema; no fabricated numeric ratings.
Prices are dated observations, exclude conditional coupons, may change; no price guarantee.

## Compact source ledger

All sources below: verified by parent/researcher 2026-10-21; primary manufacturer or retailer evidence.
F1 https://www.royalcanin.com/es/dogs/products/retail-products/puppy---mini-3000
Complete dry food, 2–10 months, expected adult 4–10 kg; DHA, small kibble, FOS/MOS.
F2 https://www.advance-affinity.com/es/es/perro/comida-perro/mini-puppy-1000409.html
Complete Puppy Mini, 1–10 months, adult <=10 kg. Official chicken20/rice10/protein30/fat19;
retailer says rice17/fat21. Formula conflict unresolved: omit numerical composition for Advance,
do not merge formulas. Retail naming ActiveDefense/BabyProtect differs from current official name.
F3 https://www.vetcenter.purina.es/products/purina-pro-plan-cachorro-small-mini-healthy-start-rico-en-pollo
Complete small/mini puppy food; chicken20%, colostrum0.1%, protein32%, fat21%; 700 g/3 kg.
Use this exact Healthy Start source, never the unrelated Sensitive Skin URL.
F4 https://www.hillspet.es/dog-food/science-plan-puppy-small-mini-chicken-dry
Complete small/mini puppy food, 4 weeks–12 months; chicken17%, total poultry27%, DHA, small kibble.
F5 https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf
EU complete/complementary label distinction; gradual transition at least three days.
F6 https://vcahospitals.com/pets-first/know-your-pet/feeding-times-and-frequency-for-your-dog
Divide daily puppy food into 3–4 meals; no general hypoglycaemia prevention/treatment claim.
Budget: each F source max200 derived words TOTAL across article and FAQs; allocate F1–F4 <=180 each,
F5 <=150, F6 <=100. Paraphrase; never quote >25 words from any individual source.
Rest of article: clearly reasoned purchase examples, trade-offs and navigation, not new factual claims.

## Retail products and local image ledger

P1 https://www.tiendanimal.es/royal-canin-mini-puppy-pienso-para-perros/ROY150318_M.html
Observed 8 kg 45.99 EUR; alternatives 2 kg20.49/4 kg31.99. Local s20-royal-canin-mini-puppy.webp.
P2 https://www.tiendanimal.es/advance-active-defense-mini-puppy-pienso-para-perros/ADV501110_M.html
7 kg page34.59 EUR vs JSON-LD36.59; 3 kg21.59 observed. Publish Consultar precio, not exact quote.
SINIVA coupon minimum59 EUR and base unreconciled: omit. Local s20-advance-puppy-mini.webp.
P3 https://www.tiendanimal.es/pro-plan-puppy-small-y-mini-pollo-pienso-para-perros/PRO12272382_M.html
700 g7.59 EUR in stock; 3 kg19.99 OUT OF STOCK, do not recommend that pack. Local s20-purina-small-mini-puppy.webp.
P4 https://www.tiendanimal.es/hills-science-plan-pienso-pollo-para-cachorros-de-razas-mini/HIL2817V_M.html
6 kg52.49 EUR; alternatives 1.5 kg17.09/3 kg26.49. Extra coupon requires69 EUR: exclude.
Local s20-hills-puppy-small-mini.webp. All four local files under /images/productos/.
Each P source max200 derived words total; allocate <=110 each across table, descriptions and FAQs.
Actual inspected images: correct Mini Puppy/Small & Mini Puppy bags; Advance visibly marked7 kg.
RC/Purina/Hill images have no readable package weight, so illustrative product images cannot certify
selected pack weight. No contradictory visible weight found; describe weight as retailer selection,
not as photographed pack. Purina image label Healthy Start despite retailer URL containing Optistart.
All downloaded public Tiendanimal originals; resized within400x400 WebP, no labels altered.
Observed output: RC15230 bytes, Advance12520, Purina15462, Hill11820; each400x400 and nonblank.

## Hero and checks

/images/articulos/pienso-cachorro-raza-pequena.webp: Pexels8057550, Kampus Production.
Source: https://www.pexels.com/es-es/foto/mujer-perro-mascota-sentado-8057550/
Alt: Cachorro tricolor comiendo de un cuenco metálico junto a su cuidadora.
Actual view: young-looking small tricolour hound feeding indoors; breed/exact age unconfirmed.
800x534,42988 bytes; SHA256 2295fbdafbd57f5d68bd37e20ab6d2b62bf2c938c2f5ec5340a00d345ec13d34.
Compared192 other article WebPs: zero identical hashes. Hero and all product files visually inspected.
Original draft prose:1904 body+139 FAQ=2043 words. Corrected Amazon draft:1985 body+139 FAQ=2124 words, excluding headings/table/markup.
Metadata:title43/meta144; draft2026-10-21, schedule2026-10-19; publication approved2026-10-21.
Observed checks2026-10-21: npm run build passed (173 pages); affiliate-density and no-Zooplus-public passed.
Three changed YAML files parsed; CSV195 data rows retain17 columns; git diff --check passed.
Built page: correct trailing-slash canonical, natural title/meta, five local image paths, four sponsored
encoded Tiendanimal links; four JSON-LD blocks parse, Article/FAQPage with4 questions, no Review/ratingValue.
CSP native script found13 hashes; public/_headers byte-identical to HEAD.
Independent source-budget review: Royal Canin conservative allocation<190 words; all other sources<200.
Final built example corrected to30 kg. Parent browser checked desktop1440/mobile390: no page overflow;
mobile table scrolls358px client/499px content; four400px product images loaded, four CTAs accessible, FAQ opens.
Parent repeated affiliate-density check:exit0. User approved publication2026-10-21; integration and pushes confirmed, application deployment unverified.
No deterministic RED test for passive editorial work. No further build required after this bookkeeping.

## Final visual review and delivery authorization

Parent inspected13 desktop1440x1000 screenshots across11517px and24 mobile390x844 across17947px,
plus both mobile table ends and settled dark hero/table. Eight images loaded, no page overflow/cut/overlap;
four FAQ Enter toggles, seven TOC anchors below header, back-to-top and24 same-origin links200 verified.
Newsletter required/type validation without submission. Two console errors from autofill extension.
Follow-ups only, no fixes authorized: table CTAs offscreen without swipe hint; shared Header Escape;
shared AuthorBox fictional pets/testing claims. Shared sources unchanged from HEAD.
User explicitly authorized main publication and cleanup; delivery exception-ok supersedes chain question.
Browser page/tabs closed by tool; own previews stopped. Remote Git/deployment confirmation belongs to parent.

## Amazon correction — verified 2026-10-21

User requires Amazon monetization; original retailer-only delivery was corrected. Researcher opened each
actual Amazon page with authorized Playwright, confirming title, variant, photo, price and stock.
Parent independently reopened Purina, confirming OptiStart title/photo and 7.35 EUR in-stock buy box.
No guessed ASINs; manufacturer/retailer fallback history above remains distinct from this verification.

A1 https://www.amazon.es/dp/B005ZS7OUG
Royal Canin Puppy Mini; 800 g; 11,54 €; in stock on2026-10-21.
Photo: https://m.media-amazon.com/images/I/61EENt55NSL._AC_SX425_.jpg
Rendered optimized photo uses the same image identifier with ._AC_SL300_.jpg.

A2 https://www.amazon.es/dp/B00388OF7A
Advance Mini Puppy Pollo; 3 kg; 19,99 €; in stock on2026-10-21.
Photo: https://m.media-amazon.com/images/I/71FdRZO2b+L._AC_SX425_.jpg
Rendered optimized photo uses the same image identifier with ._AC_SL300_.jpg.

A3 https://www.amazon.es/dp/B0117E8PNQ
Purina Pro Plan Small & Mini Puppy OptiStart Pollo; 700 g; 7,35 €; in stock on2026-10-21.
Photo: https://m.media-amazon.com/images/I/61FaLMzk1kL._AC_SX425_.jpg
Rendered optimized photo uses the same image identifier with ._AC_SL300_.jpg.

A4 https://www.amazon.es/dp/B09Q8DVJRK
Hill’s Science Plan Puppy Small & Mini Pollo; 6 kg; 55,90 €; in stock on2026-10-21.
Photo: https://m.media-amazon.com/images/I/61H2wp-k9gL._AC_SX425_.jpg
Rendered optimized photo uses the same image identifier with ._AC_SL300_.jpg.

Advance Amazon variant age2–10 months is shown by its CTA; manufacturer general1–10 interval is
not transferred to that variant. Tiendanimal still says Consultar precio due conflicting prices.
Purina Amazon OptiStart and Tiendanimal Healthy Start are separately labelled; no formula equivalence
verified. Removed Healthy Start composition numbers from this cross-version comparison.
All A sources: max200 derived words each across article/table/FAQs; new facts limited to product title,
format, dated price, label/version and age. Conservative allocation per A source remains below100 words.
Existing manufacturer nutrition allocations unchanged except removing Purina formula numbers;
Royal Canin manufacturer conservative allocation remains below190, other sources below200.
AmazonTableLink validates10-character ASIN and constructs URL/tag internally; MDX has no literal tag.
Four Amazon CTAs first, four retained Tiendanimal second in one table; no ratings or new review schema.
Tiendanimal columns explicitly labelled, Amazon formats/prices separate, mobile horizontal-scroll hint.
Own source count:1985 body +139 FAQ =2124 useful prose words, excluding headings/table/markup.
Original main push94d44a0..abd834b and Amazon correction pushabd834b..ff7fe50 confirmed by parent.
Local HEAD and origin/main matched ff7fe50 after push; application deployment has not been verified.

### Final Amazon correction verification

Observed RED before edits: temporary assertion found0 Amazon CTAs. Same exact
`python /tmp/s20-amazon-check.py` passed after implementation and final scoped CTA fix:
four exact ASIN/host/tag/sponsored/noopener Amazon-first links, four retained Tiendanimal
links, store-specific packs/prices, version distinction, no literal MDX tag or fabricated Review.
Final `npm run build` passed:173 pages,13 CSP hashes; tracked headers unchanged.
Affiliate-density, no-Zooplus-public and git diff --check passed; changed YAML parsed;
CSV195 data rows retain17 columns. Four optimized AmazonCDN images returnedHTTP200,
nonblank; parent browser confirmed actual loading. Final prose:1985body+139FAQ=2124 useful words.
Parent inspected final desktop1440/mobile390 table with all four rows and right-side CTAs:
Ver en Amazon buttons122x44, nowrap and legible, full product in aria-label; table358px
client/557px scroll, no page overflow. All images loaded; four tagged hrefs exact.
Independent final component readback and identical assertion passed with no findings.
Own preview20003 stopped by Ctrl-C, observed exit130; localhost4321 connection refused
(curl exit7, HTTP000). No unrelated process touched; parent owns browser tab/session cleanup.
