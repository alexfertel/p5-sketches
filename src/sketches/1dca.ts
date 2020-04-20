
const w = 1;
let cells: Array<number>;

let generation = 0;

const ruleset = [0, 0, 0, 1, 1, 1, 1, 0];

function rules(a: number, b: number, c: number) : number {
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

function generate() : void{
  const nextgen = Array(cells.length);
  for (let i = 1; i < cells.length-1; i++) {
    const left   = cells[i-1];   
    const me     = cells[i];     
    const right  = cells[i+1];   
    nextgen[i] = rules(left, me, right);
  }
  cells = nextgen;
  generation++;
}



export function setup() : void {
  createCanvas(windowWidth, windowHeight);

  cells = Array(floor(width / w));
  for (let i = 0; i < cells.length; i++) {
    cells[i] = random([0, 1]);
  }
}

export function draw() : void {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 1) {
      fill(1);
    } else {
      fill(0);
      noStroke();
      rect(i * w, generation * w, w, w);
    }
  }
  if (generation < height/w) {
    generate();
  }
  else {
    generation = 0;
  }
}


