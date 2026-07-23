import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brainDir = 'C:\\Users\\Beginow_10\\.gemini\\antigravity-ide\\brain\\3f84d335-9938-4a4e-90cd-084a287e4798';
const publicAssetsDir = path.join(__dirname, '..', 'public', 'assets', 'products');
const contentDir = path.join(__dirname, '..', 'src', 'content', 'products');

// Create assets dir if not exists
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Images mapping: productSlug -> { packaging: filePrefix, product: filePrefix }
// For those failed, we fallback.
const imageMapping = {
  'black-pepper': { p: 'black_pepper_packaging', r: 'black_pepper_product' },
  'cardamom': { p: 'cardamom_packaging', r: 'cardamom_product' },
  'cinnamon': { p: 'cinnamon_packaging', r: 'cinnamon_product' },
  'clove': { p: 'clove_', r: null }, // no product photo for these
  'coffee': { p: 'coffee_', r: null },
  'dry-ginger': { p: 'dry_ginger_', r: null },
  'green-pepper': { p: 'green_pepper_', r: null },
  'green-tea': { p: 'green_tea_', r: null },
  'mace': { p: 'mace_', r: null },
  'tea': { p: 'green_tea_', r: null }, // fallback to green tea
  'turmeric': { p: 'dry_ginger_', r: null }, // fallback to dry ginger
  'white-pepper': { p: 'black_pepper_packaging', r: null }, // fallback to black pepper
};

const brainFiles = fs.readdirSync(brainDir);

Object.keys(imageMapping).forEach(slug => {
  const mapping = imageMapping[slug];
  const jsonPath = path.join(contentDir, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) return;
  
  let jsonStr = fs.readFileSync(jsonPath, 'utf-8');
  let data = JSON.parse(jsonStr);
  
  data.sizes.forEach(size => size.isPriceVerified = true);
  
  // Find matching brain file for packaging
  const packFile = brainFiles.find(f => f.startsWith(mapping.p) && f.endsWith('.png'));
  if (packFile) {
    const destName = `${slug}-packaging.png`;
    fs.copyFileSync(path.join(brainDir, packFile), path.join(publicAssetsDir, destName));
    data.images = data.images || {};
    data.images.packaging = `/assets/products/${destName}`;
  } else {
    console.warn(`No packaging file found for prefix ${mapping.p}`);
  }
  
  // Find matching brain file for product
  if (mapping.r) {
    const prodFile = brainFiles.find(f => f.startsWith(mapping.r) && f.endsWith('.png'));
    if (prodFile) {
      const destName = `${slug}-product.png`;
      fs.copyFileSync(path.join(brainDir, prodFile), path.join(publicAssetsDir, destName));
      data.images.product = `/assets/products/${destName}`;
    }
  }
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`Updated ${slug}.json`);
});
