const punchOut = (image: p5.Image): void => {
    const currBlend = Object.getPrototypeOf(image).drawingContext.globalCompositeOperation;
    console.log(currBlend);

};

// p5.Image.prototype.punchOut = function(p5Image) {
//     if (p5Image === undefined) {
//       p5Image = this;
//     }
//     let currBlend = this.drawingContext.globalCompositeOperation;
  
//     let scaleFactor = 1;
//     // if (p5Image instanceof p5.Graphics) {
//     //   scaleFactor = p5Image._pInst._pixelDensity;
//     // }
  
//     let copyArgs = [
//       p5Image,
//       0,
//       0,
//       scaleFactor * p5Image.width,
//       scaleFactor * p5Image.height,
//       0,
//       0,
//       this.width,
//       this.height
//     ];
  
//     this.drawingContext.globalCompositeOperation = "destination-out";
//     this.copy.apply(this, copyArgs);
//     this.drawingContext.globalCompositeOperation = currBlend;
//   };
  
//   function frame(radius: number): void {
//     colorMode(RGB, 255);
//     // The shape
//     const disc = createGraphics(width, height);
//     disc.noStroke();
//     disc.fill(color(255, 255, 255));
//     disc.rect(0, 0, width, height);
  
//     // The image of the shape, ready for punching
//     const img = disc.get();
  
//     // The punch
//     const punch = createGraphics(width, height);
//     punch.noStroke();
//     // punch.fill(0);
//     punch.circle(width / 2, height / 2, radius);
  
//     // Punch it!
//     // img.punchOut(punch);
  
//     // Tada!
//     image(img, 0, 0);
//   }