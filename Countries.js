/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

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
        this.estaEncima = false;

        this.miColorNormal = color(255, 150, 100, 150);
        this.miColorOver = color(255);
        
        this.arrayOfpoints = [];
        this.myCountryISO = "NaN";
        //this.arrayOfYears = ["2020", "2019", "2018", "2017", "2016"];
        this.arrayOfData = [];

        this.numYears = 13; // for the distribution of the points in Xs
        // this.stepX = (windowWidth - 150) / this.numYears;
        this.stepX = (windowWidth / 2) / this.numYears;
        this.xBorder = 25;

    }


    calculatePoints(lineaBase) {
        console.log("length: " + this.arrayOfData.length);

        for (let year = 0; year < this.arrayOfData.length; year++) {
            let secX = this.xBorder + (year) * this.stepX;
            console.log(secX);
            // secX = 50;
            let secY = map(this.arrayOfData[year], 80, 150, lineaBase, 150);
            let currentPoint = createVector(secX, secY);
            this.arrayOfpoints.push(currentPoint);
        }

        console.log("arrayOfpoints" + this.arrayOfpoints);

        // if(this.myCode === "DEU") {
        //     this.selected=true;
        // }
    };

    calculatePoints2(lineaBase) {
        console.log("length: " + this.arrayOfData.length);

        for (let year = 0; year < this.arrayOfData.length; year++) {
            let secX = this.xBorder + (year) * this.stepX;
            console.log(secX);
            // secX = 50;
            let secY = map(this.arrayOfData[year], 80, 150, lineaBase, 150);
            let currentPoint = createVector(secX, secY);
            this.arrayOfpoints.push(currentPoint);
        }

        console.log("arrayOfpoints" + this.arrayOfpoints);

        // if(this.myCode === "DEU") {
        //     this.selected=true;
        // }
    };


    drawCountryGDP() {

        for (let year = 0; year < this.arrayOfData.length; year++) {
            if (this.overMe || this.selected) {
                fill(this.miColorOver);
                stroke(this.miColorOver);
                strokeWeight(3);
            } else {
                fill(this.miColorNormal);
                stroke(this.miColorNormal);
                strokeWeight(1);
            }

            ellipse(this.arrayOfpoints[year].x, this.arrayOfpoints[year].y, 3, 3);
            stroke(this.miColorNormal);
            if (year > 0) line(this.arrayOfpoints[year - 1].x, this.arrayOfpoints[year - 1].y, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y);

            if (this.selected) {
                fill(200);
                noStroke();
                textSize(18);
                text(this.myCode, this.arrayOfpoints[this.arrayOfData.length - 1].x + 5, this.arrayOfpoints[this.arrayOfData.length - 1].y);
            }

        }

    };






    display(myX, myY) {
        this.estaEncima = mouseX > myX && mouseX < myX + this.myWidth &&
            mouseY > myY - this.mySize && mouseY < myY;

        noStroke();
        fill(this.myColorIncome);
        rect(myX, myY, this.myWidth, -this.mySize);

        if (this.estaEncima) {
            this.myColorConsume = color(50, 150, 55, 150);
            fill(200);
            text(this.myValue, myX, myY + 30);
            text(this.myCountry, myX, myY + 15);
            text(this.myCountryISO, myX + 30, myY + 15);
        } else { this.myColorConsume = color(50, 150, 55); }
    } // end of display



    display2(myX, myY) {
        this.estaEncima = mouseX > myX && mouseX < myX + this.myWidth &&
            mouseY > myY - this.mySize && mouseY < myY;

        noStroke();
        fill(this.myColorConsume);
        rect(myX, myY, this.myWidth, -this.mySize);

        if (this.estaEncima) {
            this.myColorIncome = color(150, 50, 55, 150);
            fill(200);
            text(this.myValue, myX, myY + 30);
            text(this.myCountry, myX, myY + 15);
            text(this.myCountryISO, myX + 30, myY + 15);
        } else { this.myColorIncome = color(150, 50, 55); }
    } // end of display

}  // end of class