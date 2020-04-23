class StarFieldSketch extends SinksSketch {
  public lineSize = 100;
  public stepSize = 10;

  render(pointCount: number): void {
    let test = 2000;
    while (test > 0) {
      const p = new Vector2D(random(width), random(height));

      this.drawPenLike(p);

      test--;
    }
  }

  drawPenLike(point: Vector2D): void {
    // const hue = 0;
    // const c = color(hue, 180, 255);
    stroke(0);

    const points = [Vector2D.fromVector(point)];
    // beginShape();

    let steps = this.lineSize / this.stepSize;
    while (steps > 0) {
      const value = this.getValue(point);

      //   curveVertex(point.x, point.y);

      const xStep = this.stepSize * cos(value);
      const yStep = this.stepSize * sin(value);
      point.x += xStep;
      point.y += yStep;

      points.push(Vector2D.fromVector(point));
      steps--;
    }
    // endShape();

    for (let i = 0; i < points.length - 1; i++) {
      this.drawCustomLine(points[i], points[i + 1], 2);
    }
    // this.drawCustomLine(points[0], points[points.length - 1], 3);
  }


  drawCustomLine(start: Vector2D, end: Vector2D, weight: number): void {
    if (dist(start.x, start.y, end.x, end.y) < weight)
      line(start.x, start.y, end.x, end.y);

    for (let i = 0; i < weight; i++) {
      const lineStart = new Vector2D(
        weight * cos(random(TWO_PI)),
        weight * sin(random(TWO_PI))
      );
      const lineEnd = new Vector2D(
        weight * cos(random(TWO_PI)),
        weight * sin(random(TWO_PI))
      );

      line(
        start.x + lineStart.x,
        start.y + lineStart.y,
        end.x + lineEnd.x,
        end.y + lineEnd.y
      );
    }
  }

    getValue(point: Vector2D): number {
      const scaledX = point.x * 0.001;
      const scaledY = point.y * 0.001;
      const noiseValue = noise(scaledX, scaledY);
      const angle = map(noiseValue, 0.0, 1.0, 0.0, PI * 2.0);

      return angle;
    }
}
