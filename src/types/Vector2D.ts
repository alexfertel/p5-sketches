class Vector2D implements IVector2D {
  constructor(public x: number, public y: number) {}

  add(another: Vector2D): Vector2D {
    return new Vector2D(this.x + another.x, this.y + another.y);
  }

  sub(another: Vector2D): Vector2D {
    return new Vector2D(this.x - another.x, this.y - another.y);
  }

  scale(factor: number): Vector2D {
    return new Vector2D(this.x * factor, this.y * factor);
  }

  getNorm = (): number => sqrt(this.x * this.x + this.y * this.y);
  

  static fromVector = (vector: Vector2D): Vector2D =>
    new Vector2D(vector.x, vector.y);
  static origin = (): Vector2D => new Vector2D(0, 0);
  static center = (): Vector2D => new Vector2D(width / 2, height / 2);
  static end = (): Vector2D => new Vector2D(width, height);
}
