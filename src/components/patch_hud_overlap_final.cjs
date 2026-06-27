const fs = require('fs');
let content = fs.readFileSync('LivingMatrix.astro', 'utf8');

// The visible slice of a band is only the middle ~80px (due to padding/margin top/bottom 60px).
// Therefore, the ONLY safe vertical position is 50%.
// To avoid text horizontally, we anchor the dot firmly on the right side.
const newHudData = `
const hudData = {
  'nilgiris': { tag: 'YIELD // BEANS & LEAVES', top: '50%', rightDot: '15%' },
  'idukki': { tag: 'YIELD // PODS & ARILS', top: '50%', rightDot: '15%' },
  'wayanad': { tag: 'YIELD // BERRIES, BUDS & BARK', top: '50%', rightDot: '15%' },
  'malabar-coast': { tag: '[ UNDOCUMENTED ]', top: '50%', rightDot: '15%' },
  'thiruvananthapuram': { tag: 'YIELD // ROOTS & RHIZOMES', top: '50%', rightDot: '15%' }
};
`;

content = content.replace(/const hudData = \{[\s\S]*?\};/, newHudData.trim());

// Hide HUD on mobile to absolutely guarantee no overlap on narrow screens
const mobileHide = `
  @media (max-width: 768px) {
    .yield-hud-callout {
      display: none !important;
    }
  }
`;
content = content.replace(/(<\/style>)/, `${mobileHide}\n$1`);

fs.writeFileSync('LivingMatrix.astro', content, 'utf8');
console.log("HUD perfectly centered vertically at 50%, right anchored at 15%. Hidden on mobile.");
