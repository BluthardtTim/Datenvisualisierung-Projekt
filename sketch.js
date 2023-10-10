/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let countryData;
let myCountries = [];

let countryData2;
let myBundesländer = [];

let karte

function preload(){
    countryData = loadTable('data/Lebenshaltungskosten.csv', 'csv', 'header');
    countryData2 = loadTable('data/Deutschland.csv', 'csv', 'header');
    karte = loadImage('MapChart_Map.png')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i=0;
    let t=0;

    for (let myRow of countryData2.rows){
        let currentCountry = new Country();

        currentCountry.myCountryArea = myRow.get('Value');
        if (currentCountry.myCountryArea > 10000){
            currentCountry.myCountry = myRow.get('LOCATION');
            currentCountry.myCountryISO = myRow.get('TIME');
            currentCountry.mySize = map( currentCountry.myCountryArea, 17098250,50,  70000,50) ; // [17 098 250,50]

            // if ( currentCountry.myCountryISO === "DEU" || currentCountry.myCountryISO === "CRI")
            //     currentCountry.myColor = color(200,100,100);

            myBundesländer [i] = currentCountry;
            i++;
        }
    }

    for (let myRow of countryData.rows){
        let currentCountry2 = new Country();

        currentCountry2.myCountryArea = myRow.get('Value');
        if (currentCountry2.myCountryArea > 60){
            currentCountry2.myCountry = myRow.get('LOCATION');
            currentCountry2.myCountryISO = myRow.get('TIME');
            currentCountry2.mySize = map( currentCountry2.myCountryArea, 17098250,50,  50000000,50) ; // [17 098 250,50]

            myCountries [t] = currentCountry2;
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

   currentX = windowWidth/2;

    karte.resize(0, windowHeight-200)
    image(karte, currentX, 0)

   // for (let t = 0; t < myCountries.length; t++) {
   //     myCountries [t].display2 (currentX, currentY);
   //     currentX += myCountries[t].myWidth+3;
    //}


    stroke(255,0,0);
    line(windowWidth/2, windowHeight, windowWidth/2, 0);
    noStroke()
    fill (200);
    textSize(18);
    text ("Einkommen der Deutschen", 20, 300);
    text ("Lebenshaltungskosten Deutschland", 700, 300);
    textSize(12);
    text ("In USD", 20, 315);
    text("frameRate:   " + Math.round(frameRate()), 20, height-10);

    // noLoop();
}