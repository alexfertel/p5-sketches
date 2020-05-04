type Corners = [p5.Vector, p5.Vector, p5.Vector, p5.Vector];

class RegularPolygon {
  public points: p5.Vector[] = [];
  constructor(
    public origin: p5.Vector,
    public radius: number,
    public sides: number,
    public rotation = 0
  ) {
    const angle = 360 / sides;
    for (let i = 0; i <= sides; i++) {
      const x = radius * cos(angle * i);
      const y = radius * sin(angle * i);
      const point = createVector(x, y);

      this.points.push(point);
    }
  }

  draw = (): void => {
    push();
    rotate(this.rotation);
    drawVertices(this.points, true);
    pop();
  };
}

class SquareFlower implements ISketch {
  setup(): void {
    init();
    background(0.6)
    const origin = Vector2D.center();

    translate(origin.x, origin.y);

    rectMode(CORNERS);

    // fill(255);
    // const test = createVector(0, 0);
    // const square = new Square(test, 100, 45);
    // square.draw();

    // this.drawStem();

    strokeWeight(3)
    // stroke(chroma('d8345f').alpha(.80).hex())
    this.drawFlower();
  }


  drawFlower(): void {
    const radius = 200;
    const sides = 8;
    const velocity = 10;
    const squares = this.generateFlowers(0, 0, radius, sides, velocity, 0.97);

    squares.push(...this.generateFlowers(0, 0, 18, 4, 2, 1, 5));

    for (let i = 0; i < squares.length; i++) {
      fill(
        chroma
          .scale(PuBuGn).padding([0.3,0])(i / squares.length).alpha(0.05)
          .hex()
      );
      stroke(
        chroma
          .scale(PuBuGn).padding([0.3,0])(i / squares.length).alpha(0.2)
          .hex()
      );
      drawWaterColor(
        squares[i].points,
        10,
        squares[i].points.map(() => 2)
      );
      squares[i].draw();
    }

    // push();
    // noStroke();
    // const c = chroma.hsl(200, 0.7, 0.7).alpha(0.01);
    // fill(c.hex());
    // pop();
  }

  generateFlowers(
    x: number,
    y: number,
    radius: number,
    sides: number,
    velocity: number,
    friction = 1,
    minRadius = 20
  ): RegularPolygon[] {
    const flower: RegularPolygon[] = [];

    const center = createVector(x, y);

    while (radius > minRadius) {
      flower.push(new RegularPolygon(center, radius, sides, random(360)));
      radius -= velocity;
      velocity *= velocity < 1 ? 1 : friction;
    }

    return flower;
  }
}
