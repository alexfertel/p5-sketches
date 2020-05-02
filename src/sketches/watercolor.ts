class WatercolorSketch implements ISketch {
  setup = (): void => {
    init();
    randomSeed(7);
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
    // const c = chroma('red')
    const c = chroma('red').alpha(0.2)
    fill(c.hex());

    const startingPoints = uneasePolygon(points, 6);
    
    noStroke();
    drawVertices(startingPoints, true);
    // drawWaterColor(startingPoints, 7);
  };
}
