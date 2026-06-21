const fs = require('fs');
const svg = fs.readFileSync('source-assets/map outlines/wayanadu map cut .svg', 'utf8');

const html = `
<!DOCTYPE html>
<html>
<body style='background: #ccc; margin: 0; padding: 20px; text-align: center;'>
  <div style='background: white; border: 1px solid #999; display: inline-block; width: 100%; max-width: 600px;'>
    ${svg.replace('<path d=', '<path fill="black" d=').replace('<svg ', '<svg style="width: 100%; height: auto; display: block;" ')}
  </div>
</body>
</html>
`;
fs.writeFileSync('public/test-svg-fill-direct.html', html);
console.log('Created public/test-svg-fill-direct.html');
