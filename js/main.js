const citiesNum = 7;
const populationNum = 300;
const mutationRate = 0.1;

let cities = [];
let genetic;

function setup() {
    createCanvas(1200, 800);

    for (let i = 0; i < citiesNum; i++) {
        let v = createVector(floor(random(20, width / 2 - 20)), floor(random(50, height / 2 - 20)));
        cities[i] = v;
    }

    geneticTSP = new GeneticTSP(cities, populationNum, mutationRate);
    lexicographicOrderingTSP = new LexicographicOrderingTSP(cities);

}

function draw() {
    background(0);

    geneticTSP.run();

    translate(floor(width / 2), 0);
    lexicographicOrderingTSP.run();

}