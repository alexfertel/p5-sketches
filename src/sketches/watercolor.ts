class WatercolorSketch implements ISketch {
  setup = (): void => {
    init();
    // randomSeed(7);
    const origin = Vector2D.center();

    translate(origin.x, origin.y);

    // Hexagon
    const sides = 10
    const angle = 360 / sides;
    const radius = 200;
    const points = [];
    for (let i = 0; i <= sides; i++) {
      const x = radius * cos(angle * i);
      const y = radius * sin(angle * i);
      const point = createVector(x, y);

      points.push(point);
    }


    noStroke();
    // drawVertices(startingPoints, true);
    for(let i = 0; i < 200; i++) {
      translate(200, 0);
      const c1 = chroma('blue').alpha(0.01)
      fill(c1.hex());
      drawWaterColor(points, 1, points.map(() => random(0.5, 1)));
      translate(-400, 0);
      const c2 = chroma('yellow').alpha(0.01)
      fill(c2.hex());
      drawWaterColor(points, 1, points.map(() => random(0.5, 1)));
      translate(200, 0);
      const c = chroma('red').alpha(0.01)
      fill(c.hex());
      drawWaterColor(points, 1, points.map(() => random(0.5, 1)));
    }


  };
}
