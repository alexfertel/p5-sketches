///<reference path="../../p5.global-mode.d.ts" />

let width, height;
let left_x;
let right_x;
let top_y;
let bottom_y;
let resolution;
let num_columns;
let num_rows;

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  background(255);
  colorMode(HSB, 255);

  left_x = floor(width * -0.5);
  right_x = floor(width * 1.5);
  top_y = floor(height * -0.5);
  bottom_y = floor(height * 1.5);
  // left_x = 0;
  // right_x = width;
  // top_y = 0;
  // bottom_y = height;
  resolution = floor(width * 0.01);
  num_columns = (right_x - left_x) / resolution;
  num_rows = (bottom_y - top_y) / resolution;
  // num_rows = 100;

  let grid = [];
  for (let j = 0; j < num_rows; j++) {
    let row = [];
    for (let i = 0; i < num_columns; i++) {
      scaled_x = i * 0.005;
      scaled_y = j * 0.005;
      // scaled_x = i / 10;
      // scaled_y = j / 10;

      noise_val = noise(scaled_x, scaled_y);

      angle = map(noise_val, 0.0, 1.0, 0.0, PI * 2.0);

      row.push(angle);
    }
    grid.push(row);
  }

  // for (let j = 0; j < num_rows; j++) {
  //   for (let i = 0; i < num_columns; i++) {
  //     let v = p5.Vector.fromAngle(grid[j][i], 5);

  //     let vx = v.x;
  //     let vy = v.y;

  //     noFill();
  //     stroke(0);
  //     push();
  //     translate(i * 5, j * 5);
  //     line(0, 0, vx, vy);
  //     pop();
  //   }
  // }

  noFill();
  let choices = [];
  let steps = 10;
  for (let i = 1; i <= steps; i++){
    choices.push(i * width / steps);
  }

  for(let i = 0; i < 2000; i++){
    // let x = random(choices);
    let x = random(width);
    let y = random(height);

    drawLine(x, y, 1, 100, grid);
  }


}

function draw() {}

function inRange(x, y, matrix) {
  return 0 <= x && x < matrix.length && 0 <= y && y < matrix[0].length;
}

function drawLine(x, y, spacing, length, grid) {
  beginShape();
  for (let i = 0; i < length; i++) {
    let x_offset = x - left_x;
    let y_offset = y - top_y;
    let column_index = floor(x_offset / resolution);
    let row_index = floor(y_offset / resolution);
    if (!inRange(row_index, column_index, grid)) continue;
    stroke(random([0, 180]), 200, 255);
    vertex(x, y);
    let grid_angle = grid[row_index][column_index];
    let x_step = spacing * cos(grid_angle);
    let y_step = spacing * sin(grid_angle);
    x = x + x_step;
    y = y + y_step;
  }
  endShape();
}
