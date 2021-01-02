const reds = chroma.scale(YlOrRd);

const collatz = (start: number): number[] => {
  if (start === 1) return [];
  if (start > 1000000) return [];
  return start % 2 === 0
    ? [...collatz(start / 2), start / 2]
    : [...collatz(3 * start + 1), 3 * start + 1];
};

const drawSequence = (sequence: number[]): void => {
  for (let i = 1; i < sequence.length; i++) {
    const n = sequence[i];

    stroke(chroma(reds(map(i, 0, sequence.length, 0, 1))).hsv());
    line(0, 0, 10, 0);
    translate(10, 0);

    // const evenRotation = -map(1000 - n, 1, 10000, 1.5, 3);
    // const oddRotation = map(1000 - n, 1, 10000, 2.9, 5);
    // const evenRotation = -map(n, 1, 1000000, 10, 16);
    // const oddRotation = map(n, 1, 1000000, 22, 60);

    // if (n > 1000) rotate(n % 2 === 0 ? -2 : 3);
    // else rotate(n % 2 === 0 ? evenRotation : oddRotation);
    rotate(n % 2 === 0 ? 6 : -12);
  }
};

class CollatzSketch implements ISketch {
  sequences: number[][];

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 1, 1, 1);
    angleMode(DEGREES);
    noFill();
    background(chroma("#000").hsv());

    strokeWeight(1);
    stroke(chroma("#fff").hsv());

    this.sequences = [];

    // Run collatz for 5000 numbers ranging from 1 to 1_000_000
    for (let i = 0; i < 5000; i++) {
      const sequence = collatz(round(random(1, 1000000)));
      if (sequence.length < 150) this.sequences.push(sequence);
    }

    push();
    // translate(25, (6 * height) / 8);
    translate(width / 5, height / 3);
    scale(1);
    this.sequences.forEach((seq) => {
      push();
      drawSequence(seq);
      pop();
    });

    pop();
  }

  draw(): void {}
}
