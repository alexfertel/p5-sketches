const polarToCartesian = (polarPoint: PolarPoint): Vector2D => {
  return new Vector2D(
    polarPoint.r * cos(polarPoint.angle),
    polarPoint.r * sin(polarPoint.angle)
  );
};

const cartesianToPolar = (vector: Vector2D): PolarPoint => {
  return new PolarPoint(
    sqrt(vector.x * vector.x + vector.y * vector.y),
    atan2(vector.y, vector.x)
  );
};
