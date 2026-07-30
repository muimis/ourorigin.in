# OurOrigin — Design & Architecture

## Visual System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--color-forest-deep` | `#0c1509` | Primary background. Locked. |
| `--color-warm-cream` | `#f5f0e8` | Primary text. |
| `--color-gold` | `#c8a04d` | Accent. Yield dot. Labels. |
| `--color-void` | `#0a0a0a` | Absolute black. Cinematic viewport. |

### Typography — Two Densities
A section either breathes or it reports. Never both in the same block.

| Density | Typeface | Usage |
|---|---|---|
| **WIDE** | Cormorant Garamond | Narratives, statements, manifesto |
| **DENSE** | DM Mono | Coordinates, batch codes, timestamps, labels |
| **Display** | Cinzel | Section headers, wordmark |

```css
--type-display:   clamp(28px, 8vw, 64px);
--type-statement: clamp(22px, 6vw, 40px);
--type-narrative: clamp(16px, 4vw, 20px);
--type-evidence:  clamp(12px, 2.8vw, 13px);
--type-whisper:   clamp(10px, 2.2vw, 11px);
```

### Photography — Two Languages Only
1. **The Artifact** — Product suspended in void. Museum-lit. Hyper-real.
2. **The Gesture** — Chiaroscuro hands. No face. No portrait. No lifestyle stock.

### The Origin Mark
Five hash marks (the walk) + one irregular dot (the yield). Gold on void.

### Layout Rules
- Break symmetry. Never center everything.
- Whitespace is a decision, not a leftover.
- No border-radius. No gradients. No glassmorphism.
- Density of real information, never decoration.

### Mobile
- Primary actions in bottom 40% (thumb zone).
- Touch targets ≥ 44×44px. Nothing below 12px.
- Bottom sheets, not full takeovers.
- `padding-bottom: env(safe-area-inset-bottom)` on fixed elements.

---

## Technical Architecture

### Stack
- **Framework:** Astro (static)
- **Animation:** GSAP + ScrollTrigger
- **Styling:** Vanilla CSS + custom properties
- **Deployment:** Cloudflare Pages
- **Content:** JSON collections in `src/content/`

### File Structure
```
src/
├── components/
│   ├── BaseLayout.astro       — HTML shell, meta, fonts, global UI
│   ├── OriginMark.astro       — Tally mark SVG
│   ├── AllYieldsPanel.astro   — Quick-add panel (buy-and-go)
│   ├── Ledger.astro           — Transfer Ledger (cart/checkout)
│   ├── CustomCursor.astro     — Cursor behavior
│   └── Footer.astro           — Footer
├── content/
│   ├── products/              — 15 product JSONs
│   └── origins/               — 6 origin JSONs
├── pages/
│   ├── index.astro            — Cinematic homepage (GSAP viewport)
│   ├── origins/[slug]/[slug]  — Product detail pages
│   ├── contact.astro
│   ├── privacy.astro
│   ├── terms.astro
│   └── 404.astro
├── scripts/
│   ├── cart.js                — Ledger state
│   └── reveal.js              — Scroll reveals
├── styles/
│   └── tokens.css             — Design tokens
└── content.config.ts          — Collection schemas
```

### Homepage Engine
Fixed viewport + scroll rig (800vh). Four layers:
1. **Void** — Black base (z:1)
2. **Dynamic Mask** — GSAP `clip-path` morphing over background images (z:5)
3. **UI** — Typography placards fading per scene (z:10)
4. **Carousel** — Horizontal product slider (z:20)

### Product Pages
Same visual system as homepage finale. Three-panel layout: Facts | Artifact | Ledger.
