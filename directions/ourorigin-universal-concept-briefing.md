# OurOrigin — The Universal Origin Briefing

**This is a different document from the developer brief.** The developer brief (`ourorigin-developer-brief.md`) is what's broken and how to fix it. This one is what OurOrigin actually *is*, and how the homepage should be built around that — before any more line-level fixes. Nothing here throws away what's built. It reorders what comes first and adds a small number of genuinely new pieces.

---

## 1. The reframe, in one paragraph

OurOrigin is not a Western Ghats spice company. It's a claim that an *origin* is five specific, interconnected things — a place (Geo), a living ecology (Bio), the people who understand it (Community), a way of working with it (Method), and a yield that proves the rest is real (Product) — plus two things that keep it honest: Observation (documented, current evidence, not a stock photo) and Time (it changes, it has seasons, it's alive). That framework isn't boxed to any region. What's boxed to the Western Ghats, right now, is the inventory. That's a fact about today, not a ceiling on what the company is. Nothing here overclaims a global footprint that doesn't exist — it says exactly that, out loud, once the visitor is curious enough to want to know.

## 2. What a visitor should feel, in order

1. **Curiosity** — "what are these people actually talking about?"
2. **Recognition** — "oh — this is about proving something is real, not selling something."
3. **Grounding** — "right now, what they can prove is the Western Ghats — here's how."
4. **Choice** — buy, or explore, or both. None of the three forced on anyone.

Getting the order right matters more than getting any single screen right. Reverse it — lead with product, end with philosophy — and it reads as a spice shop with a manifesto bolted on, which is closer to what exists today.

## 3. The opening sequence — concept before catalog

No product photo, no price, no place name, until one explicit line at the end. This is the literal, buildable answer to "without telling anything directly what we have."

**Reuse the Cipher glyphs already specced in the developer brief (§8.3) — don't invent a new visual system.** Right now the Cipher only appears once someone is five scrolls deep into a specific product. Move it to the front door instead. Seven marks, one at a time, each with one line — no image behind them, just the Forest Deep field, the way the site already opens today.

Suggested lines, matching the voice already on `/why` and the product copy (short, declarative, no adjectives doing the work that a fact should):

- **Geo** — Every true thing comes from one exact place. Not a region. A place.
- **Bio** — Before anyone arrives to take anything, the place already has a life of its own.
- **Community** — Someone has understood this place longer than we've known it exists.
- **Method** — There is a way of taking, and a way of taking too much. This is the difference we look for.
- **Observation** — Not a photograph from last year. What's happening there, right now.
- **Time** — It has seasons. It changes. What you're looking at is alive, not preserved.
- **Product** — What ends up in your hand is proof all of this was true. Or it's nothing.

Then, one line, the whole reveal:

> **This is what we mean by an origin. Right now, ours is the Western Ghats.**
> `[ ENTER ]`

**A concrete way to actually enforce "equal weightage" in code, not just in intention:** shuffle the order of the seven statements per session (`array.sort(() => Math.random() - 0.5)`, or a proper Fisher–Yates if you want it unbiased) instead of always running Geo→Bio→Community→Method→Observation→Time→Product. A fixed order quietly becomes a hierarchy over time, no matter what anyone intends — whichever one is always first starts to feel like the "main" one. Randomizing it is a one-line way to make the equal-weighting real instead of aspirational. Keep Product last only if you want the sequence to land on the most concrete statement right before the grounding line — that's a deliberate narrative choice, not a ranking, and it's fine to say so explicitly if a developer asks why one is pinned.

## 4. The Core — making "how are products connected to origins" visible, not just true

Right now this question can only be answered by reading copy. It should be answerable by looking at something.

**Direction:** after the opening sequence, land on an origin-first view — the four origins (Nilgiris, Idukki, Wayanad, Thiruvananthapuram) shown as equally sized, equally weighted points — not ranked by revenue, product count, or how established the origin is. Selecting one reveals *its* products, in place, as an expansion — not a jump to a separate, disconnected list. This makes the connection between an origin and its products spatial and immediate instead of something the visitor has to infer from a batch code.

This also quietly resolves something flagged in the developer brief: right now "The Yield" and "The Index" both list the same twelve products flat, which is redundant on top of being disorganized. If entry happens origin-first through the Core, a flat "see everything" list stops being a primary browsing mode and becomes exactly one honest thing: a fallback for a returning customer who already knows what they want and just wants to search or scroll a flat list fast. Keep it — for the buy-and-go journey below — just stop presenting it as a second, competing way to discover the catalog.

One honest implementation note: I don't know yet whether Nilgiris, Idukki, and Thiruvananthapuram have the same quality of map/location assets that Wayanad has in `public/maps/`. Worth checking before committing to a literal map visualization — if the assets aren't there yet, the "equally weighted nodes" idea still works as a simple, restrained typographic/geometric layout (four marks, four names, four elevations) without needing real cartography for a first version.

## 5. Three journeys, deliberately — not left to accident

- **Buy and go.** Someone already knows what black pepper is and wants 100g. They should never be routed through the philosophy, the Core, or a single extra screen they didn't ask for. The existing "All Yields" quick-add panel already does this correctly — keep it exactly as direct as it is, and make sure it's always one tap away, from anywhere, always.
- **Explore and understand.** Someone wants the whole descent — Geo through Time, the Cipher, the batch record, all of it. This is the existing Depth Experience, unchanged in substance, just now reached the same way from every entry point (see the developer brief §4.1 — one canonical product experience, not two).
- **Accumulate and refer.** Someone wants to add several products across several origins to one order, then tell someone else about it. The first half already works — the Ledger is global and persists across origins. The second half doesn't exist yet: there's no referral mechanism anywhere in the current build. Naming that honestly rather than implying it's already there: a real version could be as simple as a personal reference code appended to the WhatsApp handoff message and a "share this origin" link with a UTM tag — genuinely new, small scope, and it's worth scoping properly as its own piece of work rather than treating it as a checkbox on this one.

None of the three is the "main" path. The homepage's job is to make all three equally reachable within one tap of landing on the Core, not to funnel everyone toward whichever one is easiest to build.

## 6. What's new here versus what already exists

**Reused, not rebuilt:** the Cipher and its seven glyphs (§8.3 of the developer brief), the Origin Mark, the Ledger and its checkout flow, the Depth Experience, the existing origin and product content model.

**Genuinely new:** the opening concept sequence (§3 above), the Core origin-first landing view (§4 above), and the referral mechanism (§5). These three are real, scoped pieces of work — not reinterpretations of things already built.

## 7. Where this sits relative to the developer brief's phasing

This is upstream of most of that document's fixes, not a replacement for them. Practical sequencing: land the developer brief's Phase 1 (one canonical product experience, real navigation, the wrong number fixed) first, since the Core view in §4 above will route directly into whichever product experience is canonical — no point building the new front door before the room behind it is the right one. The opening sequence in §3 can be built in parallel; it doesn't depend on anything else in the codebase changing first.
