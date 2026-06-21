const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/maps');
const files = fs.readdirSync(dir).filter(f => f.endsWith('_solid.png') && !f.includes('_flipped'));

async function flip() {
  for (const f of files) {
    const imgPath = path.join(dir, f);
    try {
      const img = await Jimp.read(imgPath);
      img.flip(true, false); // true for horizontal flip
      const newName = f.replace('.png', '_flipped.png');
      await img.writeAsync(path.join(dir, newName));
      console.log(`Flipped ${f} to ${newName}`);
    } catch(e) {
      console.error(`Error on ${f}`, e);
    }
  }
}

flip();
