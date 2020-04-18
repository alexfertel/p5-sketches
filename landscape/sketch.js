///<reference path="../p5.global-mode.d.ts" />

const Y_AXIS = 1;
const X_AXIS = 2;
let radius = 800;
let width, height;
let blue, brown, redish;

// Extend p5.Image, adding the converse of "mask", naming it "punchOut":
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

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  background(1);
  colorMode(HSB, 255);
  // Init colors
  blue = color(map(228, 0, 360, 0, 255), 150, map(20, 0, 40, 0, 255));
  purple = color(map(248, 0, 360, 0, 255), 150, map(20, 0, 100, 0, 255));
  black_blue = color(map(228, 0, 360, 0, 255), 255, 0);
  orange = color(map(20, 0, 360, 0, 255), 255, map(48, 0, 100, 0, 255));
  // black_orange = color(map(20, 0, 360, 0, 255), 255, 0);
  redish = color(0, 255, map(53, 0, 100, 0, 255));

  c1 = color(map(random(255), 0, 360, 0, 255), 150, random(150,200));
  c2 = color(map(random(255), 0, 360, 0, 255), 150, random(200, 255));

  colorMode(RGB, 255);
  setGradient(0, 0, width, height / 2 + 100, c1, c2, Y_AXIS);
  // setGradient(0, height / 2, width, height / 2, orange, black_orange, Y_AXIS);

  // Draw stars
  let starCount = 3000;
  for (let i = 0; i < starCount; i++) {
    stroke(255, 255, 255, random(180));
    point(random(width), random(height));
  }

  // Draw suns
  noStroke();
  colorMode(HSB, 255);
  let sunCount = random([1, 2, 3, 4, 5]);
  let center = { x: width / 2, y: height / 2 };
  let xDelta = 200;
  let yDelta = 20;
  for (let i = 0; i < sunCount; i++) {
    fill(color(random(255), random(100, 200), random(150, 255), 175));
    circle(
      random(center.x - xDelta, center.x + xDelta),
      random(center.y - yDelta * 16, center.y + yDelta),
      random(10, 50)
    );
  }

  // Draw dunes
  let lineCount = 4;
  let pointCount = 150;
  colorMode(HSB, 255);
  let hue = random(100,255);
  for (let i = 0; i < lineCount; i++) {
    let line = new Array(pointCount);
    for (let j = 0; j < pointCount; j++)
      line[j] = {
        x: (j * width) / pointCount,
        y: 50 + i * 10 + random(10) + height / 2
      };

    noStroke();
    fill(color(hue, random(100, 255), map(80 - i * 7, 0, 100, 0, 255), 255 - i * 5));
    drawGround(line);
  }

  // Frame picture
  frame(700);
}

function draw() {}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

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
  punch.circle(width / 2, height / 2 - 50, radius);

  // Punch it!
  img.punchOut(punch);

  // Tada!
  image(img, 0, 0);
}

function drawGround(line) {
  beginShape();
  curveVertex(0, height);
  for (let i = 0; i < line.length; i++) {
    curveVertex(line[i]["x"], line[i]["y"]);
  }
  curveVertex(width, height);
  endShape(CLOSE);
}
