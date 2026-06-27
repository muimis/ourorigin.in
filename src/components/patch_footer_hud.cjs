const fs = require('fs');

// 1. Update HUD fading in LivingMatrix.astro
let matrixContent = fs.readFileSync('LivingMatrix.astro', 'utf8');

matrixContent = matrixContent.replace(
  /\.matrix-bands:hover \.matrix-band:not\(:hover\) \.yield-hud-callout,[\s\S]*?opacity: 0;/,
  ".matrix-bands:hover .matrix-band:not(:hover) .yield-hud-callout,\n  .matrix-bands.has-expanded .matrix-band:not(.expanded) .yield-hud-callout {\n    opacity: 0.2;"
);

fs.writeFileSync('LivingMatrix.astro', matrixContent, 'utf8');


// 2. Update Footer styles in index.astro
let indexContent = fs.readFileSync('../pages/index.astro', 'utf8');

// Replace everything between <style> and </style> that pertains to footer
const newFooterCss = `
        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 1.5rem 3rem;
            z-index: 9000;
            background: linear-gradient(to top, rgba(12, 21, 9, 1) 0%, rgba(12, 21, 9, 0) 100%);
            pointer-events: none;
        }
        footer nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            pointer-events: auto;
        }
        footer nav a {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            color: rgba(166, 124, 60, 0.7);
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            transition: color 0.3s ease;
        }
        footer nav a:hover {
            color: rgba(166, 124, 60, 1);
            text-decoration: none;
        }
        
        /* Hide scrollbar but allow scroll if needed, though matrix is 100vh */
        body::-webkit-scrollbar {
            display: none;
        }
        body {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
`;

// we just replace the footer css
indexContent = indexContent.replace(
    /footer \{\s*padding: 3rem 1\.5rem;[\s\S]*?\}\s*footer nav a:hover \{[\s\S]*?\}/,
    newFooterCss.trim()
);

fs.writeFileSync('../pages/index.astro', indexContent, 'utf8');
console.log("HUD fading and creative footer applied.");
