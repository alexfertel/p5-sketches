const brewerStokeSetter = (
  points: Vector2D[],
  scale: chroma.Scale
): ((i: number) => void) => {
  return (i): void => {
    const offset = i / points.length;
    // const alphaOffset = i / points.length;
    const representation = scale(offset)
      //   .alpha(alphaOffset)
      .hsl()
      .map(value => value || 0);

    const c = color(
      representation[0],
      representation[1],
      representation[2],
      representation[3]
    );
    stroke(c);
  };
};
