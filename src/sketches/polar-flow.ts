export const sketch = (p: p5): void => {
  p.setup = (): void => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
  };

  p.draw = (): void => {};
};
