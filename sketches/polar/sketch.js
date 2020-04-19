///<reference path="../../p5.global-mode.d.ts" />

let width, height;

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  colorMode(HSL, 255);

  let c = color(map(214, 0, 360, 0, 255), 255, map(30, 0, 100, 0, 255));
  background(c);

  // makeSink(width / 2, height / 2, 100, grid);

  noFill();

  // let discCount = 10;
  // for (let i = 0; i < discCount; i++) {
  //   let center = { x: random(width), y: random(height) };
  //   stroke(random(255), random(100, 255), random(150, 200))
  //   drawDisc(center, random(100));
  // }
  // stroke(255)

  stroke(255);
  let center = { x: width / 2, y: height / 2 };
  drawDisc(center, random(50, 200));

  frame(750);
}

function draw() {}

function drawSpiral(x, y, radius, velocity, angularVelocity, r = 0, angle = 0) {
  let av = map(angularVelocity, 0, 1, 0, PI * 2);
  beginShape();
  while (r < radius) {
    let point = polarToCartesian(r, angle);
    curveVertex(x + point.x, y + point.y);
    angle += av;
    r += velocity;
  }
  endShape();
}

function drawArc(x, y, r, theta, alpha, length) {
  beginShape();
  while (length > 0) {
    let point = polarToCartesian(r, theta);
    curveVertex(x + point.x, y + point.y);
    theta += alpha;
    length--;
  }
  endShape();
}

function drawDisc(center, lineCount) {
  for (let i = 0; i < lineCount; i++) {
    let theta = random(PI * 2);
    // let alpha = random(0, PI / 20);
    let radius = random(lineCount * 2);
    let length = random(degrees(PI * 2));
    drawArc(center.x, center.y, radius, theta, 0.01, length);
  }
}

function polarToCartesian(r, angle) {
  return { x: r * cos(angle), y: r * sin(angle) };
}

function cartesianToPolar(x, y) {
  return { angle: atan2(y, x), r: sqrt(x * x + y * y) };
}

// function insideCircleBounds(x, y, cx, cy, r) {
//   return dist(x, y, cx, cy) < r;
// }

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

p5.Image.prototype.punchOut = function(p5Image) {
  if (p5Image === undefined) {
    p5Image = this;
  }
  let currBlend = this.drawingContext.globalCompositeOperation;

  let scaleFactor = 1;
  // if (p5Image instanceof p5.Graphics) {
  //   scaleFactor = p5Image._pInst._pixelDensity;
  // }

  let copyArgs = [
    p5Image,
    0,
    0,
    scaleFactor * p5Image.width,
    scaleFactor * p5Image.height,
    0,
    0,
    this.width,
    this.height
  ];

  this.drawingContext.globalCompositeOperation = "destination-out";
  this.copy.apply(this, copyArgs);
  this.drawingContext.globalCompositeOperation = currBlend;
};

function frame(radius) {
  colorMode(RGB, 255);
  // The shape
  let disc = createGraphics(width, height);
  disc.noStroke();
  disc.fill(color(255, 255, 255));
  disc.rect(0, 0, width, height);

  // The image of the shape, ready for punching
  let img = disc.get();

  // The punch
  let punch = createGraphics(width, height);
  punch.noStroke();
  // punch.fill(0);
  punch.circle(width / 2, height / 2, radius);

  // Punch it!
  img.punchOut(punch);

  // Tada!
  image(img, 0, 0);
}
