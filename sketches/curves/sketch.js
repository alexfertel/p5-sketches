///<reference path="../../p5.global-mode.d.ts" />
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(150);
  stroke(0);
  arc(35, 35, 50, 50, 0, PI / 2.0); // lower quarter circle
  arc(105, 35, 50, 50, -PI, 0, CHORD); // upper half of circle
  arc(175, 35, 50, 50, -PI / 6, PI / 6, PIE); // 60 degrees
  noFill();
  arc(105, 105, 100, 50, PI / 2, (3 * PI) / 2, OPEN); // 180 degrees
}
