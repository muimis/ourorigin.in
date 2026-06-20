import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'public', 'assets', 'origins');
const sourceAssetsDir = path.join(process.cwd(), 'source-assets', 'origins');

if (!fs.existsSync(sourceAssetsDir)) {
    fs.mkdirSync(sourceAssetsDir, { recursive: true });
}

async function convertImages() {
    const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
    
    console.log('| Filename | Original Size | WebP Size | Reduction |');
    console.log('|---|---|---|---|');
    
    for (const file of files) {
        const inputPath = path.join(assetsDir, file);
        const originalStats = fs.statSync(inputPath);
        const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
        
        const basename = path.parse(file).name;
        const outputPath = path.join(assetsDir, `${basename}.webp`);
        
        await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath);
            
        const newStats = fs.statSync(outputPath);
        const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
        
        const reduction = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(1);
        
        console.log(`| ${file} | ${originalSizeMB} MB | ${newSizeMB} MB | ${reduction}% |`);
        
        // Move original to source-assets
        const backupPath = path.join(sourceAssetsDir, file);
        fs.renameSync(inputPath, backupPath);
    }
}

convertImages().catch(console.error);
