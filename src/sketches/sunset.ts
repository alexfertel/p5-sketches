class Sunset implements ISketch {
  setup = (): void => {
    init();
    // randomSeed(7);
    // const origin = Vector2D.center();

    // translate(origin.x, origin.y);

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

    const heartPointsCount = 50;
    const heartAngle = 360 / heartPointsCount;
    const heart = [];
    for (let i = 0; i <= heartPointsCount; i++) {
      const t = heartAngle * i;
      const x = 16 * sin(t) * sin(t) * sin(t);
      const y = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t);
      const point = createVector(x + random(-0.3, 0.3), y + random(-0.3, 0.3));

      heart.push(point);
    }

    // push();
    // scale(10);
    // rotate(180);
    // const chaikinComet = chaikinsCurveSubdivisionVectors(heart, 3);
    // drawVertices(chaikinComet, true);
    // pop();

    const waterColor = chroma.scale(YlOrBr).padding([.2, .4]).colors(10, null);
    const hexCodes = waterColor.map(color => color.alpha(0.05).hex())
    const indices = hexCodes.map((elem, i) => i);

    noStroke();
    const heartCount = 100;
    for (let i = 0; i < heartCount; i++) {
      push();
      noStroke();
      // Translate to random position
      translate(random(0, windowWidth), random(0, windowHeight));

      // I don't know how to scale the hearts...
      // They are small...
      scale(10);

      // Rotate randomly
      rotate(random(0, 359));

      
      const color = random(indices)
      fill(hexCodes[color]);

      // Draw a heart with watercolor paint
      drawWaterColor(
        heart,
        50,
        heart.map(() => 0.6)
      );

      // Draw the skeleton like it was hand-drawn
      stroke(waterColor[color].alpha(0.2).hex());
      noFill();
      const chaikinHeart = chaikinsCurveSubdivisionVectors(heart, 3);
      drawVertices(chaikinHeart, true);

      pop();
    }

  };
}
