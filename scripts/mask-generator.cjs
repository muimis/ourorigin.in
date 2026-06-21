const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../source-assets/map outlines');
const outputDir = path.join(__dirname, '../public/maps');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImage(filename) {
  try {
    const image = await Jimp.read(path.join(inputDir, filename));
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Create a new solid transparent image for the mask
    // We want the outside to be transparent (0x00000000)
    // We want the inside to be solid black (0x000000FF)
    // CSS mask-image defaults to alpha mode, so solid color = visible, transparent = hidden
    const mask = new Jimp(width, height, 0x00000000);
    
    const visited = new Uint8Array(width * height);
    const queue = [[0, 0]];
    visited[0] = 1;
    
    let head = 0;
    
    while (head < queue.length) {
      const [x, y] = queue[head++];
      
      const neighbors = [
        [x+1, y], [x-1, y], [x, y+1], [x, y-1]
      ];
      
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const idx = ny * width + nx;
          if (visited[idx] === 0) {
            visited[idx] = 1;
            
            const color = image.getPixelColor(nx, ny);
            const r = (color >> 24) & 255;
            const g = (color >> 16) & 255;
            const b = (color >> 8) & 255;
            
            // If the pixel is mostly white (background), keep traversing
            if (r > 128 && g > 128 && b > 128) {
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
    
    // Fill the inside and outline with solid black so it acts as an opaque mask
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (visited[y * width + x] === 0) {
          mask.setPixelColor(0x000000FF, x, y);
        }
      }
    }
    
    const outName = filename.replace(/\.(jpg|jpeg|png)$/i, '_solid.png');
    await mask.writeAsync(path.join(outputDir, outName));
    console.log(`Generated solid mask for ${filename}`);
  } catch(e) {
    console.error(`Error on ${filename}`, e);
  }
}

async function run() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  for (const f of files) {
    await processImage(f);
  }
}

run();
