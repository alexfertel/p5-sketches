interface Line {
  start: Vector2D;
  end: Vector2D;
}

interface Arc {
  center: Vector2D;
  width: number;
  height: number;
  start: number;
  stop: number;
}

type Orbit = "line" | "arc";

class StarSystemSketch implements ISketch {
  private _spaceColor: p5.Color;
  private _frameColor: p5.Color;
  private _orbitTrajectoryColor: p5.Color;
  private _planetPalette: p5.Color[];
  private _starPalette: p5.Color[];
  private _padding = 20;
  private _canvasWidth: number;
  private _canvasHeight: number;

  sunDiameter: number;
  sunRadius: number;
  sunCenter: Vector2D;
  systemAngle: number;

  setup(): void {
    createCanvas(windowWidth, windowHeight);
    this._spaceColor = color("#222831");
    this._frameColor = color("#eae7d9");
    this._orbitTrajectoryColor = color("#ffecc7");

    this._planetPalette = [
      color("#f79071"),
      color("#fa744f"),
      color("#16817a"),
      color("#ffb6b6"),
      color("#00bdaa"),
      color("#fe346e"),
      color("#d7fffd"),
      color("#024249")
    ];

    this._starPalette = [
      color("#fdd998"),
      color("#fae7cb"),
      color("#ffb385"),
      color("#ff7272")
    ];

    colorMode(HSB, 255);

    this._canvasWidth = width - this._padding * 2;
    this._canvasHeight = height - this._padding * 2;

    this.sunDiameter = random(500, 1000);
    this.sunRadius = this.sunDiameter / 2;
    // this.sunCenter = new Vector2D(width / 2, height / 2);
    this.sunCenter = new Vector2D(random(width), height);

    this.drawSpace();
    this.drawSun();

    const planetCount = 7;
    const displacement = 200;
    for (let i = 0; i < planetCount; i++) {
      const radius = 250 + i * displacement + this._padding;
      this.drawOrbit(radius, "arc");

      push();
      translate(this.sunCenter.x, this.sunCenter.y);
      rotate(PI);
      const distance = this.sunRadius + radius / 2;
      stroke(random(255), 255, 255);
      const angle = random(QUARTER_PI, PI - QUARTER_PI);
      const center = new Vector2D(distance * cos(angle), distance * sin(angle));
      const planet = { center: center, radius: random(20, 80) } as Circle;
      this.drawPlanet(planet);
      pop();
    }

    this.drawFrame();
    this.drawNoise();
  }

  drawPlanet(planet: Circle): void {
    push();
    noStroke();
    fill(random(this._planetPalette));
    circle(planet.center.x, planet.center.y, planet.radius);
    pop();
  }

  drawSpace(): void {
    push();
    noStroke();
    fill(this._spaceColor);
    rect(this._padding, this._padding, this._canvasWidth, this._canvasHeight);

    for (let i = 0; i < 7500; i++) {
      stroke(color(255, random(0, 150)));
      point(random(width), random(height));
    }
    pop();
  }
  drawOrbit(scaleFactor: number, type: Orbit): void {
    stroke(this._orbitTrajectoryColor);
    if (type === "arc") {
      noFill();
      this.drawEllipse(
        this.sunCenter,
        this.sunDiameter + scaleFactor,
        this.sunDiameter + scaleFactor,
        30
      );
    } else {
      console.log("Not an arc");
    }
  }

  drawEllipse(
    center: Vector2D,
    width: number,
    height: number,
    arcCount: number
  ): void {
    const angularVelocity = PI / arcCount;

    let angle = 0;
    while (angle < TWO_PI) {
      arc(
        center.x,
        center.y,
        width,
        height,
        angle,
        angle + angularVelocity / 2
      );
      angle += angularVelocity;
    }
  }

  drawSun(): void {
    noStroke();
    const c = random(this._starPalette);
    fill(c);
    circle(this.sunCenter.x, this.sunCenter.y, this.sunDiameter);
  }

  drawFrame(): void {
    noStroke();
    const c = this._frameColor;
    fill(c);
    rect(0, 0, width, this._padding);
    rect(0, 0, this._padding, height);
    rect(width - this._padding, 0, this._padding, height);
    rect(0, height - this._padding, width, this._padding);
  }

  drawNoise(): void {
    for (let i = 0; i < width; i++) for (let j = 0; j < width; j++) {
        stroke(0, map(random(), 0, 1, 0, 100));
        point(i, j);
    }
  }

  draw(): void {}
}
