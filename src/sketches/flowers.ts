const branchAt = (
  angle: number,
  length: number,
  step: number,
  minLength: number
): void => {
  if (length > minLength) {
    push();
    const stem = random(length / 2, length * 2)
    line(0, 0, stem, 0);
    translate(stem, 0);

    rotate(random(angle));
    branchAt(angle, length - step, step, minLength);

    rotate(random(-angle * 2));
    branchAt(angle, length - step, step, minLength);
    pop();
  }
};

const drawFlower = ():void => {

}

const drawTree = (start: Vector2D) : void => {
    push();
    translate(start.x, start.y);
    rotate(270);
    branchAt(25, 70, 7, 25);
    pop();
}

class SimpleTreeSketch implements ISketch {
  setup = (): void => {
    init();
    const origin = Vector2D.center();

    strokeWeight(1);

    const start = new Vector2D(origin.x, origin.y + 300);
    drawTree(start);
    
  };

  draw = (): void => {};
}
