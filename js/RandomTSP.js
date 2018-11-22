class RandomTSP {
    constructor(cities) {
        this.cities = cities.slice();
        this.bestDistance = this.calculateDistance(this.cities);
        this.bestOrder = this.cities;
        this.count = 1;
        this.bestIteration = 1;
    }

    calculateDistance(points) {
        let distance = 0;

        for (let i = 0; i < points.length - 1; i++) {
            let d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
            distance += d;
        }
        return distance;
    }

    draw() {
        fill(255);
        for (let i = 0; i < this.cities.length; i++) {
            ellipse(this.cities[i].x, this.cities[i].y, 4, 4);
        }

        // draw current cities order
        stroke(255);
        noFill();
        beginShape();
        for (let i = 0; i < this.cities.length; i++) {
            vertex(this.cities[i].x, this.cities[i].y);
        }
        endShape();

        // draw best cities order
        stroke(0, 255, 0);
        noFill();
        beginShape();
        for (let i = 0; i < this.cities.length; i++) {
            vertex(this.bestOrder[i].x, this.bestOrder[i].y);
        }
        endShape();

        let s = '\ncurrent iteration: ' + this.count;
        s += '\nbest iteration: ' + this.bestIteration;
        s += '\nshortest distance: ' + this.bestDistance.toFixed(2) + 'px';
        textSize(16);
        stroke(255);
        text(s, 0, 0);

    }

    run() {
        this.draw()

        let i = floor(random(this.cities.length));
        let j = floor(random(this.cities.length));
        swap(this.cities, i, j);

        let newDistance = this.calculateDistance(this.cities);
        if (newDistance < this.bestDistance) {
            this.bestDistance = newDistance;
            this.bestOrder = this.cities.slice();
            this.bestIteration = this.count;
        }
        this.count++;
    }

}