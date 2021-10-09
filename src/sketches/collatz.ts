const palette = chroma.scale(Blues);
const lineLength = 5;
const upperBound = 1000000;

const collatz = (start: number): number[] => {
  if (start === 1) return [];
  if (start > upperBound) return [];
  return start % 2 === 0
    ? [...collatz(start / 2), start / 2]
    : [...collatz(3 * start + 1), 3 * start + 1];
};

const drawSequence = (sequence: number[]): void => {
  for (let i = 1; i < sequence.length; i++) {
    const n = sequence[i];

    stroke(chroma(palette(map(i, 0, sequence.length, 0, 1))).hsv());
    line(0, 0, lineLength, 0);
    translate(lineLength, 0);

    // const evenRotation = -map(1000 - n, 1, 10000, 1.5, 3);
    // const oddRotation = map(1000 - n, 1, 10000, 2.9, 5);
    const evenRotation = -map(n, 1, upperBound, -10, -16);
    const oddRotation = map(n, 1, upperBound, 22, 60);

    if (n > 1000) rotate(n % 2 === 0 ? -2 : 3);
    else rotate(n % 2 === 0 ? evenRotation : oddRotation);
    // rotate(n % 2 === 0 ? 6.5 : -12);
  }
};

class CollatzSketch implements ISketch {
  sequences: number[][];

  setup(): void {
    createCanvas(1000, 1000);
    pixelDensity(5.0);
    colorMode(HSB, 360, 1, 1, 1);
    angleMode(DEGREES);
    noFill();
    background(chroma("#1B1717").hsv());

    strokeWeight(1);

    // for (let i = 0; i < 350000; i++) {
    //   stroke(
    //     chroma(random(["#082032", "#2C394B", "#334756"]))
    //       .alpha(0.05)
    //       .hsv()
    //   );
    //   point(random(5000), random(4000));
    // }

    strokeWeight(1);
    this.sequences = [];

    // Run collatz for 5000 numbers ranging from 1 to 1_000_000
    for (let i = 0; i < 50000; i++) {
      const sequence = collatz(round(random(1, upperBound)));
      if (sequence.length < 500) this.sequences.push(sequence);
    }

    push();
    // translate(25, (6 * height) / 8);
    translate(width / 2, height / 2);
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
