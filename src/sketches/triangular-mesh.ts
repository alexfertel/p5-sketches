class TriangularMesh implements ISketch {
  setup(): void {
    init();
    strokeJoin(BEVEL);

    const lines = [];
    const gap = width / 15;

    const lineCount = 30;
    const dotsPerLine = 30;

    let odd = false;
    for (let i = -4; i < lineCount; i++) {
      odd = !odd;
      const line = [];
      for (let j = -4; j < dotsPerLine; j++) {
        const dotX = j * gap + random(60) + (odd ? gap / 2 : 0);
        const dotY = i * gap + random(60);
        const dot = createVector(dotX, dotY);
        point(dotX, dotY);
        line.push(dot);
      }
      lines.push(line);
    }

    const drawTriangle = (a: p5.Vector, b: p5.Vector, c: p5.Vector): void => {
      beginShape();
      vertex(a.x, a.y);
      vertex(b.x, b.y);
      vertex(c.x, c.y);
      endShape(CLOSE);
    };

    odd = true;

    const colors = chroma.scale(Blues).colors(10, "hex");
    for (let y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      const dotLine = [];
      for (let i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
      }
      for (let i = 0; i < dotLine.length - 2; i++) {
        const color = random(colors);
        stroke(color);
        fill(color);
        drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    }
  }
}
