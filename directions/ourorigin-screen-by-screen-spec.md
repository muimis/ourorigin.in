# OurOrigin — Screen-by-Screen Specification

**Fourth document.** Brief 1 = bugs/code. Brief 2 = what OurOrigin is. Brief 3 = the visual system's rules. This one applies those rules to every real screen, element by element, so the same template governs all of them — consistency by construction, not by luck.

Two consolidations, stated once so nothing below is ambiguous: the new **Opening Sequence** absorbs the current `TheThreshold` (one screen, not two competing hellos). **The Core** absorbs the current Lobby + "The Yield" (one origin-first entry point, not three equally-weighted menu buttons competing with it). Horizon and Index remain, but as reachable secondary views, not front-door choices.

---

## 0. The template used for every screen below

- **Purpose** — why this screen exists, one line.
- **Entry / Exit** — how a visitor arrives, where they can go next.
- **Regions** — fixed-top / scrollable / fixed-bottom.
- **Elements, top to bottom** — content, hierarchy level (1 Statement / 2 Evidence / 3 Narrative / 4 Whisper, per Brief 3 §2), size, color, spacing.
- **Mobile delta** — only listed where it differs from the base spec.

Tokens used throughout (already locked): `#0c1509` forest, `#F5EDD8` cream, `#A67C3C` gold, `#8a2a2b` ruby. Spacing: xs 4px · sm 8px · md 12px · lg 16px · xl 24px · 2xl 32px · 3xl 48px · 4xl 64px. Fonts: Cinzel / Cormorant Garamond / DM Mono.

---

## 1. Opening Sequence (replaces `TheThreshold`)

**Purpose:** teach the seven-dimension concept before showing a single product. **Entry:** first load of `/`. **Exit:** the resolution beat's `[ ENTER ]` → The Core.

**Regions:** full-bleed, one beat per screen, no scroll — advance by tap anywhere or auto-advance after ~4s (respect `prefers-reduced-motion`: no auto-advance, tap only).

**Beat structure (×7, one per dimension, order shuffled per session per Brief 2 §3):**
- Background: flat `#0c1509`, no image, no gradient.
- Element 1 — the Cipher glyph for this dimension (Brief 1 §8.3 SVGs), centered, `120px` on mobile / `160px` desktop, stroke `#F5EDD8` at rest, transitions to `#A67C3C` as the line completes.
- Element 2 — the line itself (e.g. *"Every true thing comes from one exact place. Not a region. A place."*), Level 1 Statement, Cormorant italic, `--type-statement` (22–40px fluid), centered, `max-width: 320px` mobile / `480px` desktop, reveals word-by-word at 40–60ms stagger.
- Element 3 — a single `·` (Level 4 Whisper, 11px, 40% opacity) beneath the line, purely a beat marker, no text.
- Progress: 7-segment thin bar, fixed top, `4px` tall, `xl` (24px) side margins, unfilled segments at 20% cream opacity, filled at `#A67C3C`.

**Resolution beat:**
- Element 1 — all seven glyphs, small (`24px` each), arranged in a single row, all gold, all filled (the only moment they appear together).
- Element 2 — *"This is what we mean by an origin."* — Level 1, Cormorant italic, `--type-statement`.
- Element 3 — *"Right now, ours is the Western Ghats."* — Level 3 Narrative, Cormorant regular, `--type-narrative`, `space-lg` below element 2.
- Element 4 — `[ ENTER ]` button, Level 2 styling (DM Mono, 12px, tracked 0.1em), gold border only (1px, no fill) at rest, gold fill + forest text on hover/tap. Bottom 40% of viewport (thumb zone, per Brief 3 §4).

**Mobile delta:** glyph 120px not 160px; statement `max-width: 320px`; progress bar segments `2px` gaps instead of `4px` to fit seven on a 375px screen without crowding.

---

## 2. The Core (origin-first landing)

**Purpose:** show the four origins as one connected system, equally weighted, and answer "how are products connected to origins" spatially. **Entry:** from Opening Sequence, or nav → Home if already past first visit. **Exit:** tap a product within an expanded origin → Depth Experience; tap Horizon/Index in persistent nav → those views.

**Regions:** fixed compass-header (Origin Mark, 32px, top-left, `xl` margin) + fixed persistent nav (top-right) + scrollable/swipeable origin row + expanding product area beneath.

**Elements:**
- Origin row — four cards, **equal width, equal height, no exceptions** (this equal-weighting is the literal fix for "products how connected to origins" and must not be undermined by one origin card being bigger because it has more SKUs).
  - Each card: origin name (Level 1, Cinzel, 20px mobile / 28px desktop) + elevation (Level 2, DM Mono, 12px, e.g. `2600M`) + coordinate (Level 4 Whisper, 11px).
  - Order: highest elevation first — Nilgiris → Idukki → Wayanad → Thiruvananthapuram (Brief 1 §4.2's descent logic, now literal and visible, not just a sort order in a flat list).
  - Background: origin photograph at 40% opacity under a forest-deep wash, or the textured fallback (Brief 3 §6 guardrails apply — no gradient invented for decoration, only where a real photo is genuinely missing).
- Tap an origin card → it expands in place (accordion, not a route change) to show its products as a horizontal snap-row directly beneath — each product card: packaging image, name (Level 1, 18px), price range (Level 2), `Add` (quick-buy) and `Enter →` (deep-explore) as two co-equal, clearly separate taps — this is the literal Brief 2 §5 "buy and go / explore" fork, made concrete on this exact screen.

**Mobile delta:** origin row is a horizontal snap-scroll (`scroll-snap-type: x mandatory`, reusing the existing `.horizontal-stream` mechanics — no new interaction pattern to build), one card ≈ 85vw so the next card's edge peeks in as an affordance to keep scrolling.

---

## 3. Horizon (future harvests)

**Purpose:** show what's curing/upcoming — a different register from "buy now." **Entry:** persistent nav only, never presented as a front-door choice. **Exit:** back to nav.

**Elements (per item, currently one — Winter Curing Vanilla):**
- Title, Level 1, Cinzel: `Winter Curing Vanilla`.
- Specimen record, Level 2: `IDK-VN-2026 · CURING PHASE`.
- Ecological telemetry — this stays a genuine DENSE table (Brief 3 §1), not narrative prose: Location / Altitude / Soil Base / Status, each a label-value pair, DM Mono, `md` (12px) row spacing.
- Curator's Observation — Level 3 Narrative, one paragraph, `max-width: 480px`.
- Timeline — `HARVEST: JAN 2026 → CURING: FEB–SEP → DISPATCH: OCT 2026`, Level 4 Whisper, rendered as three stages with `·` separators, not a table (this one line benefits from reading like a sentence, not a spec sheet — the one deliberate exception, and it's deliberate specifically because it's a single linear fact, not a set of parallel facts).
- **Fix the one visual gap flagged in Brief 3:** add a background image or the same restrained textured fallback used for Wayanad's missing land photo — never a bare table with nothing behind it.

---

## 4. Index (flat catalog, buy-and-go fallback)

**Purpose:** the one screen that is deliberately just a list — for a returning visitor who already knows what they want. **Entry:** persistent nav, explicitly labeled as "the full list" rather than presented as equal to The Core. **Exit:** tap a row → Depth Experience (canonical page, per Brief 1 §4.1 Patch 2, never the old overlay).

**Elements:** table, fully DENSE register — Name / Botanical name / Origin / `[DESCEND]` action, DM Mono throughout, `sm` (8px) row padding, no images (this screen's entire job is speed and scan-ability; a photo here would slow it down and duplicate what The Core already shows). Sort: same origin-descent order as The Core (Brief 1 §4.2's shared sort), never re-alphabetized independently again.

---

## 5. All Yields (quick-add bottom sheet)

**Purpose:** the fastest possible buy-and-go path, reachable from anywhere. **Entry:** a persistent, always-visible nav item. **Exit:** stays open across adds; closes on tap outside or the `✕`.

**Elements:** bottom sheet (mobile) / modal (desktop), grouped by origin with `### THE NILGIRIS · 2600M`-style headers (Level 2), same descent order as everywhere else. Each row: product name (Level 3, 16px) + size/price (Level 2) + `Add` button (min `44×44px` tap target — check the current bracket-styled buttons against this floor, per Brief 3 §4). "You've been here before" tag where applicable: Level 4 Whisper, gold, `xs` margin above the row.

**Mobile delta:** sheet rises from bottom, drag-handle at top, `env(safe-area-inset-bottom)` padding so the last row and the close action clear the home indicator.

---

## 6. Depth Experience (one canonical product journey)

**Purpose:** the full descent — the site's best work, now reached the same way from everywhere (Brief 1 §4.1). **Entry:** any `Enter`/`Descend` action, from The Core, Index, or a direct link. **Exit:** Offering stratum's `Add to Ledger`, or scroll back up.

**Global for this screen:** the Cipher — full labeled glyph rail on desktop (fixed right, `xl` margin), the seven-segment Stories-style bar on mobile (fixed top, per Brief 3 §4) — driven by the real GSAP timeline (Brief 1 §4.1 Patch 4), not a separate scroll listener.

**Stratum: Canopy (Geo + Observation)**
- Background image at full bleed, `55%` opacity, forest-deep wash over it.
- Evidence line, Level 2: `900–1,100M · WESTERN GHATS`, plus the live weather badge in gold appended with a `·` separator — this is Observation made literal and current, not a static claim.
- Narrative, Level 3, `max-width: 480px`, centered: the real canopy copy already written (monsoon moving through in layers).

**Stratum: Land (Bio)**
- Where a real photo doesn't exist yet (Wayanad currently has none): textured gradient fallback, never a blank field — and a small Level 4 note acknowledging it's pending real photography, matching the honesty standard set everywhere else on this site rather than pretending a placeholder is a photo.
- Evidence: `FOREST LOAM · LATERITE TRANSITION`. Narrative: the real soil copy.

**Stratum: Hand (Community + Method)**
- Background image, same treatment as Canopy.
- Evidence: `TRADITIONAL AGRARIAN · HARVEST JAN`. Narrative: the real hand/harvest copy.
- Both Cipher glyphs (Community, Method) active simultaneously here — this is correct, not a bug, since this stratum genuinely carries both dimensions (Brief 1 §4.1).

**Stratum: Specimen (Product + Time)**
- Background image.
- Evidence: `PIPER NIGRUM · BATCH WYD-BP-001 · JAN 2026`.
- Botanical name, italic gold, Level 3, 16px, own line.
- Narrative: the real specimen copy (berries picked green, drying).

**Stratum: Offering**
- Flat `#0c1509`, no image — this is the one stratum that should feel like a return to stillness after four strata of sensory material, a deliberate WIDE moment right before a DENSE decision (the price table).
- Offering line, italic Level 3.
- Sizes/prices — DENSE, DM Mono, a real table (`50g ₹109 / 100g ₹199 / 250g ₹449`), not styled like the narrative around it.
- `Add to Ledger` — Level 1 visual weight (Brief 3's Von Restorff button already specced: gold fill, forest text, `0` border-radius), bottom 40% of viewport on mobile, safe-area aware.

---

## 7. Ledger (cart + checkout)

**Purpose:** hold everything added across every origin, then hand off to WhatsApp/UPI. **Entry:** any `Add` action, from The Core, All Yields, or a Depth Experience Offering. **Exit:** WhatsApp handoff, or close and keep shopping.

**Elements, bottom sheet:**
- Header: `Your Ledger`, Level 1, `✕` close top-right (44×44px target).
- Empty state: *"The ledger is empty. Explore the origins."* — Level 3, centered, no dense elements at all until something's added (a genuinely empty DENSE table would look broken; this is correctly WIDE until it has real data to show).
- Line items: product, size, price, remove — DENSE, DM Mono, `sm` row padding.
- Subtotal / Shipping / Total — DENSE table, `md` padding, Total visually heaviest of the three (Level 2 vs the others' Level 4).
- `OBSERVATION LOG: THE REALITY` — the existing narrative block before checkout stays exactly as WIDE and exactly as it is; don't compress it to fit more form fields above the fold. It's doing real brand work at the exact moment a visitor is deciding to commit.
- Form: name/address/phone, "saved from last order" state shown as Level 4 with a `Clear saved details` action — DENSE but generously spaced (`lg` between fields; cramped form fields are the one place density reads as careless rather than rigorous).
- `INITIALIZE TRANSFER (WHATSAPP)` — Level 1 button treatment, same gold-fill pattern as `Add to Ledger`, bottom of sheet, safe-area aware.
- UPI fallback: `ourorigin@ybl` + `Copy` — Level 4, secondary, below the main action, never competing with it.

---

## 8. `/why` (manifesto)

**Purpose:** the purest WIDE screen on the entire site. **Entry:** persistent nav. **Exit:** back, or the Opening Sequence's resolution CTA if arriving fresh.

**Elements:** one statement per screen-height, Cormorant, generously sized, `3xl`–`4xl` vertical padding between sections, zero DENSE elements anywhere on this page — no batch codes, no coordinates, no tables. This is the one screen where breaking the "alternate WIDE and DENSE" rule is correct, because its entire job is to be the held breath the rest of the site earns its density against.

---

## 9. `/observations` (journal)

**Purpose:** short, varied-length field notes — proof of ongoing attention, not a blog. **Entry/Exit:** persistent nav.

**Elements:** bento grid (Brief 3 §3) — tile size follows content length, not a uniform grid. A one-line observation (*"The origin doesn't end at the farm gate."*) gets a small tile; a fuller paragraph spans two columns. Numbering (`01`, `02`...) stays Level 4, small, top-left of each tile. Title Level 1 within its tile, sized relative to tile size, not fixed globally.

**Mobile delta:** collapses to single column but keeps the size variation as font-size and padding differences between tiles, per Brief 3 §5 — a uniform single-column list would flatten the one thing that makes this page distinctive.

---

## 10. `/contact`

**Purpose:** plain, fast, no atmosphere required. **Entry/Exit:** persistent nav.

**Elements:** WhatsApp number, email, bulk-order note — all Level 2/3, no Level 1 Statement needed here at all (this page doesn't need to perform the brand; it needs to be found and used). One outstanding item from Brief 1 §6: replace the page's hardcoded font-family strings with the actual `--font-*` tokens so this page stops being the one place typography quietly drifts from everywhere else.

---

## 11. 404

**Purpose:** stay in voice even when something's gone wrong. **Elements:** Level 1 Statement (something short and true to the brand, not a generic "page not found"), one Level 3 line of guidance, one clear way back to The Core. No DENSE elements — an error page is not the place to prove rigor with a data table.

---

## 12. Global persistent elements (present on every screen above)

- **Origin Mark**, top-left, 32px, gold, static — the one constant visual anchor across every single screen, never removed, never resized per-page.
- **Nav** — Home / The Core / Horizon / Index / Why / Observations / Contact / Basket count — real links now (Brief 1 §4's orphaned-page fix), consistent position, consistent order, every screen.
- **Cipher** — only present during Depth Experience (§6). Not shown elsewhere; it's a wayfinding tool for a long descent, not a persistent brand decoration, and showing it where there's nothing to navigate through would dilute exactly the meaning it's built to carry.
