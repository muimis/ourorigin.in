const fs = require('fs');
const svg = fs.readFileSync('source-assets/map outlines/wayanadu map cut .svg', 'utf8');
const match = svg.match(/d="([^"]+)"/);
if (match) {
  const commands = match[1].trim().split(/\s+(?=[ML])/);
  console.log('Total commands:', commands.length);
  console.log('Start:', commands[0], commands[1]);
  
  let minX = 9999, minXIdx = -1;
  let maxX = -1, maxXIdx = -1;
  let minY = 9999, minYIdx = -1;
  let maxY = -1, maxYIdx = -1;
  
  for (let i=0; i<commands.length; i++) {
    const coords = commands[i].substring(1).trim().split(',');
    if (coords.length === 2) {
      const x = parseInt(coords[0]);
      const y = parseInt(coords[1]);
      if (x < minX) { minX = x; minXIdx = i; }
      if (x > maxX) { maxX = x; maxXIdx = i; }
      if (y < minY) { minY = y; minYIdx = i; }
      if (y > maxY) { maxY = y; maxYIdx = i; }
    }
  }
  console.log(`Min X: ${minX} at index ${minXIdx} cmd: ${commands[minXIdx]}`);
  console.log(`Max X: ${maxX} at index ${maxXIdx} cmd: ${commands[maxXIdx]}`);
  console.log(`Min Y: ${minY} at index ${minYIdx} cmd: ${commands[minYIdx]}`);
  console.log(`Max Y: ${maxY} at index ${maxYIdx} cmd: ${commands[maxYIdx]}`);
  console.log(`Middle index: ${Math.floor(commands.length/2)} cmd: ${commands[Math.floor(commands.length/2)]}`);
  
  // Find the turnaround point (where it goes from index N to N+1 but coordinates jump back)
  // Or just find the midpoint which is probably where it turns around.
  const turnIdx = Math.floor(commands.length / 2);
  console.log(`Turnaround point is likely around index ${turnIdx}: ${commands[turnIdx]}`);
  
  // Let's create a new SVG that uses ONLY the first half, and adds the bottom-left corner to close it!
  // The first half goes from (632,30) to (920, 1507) or something. Wait, if Min X is 0 and Max Y is 1507...
  // Let's just output the first half.
  let half1 = commands.slice(0, turnIdx + 1);
  console.log(`Half 1 goes from ${half1[0]} to ${half1[half1.length-1]}`);
  
  // Wait, if half 1 ends at X=920, Y=1507 (bottom right), we can close it to (0, 1536) [bottom left], then to (0, 0) [top left], and back to start?
  // No, if half 1 goes from (632,30) [top right] to (0,290) [top left] and then down to (920,1507) [bottom right]... that's a zig-zag!
  // Let's check the order of min/max indices!
  console.log(`Order of extremes:`);
  const extremes = [
    {type: 'MinX (Left)', idx: minXIdx, cmd: commands[minXIdx]},
    {type: 'MaxX (Right)', idx: maxXIdx, cmd: commands[maxXIdx]},
    {type: 'MinY (Top)', idx: minYIdx, cmd: commands[minYIdx]},
    {type: 'MaxY (Bottom)', idx: maxYIdx, cmd: commands[maxYIdx]}
  ];
  extremes.sort((a,b) => a.idx - b.idx);
  for (const e of extremes) {
    console.log(`  ${e.type} at idx ${e.idx}: ${e.cmd}`);
  }
}
