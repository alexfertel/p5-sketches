class Trigonometry implements ISketch {
  setup = (): void => {
    init();
    background(0);
    const origin = Vector2D.center();
    translate(origin.x, origin.y);

    noFill();
    for (let i = 1; i < 200; i += random(3, 4)) {
      strokeWeight(random(1, 2));
      const sc = chroma.scale([chroma("white"), "black"]).domain([0, 360]).padding([random(0, 1),0]);
      drawArc(0, 0, i, random(-3, 5), 0.3, 350, j => {
        stroke(sc(j).hex());
      });
    }
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
