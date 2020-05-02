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

const drawPolygon = (
  vectors: Vector2D[] | p5.Vector[],
  strokeSetter: (i: number) => void = (i): void => {},
  close = false
): void => {
  const points = [...vectors];
  if (close) {
    points.push(points[0]);
  }
  for (let i = 0; i < points.length - 1; i++) {
    strokeSetter(i);
    line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
};

const drawVertices = (vectors: p5.Vector[], close = false): void => {
  beginShape();
  for (let i = 0; i < vectors.length; i++) {
    vertex(vectors[i].x, vectors[i].y);
  }
  endShape(close ? CLOSE : null);
};

const drawPoints = (
  points: Vector2D[] | p5.Vector[],
  strokeSetter: (i: number) => void = (i): void => {}
): void => {
  for (let i = 0; i < points.length; i++) {
    strokeSetter(i);
    point(points[i].x, points[i].y);
  }
};

// Two-point form
// y - y1 = ((y2 - y1) / (x2 - x1)) * (x - x1)
const getLineEquation = (
  p1: Vector2D | p5.Vector,
  p2: Vector2D | p5.Vector
): ((x: number) => number) => (x: number): number =>
  ((p2.y - p1.y) / (p2.x - p1.x)) * (x - p1.x) + p1.y;

const uneaseLine = (p1: p5.Vector, p2: p5.Vector, weight = 0.75): p5.Vector => {
  const x = (p1.x + p2.x) / 2;
  const y = (p1.y + p2.y) / 2;
  const angle =
    p1.heading() + p1.angleBetween(p2) / 2 + randomGaussian(0, 1) * 90;
  const linePoint = createVector(x, y);
  const scale = dist(p1.x, p1.y, p2.x, p2.y) / (2.5 * weight);

  const length = randomGaussian(0, 1) * scale;
  const newPoint = createVector(length, 0);

  newPoint.rotate(angle);
  newPoint.add(linePoint);
  return newPoint;
};

const uneasePolygon = (
  points: p5.Vector[],
  times = 1,
  weights: number[] = points.map(() => 0.75),
  close = true
): p5.Vector[] => {
  if (times < 1) return points;

  const newPoints: p5.Vector[] = [];
  const newWeights: number[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    const newPoint = uneaseLine(p1, p2, weights[i]);
    newPoints.push(p1, newPoint);
    newWeights.push(weights[i], weights[i]);
  }
  if (close) {
    const newPoint = uneaseLine(
      points[points.length - 1],
      points[0],
      weights[points.length - 1]
    );
    newPoints.push(points[points.length - 1], newPoint);
    newWeights.push(weights[points.length - 1], weights[points.length - 1]);
  }

  return uneasePolygon(newPoints, times - 1, weights);
};

const drawWaterColor = (
  basePolygon: p5.Vector[],
  layerCount: number,
  weights: number[] = undefined
): void => {
  const startingPoints = uneasePolygon(basePolygon, 3, weights);
  for (let i = 0; i < layerCount; i++) {
    const points = uneasePolygon(startingPoints, 3, weights);
    drawVertices(points, true);
  }
};
