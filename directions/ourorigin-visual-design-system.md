# OurOrigin — Visual Design System (Mobile-First)

**Third document, different job.** The developer brief is what's broken. The universal briefing is what OurOrigin *is* and how the homepage should flow. This one is how it should actually *look* — structure, hierarchy, placement, type, and which modern techniques earn a place here — on a phone screen first, everything else second.

---

## 1. The one rule underneath everything: two densities, never blended

The type system already has this built in, it's just not being used as a deliberate rule: Cormorant Garamond is a **WIDE** typeface — spacious, narrative, meant to be read slowly. DM Mono is a **DENSE** typeface — tight, evidentiary, meant to be scanned fast. Right now they get mixed in the same blocks without a reason. They shouldn't be.

| **WIDE** (minimal) | **DENSE** (maximal) |
|---|---|
| The opening Cipher sequence | Evidence lines (coordinates, altitude, batch) |
| Product narrative paragraphs | The Ledger / checkout summary |
| The `/why` manifesto | The Index / full catalog table |
| One statement per screen | Telemetry, timestamps, live weather |

A section either breathes or it reports. Never both in the same block. This alternation — spacious statement, then a sudden dense burst of real data, then spacious again — is itself a large part of what makes something feel considered rather than templated. It's also the direct antidote to "looks like a PowerPoint": PowerPoint is symmetric, centered, and evenly dense everywhere. This is the opposite of that on purpose.

## 2. Visual hierarchy — four levels, everywhere, no exceptions

1. **The Statement** — Cinzel or italic Cormorant, large, one per screen, nothing else competes with it at that size.
2. **The Evidence Tag** — DM Mono, small, uppercase, tracked out, always visually secondary to the Statement above it.
3. **The Narrative** — Cormorant regular, a comfortable reading measure (keep the existing 480px max-width — that's correct, don't widen it; anything past ~75 characters a line gets harder to read, not more premium).
4. **The Whisper** — micro captions, batch codes, timestamps: present, low opacity, small. Evidence that something is documented, without asking for attention.

**Fluid type scale** (replace fixed pixel sizes with `clamp()` so hierarchy holds from a small phone to a desktop, instead of just scaling down proportionally):
```css
--type-display:   clamp(28px, 8vw, 64px);   /* origin/product name, rare */
--type-statement: clamp(22px, 6vw, 40px);   /* the Cipher lines, section titles */
--type-narrative: clamp(16px, 4vw, 20px);   /* body copy */
--type-evidence:  clamp(12px, 2.8vw, 13px); /* was a fixed 11px — raise the floor to 12px on phones, or it gets illegible on smaller or older screens */
--type-whisper:   clamp(10px, 2.2vw, 11px);
```

## 3. Structure & placement — modern technique, applied with a reason, not for its own sake

- **Break the symmetry, deliberately.** Right now most content is centered, stacked, one thing at a time — which is exactly the PowerPoint feeling. An asymmetric grid — the Statement anchored left, the Evidence Tag anchored to a *different* edge, the Narrative offset below rather than centered under it — creates a small, constant visual tension that reads as designed rather than assembled. This costs nothing structurally; it's a CSS Grid column-span change, not a rebuild.
- **A bento grid for `/observations`.** The real entries there are already varied length — some are a single sentence, some are a full paragraph. A uniform stacked list flattens that variation. A bento layout (tiles sized to content — a one-line observation gets a small tile, a longer one spans two columns) makes the variation itself part of the design, and it's a well-understood, current pattern rather than a novelty.
- **Kinetic text for the opening sequence.** Each of the seven Cipher lines should reveal word-by-word or line-by-line (a short stagger, 40–60ms between words, not a whole-paragraph fade), matching the "held shot" pacing already established as the brand's reference point. This is a CSS `animation-delay` per `<span>`, no new library needed.
- **Whitespace as a decision, not a leftover.** The pause between sections should feel at least as considered as the sections themselves — if anything, err toward more space around WIDE moments, since the pause is doing narrative work (it's the breath before the next idea), not just tidying the layout.

## 4. Mobile — where, what, how

- **Thumb zone.** Every primary action — Add to Ledger, Enter, Checkout, Continue — belongs in the bottom 40% of the viewport, never the top. That's the zone a thumb reaches without a grip shift on a phone held one-handed. Anything requiring a stretch to the top of the screen should be secondary (back, menu, close), never the thing you actually want someone to tap.
- **The Cipher, reconsidered for mobile specifically.** The full glyph rail with labels (as built and specced) is right for desktop, where there's lateral space to spend. On a phone it should shrink to a thin, segmented progress bar at the very top — seven slim segments, filling left to right as the descent progresses. This is the Stories pattern from Instagram/Snapchat: instantly familiar to almost every visitor, unobtrusive, and it doesn't eat into content width the way a labeled rail would on a 375px screen.
- **Bottom sheets, not takeovers.** The Ledger already behaves this way — keep that, and apply the same pattern to "All Yields" and any future secondary panel. A sheet that rises from the bottom and can be swiped away is the native mobile convention now; a full-screen overlay for something secondary reads as heavier than it needs to.
- **Touch targets ≥ 44×44px.** Several current buttons are thin text wrapped in brackets — fine visually, but check the actual tappable area against this floor; a link that's visually a 10px-tall line of mono text is a real miss-tap risk on a phone.
- **Respect the notch and the home indicator.** Any fixed bottom element (the Add to Ledger button, a bottom sheet's handle) should use `padding-bottom: env(safe-area-inset-bottom)` — otherwise it sits under the home-indicator bar on an iPhone, which reads as sloppy in a very literal, physical way.
- **Nothing below 12px.** Not even the mono evidence captions. What's "restrained" on a 27-inch monitor is often just unreadable on a phone at arm's length.

## 5. Section-by-section, on mobile specifically

- **Opening sequence** — full-bleed, one glyph and one line, vertically centered, advances on tap or swipe; the seven-segment Stories bar sits at the very top, thin and quiet.
- **The Core (origin view)** — the four origins as equally sized cards in a horizontal snap-scroll (reuse the existing `.horizontal-stream` mechanics — no new interaction pattern needed). Tapping one expands its products in place, beneath it, rather than jumping to a new screen — keeps the visitor oriented to which origin they're in.
- **Depth Experience** — unchanged in substance; add the top progress bar from §4; the Add-to-Ledger CTA stays pinned to the bottom, safe-area aware.
- **Ledger** — already close to right as a bottom sheet; tighten to a genuinely single-column, one-thumb form (it mostly is already — just confirm nothing forces horizontal scrolling on a 375px screen).
- **Observations** — the bento grid collapses to a single column on mobile, but keep the tile-size variation as font-size and vertical spacing differences rather than flattening every entry to identical treatment.
- **/why** — this page should be the purest WIDE zone on the whole site: one statement per screen-height, nothing dense anywhere on it. It's the manifesto; let it breathe more than anything else does.

## 6. Guardrails — what "maximalism" is not

Maximalism here means *density of real information* — a batch record, a full spec table, a live telemetry line — never decoration for its own sake. Explicitly avoid: gradients that don't represent anything, drop shadows, glassmorphism/blur panels (they'd fight the flat, brutalist, zero-border-radius decision already locked), or more than one accent color doing active work in a single view. If a DENSE moment doesn't contain a real fact, it isn't maximalism, it's clutter wearing maximalism's clothes.
