class CometFieldSketch implements ISketch, ICanvasMapper<number> {
  public lineSize = 150;
  public stepSize = 3;
  public sinks: Circle[] = [];

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 1, 1, 1);
    noFill();
    background(0);

    for (let i = 0; i < 5; i++)
      this.sinks.push({
        center: new Vector2D(random(width), random(height)),
        radius: random(50, 100),
      });

    strokeWeight(3);
    this.render(5000);
  }

  render(pointCount: number): void {
    const sc = chroma.scale(random(sequential)).padding([0.2, 0.2]);
    while (pointCount > 0) {
      const p = new Vector2D(
        random(-150, width + 150),
        random(-150, height + 150)
      );

      const points = this.generateLine(p);
      drawPolygon(points, (i): void => {
        // const offset = i / points.length;
        // const offset =
        //   (map(
        //     points[0].y,
        //     0,
        //     height,
        //     0,
        //     16
        //   ) %
        //     4) /
        //   4;
        const offset = points[0].y / height;
        // strokeWeight(map(i, 0, points.length, 1, 3));
        const alphaOffset = i / points.length;
        const representation = sc(offset)
          .alpha(alphaOffset)
          .hsl()
          .map((value) => value || 0);

        const c = color(
          representation[0],
          representation[1],
          representation[2],
          representation[3]
        );
        stroke(c);
      });

      pointCount--;
    }
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
    for (let i = 0; i < this.sinks.length; i++) {
      if (insideCircleBounds(point, this.sinks[i])) {
        const polar = cartesianToPolar(point.sub(this.sinks[i].center));
        return polar.angle - PI / 2;
      }
    }

    const scaledX = point.x * 0.001;
    const scaledY = point.y * 0.001;
    const noiseValue = noise(scaledX, scaledY);
    const angle = map(noiseValue, 0.0, 1.0, 0.0, TWO_PI);

    return angle;
  }

  draw(): void {}
}
