const fs = require('fs');

let indexContent = fs.readFileSync('../pages/index.astro', 'utf8');

indexContent = indexContent.replace(
    /body::-webkit-scrollbar \{[\s\S]*?scrollbar-width: none;\s*\}/,
    `body { overflow: hidden; }`
);

fs.writeFileSync('../pages/index.astro', indexContent, 'utf8');
console.log("Added overflow hidden to body.");
