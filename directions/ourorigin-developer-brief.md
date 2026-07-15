# OurOrigin — Website Brief

**Live:** https://ourorigin.pages.dev (canonical domain in code: `ourorigin.in` — confirm DNS is pointed before launch)
**Repo:** https://github.com/muimis/ourorigin.in
**Stack:** Astro 6 (static output) · GSAP 3.15 · Cloudflare Pages · Node ≥22.12
**Audience for this doc:** whoever is building this next — could be you, could be someone you hire.

---

## 0. Read this first

This is not a redesign brief. The concept is already unusual and already good — the job from here is to finish it, fix what's quietly broken, and hold every inch of it to a much higher standard of craft than most D2C sites bother with.

One honest note before the checklist: "zero flaws" and "no one has seen a site like this" are the right ambition to aim a team at, but they're not a state you arrive at and stop — they're a discipline you keep applying. So this brief translates that ambition into things that can actually be checked off: specific bugs, specific standards, specific numbers. Award-winning and genuinely singular is achievable. Perfect-forever isn't a real destination, and no one should feel like they've failed if a new edge case turns up in month four — the point is to have this few edge cases left when we ship.

---

## 1. What OurOrigin is

OurOrigin sources spices from the Western Ghats and sells them on a simple premise: most spice brands sell you a story about origin; this one tries to show you the origin itself and let you draw your own conclusion. The site's own manifesto ("Why This Exists") frames this as a structural claim, not a marketing one — the buyer isn't downstream of the origin, they're inside it.

That claim is built around **Seven Dimensions**, which is the backbone of every product page:

| Dimension | What it means here |
|---|---|
| **Geo** | The specific place — exact elevation and coordinates, not "the Western Ghats" as a vibe |
| **Bio** | The ecology the place produces |
| **Community** | The people who hold the knowledge — meant to be practitioners, not "beneficiaries" |
| **Method** | How the community works with the land |
| **Product** | The yield — physical evidence the other dimensions are real |
| **Observation** | The evidence layer — a documented record of what actually happened |
| **Time** | The living layer — origins change by season; conditions are current, not stock photography |

**Design north star:** restraint over decoration, implication over illustration. If a design decision needs to be justified with "it looks cool," that's a reason to cut it, not keep it. The reference quality bar is Korean advertising's use of visual metaphor and indirect emotional storytelling — mood and meaning carried by a single held shot rather than by saying the thing outright. Every animation, every line of copy, every layout choice should be checked against: does this add restraint and specificity, or does it add noise?

---

## 2. Current build — what's already here

**Architecture:** `Threshold` (landing/loading) → `TheMasterCompass` (global canvas + navigation between origins) → `TheDeepDive` (the per-product "Depth Experience": a scroll journey through the seven strata) → an Offering stratum → "Add to Ledger" → a WhatsApp + UPI checkout drawer (`Ledger.astro`).

**Content model:** two Zod-validated Astro content collections (`content.config.ts`):
- `origins` — 6 entries (Nilgiris, Idukki, Wayanad, Thiruvananthapuram, Malabar Coast, and one more), each with elevation, coordinates, rainfall, soil, a `community` object (`description`, `verified: boolean`, optional `verifiedDetail`), a `method`, four images, and narrative copy per image.
- `products` — 12 entries, each referencing an origin, marked `isAnchorProduct` (true = requires the full Depth Experience descent; false = a "Companion" product addable straight from the `Carousel`), with sizes/prices and an `isPriceVerified` flag per size.

Worth knowing: the origins schema already has a `superRefine` guard that **fails the build** if an origin is marked `verified: false` but its community description isn't the exact placeholder string ("Indigenous farming communities, [Region]"). Someone already built the safety rail for the honesty problem below — it just needs real data to flip it on.

**What's genuinely solid already, worth protecting:**
- Security headers in `public/_headers` — CSP, HSTS, X-Frame-Options, Permissions-Policy — all properly configured. Most sites this visually ambitious don't bother.
- `LiveWeather`/`LiveTelemetry` pull real current conditions from Open-Meteo for each origin's coordinates — genuine live data, not a decorative fake.
- `prefers-reduced-motion` is respected globally at the token layer (`tokens.css`), not bolted on per-component.
- The Zod schema validation described above — real structural discipline, not just types for show.

---

## 3. Locked decisions — do not redesign these without going back to the founder

Pulled from the project's own decision log. A new developer (or an AI agent) should treat these as fixed unless explicitly told otherwise:

- **Forest Deep `#0c1509`** is finalized as the primary brand color. Not a placeholder, not up for a "let's try it a shade warmer."
- **Sharp, brutalist structure**: `0` border-radius throughout, pure horizontal bands. This is a stated aesthetic choice, not an oversight.
- **Origin Mark**: 48px gauge size, 0.5 stroke-width on a 100×100 viewBox, static by default and animated only when explicitly requested by a prop. Treat its geometry as locked; if it needs to change, that's a founder conversation, not a drive-by tweak.
- **GSAP scroll distance** was deliberately halved (to 200%) from an earlier draft for punchier scroll velocity — if a future pass makes scrolling feel sluggish again, this is the first token to check, not to silently "fix" by design instinct alone.

**One item I want to flag rather than silently accept or silently override:** the decision log records the generic `"Indigenous farming communities, [Region]"` copy as confirmed, permanent launch copy, explicitly closing the question of using real names. That's a real decision and I'm not overriding it here. But it sits in direct tension with the manifesto's own definition of Community as specific "knowledge holders" and "practitioners," not a placeholder — and with the brand's whole reason for existing being that it shows the real thing instead of a marketing abstraction. If there's a good reason to keep it generic (privacy, or names not yet gathered, or a phased rollout), that's a legitimate call — I just think it deserves to be a conscious, revisited choice rather than something a developer inherits silently and never questions again. Worth two minutes of founder attention before more content locks around it.

---

## 4. Fix immediately — these are bugs, not opinions

| # | Issue | File(s) | Impact |
|---|---|---|---|
| 1 | **Wrong phone number on a live, primary CTA.** The "Speak to the Curator" button hardcodes WhatsApp number `1234567890`. Every other contact/checkout path in the codebase correctly uses the real number, `+91 96455 55668`. | `TheDeepDive.astro` (rendered live via `TheMasterCompass` on the homepage right now) | Anyone who taps this button today is sent to a chat with a number that isn't yours. Silent lost inquiries. |
| 2 | **Three built pages have no path to them from the live site.** `/why`, `/observations`, and `/contact` exist and work, but the only links to them live inside `CommandCenter.astro` — a component that isn't imported or rendered anywhere. The homepage renders only `TheThreshold` + `TheMasterCompass`; the persistent nav (`GlobalNav.astro`) has exactly one button, "All Yields." | `CommandCenter.astro` (dead), `GlobalNav.astro` | A visitor — or a search crawler — currently has no in-site way to reach your manifesto, your journal, or your contact page unless they already know the URL. |
| 3 | **Dev/test scaffolding is deployed to production and indexable.** `src/pages/test.astro` (titled "Direction 01: Test Page") and four `test-svg-*.html` files sit directly in `public/`, so they build to live public URLs. `robots.txt` currently allows everything (`Allow: /`), so these are crawlable. | `src/pages/test.astro`, `public/test-svg-fill-direct.html`, `public/test-svg-filled.html`, `public/test-svg-polygon.html`, `public/test-svg.html` | Internal scaffolding visible to the public and to search engines on your real domain. |
| 4 | **Two entire, different product-detail experiences exist and are both live, disconnected from each other.** See §4.1 — this is very likely the real cause behind "the homepage feels like endless scroll rather than organised." | `TheMasterCompass.astro`, `TheDeepDive.astro`, `DepthExperience.astro` | A visitor browsing from the homepage never reaches your best, most complete product experience — and gets a different one instead. |

**Fix approach for #1 and #2 specifically:** don't just patch the symptom. Pull the WhatsApp number into a single shared constant so it can't drift across files again, and decide where global navigation actually lives (footer, a nav drawer, or folded into the existing All Yields panel) rather than resurrecting `CommandCenter` as-is.

### 4.1 Why the homepage feels disorganised — the actual cause, verified in code, with the fix

This isn't a vibe — I traced it. Here's exactly what's happening:

**There are two completely separate systems for showing a product, and they never talk to each other.**

1. **The homepage path** (`/` → `TheMasterCompass` → tap a product card): opens `TheDeepDive.astro` as an overlay — a tab/ribbon system (BIO · GEO · METHOD · PEOPLE · PRODUCT buttons at the bottom, swapping panels on tap). This is where the wrong WhatsApp number from #1 lives.
2. **The direct-link path** (e.g. `/origins/wayanad/black-pepper`, what a shared link, QR code, or search result would point to): renders `DepthExperience.astro` — the real scroll-pinned, GSAP-driven descent through Geo → Bio → Community/Method → Product, ending at the actual Ledger checkout.

A visitor exploring from your homepage **never reaches path 2 at all.** Every product card and every row in "The Index" calls a function called `triggerDeepDive()`, which only ever opens the overlay in path 1 — it has no idea path 2 exists. So the homepage shows people your *less finished, less complete* product experience (no real checkout, a broken contact button), while your *actual best work* — the one this whole brief and the Cipher were built for — sits at a URL your own homepage never links to.

Encountering two different interaction languages for "look at a product" depending on which door you came in is a very believable reason a scroll/browse session feels disorganised rather than designed. The fix is to stop maintaining two products and commit to one.

**There's also a real, measurable bug feeding the same feeling**, inside `DepthExperience.astro` itself. The main scroll timeline pins the page for `end: "+=350%"` of scroll distance — over three and a half screen-heights, deliberately, per the code's own comment ("luxurious, deliberate pace"). But the one existing progress cue, the descending Origin Mark gauge, is on a *separate* scroll trigger still set to `end: "+=200%"` — a leftover from before the pacing was slowed down. That gauge finishes its journey and visually stops at 57% of the way through, so for the last third-plus of a very long scroll, there is currently *zero* visual signal that anything is still happening. That's not a feeling, that's a desync bug, and it's an easy one-line fix.

**Recommended direction:** retire `TheDeepDive.astro` as the homepage's product experience. Keep `TheMasterCompass` purely for browsing (the Lobby, the Yield/Horizon/Index streams) and have every card and row navigate to the real canonical product URL instead of opening the overlay. One product experience, everywhere, and it's the good one.

**Patch 1 — fix the gauge desync (one line, `DepthExperience.astro`):**
```js
// Inside initDepthGauge()'s scrollTrigger — currently:
end: "+=200%", // Matches the new faster pin duration

// Change to match the actual pin duration used by the main timeline:
end: "+=350%",
```

**Patch 2 — send homepage clicks to the real product page instead of the overlay (`TheMasterCompass.astro`):**

Add the origin alongside the existing slug on every trigger element:
```astro
<!-- in the #view-yield stream item -->
<button class="stream-btn-trigger"
  data-slug={y.id || y.slug}
  data-origin={typeof y.data.originSlug === 'object' ? y.data.originSlug?.id : y.data.originSlug}
  style="background:none;border:none;cursor:pointer;padding:0;">

<!-- in the #view-index ledger row -->
<div class="ledger-row"
  data-slug={y.id || y.slug}
  data-origin={typeof y.data.originSlug === 'object' ? y.data.originSlug?.id : y.data.originSlug}>
```

Then replace the trigger function in the `<script>` block so it navigates instead of opening the overlay:
```js
// Replace triggerDeepDive(slug) with this
function triggerDeepDive(slug, origin) {
  if (!slug || !origin) return;
  window.location.href = `/origins/${origin}/${slug}`;
}

streamTriggers.forEach(btn => {
  btn.addEventListener('click', () => {
    triggerDeepDive(btn.getAttribute('data-slug'), btn.getAttribute('data-origin'));
  });
});

ledgerRows.forEach(row => {
  row.addEventListener('click', () => {
    triggerDeepDive(row.getAttribute('data-slug'), row.getAttribute('data-origin'));
  });
});
```

Once this is live and confirmed working, delete `TheDeepDive.astro` and its `<TheDeepDive products={yields} origins={origins} />` render line entirely — add it to the §6 cleanup list. This also permanently resolves bug #1 above, since the broken "Speak to the Curator" button's only code path goes with it.

**Patch 3 — give the horizontal product stream a sense of "how many, where am I" (`TheMasterCompass.astro`):**

```html
<!-- place just after the .horizontal-stream div -->
<div class="stream-position" aria-live="polite">
  <span id="streamIndex">1</span> / <span id="streamTotal"></span>
</div>
```
```css
.stream-position{
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
  font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.1em;
  color:var(--color-warm-cream); opacity:0.7; z-index:50;
}
```
```js
function initStreamPosition(streamEl){
  const items = streamEl.querySelectorAll('.stream-item');
  const indexEl = document.getElementById('streamIndex');
  const totalEl = document.getElementById('streamTotal');
  if(!items.length || !indexEl || !totalEl) return;
  totalEl.textContent = items.length;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && entry.intersectionRatio > 0.6){
        indexEl.textContent = Array.from(items).indexOf(entry.target) + 1;
      }
    });
  }, { root: streamEl, threshold: 0.6 });
  items.forEach(item => io.observe(item));
}
document.querySelectorAll('.horizontal-stream').forEach(initStreamPosition);
```

**Patch 4 — wire the Cipher (§8.3) into the real scroll timeline, not a demo one.** The standalone preview used `IntersectionObserver` because it was plain scroll. The real page is GSAP-pinned and scrubbed, so it needs to hook into the timeline that already exists instead:

```js
// Replace the existing tl.eventCallback('onUpdate', ...) block with this expanded version
tl.eventCallback('onUpdate', function() {
  if (this.progress() > 0.8 && originSlug && productSlug) {
    localStorage.setItem(`ourorigin_explored_${originSlug}_${productSlug}`, 'true');
  }
  updateCipher(this);
});

const STEP_DIMS = [
  ['geo', 'observation'],   // step0 — canopy
  ['bio'],                  // step1 — land
  ['community', 'method'],  // step2 — hand
  ['product', 'time'],      // step3 — specimen
  []                        // step4 — offering
];

function updateCipher(timeline){
  const t = timeline.time();
  let activeStep = 0;
  for (let i = 0; i <= 4; i++){
    const label = timeline.labels['step' + i];
    if (label !== undefined && t >= label) activeStep = i;
  }
  const activeDims = STEP_DIMS[activeStep];
  document.querySelectorAll('.cipher-glyph').forEach(btn => {
    btn.classList.toggle('active', activeDims.includes(btn.dataset.dim));
  });
}
```

The glyph markup, the seven SVGs, and the label-reveal-once behavior are already fully specced in §8.3 and already built and tested in the interactive preview — bring that markup/CSS in as-is and add `data-dim="geo"` etc. to each button so `updateCipher` above can find them. Nothing there needs to be redesigned, only reconnected to real scroll data instead of demo scroll data.

### 4.2 Content has no hierarchy — the same 12 products, listed three times, alphabetically

Checked the live site directly. The same 12 products currently appear in three different places — "The Yield," "The Index," and the "All Yields" quick panel — and two of the three list them in flat alphabetical order, with zero grouping by origin. That directly contradicts the homepage's own opening line, "we do not greet the visitor with a catalog" — alphabetical order *is* the catalog convention. It's also, very likely, the concrete thing behind "feels like a basic PowerPoint of randomly placed things": twelve near-identical cards (same image shape, same field order, same paragraph length), in an order with no meaning behind it.

The good news: the site already has the right pattern, just not applied everywhere. The "All Yields" panel groups by origin and already orders those groups by elevation, high to low: Nilgiris (2600m) → Idukki (1200m) → Wayanad (1100m) → Thiruvananthapuram (10m). "The Yield" and "The Index" don't do this — they use a plain `.sort((a,b) => name.localeCompare(name))`, alphabetical, origin-blind.

**The fix:** order the whole catalog as one continuous descent down the Ghats — high to low — matching the "DESCEND INTO ORIGIN DETAILS" language already on every card. Same data, no new content, just one shared sort used everywhere instead of three different orderings invented independently.

```js
// In TheMasterCompass.astro — replace the existing alphabetical `sortedYields`
// block, and use this ONE array for both #view-yield and #view-index
// (currently #view-yield maps over raw `yields`, unsorted; #view-index uses
// the old alphabetical `sortedYields`. Both should use this instead.)

function parseElevation(elevStr) {
  const match = String(elevStr || '').match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
}

const elevationById = Object.fromEntries(
  origins.map(o => [o.id, parseElevation(o.data.elevation)])
);

function originIdOf(y) {
  return typeof y.data.originSlug === 'object' ? y.data.originSlug?.id : y.data.originSlug;
}

// Descend through the Ghats, highest origin first — not the alphabet
const sortedYields = [...yields].sort((a, b) => {
  const elevA = elevationById[originIdOf(a)] ?? 0;
  const elevB = elevationById[originIdOf(b)] ?? 0;
  if (elevB !== elevA) return elevB - elevA;
  return (a.data.name || '').localeCompare(b.data.name || '');
});
```
Then swap `{yields.map((y, index) => (` at the `#view-yield` stream (line ~49) to `{sortedYields.map((y, index) => (`, so both views read from the same ordered list.

### 4.3 Visual fine-tune — what's actually undermining "premium" right now

**The single most damaging thing, visually: four photographs are covering twelve products.** Checked the live cards directly — `black-pepper.png` is shown for Forest Black Pepper *and* Dry Ginger *and* Turmeric *and* Green Pepper *and* White Pepper. `clove.png` covers Cinnamon, Single Origin Clove, *and* Mace. `tea.png` covers Coffee, Green Tea, *and* Tea. Only Cardamom has its own image. A visitor scrolling the stream will see the identical photograph under two or three different product names within the same session — that reads as careless faster than almost anything else on the site could, no matter how good the typography and motion are around it. If real photography for all twelve isn't possible immediately, shooting distinct photos for these specific collisions first is the highest-leverage fix available: (Dry Ginger, Turmeric, Green Pepper, White Pepper) sharing one photo, and (Cinnamon, Single Origin Clove, Mace) sharing another, and (Coffee, Green Tea, Tea) sharing a third.

**Nothing visually signals what's actually special.** Forest Black Pepper is the flagship — it's the product the whole Depth Experience, the Ledger, and the Cipher were built around — but in the stream it gets the exact same card size, weight, and treatment as every other SKU. The product schema already has an `isAnchorProduct` flag doing nothing visually. Use it:

```css
/* TheMasterCompass.astro — give anchor products real visual weight,
   instead of identical treatment for all twelve */
.stream-item[data-anchor="true"] {
  width: min(70vw, 640px); /* wider than a standard stream-item */
}
.stream-item[data-anchor="true"] .stream-title {
  font-size: clamp(28px, 4vw, 40px); /* larger than standard stream-title */
}
```
```astro
<!-- add data-anchor to the existing stream-item div -->
<div class="stream-item" data-anchor={y.data.isAnchorProduct ? "true" : "false"}>
```

**The bracket motif has been used so consistently it's stopped meaning anything.** `[WAYANAD COLLECTIVE]`, `[SIZES & VALUES]`, `[DESCEND INTO ORIGIN DETAILS]`, `[IDENTIFIER]`, `[PATH 01]` — brackets originally read as a system/telemetry marker, a nice restrained signature. Applied to every label on the page regardless of whether it's a real button or just a caption, they lose that meaning — nothing is marked as more actionable than anything else. Reserve brackets for things a visitor can actually act on (buttons, links); drop them from pure captions like the collective tag and the sizes label.

**The Horizon item drops the one production value the rest of the site relies on.** "Winter Curing Vanilla" is presented as a bare data table with no image at all, while every Yield card has real packaging photography. A "coming soon" moment is exactly where anticipation should be built up, not where visual quality quietly drops — even a placeholder textured background (matching the restraint already used for the missing Wayanad land photo) would be better than a photo-less table.

---





## 5. Trust & compliance — before this takes real orders at scale

- **No privacy policy, refund/return policy, shipping policy, or terms of service anywhere**, despite the Ledger collecting full name, address, and phone number for a manual WhatsApp + UPI order. Of everything in this document, this is the one I'd call an actual pre-launch blocker rather than a polish item — it's needed before running paid ads, listing on any marketplace, or fielding a "can I get a receipt" question.
- **All 12 products share one identical generic packaging mockup image.** At the price point this brand is asking for (₹100s per pack, positioned as premium), zero real product photography is a trust gap no amount of scroll choreography fixes.
- **The Observation dimension, as currently built, is only the live-weather widget.** The manifesto defines Observation as a documented record of what was actually harvested, when, under what conditions, by whom. Current weather at the coordinates is genuinely nice (see §2) but it's evidence of *Time*, not evidence of a specific harvest event. Worth deciding: does Observation need even a lightweight real harvest-log layer to earn its name, or should the manifesto's definition be tightened to match what's actually delivered? Right now the two don't quite agree with each other.
- **Malabar Coast is a fully scaffolded sixth origin with zero live products.** Its images are flagged `isPlaceholderImagery: true`, its rainfall/soil fields literally say `[LIVE DATA REQUIRED]`, and its narrative copy says "This origin is still being documented" in all three slots. It's a loose thread in the content model — decide whether it launches, stays hidden, or gets removed, rather than leaving it half-built.

---

## 6. Code health — clean up before adding anything new

- **Eight fully-built components are never imported anywhere:** `CartDrawer`, `CommandCenter`, `HeroStorefront`, `LaunchScreen`, `LivingCanvas`, `OriginCarousel`, `UniversalConstellation`, `YieldGrid`. `CartDrawer` in particular duplicates the WhatsApp-checkout logic that `Ledger.astro` already owns live — two sources of truth for the same job is exactly how the wrong-number bug in §4 happens again next month. Delete outright, or if something is genuinely earmarked for a near-term relaunch, move it to a clearly marked `_drafts/` folder instead of leaving it live in `components/`.
- **A ninth, conditional on §4.1: `TheDeepDive.astro`.** Currently live (it's what the homepage actually opens today), but once Patch 2 in §4.1 ships and homepage clicks navigate to the real product page instead, this entire 400-line component — overlay markup, pillar system, and the broken WhatsApp button inside it — becomes dead weight and should be removed in the same pass.
- **One-off generation/patch scripts are sitting inside `src/components/`**, which should hold only `.astro` UI components: `generate_polygons.js`, `patch_footer_hud.cjs`, `patch_polygons.cjs`, `patch_polygons2.cjs`, `patch_scroll.cjs`, `polygons.json`. Move these to `/scripts` or `/tools`, or delete if the one-time migration they performed has already been applied.
- **`public/maps/` has real duplicates.** `wayanad.svg` and `wayanad_solid.svg` are byte-for-byte identical (verified by checksum). `wayanadu map cut_solid.svg` and `wayanadu map outline.svg` carry both a typo and a space in the filename — bad practice for a web-served asset and an easy path to referencing the wrong file later. Consolidate to one canonical, correctly-named file per map.
- **An orphaned, placeholder-looking color token lives in `tokens.css`:** `--color-primary: #123456`, labeled "Added for origin marks fallback." `#123456` reads exactly like a value someone typed as a temporary stand-in (it's literally sequential digits) and it doesn't belong to the brand palette. Confirm whether this fallback is ever actually hit in production, and if so, replace it with a real brand color.
- **`sharp`, `potrace`, and `jimp` are real dependencies in `package.json`**, but nothing in the live render path uses them — imagery ships as static `.webp` via CSS `background-image`, with no build-time image processing pipeline touching it. Confirm they're still needed for one-off asset-generation scripts (several exist in `/scripts`), or trim them for a smaller dependency tree and faster installs.
- **Minor consistency drift example:** `contact.astro` correctly references the shared color tokens (`var(--color-forest-deep)`, etc.) but hardcodes its own font-family strings (`'Cinzel', serif`, `'Cormorant Garamond', serif`, `'DM Mono', monospace`) and spacing values instead of the existing `--font-institutional` / `--font-narrative` / `--font-evidence` and `--space-*` tokens already defined in `tokens.css`. Small, but this is exactly the kind of thing worth sweeping the whole codebase for — the "zero flaws" standard lives or dies in details like this.

---

## 7. Performance & accessibility

Every origin photograph (canopy / land / hand / specimen — 300–700KB `.webp` files) is rendered as a CSS `background-image` on a plain `<div>`, never as an `<img>` or Astro's own `<Image />` component. Concretely, this means:

- **Zero alt text anywhere in the imagery** — nothing for a screen reader to announce on the site's most visual pages.
- **No responsive `srcset`/`sizes`** — a phone downloads the exact same file a 4K monitor would.
- **No native lazy-loading**, and Astro's built-in image optimizer never touches these files even though Astro ships it by default.

Recommend migrating this rendering path to `astro:assets`'s `<Image />` component, with real alt text sourced from the narrative copy that already exists per image in the content model — the words are already written, they just need to reach the DOM in a form assistive tech can use.

**Hold these budgets before calling any page "done,"** measured on a throttled 4G profile (the honest connection speed for a meaningful share of actual buyers):
- Lighthouse Performance / Accessibility / Best Practices / SEO ≥ 95 on mobile
- LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## 8. Making it unconventional, legible, and unmatched — concretely

Sites that actually win Awwwards/FWA/CSSDA-type recognition rarely win on novel technology — they win on (a) a genuinely distinct point of view executed with total consistency, and (b) zero friction between the "wow" moment and the "buy" moment. OurOrigin already has (a): the seven-states descent, the Origin Mark, the restraint, the real live weather. Everything below is about making sure execution never quietly undercuts it, and about making the site teach its own logic the way a good alphabet book teaches letters — through repetition and pattern, not through an instructions page.

### 8.1 The one rule: spend strangeness on meaning, never on mechanics

"Unconventional" and "understandable" aren't actually in tension — they just have to live in different layers of the same product.

| Keep completely familiar (mechanics) | Free to be unconventional (meaning) |
|---|---|
| Scroll direction and physics | The seven-strata descent structure itself |
| What a tap/click does | The Origin Mark and its motion language |
| Price formatting, cart/Ledger behavior | Poetic section labels (as long as a plain-language fallback exists — see §8.3) |
| Checkout and contact form fields | Pacing and rhythm of scroll-triggered reveals |
| Back/forward navigation, load and error states | Visual metaphor in photography and copy; the live-weather integration |

Rule of thumb for any new feature request from here on: if removing it would make the site feel like everyone else's, it belongs on the right and should stay unconventional. If someone has to learn it before they can act on it, it belongs on the left and should behave exactly as expected, no exceptions.

### 8.2 The design laws this site is already leaning on — named, so no one relitigates them by gut feeling

| Law | What it says | Applied here |
|---|---|---|
| **Jakob's Law** | People spend most of their time on other sites, so they judge yours by whether it behaves like the ones they already know | Justifies §8.1 directly — the strangeness budget gets spent on meaning, never on how a button or a cart behaves |
| **Miller's Law** | Working memory reliably holds about 7±2 chunks at once | Seven Dimensions sits right at that ceiling — a first-time visitor can't be expected to hold Geo/Bio/Community/Method/Product/Observation/Time unaided. Direct justification for the Cipher in §8.3 |
| **Hick's Law** | Decision time grows with the number and complexity of choices on screen | The argument for keeping the Depth Experience's one-stratum-at-a-time reveal (already built) rather than ever flattening it into an all-at-once grid or dashboard |
| **Aesthetic-Usability Effect** | People perceive beautiful interfaces as more usable than they actually are — so real friction hides especially well inside something this good-looking | The team closest to this project is the group most exposed to this bias. It's the reason the cold first-time-buyer test below isn't optional polish — it's the actual check against a well-documented blind spot |
| **Von Restorff Effect** | An item that visually breaks the pattern around it is disproportionately noticed and remembered | "Add to Ledger" should be the one element per stratum that visibly departs from the poetic, atmospheric visual language. Nothing in the system currently does this on purpose |
| **Peak–End Rule** | People judge an experience mainly by its most intense moment and how it ends, not the average of every moment | The final Offering stratum and the WhatsApp handoff sit at exactly the peak and the end of the entire journey — which is precisely why the wrong-number bug in §4 matters more here than a broken link would on an ordinary site |
| **Doherty Threshold** | Systems that respond within ~400ms keep people in a state of flow; slower breaks attention measurably | The human reason behind the Core Web Vitals budgets in §7 — GSAP's scroll-triggered reveals need to feel instant to the finger, not just fast on a cold load |

### 8.3 The Cipher — turning "seven dimensions" from a claim into something the UI teaches you

This is the concrete answer to "understandable like an alphabet book." It extends infrastructure that already exists rather than inventing a new one.

**What it is:** a family of seven small glyphs, one per dimension, sharing the exact visual language already locked for the Origin Mark (same stroke weight, same 100×100 viewBox grid, same restraint) — so they read as siblings of a mark that already exists, not a new decorative system bolted on top.

**Where it lives:** a slim, persistent rail — vertical along the side of the viewport during the Depth Experience on desktop, collapsing to a horizontal strip on mobile (same breakpoint convention `GlobalNav.astro` already uses at 768px).

**What it does:**
- As the visitor scrolls through the seven strata, the glyph matching the current stratum fills or highlights — simultaneously a progress indicator and a legend, at no extra cost in screen space.
- **First visit:** each glyph reveals its one-word label the moment that dimension first appears (a small "GEO" fades in beside the mark, then fades out once past).
- **Every visit after:** labels stop appearing — just glyphs. This is the literal mechanism behind the alphabet-book request, not just the mood: exactly like a reader who no longer needs "A is for Apple" captions by the tenth page.
- Reuse the exact `ourorigin_explored_${originId}_${product.id}` localStorage key already implemented in `AllYieldsPanel.astro` to decide first-visit versus returning — no new state system required; this already exists in the codebase and already does this job for the "You've been here before" pattern.
- The rail stays tappable at all times even once labels stop appearing by default — tapping any glyph jumps straight to that stratum and briefly re-shows its label, so the legend is never fully hidden, which matters for anyone who forgets one meaning six products in.

**Accessibility:** each glyph gets a real `aria-label` carrying the full dimension name plus a one-line description ("Geo — the exact place, not a region"), and the rail is marked up as `role="navigation" aria-label="Origin dimensions"`, since that's genuinely what it is.

**Why it's worth building:** it turns Seven Dimensions from a claim made once on `/why` into something the interface itself teaches, every visit, for free — no new content required, since it's a UI layer over narrative copy that already exists per stratum. Nothing in spice or FMCG D2C currently does this.

**Where it sits in the build:** not urgent — a Phase 5 item, after the trust, code-health, and imagery work in §4–§7 (see §9). It's the single highest-leverage item for the "nothing else looks like this" ambition specifically, precisely because it's cheap to build relative to how much differentiation it buys.

### 8.4 The craft-bar checklist

- **A full typography/spacing token audit** — every component should pull from `tokens.css`, never redeclare its own font-family or spacing values (see the `contact.astro` example in §6). One drifted component is how sites slowly stop feeling like one thing.
- **A first-time-buyer test, done cold.** Sit someone who has never seen the site in front of it and time how long it takes them to find and complete a single purchase. This is the direct countermeasure to the aesthetic-usability effect in §8.2 — internal judgment alone cannot catch this.
- **Motion consistency** — the easing curve and duration tokens already exist (`--ease-settle`, `--duration-*`); the discipline is making sure no future component invents its own timing function instead of reusing them.
- **Real photography for all 12 SKUs**, replacing the single shared mockup (§5) — this alone will do more for perceived premium-ness than any additional animation.

Once §4 through §7 are actually done, and the Cipher and this checklist are in place — this is genuinely in a place worth submitting to design award sites. The concept is already unusual enough to be worth showing; the work from here is making sure nothing sloppy is standing next to it, and that the unconventional parts teach themselves instead of confusing a first-time visitor.

No serious claim of being "unmatched" or "flawless" can honestly be made in advance of that testing — but this is the concrete, checkable path to actually earning it, rather than just asserting it.

---

## 9. Suggested phasing

1. **Stop the bleeding** — fix the wrong WhatsApp number; unify homepage clicks to the real product page (§4.1, Patches 1–3); wire up real navigation to `/why`, `/observations`, `/contact`; pull test/dev pages out of production; decide Malabar Coast's fate.
2. **Trust & compliance** — privacy/refund/shipping/terms pages; founder decision on the community-naming tension (§3); resolve or reframe the Observation-layer promise (§5).
3. **Code health** — delete or quarantine the eight (now nine, see §6) unused components once Patch 2 confirms the homepage no longer needs `TheDeepDive`; consolidate `CartDrawer`/`Ledger` into one real checkout source of truth; relocate stray scripts out of `src/components`; dedupe the map SVGs; trim unused dependencies.
4. **Imagery & performance** — real product photography per SKU; migrate origin imagery to `astro:assets`'s `<Image />` with real alt text; hit the Lighthouse/Core Web Vitals budgets in §7.
5. **The Cipher** — build the glyph-key rail specified in §8.3, wired into the real GSAP timeline per §4.1 Patch 4. Highest-leverage item for genuine differentiation, and cheap relative to its payoff.
6. **Craft polish** — the full token-consistency sweep and cold first-time-buyer test from §8.4.
7. **Ship & submit** — once 1 through 6 are done, this is ready for real launch traffic, paid acquisition, and award submissions.

---

## Appendix A — Site map (as currently built)

- `/` — Threshold → Master Compass → Depth Experience for the active anchor product
- `/origins/[originSlug]/[productSlug]` — individual product deep-dive pages
- `/why` — brand manifesto ("The Final Inch") — *currently unreachable from live navigation, see §4*
- `/observations` — numbered journal of short essays/field notes — *currently unreachable from live navigation, see §4*
- `/contact` — contact details, WhatsApp/email, bulk-order note — *currently unreachable from live navigation, see §4*
- `/404`

## Appendix B — Design tokens (locked, from `tokens.css`)

| Token | Value |
|---|---|
| `--color-forest-deep` | `#0c1509` (primary, finalized) |
| `--color-warm-cream` | `#F5EDD8` |
| `--color-gold` | `#A67C3C` |
| `--color-ruby` | `#8a2a2b` |
| `--color-copper` | `#b87333` |
| `--color-silver` | `#c0c0c0` |
| `--font-institutional` | Cinzel |
| `--font-display` / `--font-narrative` | Cormorant Garamond |
| `--font-evidence` / `--font-mono` | DM Mono |
| `--ease-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration-*` | 120ms / 320ms / 700ms / 1000ms |
| Origin Mark | 48px gauge, 0.5 stroke-width, 100×100 viewBox |
| Border radius | `0` everywhere — deliberate, brutalist |

## Appendix C — Ops facts a developer will need

- Real WhatsApp (use everywhere): **+91 96455 55668**
- Contact email: **ourorigin.in@gmail.com**
- FSSAI Reg. No. **21326135000354**
- Canonical domain in code: **ourorigin.in** — confirm DNS/deployment status before treating it as live
