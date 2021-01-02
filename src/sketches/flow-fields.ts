class FlowFieldsSketch implements ISketch {
  public leftX: number;
  public rightX: number;
  public topY: number;
  public bottomY: number;
  public resolution: number;
  public numColumns: number;
  public numRows: number;

  public drawLine(
    x: number,
    y: number,
    spacing: number,
    length: number,
    grid: number[][]
  ): void {
    beginShape();
    for (let i = 0; i < length; i++) {
      const xOffset = x - this.leftX;
      const yOffset = y - this.topY;
      const columnIndex = floor(xOffset / this.resolution);
      const rowIndex = floor(yOffset / this.resolution);
      if (!inRange(rowIndex, columnIndex, grid)) continue;
      stroke(random([0, 180]), 200, 255);
      vertex(x, y);
      const gridAngle = grid[rowIndex][columnIndex];
      const xStep = spacing * cos(gridAngle);
      const yStep = spacing * sin(gridAngle);
      x = x + xStep;
      y = y + yStep;
    }
    endShape();
  }

  public initVars(): void {
    this.leftX = floor(width * -0.5);
    this.rightX = floor(width * 1.5);
    this.topY = floor(height * -0.5);
    this.bottomY = floor(height * 1.5);
    this.resolution = floor(width * 0.01);
    this.numColumns = (this.rightX - this.leftX) / this.resolution;
    this.numRows = (this.bottomY - this.topY) / this.resolution;
  }

  public initPerlinNoise(): number[][] {
    const grid = [];
    for (let j = 0; j < this.numRows; j++) {
      const row = [];
      for (let i = 0; i < this.numColumns; i++) {
        const scaledX = i * 0.005;
        const scaledY = j * 0.005;
        // let scaledX = i / 10;
        // let scaledY = j / 10;

        const noiseValue = noise(scaledX, scaledY);

        const angle = map(noiseValue, 0.0, 1.0, 0.0, PI * 2.0);

        row.push(angle);
      }
      grid.push(row);
    }
    return grid;
  }

  public renderFlowField(grid: number[][]): void {
    for (let j = 0; j < this.numRows; j++) {
      for (let i = 0; i < this.numColumns; i++) {
        const v = p5.Vector.fromAngle(grid[j][i], 5);

        const vx = v.x;
        const vy = v.y;

        noFill();
        stroke(0);
        push();
        translate(i * 5, j * 5);
        line(0, 0, vx, vy);
        pop();
      }
    }
  }

  public renderLines(grid: number[][]): void {
    noFill();
    const choices = [];
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      choices.push((i * width) / steps);
    }

    for (let i = 0; i < 2000; i++) {
      // let x = random(choices);
      const x = random(width);
      const y = random(height);

      this.drawLine(x, y, 1, 100, grid);
    }
  }

  public setup(): void {
    createCanvas(windowWidth, windowHeight);
    background(255);
    colorMode(HSB, 255);

    this.initVars();
    const grid = this.initPerlinNoise();
    // this.renderFlowField(grid);
    this.renderLines(grid);
  }

  public draw(): void {}
}
