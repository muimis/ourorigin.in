const fs = require('fs');
const svg = fs.readFileSync('source-assets/map outlines/wayanadu map cut .svg', 'utf8');
const match = svg.match(/d="([^"]+)"/);
if (match) {
  const commands = match[1].trim().split(/\s+(?=[ML])/);
  // Get the "forward" path
  const half1 = commands.slice(0, 217).join(' '); // Up to L 920,1507
  
  // To make a solid polygon that fills the bottom-left, we append:
  // L 921 1536 (bottom right corner)
  // L 0 1536 (bottom left corner)
  // L 0 0 (top left corner)
  // L 632 0 (top edge up to the start point)
  // Z (close back to 632, 30)
  
  const filledPath = half1 + ' L 921 1536 L 0 1536 L 0 0 L 632 0 Z';
  
  const filledSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 921 1536">
  <!-- Original red stroke -->
  <path d="${match[1]}" fill="none" stroke="red" stroke-width="5" />
  <!-- Filled polygon in black with 50% opacity so we can see the stroke -->
  <path d="${filledPath}" fill="black" opacity="0.5" />
</svg>
  `;
  
  const html = `
<!DOCTYPE html>
<html>
<body style='background: #eee; margin: 0; padding: 20px; text-align: center;'>
  <div style='background: white; border: 1px solid #ccc; display: inline-block; width: 100%; max-width: 600px;'>
    ${filledSvg.replace('<svg ', '<svg style="width: 100%; height: auto; display: block;" ')}
  </div>
</body>
</html>
  `;
  fs.writeFileSync('public/test-svg-filled.html', html);
  console.log('Created public/test-svg-filled.html');
}
