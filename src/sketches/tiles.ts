const dSquare = (x: number, y: number, s: number) => {
  push();
  translate(x, y);
  for (let i = 0; i < 50 * s; i++) point(random(0, s + 1), random(0, s + 1));
  pop();
};

const dTriangle = (x: number, y: number, s: number) => {
  push();
  translate(x, y);
  for (let i = 0; i < 50 * s; i++) {
    const px = random(0, s + 1);
    const py = random(0, s + 1);
    if (px + py < s) point(px, py);
  }
  pop();
};

class TilesSketch implements ISketch {
  setup = (): void => {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 1, 1, 1);
    angleMode(DEGREES);
    noFill();
    background(chroma("#F8FAFC").hsv());

    const grays = chroma.scale(["#F9FAFB", "#9CA3AF"]).colors(10);
    const squareWidth = 50;
    const padding = 10;
    const rows = height / squareWidth;
    const columns = width / squareWidth;

    translate(
      (width - (columns - 1) * squareWidth) / 2 - padding,
      (height - (rows - 1) * squareWidth) / 2 - padding
    );

    let placedRose = false;
    let placedBlue = false;
    for (let i = 0; i < columns - 1; i++) {
      for (let j = 0; j < rows - 1; j++) {
        if (random() < 0.55) {
          const dFn = random() < 0.5 ? dSquare : dTriangle;
          stroke(random(grays));

          const nearMiddle = i > columns / 3 && j > rows / 3;
          if (!placedRose && nearMiddle && random() < 0.05) {
            stroke("#F43F5E");
            placedRose = true;
          }
          if (!placedBlue && nearMiddle && random() < 0.05) {
            stroke("#0EA5E9");
            placedBlue = true;
          }
          dFn(i * squareWidth, j * squareWidth, squareWidth - padding);
        }
      }
    }
  };
}
