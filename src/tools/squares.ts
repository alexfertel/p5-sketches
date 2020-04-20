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
