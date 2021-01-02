class CurrentsSketch implements ISketch, ICanvasMapper<number> {
  public lineSize = 35;
  public stepSize = 2;
  public patchSize = 20;
  public blues = chroma
    .scale("Blues")
    .padding([0.45, 0.45])
    .colors(20, null)
    .map((c) => c.alpha(0.7).hex());
  public reds = chroma
    .scale(["#eeeded", "#ff9a8c"])
    .padding([0.65, 0])
    .mode("lch")
    .colors(20, null)
    .map((c) => c.alpha(0.7).hex());

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 1, 1, 1);
    noFill();
    background(chroma("#7ab6d9").hsv());

    strokeWeight(2);
    this.render(15000);
  }

  render(pointCount: number): void {
    const getIndex = (value: any): number =>
      (round(map(sin(value), -1, 1, 0, 19)) + 20) % 20;

    for (let i = 0; i < pointCount; i++) {
      const p = new Vector2D(
        random(-75, windowWidth + 75),
        random(-75, windowHeight + 75)
      );

      const index = p.x
        ? getIndex((p.x + p.y + random(-350, 350)) / 250)
        : // ? getIndex((p.x + p.y + random(-150, 150)) / 150)
          getIndex((p.x + p.y + 1) / 250);

      const colors = random() < 0.5 ? this.blues : this.reds;
      stroke(chroma(colors[index]).hsv());
      const patch = this.generatePatch(p);
      for (const line of patch) {
        drawPolygon(line);
      }

      pointCount--;
    }
  }

  generatePatch(point: Vector2D): Vector2D[][] {
    const patch: Vector2D[][] = [];

    for (let i = 0; i < this.patchSize; i++) {
      const displacedPoint = point.add(
        new Vector2D(random(-20, 20), random(-20, 20))
      );

      patch.push(this.generateLine(displacedPoint));
    }

    return patch;
  }

  generateLine(point: Vector2D): Vector2D[] {
    let stepCount = this.lineSize / this.stepSize;

    const points = [Vector2D.fromVector(point)];
    while (stepCount > 0) {
      const value = this.getValue(point);
      const xStep = this.stepSize * cos(value);
      const yStep = this.stepSize * sin(value);
      point.x += xStep;
      point.y += yStep;
      points.push(Vector2D.fromVector(point));
      stepCount--;
    }

    return points;
  }

  getValue(point: Vector2D): number {
    const scaledX = point.x * 0.001;
    const scaledY = point.y * 0.001;
    const noiseValue = noise(scaledX, scaledY);
    const angle = map(noiseValue, 0.0, 1.0, 0.0, TWO_PI);

    return angle;
  }

  draw(): void {}
}
