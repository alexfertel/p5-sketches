///<reference path="../p5.global-mode.d.ts" />
function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  noFill();
}

function draw() {
  background(0);
  for (let i = 0; i < 200; i += 20) {
    bezier(
      mouseX - i / 2.0,
      40 + i,
      410,
      20,
      440,
      300,
      240 - i / 16.0,
      300 + i / 8.0
    );
  }
}
