const branchAt = (
  angle: number,
  length: number,
  step: number,
  minLength: number
): void => {
  if (length > minLength) {
    push();
    strokeWeight(6);
    stroke(color('#42240c'));
    const stem = random(length / 2, length * 2)
    line(0, 0, stem, 0);
    translate(stem, 0);

    rotate(random(angle));
    branchAt(angle, length - step, step, minLength);

    rotate(random(-angle * 2));
    branchAt(angle, length - step, step, minLength);
    pop();
  }
  else {
    strokeWeight(1);
    stroke(color('#3A5F0B'));
    drawSpiral(0, 0, 35, 1, 13);
  }
};

const drawTree = (start: Vector2D) : void => {
    push();
    translate(start.x, start.y);
    rotate(270);
    branchAt(35, 80, 7, 30);
    pop();
}

class FlowerSketch implements ISketch {
  setup = (): void => {
    init();
    // background(color);
    const origin = Vector2D.center();

    const start = new Vector2D(origin.x, origin.y + 300);
    drawTree(start);
    
  };

  draw = (): void => {};
}
