type Line = [Vector2D, Vector2D];

class FadingSunSketch implements ISketch {
  setup(): void {
    init();

    const origin = Vector2D.center();

    fill(0, 0.85);
    const diameter = 450;
    circle(origin.x, origin.y, diameter);

    const lineCount = 8;
    const spacePerLine = diameter / 2 / lineCount;

    stroke(255);
    let weight = 1;
    for (let i = 0; i < lineCount - 1; i++) {
        weight += i;
        strokeWeight(weight);
        line(0, height / 2 + spacePerLine * i, width, height / 2 + spacePerLine * i);
    }

    strokeWeight(50)
    line(0, height / 2 + spacePerLine * lineCount - 16, width, height / 2 + spacePerLine * lineCount - 16);

}

  draw(): void {}
}
