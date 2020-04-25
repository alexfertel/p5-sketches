const drawAt = (origin: Vector2D, func: () => void): void => {
  push();
  translate(origin.x, origin.y);
  func();
  pop();
};

const drawRingArcs = (
  start: number,
  stop: number,
  width: number,
  height: number,
  strokeSetter: () => void
): void => {
  noFill();
  strokeSetter();
  arc(0, 0, width, height, start, stop);
};

const drawDust = (
  start: number,
  stop: number,
  width: number,
  height: number,
  widthSpacing: number,
  heightSpacing: number,
  density: number
): void => {
  const angularVelocity = (stop - start) / density;
  push();
  rotate(start);
  for (let i = density; i >= 0; i--) {
    const x = (width + random(widthSpacing)) * cos(angularVelocity * i);
    const y = (height + random(heightSpacing)) * sin(angularVelocity * i);
    const distance = dist(0, 0, x, y);
    const hue = map(distance, 0, windowHeight / 2 + windowWidth / 2, 410, 250);
    const alpha = map(distance, 0, windowHeight / 2 + windowWidth / 2, 100, 0);
    const saturation = widthSpacing === 0 ? 70 : 100;
    const c = color(hue % 360, saturation, alpha, alpha);
    if (widthSpacing === 0) strokeWeight(3);
    stroke(c);
    noFill();
    point(x, y);
  }

  pop();
};

const genDust = (
  count: number,
  width: number,
  height: number,
  angle: number,
  spacing: number,
  strokeSetter: () => void,
  starBodyDrawer: () => void
): void => {
  push();
  rotate(angle);

  strokeWeight(1);
  for (let i = 0; i < count; i++) {
    drawDust(
      0,
      180,
      width / 2,
      height / 2,
      spacing * i,
      (spacing / 20) * i,
      5000
    );
  }
  starBodyDrawer();
  for (let i = 0; i < count; i++) {
    drawDust(
      180,
      360,
      width / 2,
      height / 2,
      spacing * i,
      (spacing / 10) * i,
      5000
    );
  }
  pop();
};

const genRing = (
  count: number,
  width: number,
  height: number,
  angle: number,
  spacing: number,
  strokeSetter: () => void,
  starBodyDrawer: () => void
): void => {
  push();
  rotate(angle);
  for (let i = 0; i < count; i++) {
    drawRingArcs(
      0,
      180,
      width + (i + 1) * spacing,
      height + ((i + 1) * spacing) / 2,
      strokeSetter
    );
  }
  starBodyDrawer();
  for (let i = 0; i < count; i++) {
    drawRingArcs(
      180,
      360,
      width + (i + 1) * spacing,
      height + ((i + 1) * spacing) / 2,
      strokeSetter
    );
  }
  pop();
};
const drawDustedPlanet = (origin: Vector2D, radius: number): void => {
  drawAt(origin, () => {
    push();
    angleMode(DEGREES);
    const radius = random(50, 100);
    genDust(
      45,
      radius,
      20,
      random(130, 180),
      30,
      () => {
        push();
        noStroke();
        noFill();
        pop();
      },
      () => {
        push();
        fill(0, 0, 0);
        strokeWeight(3);
        stroke(50, 70, 100, 100);
        circle(0, 0, radius);
        pop();
      }
    );
    pop();
  });
};

const drawRegularPlanet = (
  origin: Vector2D,
  radius: number,
  strokeSetter: () => void = (): void => {}
): void => {
  drawAt(origin, () => {
    strokeSetter();
    circle(0, 0, radius);
  });
};

const drawRingedPlanet = (
  origin: Vector2D,
  radius: number,
  strokeSetter: () => void = (): void => {}
): void => {
  drawAt(origin, () => {
    push();
    angleMode(DEGREES);
    genRing(
      random(3, 7),
      random(radius * 2, radius * 2.5),
      random(radius * 2),
      random(360),
      10,
      strokeSetter,
      () => {
        fill(0, 0, 100);
        strokeSetter();
        circle(0, 0, radius);
      }
    );
    pop();
  });
};
