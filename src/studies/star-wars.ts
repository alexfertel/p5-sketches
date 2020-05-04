class StarWarsSketch implements ISketch {
  setup = (): void => {
    init();
    background(0);

    const origin = Vector2D.center();
  };

  drawR2D2(): void {
    push();
    const origin = Vector2D.center();

    translate(origin.x, origin.y);

    fill("#12299e");
    noStroke();
    // Draw blue parts
    translate(0, -200);
    rect(-205, -40, 200, 70);
    rect(5, -40, 200, 70);

    translate(0, 65);
    rect(-50, -25, 100, 80);

    // Black circle
    push();
    fill("black");
    circle(0, 15, 65);

    // White glow
    fill("white");
    circle(6, 22, 10);
    pop();

    translate(0, 70);
    rect(-300, 70, 700, 5);

    // Last row from left to right
    const height = 75;
    translate(-200, -10);
    rect(-50, 0, 100, height);

    translate(55, 0);
    rect(5, 0, 30, height);

    translate(35, 0);
    rect(5, 0, 50, height);

    // Light blue
    push();
    fill("#87ceeb");
    stroke("white");
    strokeWeight(3);
    rect(15, 10, 30, 20);
    rect(15, 40, 30, 20);
    pop();

    translate(60, 10);
    rect(0, 0, 20, height - 10);

    translate(25, 0);
    rect(0, 0, 75, height - 10);

    // Red light
    push();
    fill("#c70039");
    translate(45, 10);
    circle(5, 22.5, 30);
    pop();

    // Black circle in the last row
    translate(80, 0);
    push();
    stroke("gray");
    strokeWeight(4);
    fill("black");
    circle(32.5, 32.5, 45);
    pop();

    translate(68, 0);
    rect(0, 0, 20, height - 10);
    rect(25, 0, 20, height - 10);
    rect(50, 0, 20, height - 10);
    rect(75, 0, 20, height - 10);
    pop();
    frame(430);
  }
}
