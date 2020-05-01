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
  if(close) {
    points.push(points[0]);
  }
  for (let i = 0; i < points.length - 1; i++) {
    strokeSetter(i);
    line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
};

const drawVertices = (
  vectors: p5.Vector[],
  close = false
): void => {
  beginShape();
  for (let i = 0; i < vectors.length - 1; i++) {
    vertex(vectors[i].x, vectors[i].y)
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

const uneaseLine = (p1: p5.Vector, p2: p5.Vector, maxLength = 40): p5.Vector => {
  // const middle = (p2.x + p1.x) / 2;
  const x = random(
    p1.x,
    p2.x
  );
  const length = random(maxLength);
  const equation = getLineEquation(p1, p2);
  const y = equation(x);
  const angle = p1.heading() + p1.angleBetween(p2) / 2;
  const linePoint = createVector(x, y);
  const newPoint = createVector(length, 0);

  newPoint.rotate(angle);
  newPoint.add(linePoint);
  return newPoint;
};

const uneasePolygon = (points: p5.Vector[], times: number): p5.Vector[] => {
  if (times < 1) return points;

  const newPoints: p5.Vector[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    const newPoint = uneaseLine(p1, p2);
    newPoints.push(p1, newPoint);
  }

  return uneasePolygon(newPoints, times - 1);
};
