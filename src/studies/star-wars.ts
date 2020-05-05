class StarWarsSketch implements ISketch {
  setup = (): void => {
    init();

    const bgColor = "#1b262c";
    background(bgColor);

    const origin = Vector2D.center();
    // translate(origin.x, origin.y);

    const gray = chroma("dbdbdb")
      .alpha(1)
      .hex();

    noFill();
    strokeWeight(2);
    stroke(gray);
    for (let i = 1; i < 200; i += 6) {
      drawArcWithShape(origin.x, origin.y, i, 90, 180);
    }

    push();
    translate(origin.x, origin.y - 200);
    for (let i = 1; i < 200; i += 6) {
      stroke(
        chroma("dbdbdb")
          .alpha(0.5)
          .hex()
      );
      line(0, i, random(40, 100 + i), i);
      stroke(chroma("dbdbdb").hex());
      line(0, i, random(40, 100 + i), i);
    }

    translate(0, 200);
    for (let i = 1; i < 200; i += 6) {
      stroke(
        chroma("dbdbdb")
          .alpha(0.5)
          .hex()
      );
      line(0, i, random(40, 100 + (200 - i)), i);
      stroke(chroma("dbdbdb").hex());
      line(0, i, random(40, 100 + (200 - i)), i);
    }

    pop();

    strokeCap(SQUARE);
    strokeWeight(8);
    stroke(bgColor);
    line(167, height / 2, width - 150, height / 2);

    strokeWeight(2);
    stroke(gray);
    line(167, height / 2 - 4, width - 150, height / 2 - 4);

    strokeWeight(2);
    stroke(gray);
    line(167, height / 2 + 4, width - 150, height / 2 + 2);

    translate(origin.x, origin.y);
    translate(25, -80);
    fill(bgColor);

    beginShape();
    const r = 45;
    for (let i = 0; i < 360; i++) {
      const rx = r * cos(i);
      const ry = r * sin(i);
      vertex(rx, ry);
    }

    beginContour();
    for (let i = 359; i >= 0; i--) {
      const rx = (r - 10) * cos(i);
      const ry = (r - 10) * sin(i);
      vertex(rx, ry);
    }
    endContour();
    endShape(CLOSE);

    fill(chroma(bgColor).alpha(0.5).hex());
    beginShape();
    for (let i = 0; i < 360; i++) {
      const rx = (r - 10) * cos(i);
      const ry = (r - 10) * sin(i);
      vertex(rx, ry);
    }
    endShape(CLOSE);
    
    fill(bgColor);
    push()
    rotate(-90)
    arc(0, 0, r * 2  - 20, r * 2  - 20, 0, 180, OPEN)
    pop()
    

    beginShape();
    for (let i = 0; i < 360; i++) {
      const rx = (r - 38) * cos(i);
      const ry = (r - 38) * sin(i);
      vertex(rx, ry);
    }
    endShape(CLOSE);

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
