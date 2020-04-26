const chaikinsCurveSubdivision = (
  points: Vector2D[],
  steps: number
): Vector2D[] => {
  const subdivideOne = (control1: Vector2D, control2: Vector2D): Vector2D[] => {
    return [
      control1.scale(3 / 4).add(control2.scale(1 / 4)),
      control1.scale(1 / 4).add(control2.scale(3 / 4))
    ];
  };

  if (steps < 0) return points;

  let result: Vector2D[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const subdivided = subdivideOne(points[i], points[i + 1]);
    result = result.concat(subdivided);
  }
  return chaikinsCurveSubdivision(result, steps - 1);
};
