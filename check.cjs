const http = require('http');

http.get('http://localhost:4321', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Find Cinnamon and Clove
    const parts = data.split('class="product-row"');
    parts.forEach((part, i) => {
      if (part.includes('Cinnamon') || part.includes('Clove')) {
        console.log(`\n\n--- ITEM ${i} ---`);
        console.log(part.substring(0, 500));
      }
    });
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
