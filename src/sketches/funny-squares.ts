class FunnySquare {
  constructor(
    public topLeft: Vector2D,
    public topRight: Vector2D,
    public bottomRight: Vector2D,
    public bottomLeft: Vector2D
  ) {}
}

class FunnySquaresSketch implements ISketch {
  grid: FunnySquare[][] = [];
  squareSide = 45;
  padding = 50;
  spacing = 10;

  squaresPalette: p5.Color[];
  backgroundTopColor: p5.Color;
  backgroundBottomColor: p5.Color;

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL, 360, 100, 100, 255);
    strokeWeight(3);

    this.backgroundTopColor = color(204.07, 69.87, 53.14);
    // this.backgroundTopColor = color(43.52, 65.47, 72.75);
    // this.backgroundBottomColor = color(202.11, 20, 37.25);
    this.backgroundBottomColor = color(359.28, 93.26, 65.1);

    this.squaresPalette = [
      //   color(237.07, 56.94, 21.76),
      //   color(359.22, 34.53, 56.27),
      //   color(220, 35.29, 93.33),
      //   color(204.07, 69.87, 53.14)
      color(0, 0, 0),
      color(0, 0, 255)
    ];

    background(this.backgroundTopColor);

    this.drawBgHalf();

    this.initGrid();

    drawNoise(new Vector2D(0, 0), new Vector2D(width, height), 5);
    this.renderSquares();
  }

  drawBgHalf(): void {
    noStroke();
    fill(this.backgroundBottomColor);
    if (random() < 0.5) {
      beginShape();
      vertex(0, 0);
      vertex(width, 0);
      vertex(0, height);
      endShape(CLOSE);
    } else {
      beginShape();
      vertex(width, 0);
      vertex(width, height);
      vertex(0, height);
      endShape(CLOSE);
    }
  }

  initGrid(): void {
    const cols = floor(
      (width - this.padding * 2) / (this.squareSide + this.spacing)
    );
    const rows = floor(
      (height - this.padding * 2) / (this.squareSide + this.spacing)
    );

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const tl = new Vector2D(
          j * (this.squareSide + this.spacing),
          i * (this.squareSide + this.spacing)
        );
        const tr = new Vector2D(tl.x + this.squareSide, tl.y);
        const br = new Vector2D(tl.x + this.squareSide, tl.y + this.squareSide);
        const bl = new Vector2D(tl.x, tl.y + this.squareSide);
        row.push(new FunnySquare(tl, tr, br, bl));
      }
      this.grid.push(row);
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const fs = this.grid[i][j];
        fs.topLeft = fs.topLeft.add(
          new Vector2D(
            random(-this.spacing, this.spacing),
            random(-this.spacing, this.spacing)
          )
        );
        fs.topRight = fs.topRight.add(
          new Vector2D(
            random(-this.spacing, this.spacing),
            random(-this.spacing, this.spacing)
          )
        );
        fs.bottomRight = fs.bottomRight.add(
          new Vector2D(
            random(-this.spacing, this.spacing),
            random(-this.spacing, this.spacing)
          )
        );
        fs.bottomLeft = fs.bottomLeft.add(
          new Vector2D(
            random(-this.spacing, this.spacing),
            random(-this.spacing, this.spacing)
          )
        );
      }
    }
  }

  renderSquares(): void {
    push();
    noFill();
    translate(this.padding + this.spacing, this.padding + this.spacing);
    for (let j = 0; j < this.grid.length; j++) {
      for (let i = 0; i < this.grid[0].length; i++) {
        if (random() < 0.3) continue;
        beginShape();
        stroke(random(this.squaresPalette));
        vertex(this.grid[j][i].topLeft.x, this.grid[j][i].topLeft.y);
        vertex(this.grid[j][i].topRight.x, this.grid[j][i].topRight.y);
        vertex(this.grid[j][i].bottomRight.x, this.grid[j][i].bottomRight.y);
        vertex(this.grid[j][i].bottomLeft.x, this.grid[j][i].bottomLeft.y);
        endShape(CLOSE);
      }
    }
    pop();
  }

  draw(): void {}
}
