class Trigonometry implements ISketch {
  setup = (): void => {
    init();
    const backgroundColor = chroma("#222831");
    background(chroma("#222831").hex());
    // background(0);
    const origin = Vector2D.center();
    // translate(origin.x, origin.y);

    noFill();
    strokeWeight(2);

    const lineColor = chroma("fbfbfb").alpha(0.2);
    const lineColorDarker = chroma("fbfbfb").alpha(0.2).darken();

    fill(lineColorDarker.hex());
    noStroke()
    ellipse(width / 2, height / 2, 400, 200);
    noFill();
    const drawer = (x: number, y: number): void => {
      const lineCount = 180;
      const angularVelocity = 360 / lineCount;
      const radius = 200;
      for (let i = 0; i < lineCount; i++) {
        const angle = angularVelocity * i;
        const rx = x + radius * cos(angle);
        const ry = y + radius / 2 * sin(angle);
        const length = random(30, 80);

        stroke(lineColorDarker.hex());
        line(rx, ry, rx, ry - length * 2);
        stroke(lineColor.hex());
        line(rx, ry, rx, ry - length);
      }
    };

    let drawerCount = 1;
    while (drawerCount--) drawer(width / 2, height / 2);
  };
}
