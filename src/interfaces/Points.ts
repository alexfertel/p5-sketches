class Vector2D {
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

  static fromVector = (vector: Vector2D): Vector2D => new Vector2D(vector.x, vector.y);
}

class PolarPoint {
  constructor(public r: number, public angle: number) {}
}

interface MovingPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

