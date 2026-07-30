# OurOrigin — Product Catalog

All prices are premium Kerala retail rates (July 2026, verified against market sources). Single variation per product.

## Spices

| Product | Botanical Name | Origin | Size | Price |
|---|---|---|---|---|
| Forest Black Pepper | *Piper nigrum* | Wayanad | 100g | ₹199 |
| Cardamom | *Elettaria cardamomum* | Idukki | 50g | ₹399 |
| Cinnamon | *Cinnamomum verum* | Wayanad | 100g | ₹249 |
| Clove | *Syzygium aromaticum* | Wayanad | 50g | ₹199 |
| Dry Ginger | *Zingiber officinale* | Thiruvananthapuram | 100g | ₹199 |
| Green Pepper | *Piper nigrum* | Nilgiris | 50g | ₹179 |
| Mace | *Myristica fragrans* | Idukki | 25g | ₹249 |
| Turmeric | *Curcuma longa* | Wayanad | 100g | ₹149 |
| White Pepper | *Piper nigrum* | Nilgiris | 50g | ₹199 |

## Beverages

| Product | Botanical Name | Origin | Size | Price |
|---|---|---|---|---|
| Coffee | *Coffea arabica* | Nilgiris | 250g | ₹449 |
| Green Tea | *Camellia sinensis* | Nilgiris | 100g | ₹299 |
| Tea (Black) | *Camellia sinensis* | Nilgiris | 100g | ₹249 |

## Millets

| Product | Botanical Name | Origin | Size | Price |
|---|---|---|---|---|
| Finger Millet (Ragi) | *Eleusine coracana* | Attappady | 500g | ₹149 |
| Foxtail Millet | *Setaria italica* | Attappady | 500g | ₹169 |
| Little Millet | *Panicum sumatrense* | Attappady | 500g | ₹159 |

---

## Origins

| Origin | Bioregion | Elevation | Coordinates |
|---|---|---|---|
| Wayanad | Western Ghats | 900–1,100m | 11°36′N, 76°04′E |
| Idukki | Western Ghats | 1,200m | 9°51′N, 76°58′E |
| Nilgiris | Western Ghats | 1,800–2,200m | 11°24′N, 76°44′E |
| Thiruvananthapuram | Western Ghats | 200–600m | 8°30′N, 77°02′E |
| Attappady | Western Ghats | 600–1,000m | 11°06′N, 76°35′E |
| Malabar Coast | Kerala Coast | Sea level–100m | 11°15′N, 75°46′E |

---

## Product Data Schema

Each product JSON contains:
- `slug`, `name`, `botanicalName` — identity
- `originSlug` — links to origin
- `batchRef` — traceability
- `sizes[]` — single entry: `{ label, priceINR, isPriceVerified }`
- `methodDescription` — physical method
- `specimenCopy` — the specific truth about this product
- `images` — packaging and product photography
- `sensoryProfile` — aroma, flavor, appearance (grounded physical language, not sommelier)
- `chemistry` — activeCompound, moistureContent

## Content Quality Standard

Every piece of product copy must pass the What/How/When/Why test:
- **WHAT** — Physical, grounded description. No sommelier language.
- **HOW** — The actual method. The physical labor.
- **WHEN** — The season. The constraint. We wait.
- **WHY** — The ecosystem that makes this specific, not generic.
