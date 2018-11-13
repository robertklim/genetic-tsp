const citiesNum = 10

let cities = [];
let bestDistance;
let bestOrder = [];
let order = [];
let count = 0;

function swap(a, i, j) {
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}

function calculateDistance(points) {
    let distance = 0;

    for (let i = 0; i < points.length - 1; i++) {
        let d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
        distance += d;
    }
    return distance;
}

function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < citiesNum; i++) {
        let v = createVector(random(width), random(height));
        cities[i] = v;
        order[i] = i;
    }

    bestDistance = calculateDistance(cities);
    bestOrder = cities.slice();

}

function draw() {
    background(0);

    // draw cities
    fill(255);
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 4, 4);
    }

    // draw current cities order
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y);
    }
    endShape();

    // draw best cities order
    stroke(0, 255, 0);
    noFill();
    beginShape();
    for (let i = 0; i < cities.length; i++) {
        vertex(bestOrder[i].x, bestOrder[i].y);
    }
    endShape();

    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    swap(cities, i, j);

    let newDistance = calculateDistance(cities);
    if(newDistance < bestDistance) {
        bestDistance = newDistance;
        bestOrder = cities.slice();
        console.log(bestDistance);
    }

    let s = '';
    for (let i = 0; i < order.length; i++) {
        s += order[i];
    }
    textSize(32);
    stroke(255);
    fill(255);
    text(s, 40, height - 40);

    nextOrder();

}

// This is my lexical order algorithm

function nextOrder() {
    count++;

    // STEP 1 of the algorithm
    // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    var largestI = -1;
    for (var i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i + 1]) {
            largestI = i;
        }
    }
    if (largestI == -1) {
        noLoop();
        console.log('finished');
    }

    // STEP 2
    var largestJ = -1;
    for (var j = 0; j < order.length; j++) {
        if (order[largestI] < order[j]) {
            largestJ = j;
        }
    }

    // STEP 3
    swap(order, largestI, largestJ);

    // STEP 4: reverse from largestI + 1 to the end
    var endArray = order.splice(largestI + 1);
    endArray.reverse();
    order = order.concat(endArray);
}