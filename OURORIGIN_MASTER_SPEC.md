# OurOrigin: Master Brand & Developer Specification

**Brand Identity**: Universal Ethical Direct Trade  
**Aesthetic Model**: Warm Humanist Minimalism  
**Stack**: Astro 6 (static output) · GSAP 3.15 · Tailwind CSS · Node ≥22.12  

---

## 1. The Core Philosophy

OurOrigin is not a traditional e-commerce brand; it is a structural claim. We operate on the premise that most brands sell you a story *about* origin, whereas we show you the origin itself and let you draw your own conclusion.

**We are not a brand. We are the conduit.**

### The "First Hands" Principle
Most things travel too far before they find you. Something gets lost each time they change hands. By the time it reaches a shelf, the place it came from is gone. The soil is gone. The season is gone. The name is gone. What's left is a label.

Our entire model is built on **First Hands**:
- The person who grew the harvest knew when to cut it. No one closer to the source exists.
- Their knowledge is the credential. Their hands were first.
- We bridge the gap between the practitioner and the consumer, without the interference of a "museum-glass" lens.

### A Universal Model
OurOrigin is not tied strictly to the Western Ghats or any single product. It is a universal ethos applicable to any community, anywhere, that shares the dedication to genuine, ethical agriculture. We represent all universal communities having our ethos.

---

## 2. The Proof System & Ethics

We do not use marketing adjectives; we use a ledger of facts. Every product we source must pass through our Proof System, which is transparently displayed on the site.

1. **First Hands:** Naming the specific grower or family (e.g., "Raman & Family"). They are the expert authors of the harvest, not "beneficiaries" of a corporate scheme.
2. **Direct Price Paid:** Complete transparency on the financial transaction (e.g., "₹528/kg — 60% above local rate"). We prove our ethics with numbers, not just words.
3. **Nature's Share:** Acknowledging the environment's role. Harvests are taken only after the forest takes its share.
4. **Geo-Coordinates:** The land is a grounding truth, defined by specific coordinates (e.g., 11°36′N, 76°04′E). The coordinates are the silent, unarguable proof of life.

---

## 3. Brand Voice & Tone

We speak as a direct, warm, and letter-like witness. We have abandoned the cold, documentary "surveillance" aesthetic in favor of human-to-human truth. We do not use "academic telemetry" to prove our point; we use observational narrative.

*   **Before:** "Observation records confirm the method of harvest adheres to indigenous knowledge."
*   **After:** "We watched the family harvest this cardamom by hand. This is exactly how they have always done it."
*   **On Product:** "The berries are picked green — they only turn black in the drying. The colour you've always known as black pepper isn't the colour it grew. It's the colour of what happened to it afterward."

The voice is poetic but strictly grounded in reality. It feels like an ink-stained letter between the grower and the customer.

---

## 4. The Visual System (Warm Humanist Minimalism)

We have explicitly rejected cold "digital brutalism" and dark-mode aesthetics. The visual system evokes the tactile, organic feel of a field notebook.

### The Palette
*   **Primary Surface (Bone):** `var(--color-bone)` / `#EFE6D3`. Our new canvas—a soft, bone-white, paper-like surface that feels organic and inviting.
*   **Deep Forest:** `var(--color-deep-forest)` / `#0C1509`. Used for text and high-contrast dark backgrounds.
*   **Mark Gold:** `var(--color-mark-gold)` / `#C99A5B`. The sole color used for the brand mark. It must never be paired with a second color within the mark itself.

### Typography (The Triple-Register)
1.  **Narrative & Wordmark (Cormorant Garamond):** Drawn from 16th-century calligraphic tradition, the strokes carry the memory of a broad-nibbed pen. It provides a warm, poetic, and living contrast.
2.  **Data & Telemetry (JetBrains Mono / DM Mono):** Applied to technical data, coordinates, batch numbers, and ledgers.
3.  **Display (Display Serif/Sans as defined by design):** Used for monumental statements, but *Cinzel* is fully deprecated.

---

## 5. The Brand Mark System

The authoritative specification for the mark and wordmark is maintained in `public/mark.html`.

### The Tally Mark
The tally mark is our primary symbol because it is the oldest, most universal human record of counting. It predates writing, currency, and borders. Every culture that has ever counted has drawn this mark. It belongs to no single place.

*   **Structure:** 4 vertical strokes + 1 diagonal cross stroke (The Tally Gate: `||||/`).
*   **Geometry:** Drawn by hand, utilizing organic Bézier curves. The stroke centers are deliberately non-uniform to mimic the natural drift of a hand in motion.
*   **The Diagonal:** The cross stroke is heavier and drawn with a distinct arc (momentum). It represents the consumer ("You") closing the count.
*   **Optical Sizing:** The mark is **never** simply scaled down. There are four distinct SVG drawings engineered for specific size ranges (Display, Standard, Small, Micro).

### The Wordmark
*   **Concept:** The dot (tittle) above each lowercase "i" in the word "OurOrigin" is replaced by a short diagonal stroke in Mark Gold at exactly 45° — mirroring the tally's cross stroke.
*   **Execution:** Currently, this is a programmatic integration using *Cormorant Garamond* as a proxy. The final wordmark must be hand-drawn by a commissioned lettering artist, as no public font belongs to OurOrigin.

---

## 6. Web Architecture & Development Guidelines

### Stack Principles
*   **Astro 6:** Used for generating highly performant static HTML. Zero JS by default.
*   **GSAP 3.15:** Used exclusively for high-fidelity animations. No CSS transitions for complex sequencing.
*   **Tailwind CSS (v4):** Utility-first styling via `@tailwindcss/vite`.

### The "Two Densities" Layout Strategy
1.  **WIDE (Narrative Density):** Expansive whitespace, minimal elements, deep psychological breath. Reserved for foundational philosophies and storytelling.
2.  **DENSE (Evidentiary Density):** High-precision reporting. Raw telemetry packed tightly to convey scientific rigor and transparency.

**Transitions:** Move between Wide and Dense states using sharp, pure horizontal bands. No border-radii on these structural section transitions.

### Quality Assurance
*   "Zero flaws" is the discipline. Address console errors, hydration mismatches, and edge-case responsive bugs proactively.
*   Ensure the optical sizing logic of the Tally Mark is strictly adhered to in component architecture (`OriginMark.astro` handles this automatically based on the `size` prop).
