const fs = require('fs');

const polygons = JSON.parse(fs.readFileSync('polygons.json', 'utf16le'));

let fileContent = fs.readFileSync('LivingMatrix.astro', 'utf8');

const regex = /const clipPaths = \[[\s\S]*?\];/;
const replacement = `const clipPaths = [
        "", // Band 0 (Nilgiris) has no top curve, so no clip-path needed
        "${polygons[1]}",
        "${polygons[2]}",
        "${polygons[3]}",
        "${polygons[4]}"
      ];`;

fileContent = fileContent.replace(regex, replacement);

fs.writeFileSync('LivingMatrix.astro', fileContent, 'utf8');
console.log("Updated LivingMatrix.astro with hi-res polygons.");
