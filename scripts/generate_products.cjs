const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'src', 'content', 'products');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const products = [
  {
    slug: 'black-pepper',
    name: 'Forest Black Pepper',
    botanicalName: 'Piper nigrum',
    originSlug: 'wayanad',
    isAnchorProduct: true,
    batchRef: 'WYD-FBP-001',
    harvestMonth: 'January - March',
    sizes: [
      { label: '50g', priceINR: 109, isPriceVerified: true },
      { label: '100g', priceINR: 199, isPriceVerified: true },
      { label: '250g', priceINR: 449, isPriceVerified: true }
    ],
    methodDescription: 'Harvested by hand, sun-dried on traditional mats.',
    specimenCopy: "The berries are picked green. They only turn black in the drying — which means the colour you've always known as black pepper isn't the colour it grew. It's the colour of what happened to it afterward. What's sealed in this packet is the same fruit, transformed by sun and time, at the exact moment that transformation was considered complete.",
    offeringCopy: "If you've read this far, you already know more about this pepper than its label could tell you."
  },
  {
    slug: 'tea',
    name: 'Tea',
    botanicalName: 'Camellia sinensis',
    originSlug: 'nilgiris',
    isAnchorProduct: true,
    batchRef: 'NIL-TEA-001',
    harvestMonth: 'Ongoing',
    sizes: [ { label: '50g', priceINR: 149, isPriceVerified: false } ],
    methodDescription: 'Picked by hand, fully oxidized.',
    specimenCopy: "The same plant makes green tea and black tea both. The difference is entirely in what happens after picking, not in what was grown. The leaf that becomes black tea and the leaf that becomes green tea came off the same bush, probably the same day. One was allowed to oxidize until it darkened. One wasn't.",
    offeringCopy: "You've been at 2,600 metres. The tea was too."
  },
  {
    slug: 'cardamom',
    name: 'Cardamom',
    botanicalName: 'Elettaria cardamomum',
    originSlug: 'idukki',
    isAnchorProduct: true,
    batchRef: 'IDK-CAR-001',
    harvestMonth: 'Ongoing',
    sizes: [ { label: '50g', priceINR: 399, isPriceVerified: false } ],
    methodDescription: 'Wild-harvested, low-temperature drying.',
    specimenCopy: "The pods are picked intact, before they split, and dried at low temperature so the seeds inside keep the oils that give them their character. Most cardamom loses a measurable amount of those oils in overly aggressive drying. This one doesn't.",
    offeringCopy: "From the hills that were named for it. Nowhere else in the world has this quite the same way."
  },
  {
    slug: 'single-origin-clove',
    name: 'Single Origin Clove',
    botanicalName: 'Syzygium aromaticum',
    originSlug: 'wayanad',
    isAnchorProduct: true,
    batchRef: 'WYD-CLV-001',
    harvestMonth: 'Seasonal',
    sizes: [ { label: '100g', priceINR: 269, isPriceVerified: true } ],
    methodDescription: 'Hand picked before blooming.',
    specimenCopy: "What's dried and sold as a clove is, botanically speaking, a flower bud — harvested before it ever got to open. The timing is everything: too early and the bud hasn't developed its oils; too late and it's already beginning to open, losing them. This clove is gathered from communities across the Western Ghats — Idukki, Kottayam, Pathanamthitta, and the forests further south toward Nagercoil — places that share the same ecosystem and the same understanding of when to pick, even where they don't share an administrative boundary. Single origin means single bioregion, honestly sourced, not a single GPS pin.",
    offeringCopy: "Caught at the right moment, by someone who knows what that moment looks like."
  },
  {
    slug: 'dry-ginger',
    name: 'Dry Ginger',
    botanicalName: 'Zingiber officinale',
    originSlug: 'thiruvananthapuram',
    isAnchorProduct: true,
    batchRef: 'TVM-DGI-001',
    harvestMonth: 'Seasonal',
    sizes: [ { label: '100g', priceINR: 149, isPriceVerified: false } ],
    methodDescription: 'Dug up, boiled briefly, and sun-dried.',
    specimenCopy: "Dried until it's roughly a fifth of its fresh weight. The drying process — boiling first, then several days under the sun — transforms the chemistry of the root: fresh, citrusy volatiles diminish and a deeper, warmer, more resinous character emerges. Dry ginger and fresh ginger are not the same thing, one simply older. The transformation is intentional.",
    offeringCopy: "From the flatlands at the edge of the Western Ghats."
  },
  {
    slug: 'coffee',
    name: 'Coffee',
    botanicalName: 'Coffea arabica',
    originSlug: 'nilgiris',
    isAnchorProduct: false,
    batchRef: 'NIL-COF-001',
    harvestMonth: 'Seasonal',
    sizes: [ { label: '100g', priceINR: 299, isPriceVerified: false } ],
    methodDescription: 'Shade grown, minimal intervention.',
    specimenCopy: "Grown in the same high terraces as tea — often within sight of each other, two crops that ask for almost identical altitude and shade. The berry that becomes coffee is picked red, when fully ripe. This one is processed simply, with as few interventions as possible."
  },
  {
    slug: 'green-tea',
    name: 'Green Tea',
    botanicalName: 'Camellia sinensis',
    originSlug: 'nilgiris',
    isAnchorProduct: false,
    batchRef: 'NIL-GTE-001',
    harvestMonth: 'Ongoing',
    sizes: [ { label: '50g', priceINR: 179, isPriceVerified: false } ],
    methodDescription: 'Unoxidized, pan-fired.',
    specimenCopy: "The same leaf as our Nilgiris tea, from the same bushes on the same slopes — simply stopped before it could darken. No oxidation. The green in green tea is not a different plant; it's a decision made within hours of picking."
  },
  {
    slug: 'green-pepper',
    name: 'Green Pepper',
    botanicalName: 'Piper nigrum',
    originSlug: 'nilgiris',
    isAnchorProduct: false,
    batchRef: 'NIL-GPP-001',
    harvestMonth: 'January - March',
    sizes: [ { label: '30g', priceINR: 149, isPriceVerified: false } ],
    methodDescription: 'Preserved green.',
    specimenCopy: "The same berry as Forest Black Pepper, picked from vines at the same altitude, at the same time of year — but preserved green instead of dried black. Black pepper and green pepper are not two different crops. They are two moments in the same crop's life, caught at different stages."
  },
  {
    slug: 'white-pepper',
    name: 'White Pepper',
    botanicalName: 'Piper nigrum',
    originSlug: 'nilgiris',
    isAnchorProduct: false,
    batchRef: 'NIL-WPP-001',
    harvestMonth: 'January - March',
    sizes: [ { label: '50g', priceINR: 179, isPriceVerified: false } ],
    methodDescription: 'Fully ripened, outer skin removed.',
    specimenCopy: "Piper nigrum, this time allowed to ripen fully on the vine — longer than black pepper — then soaked in water until the outer skin softens and can be rubbed away. What remains is the pale, sharper seed underneath. Three different products from one vine. None of them require a different plant."
  },
  {
    slug: 'mace',
    name: 'Mace',
    botanicalName: 'Myristica fragrans',
    originSlug: 'idukki',
    isAnchorProduct: false,
    batchRef: 'IDK-MAC-001',
    harvestMonth: 'Seasonal',
    sizes: [ { label: '30g', priceINR: 249, isPriceVerified: false } ],
    methodDescription: 'Separated from the nutmeg seed.',
    specimenCopy: "Mace is not a separate plant from nutmeg. It's the lace-like crimson covering — botanically, the aril — wrapped directly around the nutmeg seed. One tree quietly produces two different spices at once. Most people who have cooked with both have never noticed."
  },
  {
    slug: 'cinnamon',
    name: 'Cinnamon',
    botanicalName: 'Cinnamomum verum',
    originSlug: 'wayanad',
    isAnchorProduct: false,
    batchRef: 'WYD-CIN-001',
    harvestMonth: 'Seasonal',
    sizes: [ { label: '50g', priceINR: 149, isPriceVerified: false } ],
    methodDescription: 'True cinnamon, inner bark peeling.',
    specimenCopy: "True cinnamon — not cassia, which is what fills most spice jars labelled cinnamon. The difference is in the bark: true cinnamon peels into thin, paper-soft layers. Cassia is a single thick curl, harder and more pungent. The plants are related; the results are different. This is the one that earned the name first."
  },
  {
    slug: 'turmeric',
    name: 'Turmeric',
    botanicalName: 'Curcuma longa',
    originSlug: 'wayanad',
    isAnchorProduct: false,
    batchRef: 'WYD-TUR-001',
    harvestMonth: 'Seasonal',
    sizes: [ { label: '100g', priceINR: 129, isPriceVerified: false } ],
    methodDescription: 'Boiled, dried, ground.',
    specimenCopy: "Turmeric is dug up, not picked. The whole rhizome comes out of the ground — a gnarled, orange-fleshed root that looks almost nothing like the fine yellow powder most people associate with it. After lifting: boiled briefly, dried for days, then ground. The colour comes from curcumin, which the plant produces not as a display but as protection from insects and fungal infection. A crop that colours itself to survive."
  }
];

products.forEach(p => {
  fs.writeFileSync(path.join(outDir, `${p.slug}.json`), JSON.stringify(p, null, 2));
});

console.log(`Created ${products.length} products.`);
