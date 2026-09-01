# OurOrigin — Content & Philosophy Editing Guide

This guide details where all content, product information, terroir data, and texts are located so you can review and refine them anytime.

---

## 1. Product Catalog & Harvests

All harvest items are managed as individual JSON files in [`src/content/products/`](file:///e:/OurOrigin%20Website/src/content/products):

| Product File | Item Name | Origin | Key Fields to Edit |
| :--- | :--- | :--- | :--- |
| [`black-pepper.json`](file:///e:/OurOrigin%20Website/src/content/products/black-pepper.json) | Forest Black Pepper | Wayanad | `name`, `botanicalName`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`cardamom.json`](file:///e:/OurOrigin%20Website/src/content/products/cardamom.json) | Wild Cardamom | Idukki | `name`, `botanicalName`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`cinnamon.json`](file:///e:/OurOrigin%20Website/src/content/products/cinnamon.json) | True Cinnamon | Wayanad | `name`, `botanicalName`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`clove.json`](file:///e:/OurOrigin%20Website/src/content/products/clove.json) | Single-Origin Clove | Wayanad | `name`, `botanicalName`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`coffee.json`](file:///e:/OurOrigin%20Website/src/content/products/coffee.json) | High-Grown Coffee | Nilgiris | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`dry-ginger.json`](file:///e:/OurOrigin%20Website/src/content/products/dry-ginger.json) | Sun-Dried Ginger | Thiruvananthapuram | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`finger-millet.json`](file:///e:/OurOrigin%20Website/src/content/products/finger-millet.json) | Finger Millet (Ragi) | Attappady | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`foxtail-millet.json`](file:///e:/OurOrigin%20Website/src/content/products/foxtail-millet.json) | Foxtail Millet (Thina) | Attappady | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`green-tea.json`](file:///e:/OurOrigin%20Website/src/content/products/green-tea.json) | Mountain Green Tea | Nilgiris | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`little-millet.json`](file:///e:/OurOrigin%20Website/src/content/products/little-millet.json) | Little Millet (Chama) | Attappady | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`mace.json`](file:///e:/OurOrigin%20Website/src/content/products/mace.json) | Single-Origin Mace | Idukki | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`tea.json`](file:///e:/OurOrigin%20Website/src/content/products/tea.json) | Orthodox Mountain Tea | Nilgiris | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`turmeric.json`](file:///e:/OurOrigin%20Website/src/content/products/turmeric.json) | Native Turmeric | Wayanad | `name`, `sizes`, `sensoryProfile`, `proofSystem` |
| [`white-pepper.json`](file:///e:/OurOrigin%20Website/src/content/products/white-pepper.json) | White Pepper | Nilgiris | `name`, `sizes`, `sensoryProfile`, `proofSystem` |

### Product JSON Schema Example:
```json
{
  "slug": "cardamom",
  "name": "Wild Green Cardamom",
  "botanicalName": "Elettaria cardamomum",
  "originSlug": "idukki",
  "batchRef": "IDK-CD-001",
  "sizes": [
    { "label": "50g", "priceINR": 249 },
    { "label": "100g", "priceINR": 480 }
  ],
  "methodDescription": "Selective hand-plucking in forest shade, sun-dried.",
  "specimenCopy": "Picked only when the seed pods reach full density...",
  "sensoryProfile": {
    "aroma": "Intense camphor, eucalyptus, and wild floral sweetness.",
    "flavor": "Warm, resinous, with deep citrus undertones."
  },
  "proofSystem": {
    "firstHands": "Balan & Family, Idukki",
    "directPricePaid": "₹2,400/kg (55% above local auction rate)",
    "naturesShare": "Shade canopy preserved, 100% forest-grown."
  }
}
```

---

## 2. Origins & Terroir Data

Terroir details and geographic data are managed in [`src/content/origins/`](file:///e:/OurOrigin%20Website/src/content/origins):

| Origin File | Region | Elevation | Soil & Narrative |
| :--- | :--- | :--- | :--- |
| [`wayanad.json`](file:///e:/OurOrigin%20Website/src/content/origins/wayanad.json) | Wayanad | 900–1,100m | Forest Loam · Laterite transition |
| [`idukki.json`](file:///e:/OurOrigin%20Website/src/content/origins/idukki.json) | Idukki | 1,200m | Evergreen Shola Forest · High Humidity |
| [`nilgiris.json`](file:///e:/OurOrigin%20Website/src/content/origins/nilgiris.json) | The Nilgiris | 2,600m | Peaty Loam · High Mountain Mist |
| [`attappady.json`](file:///e:/OurOrigin%20Website/src/content/origins/attappady.json) | Attappady | 750m | Valley Hill Slopes · Rain-fed Native Soil |
| [`thiruvananthapuram.json`](file:///e:/OurOrigin%20Website/src/content/origins/thiruvananthapuram.json) | Thiruvananthapuram | 10–100m | Coastal Red Loam · Sun-Drying |

---

## 3. Brand Copy & Section Texts

| Component / Page | Location | Contents |
| :--- | :--- | :--- |
| **Hero Section** | [`HeroSection.astro`](file:///e:/OurOrigin%20Website/src/components/home/HeroSection.astro) | Main headline, tagline, intro copy, CTA buttons |
| **Core Standards** | [`Standards.astro`](file:///e:/OurOrigin%20Website/src/components/home/Standards.astro) | 4 core principles (First Hands, Terroir, Nature's Share, Open Ledger) |
| **The Hands Section** | [`TheHands.astro`](file:///e:/OurOrigin%20Website/src/components/home/TheHands.astro) | Documentary quote on hand-harvesting and grower knowledge |
| **Field Testimonials** | [`TestimoniesSection.astro`](file:///e:/OurOrigin%20Website/src/components/home/TestimoniesSection.astro) | Verified customer and chef quotes |
| **Seasonal Updates** | [`SocialSection.astro`](file:///e:/OurOrigin%20Website/src/components/home/SocialSection.astro) | Seasonal drop notification copy & WhatsApp link |
| **Ethos & Manifesto** | [`about.astro`](file:///e:/OurOrigin%20Website/src/pages/about.astro) | In-depth essay on Universal Ethical Direct Trade |
| **Open Ledger** | [`ledger.astro`](file:///e:/OurOrigin%20Website/src/pages/ledger.astro) | Public transparency ledger and batch records |
| **Field Notes** | [`observations.astro`](file:///e:/OurOrigin%20Website/src/pages/observations.astro) | Journal dispatches from the Western Ghats |
| **Contact Page** | [`contact.astro`](file:///e:/OurOrigin%20Website/src/pages/contact.astro) | Address, WhatsApp number, email, and inquiry info |

---

## 4. Global Constants (WhatsApp, Email, FSSAI)

Located in [`src/utils/constants.ts`](file:///e:/OurOrigin%20Website/src/utils/constants.ts):
- `WHATSAPP_NUMBER`: `'919645555668'`
- `EMAIL_ADDRESS`: `'ourorigin.in@gmail.com'`
- `FSSAI_NUMBER`: `'21326135000354'`
