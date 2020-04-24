class PlanetGenerator {
  static drawAt = (origin: Vector2D, func: () => void): void => {
    push();
    translate(origin.x, origin.y);
    func();
    pop();
  };

  static regular = (origin: Vector2D, radius: number): void => {
    PlanetGenerator.drawAt(origin, () => {
      circle(0, 0, math.randomInt(100));
    });
  };

  static ringed = (origin: Vector2D, radius: number): void => {
    const genRing = (
      count: number,
      width: number,
      height: number,
      angle: number,
      spacing: number,
      strokeSetter: () => void,
      starBodyDrawer: () => void
    ): void => {
      const drawRingArcs = (start: number, stop: number): void => {
        noFill();
        strokeSetter();
        for (let i = 0; i < count; i++) {
          arc(
            0,
            0,
            width + i * spacing,
            height + (i * spacing) / 2,
            start,
            stop
          );
        }
      };

      const drawDust = (start: number, stop: number, density: number): void => {
        const angularVelocity = (stop - start) / density;
        push();
        rotate(start);
        stroke(0, 0, 100, 30);
        for (let i = 0; i < density; i++)
          for (let j = 1; j < count + 1; j++)
            point(
              (width / 2 + random(spacing * j)) * cos(angularVelocity * i),
              (height / 2 + random((spacing / 2) * j)) *
                sin(angularVelocity * i)
            );

        pop();
      };

      push();
      rotate(angle);

      strokeWeight(1);
      drawRingArcs(0, 180);
      drawDust(0, 180, 1000);
      starBodyDrawer();
      drawRingArcs(180, 360);
        drawDust(180, 360, 1000);
      pop();
    };

    // const drawTexture = (): void => {};

    PlanetGenerator.drawAt(origin, () => {
      push();
      angleMode(DEGREES);
      const radius = math.randomInt(50, 250);
      genRing(
        random(4, 10),
        random((radius * 3) / 2, radius * 4),
        random(0, radius),
        random(360),
        random(5, 50),
        () => {
          stroke(0, 0, 100, 5);
        },
        () => {
          fill(0, 0, 0);
          stroke(0, 0, 100, 100);
          circle(0, 0, radius);
        }
      );
      pop();
    });
  };
}
