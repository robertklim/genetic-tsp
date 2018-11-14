const citiesNum = 5;
const populationNum = 100;

let cities = [];
let order = [];
let population = [];
let fitness = [];

bestDistance = Infinity;
bestOrder = [];

function calculateDistance(points, order) {
    let distance = 0;

    for (let i = 0; i < order.length - 1; i++) {
        cityA = points[order[i]];
        cityB = points[order[i + 1]];
        let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
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

    for (let i = 0; i < populationNum; i++) {
        population[i] = shuffle(order.slice()); // p5.js shuffle function
    }

    for (let i = 0; i < population.length; i++) {
        let dist = calculateDistance(cities, population[i]);
        if (dist < bestDistance) {
            bestDistance = dist;
            bestOrder = population[i];
        }
        fitness[i] = dist;
    }

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

}