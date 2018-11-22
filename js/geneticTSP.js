class GeneticTSP {
    constructor(cities, populationNum, mutationRate) {
        this.populationNum = populationNum;
        this.mutationRate = mutationRate;

        this.cities = cities;
        this.order = [];
        this.population = [];
        this.fitness = [];

        this.bestDistance = Infinity;
        this.bestOrder = [];
        this.currentBestOrder = [];
    }

    calculateDistance(points, order) {
        let distance = 0;

        for (let i = 0; i < order.length - 1; i++) {
            let cityA = points[order[i]];
            let cityB = points[order[i + 1]];
            let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
            distance += d;
        }
        return distance;
    }

    pickOne(list, prob) {
        let index = 0;
        let r = random(1);
        while (r > 0) {
            r = r - prob[index];
            index++;
        }
        index--;
        return list[index].slice();
    }

    calculateFitness() {
        let currentBestDistance = Infinity;
        for (let i = 0; i < this.population.length; i++) {
            let dist = this.calculateDistance(this.cities, this.population[i]);
            if (dist < this.bestDistance) {
                this.bestDistance = dist;
                this.bestOrder = this.population[i];
            }
            if (dist < currentBestDistance) {
                currentBestDistance = dist;
                this.currentBestOrder = this.population[i];
            }
            this.fitness[i] = 1 / (dist + 1); // higher the distance lower the fitness
        }
    }

    normalizeFitness() {
        let sum = 0;
        for (let i = 0; i < this.fitness.length; i++) {
            sum += this.fitness[i];
        }
        for (let i = 0; i < this.fitness.length; i++) {
            this.fitness[i] = this.fitness[i] / sum;
        }
    }

    mutate(order, mutationRate) {
        for (let i = 0; i < this.cities.length; i++) {
            if (random(1) < mutationRate) {
                let indexA = floor(random(order.length));
                let indexB = (indexA + 1) % this.cities.length;
                swap(order, indexA, indexB);
            }
        }
    }

    crossOver(orderA, orderB) {
        let start = floor(random(orderA.length));
        let end = floor(random(start + 1, orderA.length));
        let newOrder = orderA.slice(start, end);

        let left = this.cities.length - newOrder.length;

        for (let i = 0; i < orderB.length; i++) {
            let city = orderB[i];
            if (!newOrder.includes(city)) {
                newOrder.push(city);
            }
        }
        return newOrder;
    }

    nextGeneration() {
        let newPopulation = [];
        for (let i = 0; i < this.population.length; i++) {
            let orderA = this.pickOne(this.population, this.fitness);
            let orderB = this.pickOne(this.population, this.fitness);
            let order = this.crossOver(orderA, orderB);
            this.mutate(this.order, this.mutationRate);
            newPopulation[i] = order;
        }
        this.population = newPopulation;
    }

    generatePopulation() {
        for (let i = 0; i < this.populationNum; i++) {
            this.population[i] = shuffle(this.order.slice()); // p5.js shuffle function
        }
    }

    generateOrder() {
        for (let i = 0; i < this.cities.length; i++) {
            this.order[i] = i;
        }
    }

    draw() {
        // draw cities
        fill(255);
        for (let i = 0; i < this.cities.length; i++) {
            ellipse(this.cities[i].x, this.cities[i].y, 4, 4);
        }

        // draw current cities order
        stroke(255);
        noFill();
        beginShape();
        for (let i = 0; i < this.currentBestOrder.length; i++) {
            let index = this.currentBestOrder[i];
            vertex(this.cities[index].x, this.cities[index].y);
        }
        endShape();

        // draw best cities order
        stroke(0, 255, 0);
        noFill();
        beginShape();
        for (let i = 0; i < this.bestOrder.length; i++) {
            let index = this.bestOrder[i];
            vertex(this.cities[index].x, this.cities[index].y);
        }
        endShape();
    }

    run() {
        this.generateOrder();
        this.generatePopulation();
        this.calculateFitness();
        this.normalizeFitness();
        this.nextGeneration();
        this.draw();
    }

}