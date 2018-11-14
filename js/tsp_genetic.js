const citiesNum = 5;
const populationNum = 10;

let cities = [];
let population = [];

function setup() {
    createCanvas(600, 600);

    let order = [];

    for (let i = 0; i < citiesNum; i++) {
        let v = createVector(random(width), random(height));
        cities[i] = v;
        order[i] = i;
    }

    for (let i = 0; i < populationNum; i++) {
        population[i] = shuffle(order.slice()); // p5.js shuffle function
    }
    console.log(population);

}