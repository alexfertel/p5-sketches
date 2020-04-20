const polarToCartesian = (r: number, angle: number): Vector2D => {
  return new Vector2D(r * cos(angle), r * sin(angle));
};

const cartesianToPolar = (x: number, y: number): PolarPoint => {
  return { angle: atan2(y, x), r: sqrt(x * x + y * y) };
};
