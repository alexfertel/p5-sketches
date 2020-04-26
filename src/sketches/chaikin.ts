const generateComet = (
  ellipse: Ellipse,
  start: number,
  angle: number,
  angularVelocity: number,
  noise: (i: number) => number
): Vector2D[] => {
  const points = [];
  const steps = angle / angularVelocity;
  for (let i = 0; i < steps; i++) {
    points.push(
      new Vector2D(
        ellipse.origin.x +
          (ellipse.width / 2) * cos(start + angularVelocity * i) +
          noise(steps - i),
        ellipse.origin.y +
          (ellipse.height / 2) * sin(start + angularVelocity * i) +
          noise(steps - i)
      )
    );
  }

  return points;
};

const drawComet = (comet: Vector2D[]): void => {
  const sc = chroma.scale("OrRd");

  drawPoints(comet, i => {
    const offset = i / comet.length;

    const representation = sc(offset)
      .alpha(offset)
      .hsl()
      .map(value => value || 0);

    const c = color(
      representation[0],
      representation[1],
      representation[2],
      representation[3]
    );
    stroke(c);
  });
};

class ChaikinSketch implements ISketch {
  setup = (): void => {
    init();
    noFill();
    colorMode(HSL, 360, 1, 1, 1);
    strokeWeight(2);

    const origin = Vector2D.center();
    const ellipseCount = 50;
    const cometsPerEllipse = 6;

    push();
    translate(origin.x, origin.y);
    rotate(-15);
    const ellipses: Ellipse[] = [];
    for (let i = ellipseCount; i > 0; i--) {
      const width = random(300, 600);
      const height = 200;
      const center = Vector2D.origin().add(new Vector2D(0, random(-100, 100)));
      const ellipse = new Ellipse(center, width, height);
      ellipses.push(ellipse);
    }

    for (let i = 0; i < ellipseCount; i++) {
      const angle = random(30, 40);
      const ellipse = ellipses[i];

      for (let i = 0; i < cometsPerEllipse; i++) {
        const comet = generateComet(
          ellipse,
          random(360),
          angle,
          1,
          (i): number => {
            return random(i * 0.1);
          }
        );

        const chaikinComet = chaikinsCurveSubdivision(comet, 3);

        drawComet(chaikinComet);
      }
    }
    pop();
  };

  draw = (): void => {};
}
