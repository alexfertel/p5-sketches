var polarToCartesian = function (polarPoint) {
    return new Vector2D(polarPoint.r * cos(polarPoint.angle), polarPoint.r * sin(polarPoint.angle));
};
var cartesianToPolar = function (vector) {
    return new PolarPoint(sqrt(vector.x * vector.x + vector.y * vector.y), atan2(vector.y, vector.x));
};
var insideCircleBounds = function (point, circle) {
    return dist(point.x, point.y, circle.center.x, circle.center.y) < circle.radius;
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
    Vector2D.prototype.sub = function (another) {
        return new Vector2D(this.x - another.x, this.y - another.y);
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
var CliffordAttractorSketch = (function () {
    function CliffordAttractorSketch() {
    }
    CliffordAttractorSketch.prototype.setup = function () {
        createCanvas(windowWidth, windowHeight);
        this.points = [];
        for (var y = 0; y < height; y += 5) {
            this.points.push({
                x: 0,
                y: y,
                vx: 0,
                vy: 0
            });
        }
        this._a = random() * 4 - 2;
        this._b = random() * 4 - 2;
        this._c = random() * 4 - 2;
        this._d = random() * 4 - 2;
    };
    CliffordAttractorSketch.prototype.draw = function () {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            var value = this.getValue({ x: p.x, y: p.y });
            p.vx += Math.cos(value) * 0.3;
            p.vy += Math.sin(value) * 0.3;
            beginShape();
            vertex(p.x, p.y);
            p.x += p.vx;
            p.y += p.vy;
            vertex(p.x, p.y);
            endShape();
            p.vx *= 0.99;
            p.vy *= 0.99;
            if (p.x > width)
                p.x = 0;
            if (p.y > height)
                p.y = 0;
            if (p.x < 0)
                p.x = width;
            if (p.y < 0)
                p.y = height;
        }
    };
    CliffordAttractorSketch.prototype.getValue = function (point) {
        var scale = 0.005;
        var x = (point.x - width / 2) * scale;
        var y = (point.y - height / 2) * scale;
        var x1 = sin(this._a * y) + this._c * cos(this._a * x);
        var y1 = sin(this._b * y) + this._d * cos(this._b * x);
        return atan2(y1 - y, x1 - x);
    };
    return CliffordAttractorSketch;
}());
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
    FlowFieldsSketch.prototype.initVars = function () {
        this.leftX = floor(width * -0.5);
        this.rightX = floor(width * 1.5);
        this.topY = floor(height * -0.5);
        this.bottomY = floor(height * 1.5);
        this.resolution = floor(width * 0.01);
        this.numColumns = (this.rightX - this.leftX) / this.resolution;
        this.numRows = (this.bottomY - this.topY) / this.resolution;
    };
    FlowFieldsSketch.prototype.initPerlinNoise = function () {
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
        return grid;
    };
    FlowFieldsSketch.prototype.renderFlowField = function (grid) {
        for (var j = 0; j < this.numRows; j++) {
            for (var i = 0; i < this.numColumns; i++) {
                var v = p5.Vector.fromAngle(grid[j][i], 5);
                var vx = v.x;
                var vy = v.y;
                noFill();
                stroke(0);
                push();
                translate(i * 5, j * 5);
                line(0, 0, vx, vy);
                pop();
            }
        }
    };
    FlowFieldsSketch.prototype.renderLines = function (grid) {
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
    FlowFieldsSketch.prototype.setup = function () {
        createCanvas(windowWidth, windowHeight);
        background(255);
        colorMode(HSB, 255);
        this.initVars();
        var grid = this.initPerlinNoise();
        this.renderFlowField(grid);
        this.renderLines(grid);
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
var SinksSketch = (function () {
    function SinksSketch() {
        this.lineSize = 30;
        this.stepSize = 1;
        this.sinks = [];
    }
    SinksSketch.prototype.setup = function () {
        createCanvas(windowWidth, windowHeight);
        colorMode(HSB, 255);
        background(255);
        noFill();
        this.sinks.push({ center: new Vector2D(width / 2, height / 2), radius: random(50, 200) });
        this.render(20000);
    };
    SinksSketch.prototype.render = function (pointCount) {
        while (pointCount > 0) {
            var p = new Vector2D(random(width), random(height));
            this.drawLine(p, this.lineSize);
            pointCount--;
        }
    };
    SinksSketch.prototype.drawLine = function (point, length) {
        var hue = map(point.x * sin(point.x), -point.x, point.x, 130, 180);
        var c = color(hue, 180, 255);
        stroke(c);
        beginShape();
        while (length > 0) {
            var value = this.getValue(point);
            curveVertex(point.x, point.y);
            var xStep = this.stepSize * cos(value);
            var yStep = this.stepSize * sin(value);
            point.x += xStep;
            point.y += yStep;
            length--;
        }
        endShape();
    };
    SinksSketch.prototype.getValue = function (point) {
        for (var i = 0; i < this.sinks.length; i++) {
            if (insideCircleBounds(point, this.sinks[i])) {
                var polar = cartesianToPolar(point.sub(this.sinks[i].center));
                return polar.angle - PI / 2;
            }
        }
        var scaledX = point.x * 0.005;
        var scaledY = point.y * 0.005;
        var noiseValue = noise(scaledX, scaledY);
        var angle = map(noiseValue, 0.0, 1.0, 0.0, PI * 2.0);
        return angle;
    };
    SinksSketch.prototype.draw = function () { };
    return SinksSketch;
}());
var StarSystemSketch = (function () {
    function StarSystemSketch() {
        this._padding = 20;
    }
    StarSystemSketch.prototype.setup = function () {
        createCanvas(windowWidth, windowHeight);
        this._spaceColor = color("#222831");
        this._frameColor = color("#eae7d9");
        this._orbitTrajectoryColor = color("#ffecc7");
        this._planetPalette = [
            color("#f79071"),
            color("#fa744f"),
            color("#16817a"),
            color("#ffb6b6"),
            color("#00bdaa"),
            color("#fe346e"),
            color("#d7fffd"),
            color("#024249")
        ];
        this._starPalette = [
            color("#fdd998"),
            color("#fae7cb"),
            color("#ffb385"),
            color("#ff7272")
        ];
        colorMode(HSB, 255);
        this._canvasWidth = width - this._padding * 2;
        this._canvasHeight = height - this._padding * 2;
        this.sunDiameter = random(500, 1000);
        this.sunRadius = this.sunDiameter / 2;
        this.sunCenter = new Vector2D(random(width), height);
        this.drawSpace();
        this.drawSun();
        var planetCount = 7;
        var displacement = 200;
        for (var i = 0; i < planetCount; i++) {
            var radius = 250 + i * displacement + this._padding;
            this.drawOrbit(radius, "arc");
            push();
            translate(this.sunCenter.x, this.sunCenter.y);
            rotate(PI);
            var distance = this.sunRadius + radius / 2;
            stroke(random(255), 255, 255);
            var angle = random(QUARTER_PI, PI - QUARTER_PI);
            var center = new Vector2D(distance * cos(angle), distance * sin(angle));
            var planet = { center: center, radius: random(20, 80) };
            this.drawPlanet(planet);
            pop();
        }
        this.drawFrame();
        this.drawNoise();
    };
    StarSystemSketch.prototype.drawPlanet = function (planet) {
        push();
        noStroke();
        fill(random(this._planetPalette));
        circle(planet.center.x, planet.center.y, planet.radius);
        pop();
    };
    StarSystemSketch.prototype.drawSpace = function () {
        push();
        noStroke();
        fill(this._spaceColor);
        rect(this._padding, this._padding, this._canvasWidth, this._canvasHeight);
        for (var i = 0; i < 7500; i++) {
            stroke(color(255, random(0, 150)));
            point(random(width), random(height));
        }
        pop();
    };
    StarSystemSketch.prototype.drawOrbit = function (scaleFactor, type) {
        stroke(this._orbitTrajectoryColor);
        if (type === "arc") {
            noFill();
            this.drawEllipse(this.sunCenter, this.sunDiameter + scaleFactor, this.sunDiameter + scaleFactor, 30);
        }
        else {
            console.log("Not an arc");
        }
    };
    StarSystemSketch.prototype.drawEllipse = function (center, width, height, arcCount) {
        var angularVelocity = PI / arcCount;
        var angle = 0;
        while (angle < TWO_PI) {
            arc(center.x, center.y, width, height, angle, angle + angularVelocity / 2);
            angle += angularVelocity;
        }
    };
    StarSystemSketch.prototype.drawSun = function () {
        noStroke();
        var c = random(this._starPalette);
        fill(c);
        circle(this.sunCenter.x, this.sunCenter.y, this.sunDiameter);
    };
    StarSystemSketch.prototype.drawFrame = function () {
        noStroke();
        var c = this._frameColor;
        fill(c);
        rect(0, 0, width, this._padding);
        rect(0, 0, this._padding, height);
        rect(width - this._padding, 0, this._padding, height);
        rect(0, height - this._padding, width, this._padding);
    };
    StarSystemSketch.prototype.drawNoise = function () {
        for (var i = 0; i < width; i++)
            for (var j = 0; j < width; j++) {
                stroke(0, map(random(), 0, 1, 0, 100));
                point(i, j);
            }
    };
    StarSystemSketch.prototype.draw = function () { };
    return StarSystemSketch;
}());
var factory = (function () { return new StarSystemSketch(); })();
var setup = function () { return factory.setup(); };
var draw = function () { return factory.draw(); };
//# sourceMappingURL=build.js.map