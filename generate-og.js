import sharp from 'sharp';

const svgBuffer = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0c1509"/>
  
  <g transform="translate(600, 240)">
    <circle cx="0" cy="0" r="60" fill="none" stroke="#F5EDD8" stroke-width="3"/>
    <circle cx="0" cy="0" r="40" fill="none" stroke="#F5EDD8" stroke-width="2" stroke-dasharray="10 5"/>
    <circle cx="0" cy="0" r="15" fill="#F5EDD8"/>
  </g>

  <text x="600" y="440" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="#F5EDD8" text-anchor="middle">OurOrigin</text>
  <text x="600" y="500" font-family="Georgia, serif" font-size="36" fill="#F5EDD8" text-anchor="middle">From the Western Ghats.</text>
</svg>
`);

sharp(svgBuffer)
  .jpeg()
  .toFile('./public/og-image.jpg')
  .then(() => console.log('Successfully generated public/og-image.jpg'))
  .catch(err => console.error('Error generating image:', err));
