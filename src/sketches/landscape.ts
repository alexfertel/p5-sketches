
// // import { Color } from "p5";

// const Y_AXIS = 1;
// const X_AXIS = 2;
// let width: number, height: number;

// // Extend p5.Image, adding the converse of "mask", naming it "punchOut":
// // p5.Image.prototype.punchOut = function(p5Image) {
// //   if (p5Image === undefined) {
// //     p5Image = this;
// //   }
// //   const currBlend = this.drawingContext.globalCompositeOperation;

// //   const scaleFactor = 1;
// //   // if (p5Image instanceof p5.Graphics) {
// //   //   scaleFactor = p5Image._pInst._pixelDensity;
// //   // }

// //   const copyArgs = [
// //     p5Image,
// //     0,
// //     0,
// //     scaleFactor * p5Image.width,
// //     scaleFactor * p5Image.height,
// //     0,
// //     0,
// //     this.width,
// //     this.height
// //   ];

// //   this.drawingContext.globalCompositeOperation = "destination-out";
// //   this.copy.apply(this, copyArgs);
// //   this.drawingContext.globalCompositeOperation = currBlend;
// // };

// function drawGround(line: string | any[]): void {
//   beginShape();
//   curveVertex(0, height);
//   for (let i = 0; i < line.length; i++) {
//     curveVertex(line[i]["x"], line[i]["y"]);
//   }
//   curveVertex(width, height);
//   endShape(CLOSE);
// }

// function setGradient(
//   x: number,
//   y: number,
//   w: number,
//   h: number,
//   c1: Color,
//   c2: Color,
//   axis: number
// ): void {
//   noFill();

//   if (axis === Y_AXIS) {
//     // Top to bottom gradient
//     for (let i = y; i <= y + h; i++) {
//       const inter = map(i, y, y + h, 0, 1);
//       const c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(x, i, x + w, i);
//     }
//   } else if (axis === X_AXIS) {
//     // Left to right gradient
//     for (let i = x; i <= x + w; i++) {
//       const inter = map(i, x, x + w, 0, 1);
//       const c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(i, y, i, y + h);
//     }
//   }
// }

// export function setup(): void {
//   width = windowWidth;
//   height = windowHeight;
//   createCanvas(width, height);
//   background(1);
//   colorMode(HSB, 255);
//   // Init colors
//   // blue = color(map(228, 0, 360, 0, 255), 150, map(20, 0, 40, 0, 255));
//   // purple = color(map(248, 0, 360, 0, 255), 150, map(20, 0, 100, 0, 255));
//   // black_blue = color(map(228, 0, 360, 0, 255), 255, 0);
//   // orange = color(map(20, 0, 360, 0, 255), 255, map(48, 0, 100, 0, 255));
//   // // black_orange = color(map(20, 0, 360, 0, 255), 255, 0);
//   // redish = color(0, 255, map(53, 0, 100, 0, 255));

//   const c1 = color(map(random(255), 0, 360, 0, 255), 150, random(150, 200));
//   const c2 = color(map(random(255), 0, 360, 0, 255), 150, random(200, 255));

//   colorMode(RGB, 255);
//   setGradient(0, 0, width, height / 2 + 100, c1, c2, Y_AXIS);
//   // setGradient(0, height / 2, width, height / 2, orange, black_orange, Y_AXIS);

//   // Draw stars
//   const starCount = 3000;
//   for (let i = 0; i < starCount; i++) {
//     stroke(255, 255, 255, random(180));
//     point(random(width), random(height));
//   }

//   // Draw suns
//   noStroke();
//   colorMode(HSB, 255);
//   const sunCount = random([1, 2, 3, 4, 5]);
//   const center = { x: width / 2, y: height / 2 };
//   const xDelta = 200;
//   const yDelta = 20;
//   for (let i = 0; i < sunCount; i++) {
//     fill(color(random(255), random(100, 200), random(150, 255), 175));
//     circle(
//       random(center.x - xDelta, center.x + xDelta),
//       random(center.y - yDelta * 16, center.y + yDelta),
//       random(10, 50)
//     );
//   }

//   // Draw dunes
//   const lineCount = 4;
//   const pointCount = 150;
//   colorMode(HSB, 255);
//   const hue = random(100, 255);
//   for (let i = 0; i < lineCount; i++) {
//     const line = new Array(pointCount);
//     for (let j = 0; j < pointCount; j++)
//       line[j] = {
//         x: (j * width) / pointCount,
//         y: 50 + i * 10 + random(10) + height / 2
//       };

//     noStroke();
//     fill(
//       color(hue, random(100, 255), map(80 - i * 7, 0, 100, 0, 255), 255 - i * 5)
//     );
//     drawGround(line);
//   }

//   // Frame picture
//   // frame(700);
// }

// export function draw(): void {}

// // function frame(radius) {
// //   colorMode(RGB, 255);
// //   // The shape
// //   const disc = createGraphics(width, height);
// //   disc.noStroke();
// //   disc.fill(color(255, 255, 255));
// //   disc.rect(0, 0, width, height);

// //   // The image of the shape, ready for punching
// //   const img = disc.get();

// //   // The punch
// //   const punch = createGraphics(width, height);
// //   punch.noStroke();
// //   // punch.fill(0);
// //   punch.circle(width / 2, height / 2 - 50, radius);

// //   // Punch it!
// //   img.punchOut(punch);

// //   // Tada!
// //   image(img, 0, 0);
// // }
