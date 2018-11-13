const citiesNum = 20;

let cities = [];
let bestDistance;

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
    }

    bestDistance = calculateDistance(cities);

}

function draw() {
    background(0);

    fill(255);
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 4, 4);
    }

    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y);
    }
    endShape();

    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    swap(cities, i, j);

    let newDistance = calculateDistance(cities);
    if(newDistance < bestDistance) {
        bestDistance = newDistance;
        console.log(bestDistance);
    }

}