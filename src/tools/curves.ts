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

const drawDisc = (
  center: Vector2D,
  lineCount: number,
  strokeSetter: (i: number) => void = (): void => {}
): void => {
  for (let i = 0; i < lineCount; i++) {
    const theta = random(360);
    const radius = random(lineCount * 2);
    const alpha = map(radius, 0, lineCount * 2, 1, .1);
    const length = random(360);
    drawArc(center.x, center.y, radius, theta, alpha, length, strokeSetter);
  }
};

class Ellipse {
  constructor(
    public origin: Vector2D,
    public width: number,
    public height: number
  ) {}
}
