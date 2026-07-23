# OurOrigin

**The Absolute Truth of the Soil.**  
An origin is five specific, connected things: a place (Geo), a living ecology (Bio), the people who understand it (Community), a way of working with it (Method), and a yield that proves the rest is real (Product) — kept honest by two more: Observation and Time.

Currently tied to the Western Ghats. Not forever.

## Stack

- **Astro** 6.x — static site generation
- **Content Collections** — origins, products, observations as typed data
- **Zero client-side framework** — vanilla JS where interactivity is required
- **Cloudflare Pages** — static deploy target

## Design Lock (Do Not Change Without Founder Approval)

| Token | Value |
|-------|-------|
| Forest Deep | `#0c1509` |
| Warm Cream | `#F5EDD8` |
| Gold | `#A67C3C` |
| Institutional | Cinzel, serif |
| Narrative | Cormorant Garamond, serif |
| Evidence | DM Mono, monospace |
| Border Radius | `0` everywhere |
| Origin Mark Gauge | 48px, stroke 0.5 |

## Origin Order (Single Source of Truth)

All catalog views must use this elevation sort:

1. `nilgiris`
2. `idukki`
3. `wayanad`
4. `malabar-coast`
5. `thiruvananthapuram`

Constant lives in `src/utils/constants.ts`. Hardcode nowhere else.

## Constants (Never Hardcode)

```ts
// src/utils/constants.ts
WHATSAPP_NUMBER = '...'      // Your actual number
EMAIL_ADDRESS = 'ourorigin.in@gmail.com'
