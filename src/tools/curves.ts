const insideCircleBounds = (point: Vector2D, circle: Circle): boolean =>
  dist(point.x, point.y, circle.center.x, circle.center.y) < circle.radius;

const drawSpiral = (
  x: number,
  y: number,
  radius: number,
  velocity: number,
  angularVelocity: number,
  r = 0,
  angle = 0
): void => {
  const av = map(angularVelocity, 0, 1, 0, PI * 2);
  beginShape();
  while (r < radius) {
    const point = polarToCartesian(new PolarPoint(r, angle));
    curveVertex(x + point.x, y + point.y);
    angle += av;
    r += velocity;
  }
  endShape();
};

const drawArc = (
  x: number,
  y: number,
  r: number,
  theta: number,
  alpha: number,
  length: number,
  strokeSetter: (i: number) => void = (): void => {}
): void => {
  push();
  translate(x, y);
  rotate(theta);
  for (let i = 0; i < length; i += alpha) {
    strokeSetter(i);
    const rx = r * cos(i);
    const ry = r * sin(i);
    line(rx, ry, rx + alpha, ry);
  }
  pop();
};

const drawArcWithCustomPen = (
  x: number,
  y: number,
  r: number,
  theta: number,
  alpha: number,
  length: number,
  pen: () => void
): void => {
  beginShape();
  while (length > 0) {
    const point = polarToCartesian(new PolarPoint(r, theta));
    pen();
    theta += alpha;
    length--;
  }
  endShape();
};

const drawDisc = (center: Vector2D, lineCount: number): void => {
  for (let i = 0; i < lineCount; i++) {
    const theta = random(PI * 2);
    const alpha = 0.01;
    const radius = random(lineCount * 2);
    const length = random(degrees(PI * 2));
    drawArc(center.x, center.y, radius, theta, alpha, length);
  }
};

class Ellipse {
  constructor(
    public origin: Vector2D,
    public width: number,
    public height: number
  ) {}
}
