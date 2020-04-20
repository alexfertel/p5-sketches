
// function makeSink(xCenter, yCenter, r, grid) {
//   push();
//   for (let j = floor(yCenter - r); j < yCenter + r; j++) {
//     for (let i = floor(xCenter - r); i < xCenter + r; i++) {
//       if (!insideCircleBounds(i, j, xCenter, yCenter, r)) continue;

//       let x_offset = j - left_x;
//       let y_offset = i - top_y;
//       let column_index = floor(x_offset / resolution);
//       let row_index = floor(y_offset / resolution);
//       if (!inRange(row_index, column_index, grid)) continue;

//       push()
//       translate(xCenter, yCenter);
//       let v1 = createVector(j - yCenter, i - xCenter);
//       // line(0, 0, v1.x, v1.y);

//       grid[row_index][column_index] = v1.heading();
//       pop()
//       // print(degrees(v1.heading()));
//     }
//   }
//   pop();
// }


// export function setup(): void {
//   width = windowWidth;
//   height = windowHeight;
//   createCanvas(width, height);
//   colorMode(HSL, 255);

//   const c = color(map(214, 0, 360, 0, 255), 255, map(30, 0, 100, 0, 255));
//   background(c);

//   // makeSink(width / 2, height / 2, 100, grid);

//   noFill();

//   // let discCount = 10;
//   // for (let i = 0; i < discCount; i++) {
//   //   let center = { x: random(width), y: random(height) };
//   //   stroke(random(255), random(100, 255), random(150, 200))
//   //   drawDisc(center, random(100));
//   // }
//   // stroke(255)

//   stroke(255);
//   const center = { x: width / 2, y: height / 2 };
//   drawDisc(center, random(50, 200));

//   frame(750);
// }

// export function draw(): void {}
