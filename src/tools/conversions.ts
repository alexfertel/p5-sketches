import { CartesianPoint, PolarPoint } from "../interfaces/points";

export const polarToCartesian = (r: number, angle: number): CartesianPoint => {
  return { x: r * cos(angle), y: r * sin(angle) };
};

export const cartesianToPolar = (x: number, y: number): PolarPoint => {
  return { angle: atan2(y, x), r: sqrt(x * x + y * y) };
};
