const curves = [
  "", 
  "M0,60 C150,60 200,10 300,20 C400,30 450,90 600,70 C750,50 850,10 1000,40",
  "M0,40 C100,40 150,80 250,70 C350,60 400,20 550,30 C700,40 800,90 1000,60",
  "M0,70 C200,70 250,20 400,30 C550,40 600,80 750,60 C900,40 950,20 1000,50",
  "M0,30 C150,30 200,70 350,60 C500,50 600,10 750,30 C900,50 950,80 1000,40"
];

function sampleBezier(P0, P1, P2, P3, steps) {
  const points = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const invT = 1 - t;
    const x = Math.round(
      invT * invT * invT * P0.x +
      3 * invT * invT * t * P1.x +
      3 * invT * t * t * P2.x +
      t * t * t * P3.x
    );
    const y = Math.round(
      invT * invT * invT * P0.y +
      3 * invT * invT * t * P1.y +
      3 * invT * t * t * P2.y +
      t * t * t * P3.y
    );
    points.push({ x, y });
  }
  return points;
}

function parseAndSample(pathStr) {
  if (!pathStr) return null;
  const parts = pathStr.split(/(?=[MC])/);
  let currentPos = { x: 0, y: 0 };
  let allPoints = [];
  
  parts.forEach(part => {
    const type = part[0];
    const coords = part.slice(1).trim().split(/[\s,]+/).map(Number);
    
    if (type === 'M') {
      currentPos = { x: coords[0], y: coords[1] };
      allPoints.push(currentPos);
    } else if (type === 'C') {
      for (let i = 0; i < coords.length; i += 6) {
        const P1 = { x: coords[i], y: coords[i+1] };
        const P2 = { x: coords[i+2], y: coords[i+3] };
        const P3 = { x: coords[i+4], y: coords[i+5] };
        
        const sampled = sampleBezier(currentPos, P1, P2, P3, 10);
        allPoints = allPoints.concat(sampled);
        currentPos = P3;
      }
    }
  });
  
  return allPoints;
}

const polygons = curves.map(curve => {
  const points = parseAndSample(curve);
  if (!points) return "";
  
  // Convert points to X% and Ypx
  // The viewBox is 0 0 1000 150, but we map height to 60px.
  // So Y * (60/150) = Y * 0.4
  const polyPoints = points.map(p => {
    const xPct = (p.x / 1000 * 100).toFixed(1);
    const yPx = (p.y * 0.4).toFixed(1);
    return `${xPct}% ${yPx}px`;
  });
  
  // Add bottom corners to complete the polygon
  polyPoints.push("100% 100%");
  polyPoints.push("0% 100%");
  
  return `polygon(${polyPoints.join(', ')})`;
});

console.log(JSON.stringify(polygons, null, 2));
