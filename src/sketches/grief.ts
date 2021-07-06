class GriefSketch implements ISketch {
  setup = (): void => {
    init();
    background("#151515");
    // randomSeed(7);
    const origin = Vector2D.center();

    translate(origin.x, origin.y);

    const sides = 6;
    const angle = 360 / sides;
    const radius = 200;
    const points = [];
    for (let i = 0; i <= sides; i++) {
      const x = radius * cos(angle * i);
      const y = radius * sin(angle * i);
      const point = createVector(x, y);

      points.push(point);
    }

    const yellow = chroma("yellow").alpha(0.005);

    noStroke();
    fill(yellow.hex());
    scale(0.1);
    for (let i = 0; i < 100; i++) {
      translate(random(-25, 25), random(-25, 25));
      drawWaterColor(points, 3);
    }
  };
}
