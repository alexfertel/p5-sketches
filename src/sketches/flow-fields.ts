/* eslint-disable @typescript-eslint/no-unused-vars */

// let width, height;
let leftX: number;
let rightX;
let topY: number;
let bottomY;
let resolution: number;
let numColumns;
let numRows;

function inRange(x: number, y: number, matrix: string | any[]): boolean {
  return 0 <= x && x < matrix.length && 0 <= y && y < matrix[0].length;
}

function drawLine(
  x: number,
  y: number,
  spacing: number,
  length: number,
  grid: number[][]
): void {
  beginShape();
  for (let i = 0; i < length; i++) {
    const xOffset = x - leftX;
    const yOffset = y - topY;
    const columnIndex = floor(xOffset / resolution);
    const rowIndex = floor(yOffset / resolution);
    if (!inRange(rowIndex, columnIndex, grid)) continue;
    stroke(random([0, 180]), 200, 255);
    vertex(x, y);
    const gridAngle = grid[rowIndex][columnIndex];
    const xStep = spacing * cos(gridAngle);
    const yStep = spacing * sin(gridAngle);
    x = x + xStep;
    y = y + yStep;
  }
  endShape();
}

// function setup(): void {
//   width = windowWidth;
//   height = windowHeight;
//   createCanvas(width, height);
//   background(255);
//   colorMode(HSB, 255);

//   leftX = floor(width * -0.5);
//   rightX = floor(width * 1.5);
//   topY = floor(height * -0.5);
//   bottomY = floor(height * 1.5);
//   // leftX = 0;
//   // rightX = width;
//   // topY = 0;
//   // bottomY = height;
//   resolution = floor(width * 0.01);
//   numColumns = (rightX - leftX) / resolution;
//   numRows = (bottomY - topY) / resolution;
//   // numRows = 100;

//   const grid = [];
//   for (let j = 0; j < numRows; j++) {
//     const row = [];
//     for (let i = 0; i < numColumns; i++) {
//       const scaledX = i * 0.005;
//       const scaledY = j * 0.005;
//       // let scaledX = i / 10;
//       // let scaledY = j / 10;

//       const noiseValue = noise(scaledX, scaledY);

//       const angle = map(noiseValue, 0.0, 1.0, 0.0, PI * 2.0);

//       row.push(angle);
//     }
//     grid.push(row);
//   }

//   // for (let j = 0; j < numRows; j++) {
//   //   for (let i = 0; i < numColumns; i++) {
//   //     let v = p5.Vector.fromAngle(grid[j][i], 5);

//   //     let vx = v.x;
//   //     let vy = v.y;

//   //     noFill();
//   //     stroke(0);
//   //     push();
//   //     translate(i * 5, j * 5);
//   //     line(0, 0, vx, vy);
//   //     pop();
//   //   }
//   // }

//   noFill();
//   const choices = [];
//   const steps = 10;
//   for (let i = 1; i <= steps; i++) {
//     choices.push((i * width) / steps);
//   }

//   for (let i = 0; i < 2000; i++) {
//     // let x = random(choices);
//     const x = random(width);
//     const y = random(height);

//     drawLine(x, y, 1, 100, grid);
//   }
// }

// const draw = (): void => {};
