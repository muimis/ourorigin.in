# OurOrigin: Master Brand & Developer Specification

**Brand Identity**: Universal Ethical Direct Trade
**Aesthetic Model**: Warm Humanist Minimalism
**Stack**: Astro 6 (static output) · GSAP 3.15 · Tailwind CSS · Node ≥22.12

---

## 1. What OurOrigin Is

OurOrigin is a universal model for ethical direct trade. We bridge the gap between any farming community and the people who consume what they grow.

*   **Not a Region, Not a Crop:** OurOrigin is not tied strictly to the Western Ghats or any single product. It is a universal ethos applicable to any community, anywhere, that shares the dedication to genuine, ethical agriculture.
*   **The Tally Mark Philosophy:** The tally mark is our primary symbol because it is the oldest, most universal human record of counting. It predates writing, currency, and borders. Every culture that has ever counted has drawn this mark. It belongs to no single place, making it the perfect symbol for a universal brand.

### The Three Pillars of Truth
The architecture of OurOrigin is distilled into three essential pillars, making the origin easy to conceive without requiring a degree in ecology:

1.  **The Person (The Grower):** We focus on the practitioner—their family, their specific voice, and their calloused hands. They are the expert authors of the harvest.
2.  **The Land (The Origin):** The land is a grounding truth, defined by specific geo-coordinates. The coordinates are the silent, unarguable proof of life.
3.  **The Yield (The Crop):** The physical evidence of the practitioner's work. The yield is the final "Tally Gate" proof.

---

## 2. Brand Voice & Tone

We speak as a direct, warm, and letter-like witness. We have abandoned the cold, documentary "museum glass" aesthetic in favor of human-to-human truth. We do not use "academic telemetry" to prove our point; we use observational narrative.

*   **Before:** "Observation records confirm the method of harvest adheres to indigenous knowledge."
*   **After:** "We watched the family harvest this cardamom by hand. This is exactly how they have always done it."

---

## 3. The Visual System (Warm Humanist Minimalism)

We have explicitly rejected the cold "digital brutalism" and dark-mode aesthetic of our previous iterations. The new visual system evokes the tactile, organic feel of a field notebook.

### The Palette
*   **Primary Surface (Bone):** `#EFE6D3` (Warm Cream). Our new canvas—a soft, bone-white, paper-like surface that feels organic and inviting.
*   **Deep Forest:** `#0C1509`. Used for text and high-contrast dark backgrounds.
*   **Mark Gold:** `#C99A5B`. The sole color used for the brand mark. It must never be paired with a second color within the mark itself.

### Typography
The brand utilizes a "Triple-Register" typographic hierarchy:

1.  **Narrative & Wordmark (Cormorant Garamond):** Drawn from 16th-century calligraphic tradition, the strokes carry the memory of a broad-nibbed pen. It provides a warm, poetic, and living contrast to harder data points.
2.  **Data & Telemetry (JetBrains Mono / DM Mono):** Applied to technical data, coordinates, and batch numbers.
3.  *Note: We have deprecated Cinzel entirely.*

---

## 4. The Brand Mark System

The authoritative specification for the mark and wordmark is maintained in `public/mark.html`.

### The Tally Mark
*   **Structure:** 4 vertical strokes + 1 diagonal cross stroke.
*   **Geometry:** Drawn by hand, utilizing organic Bézier curves. The stroke centers are deliberately non-uniform (e.g., x = 15, 28, 41, 56) to mimic the natural drift of a hand in motion.
*   **The Diagonal:** The cross stroke is heavier (9px vs 7px for verticals) and drawn with a distinct arc (momentum). It represents the consumer ("You") closing the count.
*   **Optical Sizing:** The mark is **never** simply scaled down. There are four distinct SVG drawings engineered for specific size ranges:
    *   **Display (≥ 60px):** Full organic Bézier curves.
    *   **Standard (36–60px):** Heavier, simplified curves for legibility.
    *   **Small (22–36px):** Straight lines only, bold weight.
    *   **Micro (≤ 22px):** Pixel-optimized straight lines, maximum contrast.

### The Wordmark
*   **Concept:** The dot (tittle) above each lowercase "i" in the word "OurOrigin" is replaced by a short diagonal stroke in Mark Gold at exactly 45° — mirroring the tally's cross stroke.
*   **Execution:** Currently, this is a programmatic integration using *Cormorant Garamond* as a proxy. The final wordmark must be hand-drawn by a commissioned lettering artist, as no public font belongs to OurOrigin.

---

## 5. Web Architecture & Development Guidelines

### Stack Principles
*   **Astro 6:** Used for generating highly performant static HTML. Zero JS by default.
*   **GSAP 3.15:** Used exclusively for high-fidelity animations. No CSS transitions for complex sequencing.
*   **Tailwind CSS:** Utility-first styling via `@tailwindcss/vite` (Tailwind v4).

### The "Two Densities" Layout Strategy
1.  **WIDE (Narrative Density):** Expansive whitespace, minimal elements, deep psychological breath. Reserved for foundational philosophies and storytelling.
2.  **DENSE (Evidentiary Density):** High-precision reporting. Raw telemetry packed tightly to convey scientific rigor and transparency.

**Transitions:** Move between Wide and Dense states using sharp, pure horizontal bands. No border-radii on these structural section transitions.

### Quality Assurance
*   "Zero flaws" is the discipline. Address console errors, hydration mismatches, and edge-case responsive bugs proactively.
*   Ensure the optical sizing logic of the Tally Mark is strictly adhered to in component architecture. Do not use a single SVG and apply `transform: scale()`. 
