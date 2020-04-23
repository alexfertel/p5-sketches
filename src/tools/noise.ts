const drawNoise = (start: Vector2D, stop: Vector2D, step: number): void => {
  for (let i = start.x; i < stop.x; i += step)
    for (let j = start.y; j < stop.y; j += step) {
      stroke(0, map(random(), 0, 1, 0, 100));
      point(i, j);
    }
};
