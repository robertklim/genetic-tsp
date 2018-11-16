const citiesNum = 12;
const populationNum = 300;
const mutationRate = 0.1;

let cities = [];
let order = [];
let population = [];
let fitness = [];

let bestDistance = Infinity;
let bestOrder = [];
let currentBestOrder = [];

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

function pickOne(list, prob) {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function calculateFitness() {
    let currentBestDistance = Infinity;
    for (let i = 0; i < population.length; i++) {
        let dist = calculateDistance(cities, population[i]);
        if (dist < bestDistance) {
            bestDistance = dist;
            bestOrder = population[i];
        }
        if (dist < currentBestDistance) {
            currentBestDistance = dist;
            currentBestOrder = population[i];
        }
        fitness[i] = 1 / (dist + 1); // higher the distance lower the fitness
    }
}

function normalizeFitness() {
    let sum = 0;
    for (let i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

function mutate(order, mutationRate) {
    for (let i = 0; i < citiesNum; i++) {
        if (random(1) < mutationRate) {
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % citiesNum;
            swap(order, indexA, indexB);
        }
    }
}

function crossOver(orderA, orderB) {
    let start = floor(random(orderA.length));
    let end = floor(random(start + 1, orderA.length));
    let newOrder = orderA.slice(start, end);

    let left = citiesNum - newOrder.length;

    for (i = 0; i < orderB.length; i++) {
        let city = orderB[i];
        if(!newOrder.includes(city)) {
            newOrder.push(city);
        }
    }
    return newOrder;
}

function nextGeneration() {
    let newPopulation = [];
    for (let i = 0; i < population.length; i++) {
        let orderA = pickOne(population, fitness);
        let orderB = pickOne(population, fitness);
        let order = crossOver(orderA, orderB);
        mutate(order, mutationRate);
        newPopulation[i] = order;
    }
    population = newPopulation;
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

}

function draw() {
    background(0);

    calculateFitness();
    normalizeFitness();
    nextGeneration();

    // draw cities
    fill(255);
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 4, 4);
    }

    // draw current cities order
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < currentBestOrder.length; i++) {
        let index = currentBestOrder[i];
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