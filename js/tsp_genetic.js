const citiesNum = 10;
const populationNum = 300;

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

function swap(a, i, j) {
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
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
    for (let i = 0; i < population.length; i++) {
        let dist = calculateDistance(cities, population[i]);
        if (dist < bestDistance) {
            bestDistance = dist;
            bestOrder = population[i];
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
    let indexA = floor(random(order.length));
    let indexB = floor(random(order.length));
    swap(order, indexA, indexB);
}

function nextGeneration() {
    let newPopulation = [];
    for (let i = 0; i < population.length; i++) {
        let order = pickOne(population, fitness);
        mutate(order);
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
    // stroke(255);
    // noFill();
    // beginShape();
    // for (let i = 0; i < order.length; i++) {
    //     let index = order[i];
    //     vertex(cities[index].x, cities[index].y);
    // }
    // endShape();

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