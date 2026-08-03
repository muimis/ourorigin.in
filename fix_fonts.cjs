const fs = require('fs');

function replaceFonts(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');

  content = content.replace(/'DM Mono', monospace/g, 'var(--font-evidence)');
  content = content.replace(/'Cormorant Garamond', serif/g, 'var(--font-narrative)');
  content = content.replace(/var\(--font-institutional\)/g, 'var(--font-display)');
  
  content = content.replace(/font-size: 11px;/g, 'font-size: var(--type-evidence);');
  content = content.replace(/font-size: 12px;/g, 'font-size: var(--type-evidence);');
  content = content.replace(/font-size: 14px;/g, 'font-size: var(--type-narrative);');
  content = content.replace(/font-size: 16px;/g, 'font-size: var(--type-narrative);');
  
  content = content.replace(/padding-bottom: env\(safe-area-inset-bottom\);/g, 'padding-bottom: calc(var(--space-xl) + env(safe-area-inset-bottom, 0px));');

  fs.writeFileSync(filepath, content);
}

replaceFonts('src/pages/origins/[originSlug]/index.astro');
replaceFonts('src/pages/404.astro');
replaceFonts('src/pages/privacy.astro');
replaceFonts('src/pages/terms.astro');

console.log('done');
