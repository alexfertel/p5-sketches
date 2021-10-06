const drawNoise = (
  start: Vector2D,
  stop: Vector2D,
  step: number,
  strokeSetter: () => void,
  probability: number = 1
): void => {
  for (let i = start.x; i < stop.x; i += step)
    for (let j = start.y; j < stop.y; j += step) {
      if (random() < probability) {
        strokeSetter();
        point(i, j);
      }
    }
};
