let incomeData;
let myIncome = [];

let consumData;
let myConsum = [];

let karte

function preload() {
    incomeData = loadTable('data2/EinkommenEu.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu.csv', 'csv', 'header');
    karte = loadImage('MapChart_Map-2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i = 0;
    let t = 0;

    // Einkommen der Eu Länder
    for (let myRow of incomeData.rows) {
        let currentCountry2 = new Country();

        currentCountry2.myCountryArea = myRow.get('Value');
            currentCountry2.myLocation = myRow.get('LOCATION');
            currentCountry2.mySize = map(currentCountry2.myCountryArea, 17098250, 50, 50000, 50); // [17 098 250,50]

            if (currentCountry2.myLocation === "DEU") {
                myIncome[t] = currentCountry2;
                t++;
            }
    }

    // Consum der Eu Länder
    for (let myRow of consumData.rows) {
        let currentCountry = new Country();

        currentCountry.myCountryArea = myRow.get('OBS_VALUE');
            currentCountry.myCountry = myRow.get('geo');
            currentCountry.mySize = map(currentCountry.myCountryArea, 17098250, 50, 70000000, 50); // [17 098 250,50]

            if (currentCountry.myCountry === "DE:Germany") {
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

    currentX = 500;
    karteX = 500;

    // Karte
    karteX = windowWidth/2;
    
    karte.resize(0, windowHeight-200)
    image(karte, karteX+25, 100)

 
    for (let t = 0; t < myIncome.length; t++) {
        myIncome[t].display2(currentX, currentY);
        currentX += myIncome[t].myWidth + 3;
    }

    stroke(255,0,0);
    line(windowWidth/2, windowHeight, windowWidth/2, 0);
    noStroke()
    fill (200);

    textSize(18);
    // text ("Einkommen der Deutschen", 20, 300);
    // text ("Lebenshaltungskosten Deutschland", 700, 300);
    textSize(12);
    text("frameRate:   " + Math.round(frameRate()), 20, height - 10);

    // noLoop();
}