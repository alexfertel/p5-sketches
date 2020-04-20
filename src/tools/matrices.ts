function inRange(x: number, y: number, matrix: number[][]): boolean {
  return 0 <= x && x < matrix.length && 0 <= y && y < matrix[0].length;
}
