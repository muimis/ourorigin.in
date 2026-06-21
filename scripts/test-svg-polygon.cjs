const fs = require('fs');
const svg = fs.readFileSync('source-assets/map outlines/wayanadu map cut .svg', 'utf8');
const match = svg.match(/d="([^"]+)"/);
if (match) {
  const commands = match[1].trim().split(/\s+(?=[ML])/);
  // Get the "forward" path from index 0 to 216
  // Index 0 is "M 632,30", we need to change it to "L 632,30" because we start our path elsewhere!
  let forwardPath = commands.slice(0, 217).join(' ');
  forwardPath = forwardPath.replace(/^M/, 'L');
  
  // The boundary of the solid area:
  const filledPath = `M 0,0 L 632,0 ${forwardPath} L 921,1507 L 921,1536 L 0,1536 Z`;
  
  const filledSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 921 1536">
  <!-- Filled polygon in black -->
  <path d="${filledPath}" fill="black" />
  <!-- Original red stroke on top -->
  <path d="${match[1]}" fill="none" stroke="red" stroke-width="2" />
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
  fs.writeFileSync('public/test-svg-polygon.html', html);
  // Also save the actual SVG mask we will use
  const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 921 1536"><path d="${filledPath}" fill="black" /></svg>`;
  fs.writeFileSync('public/maps/wayanadu map cut_solid.svg', finalSvg);
  console.log('Created public/test-svg-polygon.html and public/maps/wayanadu map cut_solid.svg');
}
