const drawSineLine = (
  origin: Vector2D,
  angle: number,
  length: number,
  weight: number,
  strokeSetter: () => void = (): void => {}
): void => {
  push();
  angleMode(DEGREES);
  noFill();
  translate(origin.x, origin.y);
  rotate(angle);
  beginShape();
  strokeSetter();
  for (let i = 0; i < length; i++) {
    curveVertex(i, sin(i) * weight);
  }
  endShape();
  pop();
};
