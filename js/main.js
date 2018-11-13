const citiesNum = 5

let cities = [];
let bestDistance;
let bestOrder = [];
let order = [];
let count = 1;

var f = [];
function factorial(n) {
    if (n == 0 || n == 1)
        return 1;
    if (f[n] > 0)
        return f[n];
    return f[n] = factorial(n - 1) * n;
}

function swap(a, i, j) {
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}

function calculateDistance(points, order) {
    let distance = 0;

    for (let i = 0; i < order.length - 1; i++) {
        cityA = points[order[i]];
        cityB = points[order[i+1]];
        let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        distance += d;
    }
    return distance;
}

function setup() {
    createCanvas(600, 600);

    factorial(citiesNum);

    for (let i = 0; i < citiesNum; i++) {
        let v = createVector(random(width), random(height));
        cities[i] = v;
        order[i] = i;
    }

    bestDistance = calculateDistance(cities, order);
    bestOrder = order.slice();

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
    for (let i = 0; i < order.length; i++) {
        let index = order[i];
        vertex(cities[index].x, cities[index].y);
    }
    endShape();

    // draw best cities order
    stroke(0, 255, 0);
    noFill();
    beginShape();
    for (let i = 0; i < bestOrder.length; i++) {
        index = bestOrder[i];
        vertex(cities[index].x, cities[index].y);
    }
    endShape();

    //let i = floor(random(cities.length));
    //let j = floor(random(cities.length));
    //swap(cities, i, j);

    let newDistance = calculateDistance(cities, order);
    if(newDistance < bestDistance) {
        bestDistance = newDistance;
        bestOrder = order.slice();
        console.log(bestDistance);
    }

    let s = 'current order: ';
    for (let i = 0; i < order.length; i++) {
        s += order[i];
    }
    s += '\nbest order: ';
    for (let i = 0; i < bestOrder.length; i++) {
        s += bestOrder[i];
    }
    s += '\nbest distance: ' + bestDistance.toFixed(2);
    s += '\ntotal permutations: ' + f[citiesNum];
    s += '\ncurrent: ' + count;
    s += '\ndone: ' + (count / f[citiesNum] * 100).toFixed(2) + '%';
    textSize(16);
    stroke(255);
    text(s, 40, height - 140);

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