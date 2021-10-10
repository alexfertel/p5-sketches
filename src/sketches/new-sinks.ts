interface Circle {
  center: Vector2D;
  radius: number;
}

const collide = (c1: Circle, c2: Circle): boolean => {
  const distX = c1.center.x - c2.center.x;
  const distY = c1.center.y - c2.center.y;
  const distance = sqrt(distX * distX + distY * distY);

  return distance <= c1.radius + c2.radius;
};

// const palette = chroma.scale(Reds).padding([0.3, 0]);
const palette = chroma.scale(YlOrRd);

class NewSinksSketch implements ISketch, ICanvasMapper<number> {
  lineSize = 50;
  padding = this.lineSize - 20;
  stepSize = 1;
  sinks: Circle[] = [];

  setup(): void {
    createCanvas(1000, 1000);
    pixelDensity(5);
    colorMode(HSB);
    strokeWeight(1);
    // angleMode(mode)
    // const c = color(map(214, 0, 360, 0, 255), 255, map(30, 0, 100, 0, 255));
    // background(c);

    // const c = chroma("#3D0000").hex();
    // const c = chroma("white").hex();
    const c = chroma("#F9F3DF").hex();

    background(c);
    // stroke(255);
    noFill();

    for (let i = 0; i < 100; i++) {
      const center = new Vector2D(random(width), random(height));
      const radius = random(20, 50);
      const circle = {
        center,
        radius,
      };

      if (!this.sinks.some((sink) => collide(circle, sink)))
        this.sinks.push(circle);
    }
    // this.sinks.push({
    //   center: new Vector2D(width / 2, height / 2),
    //   radius: random(50, 200),
    // });

    this.render(70000);
  }

  render(pointCount: number): void {
    while (pointCount > 0) {
      const p = new Vector2D(
        random(-this.padding, width + this.padding),
        random(-this.padding, height + this.padding)
      );

      push();
      this.drawLine(p, this.lineSize);
      pop();

      pointCount--;
    }
  }

  drawLine(point: Vector2D, length: number): void {
    // const hue = map(point.x * sin(point.x), -point.x, point.x, 130, 180);

    // const c = color(hue, 180, 255);

    translate(point.x, point.y);
    let cur = Vector2D.fromVector(point);
    const angle = this.getValue(cur);
    let nxt = new Vector2D(
      cur.x + this.stepSize * cos(angle),
      cur.y + this.stepSize * sin(angle)
    );

    for (let i = 0; i < length; i++) {
      stroke(
        chroma(palette(map(i, 0, length, 0, 1)))
          .alpha(0.2)
          .hex()
      );
      // stroke("white");
      line(cur.x, cur.y, nxt.x, nxt.y);
      cur = Vector2D.fromVector(nxt);
      const angle = this.getValue(cur);
      nxt = new Vector2D(
        cur.x + this.stepSize * cos(angle),
        cur.y + this.stepSize * sin(angle)
      );

      // console.log(cur, angle, nxt);
      // line(0, 0, 15, 0);
      // translate(15, 0);
      // rotate(angle);
    }

    // beginShape();
    // while (length > 0) {
    //   const value = this.getValue(point);

    //   curveVertex(point.x, point.y);

    //   const xStep = this.stepSize * cos(value);
    //   const yStep = this.stepSize * sin(value);
    //   point.x += xStep;
    //   point.y += yStep;
    //   length--;
    // }
    // endShape();
  }

  getValue(point: Vector2D): number {
    for (let i = 0; i < this.sinks.length; i++) {
      // if (insideCircleBounds(point, this.sinks[i]) && random() <= 0.8) {
      if (insideCircleBounds(point, this.sinks[i])) {
        const polar = cartesianToPolar(point.sub(this.sinks[i].center));
        return polar.angle - TAU / 4;
      }
    }

    const scaledX = point.x * 0.005;
    const scaledY = point.y * 0.005;
    const noiseValue = noise(scaledX, scaledY);
    const angle = map(noiseValue, 0.0, 1.0, 0.0, TAU);

    return angle;
  }

  draw(): void {}
}
