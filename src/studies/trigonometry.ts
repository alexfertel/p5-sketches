class Trigonometry implements ISketch {
  setup = (): void => {
    init();
    background(255);
    const origin = Vector2D.center();
    translate(origin.x, origin.y);

    noFill();
    const circleCount = 6;
    const minRadius = 100;
    for (let i = 0; i < circleCount; i++) {
        const radius = (minRadius + i * 25) * 2
        circle(0, 0, radius);
    
        push()
        strokeWeight(4);
        // const sc = chroma.scale([chroma("white"), "black"]).domain([0, 360]).padding([random(0, 1),0]);
        drawArc(0, 0, radius / 2, random(360), 0.3, 50 + 25 * i, j => {
        //   stroke(sc(j).hex());
        })  
        pop()
    
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
