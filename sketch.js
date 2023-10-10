/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let incomeData;
let myIncome = [];

let countryData2;
let myBundesländer = [];

function preload(){

    // incomeData = loadTable('data/Deutschland.csv', 'csv', 'header');

    incomeData = loadTable('data2/EinkommenEu.csv', 'csv', 'header');
    // countryData2 = loadTable('data2/komsumpreisindex_eu.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i=0;
    let t=0;

    // for (let myRow of countryData2.rows){
    //     let currentCountry = new Country();

    //     currentCountry.myCountryArea = myRow.get('Value');
    //     if (currentCountry.myCountryArea > 10000){
    //         currentCountry.myCountry = myRow.get('LOCATION');
    //         currentCountry.myCountryISO = myRow.get('TIME');
    //         currentCountry.mySize = map( currentCountry.myCountryArea, 17098250,50,  70000,50) ; // [17 098 250,50]

    //         // if ( currentCountry.myCountryISO === "DEU" || currentCountry.myCountryISO === "CRI")
    //         //     currentCountry.myColor = color(200,100,100);

    //         myBundesländer [i] = currentCountry;
    //         i++;
    //     }
    // }

    for (let myRow of incomeData.rows){
        let currentCountry2 = new Country();

        currentCountry2.myCountryArea = myRow.get('Value');
        if (currentCountry2.myCountryArea > 60){
            currentCountry2.myCountry = myRow.get('LOCATION');
            currentCountry2.myCountryISO = myRow.get('TIME');
            currentCountry2.mySize = map( currentCountry2.myCountryArea, 17098250,50,  50000000,50) ; // [17 098 250,50]

            myIncome [t] = currentCountry2;
            t++;
        }
    }
}


function draw() {
    background(41);

    let currentX = 20;
    let currentY = 750;

    for (let i = 0; i < myBundesländer.length; i++) {
        myBundesländer [i].display (currentX, currentY);
        currentX += myBundesländer[i].myWidth+3;
    }

    currentX = 700;

    for (let t = 0; t < myIncome.length; t++) {
        myIncome [t].display2 (currentX, currentY);
        currentX += myIncome[t].myWidth+3;
    }


    fill (200);
    textSize(18);
    text ("Einkommen der Deutschen", 20, 300);
    text ("Lebenshaltungskosten Deutschland", 700, 300);
    textSize(12);
    text ("In USD", 20, 315);
    text("frameRate:   " + Math.round(frameRate()), 20, height-10);

    // noLoop();
}