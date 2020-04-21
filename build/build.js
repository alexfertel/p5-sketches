var polarToCartesian = function (polarPoint) {
    return new Vector2D(polarPoint.r * cos(polarPoint.angle), polarPoint.r * sin(polarPoint.angle));
};
var cartesianToPolar = function (vector) {
    return new PolarPoint(sqrt(vector.x * vector.x + vector.y * vector.y), atan2(vector.y, vector.x));
};
var insideCircleBounds = function (x, y, cx, cy, r) {
    return dist(x, y, cx, cy) < r;
};
var drawSpiral = function (x, y, radius, velocity, angularVelocity, r, angle) {
    if (r === void 0) { r = 0; }
    if (angle === void 0) { angle = 0; }
    var av = map(angularVelocity, 0, 1, 0, PI * 2);
    beginShape();
    while (r < radius) {
        var point_1 = polarToCartesian(new PolarPoint(r, angle));
        curveVertex(x + point_1.x, y + point_1.y);
        angle += av;
        r += velocity;
    }
    endShape();
};
var drawArc = function (x, y, r, theta, alpha, length) {
    beginShape();
    while (length > 0) {
        var point_2 = polarToCartesian(new PolarPoint(r, theta));
        curveVertex(x + point_2.x, y + point_2.y);
        theta += alpha;
        length--;
    }
    endShape();
};
var drawDisc = function (center, lineCount) {
    for (var i = 0; i < lineCount; i++) {
        var theta = random(PI * 2);
        var alpha_1 = 0.01;
        var radius = random(lineCount * 2);
        var length_1 = random(degrees(PI * 2));
        drawArc(center.x, center.y, radius, theta, alpha_1, length_1);
    }
};
function inRange(x, y, matrix) {
    return 0 <= x && x < matrix.length && 0 <= y && y < matrix[0].length;
}
var punchOut = function (img, punch) {
    var currBlend = img.drawingContext.globalCompositeOperation;
    var copyArgs = [
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
    img.copy.apply(img, copyArgs);
    img.drawingContext.globalCompositeOperation = currBlend;
};
var frame = function (radius) {
    colorMode(RGB, 255);
    var disc = createGraphics(width, height);
    disc.noStroke();
    disc.fill(color(255, 255, 255));
    disc.rect(0, 0, width, height);
    var img = disc.get();
    var punch = createGraphics(width, height);
    punch.noStroke();
    punch.circle(width / 2, height / 2, radius);
    punchOut(img, punch);
    image(img, 0, 0);
};
var drawSquare = function (point, side) {
    push();
    rectMode(CENTER);
    rect(point.x, point.y, side, side);
    rectMode(CORNER);
    pop();
};
var drawSquares = function (point, side, step, minSize, direction) {
    if (side < minSize) {
        drawSquare(point, minSize);
        return;
    }
    push();
    drawSquare(point, side);
    drawSquares(point.add(direction), side - step, step, minSize, direction);
    pop();
};
var Vector2D = (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2D.prototype.add = function (another) {
        return new Vector2D(this.x + another.x, this.y + another.y);
    };
    Vector2D.prototype.scale = function (factor) {
        return new Vector2D(this.x * factor, this.y * factor);
    };
    return Vector2D;
}());
var PolarPoint = (function () {
    function PolarPoint(r, angle) {
        this.r = r;
        this.angle = angle;
    }
    return PolarPoint;
}());
var w = 1;
var cells;
var generation = 0;
var ruleset = [0, 0, 0, 1, 1, 1, 1, 0];
function rules(a, b, c) {
    if (a == 1 && b == 1 && c == 1)
        return ruleset[0];
    if (a == 1 && b == 1 && c == 0)
        return ruleset[1];
    if (a == 1 && b == 0 && c == 1)
        return ruleset[2];
    if (a == 1 && b == 0 && c == 0)
        return ruleset[3];
    if (a == 0 && b == 1 && c == 1)
        return ruleset[4];
    if (a == 0 && b == 1 && c == 0)
        return ruleset[5];
    if (a == 0 && b == 0 && c == 1)
        return ruleset[6];
    if (a == 0 && b == 0 && c == 0)
        return ruleset[7];
    return 0;
}
function generate() {
    var nextgen = Array(cells.length);
    for (var i = 1; i < cells.length - 1; i++) {
        var left = cells[i - 1];
        var me = cells[i];
        var right = cells[i + 1];
        nextgen[i] = rules(left, me, right);
    }
    cells = nextgen;
    generation++;
}
var FlowFieldsSketch = (function () {
    function FlowFieldsSketch() {
    }
    FlowFieldsSketch.prototype.drawLine = function (x, y, spacing, length, grid) {
        beginShape();
        for (var i = 0; i < length; i++) {
            var xOffset = x - this.leftX;
            var yOffset = y - this.topY;
            var columnIndex = floor(xOffset / this.resolution);
            var rowIndex = floor(yOffset / this.resolution);
            if (!inRange(rowIndex, columnIndex, grid))
                continue;
            stroke(random([0, 180]), 200, 255);
            vertex(x, y);
            var gridAngle = grid[rowIndex][columnIndex];
            var xStep = spacing * cos(gridAngle);
            var yStep = spacing * sin(gridAngle);
            x = x + xStep;
            y = y + yStep;
        }
        endShape();
    };
    FlowFieldsSketch.prototype.setup = function () {
        width = windowWidth;
        height = windowHeight;
        createCanvas(width, height);
        background(255);
        colorMode(HSB, 255);
        this.leftX = floor(width * -0.5);
        this.rightX = floor(width * 1.5);
        this.topY = floor(height * -0.5);
        this.bottomY = floor(height * 1.5);
        this.resolution = floor(width * 0.01);
        this.numColumns = (this.rightX - this.leftX) / this.resolution;
        this.numRows = (this.bottomY - this.topY) / this.resolution;
        var grid = [];
        for (var j = 0; j < this.numRows; j++) {
            var row = [];
            for (var i = 0; i < this.numColumns; i++) {
                var scaledX = i * 0.005;
                var scaledY = j * 0.005;
                var noiseValue = noise(scaledX, scaledY);
                var angle = map(noiseValue, 0.0, 1.0, 0.0, PI * 2.0);
                row.push(angle);
            }
            grid.push(row);
        }
        noFill();
        var choices = [];
        var steps = 10;
        for (var i = 1; i <= steps; i++) {
            choices.push((i * width) / steps);
        }
        for (var i = 0; i < 2000; i++) {
            var x = random(width);
            var y = random(height);
            this.drawLine(x, y, 1, 100, grid);
        }
    };
    FlowFieldsSketch.prototype.draw = function () { };
    return FlowFieldsSketch;
}());
var hypnoticSquaresSetup = function () {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL, 255);
    var c = color(map(214, 0, 360, 0, 255), 255, map(30, 0, 100, 0, 255));
    background(c);
    stroke(255);
    strokeWeight(2);
    noFill();
    var squareSide = width / 15;
    var rowCount = floor(height / squareSide) / 1.5;
    var columnCount = floor(width / squareSide) / 1.5;
    push();
    translate(width / 6 + squareSide / 2, height / 6 + squareSide / 2);
    for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < columnCount; j++) {
            var point_3 = new Vector2D(j * squareSide, i * squareSide);
            var side = squareSide;
            var step = side / 4;
            var minSize = 5;
            var direction = new Vector2D(random(-20, 20), random(-20, 20)).scale(step / (side - minSize));
            drawSquares(point_3, side, step, minSize, direction);
        }
    }
    pop();
};
var hypnoticSquaresDraw = function () { };
var PolarFlowSketch = (function () {
    function PolarFlowSketch() {
    }
    PolarFlowSketch.prototype.setup = function () {
    };
    PolarFlowSketch.prototype.draw = function () { };
    return PolarFlowSketch;
}());
var DiscSketch = (function () {
    function DiscSketch() {
    }
    DiscSketch.prototype.setup = function () {
        createCanvas(windowWidth, windowHeight);
        colorMode(HSL, 255);
        var c = color(map(214, 0, 360, 0, 255), 255, map(30, 0, 100, 0, 255));
        background(c);
        noFill();
        stroke(255);
        var center = { x: width / 2, y: height / 2 };
        drawDisc(center, random(50, 200));
        frame(750);
    };
    DiscSketch.prototype.draw = function () { };
    return DiscSketch;
}());
var factory = (function () { return new DiscSketch(); })();
var setup = function () { return factory.setup(); };
var draw = function () { return factory.draw(); };
//# sourceMappingURL=build.js.map