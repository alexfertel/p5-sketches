class NetworkSketch implements ISketch {
  setup(): void {
    init();
    noFill();
    background(0)

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
      drawPoints(paths[i], brewerStokeSetter(paths[i], chroma.scale(Blues)));
    }
  }
  draw(): void {}
}
