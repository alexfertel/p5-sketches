class CliffordAttractorSketch implements ISketch, ICanvasMapper {
  public points: MovingPoint[];
  private _a: number;
  private _b: number;
  private _c: number;
  private _d: number;

  constructor() {}

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    this.points = [];
    for (let y = 0; y < height; y += 5) {
      this.points.push({
        x: 0,
        y: y,
        vx: 0,
        vy: 0
      } as MovingPoint);
    }
    this._a = random() * 4 - 2;
    this._b = random() * 4 - 2;
    this._c = random() * 4 - 2;
    this._d = random() * 4 - 2;
  }

  draw(): void {
    for (let i = 0; i < this.points.length; i++) {
      // get each point and do what we did before with a single point
      const p = this.points[i];
      const value = this.getValue({ x: p.x, y: p.y } as Vector2D);
      p.vx += Math.cos(value) * 0.3;
      p.vy += Math.sin(value) * 0.3;

      beginShape();
      // move to current position
      vertex(p.x, p.y);

      // add velocity to position and line to new position
      p.x += p.vx;
      p.y += p.vy;
      vertex(p.x, p.y);
      endShape();

      // apply some friction so point doesn't speed up too much
      p.vx *= 0.99;
      p.vy *= 0.99;

      // wrap around edges of screen
      if (p.x > width) p.x = 0;
      if (p.y > height) p.y = 0;
      if (p.x < 0) p.x = width;
      if (p.y < 0) p.y = height;
    }
  }

  getValue(point: Vector2D): number {
    const scale = 0.005;
    const x = (point.x - width / 2) * scale;
    const y = (point.y - height / 2) * scale;

    const x1 = sin(this._a * y) + this._c * cos(this._a * x);
    const y1 = sin(this._b * y) + this._d * cos(this._b * x);
    return atan2(y1 - y, x1 - x);
  }
}
