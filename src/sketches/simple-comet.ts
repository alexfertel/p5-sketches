class SimpleCometSketch implements ISketch {
  bgColor = chroma("#142850").hex();
  cometStrokeColor = chroma("#fff3cd").hex();

  setup(): void {
    init();
    background(this.bgColor);
    stroke(this.cometStrokeColor);

    const cometCount = 10;
    const startAngle = random(180, 230);
    for (let i = 0; i < cometCount; i++)
      this.drawGoldenComet(
        Vector2D.random(),
        random(3, 7),
        random(10, 20),
        random(45, 85),
        startAngle,
        random(2, 8)
      );

      drawNoise(new Vector2D(0, 0), new Vector2D(width, height), 1, () => {
        if(random() < 0.005) stroke(255, map(random(), 0, 1, 0, 0.4));
        else stroke(255, 0);
      });
    }

  drawGoldenComet = (
    origin: Vector2D,
    circleRadius = 10,
    lineCount = 10,
    tailAngle = 85,
    startAngle = 200,
    segmentsPerLineBase = 3
  ): void => {
    push();
    noFill();
    translate(origin.x, origin.y);

    const lines: Point[][] = [];
    const angularVelocity = tailAngle / lineCount;
    push();
    rotate(startAngle);
    const sc = chroma.scale(RdYlBu).padding([map(origin.x + origin.y, width + height, 0, 0, 0.5), 0]);

    for (let i = 0; i < lineCount; i++) {
      const segmentsPerLine = random(
        segmentsPerLineBase,
        segmentsPerLineBase + min(i, lineCount - i)
      );
      push();
      rotate(angularVelocity * i);
      const tail: Point[] = [];
      translate(circleRadius * 2, 0);
      let distance = 0;
      for (let j = 0; j < segmentsPerLine; j++) {
        const segmentLength = random(5, 30);
        // const sc = chroma.scale(["gold", 'white']).padding(0.1);
        // const sc = chroma.scale(["gold", chroma("gold").brighten()]);

        const offset = map(
          distance,
          0,
          30 * (segmentsPerLineBase + lineCount / 2),
          0,
          1
        );
        console.log(offset);
        const representation = sc(offset)
          .hsl()
          .map(value => value || 0);

        const c = color(
          representation[0],
          representation[1],
          representation[2],
          representation[3]
        );

        stroke(c);
        line(0, 0, segmentLength, 0);
        const delta = segmentLength + random(7, 12);
        translate(delta, 0);
        distance += delta;
      }
      lines.push(tail);
      pop();
    }
    pop();

    const displacementAngle = startAngle + (angularVelocity * lineCount) / 2;
    rotate(displacementAngle);
    translate((circleRadius * 3) / 2, 0);
    fill(this.bgColor);
    circle(0, 0, circleRadius * 2);
    pop();
  };

  draw(): void {}
}
