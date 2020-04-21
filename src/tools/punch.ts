const punchOut = (img: any, punch: any): void => {
  const currBlend = img.drawingContext.globalCompositeOperation;

  const copyArgs = [
    punch,
    0,
    0,
    punch.width,
    punch.height,
    0,
    0,
    img.width,
    img.height
  ];

  img.drawingContext.globalCompositeOperation = "destination-out";
  // eslint-disable-next-line prefer-spread
  img.copy.apply(img, copyArgs);
  img.drawingContext.globalCompositeOperation = currBlend;
};

const frame = (radius: number): void => {
  // push();
  colorMode(RGB, 255);
  // The shape
  const disc = createGraphics(width, height);
  disc.noStroke();
  disc.fill(color(255, 255, 255));
  disc.rect(0, 0, width, height);

  // The image of the shape, ready for punching
  const img = disc.get();

  // The punch
  const punch = createGraphics(width, height);
  punch.noStroke();
  // punch.fill(0);
  punch.circle(width / 2, height / 2, radius);

  // Punch it!
  punchOut(img, punch);

  // Tada!
  image(img, 0, 0);
  // pop();
};
