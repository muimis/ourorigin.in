const fs = require('fs');
const svg = fs.readFileSync('source-assets/map outlines/wayanadu map cut .svg', 'utf8');
const match = svg.match(/d="([^"]+)"/);
if (match) {
  const commands = match[1].trim().split(/\s+(?=[ML])/);
  // Get the "forward" path from index 0 to 216
  // Index 0 is "M 632,30", we need to change it to "L 632,30" because we start our path elsewhere!
  let forwardPath = commands.slice(0, 217).join(' ');
  forwardPath = forwardPath.replace(/^M/, 'L');
  
  // The boundary of the solid area:
  // We want the Top margin and Right margin to be cut.
  // The Left margin and Bottom margin to be straight.
  // So we start at the beginning of the jagged path, go to the end, then straight to bottom-right, then bottom-left, then close (which goes straight up the left edge to the start).
  // Wait! The jagged path STARTS at 632,30 and ENDS at 920,1507.
  // But it hits the left edge at 0,290.
  // If we just use the jagged path from (632,30) to (920,1507), and then go to (921,1536) and (0,1536) and Z.
  // The 'Z' command will connect (0,1536) [Bottom Left] directly to (632,30) [Start]!
  // This would draw a diagonal straight line across the image, destroying the top cut!
  // Instead, from Bottom-Left (0,1536), we must draw a straight line UP the left edge to (0,290),
  // and THEN trace the jagged path to (632,30).
  // BUT the forwardPath goes from (632,30) to (0,290) to (920,1507)!
  // If we just use forwardPath: (632,30) -> ... -> (0,290) -> ... -> (920,1507)
  // And append L 921,1536 (Bottom Right), L 0,1536 (Bottom Left), L 0,290 (Left Edge Hit).
  // And then Z! The Z connects (0,290) to (632,30) with a STRAIGHT line!
  // That destroys the top cut!
  // We MUST split the path at (0,290)!
  // The true boundary is: Left edge -> Top Cut -> Right Cut -> Bottom edge.
  // If forwardPath is P1(632) -> P2(0) -> P3(920).
  // The correct polygon is: P2(0) -> P3(920) [this is the Right cut]
  // -> (921,1536) -> (0,1536) [this is the Bottom edge]
  // -> P2(0) [this is the Left edge]
  // Wait, if we do that, we completely lose P1(632) to P2(0)! (The Top cut!)
  // If we want to include the Top cut, the solid area MUST be between P1 and P2!
  // If the Top cut is between (632,30) and (0,290), and the Right cut is between (0,290) and (920,1507)... wait!
  // If (0,290) is on the LEFT edge, then (0,290) to (920,1507) is NOT the right cut! It's a diagonal cut across the entire image!
  // Let me rethink this...
  // The path starts at 632,30 (Top). It goes LEFT to 0,290 (Left edge).
  // This is the TOP margin cut!
  // Then it goes RIGHT and DOWN to 920,1507 (Right edge).
  // This is the RIGHT margin cut!
  // So the solid area is the shape bounded by these two cuts.
  // To enclose it properly, we just do:
  // forwardPath (traces from 632,30 to 0,290 to 920,1507)
  // L 921,1536 (to bottom right)
  // L 0,1536 (to bottom left)
  // L 0,290 (to the left edge where the path hit)
  // And wait, if we are at 0,290, the forwardPath ALREADY has the segment from 632,30 to 0,290!
  // If we Z from 0,290 to 632,30, it draws a straight line!
  // So the segment from 632,30 to 0,290 MUST be traced BACKWARDS from 0,290 to 632,30!
  // Or we just don't draw a straight line.
  // If we trace backwards, the polygon is:
  // (0,290) -> (0,1536) -> (921,1536) -> (921,1507) -> trace BACKWARDS to (632,30) -> trace BACKWARDS to (0,290).
  // But wait, if we just use the user's path forwards:
  // (632,30) -> (0,290) -> (920,1507)
  // Then we go to (921,1536), then to (0,1536), then to (0,290).
  // If we connect (0,1536) to (0,290), we have enclosed a polygon:
  // (0,290) -> (920,1507) -> (921,1536) -> (0,1536) -> (0,290).
  // This is ONE loop.
  // And the segment (632,30) -> (0,290) is just a line sticking out! It won't be filled!
  // YES! This is why my previous polygon was wrong!
  
  // To fill the area BELOW (632,30) -> (0,290), we MUST have a solid left edge.
  // But wait, if (0,290) is the LEFTMOST point, there is no area to the left of it!
  // The area below (632,30) -> (0,290) is bounded by:
  // The path (632,30) -> (0,290)
  // A straight line from (0,290) down to somewhere.
  // A straight line from (632,30) down to somewhere.
  // Let's just reverse the first part of the path!
  
  const idxOfLeftEdge = 56; // We found this earlier
  // Part 1: (632,30) to (0,290) -> This is the TOP cut.
  // Part 2: (0,290) to (920,1507) -> This is the RIGHT cut.
  
  // If Part 1 is the Top cut, and Part 2 is the Right cut.
  // Then the solid area is below Part 1, and left of Part 2.
  // So the polygon is:
  // (0,290) -> Part 2 -> (920,1507)
  // (920,1507) -> L 921,1536 (Bottom Right)
  // (921,1536) -> L 0,1536 (Bottom Left)
  // (0,1536) -> L 0,290 (Left edge, closing the Part 2 loop)
  // BUT we ALSO need to fill below Part 1!
  // Where is "below Part 1"?
  // Part 1 goes from (632,30) to (0,290).
  // If it's the TOP cut, then the area below it is bounded by the right cut (Part 2).
  // Wait, Part 1 and Part 2 are connected at (0,290).
  // If we just reverse Part 1:
  // (0,290) -> reverse Part 1 -> (632,30)
  // Then from (632,30) we go straight down? No, that would be a straight right edge!
  // But Part 2 IS the right edge!
  // So we go from (632,30) to (920,1507) using Part 2!
  // But wait, Part 2 starts at (0,290)!
  // If we go from (632,30) to (0,290) using Part 2... we can't! Part 2 is (0,290) to (920,1507)!
  // This means the solid shape is bounded by:
  // Top: (0,290) to (632,30) [Reverse of Part 1]
  // Right: (632,30) to (920,1507) [WAIT, IS PART 2 FROM 632,30 TO 920,1507?]
  // No! The user's path is continuous! P1(632,30) -> P2(0,290) -> P3(920,1507)!
  // The path physically goes from the Top-Right (632,30) all the way LEFT to (0,290), and then all the way RIGHT and DOWN to (920,1507)!
  // This forms a giant V-shape!
  // If the user says "the right and top margin is cut", the solid area must be on the BOTTOM-LEFT of this V-shape!
  // The area on the bottom-left of the V-shape is bounded by:
  // The V-shape itself: (632,30) -> (0,290) -> (920,1507)
  // A straight line from (920,1507) to (920,1536) (Bottom-Right corner)
  // A straight line from (920,1536) to (0,1536) (Bottom-Left corner)
  // A straight line from (0,1536) to (0,290) (Left edge)
  // BUT the V-shape's top point is (632,30).
  // How do we close the polygon from (0,290) back to (632,30)?
  // We MUST trace the V-shape backwards!
  
  let reversePart1 = [];
  for (let i = idxOfLeftEdge; i >= 0; i--) {
    let cmd = commands[i].trim();
    if (cmd.startsWith('M')) cmd = 'L' + cmd.substring(1);
    reversePart1.push(cmd);
  }
  
  // Shift all coordinates: Y = Y - 30
  // viewBox width becomes 920 (max X is 920)
  // viewBox height becomes 1536 - 30 = 1506
  
  function shiftCommands(cmdArray) {
    return cmdArray.map(cmd => {
      const type = cmd[0];
      const coords = cmd.substring(1).trim().split(',');
      if (coords.length === 2) {
        const x = parseInt(coords[0]);
        const y = parseInt(coords[1]) - 30; // Shift UP by 30
        return `${type} ${x},${y}`;
      }
      return cmd;
    });
  }
  
  const shiftedForward = shiftCommands(commands.slice(1, 217)).join(' ');
  const shiftedReverse = shiftCommands(reversePart1).join(' ');
  
  // Create a perfectly tight polygon that touches 0 on the left, 920 on the right, 0 on top, 1506 on bottom
  const filledPath = `M 632,0 ${shiftedForward} L 920,1477 L 920,1506 L 0,1506 L 0,260 ${shiftedReverse} Z`;
  
  // The tight SVG mask that preserves its intrinsic aspect ratio perfectly.
  const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 1506"><path d="${filledPath}" fill="black" /></svg>`;
  fs.writeFileSync('public/maps/wayanadu map cut_solid.svg', finalSvg);
  console.log('Created public/maps/wayanadu map cut_solid.svg with tightly bound coordinates');
}
