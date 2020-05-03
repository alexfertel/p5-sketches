const insideCircleBounds = (point: Vector2D, circle: Circle): boolean =>
  dist(point.x, point.y, circle.center.x, circle.center.y) < circle.radius;

const drawSpiral = (
  x: number,
  y: number,
  startAngle: number,
  startRadius: number,
  length: number,
  angularVelocity: number,
  strokeSetter: (i: number) => void = (): void => {}
): void => {
  push();
  translate(x, y);
  rotate(startAngle);
  translate(startRadius, 0)
  const velocity = length / 360;
  let radius = 0;  
  for (let i = 0; i < 360; i++) {
    strokeSetter(i);
    const rx = radius * cos(angularVelocity * i);
    const ry = radius * sin(angularVelocity * i);
    line(rx, ry, rx + velocity, ry + velocity);
    radius += velocity;
  }
  pop();
};

const drawArc = (
  x: number,
  y: number,
  r: number,
  startAngle: number,
  alpha: number,
  length: number,
  strokeSetter: (i: number) => void = (): void => {}
): void => {
  push();
  translate(x, y);
  rotate(startAngle);
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
    const startAngle = random(360);
    const radius = random(lineCount * 2);
    const alpha = map(radius, 0, lineCount * 2, 1, 0.1);
    const length = random(360);
    drawArc(center.x, center.y, radius, startAngle, alpha, length, strokeSetter);
  }
};

class Ellipse {
  constructor(
    public origin: Vector2D,
    public width: number,
    public height: number
  ) {}
}
