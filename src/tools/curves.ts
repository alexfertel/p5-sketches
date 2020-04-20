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
    const point = polarToCartesian(r, angle);
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
  length: number
): void => {
  beginShape();
  while (length > 0) {
    const point = polarToCartesian(r, theta);
    curveVertex(x + point.x, y + point.y);
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
