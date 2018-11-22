class LexicographicOrderingTSP {
    constructor(cities) {
        this.cities = cities;
        this.bestDistance = Infinity;
        this.order = [];
        this.bestOrder = [];
        this.generateOrder();
        this.bestOrder = this.order;
        this.count = 1;
        this.bestIteration = 1;
        factorial(cities.length);
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

    generateOrder() {
        for (let i = 0; i < this.cities.length; i++) {
            this.order[i] = i;
        }
    }

    nextOrder() {
        // STEP 1 of the algorithm
        // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
        let largestI = -1;
        for (let i = 0; i < this.order.length - 1; i++) {
            if (this.order[i] < this.order[i + 1]) {
                largestI = i;
            }
        }
        if (largestI == -1) {
            noLoop();
        }

        // STEP 2
        var largestJ = -1;
        for (let j = 0; j < this.order.length; j++) {
            if (this.order[largestI] < this.order[j]) {
                largestJ = j;
            }
        }

        // STEP 3
        swap(this.order, largestI, largestJ);

        // STEP 4: reverse from largestI + 1 to the end
        let endArray = this.order.splice(largestI + 1);
        endArray.reverse();
        this.order = this.order.concat(endArray);
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
        for (let i = 0; i < this.order.length; i++) {
            let index = this.order[i];
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

        let s = '\nLexicographicOrderingTSP';
        s += '\ntotal permutations: ' + f[this.cities.length];
        s += '\ncurrent: ' + this.count;
        s += '\ndone: ' + (this.count / f[this.cities.length] * 100).toFixed(2) + '%';
        s += '\nbest iteration: ' + this.bestIteration;
        s += '\nshortest distance: ' + this.bestDistance.toFixed(2) + 'px';
        textSize(16);
        stroke(255);
        text(s, 0, 0);

        // console.log(this.cities);
        // console.log(this.order);
        // console.log(this.bestOrder);
    }

    run() {
        this.draw();

        let newDistance = this.calculateDistance(this.cities, this.order);
        if (newDistance < this.bestDistance) {
            this.bestDistance = newDistance;
            this.bestOrder = this.order.slice();
            this.bestIteration = this.count;
        }

        this.nextOrder();
        this.count++;
    }

}