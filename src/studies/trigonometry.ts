class Trigonometry implements ISketch {
  setup = (): void => {
    init();
    const backgroundColor = chroma("#222831");
    background(chroma("#222831").hex());
    // background(0);
    const origin = Vector2D.center();
    translate(origin.x, origin.y);

    const length = 100;
    noFill();
    strokeWeight(2);
    const glowColor = chroma("fcf7bb");
    const sc = chroma
      .scale([glowColor, backgroundColor])
      .classes(5)
      .mode("lab");

    const strokeSetter = (j: number): void => {
      stroke(sc(j / length).hex());
    };
    // drawArc(0, 0, 200, 0, 0.1, length, strokeSetter);

    const spiralCount = 50;
    const angularVelocity = 360 / spiralCount;
    for(let i = 0; i < spiralCount; i++)
        drawSpiral(0, 0, i * angularVelocity, 50, 1000, 1, strokeSetter);

    // noStroke();
    // fill(0);
    // circle(0, 0, 100);
  };

  drawBlind = (
    originX: number,
    originY: number,
    radius: number,
    lineCount: number,
    startAngle: number
  ): void => {
    push();
    translate(originX, originY);
    rotate(startAngle);
    const angularVelocity = 180 / lineCount;

    for (let i = 0; i < lineCount; i++) {
      const x = radius * cos(90 + angularVelocity * i);
      const y = radius * sin(90 + angularVelocity * i);

      line(x, y, -x, y);
    }
    pop();
  };
}
