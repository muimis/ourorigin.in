const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../source-assets/map outlines');
const outputDir = path.join(__dirname, '../src/assets/maps');

// Create output dir if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const inputPath = path.join(inputDir, file);
      const outputFilename = file.replace(/\.(jpg|jpeg|png)$/i, '.svg');
      const outputPath = path.join(outputDir, outputFilename);

      console.log(`Processing: ${file}...`);
      
      // potrace parameters for clean, single-path silhouettes
      const params = {
        color: '#0c1509',
        background: 'transparent',
        optCurve: true,
        optTolerance: 0.2,
        turdSize: 100, // Remove small noise
        blackOnWhite: true
      };

      potrace.trace(inputPath, params, (err, svg) => {
        if (err) {
          console.error(`Error processing ${file}:`, err);
          return;
        }
        
        fs.writeFileSync(outputPath, svg);
        console.log(`Successfully created: ${outputFilename}`);
      });
    }
  });
});
