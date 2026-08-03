const fs = require('fs');
let content = fs.readFileSync('src/components/Ledger.astro', 'utf8');

content = content.replace(/'DM Mono', monospace/g, 'var(--font-evidence)');
content = content.replace(/'Cormorant Garamond', serif/g, 'var(--font-narrative)');
content = content.replace(/var\(--font-institutional\)/g, 'var(--font-display)');

content = content.replace(/font-size: 9px;/g, 'font-size: var(--type-whisper);');
content = content.replace(/font-size: 10px;/g, 'font-size: var(--type-whisper);');
content = content.replace(/font-size: 11px;/g, 'font-size: var(--type-evidence);');
content = content.replace(/font-size: 12px;/g, 'font-size: var(--type-evidence);');
content = content.replace(/font-size: 13px;/g, 'font-size: var(--type-evidence);');
content = content.replace(/font-size: 14px;/g, 'font-size: var(--type-narrative);');
content = content.replace(/font-size: 16px;/g, 'font-size: var(--type-narrative);');
content = content.replace(/font-size: 0\.75rem;/g, 'font-size: var(--type-whisper);');
content = content.replace(/font-size: 0\.8rem;/g, 'font-size: var(--type-whisper);');
content = content.replace(/font-size: 0\.85rem;/g, 'font-size: var(--type-whisper);');
content = content.replace(/font-size: 0\.9rem;/g, 'font-size: var(--type-evidence);');
content = content.replace(/font-size: 1rem;/g, 'font-size: var(--type-narrative);');
content = content.replace(/font-size: 1\.2rem;/g, 'font-size: var(--type-statement);');
content = content.replace(/font-size: 1\.5rem;/g, 'font-size: var(--type-display);');
content = content.replace(/font-size: 22px;/g, 'font-size: var(--type-display);');

content = content.replace(/padding-bottom: env\(safe-area-inset-bottom\);/g, 'padding-bottom: calc(var(--space-xl) + env(safe-area-inset-bottom, 0px));');

content = content.replace(/transition:\s*([^;]+)\s+0\.\ds\s+ease/g, 'transition: $1 var(--duration-standard) var(--ease-settle)');
content = content.replace(/transition:\s*([^;]+)\s+0\.\ds\s+cubic-bezier\([^)]+\)/g, 'transition: $1 var(--duration-standard) var(--ease-settle)');

content = content.replace(/rgba\(244,\s*241,\s*235,/g, 'rgba(245, 240, 232,');
content = content.replace(/rgba\(245,\s*237,\s*216,/g, 'rgba(245, 240, 232,');
content = content.replace(/rgba\(166,\s*124,\s*60,/g, 'rgba(198, 156, 82,');

fs.writeFileSync('src/components/Ledger.astro', content);
console.log('done');
