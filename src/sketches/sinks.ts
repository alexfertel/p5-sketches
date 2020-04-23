interface Circle {
  center: Vector2D;
  radius: number;
}

class SinksSketch implements ISketch, ICanvasMapper {
  public lineSize = 100;
  public stepSize = 50;
  public sinks: Circle[] = [];

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    // const c = color(map(214, 0, 360, 0, 255), 255, map(30, 0, 100, 0, 255));
    // background(c);
    
    background(255);
    // stroke(255);
    noFill();
    
    // for(let i = 0; i < 5; i++)
    //   this.sinks.push({ center: new Vector2D(random(width), random(height)), radius: random(50, 100) });
    // this.sinks.push({ center: new Vector2D(width / 2, height / 2), radius: random(50, 200) });

    this.render(10000);
  }

  render(pointCount: number): void {
    while (pointCount > 0) {
      const p = new Vector2D(random(width), random(height));

      this.drawLine(p);

      pointCount--;
    }
  }

  drawLine(point: Vector2D): void {
    let stepCount = this.lineSize / this.stepSize;
    
    colorMode(RGB, 255, 255, 255, 100);
    const c1 = {r: 255, g: 0, b: 0};
    const c2 = {r: 0, g: 0, b: 255};

  
    beginShape();
    curveVertex(point.x, point.y);
    while (stepCount > 0) {
      // const r = map(stepCount, this.lineSize / this.stepSize, 0, c1.r, c2.r);
      // const g = map(stepCount, this.lineSize / this.stepSize, 0, c1.g, c2.g);
      // const b = map(stepCount, this.lineSize / this.stepSize, 0, c1.b, c2.b);
      const r = map(stepCount, this.lineSize / this.stepSize, 0, 0, c2.r);
      const g = map(stepCount, this.lineSize / this.stepSize, 0, 0, c2.g);
      const b = map(stepCount, this.lineSize / this.stepSize, 0, 0, c2.b);
      const c = color(r, g, b);
      stroke(c);
      // stroke(color(0,0,map(stepCount, 0, this.lineSize, )));
      const value = this.getValue(point);

      curveVertex(point.x, point.y);

      const xStep = this.stepSize * cos(value);
      const yStep = this.stepSize * sin(value);
      point.x += xStep;
      point.y += yStep;
      stepCount--;
    }
    curveVertex(point.x, point.y);
    endShape();
  }

  getValue(point: Vector2D): number {
    for(let i = 0; i < this.sinks.length; i++){
      if(insideCircleBounds(point, this.sinks[i])){
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
