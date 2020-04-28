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

// const drawLine = (a: Vector2D, b: Vector2D, steps = 100): void => {
//   const stepSizeX = abs(b.x - a.x) / steps;
//   const stepSizeY = abs(b.y - a.y) / steps;

//   let currentX = a.x;
//   let currentY = a.y;
//   for (let i = 0; i < steps; i++) {
//     point(currentX, currentY);
    
//     currentX = lerp(a.x, b.x, stepSizeX * i);
//     currentY = lerp(a.y, b.y, stepSizeY * i);
//   }
// };

const drawPoints = (
  points: Vector2D[],
  strokeSetter: (i: number) => void = (i): void => {}
): void => {
  for (let i = 0; i < points.length - 1; i++) {
    strokeSetter(i);
    line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
};
