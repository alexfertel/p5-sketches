class BalloonSketch implements ISketch {
  setup = (): void => {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    colorMode(HSB);

    const c = color("#fdd998");
    background(c);

    const origin = new Vector2D(width / 2, height / 2 + 350);
    strokeWeight(1);

    this.drawBalloonWires(origin);
  };

  drawBalloonWires(origin: Vector2D): void {
    for (let i = 0; i < 25; i++) {
      const length = random(450, 650);
      const angle = 270 - random(-45, 45);
      const weight = random(5, 25);
      drawSineLine(origin, angle, length, weight, () => {
        stroke(0, 0, 0, 0.1);
      });

      const newOrigin = new Vector2D(
        origin.x + (length + 10) * cos(angle) + sin(length + 10) * weight,
        origin.y + (length + 10) * sin(angle)
      );

      const radius = random(50, 100);
      const strokeSet = ():void => {
        const hue = random(360);
        stroke(hue, 80, 75, 100);
      };
      if (random() < 0.3) drawRingedPlanet(newOrigin, radius, strokeSet);
      else drawRegularPlanet(newOrigin, radius, strokeSet);

      this.drawDust(newOrigin, radius, 1000, strokeSet);
    }
  }

  drawDust(
    origin: Vector2D,
    radius: number,
    density: number,
    strokeSetter: () => void = (): void => {}
  ): void {
    push();
    translate(origin.x, origin.y);
    strokeSetter();
    const angularVelocity = 1;
    const angle = 0;
    for (let i = 0; i < density; i++) {
      const x = random(radius) * cos(angle);
      const y = random(radius) * sin(angle);
      point(x, y);
      angle += angularVelocity;
    }
    pop();
  }

  drawWire(origin: Vector2D, length: number, angle: number): void {
    push();
    translate(origin.x, origin.y);
    rotate(270 - angle);
    line(0, 0, length, 0);
    pop();
  }

  draw = (): void => {};
}
