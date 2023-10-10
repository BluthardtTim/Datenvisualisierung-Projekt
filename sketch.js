/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let incomeData;
let myIncome = [];

let consumData;
let myConsum = [];

function preload() {

    // incomeData = loadTable('data/Deutschland.csv', 'csv', 'header');

    incomeData = loadTable('data2/EinkommenEu.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i = 0;
    let t = 0;

    // Einkommen der Eu Länder
    for (let myRow of incomeData.rows) {
        let currentCountry2 = new Country();

        currentCountry2.myCountryArea = myRow.get('Value');
        if (currentCountry2.myCountryArea > 60) {
            currentCountry2.myCountry = myRow.get('LOCATION');
            currentCountry2.myLocation = myRow.get('LOCATION');
            currentCountry2.mySize = map(currentCountry2.myCountryArea, 17098250, 50, 50000, 50); // [17 098 250,50]

            if (currentCountry2.myLocation === "DEU") {
                myIncome[t] = currentCountry2;
                t++;
            }
        }
    }

    // Consum der Eu Länder
    for (let myRow of consumData.rows) {
        let currentCountry = new Country();

        currentCountry.myCountryArea = myRow.get('Value');
        if (currentCountry.myCountryArea > 10000) {
            currentCountry.myCountry = myRow.get('LOCATION');
            currentCountry.myCountryISO = myRow.get('TIME');
            currentCountry.mySize = map(currentCountry.myCountryArea, 17098250, 50, 70000, 50); // [17 098 250,50]

            if (currentCountry.myLocation === "DEU")
                currentCountry.myColor = color(200, 100, 100);

            myConsum[i] = currentCountry;
            i++;
        }
    }
}


function draw() {
    background(41);

    let currentX = 20;
    let currentY = 350;


    for (let i = 0; i < myConsum.length; i++) {
        myConsum[i].display(currentX, currentY);
        currentX += myConsum[i].myWidth + 3;
    }


    currentX = 700;

    for (let t = 0; t < myIncome.length; t++) {
        myIncome[t].display2(currentX, currentY);
        currentX += myIncome[t].myWidth + 3;
    }


    fill(200);
    textSize(18);
    // text ("Einkommen der Deutschen", 20, 300);
    // text ("Lebenshaltungskosten Deutschland", 700, 300);
    textSize(12);
    text("frameRate:   " + Math.round(frameRate()), 20, height - 10);

    // noLoop();
}