class AphasiaSketch implements ISketch {
  innerAngle = 0;
  outerAngle = 0;

  setup(): void {
    init();
    noFill();
    stroke(255);
  }


  draw(): void {
    background(0);
    const origin = Vector2D.center();
    this.innerAngle += 1;
    this.outerAngle -= 1;

    push();
    translate(origin.x, origin.y);
    rotate(this.innerAngle);
    for (let i = 0; i < 5; i++) {
      ellipse(0, 0, 100, 50);
      push()
      stroke(color('red'))
      arc(0, 0, 600, 300, 0, 36);
      pop()
      rotate(36 * 2);
    }
    pop();
    push();
    translate(origin.x, origin.y);
    rotate(this.outerAngle);
    for (let i = 0; i < 3; i++) {
      ellipse(0, 0, 600, 300);
      push()
      stroke(color('blue'))
      arc(0, 0, 100, 100, 0, 36);
      pop()
      rotate(120);
    }
    pop();
  }
}
