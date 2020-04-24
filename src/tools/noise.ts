const drawNoise = (start: Vector2D, stop: Vector2D, step: number, strokeSetter: () => void): void => {
  for (let i = start.x; i < stop.x; i += step)
    for (let j = start.y; j < stop.y; j += step) {
      strokeSetter();
      point(i, j);
    }
};
