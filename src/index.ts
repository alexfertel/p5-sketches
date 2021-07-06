// eslint-disable-next-line @typescript-eslint/no-unused-vars
const factory: ISketch = ((): GriefSketch => new GriefSketch())();

const setup = (): void => factory.setup();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const draw = (): void => factory.draw?.();

// const setup = (): void => {
//   createCanvas(windowWidth, windowHeight);
//   background(0);
//   colorMode(HSB, 360, 100, 100, 100);

//   drawNoise(Vector2D.origin, new Vector2D(width, height), 2, () => {
//     if (random() < 0.008) stroke(255, map(random(), 0, 1, 0, 50));
//     else stroke(255, 0);
//   });

//   ringed(Vector2D.center, 200);
// };

// const draw = (): void => {};
