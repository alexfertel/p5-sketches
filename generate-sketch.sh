#!/bin/bash

SKETCH_DIR=sketches/$1

mkdir $SKETCH_DIR
# mkdir $SKETCH_DIR/showcase
touch $SKETCH_DIR/index.html
touch $SKETCH_DIR/sketch.js


HTML=$'<!DOCTYPE html>
<html lang="">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p5.js example</title>
  <style>
    body {
      padding: 0;
      margin: 0;
    }
  </style>
  <script src="../../p5.js"></script>
  <script src="sketch.js"></script>
</head>

<body>
</body>

</html>'

JS=$'///<reference path="../../p5.global-mode.d.ts" />

let width, height;

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  background(255);
  colorMode(HSB, 255);

}

function draw() {

}'

echo "$HTML" > $SKETCH_DIR/index.html
echo "$JS" > $SKETCH_DIR/sketch.js
