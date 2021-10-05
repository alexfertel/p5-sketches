class FadingSunSketch implements ISketch {
  setup(): void {
    init();
    background(0);

    const origin = Vector2D.center();

    // fill(0, 0.85);
    const diameter = 450;
    // circle(origin.x, origin.y, diameter);

    const lineCount = 8;
    const spacePerLine = diameter / 2 / lineCount;

    // stroke(255);
    // let weight = 1;
    // for (let i = 0; i < lineCount - 1; i++) {
    //     weight += i;
    //     strokeWeight(weight);
    //     line(0, height / 2 + spacePerLine * i, width, height / 2 + spacePerLine * i);
    // }

    // strokeWeight(50)
    // line(0, height / 2 + spacePerLine * lineCount - 16, width, height / 2 + spacePerLine * lineCount - 16);

    translate(origin.x, origin.y);
    const sides = 10;
    const angle = 360 / sides;
    const radius = 200;
    const points = [];
    for (let i = 0; i <= sides; i++) {
      const x = radius * cos(angle * i);
      const y = radius * sin(angle * i);
      const point = createVector(x, y);

      points.push(point);
    }

    const c1 = chroma("gold").alpha(0.01);
    noStroke();
    fill(c1.hex());
    drawWaterColor(
      points,
      100,
      points.map(() => random(0.5, 0.5))
    );
  }

  draw(): void {}
}
