const drawSquare = (point: Vector2D, side: number): void => {
  push();
  rectMode(CENTER);
  rect(point.x, point.y, side, side);
  rectMode(CORNER);
  pop();
};

const drawSquares = (
  point: Vector2D,
  side: number,
  step: number,
  minSize: number,
  direction: Vector2D
): void => {
  if (side < minSize) {
    drawSquare(point, minSize);
    return;
  }
  push();
  drawSquare(point, side);
  drawSquares(point.add(direction), side - step, step, minSize, direction);
  pop();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setup = (): void => {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 255);
  const c = color(map(214, 0, 360, 0, 255), 255, map(30, 0, 100, 0, 255));
  background(c);
  stroke(255);
  strokeWeight(2);
  noFill();

  const squareSide = width / 15;
  const rowCount = floor(height / squareSide) / 1.5;
  const columnCount = floor(width / squareSide) / 1.5;

  push();
  translate(width / 6 + squareSide / 2, height / 6 + squareSide / 2);
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      const point: Vector2D = new Vector2D(j * squareSide, i * squareSide);
      const side = squareSide;
      const step = side / 4;
      const minSize = 5;
      const direction: Vector2D = new Vector2D(
        random(-20, 20),
        random(-20, 20)
      ).scale(step / (side - minSize));

      drawSquares(point, side, step, minSize, direction);
    }
  }
  pop();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const draw = (): void => {};
