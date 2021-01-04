const ruleset = [0, 0, 0, 1, 1, 1, 1, 0];

function rules(a: number, b: number, c: number): number {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}

class OneDimCellularAutomata implements ISketch {
  cells: number[][];
  w: number;
  generation = 0;

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 1, 1, 1);
    angleMode(DEGREES);
    noFill();
    background(chroma("#000").hsv());

    strokeWeight(1);
    noStroke();

    this.cells = [];
    this.w = 2;
    for (let i = 0; i < height / this.w; i++) {
      const row = [];
      for (let j = 0; j < width / this.w; j++) {
        row.push(random() < 0.5 ? 0 : 1);
      }
      this.cells.push(row);
    }

    for (let j = 0; j < width / this.w; j++)
      this.cells[0][j] = j === this.cells[0].length / 2 ? 1 : 0;

    for (let i = 0; i < height / this.w - 1; i++) {
      for (let j = 0; j < width / this.w; j++) {
        const left = this.cells[i][(j - 1) % this.cells[i].length];
        const me = this.cells[i][j];
        const right = this.cells[i][(j + 1) % this.cells[i].length];

        const next = rules(left, me, right);
        this.cells[i + 1][j] = next;
      }
    }

    for (let i = 0; i < height / this.w; i++) {
      for (let j = 0; j < width / this.w; j++) {
        const current = this.cells[i][j];

        fill(current);
        rect(j * this.w, i * this.w, this.w, this.w);
      }
    }
  }

  draw(): void {}
}

// function setup() : void {
//   createCanvas(windowWidth, windowHeight);

//   cells = Array(floor(width / w));
//   for (let i = 0; i < cells.length; i++) {
//     cells[i] = random([0, 1]);
//   }
// }

// function draw() : void {
//   for (let i = 0; i < cells.length; i++) {
//     if (cells[i] === 1) {
//       fill(1);
//     } else {
//       fill(0);
//       noStroke();
//       rect(i * w, generation * w, w, w);
//     }
//   }
//   if (generation < height/w) {
//     generate();
//   }
//   else {
//     generation = 0;
//   }
// }
