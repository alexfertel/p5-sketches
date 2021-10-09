type Orbit = "line" | "arc";

class StarSystemSketch implements ISketch {
  private _spaceColor: p5.Color;
  private _spacePalette: p5.Color[];
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
    createCanvas(1000, 1000);
    pixelDensity(5);

    this._spacePalette = [
      color("#293241"),
      // color("#0466c8"),
      // color("#0353a4"),
      // color("#023e7d"),
      // color("#002855"),
      // color("#001845"),
      // color("#001233"),
      // color("#33415c"),
      // color("#5c677d"),
      // color("#7d8597"),
      // color("#979dac"),
    ];

    // this._spacePalette = [
    //   color("#ffcdb2"),
    //   color("#ffb4a2"),
    //   color("#e5989b"),
    //   color("#b5838d"),
    //   color("#6d6875"),
    // ];
    // this._spaceColor = color("#222831");
    this._spaceColor = random(this._spacePalette);
    this._frameColor = color("#eae7d9");
    this._orbitTrajectoryColor = color("#ffecc7");

    // this._planetPalette = [
    //   color("#f79071"),
    //   color("#fa744f"),
    //   color("#16817a"),
    //   color("#ffb6b6"),
    //   color("#00bdaa"),
    //   color("#fe346e"),
    //   color("#d7fffd"),
    //   color("#024249"),
    // ];

    this._planetPalette = [
      color("#264653"),
      color("#2a9d8f"),
      color("#e9c46a"),
      color("#f4a261"),
      color("#e76f51"),
    ];

    // this._planetPalette = [
    //   color("#f72585"),
    //   color("#b5179e"),
    //   color("#7209b7"),
    //   color("#560bad"),
    //   color("#480ca8"),
    //   color("#3a0ca3"),
    //   color("#3f37c9"),
    //   color("#4361ee"),
    //   color("#4895ef"),
    //   color("#4cc9f0"),
    // ];

    // this._planetPalette = [
    //   color("#3d5a80"),
    //   color("#98c1d9"),
    //   color("#e0fbfc"),
    //   color("#ee6c4d"),
    //   color("#293241"),
    // ];

    this._planetPalette = [
      color("#03071e"),
      color("#370617"),
      color("#6a040f"),
      color("#9d0208"),
      color("#d00000"),
      color("#dc2f02"),
      color("#e85d04"),
      color("#f48c06"),
      color("#faa307"),
      color("#ffba08"),
    ];

    this._planetPalette = [
      color("#227c9d"),
      color("#17c3b2"),
      color("#ffcb77"),
      color("#d00000"),
      color("#fe6d73"),
    ];

    this._starPalette = [
      color("#e8a598"),
      color("#ffb5a7"),
      color("#fec5bb"),
      color("#fcd5ce"),
      color("#fae1dd"),
      color("#f8edeb"),
      color("#f9e5d8"),
      color("#f9dcc4"),
      color("#fcd2af"),
      color("#fec89a"),
    ];

    colorMode(HSB, 255);

    this._canvasWidth = width - this._padding * 2;
    this._canvasHeight = height - this._padding * 2;

    this.sunDiameter = random(200, 500);
    this.sunRadius = this.sunDiameter / 2;
    this.sunCenter = new Vector2D(random(width), random(height));

    this.drawSpace();
    this.drawSun();

    const planetCount = 20;
    const displacement = 100;
    for (let i = 0; i < planetCount; i++) {
      const radius = 150 + i * displacement + this._padding;
      this.drawOrbit(radius, "arc");

      const planets_per_orbit = random(3);
      for (let j = 0; j < planets_per_orbit; j++) {
        push();
        translate(this.sunCenter.x, this.sunCenter.y);
        // rotate(PI);
        const distance = this.sunRadius + radius / 2;
        stroke(random(255), 255, 255);
        // const angle = random(
        //   QUARTER_PI - map(width - this.sunCenter.x, 0, width, 0, QUARTER_PI),
        //   PI - QUARTER_PI - map(this.sunCenter.x, 0, width, 0, QUARTER_PI)
        // );
        const angle = random(PI * 2);
        const center = new Vector2D(
          distance * cos(angle),
          distance * sin(angle)
        );
        const planet = { center: center, radius: random(20, 80) } as Circle;
        this.drawPlanet(planet);
        pop();
      }
    }

    this.drawFrame();
    drawNoise(
      new Vector2D(this._padding, this._padding),
      new Vector2D(width - this._padding, height - this._padding),
      1,
      () => {
        stroke(0, map(random(), 0, 1, 0, 60));
      },
      0.05
    );
  }

  drawPlanet(planet: Circle): void {
    push();
    noStroke();
    fill(this._spaceColor);
    circle(planet.center.x, planet.center.y, planet.radius + 25);
    fill(random(this._planetPalette));
    circle(planet.center.x, planet.center.y, planet.radius);
    pop();
  }

  drawSpace(): void {
    push();
    noStroke();
    fill(this._spaceColor);
    rect(this._padding, this._padding, this._canvasWidth, this._canvasHeight);

    // const stars_count = random(15000);
    drawNoise(
      new Vector2D(this._padding, this._padding),
      new Vector2D(width - this._padding, height - this._padding),
      1,
      () => {
        stroke(255, map(random(), 0, 1, 0, 100));
      },
      0.05
    );
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
        random(30, 150)
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

    const start_angle = random(TWO_PI);
    let angle = 0;
    while (angle < TWO_PI) {
      arc(
        center.x,
        center.y,
        width,
        height,
        start_angle + angle,
        start_angle + angle + angularVelocity / 2
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

  draw(): void {}
}
