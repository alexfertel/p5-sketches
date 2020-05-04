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

const chaikinsCurveSubdivisionVectors = (
  points: p5.Vector[],
  steps: number
): p5.Vector[] => {
  const subdivideOne = (
    control1: p5.Vector,
    control2: p5.Vector
  ): p5.Vector[] => {
    const c11 = p5.Vector.mult(control1, 3 / 4);
    const c12 = p5.Vector.mult(control1, 1 / 4);
    const c21 = p5.Vector.mult(control2, 1 / 4);
    const c22 = p5.Vector.mult(control2, 3 / 4);

    return [p5.Vector.add(c11, c21), p5.Vector.add(c12, c22)];
  };

  if (steps < 0) return points;

  let result: p5.Vector[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const subdivided = subdivideOne(points[i], points[i + 1]);
    result = result.concat(subdivided);
  }
  return chaikinsCurveSubdivisionVectors(result, steps - 1);
};
