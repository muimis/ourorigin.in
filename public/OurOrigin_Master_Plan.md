# OurOrigin — Master Site Plan
**"The Fifth Mark"**

> **Status: Proposed single source of truth.** This document is written to supersede the existing conflicting design specs in the repo. On approval, the other locked-spec files should be archived or deleted so this is the only reference engineers and designers pull from.

**Core idea in one line:** The mark is an incomplete tally — three strokes and a diagonal, one stroke short of a closed count of five. The visitor's journey through the site is the fourth stroke. The moment they act (add to ledger / complete a transfer), the gesture draws the fifth and closes the count, live, in front of them.

---

## 1. SITE PLAN

### 1.1 Sitemap
```
Home  (/)
├── The Yield  (/yield)
│     ├── Spices        (/yield/spices)
│     ├── Native Grains (/yield/grains)
│     └── Mountain Teas (/yield/teas)
│           └── Product Detail (/yield/[category]/[product])
├── The Ledger (Journal / transparency log)  (/ledger)
│     └── Ledger Entry  (/ledger/[entry])
├── First Hands (About / the covenant)  (/first-hands)
├── The Fifth Mark (the ritual, explained)  (/fifth-mark)
├── Cart / Transfer  (/transfer)
└── Contact / Wholesale  (/contact)
```

### 1.2 Navigation model
- Primary nav: minimal, 4 items max (The Yield, The Ledger, First Hands, Transfer/Cart). No mega-menu — against brand restraint.
- No sticky nav bar with a background fill; nav sits in `mix-blend-mode: difference` so it never needs its own box, consistent with "negative space is structural."
- Footer carries the secondary links (Contact, Wholesale, Fifth Mark explainer) rather than crowding primary nav.

### 1.3 Page-level intent
| Page | Job to be done |
|---|---|
| Home | Establish the covenant + the tally concept in one scroll, route to Yield |
| The Yield | Browse/shop, organized by the three "strokes" (spices/grains/teas) |
| Product Detail | Prove the specific transfer: lot number, farmer, date, price paid |
| The Ledger | Transparency log of lot-level transfer data (origin, date, terms) — no public "every fifth transfer" disclosure mechanic |
| First Hands | Brand manifesto / covenant, longer-form, poetic register allowed |
| Fifth Mark | Explains the ritual plainly for skeptical or confused visitors |
| Transfer (cart) | Checkout, framed as "completing a transfer" not "placing an order" |

---

## 2. VISUAL PLAN

### 2.1 Tokens (locked — do not introduce new ones without updating this doc)
```
--bone:    #F4EFE3   /* paper ground */
--forest:  #0C1509   /* real ink, not pure black */
--gold:    #B77B1D   /* the gesture, rationed */
```
Type: **Cormorant Garamond** (display/voice), **JetBrains Mono / DM Mono** (utility, labels, numerals). No new typefaces.

### 2.2 The governing proportion
Measured from the real vector: the three strokes are **48% / 31% / 21%** of total mark height. This ratio is not decorative — it is used as the actual structural ratio for the three "acts" of the site (see §3.2). Any section, grid, or scroll-length decision should default to checking against this ratio before inventing a new one.

### 2.3 Color discipline
- Bone and Forest alternate as full-bleed section backgrounds — never wall-to-wall cream. Minimum one Forest-ground section per page.
- Gold is rationed to **exactly two moments per page**: the wipe between Act One→Two, and Act Two→Three. It is never a hover color, never a bullet, never a repeated accent. If a designer reaches for gold a third time on a page, that's a flag to stop and reconsider, not a style choice to wave through.
- The dot appears **once per page**, always as the terminal action (CTA), never as decoration.

### 2.4 Motion principles
- "Controlled imperfection," not liquidity. No turbulence filters, no wobbling ink-bleed effects recalculated per frame — the mark's own language is restraint, not fluid morph.
- The gold gesture, wherever it's drawn, uses the **real centerline coordinates traced from the uploaded vector**, not an invented smooth bezier. Hand-made means using the actual hand, not simulating one.
- Every animation ships with a `prefers-reduced-motion` fallback that shows the end-state immediately, not a "lite" version of the same motion.

### 2.5 Imagery
- No rectangular product photography. Use pre-baked, static irregular clip-path masks derived once from the vector's own contours (not live filters — see §3.4 for why).
- Two photographic languages remain as previously locked: **The Artifact** (single object, forensic detail) and **The Gesture** (hands, motion, human presence). Every image on the site must be classifiable as one or the other; if it isn't, it doesn't belong on the site.

---

## 3. WORKING (TECHNICAL) PLAN

### 3.1 Stack
Astro (existing), GSAP + ScrollTrigger (already in codebase — no new animation library introduced).

### 3.2 The Fifth Mark mechanic
- **Desktop:** horizontal scroll-hijack. Mouse-wheel/trackpad vertical input is translated to horizontal scroll across three acts sized at 48:31:21 width ratio. A gold path — traced from the real gesture centerline — draws itself via `stroke-dashoffset` tied to scroll progress across the full horizontal track.
- **Mobile/touch:** the identical concept, rotated — a single vertical column, acts stacked top-to-bottom in the same 48:31:21 height ratio, with the gold thread running vertically. This is not a "fallback" or degraded experience; it's the honest per-device translation of the same idea.
- **Reduced motion:** scroll-hijack is disabled outright. Page renders as a normal vertical document in natural reading order, gold path shown fully drawn (static), no scroll-lock of any kind.
- **The fifth stroke:** on reaching the final act, the CTA ("Complete the Transfer" / "Add to Ledger") is the trigger that draws the closing diagonal — a short, one-time animation, not scroll-tied, so it can't be missed or triggered by accident.

### 3.3 Performance budget
- Exactly one scroll-tied `stroke-dashoffset` animation per page. No independent multi-speed parallax tracks (rejected in the previous plan — real jank and vestibular risk).
- Zero per-frame SVG filters (`feTurbulence`, displacement maps) on scroll. If a "liquid" moment is wanted anywhere, it must be a pre-rendered asset or a one-time triggered animation, never continuously recalculated.
- Target: Lighthouse performance ≥ 90 on mobile for Home and Product Detail templates specifically (the two highest-traffic templates).

### 3.4 Why static masks, not live filters
Live turbulence/displacement on scrolling photography is expensive on mid-range phones and was the single biggest performance risk in the prior "Liquid Flow" plan. Pre-cutting the organic edges once (from the real vector contours) achieves the same "not a rectangle" feeling at zero runtime cost.

### 3.5 Repo hygiene — this must happen as part of this build, not after
Per the existing codebase audit, the following are **blocking**, not backlog:
- [ ] Remove the hardcoded color outside the token system — audit for any hex value not in §2.1.
- [ ] Delete the rejected logo variant still sitting in the public directory.
- [ ] Resolve the two conflicting product-detail systems down to one.
- [ ] Fix the twelve products currently sharing four photographs — no product ships without its own Artifact/Gesture image pair.
- [ ] Archive the previous "locked" spec docs once this document is approved, so there is one source of truth, not five.

### 3.6 Accessibility & scroll semantics
- Horizontal scroll-hijack must remain keyboard-navigable (arrow keys or Tab should move between acts, not just wheel/trackpad).
- Screen reader DOM order must match logical reading order (Act 1 → 2 → 3) regardless of visual horizontal arrangement — do not rely on visual order alone.
- Anchor links and browser back/forward must return to a sane scroll position — test explicitly, this is a common smooth-scroll regression.

---

## 4. COMPONENTS PLAN

| Component | Responsibility | Key props/notes |
|---|---|---|
| `TallySpine.astro` | Top-level layout; owns the 48:31:21 act structure, desktop-horizontal / mobile-vertical switching | `acts: [ActContent]` |
| `GestureLine.astro` | Renders the real traced centerline path, owns the scroll-tied draw and the one-time "fifth stroke" close animation | `mode: 'scroll' \| 'trigger'` |
| `ActPanel.astro` | One of the three acts (stroke); background alternates Bone/Forest | `tone: 'bone' \| 'forest'`, `weight: 'long' \| 'medium' \| 'short'` |
| `GoldWipe.astro` | One-time clip-path transition between acts | fires once via ScrollTrigger, no scrub |
| `FifthMarkCTA.astro` | The single terminal action per page; triggers the closing gesture animation | `label`, `action` |
| `LedgerEntry.astro` | One lot-level transfer record (origin, lot number, date, terms) | no buyer-side data; standard product/lot attribution only |
| `ProductCard.astro` | Individual product tile, uses static organic mask, Artifact or Gesture image | `imageType: 'artifact' \| 'gesture'` |
| `Nav.astro` / `Footer.astro` | Global chrome | nav uses blend-mode, no background fill |

---

## 5. CONTENT PLAN

### 5.1 Vocabulary (locked — reuse exactly, do not paraphrase)
Transfer Ledger · Honor the Decision · Honored ✓ · Complete the Transfer · First Hands · The Yield · Add to Ledger

### 5.2 Tone
Direct, factual, slightly ceremonial — closer to a ledger entry or a witness statement than marketing copy. Avoid superlatives ("amazing," "premium," "artisanal") in favor of specific, checkable facts (lot numbers, dates, named people, agreed prices).

### 5.3 Content inventory needed before build
- [ ] Real (or realistic placeholder, clearly marked) lot data for at least 3 products per category
- [ ] Farmer/community names and consent for public attribution (see below)
- [ ] Photography: minimum one Artifact + one Gesture image per product — currently missing for most of the catalog
- [ ] First Hands manifesto copy (long-form, can draw on your poetry background for register, but must stay legible — this is not the place for maximal indirection)

### 5.4 Decision log: "every fifth transfer, published publicly"
Considered and **omitted** — this required an open-ended public consent and disclosure commitment (farmer + buyer named per transfer) that isn't being taken on. The Fifth Mark *mechanic* itself is unaffected: the visitor's own journey still stands as the fourth stroke, and their own action (completing their own transfer) still draws the closing gesture — that's a personal, single-user animation, not a public disclosure of anyone else's data. The Ledger page (§1.1, §1.3) instead shows standard lot-level transfer data — origin, date, terms — without any per-transfer public naming ritual attached.

---

## 6. QA / QC PLAN

### 6.1 Design QA (against this document)
- [ ] No color used anywhere outside §2.1 tokens
- [ ] Gold appears at most twice per page (the two wipes) + once for the terminal dot/CTA — flag any third use
- [ ] Every section alternates Bone/Forest — no page is wall-to-wall cream
- [ ] Every image is classifiable as Artifact or Gesture; none are generic stock-style shots
- [ ] Act length ratios verified against 48:31:21 on at least Home and one category page

### 6.2 Functional QA
- [ ] Desktop horizontal scroll-hijack works via wheel, trackpad, and keyboard
- [ ] Mobile renders the vertical translation correctly at 375px, 414px, and 768px widths
- [ ] `prefers-reduced-motion` fully disables scroll-hijack and shows static end-states — test with OS-level setting on, not just a media query in devtools
- [ ] Gesture line's scroll-tied draw doesn't desync on resize or on fast scroll (the prior codebase's known "GSAP scroll gauge desync" bug — verify explicitly it doesn't recur here)
- [ ] Anchor links, browser back/forward return to correct scroll position
- [ ] All CTAs route correctly; no placeholder numbers/links (the prior placeholder WhatsApp CTA bug — re-check for equivalents)
- [ ] Zero unreachable pages (previously found 3 — re-audit after this rebuild)

### 6.3 Performance QA
- [ ] Lighthouse mobile performance ≥ 90 on Home and Product Detail
- [ ] No `feTurbulence`/displacement filters running on scroll — confirm via performance profiler, not visual inspection alone
- [ ] Single scroll-tied animation binding per page — no competing/stacked ScrollTriggers

### 6.4 Accessibility QA
- [ ] Screen reader reads acts in logical order (1→2→3) regardless of visual horizontal layout
- [ ] Keyboard-only navigation can reach and activate every CTA, including the terminal Fifth Mark action
- [ ] Color contrast checked for reversed (Forest-background) sections specifically, not just the default Bone sections

### 6.5 Content/Ops QA
- [ ] Every Ledger/product lot entry has documented farmer attribution on file before going live (standard sourcing record-keeping — not tied to any public per-transfer ritual)
- [ ] No product page ships with a placeholder or borrowed photograph
- [ ] Repo hygiene checklist from §3.5 fully closed before this is called "done"

### 6.6 Sign-off gate
This build is not ready to ship until every unchecked box above is checked. (§5.4's public-disclosure ritual was considered and omitted — no outstanding decision blocks sign-off there.)
