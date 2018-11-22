const citiesNum = 10;
const populationNum = 300;
const mutationRate = 0.1;

let cities = [];
let genetic;

function setup() {
    createCanvas(1200, 800);

    for (let i = 0; i < citiesNum; i++) {
        let v = createVector(floor(random(width / 2)), floor(random(height / 2)));
        cities[i] = v;
    }

    geneticTSP = new GeneticTSP(cities, populationNum, mutationRate);

}

function draw() {
    background(0);

    geneticTSP.run();

}