interface Circle {
  center: Vector2D;
  radius: number;
}

class SinksSketch implements ISketch, ICanvasMapper {
  lineSize = 30;
  stepSize = 1;
  sinks: Circle[] = [];

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
    this.sinks.push({ center: new Vector2D(width / 2, height / 2), radius: random(50, 200) });

    this.render(20000);
  }

  render(pointCount: number): void {
    while (pointCount > 0) {
      const p = new Vector2D(random(width), random(height));

      this.drawLine(p, this.lineSize);

      pointCount--;
    }
  }

  drawLine(point: Vector2D, length: number): void {
    const hue = map(point.x * sin(point.x), -point.x, point.x, 130, 180);

    const c = color(hue, 180, 255);
    stroke(c);
  
    beginShape();
    while (length > 0) {
      const value = this.getValue(point);

      curveVertex(point.x, point.y);

      const xStep = this.stepSize * cos(value);
      const yStep = this.stepSize * sin(value);
      point.x += xStep;
      point.y += yStep;
      length--;
    }
    endShape();
  }

  getValue(point: Vector2D): number {
    for(let i = 0; i < this.sinks.length; i++){
      if(insideCircleBounds(point, this.sinks[i])){
        const polar = cartesianToPolar(point.sub(this.sinks[i].center));
        return polar.angle - PI / 2;
      }
    }

    const scaledX = point.x * 0.005;
    const scaledY = point.y * 0.005;
    const noiseValue = noise(scaledX, scaledY);
    const angle = map(noiseValue, 0.0, 1.0, 0.0, PI * 2.0);

    return angle;
  }

  draw(): void {}
}
