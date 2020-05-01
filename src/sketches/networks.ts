class NetworkSketch implements ISketch {
  setup(): void {
    init();
    noFill();
    background(0);

    const pointCount = random(10, 50);

    // create vertices
    const points = [];
    for (let i = 0; i < pointCount; i++) {
      const p = new Vector2D(
        random(width),
        random(height / 4, (height * 3) / 4)
      );
      points.push(p);
    }
    // create paths
    const pathCount = random(1, 15);
    const paths: Vector2D[][] = [];
    for (let i = 0; i < pathCount; i++) {
      let pointsPerPath = floor(randomGaussian(10, 2));
      const iethPath = [];
      while (pointsPerPath--) iethPath.push(random(points));
      paths.push(chaikinsCurveSubdivision(iethPath, 3));

      strokeWeight(random(1, 5));
      drawPolygon(paths[i], brewerStokeSetter(paths[i], chroma.scale(Blues)));
    }
  }
  draw(): void {}
}

class RotatingNetworkSketch implements ISketch {
  setup(): void {
    init();
    randomSeed(101);
    noFill();
    background('#202040');

    const origin = Vector2D.center();
    translate(origin.x, origin.y);

    const tentacleCount = 1000;
    for (let i = 0; i < tentacleCount; i++) {
      const radius = 700;
      // const radius = random(100, 300);
      const start = random(0, 360);
      // const stop = random(start, start + random(100, 150));
      const stop = start;
      const steps = random(50, 55);
      const tentacle = this.generateTentacle(
        origin,
        radius,
        start,
        stop,
        steps
      );
      const chaikinTentacle = chaikinsCurveSubdivision(tentacle, 2);

      drawPolygon(
        chaikinTentacle,
        brewerStokeSetter(chaikinTentacle, chroma.scale(Blues).padding([0.3, 0]))
      );

    }
    // fill('#222831');
    // circle(0, 0, 300);
  }

  generateTentacle(
    origin: Vector2D,
    radius: number,
    start: number,
    stop: number,
    steps: number
  ): Vector2D[] {
    push();
    translate(origin.x, origin.y);

    const results = [];
    let angle = start;
    const angularVelocity = abs(stop - start) / steps;
    const growth = radius / steps;
    for (let i = 10; i < steps + 10; i++) {
      const hypotenuse = growth * i;
      const angleNoise = random(2);
      const point = new Vector2D(
        hypotenuse * cos(angle + angleNoise),
        hypotenuse * sin(angle + angleNoise)
      );
      results.push(point);
      angle += angularVelocity;
    }
    pop();
    return results;
  }
}
