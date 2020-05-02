class Trigonometry implements ISketch {
  setup = (): void => {
    init();
    background(255);
    const origin = Vector2D.center();
    translate(origin.x, origin.y);

    strokeWeight(2);
    const sc = chroma
      .scale([chroma("white"), "black"])
      .domain([0, 360])
    drawDisc(Vector2D.origin(), 150, j => {
      stroke(sc(j).hex());
    });
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
