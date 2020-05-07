class PenroseLSystem implements ISketch {
  axiom = "[X]++[X]++[X]++[X]++[X]";
  ruleW = "YF++ZF----XF[-YF----WF]++";
  ruleX = "+YF--ZF[---WF--XF]+";
  ruleY = "-WF++XF[+++YF++ZF]-";
  ruleZ = "--YF++++WF[+ZF++++XF]--XF";

  startLength = 460.0;
  theta = 360 / 10.0;

  steps = 0;
  production = "";
  drawLength = 0;
  generations = 0;
  repeats = 1;

  constructor() {
    this.production = this.axiom;
    this.drawLength = this.startLength;
  }

  setup(): void {
    init();
    background(0);

    this.simulate(5);
  }

  draw(): void {
    background(0);
    this.render();
  }

  simulate(gen: number): void {
    while (this.generations < gen) this.iterate();
  }

  iterate(): void {
    let newProduction = "";
    for (let i = 0; i < this.production.length; ++i) {
      const step = this.production.charAt(i);
      //if current character is 'W', replace current character
      //by corresponding rule
      if (step == "W") {
        newProduction = newProduction + this.ruleW;
      } else if (step == "X") {
        newProduction = newProduction + this.ruleX;
      } else if (step == "Y") {
        newProduction = newProduction + this.ruleY;
      } else if (step == "Z") {
        newProduction = newProduction + this.ruleZ;
      } else {
        //drop all 'F' characters, don't touch other
        //characters (i.e. '+', '-', '[', ']'
        if (step != "F") {
          newProduction = newProduction + step;
        }
      }
    }

    this.drawLength = this.drawLength * 0.5;
    this.generations++;
    this.production = newProduction;
  }

  render(): void {
    translate(width / 2, height / 2);

    this.steps += 20;
    if (this.steps > this.production.length) {
      this.steps = this.production.length;
    }

    for (let i = 0; i < this.steps; ++i) {
      const step = this.production.charAt(i);

      //'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
      if (step == "F") {
        stroke(255, 60);
        for (let j = 0; j < this.repeats; j++) {
          line(0, 0, 0, -this.drawLength);
          noFill();
          translate(0, -this.drawLength);
        }
        this.repeats = 1;
      } else if (step == "+") {
        rotate(this.theta);
      } else if (step == "-") {
        rotate(-this.theta);
      } else if (step == "[") {
        push();
      } else if (step == "]") {
        pop();
      }
    }
  }
}
