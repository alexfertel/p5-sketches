class WatercolorSketch implements ISketch {
  setup = (): void => {
    init();
    randomSeed(6);
    const origin = Vector2D.center();

    translate(origin.x, origin.y);

    // Hexagon
    const angle = 45;
    const radius = 300;
    const points = [];
    for (let i = 0; i <= 360 / angle; i++) {
      const x = radius * cos(angle * i);
      const y = radius * sin(angle * i);
      const point = createVector(x, y);

      points.push(point);
    }

    drawPolygon(points);

    const newPoints = uneasePolygon(points, 6);


    noStroke();
    fill("red");
    strokeWeight(5);
    // drawPolygon(newPoints, () => {}, true);
    drawVertices(newPoints, true);
    stroke("blue");
    strokeWeight(10);

    drawPoints(newPoints);
  };
}
