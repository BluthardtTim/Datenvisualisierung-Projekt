

class Country {
    constructor() {
        this.myCountry = "NaN";
        this.myValue = 0;
        this.myLocation = "NaN";
        this.myCountry2 = "NaN";
        this.myTime = 0;
        this.mySize = 0;
        this.myWidth = 25;
        this.myColorConsume = color(50, 150, 55);
        this.myColorIncome = color(150, 50, 55);

        this.overMe = false;

        this.colorRed = color(220,245,139);
        this.colorGreen = color(250,92,148);
        this.miColorOver = color(50);
        
        this.arrayOfpoints = [];
        this.arrayOfpoints2 = [];
        this.myCountryISO = "NaN";
        //this.arrayOfYears = ["2020", "2019", "2018", "2017", "2016"];
        this.arrayOfData = [];
        this.arrayOfData2 = [];

        this.numYears = 13; // for the distribution of the points in Xs
        // this.stepX = (windowWidth - 150) / this.numYears;
        this.stepX = (windowWidth / 2 - 100) / this.numYears;
        this.xBorder = 100;

    }
    


    calculatePoints(lineaBase) {
        // console.log("length: " + this.arrayOfData.length);

        for (let year = 0; year < this.arrayOfData.length; year++) {
            let secX = this.xBorder + (year) * this.stepX;
            let secY = map(this.arrayOfData[year], 80, 150, lineaBase, 100);
            let currentPoint = createVector(secX, secY);
            this.arrayOfpoints.push(currentPoint);
        }

        // console.log("arrayOfpoints" + this.arrayOfpoints);

    };

    calculatePoints2(lineaBase) {
        // console.log("length: " + this.arrayOfData2.length);

        for (let year2 = 0; year2 < this.arrayOfData2.length; year2++) {
            let secX2 = this.xBorder + (year2) * this.stepX;
            let secY2 = map(this.arrayOfData2[year2], 80, 150, lineaBase, 100);
            let currentPoint = createVector(secX2, secY2);
            this.arrayOfpoints2.push(currentPoint);
        }

        // console.log("arrayOfpoints2" + this.arrayOfpoints2);

    
    };


    drawCountryGDP() {
        for (let year = 0; year < this.arrayOfData.length; year++) {
            // if (this.arrayOfData[year].myCountryISO === "DEU") {
            if (this.overMe || this.selected) {
                // fill(this.miColorOver);
                // stroke(this.miColorOver);
                strokeWeight(2);
            } else {
                fill(this.colorRed);
                stroke(this.colorRed);
                strokeWeight(2);
            }

            if(selectedCountry != 'HHH'){
            ellipse(this.arrayOfpoints[year].x, this.arrayOfpoints[year].y, 3, 3);
            stroke(this.colorRed);
            if (year > 0) line(this.arrayOfpoints[year - 1].x, this.arrayOfpoints[year - 1].y, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y);

            if (this.selected) {
                fill(200);
                noStroke();
                textSize(18);
                text(this.myCode, this.arrayOfpoints[this.arrayOfData.length - 1].x + 5, this.arrayOfpoints[this.arrayOfData.length - 1].y);

            } else {
                textSize(12);
                fill(100);
                noStroke();
                text (2011 + year, this.arrayOfpoints[year].x - 15, baseLine + 20);
                text (80, this.xBorder - 30, baseLine);
               
            }}

        }
        this.isOverMe();

    };


    drawCountryGDP2() {
        // this.isOverMe2();

        for (let year2 = 0; year2 < this.arrayOfData2.length; year2++) {
            if (this.overMe2 || this.selected) {
                fill(this.miColorOver);
                stroke(this.miColorOver);
                strokeWeight(2);
            } else {
                fill(this.colorGreen);
                stroke(this.colorGreen);
                strokeWeight(2);
            }

            if(selectedCountry != 'HHH'){
            ellipse(this.arrayOfpoints2[year2].x, this.arrayOfpoints2[year2].y, 3, 3);
            stroke(this.colorGreen);
            if (year2 > 0) line(this.arrayOfpoints2[year2 - 1].x, this.arrayOfpoints2[year2 - 1].y, this.arrayOfpoints2[year2].x, this.arrayOfpoints2[year2].y);

            if (this.selected) {
                fill(200);
                noStroke();
                textSize(18);
                text(this.myCode, this.arrayOfpoints2[this.arrayOfData2.length - 1].x + 5, this.arrayOfpoints2[this.arrayOfData2.length - 1].y);
            }}

        }

    };

    

    isOverMe() {
        let ifAny = false;
        let distances = []; // Array für die Abstände zu den Linien
    
        // Berechnen der Abstände zu den Linien
        for (let year = 0; year < this.arrayOfData.length; year++) {
            let distance = dist(mouseX, mouseY, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y);
            distances.push(distance);
        }
        for (let year = 0; year < this.arrayOfData.length; year++) {
            let distance = distances[year];
            if (distance < 300 && mouseY > 200 && mouseY < baseLine && mouseX > this.arrayOfpoints[year].x - this.stepX / 2 && mouseX < this.arrayOfpoints[year].x + this.stepX / 2) {
                
                
                fill(250);
                textSize(12);
                text(this.arrayOfData[year].substring(0,5) + "  INDEX", this.arrayOfpoints[year].x + 10, this.arrayOfpoints[year].y + 50);
                text(this.arrayOfData2[year] + "  INDEX", this.arrayOfpoints[year].x + 10, this.arrayOfpoints[year].y + 70);
                strokeWeight(1.5);
                stroke('orange');
                line(this.arrayOfpoints[year].x, 200, this.arrayOfpoints[year].x, baseLine);
                fill(255);
                textSize(12);
                noStroke();
                text (2011 + year, this.arrayOfpoints[year].x - 15, baseLine + 20);

                sliderValue = year;
                ifAny = true;
            } else {cursor('default')}
            }
        
        this.overMe = ifAny;
    };
    
    
    // isOverMe2 () {
    //     let ifAny2 = false;
    //     for (let year = 0; year < this.arrayOfData2.length; year++) {
    //         let distance = dist(mouseX, mouseY, this.arrayOfpoints2[year].x, this.arrayOfpoints2[year].y);
    //         if (distance < 5 ) {
    //             fill(200);
    //             textSize(24);
    //             text( (this.arrayOfData2[year]) + "  INDEX", this.arrayOfpoints2[year].x, this.arrayOfpoints2[year].y-70);
    //             ifAny2 = true;
    //         }
    //     }
    //     this.overMe2 = ifAny2;
    // };

    clickOverMe () {
        for (let year = 0; year < this.arrayOfData.length; year++) {
            let distance = dist(mouseX, mouseY, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y);
            if (distance < 5) this.selected = !this.selected;
        }
    }

}  // end of class