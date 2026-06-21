# Design & Architectural Decisions Log

This log captures confirmed decisions to prevent silent drift between building phases.

## 2026-06-20: Direction 03 — The Depth Experience

### Visual Language & Geometry
* **Pure Horizontal Bands:** The confirmed visual language for receding strata is pure horizontal, full-width bands (`scale: 1`, `width: 100vw`). We explicitly abandoned the "floating rounded cards" paradigm (`border-radius: 0`). The brutalist, structural look is intentional.
* **Scroll Velocity:** The total GSAP scroll distance was sliced in half (`+=400%` to `+=200%`) for a much faster, punchier traversal.
* **Text Wrap Constraints:** All stratum text blocks are constrained to `max-width: 85vw` to prevent horizontal bleeding on long descriptions.

### The Origin Mark
* **Animation Isolation:** The Origin Mark only animates its draw-on entrance on an explicit `animate={true}` prop. For all other instances (like the depth gauge or the Living Matrix), it defaults to a static render.
* **Gauge Sizing:** The Origin Mark gauge size is locked at `48px`, which is the standard Material Design touch-target size.
* **Line Weights:** The stroke-width is locked at `0.5` against a `0 0 100 100` viewBox to perfectly replicate the delicate precision of the original prototype.

### Open Items (HOLD)
* **Brand Green Refinement:** The current `--color-forest-deep` background color is NOT final. The exact brand green is pending founder input. Do not alter it until explicitly instructed.
* **Origin Mark Adjustments:** Further adjustments to the Origin Mark geometry are pending founder input. Do not touch the Origin Mark design until explicitly requested in a follow-up direction.

## 2026-06-21: Direction 05 — Wayanad Finalization & Matrix Refinement

### Brand Identity & Structural Philosophy
* **Forest Deep Locked:** The `--color-forest-deep` background color is permanently finalized at `#0c1509`, superseding all previous drafts.
* **Seven-States Model:** The Geo, Bio, Community, Method, Product, Observation (evidence), and Time (living) states form the primary structural philosophy. "Product → Origin → People" is reframed to describe the emotional arc, not literal page sequencing.
* **Community Naming:** The generic pattern `"Indigenous farming communities, [Region]"` is confirmed as permanent launch copy, closing the open item regarding specific tribal placeholder names.
